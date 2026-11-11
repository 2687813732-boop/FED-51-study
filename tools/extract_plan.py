# -*- coding: utf-8 -*-
"""Extract the 51-day plan from the Word document into www/data.js."""
import json
import re
from datetime import date
from pathlib import Path

import docx

SRC = Path(r"F:\deepseek-harness\毕设\FDE入门51天学习计划_11月11日至12月31日.docx")
OUT = Path(r"F:\deepseek-harness\fde51-app\www\data.js")

WEEK_META = {
    1: ("环境与 Python 入门", "第 1 周只有 5 天（从周三起），周五、周六那两天是你的缓冲，用来补前面没弄懂的部分。"),
    2: ("函数、文件、模块与 Git", ""),
    3: ("面向对象、测试与算法", ""),
    4: ("数据库与 SQL", ""),
    5: ("Web 后端与 FastAPI", ""),
    6: ("前端最小知识、Docker 与部署", ""),
    7: ("AI 应用：调用、生成与评测", ""),
    8: ("集成与综合复盘", "第 8 周只有 4 天，剩下的时间留给考试和补漏。"),
}
WEEK_DATES = {
    1: ("11/11", "11/15"),
    2: ("11/16", "11/22"),
    3: ("11/23", "11/29"),
    4: ("11/30", "12/06"),
    5: ("12/07", "12/13"),
    6: ("12/14", "12/20"),
    7: ("12/21", "12/27"),
    8: ("12/28", "12/31"),
}

BLOCK_TIMES = [
    ("b1", "块一 · 学概念", "09:00", "11:00"),
    ("b2", "块二 · 跟练", "11:10", "13:10"),
    ("b3", "块三 · 独立做", "14:30", "16:30"),
    ("b4", "块四 · 产出与复盘", "16:40", "18:40"),
]

QUOTES = [
    "每天必须有一个能跑或能看的东西，没有产出的一天算没过。",
    "卡住超过 40 分钟就问人——同学、老师、AI 都算，别死磕到怀疑自己。",
    "进度落后时先砍项目切片，不砍主线课程。主线断了，后面全乱。",
    "连续三天完不成当天任务：把每天压到 5 小时，先保连续性，别保总量。",
    "到第 20 天还写不出一个能跑的 CRUD：停下来重做第 2 周的练习。",
    "到第 40 天还没部署成功：先用本地环境演示，部署挪到 1 月。",
    "这 51 天不是让你变成工程师，是让你有资格开始当工程师。",
    "关掉教程，从空白文件开始写。抄三遍也长不出手感。",
    "看不懂就换一份讲解，别看第三遍同一篇。",
    "手机放在另一个房间——不是静音，是另一个房间。",
]

RULES = [
    "每天必须有一个能跑或能看的东西，没有产出的一天算没过。",
    "卡住超过 40 分钟就问人（同学、老师、AI 都算），不要死磕到怀疑自己。",
    "进度落后时先砍项目切片，不砍主线课程。主线断了后面全乱。",
]

REVIEW_QUESTIONS = [
    "这周做完了什么？（列产出，不写「学习了 XX」）",
    "哪里卡住了？是概念没懂、环境问题，还是时间不够？",
    "下周最重要的一件事是什么？（只写一件）",
    "有没有为了赶进度跳过了产出？跳过了就补回来。",
]

REVIEW_CHECKLIST = [
    "本周每天的产出物都在，代码已提交。",
    "能不看资料讲清本周的核心概念（随便挑三个讲给自己听）。",
    "本周的练习全部跑通，报错都自己解决过。",
    "项目切片有进展，能演示或能跑。",
    "写了笔记，且有「没懂的问题」清单。",
    "身体没垮：至少运动三次，每天睡够 7 小时。",
]

STOP_LOSS = [
    "连续三天完不成当天任务：把每天压到 5 小时，先保连续性，别保总量。",
    "到第 20 天还写不出一个能跑的 CRUD：停下来重做第 2 周的练习，别硬往前冲。",
    "到第 40 天还没部署成功：先用本地环境做演示，部署挪到 1 月，别在这儿卡死。",
]

FINAL_CHECKLIST = [
    "一个能在线访问的系统，能演示「建活动 → 排班 → 出稿 → 审核」。",
    "一份 README：项目背景、架构图、怎么跑起来。",
    "一份评测报告：20 条样本、准确率、误报率、三个失败案例。",
    "一份 51 天复盘：学会了什么、还缺什么、1 月补什么。",
    "一份简历初稿，项目那一段已经能写出来。",
]


def cell_text(cell):
    return "\n".join(p.text.strip() for p in cell.paragraphs if p.text.strip()).strip()


def main():
    d = docx.Document(SRC)
    days = []
    for wi in range(1, 9):
        table = d.tables[5 + wi]
        rows = table.rows[1:]
        for row in rows:
            cells = [cell_text(c) for c in row.cells]
            m = re.match(r"D(\d+)\s*(\d+)/(\d+)\s*周([一二三四五六日])", cells[0].replace("\n", " "))
            if not m:
                raise SystemExit(f"bad day cell: {cells[0]!r}")
            day_no = int(m.group(1))
            month, dom = int(m.group(2)), int(m.group(3))
            iso = date(2026, month, dom).isoformat()
            topic, learn, practice, deliverable = cells[1:5]
            blocks = [
                {
                    "id": "b1",
                    "title": BLOCK_TIMES[0][1],
                    "start": BLOCK_TIMES[0][2],
                    "end": BLOCK_TIMES[0][3],
                    "minutes": 120,
                    "task": learn,
                    "hint": "看文档 / 教程，记笔记，不敲代码",
                },
                {
                    "id": "b2",
                    "title": BLOCK_TIMES[1][1],
                    "start": BLOCK_TIMES[1][2],
                    "end": BLOCK_TIMES[1][3],
                    "minutes": 120,
                    "task": "照着教程把今天的概念例子敲一遍",
                    "hint": "允许抄，先把概念落到手上",
                },
                {
                    "id": "b3",
                    "title": BLOCK_TIMES[2][1],
                    "start": BLOCK_TIMES[2][2],
                    "end": BLOCK_TIMES[2][3],
                    "minutes": 120,
                    "task": practice,
                    "hint": "关掉教程，独立完成；卡 40 分钟就问",
                },
                {
                    "id": "b4",
                    "title": BLOCK_TIMES[3][1],
                    "start": BLOCK_TIMES[3][2],
                    "end": BLOCK_TIMES[3][3],
                    "minutes": 120,
                    "task": f"交付：{deliverable}",
                    "hint": "提交 Git，写三句话笔记，更新问题池",
                },
            ]
            days.append(
                {
                    "day": day_no,
                    "date": iso,
                    "month": month,
                    "dom": dom,
                    "weekday": f"周{m.group(4)}",
                    "week": wi,
                    "topic": topic,
                    "learn": learn,
                    "practice": practice,
                    "deliverable": deliverable,
                    "blocks": blocks,
                }
            )

    days.sort(key=lambda x: x["day"])
    assert [x["day"] for x in days] == list(range(1, 52)), len(days)
    assert days[0]["date"] == "2026-11-11" and days[-1]["date"] == "2026-12-31"

    weeks = []
    for wi in range(1, 9):
        start, end = WEEK_DATES[wi]
        wdays = [x for x in days if x["week"] == wi]
        weeks.append(
            {
                "week": wi,
                "title": f"第 {wi} 周",
                "dates": f"{start} — {end}",
                "theme": WEEK_META[wi][0],
                "note": WEEK_META[wi][1],
                "from": wdays[0]["day"],
                "to": wdays[-1]["day"],
            }
        )

    slices = []
    for row in d.tables[14].rows[1:]:
        cells = [cell_text(c) for c in row.cells]
        m = re.match(r"(\d+)\s*(.*)", cells[0], re.S)
        slices.append(
            {
                "n": int(m.group(1)),
                "name": m.group(2).strip(),
                "when": cells[1],
                "task": cells[2],
                "accept": cells[3],
            }
        )

    resources = []
    for row in d.tables[15].rows[1:]:
        cells = [cell_text(c) for c in row.cells]
        resources.append({"module": cells[0], "resource": cells[1], "usage": cells[2]})

    faq = []
    paras = d.paragraphs
    for i, p in enumerate(paras):
        if p.style.name == "Heading 3" and p.text.strip().endswith("？"):
            answer = ""
            for q in paras[i + 1 : i + 3]:
                if q.text.strip():
                    answer = q.text.strip()
                    break
            faq.append({"q": p.text.strip(), "a": answer})

    data = {
        "meta": {
            "title": "FDE 入门 51 天学习计划",
            "subtitle": "2026 年 11 月 11 日 — 12 月 31 日 · 每天 8 小时 · 从零开始",
            "start": "2026-11-11",
            "end": "2026-12-31",
            "days": 51,
            "hoursPerDay": 8,
            "hoursTotal": 400,
            "project": "校媒采编工作台 MediaFlow",
            "goal": "能独立写出一个带数据库、带接口、带 AI 功能的服务，并部署到线上",
        },
        "weeks": weeks,
        "days": days,
        "slices": slices,
        "resources": resources,
        "rules": RULES,
        "quotes": QUOTES,
        "review": {
            "questions": REVIEW_QUESTIONS,
            "checklist": REVIEW_CHECKLIST,
            "stopLoss": STOP_LOSS,
        },
        "faq": faq,
        "finalChecklist": FINAL_CHECKLIST,
    }

    OUT.write_text(
        "/* 由 tools/extract_plan.py 从学习计划 Word 生成，勿手改 */\nwindow.PLAN_DATA = "
        + json.dumps(data, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print("days:", len(days), "weeks:", len(weeks), "slices:", len(slices), "faq:", len(faq))
    print("bytes:", OUT.stat().st_size)


if __name__ == "__main__":
    main()