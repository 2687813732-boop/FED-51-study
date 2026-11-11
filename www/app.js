/* FDE 学习助手 · 本地优先的 51 天学习计划 App */
(function () {
  'use strict';

  var DATA = window.PLAN_DATA;
  var DAYS = DATA.days;
  var DAY_BY_DATE = {};
  var DAY_BY_NUM = {};
  DAYS.forEach(function (d) { DAY_BY_DATE[d.date] = d; DAY_BY_NUM[d.day] = d; });
  var WEEK_BY_NUM = {};
  DATA.weeks.forEach(function (w) { WEEK_BY_NUM[w.week] = w; });

  var KEY = 'fde51.state.v1';
  var START = DATA.meta.start;
  var END = DATA.meta.end;
  var IS_NATIVE = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  var LN = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function isoOf(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parseISO(s) { var p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2], 12, 0, 0); }
  function todayISO() { return isoOf(new Date()); }
  function addDays(iso, n) { var d = parseISO(iso); d.setDate(d.getDate() + n); return isoOf(d); }
  function isPlanDate(iso) { return iso >= START && iso <= END; }
  function dateLabel(iso) { var d = parseISO(iso); return (d.getMonth() + 1) + '月' + d.getDate() + '日'; }
  function weekdayOf(iso) { var d = parseISO(iso); return '周' + '日一二三四五六'[d.getDay()]; }
  function hm(iso) { return dateLabel(iso) + ' · ' + weekdayOf(iso); }

  function loadState() {
    var base = defaultState();
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return base;
      var s = JSON.parse(raw);
      if (!s || typeof s !== 'object') return base;
      base.progress = s.progress && typeof s.progress === 'object' ? s.progress : {};
      base.submissions = s.submissions && typeof s.submissions === 'object' ? s.submissions : {};
      base.reviews = s.reviews && typeof s.reviews === 'object' ? s.reviews : {};
      base.problems = Array.isArray(s.problems) ? s.problems : [];
      base.finalChecks = s.finalChecks && typeof s.finalChecks === 'object' ? s.finalChecks : {};
      base.settings = Object.assign(base.settings, s.settings || {});
      base.createdAt = s.createdAt || base.createdAt;
      return base;
    } catch (e) {
      console.warn('state load failed', e);
      return base;
    }
  }
  function defaultState() {
    return {
      version: 1,
      progress: {},
      submissions: {},
      reviews: {},
      problems: [],
      finalChecks: {},
      settings: { reminders: true, supervision: true },
      createdAt: new Date().toISOString()
    };
  }

  var state = loadState();
  var ui = {
    tab: 'today',
    openWeeks: {},
    filter: 'all',
    reviewWeek: null,
    reviewDrafts: {},
    now: new Date(),
    lastMinute: -1,
    rating: 0,
    sheetDate: null
  };

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { console.warn('save failed', e); }
  }
  function prog(iso) {
    if (!state.progress[iso]) state.progress[iso] = { tasks: {}, habits: {}, timers: {} };
    var p = state.progress[iso];
    p.tasks = p.tasks || {}; p.habits = p.habits || {}; p.timers = p.timers || {};
    return p;
  }
  function sub(iso) { return state.submissions[iso] || null; }
  function planDayNow() {
    var t = todayISO();
    if (t < START) return DAYS[0];
    if (t > END) return DAYS[DAYS.length - 1];
    return DAY_BY_DATE[t] || DAYS[0];
  }
  function dayByISO(iso) { return DAY_BY_DATE[iso] || null; }
  function doneBlocks(iso) {
    var p = state.progress[iso];
    if (!p) return 0;
    var d = dayByISO(iso);
    if (!d) return 0;
    return d.blocks.filter(function (b) { return p.tasks && p.tasks[b.id]; }).length;
  }
  function doneHabits(iso) {
    var p = state.progress[iso];
    if (!p) return 0;
    return ['git', 'note', 'pool'].filter(function (k) { return p.habits && p.habits[k]; }).length;
  }
  function dayPercent(iso) {
    return Math.round((doneBlocks(iso) + doneHabits(iso)) / 7 * 100);
  }
  function statusOf(iso) {
    if (sub(iso)) return 'done';
    var p = state.progress[iso];
    if (p && (Object.keys(p.tasks || {}).length || Object.keys(p.habits || {}).length)) return 'doing';
    if (iso < todayISO()) return 'missed';
    return 'todo';
  }
  function isTimerRunning(iso, bid) {
    var p = state.progress[iso];
    return !!(p && p.timers && p.timers[bid] && p.timers[bid].startedAt);
  }
  function activeBlock(iso) {
    var p = state.progress[iso];
    if (!p || !p.timers) return null;
    var ids = Object.keys(p.timers);
    for (var i = 0; i < ids.length; i++) {
      if (p.timers[ids[i]].startedAt) return ids[i];
    }
    return null;
  }
  function elapsedMs(iso, bid) {
    var p = state.progress[iso];
    var t = p && p.timers && p.timers[bid];
    if (!t) return 0;
    return (t.acc || 0) + (t.startedAt ? Date.now() - t.startedAt : 0);
  }
  function blockMinutes(iso, bid) {
    var p = state.progress[iso];
    var t = p && p.timers && p.timers[bid];
    var ms = t ? (t.acc || 0) + (t.startedAt ? Date.now() - t.startedAt : 0) : 0;
    if (ms >= 5 * 60000) return Math.round(ms / 60000);
    return 120;
  }
  function dayMinutes(iso) {
    var d = dayByISO(iso);
    if (!d) return 0;
    var total = 0;
    d.blocks.forEach(function (b) {
      var p = state.progress[iso];
      if (p && p.tasks && p.tasks[b.id]) total += blockMinutes(iso, b.id);
    });
    return total;
  }
  function totalMinutes() {
    var t = 0;
    Object.keys(state.submissions).forEach(function (k) {
      t += (state.submissions[k].minutes || 0);
    });
    return t;
  }
  function submittedCount() { return Object.keys(state.submissions).length; }
  function avgScore() {
    var arr = Object.keys(state.submissions).map(function (k) { return state.submissions[k].score; });
    if (!arr.length) return 0;
    return Math.round(arr.reduce(function (a, b) { return a + b; }, 0) / arr.length);
  }
  function streak() {
    var n = 0;
    var d = todayISO();
    if (!sub(d)) d = addDays(d, -1);
    while (isPlanDate(d) && sub(d)) { n++; d = addDays(d, -1); }
    return n;
  }
  function missedDays() {
    var t = todayISO();
    return DAYS.filter(function (d) { return d.date < t && !sub(d.date); });
  }
  function fmtHours(min) {
    if (!min) return '0';
    var h = min / 60;
    return (Math.round(h * 10) / 10).toString();
  }
  function fmtDuration(min) {
    min = Math.round(min || 0);
    var h = Math.floor(min / 60), m = min % 60;
    if (h && m) return h + ' 小时 ' + m + ' 分';
    if (h) return h + ' 小时';
    return m + ' 分钟';
  }
  function fmtTimer(ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return pad(h) + ':' + pad(m) + ':' + pad(sec);
  }
  function fmtCountdown(ms) {
    if (ms <= 0) return '已结束';
    var s = Math.floor(ms / 1000);
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    if (h > 0) return h + ':' + pad(m) + ':' + pad(sec);
    return m + ':' + pad(sec);
  }
  function icon(name) { return '<svg class="ic"><use href="#i-' + name + '"/></svg>'; }
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tm);
    t._tm = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }
  function hhmm(iso) {
    var d = new Date(iso);
    return pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  /* ============================================================ today */

  function nowBanner(day) {
    var iso = day.date;
    var rec = sub(iso);
    var p = state.progress[iso] || {};
    var now = new Date();
    var mins = now.getHours() * 60 + now.getMinutes();
    if (rec) {
      return {
        text: '今天已提交 · ' + rec.score + ' 分',
        sub: '评价已保存。明天醒来先看「明天第一件事」。',
        act: 'open-eval', label: '看评价', block: ''
      };
    }
    var cur = null, next = null;
    day.blocks.forEach(function (b) {
      var s = +b.start.split(':')[0] * 60 + +b.start.split(':')[1];
      var e = +b.end.split(':')[0] * 60 + +b.end.split(':')[1];
      if (mins >= s && mins < e && !(p.tasks || {})[b.id]) cur = b;
      if (mins < s && !next) next = b;
    });
    if (cur) {
      return {
        text: '现在该做：' + cur.title,
        sub: '到 ' + cur.end + ' 结束 · ' + cur.task.slice(0, 34) + (cur.task.length > 34 ? '…' : ''),
        act: 'start-block', label: '开始', block: cur.id
      };
    }
    if (next) {
      return {
        text: '下一块：' + next.title,
        sub: next.start + ' 开始 · 先把手机放远一点',
        act: 'start-block', label: '提前开始', block: next.id
      };
    }
    return {
      text: '今天的时间块结束了',
      sub: '还差提交：写三句话，拿今天的评价。',
      act: 'open-submit', label: '去提交', block: ''
    };
  }

  function viewToday() {
    var iso = todayISO();
    if (iso < START) return viewPreStart();
    if (iso > END) return viewAfterEnd();
    var day = DAY_BY_DATE[iso];
    if (!day) return viewPreStart();
    var p = prog(iso);
    var rec = sub(iso);
    var blocksDone = doneBlocks(iso);
    var habitsDone = doneHabits(iso);
    var pct = dayPercent(iso);
    var mins = dayMinutes(iso);
    var left = new Date(parseISO(iso).getFullYear(), parseISO(iso).getMonth(), parseISO(iso).getDate() + 1, 0, 0, 0) - new Date();
    var missed = missedDays();
    var banner = nowBanner(day);
    var st = rec ? '已提交' : blocksDone || habitsDone ? '进行中' : '未开始';
    var stCls = rec ? 'chip-done' : '';
    var streakN = streak();
    var quote = DATA.quotes[(day.day - 1) % DATA.quotes.length];

    var alertHtml = '';
    if (missed.length) {
      alertHtml += '<div class="alert">' + icon('info') + '<div>有 <b>' + missed.length + ' 天</b>没交卡' +
        (missed.length >= 3 ? '，按止损线先压到 5 小时，保连续性。' : '，先补最近的一天。') +
        '</div><button data-act="goto-missed">去补</button></div>';
    }
    if (!rec && state.settings.supervision && new Date().getHours() >= 22) {
      alertHtml += '<div class="alert">' + icon('bell') + '<div>今天还没提交。花 3 分钟写三句话，别让它变成明天的欠账。</div></div>';
    }

    var blockHtml = day.blocks.map(function (b, i) {
      var done = !!(p.tasks || {})[b.id];
      var running = isTimerRunning(iso, b.id);
      var ms = elapsedMs(iso, b.id);
      var cls = done ? 'is-done' : running ? 'is-active' : '';
      var time = running ? fmtTimer(ms) : done ? '用时 ' + blockMinutes(iso, b.id) + ' 分钟' : b.minutes + ' 分钟';
      var actions = '';
      if (!done) {
        if (running) {
          actions = '<button class="btn btn-sm" data-act="pause-block" data-date="' + iso + '" data-block="' + b.id + '">' + icon('pause') + '暂停</button>' +
            '<span class="timer" data-timer="' + iso + '|' + b.id + '">' + fmtTimer(ms) + '</span>' +
            '<span class="spacer"></span>' +
            '<button class="btn btn-soft btn-sm" data-act="done-block" data-date="' + iso + '" data-block="' + b.id + '">' + icon('check') + '完成</button>';
        } else {
          actions = '<button class="btn btn-sm" data-act="start-block" data-date="' + iso + '" data-block="' + b.id + '">' + icon('play') + '开始专注</button>' +
            '<span class="spacer"></span>' +
            '<button class="btn btn-ghost btn-sm" data-act="done-block" data-date="' + iso + '" data-block="' + b.id + '">标记完成</button>';
        }
      } else {
        actions = '<span class="tiny">已完成 · ' + blockMinutes(iso, b.id) + ' 分钟</span><span class="spacer"></span>' +
          '<button class="btn btn-ghost btn-sm" data-act="undo-block" data-date="' + iso + '" data-block="' + b.id + '">撤销</button>';
      }
      return '<article class="block ' + cls + '">' +
        '<div class="block-h">' +
        '<span class="checkdot">' + icon('check') + '</span>' +
        '<h3>' + esc(b.title) + '</h3>' +
        '<span class="block-time">' + b.start + '–' + b.end + ' · ' + time + '</span>' +
        '</div>' +
        '<p class="block-task">' + esc(b.task) + '</p>' +
        '<p class="block-hint">' + esc(b.hint) + '</p>' +
        '<div class="block-foot">' + actions + '</div>' +
        '</article>';
    }).join('');

    var habitDefs = [
      ['git', '代码已提交 Git'],
      ['note', '写了三句话笔记'],
      ['pool', '问题池已更新']
    ];
    var habitsHtml = habitDefs.map(function (h) {
      var on = !!(p.habits || {})[h[0]];
      return '<button class="habit ' + (on ? 'on' : '') + '" data-act="habit" data-date="' + iso + '" data-k="' + h[0] + '">' +
        '<span class="box">' + icon('check') + '</span><span>' + h[1] + '</span></button>';
    }).join('');

    var submitHtml = rec
      ? '<div class="result">' +
        '<div class="grade-badge g-' + rec.grade + '">' + rec.grade + '</div>' +
        '<div class="result-main"><b>' + rec.score + ' 分 · 已提交</b><span>' + hhmm(rec.submittedAt) + ' 提交 · ' + fmtDuration(rec.minutes) + ' · 点开看总结</span></div>' +
        '<button class="btn btn-sm" data-act="open-eval" data-date="' + iso + '">评价</button>' +
        '</div>'
      : '<div class="submit-wrap"><button class="btn btn-primary btn-xl" data-act="open-submit" data-date="' + iso + '">提交今日学习，生成评价</button>' +
        '<p class="fineprint">提交后得到今天的总结、评分和明天的第一件事。记录只存在这台手机里。</p></div>';

    return '<div class="page">' +
      '<header class="topbar">' +
        '<div><div class="eyebrow">' + dateLabel(iso) + ' · ' + weekdayOf(iso) + '</div>' +
        '<div class="dayline"><span class="daynum">Day ' + day.day + '</span><span class="daysub">/ 51</span></div></div>' +
        '<div class="top-right">' +
          (streakN ? '<div class="streak">' + icon('flame') + streakN + ' 天</div>' : '') +
          '<button class="icon-btn" data-act="tab" data-tab="me" aria-label="我的">' + icon('me') + '</button>' +
        '</div>' +
      '</header>' +
      alertHtml +
      '<section class="hero">' +
        '<div class="hero-top"><span class="chip chip-week">第 ' + day.week + ' 周 · ' + esc(WEEK_BY_NUM[day.week].theme) + '</span>' +
          '<span class="chip ' + stCls + '">' + st + '</span></div>' +
        '<h1 class="hero-title">' + esc(day.topic) + '</h1>' +
        '<div class="hero-sub"><span>4 个时间块</span><span class="dotsep">·</span><span>约 8 小时</span><span class="dotsep">·</span><span>今天要留下产出</span></div>' +
        '<div class="hero-progress">' +
          '<div class="ring" style="--v:' + pct + '"><div class="ring-in"><b>' + pct + '<small>%</small></b><span>完成度</span></div></div>' +
          '<div class="hp-info">' +
            '<div class="hp-row"><span>时间块</span><b>' + blocksDone + ' / 4</b></div>' +
            '<div class="hp-row"><span>今日投入</span><b>' + fmtHours(mins) + ' h</b></div>' +
            '<div class="hp-row"><span>距今天结束</span><b class="mono" id="deadline">' + fmtCountdown(left) + '</b></div>' +
          '</div>' +
        '</div>' +
        '<div class="hero-note">' + icon('clock') + '<span id="nowNote">' + esc(banner.text) + '</span></div>' +
      '</section>' +
      '<div class="nowbar" id="nowbar">' +
        '<span class="pulse"></span>' +
        '<div class="nowbar-main" id="nowbarMain"><b>' + esc(banner.text) + '</b><span>' + esc(banner.sub) + '</span></div>' +
        '<button class="btn btn-soft" data-act="' + banner.act + '" data-block="' + banner.block + '" data-date="' + iso + '">' + banner.label + '</button>' +
      '</div>' +

      '<div class="sec"><h2>四个时间块</h2><span>' + blocksDone + ' / 4 已完成</span></div>' +
      '<div class="blocks">' + blockHtml + '</div>' +

      '<div class="sec"><h2>今日交付</h2><span>没有产出的一天算没过</span></div>' +
      '<div class="deliver">' +
        '<div class="deliver-label">' + icon('book') + '今日产出</div>' +
        '<div class="deliver-text">' + esc(day.deliverable) + '</div>' +
        '<div class="deliver-sub">做完就把链接或截图位置记下来，提交时一起交。</div>' +
      '</div>' +
      '<div class="habits">' + habitsHtml + '</div>' +
      submitHtml +
      '<div class="quote"><span>' + esc(quote) + '</span></div>' +
    '</div>';
  }

  function viewPreStart() {
    var left = Math.ceil((parseISO(START) - parseISO(todayISO())) / 86400000);
    return '<div class="page"><header class="topbar"><div><div class="eyebrow">计划未开始</div>' +
      '<div class="dayline"><span class="daynum">Day 1</span><span class="daysub">/ 51</span></div></div></header>' +
      '<section class="hero"><div class="hero-top"><span class="chip chip-week">2026.11.11 开营</span></div>' +
      '<h1 class="hero-title">还有 ' + Math.max(0, left) + ' 天</h1>' +
      '<div class="hero-sub"><span>先把环境装好，Day 1 会轻松一点</span></div>' +
      '<div class="hero-note">' + icon('clock') + '<span>计划从 11 月 11 日开始，每天 8 小时。</span></div></section>' +
      '<div class="sec"><h2>第一天预览</h2><span>D1</span></div>' +
      '<div class="card"><h3 style="font-size:15px">' + esc(DAYS[0].topic) + '</h3>' +
      '<p class="block-task mt8">' + esc(DAYS[0].learn) + '</p>' +
      '<p class="tiny mt8">产出：' + esc(DAYS[0].deliverable) + '</p></div></div>';
  }

  function viewAfterEnd() {
    var total = submittedCount();
    var missed = DAYS.filter(function (d) { return !sub(d.date); }).length;
    return '<div class="page"><header class="topbar"><div><div class="eyebrow">2026.12.31 · 结营</div>' +
      '<div class="dayline"><span class="daynum">51 / 51</span></div></div></header>' +
      '<section class="hero"><div class="hero-top"><span class="chip chip-week">51 天走完了</span><span class="chip chip-done">结营</span></div>' +
      '<h1 class="hero-title">把这一页翻过去</h1>' +
      '<div class="hero-sub"><span>打卡 ' + total + ' 天</span><span class="dotsep">·</span><span>欠卡 ' + missed + ' 天</span><span class="dotsep">·</span><span>累计 ' + fmtHours(totalMinutes()) + ' 小时</span></div>' +
      '<div class="hero-note">' + icon('check') + '<span>接下来：整理 README、评测报告和 51 天复盘。</span></div></section>' +
      '<div class="sec"><h2>结营清单</h2><span>12/31 要交出的东西</span></div>' +
      '<button class="row" data-act="open-final" style="background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px">' +
      '<span class="ric">' + icon('shield') + '</span><span class="rmain"><b>核对 5 项交付</b><span>系统、README、评测报告、复盘、简历</span></span>' + icon('right') + '</button>' +
      '<div class="sec"><h2>总复盘</h2></div>' +
      '<button class="btn btn-primary btn-xl" data-act="open-final-report">生成 51 天总复盘</button></div>';
  }

  /* ============================================================ plan */

  function viewPlan() {
    var total = submittedCount();
    var missed = missedDays().length;
    var pct = Math.round(total / 51 * 100);
    var curWeek = planDayNow().week;
    var today = todayISO();

    var body = '';
    if (ui.filter === 'all') {
      body = DATA.weeks.map(function (w) {
        var days = DAYS.filter(function (d) { return d.week === w.week; });
        var done = days.filter(function (d) { return sub(d.date); }).length;
        var open = ui.openWeeks[w.week];
        var rows = days.map(function (d) {
          var st = statusOf(d.date);
          var dotCls = st === 'done' ? 'done' : st === 'doing' ? 'doing' : st === 'missed' ? 'missed' : '';
          if (d.date === today) dotCls += ' today';
          var dotInner = st === 'done' ? icon('check') : st === 'missed' ? '!' : d.day;
          var right = sub(d.date) ? (sub(d.date).score + ' 分') : (st === 'missed' ? '欠卡' : '');
          return '<button class="dayrow" data-act="open-day" data-date="' + d.date + '">' +
            '<span class="dot ' + dotCls + '">' + dotInner + '</span>' +
            '<span class="dr-main"><b>' + esc(d.topic) + '</b><span>' + (d.month) + '/' + d.dom + ' ' + d.weekday + ' · ' + esc(d.deliverable) + '</span></span>' +
            '<span class="dr-right">' + right + icon('right') + '</span>' +
            '</button>';
        }).join('');
        return '<section class="week ' + (open ? 'open' : '') + '">' +
          '<button class="week-h" data-act="toggle-week" data-week="' + w.week + '">' +
            '<span class="wk">W' + w.week + '</span>' +
            '<span class="wk-main"><h3>' + esc(w.theme) + '</h3><p>' + w.dates + ' · D' + w.from + '–D' + w.to + '</p></span>' +
            '<span class="wk-count">' + done + '/' + days.length + '</span>' + icon('right') +
          '</button>' +
          '<div class="week-body">' + (w.note ? '<div class="week-note">' + esc(w.note) + '</div>' : '') + rows + '</div>' +
          '</section>';
      }).join('');
    } else {
      var list = ui.filter === 'done'
        ? DAYS.filter(function (d) { return sub(d.date); })
        : DAYS.filter(function (d) { return d.date < today && !sub(d.date); });
      if (!list.length) {
        body = '<div class="card center" style="padding:34px 18px"><div class="muted" style="font-size:13px">' +
          (ui.filter === 'done' ? '还没有打卡记录，从今天开始。' : '没有欠账，保持住。') + '</div></div>';
      } else {
        body = list.map(function (d) {
          var st = statusOf(d.date);
          var dotCls = st === 'done' ? 'done' : 'missed';
          return '<button class="dayrow" data-act="open-day" data-date="' + d.date + '" style="background:var(--card);border:1px solid var(--line);margin-bottom:6px">' +
            '<span class="dot ' + dotCls + '">' + (st === 'done' ? icon('check') : '!') + '</span>' +
            '<span class="dr-main"><b>D' + d.day + ' · ' + esc(d.topic) + '</b><span>' + d.month + '/' + d.dom + ' ' + d.weekday + ' · 第 ' + d.week + ' 周</span></span>' +
            '<span class="dr-right">' + (st === 'done' ? sub(d.date).score + ' 分' : '补交') + icon('right') + '</span></button>';
        }).join('');
      }
    }

    return '<div class="page">' +
      '<header class="topbar"><div><div class="eyebrow">2026.11.11 — 12.31</div><div class="dayline"><span class="daynum">51 天路线</span></div></div>' +
      '<button class="icon-btn" data-act="open-final" aria-label="结营清单">' + icon('shield') + '</button></header>' +
      '<div class="progress-card">' +
        '<div class="pc-top"><b>' + total + '<small>/ 51 天</small></b><span>欠卡 ' + missed + ' 天 · 连续 ' + streak() + ' 天</span></div>' +
        '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
        '<div class="tiny mt8">8 周 · 每天 8 小时 · 约 400 小时。周日留给复盘和项目切片。</div>' +
      '</div>' +
      '<div class="filters">' +
        ['all', 'done', 'miss'].map(function (f) {
          var label = f === 'all' ? '全部' : f === 'done' ? '已打卡' : '欠账';
          return '<button class="filter ' + (ui.filter === f ? 'on' : '') + '" data-act="filter" data-f="' + f + '">' + label + '</button>';
        }).join('') +
      '</div>' +
      '<div class="weeks">' + body + '</div>' +
      '<div class="sec"><h2>项目切片</h2><span>每周日下午</span></div>' +
      '<div class="list">' +
        DATA.slices.slice(0, 6).map(function (s) {
          return '<button class="row" data-act="open-slice" data-n="' + s.n + '">' +
            '<span class="ric" style="background:rgba(139,147,255,.1);color:#c7d2fe;font-size:11px;font-weight:700">' + s.n + '</span>' +
            '<span class="rmain"><b>' + esc(s.name) + '</b><span>' + esc(s.task) + '</span></span>' + icon('right') +
            '</button>';
        }).join('') +
      '</div>' +
      '<p class="tiny mt12" style="line-height:1.7">切片 7、8 和整合演示放在 1 月，先把「人、稿、审」这条主线跑通。</p>' +
      '</div>';
  }

  /* ============================================================ review */

  function weekStats(week) {
    var days = DAYS.filter(function (d) { return d.week === week; });
    var subs = days.map(function (d) { return sub(d.date); }).filter(Boolean);
    var hours = subs.reduce(function (a, r) { return a + (r.minutes || 0); }, 0);
    var avg = subs.length ? Math.round(subs.reduce(function (a, r) { return a + r.score; }, 0) / subs.length) : 0;
    return { days: days, subs: subs, hours: hours, avg: avg };
  }

  function viewReview() {
    var curWeek = planDayNow().week;
    var after = todayISO() > END;
    var week = ui.reviewWeek || curWeek;
    ui.reviewWeek = week;
    var w = WEEK_BY_NUM[week];
    var st = weekStats(week);
    var saved = state.reviews[week];
    var draft = ui.reviewDrafts[week] || {
      answers: (saved && saved.answers) || ['', '', '', ''],
      checks: (saved && saved.checks) || [false, false, false, false, false, false]
    };
    if (!ui.reviewDrafts[week]) ui.reviewDrafts[week] = draft;

    var chips = DATA.weeks.map(function (x) {
      var locked = false;
      var has = !!state.reviews[x.week];
      return '<button class="wchip ' + (x.week === week ? 'on' : '') + (has ? ' done' : '') + (locked ? ' locked' : '') + '" ' +
        (locked ? 'disabled' : '') + ' data-act="review-week" data-week="' + x.week + '">' +
        '<b>W' + x.week + '</b><small>' + (has ? state.reviews[x.week].score + ' 分' : locked ? '未解锁' : '待复盘') + '</small></button>';
    }).join('');

    var qs = DATA.review.questions.map(function (q, i) {
      return '<div class="field"><label><b>Q' + (i + 1) + '</b> ' + esc(q) + '</label>' +
        '<textarea rows="2" data-qi="' + i + '" data-week="' + week + '" placeholder="写具体一点，周末只有这半小时">' + esc(draft.answers[i] || '') + '</textarea></div>';
    }).join('');

    var checks = DATA.review.checklist.map(function (c, i) {
      return '<button class="chk ' + (draft.checks[i] ? 'on' : '') + '" data-act="toggle-check" data-i="' + i + '">' +
        '<span class="box">' + icon('check') + '</span><span>' + esc(c) + '</span></button>';
    }).join('');

    var history = Object.keys(state.reviews).sort().map(function (k) {
      var r = state.reviews[k];
      return '<button class="rh" data-act="review-week" data-week="' + k + '"><span class="rh-badge">W' + k + '</span>' +
        '<div><b>第 ' + k + ' 周 · ' + r.score + ' 分</b><span>' + (r.verdict || '') + ' · ' + new Date(r.savedAt).toLocaleDateString('zh-CN') + '</span></div>' + icon('right') + '</button>';
    }).join('');

    var finalCount = Object.keys(state.finalChecks).filter(function (k) { return state.finalChecks[k]; }).length;

    return '<div class="page">' +
      '<header class="topbar"><div><div class="eyebrow">周日晚上 30 分钟</div><div class="dayline"><span class="daynum">每周复盘</span></div></div></header>' +
      '<div class="weekchips">' + chips + '</div>' +
      '<div class="card mt12">' +
        '<div style="display:flex;align-items:baseline;justify-content:space-between"><h3 style="font-size:16px">' + esc(w.theme) + '</h3><span class="tiny">' + w.dates + '</span></div>' +
        '<div class="review-stat mt12">' +
          '<div class="rs"><b>' + st.subs.length + '/' + st.days.length + '</b><span>打卡天数</span></div>' +
          '<div class="rs"><b>' + fmtHours(st.hours) + '<small style="font-size:10px"> h</small></b><span>专注时长</span></div>' +
          '<div class="rs"><b>' + (st.avg || '—') + '</b><span>平均得分</span></div>' +
        '</div>' +
        '<div class="divider"></div>' +
        '<div style="font-size:12.5px;color:var(--muted);line-height:1.7">四问复盘。别写「学习了 XX」，写做出来的东西。</div>' +
        qs +
        '<div class="sec" style="margin-top:20px"><h2 style="font-size:13.5px">本周验收</h2><span>少于 4 项不算过</span></div>' +
        '<div class="checklist">' + checks + '</div>' +
        '<button class="btn btn-primary btn-xl mt16" data-act="save-review" data-week="' + week + '">保存本周复盘</button>' +
        '<p class="review-note">' + esc(DATA.review.stopLoss[0]) + '</p>' +
      '</div>' +
      (history ? '<div class="sec"><h2>复盘记录</h2><span>' + Object.keys(state.reviews).length + ' 周</span></div><div class="review-history">' + history + '</div>' : '') +
      '<div class="sec"><h2>结营验收</h2><span>' + finalCount + ' / 5</span></div>' +
      '<button class="row" data-act="open-final" style="background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px">' +
        '<span class="ric">' + icon('shield') + '</span><span class="rmain"><b>12 月 31 日要交出的东西</b><span>系统、README、评测报告、复盘、简历</span></span>' + icon('right') +
      '</button>' +
      '</div>';
  }

  /* ============================================================ me */

  function viewMe() {
    var total = submittedCount();
    var mins = totalMinutes();
    var avg = avgScore();
    var cells = ['一', '二', '三', '四', '五', '六', '日'].map(function (d) { return '<div class="hd">' + d + '</div>'; }).join('');
    var blanks = 2;
    for (var i = 0; i < blanks; i++) cells += '<div class="cell blank"></div>';
    DAYS.forEach(function (d) {
      var r = sub(d.date);
      var cls = 'cell';
      var inner = d.dom;
      if (r) {
        var lv = r.score >= 90 ? 'l5' : r.score >= 80 ? 'l4' : r.score >= 70 ? 'l3' : r.score >= 60 ? 'l2' : 'l1';
        cls += ' done ' + lv;
      } else if (d.date < todayISO()) cls += ' missed';
      else if (d.date === todayISO()) cls += ' today';
      else cls += ' future';
      cells += '<button class="' + cls + '" data-act="open-day" data-date="' + d.date + '" title="D' + d.day + ' ' + esc(d.topic) + '">' + inner + '</button>';
    });

    var bars = DATA.weeks.map(function (w) {
      var days = DAYS.filter(function (d) { return d.week === w.week; });
      var dn = days.filter(function (d) { return sub(d.date); }).length;
      var h = Math.max(3, Math.round(dn / days.length * 54));
      return '<div class="bcol"><em>' + dn + '</em><i style="height:' + h + 'px"></i><span>W' + w.week + '</span></div>';
    }).join('');

    var probs = state.problems.map(function (p) {
      return '<div class="problem ' + (p.done ? 'done' : '') + '">' +
        '<button class="pdot" data-act="problem-toggle" data-id="' + p.id + '">' + icon('check') + '</button>' +
        '<span>' + esc(p.text) + '</span>' +
        '<button class="sheet-x" style="width:24px;height:24px" data-act="problem-del" data-id="' + p.id + '">' + icon('x') + '</button>' +
        '</div>';
    }).join('');

    var notifStatus = IS_NATIVE && LN ? '检查中…' : '仅应用内提醒';

    return '<div class="page">' +
      '<div class="profile"><div class="avatar">51</div><div><h2>FDE 学习助手</h2>' +
        '<p>2027 届校招 · 从零到交付 · 2026.11.11 开营</p></div></div>' +
      '<div class="stats">' +
        '<div class="stat"><b>' + total + '<small>/51</small></b><span>已打卡</span></div>' +
        '<div class="stat"><b>' + streak() + '<small>天</small></b><span>当前连续</span></div>' +
        '<div class="stat"><b>' + fmtHours(mins) + '<small>h</small></b><span>累计专注</span></div>' +
        '<div class="stat"><b>' + (avg || '—') + '</b><span>平均得分</span></div>' +
      '</div>' +
      '<div class="sec"><h2>51 天日历</h2><span>' + missedDays().length + ' 天欠卡</span></div>' +
      '<div class="heatwrap"><div class="heat">' + cells + '</div>' +
        '<div class="legend"><span>低</span><i style="background:#1f6f57"></i><i style="background:#2f9c79"></i><i style="background:#4ed3a3"></i><i style="background:#8bf0c9"></i><span>高</span><i style="background:rgba(251,113,133,.25);margin-left:8px"></i><span>欠卡</span></div>' +
      '</div>' +
      '<div class="sec"><h2>每周完成</h2><span>打卡天数</span></div>' +
      '<div class="bars">' + bars + '</div>' +

      '<div class="sec"><h2>问题池</h2><span>' + state.problems.filter(function (p) { return !p.done; }).length + ' 个待解决</span></div>' +
      '<div class="card" style="padding:10px">' +
        '<div style="display:grid;gap:6px">' + (probs || '<div class="tiny" style="padding:8px 6px">卡住的问题先扔进来，周末统一处理。别让它散在脑子里。</div>') + '</div>' +
        '<div class="pinput"><input id="problemInput" placeholder="例：join 和子查询什么时候用哪个？" maxlength="120"><button data-act="problem-add" aria-label="添加">' + icon('plus') + '</button></div>' +
      '</div>' +

      '<div class="sec"><h2>提醒与监督</h2></div>' +
      '<div class="list">' +
        '<div class="row"><span class="ric">' + icon('bell') + '</span><span class="rmain"><b>每日提醒</b><span>08:55 / 14:25 / 21:30 / 22:40</span></span>' +
          '<button class="switch ' + (state.settings.reminders ? 'on' : '') + '" data-act="toggle-reminders" aria-label="每日提醒"></button></div>' +
        '<div class="row"><span class="ric">' + icon('shield') + '</span><span class="rmain"><b>监督模式</b><span>逾期、深夜未提交会提醒你</span></span>' +
          '<button class="switch ' + (state.settings.supervision ? 'on' : '') + '" data-act="toggle-supervision" aria-label="监督模式"></button></div>' +
        '<button class="row" data-act="test-notif"><span class="ric">' + icon('clock') + '</span><span class="rmain"><b>测试提醒</b><span id="notifStatus">' + notifStatus + '</span></span>' + icon('right') + '</button>' +
      '</div>' +

      '<div class="sec"><h2>数据</h2></div>' +
      '<div class="list">' +
        '<button class="row" data-act="export"><span class="ric">' + icon('download') + '</span><span class="rmain"><b>导出学习数据</b><span>JSON，换手机或备份用</span></span>' + icon('right') + '</button>' +
        '<button class="row" data-act="import"><span class="ric">' + icon('upload') + '</span><span class="rmain"><b>导入数据</b><span>会覆盖当前记录</span></span>' + icon('right') + '</button>' +
        '<button class="row" data-act="reset"><span class="ric" style="color:#fda4af">' + icon('trash') + '</span><span class="rmain"><b style="color:#fda4af">重置全部记录</b><span>清空打卡、评价和复盘</span></span>' + icon('right') + '</button>' +
      '</div>' +

      '<div class="sec"><h2>关于</h2></div>' +
      '<div class="list">' +
        '<button class="row" data-act="about"><span class="ric">' + icon('info') + '</span><span class="rmain"><b>这份计划怎么来的</b><span>由《FDE 入门 51 天学习计划》生成</span></span>' + icon('right') + '</button>' +
        '<button class="row" data-act="open-final"><span class="ric">' + icon('shield') + '</span><span class="rmain"><b>结营验收清单</b><span>' + Object.keys(state.finalChecks).filter(function (k) { return state.finalChecks[k]; }).length + ' / 5 项完成</span></span>' + icon('right') + '</button>' +
      '</div>' +
      '<p class="me-foot">数据只保存在本机 · v1.0<br>不联网也能用，不需要登录。</p>' +
      '</div>';
  }

  /* ============================================================ render */

  function render() {
    var html = ui.tab === 'today' ? viewToday() : ui.tab === 'plan' ? viewPlan() : ui.tab === 'review' ? viewReview() : viewMe();
    $('#view').innerHTML = html;
    $$('.tab').forEach(function (b) { b.classList.toggle('on', b.dataset.tab === ui.tab); });
    if (ui.tab === 'me' && IS_NATIVE && LN) refreshNotifStatus();
    if (ui.tab === 'review') bindReviewInputs();
  }

  function bindReviewInputs() {
    $$('#view textarea[data-qi]').forEach(function (t) {
      t.addEventListener('input', function () {
        var wk = t.dataset.week;
        var d = ui.reviewDrafts[wk];
        if (d) d.answers[+t.dataset.qi] = t.value;
      });
    });
  }

  function switchTab(tab) {
    if (ui.tab === tab) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    ui.tab = tab;
    window.scrollTo(0, 0);
    render();
  }

  /* ============================================================ actions */

  function startBlock(iso, bid) {
    var p = prog(iso);
    var active = activeBlock(iso);
    if (active && active !== bid) {
      var t = p.timers[active];
      t.acc = (t.acc || 0) + (t.startedAt ? Date.now() - t.startedAt : 0);
      t.startedAt = null;
    }
    if (!p.timers[bid]) p.timers[bid] = { acc: 0, startedAt: null };
    p.timers[bid].startedAt = Date.now();
    save();
    render();
  }
  function pauseBlock(iso, bid) {
    var p = prog(iso);
    var t = p.timers[bid];
    if (t && t.startedAt) {
      t.acc = (t.acc || 0) + (Date.now() - t.startedAt);
      t.startedAt = null;
      save();
      render();
    }
  }
  function completeBlock(iso, bid) {
    var p = prog(iso);
    var t = p.timers[bid] || { acc: 0, startedAt: null };
    var ms = (t.acc || 0) + (t.startedAt ? Date.now() - t.startedAt : 0);
    var mins = ms >= 5 * 60000 ? Math.round(ms / 60000) : 120;
    p.timers[bid] = { acc: mins * 60000, startedAt: null };
    p.tasks[bid] = true;
    save();
    render();
    toast('已记录 ' + mins + ' 分钟');
  }
  function undoBlock(iso, bid) {
    var p = prog(iso);
    p.tasks[bid] = false;
    save();
    render();
  }
  function toggleHabit(iso, k) {
    var p = prog(iso);
    p.habits[k] = !p.habits[k];
    save();
    render();
  }

  function renderNowbar() {
    var iso = todayISO();
    var day = dayByISO(iso);
    if (!day) return;
    var b = nowBanner(day);
    var main = $('#nowbarMain');
    if (main) main.innerHTML = '<b>' + esc(b.text) + '</b><span>' + esc(b.sub) + '</span>';
    var btn = $('#nowbar button');
    if (btn) {
      btn.dataset.act = b.act;
      btn.dataset.block = b.block;
      btn.dataset.date = iso;
      btn.textContent = b.label;
    }
    var note = $('#nowNote');
    if (note) note.textContent = b.text;
  }

  function tick() {
    var now = new Date();
    if (isoOf(now) !== isoOf(ui.now) && ui.tab === 'today') {
      ui.now = now;
      render();
      return;
    }
    ui.now = now;
    $$('[data-timer]').forEach(function (el) {
      var parts = el.dataset.timer.split('|');
      var ms = elapsedMs(parts[0], parts[1]);
      el.textContent = fmtTimer(ms);
      if (ms > 2 * 3600 * 1000) el.classList.add('is-paused');
    });
    var dl = $('#deadline');
    if (dl) {
      var iso = todayISO();
      var d = parseISO(iso);
      var left = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 0) - now;
      dl.textContent = fmtCountdown(left);
    }
    if (now.getMinutes() !== ui.lastMinute) {
      ui.lastMinute = now.getMinutes();
      if (ui.tab === 'today' && !$('#sheet').classList.contains('open')) {
        renderNowbar();
        var st = $('#nowbar button');
        if (st) { /* no-op, label handled in renderNowbar */ }
      }
    }
  }

  /* ============================================================ scoring */

  function evaluate(day, tasks, habits, notes, rating, link, minutes, submittedAt) {
    var done = day.blocks.filter(function (b) { return tasks[b.id]; }).length;
    var habitCount = ['git', 'note', 'pool'].filter(function (k) { return habits[k]; }).length;
    var learned = (notes.learned || '').trim();
    var confused = (notes.confused || '').trim();
    var next = (notes.next || '').trim();
    var isBackfill = day.date !== todayISO();

    var scoreTask = done / 4 * 40;
    var scoreHabit = habitCount / 3 * 10;
    var scoreNote = 0;
    if (learned.length >= 40) scoreNote += 10; else if (learned.length >= 15) scoreNote += 6; else scoreNote += 2;
    if (confused.length >= 8) scoreNote += 5;
    if (next.length >= 8) scoreNote += 5;
    var scoreOut = (link ? 6 : 0) + (habits.git ? 5 : 0) + (done === 4 ? 4 : done >= 2 ? 2 : 0);
    var hour = new Date(submittedAt).getHours() + new Date(submittedAt).getMinutes() / 60;
    var scorePunct = isBackfill ? 8 : hour < 20 ? 15 : hour < 22 ? 12 : hour < 23.5 ? 6 : 0;
    var score = Math.round(Math.min(100, scoreTask + scoreHabit + scoreNote + scoreOut + scorePunct));

    var grade = score >= 90 ? 'S' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D';
    var gradeText = { S: '优秀', A: '过关', B: '及格', C: '勉强', D: '欠账' }[grade];

    var summary = 'Day ' + day.day + '｜' + day.topic + '。今天走了 ' + done + '/4 个时间块，完成 ' +
      habitCount + '/3 项交付动作，投入约 ' + fmtHours(minutes) + ' 小时' +
      (isBackfill ? '。这是一次补交，按补卡计分。' : hour >= 23 ? '，' + hhmm(submittedAt) + ' 才提交。' : '。') +
      ' ' + (score >= 90 ? '节奏很稳，这一页可以翻过去了。' :
        score >= 80 ? '主线走完了，留了一点小尾巴，明天先补上。' :
        score >= 70 ? '完成了大半，但有空着的地方，别带着窟窿往前。' :
        score >= 60 ? '今天只能算勉强过关，欠的那块明天要还。' :
        '今天没过线。先补产出，再谈进度。');

    var strong = [];
    if (done === 4) strong.push('四个时间块全部走完，节奏完整。');
    else if (done >= 2) strong.push('完成了 ' + done + '/4 个时间块，主线没断。');
    if (habits.git) strong.push('代码提交了，今天的产出留了痕。');
    if (learned.length >= 60) strong.push('笔记写得具体，周末复盘能直接用。');
    if (!isBackfill && hour < 21) strong.push('提交得早，晚上还留了缓冲。');
    if (streak() >= 3) strong.push('已经连续 ' + streak() + ' 天打卡。');
    if (link) strong.push('附了产出链接，之后回看方便。');
    if (minutes >= 420 && done >= 3) strong.push('投入超过 7 小时，今天的量够了。');
    strong = strong.slice(0, 3);
    if (!strong.length) strong.push('今天至少把这一页打开了，明天从第一个时间块开始。');

    var improve = [];
    if (!tasks.b3) improve.push('块三「独立做」没完成——这是最值钱的一块，明天先补 40 分钟。');
    if (!tasks.b4) improve.push('块四的产出没交付，今天等于没留下能看的东西。');
    if (!habits.git) improve.push('代码还没提交。哪怕只有三行，也先 commit 一次。');
    if (!confused) improve.push('没写「哪里没懂」，问题池会空，周末没得复盘。');
    if (!next) improve.push('没写明天第一件事，明早容易从刷手机开始。');
    if (!isBackfill && hour >= 23) improve.push('提交接近零点，第二天容易欠账。');
    if (rating && rating <= 2) improve.push('自评只有 ' + rating + ' 星，明天把目标缩到一个能完成的最小动作。');
    if (minutes < 240) improve.push('投入不足 4 小时，别让欠账滚到第三天。');
    improve = improve.slice(0, 3);
    if (!improve.length) improve.push('没有明显短板，保持这个节奏。');

    var nextDay = DAY_BY_NUM[day.day + 1];
    var firstTask = nextDay ? nextDay.blocks[0].task.split(/[；;。]/)[0].slice(0, 36) : '';
    var advice = nextDay
      ? '明天进入「' + nextDay.topic + '」。第一件事：' + firstTask + '。先做 25 分钟，再打开教程。'
      : '51 天走完了。把 README、评测报告和复盘整理成一页，1 月带着它去投实习。';

    return {
      score: score, grade: grade, gradeText: gradeText, summary: summary,
      strengths: strong, improvements: improve, advice: advice
    };
  }

  function buildRecord(iso, learned, confused, next, rating, link, hoursInput) {
    var day = dayByISO(iso);
    var p = prog(iso);
    var tasks = Object.assign({}, p.tasks);
    var habits = Object.assign({}, p.habits);
    var autoMin = dayMinutes(iso);
    var minutes = Math.round((Number(hoursInput) > 0 ? Number(hoursInput) : autoMin / 60) * 60);
    if (!minutes || minutes < 0) minutes = autoMin;
    minutes = Math.min(minutes, 16 * 60);
    var submittedAt = new Date().toISOString();
    var ev = evaluate(day, tasks, habits, { learned: learned, confused: confused, next: next }, rating, link, minutes, submittedAt);
    return {
      day: day.day, date: iso, tasks: tasks, habits: habits, minutes: minutes,
      notes: { learned: learned, confused: confused, next: next },
      rating: rating, link: link, submittedAt: submittedAt,
      score: ev.score, grade: ev.grade, gradeText: ev.gradeText,
      evaluation: ev
    };
  }

  /* ============================================================ sheets */

  var sheetRoot = null, sheetPanel = null;

  function openSheet(html, kind, date) {
    sheetRoot = $('#sheet');
    sheetPanel = $('.sheet-panel', sheetRoot);
    sheetPanel.dataset.kind = kind || '';
    sheetPanel.dataset.date = date || '';
    sheetPanel.innerHTML = html;
    sheetRoot.classList.add('open');
    sheetRoot.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    sheetPanel.scrollTop = 0;
    setTimeout(function () {
      var f = sheetPanel.querySelector('textarea, input');
      if (f && kind === 'submit') f.focus();
    }, 260);
  }
  function closeSheet() {
    var root = $('#sheet');
    root.classList.remove('open');
    root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  function sheetHead(title, sub) {
    return '<div class="grab"></div><div class="sheet-h"><div style="flex:1"><h2>' + esc(title) + '</h2>' +
      (sub ? '<p>' + esc(sub) + '</p>' : '') + '</div>' +
      '<button class="sheet-x" data-act="close-sheet" aria-label="关闭">' + icon('x') + '</button></div>';
  }

  function openSubmitSheet(iso) {
    var day = dayByISO(iso);
    if (!day) return;
    var rec = sub(iso);
    var p = prog(iso);
    var mins = rec ? rec.minutes : dayMinutes(iso);
    var hours = mins ? (Math.round(mins / 30) / 2) : 0;
    var notes = rec ? rec.notes : (function () {
      var prev = state.reviews ? null : null;
      return { learned: '', confused: '', next: '' };
    })();
    ui.rating = rec ? rec.rating : 0;
    var stars = [1, 2, 3, 4, 5].map(function (i) {
      return '<button class="star ' + (i <= ui.rating ? 'on' : '') + '" data-act="star" data-v="' + i + '" aria-label="' + i + ' 星">' + icon('star') + '</button>';
    }).join('');
    var done = doneBlocks(iso), habits = doneHabits(iso);
    var html = sheetHead(rec ? '修改 Day ' + day.day + ' 的提交' : '提交 Day ' + day.day, dateLabel(iso) + ' · ' + weekdayOf(iso) + ' · ' + day.topic) +
      '<div class="sheet-body">' +
        '<div class="review-stat">' +
          '<div class="rs"><b>' + done + '/4</b><span>时间块</span></div>' +
          '<div class="rs"><b>' + habits + '/3</b><span>交付动作</span></div>' +
          '<div class="rs"><b>' + fmtHours(mins) + ' h</b><span>自动计时</span></div>' +
        '</div>' +
        '<div class="field"><label>今天学了什么？（必须写）</label>' +
          '<textarea id="f-learned" rows="3" maxlength="800" placeholder="例：弄懂了 f-string 和类型转换，能自己写一个个人信息卡。">' + esc(notes.learned) + '</textarea></div>' +
        '<div class="field"><label>哪里还没懂？<span class="muted"> 会进入问题池</span></label>' +
          '<textarea id="f-confused" rows="2" maxlength="400" placeholder="例：while 的边界还是容易写错。">' + esc(notes.confused) + '</textarea></div>' +
        '<div class="field"><label>明天第一件事做什么？</label>' +
          '<input id="f-next" maxlength="120" placeholder="只写一件，具体到动作" value="' + esc(notes.next) + '"></div>' +
        '<div class="field"><label>实际投入（小时）</label>' +
          '<input id="f-hours" type="number" step="0.5" min="0" max="16" inputmode="decimal" value="' + (hours || '') + '" placeholder="按计时自动填，可改"></div>' +
        '<div class="field"><label>今天的自评</label><div class="stars" id="stars">' + stars + '</div></div>' +
        '<div class="field"><label>产出链接（可选）</label>' +
          '<input id="f-link" maxlength="300" placeholder="GitHub 仓库 / 部署地址 / 文件位置" value="' + esc(rec ? rec.link : '') + '"></div>' +
        '<button class="btn btn-primary btn-xl mt16" data-act="save-submit">' + (rec ? '重新提交并更新评价' : '提交并生成评价') + '</button>' +
        '<p class="fineprint">提交后随时可以改。评分只看今天的完成度、笔记和提交时间。</p>' +
      '</div>';
    openSheet(html, 'submit', iso);
  }

  function openEvalSheet(iso) {
    var rec = sub(iso);
    if (!rec) return;
    var ev = rec.evaluation;
    var color = { S: '#fbbf24', A: '#6ee7b7', B: '#93c5fd', C: '#fcd34d', D: '#fb7185' }[rec.grade];
    var html = sheetHead('今日评价', dateLabel(iso) + ' · 提交于 ' + hhmm(rec.submittedAt)) +
      '<div class="sheet-body">' +
        '<div class="eval-top">' +
          '<div class="eval-ring" style="--v:' + rec.score + ';--rc:' + color + '"><div class="eval-ring-in"><b>' + rec.score + '</b><span>今日得分</span></div></div>' +
          '<span class="eval-grade g-' + rec.grade + '">' + rec.grade + ' · ' + rec.gradeText + '</span>' +
          '<div class="eval-title">' + rec.blocksTitle + '</div>' +
          '<div class="eval-sub">' + fmtDuration(rec.minutes) + ' · ' + (rec.tasks.b3 ? '独立块完成' : '独立块未完成') + '</div>' +
        '</div>' +
        '<div class="eval-summary">' + esc(ev.summary) + '</div>' +
        '<div class="eval-sec"><h4>' + icon('check') + '做得好的</h4><ul>' + ev.strengths.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="eval-sec bad"><h4>' + icon('bell') + '明天改一点</h4><ul>' + ev.improvements.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="eval-advice">' + icon('right') + '<div>' + esc(ev.advice) + '</div></div>' +
        '<div class="sheet-actions"><button class="btn btn-primary" data-act="close-sheet">收工</button>' +
          '<button class="btn" data-act="tab" data-tab="review">去复盘</button></div>' +
      '</div>';
    openSheet(html, 'eval', iso);
  }

  function openDaySheet(iso) {
    var day = dayByISO(iso);
    if (!day) return;
    var rec = sub(iso);
    var p = state.progress[iso] || { tasks: {}, habits: {} };
    var done = doneBlocks(iso);
    var blocks = day.blocks.map(function (b) {
      var on = !!(p.tasks || {})[b.id];
      return '<div class="bl ' + (on ? 'on' : '') + '"><span class="bd">' + icon('check') + '</span>' +
        '<span>' + esc(b.title) + ' · ' + b.start + '–' + b.end + '</span><b>' + (on ? '已完成' : '未完成') + '</b></div>';
    }).join('');
    var actions = '';
    if (iso === todayISO()) {
      actions = '<button class="btn btn-primary" data-act="close-sheet">回到今日</button>' +
        (rec ? '<button class="btn" data-act="open-eval" data-date="' + iso + '">看评价</button>' : '<button class="btn" data-act="open-submit" data-date="' + iso + '">去提交</button>');
    } else if (rec) {
      actions = '<button class="btn btn-primary" data-act="open-eval" data-date="' + iso + '">查看评价</button>' +
        '<button class="btn" data-act="open-submit" data-date="' + iso + '">修改提交</button>';
    } else if (iso < todayISO()) {
      actions = '<button class="btn btn-primary" data-act="open-submit" data-date="' + iso + '">补交这一天</button>' +
        '<button class="btn" data-act="close-sheet">先看看</button>';
    } else {
      actions = '<button class="btn" data-act="close-sheet">还没到这一天</button>';
    }
    var html = sheetHead('D' + day.day + ' · ' + dateLabel(iso), weekdayOf(iso) + ' · 第 ' + day.week + ' 周 · ' + WEEK_BY_NUM[day.week].theme) +
      '<div class="sheet-body">' +
        '<div class="detail-topic">' + esc(day.topic) + '</div>' +
        '<div class="detail-meta mt8"><span class="chip">' + done + '/4 时间块</span>' +
          (rec ? '<span class="chip chip-done">' + rec.score + ' 分 · ' + rec.grade + '</span>' : '') +
          (iso === todayISO() ? '<span class="chip chip-week">今天</span>' : '') + '</div>' +
        '<div class="detail-grid">' +
          '<div class="dg"><h4>学什么</h4><p>' + esc(day.learn) + '</p></div>' +
          '<div class="dg"><h4>动手做什么</h4><p>' + esc(day.practice) + '</p></div>' +
          '<div class="dg out"><h4>当天产出</h4><p>' + esc(day.deliverable) + '</p></div>' +
        '</div>' +
        '<div class="blist">' + blocks + '</div>' +
        (rec ? '<div class="eval-advice" style="margin-top:14px">' + icon('info') + '<div>' + esc(rec.evaluation.advice) + '</div></div>' : '') +
        '<div class="sheet-actions">' + actions + '</div>' +
      '</div>';
    openSheet(html, 'day', iso);
  }

  function openSliceSheet(n) {
    var s = DATA.slices.filter(function (x) { return x.n === n; })[0];
    if (!s) return;
    var html = sheetHead('切片 ' + s.n + ' · ' + s.name, '每周日下午 4—5 小时') +
      '<div class="sheet-body">' +
        '<div class="detail-grid"><div class="dg"><h4>做什么</h4><p>' + esc(s.task) + '</p></div>' +
        '<div class="dg out"><h4>验收标准</h4><p>' + esc(s.accept) + '</p></div></div>' +
        '<p class="review-note">切片前先写一句话：这次要证明什么。切片结束记三件事：花了多久、卡在哪、下次改什么。</p>' +
        '<div class="sheet-actions"><button class="btn btn-primary" data-act="close-sheet">知道了</button></div>' +
      '</div>';
    openSheet(html, 'slice');
  }

  function openReviewReport(week) {
    var r = state.reviews[week];
    if (!r) return;
    var color = r.score >= 80 ? '#6ee7b7' : r.score >= 60 ? '#fcd34d' : '#fb7185';
    var html = sheetHead('第 ' + week + ' 周复盘', WEEK_BY_NUM[week].theme) +
      '<div class="sheet-body">' +
        '<div class="eval-top">' +
          '<div class="eval-ring" style="--v:' + r.score + ';--rc:' + color + '"><div class="eval-ring-in"><b>' + r.score + '</b><span>验收得分</span></div></div>' +
          '<span class="eval-grade ' + (r.pass ? 'g-A' : 'g-C') + '">' + (r.pass ? '这周算过' : '这周不算过') + '</span>' +
          '<div class="eval-title">' + r.checks.filter(Boolean).length + ' / 6 项通过</div>' +
          '<div class="eval-sub">打卡 ' + r.stats.subs + '/' + r.stats.days + ' 天 · ' + fmtDuration(r.stats.hours) + ' · 平均 ' + (r.stats.avg || '—') + ' 分</div>' +
        '</div>' +
        '<div class="eval-summary">' + esc(r.summary) + '</div>' +
        (r.advice.length ? '<div class="eval-sec bad"><h4>' + icon('bell') + '下周补上</h4><ul>' + r.advice.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></div>' : '') +
        '<div class="sheet-actions"><button class="btn btn-primary" data-act="close-sheet">收工</button></div>' +
      '</div>';
    openSheet(html, 'report');
  }

  function saveReview(week) {
    var draft = ui.reviewDrafts[week];
    if (!draft) return;
    var st = weekStats(week);
    var checks = draft.checks.slice();
    var passed = checks.filter(Boolean).length;
    var score = Math.round(passed / 6 * 100);
    var advice = [];
    var tips = [
      '产出和提交有缺口，先把每天的 Git 提交捡回来。',
      '讲不清概念说明只是「认识」。挑三个概念，关掉资料讲一遍。',
      '练习没全跑通，别开新章节，先把报错清掉。',
      '切片没进展，下周日上午留 3 小时只做切片。',
      '笔记和问题池是空的，周末复盘会没抓手。',
      '身体是底线。这周至少补三次运动，睡够 7 小时。'
    ];
    checks.forEach(function (c, i) { if (!c) advice.push(tips[i]); });
    var summary = '第 ' + week + ' 周打卡 ' + st.subs.length + '/' + st.days.length + ' 天，累计 ' +
      fmtDuration(st.hours) + '，平均 ' + (st.avg || '—') + ' 分。验收清单过了 ' + passed + '/6 项。' +
      (passed >= 4
        ? '这周算过，' + (!advice.length ? '六项全过，保持。' : advice.length === 1 ? '把没过的那一项补上再开新周。' : '把没过的 ' + advice.length + ' 项补上再开新周。')
        : '六项里少于四个，这周不算过。先补产出，再谈进度。');
    state.reviews[week] = {
      answers: draft.answers.slice(), checks: checks, score: score, pass: passed >= 4,
      verdict: (passed >= 4 ? '这周算过' : '这周不算过') + ' · ' + passed + '/6',
      summary: summary, advice: advice, stats: { subs: st.subs.length, days: st.days.length, hours: st.hours, avg: st.avg },
      savedAt: new Date().toISOString()
    };
    save();
    render();
    openReviewReport(week);
  }

  function openExport() {
    var payload = { app: 'FDE51', version: 1, exportedAt: new Date().toISOString(), state: state };
    var txt = JSON.stringify(payload, null, 2);
    var html = sheetHead('导出学习数据', '复制下面的 JSON，存到网盘或发给自己') +
      '<div class="sheet-body">' +
        '<textarea class="import-area" id="exportArea" rows="12" readonly>' + esc(txt) + '</textarea>' +
        '<div class="sheet-actions"><button class="btn btn-primary" data-act="copy-export">复制 JSON</button>' +
        '<button class="btn" data-act="close-sheet">关闭</button></div>' +
      '</div>';
    openSheet(html, 'export');
  }

  function openImport() {
    var html = sheetHead('导入学习数据', '粘贴之前导出的 JSON，会覆盖当前记录') +
      '<div class="sheet-body">' +
        '<textarea class="import-area" id="importArea" rows="10" placeholder="在这里粘贴 JSON"></textarea>' +
        '<div class="sheet-actions"><button class="btn btn-primary" data-act="do-import">导入并覆盖</button>' +
        '<button class="btn" data-act="close-sheet">取消</button></div>' +
      '</div>';
    openSheet(html, 'import');
  }

  function openFinal() {
    var items = DATA.finalChecklist.map(function (t, i) {
      var on = !!state.finalChecks[i];
      return '<button class="chk ' + (on ? 'on' : '') + '" data-act="final-check" data-i="' + i + '">' +
        '<span class="box">' + icon('check') + '</span><span>' + esc(t) + '</span></button>';
    }).join('');
    var count = Object.keys(state.finalChecks).filter(function (k) { return state.finalChecks[k]; }).length;
    var html = sheetHead('结营验收', '12 月 31 日那天该交出的东西 · ' + count + '/5') +
      '<div class="sheet-body"><div class="checklist">' + items + '</div>' +
        '<p class="review-note">' + esc(DATA.finalChecklist.length ? '全部打勾，再写 51 天复盘和简历初稿。' : '') + '</p>' +
        '<div class="sheet-actions"><button class="btn btn-primary" data-act="close-sheet">知道了</button></div></div>';
    openSheet(html, 'final');
  }

  function openFinalReport() {
    var total = submittedCount();
    var missed = 51 - total;
    var mins = totalMinutes();
    var avg = avgScore();
    var best = 0, cur = 0, prev = null;
    DAYS.forEach(function (d) {
      if (sub(d.date)) { cur++; best = Math.max(best, cur); }
      else if (d.date < todayISO()) cur = 0;
    });
    var summary = '51 天里打卡 ' + total + ' 天，欠卡 ' + missed + ' 天，累计投入约 ' + fmtHours(mins) +
      ' 小时，平均 ' + (avg || '—') + ' 分，最长连续 ' + best + ' 天。' +
      (total >= 45 ? '这个完成度已经够拿出去讲了。' : total >= 30 ? '主线基本跑通，欠的那几天补在 1 月。' : '完成度偏低，先别投简历，把项目跑起来再说。');
    var html = sheetHead('51 天总复盘', '2026.11.11 — 12.31') +
      '<div class="sheet-body">' +
        '<div class="review-stat">' +
          '<div class="rs"><b>' + total + '</b><span>打卡天数</span></div>' +
          '<div class="rs"><b>' + fmtHours(mins) + ' h</b><span>累计投入</span></div>' +
          '<div class="rs"><b>' + (avg || '—') + '</b><span>平均得分</span></div>' +
        '</div>' +
        '<div class="eval-summary mt12">' + esc(summary) + '</div>' +
        '<div class="eval-sec"><h4>接下来</h4><ul>' +
          '<li>把系统演示链路录成 3 分钟视频，面试时直接放。</li>' +
          '<li>README 补上架构图和「失败过什么」。</li>' +
          '<li>评测报告留 3 个失败案例，别只写准确率。</li>' +
          '<li>简历项目段用数字写：几张表、几个接口、准确率多少。</li>' +
        '</ul></div>' +
        '<div class="eval-advice">' + icon('right') + '<div>这 51 天不是让你变成工程师，是让你有资格开始当工程师。</div></div>' +
        '<div class="sheet-actions"><button class="btn btn-primary" data-act="close-sheet">收工</button></div>' +
      '</div>';
    openSheet(html, 'final-report');
  }

  function openAbout() {
    var html = sheetHead('关于这份计划', 'FDE 入门 51 天 · 2027 届校招') +
      '<div class="sheet-body">' +
        '<div class="eval-summary">这份 App 根据你的《FDE 入门 51 天学习计划（11 月 11 日 — 12 月 31 日）》生成。' +
        '每天四个时间块、当天产出、每周复盘和 12/31 结营清单都来自原文档；评价规则是本地写死的，不联网、不上传。</div>' +
        '<div class="eval-sec"><h4>三条硬规则</h4><ul>' + DATA.rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="eval-sec bad"><h4>三条止损线</h4><ul>' + DATA.review.stopLoss.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></div>' +
        '<p class="review-note">提醒时间：08:55 开工、14:25 独立块、21:30 提交、22:40 最后提醒。手机系统如果限制后台，提醒可能延迟几分钟。</p>' +
        '<div class="sheet-actions"><button class="btn btn-primary" data-act="close-sheet">知道了</button></div>' +
      '</div>';
    openSheet(html, 'about');
  }

  /* ============================================================ notifications */

  var notifTimer = null;

  async function refreshNotifStatus() {
    if (!IS_NATIVE || !LN) return;
    try {
      var p = await LN.checkPermissions();
      var el = $('#notifStatus');
      if (el) el.textContent = p.display === 'granted' ? '已授权 · 系统通知' : '未授权 · 点此开启';
    } catch (e) { }
  }

  async function setupNotifications(ask) {
    if (!IS_NATIVE || !LN) {
      if (typeof Notification !== 'undefined' && state.settings.reminders) {
        if (Notification.permission === 'default' && ask) { try { await Notification.requestPermission(); } catch (e) { } }
        startWebReminderLoop();
      }
      return;
    }
    try {
      var perm = await LN.checkPermissions();
      if (perm.display !== 'granted' && ask) perm = await LN.requestPermissions();
      if (perm.display !== 'granted') { refreshNotifStatus(); return; }
      await LN.createChannel({ id: 'study', name: '学习提醒', description: '每日时间块与提交提醒', importance: 4, visibility: 1, sound: 'default' }).catch(function () { });
      await LN.cancel({ notifications: [1001, 1002, 1003, 1004, 1099].map(function (id) { return { id: id }; }) }).catch(function () { });
      if (state.settings.reminders) {
        await LN.schedule({
          notifications: [
            {
              id: 1001, title: '块一 · 学概念', body: '打开今日任务，先看 2 小时概念，不敲代码。',
              channelId: 'study', schedule: { on: { hour: 8, minute: 55 }, repeats: true, allowWhileIdle: true }
            },
            {
              id: 1002, title: '块三 · 独立做', body: '关掉教程，独立完成今天的练习。卡 40 分钟就问。',
              channelId: 'study', schedule: { on: { hour: 14, minute: 25 }, repeats: true, allowWhileIdle: true }
            },
            {
              id: 1003, title: '今天还没交卡', body: '花 3 分钟写三句话，提交后拿今日评价。',
              channelId: 'study', schedule: { on: { hour: 21, minute: 30 }, repeats: true, allowWhileIdle: true }
            },
            {
              id: 1004, title: '最后提醒', body: '再过一会儿今天就翻页了。欠的产出明天要还。',
              channelId: 'study', schedule: { on: { hour: 22, minute: 40 }, repeats: true, allowWhileIdle: true }
            }
          ]
        });
      }
      refreshNotifStatus();
    } catch (e) {
      console.warn('notification setup failed', e);
    }
  }

  function startWebReminderLoop() {
    if (notifTimer) return;
    var fired = {};
    notifTimer = setInterval(function () {
      if (!state.settings.reminders) return;
      var now = new Date();
      var key = isoOf(now) + '|' + now.getHours() + ':' + now.getMinutes();
      var slots = [[8, 55, '块一开始', '打开今日任务，先看 2 小时概念。'], [14, 25, '块三 · 独立做', '关掉教程，独立完成今天的练习。'], [21, 30, '今天还没交卡', '花 3 分钟写三句话，提交后拿评价。'], [22, 40, '最后提醒', '欠的产出明天要还。']];
      slots.forEach(function (s) {
        if (now.getHours() === s[0] && now.getMinutes() === s[1] && !fired[key + s[0]]) {
          fired[key + s[0]] = 1;
          if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            try { new Notification(s[2], { body: s[3], tag: 'fde51-' + s[0] }); } catch (e) { }
          }
        }
      });
    }, 30000);
  }

  async function testNotification() {
    if (!IS_NATIVE || !LN) {
      if (typeof Notification === 'undefined') { toast('当前环境不支持系统通知'); return; }
      if (Notification.permission !== 'granted') {
        var p = await Notification.requestPermission();
        if (p !== 'granted') { toast('通知权限没开，去系统设置里打开'); return; }
      }
      new Notification('FDE 学习助手', { body: '提醒能收到。到点我会喊你。' });
      toast('已发一条测试通知');
      return;
    }
    var perm = await LN.checkPermissions();
    if (perm.display !== 'granted') perm = await LN.requestPermissions();
    if (perm.display !== 'granted') { toast('通知权限没开，去系统设置里打开'); refreshNotifStatus(); return; }
    await LN.schedule({
      notifications: [{
        id: 1099, title: 'FDE 学习助手', body: '提醒能收到。到点我会喊你。',
        channelId: 'study', schedule: { at: new Date(Date.now() + 3000) }
      }]
    }).catch(function (e) { console.warn(e); });
    toast('3 秒后收到一条测试通知');
    refreshNotifStatus();
  }

  async function toggleReminders() {
    state.settings.reminders = !state.settings.reminders;
    save();
    render();
    if (!IS_NATIVE) {
      if (state.settings.reminders && typeof Notification !== 'undefined' && Notification.permission === 'default') {
        try { await Notification.requestPermission(); } catch (e) { }
      }
      startWebReminderLoop();
      toast(state.settings.reminders ? '已开启应用内提醒' : '已关闭提醒');
      return;
    }
    if (state.settings.reminders) { await setupNotifications(true); toast('已开启每日提醒'); }
    else {
      if (LN) await LN.cancel({ notifications: [1001, 1002, 1003, 1004].map(function (id) { return { id: id }; }) }).catch(function () { });
      toast('已关闭每日提醒');
    }
  }

  /* ============================================================ import/export */

  function copyExport() {
    var el = $('#exportArea');
    if (!el) return;
    el.select();
    el.setSelectionRange(0, 999999);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { }
    if (!ok && navigator.clipboard) {
      navigator.clipboard.writeText(el.value).then(function () { toast('已复制'); }).catch(function () { toast('复制失败，手动选择吧'); });
      return;
    }
    toast(ok ? '已复制到剪贴板' : '复制失败，手动选择吧');
  }

  function doImport() {
    var el = $('#importArea');
    if (!el) return;
    var txt = el.value.trim();
    if (!txt) { toast('先粘贴 JSON'); return; }
    var parsed;
    try { parsed = JSON.parse(txt); } catch (e) { toast('JSON 格式不对'); return; }
    var s = parsed && parsed.state ? parsed.state : parsed;
    if (!s || typeof s !== 'object' || !s.progress || !s.submissions) { toast('这份数据不像是本 App 导出的'); return; }
    if (!window.confirm('导入会覆盖当前所有记录，确定吗？')) return;
    var base = defaultState();
    base.progress = s.progress || {};
    base.submissions = s.submissions || {};
    base.reviews = s.reviews || {};
    base.problems = Array.isArray(s.problems) ? s.problems : [];
    base.finalChecks = s.finalChecks || {};
    base.settings = Object.assign(base.settings, s.settings || {});
    state = base;
    save();
    closeSheet();
    ui.reviewDrafts = {};
    render();
    toast('已导入');
  }

  function resetAll() {
    if (!window.confirm('这会清空所有打卡、评价和复盘记录，且无法恢复。确定要重置吗？')) return;
    if (!window.confirm('最后确认一次：真的要全部清空吗？')) return;
    state = defaultState();
    save();
    ui.reviewDrafts = {};
    closeSheet();
    render();
    toast('已重置');
  }

  /* ============================================================ events */

  function onClick(e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.dataset.act;
    var iso = el.dataset.date;
    var bid = el.dataset.block;

    if (act === 'tab') {
      closeSheet();
      switchTab(el.dataset.tab);
      return;
    }
    if (act === 'close-sheet') { closeSheet(); return; }
    if (act === 'toggle-week') {
      var wk = el.dataset.week;
      ui.openWeeks[wk] = !ui.openWeeks[wk];
      el.closest('.week').classList.toggle('open');
      return;
    }
    if (act === 'filter') {
      ui.filter = el.dataset.f;
      render();
      return;
    }
    if (act === 'goto-missed') {
      ui.tab = 'plan';
      ui.filter = 'miss';
      render();
      window.scrollTo(0, 0);
      return;
    }
    if (act === 'start-block') {
      if (!iso) iso = todayISO();
      if (!bid) {
        var d = dayByISO(iso);
        var p = state.progress[iso] || { tasks: {} };
        var nb = d.blocks.filter(function (b) { return !(p.tasks || {})[b.id]; })[0];
        bid = nb ? nb.id : d.blocks[0].id;
      }
      startBlock(iso, bid);
      return;
    }
    if (act === 'pause-block') { pauseBlock(iso, bid); return; }
    if (act === 'done-block') { completeBlock(iso, bid); return; }
    if (act === 'undo-block') { undoBlock(iso, bid); return; }
    if (act === 'habit') { toggleHabit(iso, el.dataset.k); return; }
    if (act === 'open-submit') { openSubmitSheet(iso || todayISO()); return; }
    if (act === 'save-submit') { saveSubmit(); return; }
    if (act === 'open-eval') { openEvalSheet(iso || todayISO()); return; }
    if (act === 'open-day') { openDaySheet(iso); return; }
    if (act === 'open-slice') { openSliceSheet(+el.dataset.n); return; }
    if (act === 'review-week') {
      var w = +el.dataset.week;
      ui.reviewWeek = w;
      window.scrollTo(0, 0);
      render();
      return;
    }
    if (act === 'toggle-check') {
      var i = +el.dataset.i;
      var d0 = ui.reviewDrafts[ui.reviewWeek];
      if (d0) { d0.checks[i] = !d0.checks[i]; el.classList.toggle('on'); }
      return;
    }
    if (act === 'save-review') { saveReview(+el.dataset.week); return; }
    if (act === 'star') {
      ui.rating = +el.dataset.v;
      $$('#stars .star').forEach(function (s) { s.classList.toggle('on', +s.dataset.v <= ui.rating); });
      return;
    }
    if (act === 'toggle-reminders') { toggleReminders(); return; }
    if (act === 'toggle-supervision') {
      state.settings.supervision = !state.settings.supervision;
      save(); render(); toast(state.settings.supervision ? '监督模式已开' : '监督模式已关');
      return;
    }
    if (act === 'test-notif') { testNotification(); return; }
    if (act === 'export') { openExport(); return; }
    if (act === 'copy-export') { copyExport(); return; }
    if (act === 'import') { openImport(); return; }
    if (act === 'do-import') { doImport(); return; }
    if (act === 'reset') { resetAll(); return; }
    if (act === 'about') { openAbout(); return; }
    if (act === 'open-final') { openFinal(); return; }
    if (act === 'open-final-report') { openFinalReport(); return; }
    if (act === 'final-check') {
      var fi = +el.dataset.i;
      state.finalChecks[fi] = !state.finalChecks[fi];
      save();
      el.classList.toggle('on');
      var cnt = Object.keys(state.finalChecks).filter(function (k) { return state.finalChecks[k]; }).length;
      var h = $('.sheet-h p', sheetPanel);
      if (h) h.textContent = '12 月 31 日那天该交出的东西 · ' + cnt + '/5';
      return;
    }
    if (act === 'problem-add') { addProblem(); return; }
    if (act === 'problem-toggle') {
      var pid = +el.dataset.id;
      state.problems.forEach(function (p) { if (p.id === pid) p.done = !p.done; });
      save(); render(); return;
    }
    if (act === 'problem-del') {
      var did = +el.dataset.id;
      state.problems = state.problems.filter(function (p) { return p.id !== did; });
      save(); render(); return;
    }
  }

  function saveSubmit() {
    var iso = sheetPanel.dataset.date;
    if (!iso) return;
    var learned = ($('#f-learned') || {}).value || '';
    if (learned.trim().length < 5) {
      toast('先写一句今天学了什么吧');
      var f = $('#f-learned');
      if (f) { f.focus(); f.style.borderColor = 'rgba(251,113,133,.6)'; }
      return;
    }
    var confused = (($('#f-confused') || {}).value || '').trim();
    var next = (($('#f-next') || {}).value || '').trim();
    var hours = ($('#f-hours') || {}).value || '';
    var link = (($('#f-link') || {}).value || '').trim();
    var p = prog(iso);
    if (learned.trim().length >= 15) p.habits.note = true;
    if (confused) p.habits.pool = true;
    var active = activeBlock(iso);
    if (active && p.timers[active] && p.timers[active].startedAt) {
      p.timers[active].acc = (p.timers[active].acc || 0) + (Date.now() - p.timers[active].startedAt);
      p.timers[active].startedAt = null;
    }
    var rec = buildRecord(iso, learned.trim(), confused, next, ui.rating, link, hours);
    rec.blocksTitle = (function () {
      var done = Object.keys(rec.tasks).filter(function (k) { return rec.tasks[k]; }).length;
      return done + '/4 个时间块 · ' + ['git', 'note', 'pool'].filter(function (k) { return rec.habits[k]; }).length + '/3 项交付';
    })();
    state.submissions[iso] = rec;
    if (confused) {
      var exists = state.problems.some(function (x) { return !x.done && x.text === confused; });
      if (!exists) {
        state.problems.unshift({ id: Date.now(), text: confused, date: iso, done: false });
      }
    }
    save();
    closeSheet();
    render();
    setTimeout(function () { openEvalSheet(iso); }, 280);
  }

  function addProblem() {
    var input = $('#problemInput');
    if (!input) return;
    var v = input.value.trim();
    if (!v) { toast('先写一句问题'); return; }
    state.problems.unshift({ id: Date.now(), text: v, date: todayISO(), done: false });
    save();
    input.value = '';
    render();
    toast('已放进问题池');
  }

  function onKey(e) {
    if (e.key === 'Enter' && e.target && e.target.id === 'problemInput') {
      e.preventDefault();
      addProblem();
    }
  }

  /* ============================================================ init */

  async function init() {
    var cur = planDayNow();
    ui.openWeeks[cur.week] = true;
    if (ui.reviewWeek == null) ui.reviewWeek = cur.week;
    render();
    setInterval(tick, 1000);

    if (IS_NATIVE) {
      try {
        var SB = window.Capacitor.Plugins.StatusBar;
        if (SB) {
          await SB.setOverlaysWebView({ overlay: false }).catch(function () { });
          await SB.setBackgroundColor({ color: '#070b14' }).catch(function () { });
          await SB.setStyle({ style: 'DARK' }).catch(function () { });
        }
      } catch (e) { }
      try {
        var AppP = window.Capacitor.Plugins.App;
        if (AppP) {
          AppP.addListener('appStateChange', function (st) {
            if (st.isActive) {
              ui.now = new Date();
              render();
              setupNotifications(false);
            }
          });
          AppP.addListener('backButton', function () {
            var root = $('#sheet');
            if (root && root.classList.contains('open')) { closeSheet(); return; }
            if (ui.tab !== 'today') { ui.tab = 'today'; render(); window.scrollTo(0, 0); return; }
            if (AppP.minimizeApp) AppP.minimizeApp();
          });
        }
      } catch (e) { }
      setTimeout(function () { setupNotifications(true); }, 900);
    } else {
      startWebReminderLoop();
    }
  }

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKey);
  init();
})();