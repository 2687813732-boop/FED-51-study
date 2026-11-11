/* 由 tools/extract_plan.py 从学习计划 Word 生成，勿手改 */
window.PLAN_DATA = {
  "meta": {
    "title": "FDE 入门 51 天学习计划",
    "subtitle": "2026 年 11 月 11 日 — 12 月 31 日 · 每天 8 小时 · 从零开始",
    "start": "2026-11-11",
    "end": "2026-12-31",
    "days": 51,
    "hoursPerDay": 8,
    "hoursTotal": 400,
    "project": "校媒采编工作台 MediaFlow",
    "goal": "能独立写出一个带数据库、带接口、带 AI 功能的服务，并部署到线上"
  },
  "weeks": [
    {
      "week": 1,
      "title": "第 1 周",
      "dates": "11/11 — 11/15",
      "theme": "环境与 Python 入门",
      "note": "第 1 周只有 5 天（从周三起），周五、周六那两天是你的缓冲，用来补前面没弄懂的部分。",
      "from": 1,
      "to": 5
    },
    {
      "week": 2,
      "title": "第 2 周",
      "dates": "11/16 — 11/22",
      "theme": "函数、文件、模块与 Git",
      "note": "",
      "from": 6,
      "to": 12
    },
    {
      "week": 3,
      "title": "第 3 周",
      "dates": "11/23 — 11/29",
      "theme": "面向对象、测试与算法",
      "note": "",
      "from": 13,
      "to": 19
    },
    {
      "week": 4,
      "title": "第 4 周",
      "dates": "11/30 — 12/06",
      "theme": "数据库与 SQL",
      "note": "",
      "from": 20,
      "to": 26
    },
    {
      "week": 5,
      "title": "第 5 周",
      "dates": "12/07 — 12/13",
      "theme": "Web 后端与 FastAPI",
      "note": "",
      "from": 27,
      "to": 33
    },
    {
      "week": 6,
      "title": "第 6 周",
      "dates": "12/14 — 12/20",
      "theme": "前端最小知识、Docker 与部署",
      "note": "",
      "from": 34,
      "to": 40
    },
    {
      "week": 7,
      "title": "第 7 周",
      "dates": "12/21 — 12/27",
      "theme": "AI 应用：调用、生成与评测",
      "note": "",
      "from": 41,
      "to": 47
    },
    {
      "week": 8,
      "title": "第 8 周",
      "dates": "12/28 — 12/31",
      "theme": "集成与综合复盘",
      "note": "第 8 周只有 4 天，剩下的时间留给考试和补漏。",
      "from": 48,
      "to": 51
    }
  ],
  "days": [
    {
      "day": 1,
      "date": "2026-11-11",
      "month": 11,
      "dom": 11,
      "weekday": "周三",
      "week": 1,
      "topic": "环境 + 第一行代码",
      "learn": "装 Python 3.12 与 VS Code；终端常用命令 cd / ls / mkdir / cat；什么是解释器；变量、赋值、print 与 input",
      "practice": "建 study 目录；跑通 hello.py；写 3 个打印个人信息的脚本",
      "deliverable": "3 个可运行的 .py + 环境截图",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "装 Python 3.12 与 VS Code；终端常用命令 cd / ls / mkdir / cat；什么是解释器；变量、赋值、print 与 input",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "建 study 目录；跑通 hello.py；写 3 个打印个人信息的脚本",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：3 个可运行的 .py + 环境截图",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 2,
      "date": "2026-11-12",
      "month": 11,
      "dom": 12,
      "weekday": "周四",
      "week": 1,
      "topic": "数据类型与运算",
      "learn": "int / float / str / bool / None；类型转换；f-string；运算符与优先级；常见类型错误",
      "practice": "30 道字符串与类型转换练习；写「个人信息卡」程序（输入姓名年龄，输出格式化卡片）",
      "deliverable": "练习代码 + 个人信息卡",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "int / float / str / bool / None；类型转换；f-string；运算符与优先级；常见类型错误",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "30 道字符串与类型转换练习；写「个人信息卡」程序（输入姓名年龄，输出格式化卡片）",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：练习代码 + 个人信息卡",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 3,
      "date": "2026-11-13",
      "month": 11,
      "dom": 13,
      "weekday": "周五",
      "week": 1,
      "topic": "流程控制",
      "learn": "if / elif / else；for 与 while；range；break / continue；真值判断（空串、0、None）",
      "practice": "「猜数字」游戏（带次数限制）；九九乘法表；判断闰年与成绩等级",
      "deliverable": "3 个能玩的小程序",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "if / elif / else；for 与 while；range；break / continue；真值判断（空串、0、None）",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "「猜数字」游戏（带次数限制）；九九乘法表；判断闰年与成绩等级",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：3 个能玩的小程序",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 4,
      "date": "2026-11-14",
      "month": 11,
      "dom": 14,
      "weekday": "周六",
      "week": 1,
      "topic": "容器一：list 与 tuple",
      "learn": "下标与切片；增删改查；sort 与 sorted；列表推导；嵌套列表",
      "practice": "「成绩统计」：算平均、最高、排名；「去重保序」两种写法",
      "deliverable": "两个脚本 + 一页手写笔记",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "下标与切片；增删改查；sort 与 sorted；列表推导；嵌套列表",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "「成绩统计」：算平均、最高、排名；「去重保序」两种写法",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：两个脚本 + 一页手写笔记",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 5,
      "date": "2026-11-15",
      "month": 11,
      "dom": 15,
      "weekday": "周日",
      "week": 1,
      "topic": "容器二：dict 与 set + 周验收",
      "learn": "键值对；遍历 items；get / setdefault；集合去重与交并差；什么时候用 dict 而不是 list",
      "practice": "「词频统计」：读一篇 txt，输出出现最多的 10 个词；把本周 5 天的脚本整理进一个目录",
      "deliverable": "词频脚本 + 第一次 Git 提交",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "键值对；遍历 items；get / setdefault；集合去重与交并差；什么时候用 dict 而不是 list",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "「词频统计」：读一篇 txt，输出出现最多的 10 个词；把本周 5 天的脚本整理进一个目录",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：词频脚本 + 第一次 Git 提交",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 6,
      "date": "2026-11-16",
      "month": 11,
      "dom": 16,
      "weekday": "周一",
      "week": 2,
      "topic": "函数",
      "learn": "定义与调用；位置参数 / 默认参数 / 关键字参数；*args 与 **kwargs；返回值与多返回值；作用域",
      "practice": "把前几天的程序全部改成函数；写 10 个工具函数放进 utils.py",
      "deliverable": "utils.py + 调用示例",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "定义与调用；位置参数 / 默认参数 / 关键字参数；*args 与 **kwargs；返回值与多返回值；作用域",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "把前几天的程序全部改成函数；写 10 个工具函数放进 utils.py",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：utils.py + 调用示例",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 7,
      "date": "2026-11-17",
      "month": 11,
      "dom": 17,
      "weekday": "周二",
      "week": 2,
      "topic": "文件与异常",
      "learn": "open 与 with；读 txt / csv / json；try / except / finally；常见异常类型",
      "practice": "「日志分析器」：读一个日志文件，统计 ERROR 行数并按日期汇总；JSON 读写待办数据",
      "deliverable": "日志分析器脚本",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "open 与 with；读 txt / csv / json；try / except / finally；常见异常类型",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "「日志分析器」：读一个日志文件，统计 ERROR 行数并按日期汇总；JSON 读写待办数据",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：日志分析器脚本",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 8,
      "date": "2026-11-18",
      "month": 11,
      "dom": 18,
      "weekday": "周三",
      "week": 2,
      "topic": "模块与包",
      "learn": "import 机制；pip 安装；venv 虚拟环境；requirements.txt；项目目录怎么分",
      "practice": "把 utils 拆成包；建 venv 装 requests；生成 requirements.txt",
      "deliverable": "规范化的项目目录",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "import 机制；pip 安装；venv 虚拟环境；requirements.txt；项目目录怎么分",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "把 utils 拆成包；建 venv 装 requests；生成 requirements.txt",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：规范化的项目目录",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 9,
      "date": "2026-11-19",
      "month": 11,
      "dom": 19,
      "weekday": "周四",
      "week": 2,
      "topic": "Git 与 GitHub",
      "learn": "init / add / commit / log / branch / merge；remote；.gitignore；README 怎么写",
      "practice": "建 GitHub 仓库，推 3 次有意义的提交；写 README；练一次分支开发再合并",
      "deliverable": "线上仓库链接",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "init / add / commit / log / branch / merge；remote；.gitignore；README 怎么写",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "建 GitHub 仓库，推 3 次有意义的提交；写 README；练一次分支开发再合并",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：线上仓库链接",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 10,
      "date": "2026-11-20",
      "month": 11,
      "dom": 20,
      "weekday": "周五",
      "week": 2,
      "topic": "命令行工具",
      "learn": "argparse；sys.argv；退出码；把脚本做成可执行命令",
      "practice": "写「todo」命令行工具：add / list / done / del，数据存 JSON 文件",
      "deliverable": "可运行的 todo 工具",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "argparse；sys.argv；退出码；把脚本做成可执行命令",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "写「todo」命令行工具：add / list / done / del，数据存 JSON 文件",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：可运行的 todo 工具",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 11,
      "date": "2026-11-21",
      "month": 11,
      "dom": 21,
      "weekday": "周六",
      "week": 2,
      "topic": "调试与读错误",
      "learn": "读 traceback（从下往上）；断点调试；logging 基础与级别",
      "practice": "故意制造 8 种常见错误并逐个修掉；给 todo 加上日志",
      "deliverable": "8 条错误笔记",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "读 traceback（从下往上）；断点调试；logging 基础与级别",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "故意制造 8 种常见错误并逐个修掉；给 todo 加上日志",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：8 条错误笔记",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 12,
      "date": "2026-11-22",
      "month": 11,
      "dom": 22,
      "weekday": "周日",
      "week": 2,
      "topic": "周验收 + 项目切片 1",
      "learn": "复习本周；查漏",
      "practice": "切片 1：排班表生成器 v0——读 members.csv 与 availability.csv，按空闲时间给一场活动排出候选摄影",
      "deliverable": "可运行的排班脚本 + 一页说明",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "复习本周；查漏",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "切片 1：排班表生成器 v0——读 members.csv 与 availability.csv，按空闲时间给一场活动排出候选摄影",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：可运行的排班脚本 + 一页说明",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 13,
      "date": "2026-11-23",
      "month": 11,
      "dom": 23,
      "weekday": "周一",
      "week": 3,
      "topic": "面向对象一",
      "learn": "类与实例；属性与方法；__init__ 与 self；封装的意义",
      "practice": "把 todo 改写成类；写 Person 与 Event 两个类并实例化",
      "deliverable": "类版本的 todo",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "类与实例；属性与方法；__init__ 与 self；封装的意义",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "把 todo 改写成类；写 Person 与 Event 两个类并实例化",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：类版本的 todo",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 14,
      "date": "2026-11-24",
      "month": 11,
      "dom": 24,
      "weekday": "周二",
      "week": 3,
      "topic": "面向对象二",
      "learn": "继承与组合；魔术方法 __str__ / __eq__；dataclass 简化数据类",
      "practice": "用 dataclass 重写数据模型；实现 Assignment 类，带「是否冲突」判断方法",
      "deliverable": "数据模型代码",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "继承与组合；魔术方法 __str__ / __eq__；dataclass 简化数据类",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "用 dataclass 重写数据模型；实现 Assignment 类，带「是否冲突」判断方法",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：数据模型代码",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 15,
      "date": "2026-11-25",
      "month": 11,
      "dom": 25,
      "weekday": "周三",
      "week": 3,
      "topic": "类型注解与 mypy",
      "learn": "typing：Optional / List / Dict / Union；为什么要写类型；mypy 静态检查",
      "practice": "给全部代码加注解；跑 mypy，修掉 10 个类型错误",
      "deliverable": "mypy 通过的项目",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "typing：Optional / List / Dict / Union；为什么要写类型；mypy 静态检查",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "给全部代码加注解；跑 mypy，修掉 10 个类型错误",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：mypy 通过的项目",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 16,
      "date": "2026-11-26",
      "month": 11,
      "dom": 26,
      "weekday": "周四",
      "week": 3,
      "topic": "测试",
      "learn": "pytest；断言；fixture；参数化；覆盖率",
      "practice": "给 todo 与排班脚本写 12 个测试；跑一次覆盖率报告",
      "deliverable": "测试全绿 + 覆盖率截图",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "pytest；断言；fixture；参数化；覆盖率",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "给 todo 与排班脚本写 12 个测试；跑一次覆盖率报告",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：测试全绿 + 覆盖率截图",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 17,
      "date": "2026-11-27",
      "month": 11,
      "dom": 27,
      "weekday": "周五",
      "week": 3,
      "topic": "算法一",
      "learn": "时间复杂度 O(n) 与 O(n²)；数组 / 链表 / 栈 / 队列 / 哈希表各自适合什么",
      "practice": "LeetCode easy 15 题（数组、字符串、哈希），每题写一句思路",
      "deliverable": "15 题记录",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "时间复杂度 O(n) 与 O(n²)；数组 / 链表 / 栈 / 队列 / 哈希表各自适合什么",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "LeetCode easy 15 题（数组、字符串、哈希），每题写一句思路",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：15 题记录",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 18,
      "date": "2026-11-28",
      "month": 11,
      "dom": 28,
      "weekday": "周六",
      "week": 3,
      "topic": "算法二",
      "learn": "排序（快排、归并的思想）；二分查找；递归与边界",
      "practice": "LeetCode easy 10 题；手写二分与快排，并标注复杂度",
      "deliverable": "代码 + 复杂度笔记",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "排序（快排、归并的思想）；二分查找；递归与边界",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "LeetCode easy 10 题；手写二分与快排，并标注复杂度",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：代码 + 复杂度笔记",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 19,
      "date": "2026-11-29",
      "month": 11,
      "dom": 29,
      "weekday": "周日",
      "week": 3,
      "topic": "周验收 + 项目切片 2",
      "learn": "复习本周；把测试跑通",
      "practice": "切片 2：给排班加「请假」与「冲突检测」，用 pytest 覆盖 8 个场景（撞课、超上限、抢班）",
      "deliverable": "测试全绿的排班模块",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "复习本周；把测试跑通",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "切片 2：给排班加「请假」与「冲突检测」，用 pytest 覆盖 8 个场景（撞课、超上限、抢班）",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：测试全绿的排班模块",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 20,
      "date": "2026-11-30",
      "month": 11,
      "dom": 30,
      "weekday": "周一",
      "week": 4,
      "topic": "关系模型",
      "learn": "表 / 行 / 列；主键与外键；一对多、多对多；范式够用就好",
      "practice": "画 MediaFlow 的 ER 图：成员、活动、班次、设备、借用；标清关系与基数",
      "deliverable": "ER 图（手绘或 draw.io）",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "表 / 行 / 列；主键与外键；一对多、多对多；范式够用就好",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "画 MediaFlow 的 ER 图：成员、活动、班次、设备、借用；标清关系与基数",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：ER 图（手绘或 draw.io）",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 21,
      "date": "2026-12-01",
      "month": 12,
      "dom": 1,
      "weekday": "周二",
      "week": 4,
      "topic": "SQL 基础",
      "learn": "select / where / order by / limit；insert / update / delete",
      "practice": "SQLBolt 前 10 节；在 SQLite 里建 3 张表并做增删改查",
      "deliverable": "20 条 SQL 脚本",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "select / where / order by / limit；insert / update / delete",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "SQLBolt 前 10 节；在 SQLite 里建 3 张表并做增删改查",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：20 条 SQL 脚本",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 22,
      "date": "2026-12-02",
      "month": 12,
      "dom": 2,
      "weekday": "周三",
      "week": 4,
      "topic": "SQL 进阶",
      "learn": "join（inner / left）；group by 与 having；子查询；聚合函数",
      "practice": "15 道多表查询题（员工、部门、订单经典题）",
      "deliverable": "15 条查询 + 结果截图",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "join（inner / left）；group by 与 having；子查询；聚合函数",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "15 道多表查询题（员工、部门、订单经典题）",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：15 条查询 + 结果截图",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 23,
      "date": "2026-12-03",
      "month": 12,
      "dom": 3,
      "weekday": "周四",
      "week": 4,
      "topic": "建表与约束",
      "learn": "数据类型选择；not null / unique / check；索引原理；explain 怎么看",
      "practice": "写 6 张表的建表 SQL，含外键与「同一班次只能一个人」的唯一约束",
      "deliverable": "schema.sql",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "数据类型选择；not null / unique / check；索引原理；explain 怎么看",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "写 6 张表的建表 SQL，含外键与「同一班次只能一个人」的唯一约束",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：schema.sql",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 24,
      "date": "2026-12-04",
      "month": 12,
      "dom": 4,
      "weekday": "周五",
      "week": 4,
      "topic": "Postgres 上手",
      "learn": "Docker 起 Postgres；psql 常用命令；事务与回滚；隔离级别概念",
      "practice": "把 schema 导入 Postgres；练 10 条 psql 操作；看一次 explain 输出",
      "deliverable": "跑起来的数据库",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "Docker 起 Postgres；psql 常用命令；事务与回滚；隔离级别概念",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "把 schema 导入 Postgres；练 10 条 psql 操作；看一次 explain 输出",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：跑起来的数据库",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 25,
      "date": "2026-12-05",
      "month": 12,
      "dom": 5,
      "weekday": "周六",
      "week": 4,
      "topic": "Python 连数据库",
      "learn": "SQLAlchemy 2.0：engine / session / 模型 / 查询；事务与提交",
      "practice": "用 ORM 重写排班模块的读写；写 10 个查询函数",
      "deliverable": "ORM 版模块",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "SQLAlchemy 2.0：engine / session / 模型 / 查询；事务与提交",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "用 ORM 重写排班模块的读写；写 10 个查询函数",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：ORM 版模块",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 26,
      "date": "2026-12-06",
      "month": 12,
      "dom": 6,
      "weekday": "周日",
      "week": 4,
      "topic": "周验收 + 项目切片 3",
      "learn": "复习本周；核对数据",
      "practice": "切片 3：排班数据落库，命令行能读能写；抽查 5 条记录与 CSV 对齐",
      "deliverable": "数据库版排班",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "复习本周；核对数据",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "切片 3：排班数据落库，命令行能读能写；抽查 5 条记录与 CSV 对齐",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：数据库版排班",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 27,
      "date": "2026-12-07",
      "month": 12,
      "dom": 7,
      "weekday": "周一",
      "week": 5,
      "topic": "HTTP 与 REST",
      "learn": "方法与状态码；请求头与响应头；JSON；REST 风格的资源命名",
      "practice": "用 curl 调 3 个公开 API；画出一次请求的时序图",
      "deliverable": "接口笔记 + 时序图",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "方法与状态码；请求头与响应头；JSON；REST 风格的资源命名",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "用 curl 调 3 个公开 API；画出一次请求的时序图",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：接口笔记 + 时序图",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 28,
      "date": "2026-12-08",
      "month": 12,
      "dom": 8,
      "weekday": "周二",
      "week": 5,
      "topic": "FastAPI 起步",
      "learn": "路由；路径参数与查询参数；Pydantic 请求体校验；自动生成文档",
      "practice": "写 hello 加 3 个带参数接口；打开 /docs 逐个试",
      "deliverable": "可访问的 API",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "路由；路径参数与查询参数；Pydantic 请求体校验；自动生成文档",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "写 hello 加 3 个带参数接口；打开 /docs 逐个试",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：可访问的 API",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 29,
      "date": "2026-12-09",
      "month": 12,
      "dom": 9,
      "weekday": "周三",
      "week": 5,
      "topic": "FastAPI 进阶",
      "learn": "依赖注入；分页参数；异常处理器；中间件；CORS",
      "practice": "给排班 API 加分页与统一错误返回格式",
      "deliverable": "带分页的接口",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "依赖注入；分页参数；异常处理器；中间件；CORS",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "给排班 API 加分页与统一错误返回格式",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：带分页的接口",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 30,
      "date": "2026-12-10",
      "month": 12,
      "dom": 10,
      "weekday": "周四",
      "week": 5,
      "topic": "数据库集成",
      "learn": "SQLAlchemy 与 FastAPI 结合；会话生命周期；CRUD 路由组织",
      "practice": "实现活动与班次的 6 个 CRUD 接口",
      "deliverable": "后端骨架",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "SQLAlchemy 与 FastAPI 结合；会话生命周期；CRUD 路由组织",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "实现活动与班次的 6 个 CRUD 接口",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：后端骨架",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 31,
      "date": "2026-12-11",
      "month": 12,
      "dom": 11,
      "weekday": "周五",
      "week": 5,
      "topic": "认证与权限",
      "learn": "密码哈希；JWT 签发与校验；角色校验；用依赖注入做鉴权",
      "practice": "加登录接口；加「只有负责人能改班」的权限判断",
      "deliverable": "带鉴权的接口",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "密码哈希；JWT 签发与校验；角色校验；用依赖注入做鉴权",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "加登录接口；加「只有负责人能改班」的权限判断",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：带鉴权的接口",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 32,
      "date": "2026-12-12",
      "month": 12,
      "dom": 12,
      "weekday": "周六",
      "week": 5,
      "topic": "异步与后台任务",
      "learn": "async / await 是什么；BackgroundTasks；定时任务的概念",
      "practice": "加「请假后异步重排」的后台任务；加一个每日提醒定时任务",
      "deliverable": "异步任务能跑",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "async / await 是什么；BackgroundTasks；定时任务的概念",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "加「请假后异步重排」的后台任务；加一个每日提醒定时任务",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：异步任务能跑",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 33,
      "date": "2026-12-13",
      "month": 12,
      "dom": 13,
      "weekday": "周日",
      "week": 5,
      "topic": "周验收 + 项目切片 4",
      "learn": "复习本周；补接口文档",
      "practice": "切片 4：排班 API 完整闭环——建活动、排班、查班、请假重排；写接口文档",
      "deliverable": "OpenAPI 文档 + demo",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "复习本周；补接口文档",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "切片 4：排班 API 完整闭环——建活动、排班、查班、请假重排；写接口文档",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：OpenAPI 文档 + demo",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 34,
      "date": "2026-12-14",
      "month": 12,
      "dom": 14,
      "weekday": "周一",
      "week": 6,
      "topic": "HTML 与 CSS",
      "learn": "常用标签；flex 布局；基础样式与间距；表格怎么写好看",
      "practice": "做班表页面的静态版：一张表格加一条筛选栏",
      "deliverable": "静态页面",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "常用标签；flex 布局；基础样式与间距；表格怎么写好看",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "做班表页面的静态版：一张表格加一条筛选栏",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：静态页面",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 35,
      "date": "2026-12-15",
      "month": 12,
      "dom": 15,
      "weekday": "周二",
      "week": 6,
      "topic": "JavaScript",
      "learn": "变量与函数；事件；DOM 操作；fetch 调接口",
      "practice": "班表页面接上 API，能按日期筛选、能点开看详情",
      "deliverable": "可交互的页面",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "变量与函数；事件；DOM 操作；fetch 调接口",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "班表页面接上 API，能按日期筛选、能点开看详情",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：可交互的页面",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 36,
      "date": "2026-12-16",
      "month": 12,
      "dom": 16,
      "weekday": "周三",
      "week": 6,
      "topic": "前端工程概念",
      "learn": "npm 是什么；打包与构建；组件化思路；为什么大项目用框架",
      "practice": "把页面拆成 3 个 JS 模块文件；了解 Vite 但不上框架",
      "deliverable": "结构清晰的前端",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "npm 是什么；打包与构建；组件化思路；为什么大项目用框架",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "把页面拆成 3 个 JS 模块文件；了解 Vite 但不上框架",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：结构清晰的前端",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 37,
      "date": "2026-12-17",
      "month": 12,
      "dom": 17,
      "weekday": "周四",
      "week": 6,
      "topic": "Docker",
      "learn": "镜像与容器；Dockerfile；docker compose；卷与网络",
      "practice": "写 Dockerfile 与 compose，一条命令起 API 加 Postgres",
      "deliverable": "docker compose up 成功",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "镜像与容器；Dockerfile；docker compose；卷与网络",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "写 Dockerfile 与 compose，一条命令起 API 加 Postgres",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：docker compose up 成功",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 38,
      "date": "2026-12-18",
      "month": 12,
      "dom": 18,
      "weekday": "周五",
      "week": 6,
      "topic": "Linux 与部署",
      "learn": "常用命令；进程与端口；Nginx 反向代理；日志在哪看",
      "practice": "部署到云服务器（或本机模拟）；配一次 HTTPS；把步骤写成文档",
      "deliverable": "线上可访问的地址",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "常用命令；进程与端口；Nginx 反向代理；日志在哪看",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "部署到云服务器（或本机模拟）；配一次 HTTPS；把步骤写成文档",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：线上可访问的地址",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 39,
      "date": "2026-12-19",
      "month": 12,
      "dom": 19,
      "weekday": "周六",
      "week": 6,
      "topic": "运维意识",
      "learn": "日志分级；健康检查；备份；监控的基本概念",
      "practice": "加 /health 接口；写备份脚本；演练一次「数据库挂了怎么恢复」",
      "deliverable": "运维清单",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "日志分级；健康检查；备份；监控的基本概念",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "加 /health 接口；写备份脚本；演练一次「数据库挂了怎么恢复」",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：运维清单",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 40,
      "date": "2026-12-20",
      "month": 12,
      "dom": 20,
      "weekday": "周日",
      "week": 6,
      "topic": "周验收 + 项目切片 5",
      "learn": "复习本周；把部署跑顺",
      "practice": "切片 5：系统部署上线，写一页部署文档，让别人照着能跑起来",
      "deliverable": "上线地址 + 部署文档",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "复习本周；把部署跑顺",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "切片 5：系统部署上线，写一页部署文档，让别人照着能跑起来",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：上线地址 + 部署文档",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 41,
      "date": "2026-12-21",
      "month": 12,
      "dom": 21,
      "weekday": "周一",
      "week": 7,
      "topic": "LLM 基础",
      "learn": "token 是什么；上下文窗口；温度；调用方式与计费；为什么会胡说",
      "practice": "跑通 DeepSeek API；用 5 个不同温度做同一任务，对比输出",
      "deliverable": "API 调用 demo",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "token 是什么；上下文窗口；温度；调用方式与计费；为什么会胡说",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "跑通 DeepSeek API；用 5 个不同温度做同一任务，对比输出",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：API 调用 demo",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 42,
      "date": "2026-12-22",
      "month": 12,
      "dom": 22,
      "weekday": "周二",
      "week": 7,
      "topic": "提示词",
      "learn": "角色 / 任务 / 约束 / 示例 / 输出格式；少样本示例怎么写",
      "practice": "同一任务写 3 版提示词，人工对比哪版更稳，记录差异",
      "deliverable": "3 版提示词 + 对比表",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "角色 / 任务 / 约束 / 示例 / 输出格式；少样本示例怎么写",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "同一任务写 3 版提示词，人工对比哪版更稳，记录差异",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：3 版提示词 + 对比表",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 43,
      "date": "2026-12-23",
      "month": 12,
      "dom": 23,
      "weekday": "周三",
      "week": 7,
      "topic": "结构化输出",
      "learn": "JSON 模式；用 Pydantic 解析与校验；解析失败怎么重试",
      "practice": "从一段活动通知里抽时间、地点、人物、主题，做到 100% 解析成功",
      "deliverable": "抽取脚本",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "JSON 模式；用 Pydantic 解析与校验；解析失败怎么重试",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "从一段活动通知里抽时间、地点、人物、主题，做到 100% 解析成功",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：抽取脚本",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 44,
      "date": "2026-12-24",
      "month": 12,
      "dom": 24,
      "weekday": "周四",
      "week": 7,
      "topic": "生成实战",
      "learn": "长文本生成；分段写；事实约束；什么情况下让模型说「不知道」",
      "practice": "活动信息生成 600 字初稿，写 5 篇，与人工稿逐段对比",
      "deliverable": "5 篇初稿 + 对比笔记",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "长文本生成；分段写；事实约束；什么情况下让模型说「不知道」",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "活动信息生成 600 字初稿，写 5 篇，与人工稿逐段对比",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：5 篇初稿 + 对比笔记",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 45,
      "date": "2026-12-25",
      "month": 12,
      "dom": 25,
      "weekday": "周五",
      "week": 7,
      "topic": "评测",
      "learn": "评测集怎么建；准确率与误报率；错误分类与归因",
      "practice": "建 20 条评测集，跑一次「找出必改错误」的任务，算准确率与误报率",
      "deliverable": "评测报告 v1",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "评测集怎么建；准确率与误报率；错误分类与归因",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "建 20 条评测集，跑一次「找出必改错误」的任务，算准确率与误报率",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：评测报告 v1",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 46,
      "date": "2026-12-26",
      "month": 12,
      "dom": 26,
      "weekday": "周六",
      "week": 7,
      "topic": "RAG 入门",
      "learn": "文本切分；embedding；向量检索；pgvector 怎么用",
      "practice": "把 30 篇历史稿入库，做「找相似稿」demo，测 10 次看准不准",
      "deliverable": "检索 demo",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "文本切分；embedding；向量检索；pgvector 怎么用",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "把 30 篇历史稿入库，做「找相似稿」demo，测 10 次看准不准",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：检索 demo",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 47,
      "date": "2026-12-27",
      "month": 12,
      "dom": 27,
      "weekday": "周日",
      "week": 7,
      "topic": "周验收 + 项目切片 6",
      "learn": "复习本周；整理评测数据",
      "practice": "切片 6：把「成稿 + 评测」接进系统，页面上点一下能触发一次生成",
      "deliverable": "可演示的生成链路",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "复习本周；整理评测数据",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "切片 6：把「成稿 + 评测」接进系统，页面上点一下能触发一次生成",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：可演示的生成链路",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 48,
      "date": "2026-12-28",
      "month": 12,
      "dom": 28,
      "weekday": "周一",
      "week": 8,
      "topic": "第三方集成",
      "learn": "鉴权方式；限流；超时；重试与退避；幂等",
      "practice": "封装一个通用 HTTP 客户端（超时、重试、日志），接一个公开 API 试手",
      "deliverable": "http_client.py",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "鉴权方式；限流；超时；重试与退避；幂等",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "封装一个通用 HTTP 客户端（超时、重试、日志），接一个公开 API 试手",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：http_client.py",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 49,
      "date": "2026-12-29",
      "month": 12,
      "dom": 29,
      "weekday": "周二",
      "week": 8,
      "topic": "状态机与审核流",
      "learn": "状态与迁移；事件表；驳回与撤回；超时升级",
      "practice": "实现五级审核状态机（写稿人→排版→同学→主任→老师），含驳回，写 6 个状态测试",
      "deliverable": "审核流模块",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "状态与迁移；事件表；驳回与撤回；超时升级",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "实现五级审核状态机（写稿人→排版→同学→主任→老师），含驳回，写 6 个状态测试",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：审核流模块",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 50,
      "date": "2026-12-30",
      "month": 12,
      "dom": 30,
      "weekday": "周三",
      "week": 8,
      "topic": "通知与 Webhook",
      "learn": "Webhook 原理；签名校验；消息模板",
      "practice": "接飞书机器人，审核流转时发通知；发失败进重试队列",
      "deliverable": "群里能收到消息",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "Webhook 原理；签名校验；消息模板",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "接飞书机器人，审核流转时发通知；发失败进重试队列",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：群里能收到消息",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    },
    {
      "day": 51,
      "date": "2026-12-31",
      "month": 12,
      "dom": 31,
      "weekday": "周四",
      "week": 8,
      "topic": "综合复盘",
      "learn": "51 天知识地图；缺口清单；下一步怎么走",
      "practice": "串一条完整演示链路（活动→排班→成稿→审核→通知）；写 README、架构图、复盘",
      "deliverable": "演示 + 文档 + 1 月清单",
      "blocks": [
        {
          "id": "b1",
          "title": "块一 · 学概念",
          "start": "09:00",
          "end": "11:00",
          "minutes": 120,
          "task": "51 天知识地图；缺口清单；下一步怎么走",
          "hint": "看文档 / 教程，记笔记，不敲代码"
        },
        {
          "id": "b2",
          "title": "块二 · 跟练",
          "start": "11:10",
          "end": "13:10",
          "minutes": 120,
          "task": "照着教程把今天的概念例子敲一遍",
          "hint": "允许抄，先把概念落到手上"
        },
        {
          "id": "b3",
          "title": "块三 · 独立做",
          "start": "14:30",
          "end": "16:30",
          "minutes": 120,
          "task": "串一条完整演示链路（活动→排班→成稿→审核→通知）；写 README、架构图、复盘",
          "hint": "关掉教程，独立完成；卡 40 分钟就问"
        },
        {
          "id": "b4",
          "title": "块四 · 产出与复盘",
          "start": "16:40",
          "end": "18:40",
          "minutes": 120,
          "task": "交付：演示 + 文档 + 1 月清单",
          "hint": "提交 Git，写三句话笔记，更新问题池"
        }
      ]
    }
  ],
  "slices": [
    {
      "n": 1,
      "name": "排班生成器 v0",
      "when": "11/15",
      "task": "读成员与空闲时间 CSV，给一场活动排出候选摄影",
      "accept": "命令行能输出名单，撞课的人被排除"
    },
    {
      "n": 2,
      "name": "请假与冲突",
      "when": "11/22",
      "task": "加请假记录与冲突检测，用 pytest 覆盖 8 个场景",
      "accept": "测试全绿，故意造冲突能被拦住"
    },
    {
      "n": 3,
      "name": "数据落库",
      "when": "11/29",
      "task": "六张表建好，排班数据从 CSV 迁到 Postgres",
      "accept": "库里查得到，和 CSV 对得上"
    },
    {
      "n": 4,
      "name": "排班 API",
      "when": "12/06",
      "task": "FastAPI 实现建活动、排班、查班、请假重排",
      "accept": "用 /docs 能完整走一遍"
    },
    {
      "n": 5,
      "name": "上线与页面",
      "when": "12/13",
      "task": "Docker 部署 + 一个能查班表的页面",
      "accept": "手机能打开，能按日期筛选"
    },
    {
      "n": 6,
      "name": "成稿与评测",
      "when": "12/20",
      "task": "接模型生成初稿，建 20 条评测集",
      "accept": "点一下能出稿，评测报告有数字"
    },
    {
      "n": 7,
      "name": "审核状态机",
      "when": "12/27",
      "task": "五级审核流转，含驳回与撤回",
      "accept": "走完五级，驳回能回上一级"
    },
    {
      "n": 8,
      "name": "整合演示",
      "when": "12/31",
      "task": "串起活动→排班→成稿→审核→通知，写文档",
      "accept": "5 分钟演示不卡壳"
    }
  ],
  "resources": [
    {
      "module": "Python 基础",
      "resource": "廖雪峰 Python 教程（中文）或 Python 官方 Tutorial",
      "usage": "按章节对应到逐日表，看一节做一节练习"
    },
    {
      "module": "Python 进阶",
      "resource": "Real Python 的 OOP 与 testing 专题；pytest 官方文档",
      "usage": "只在需要时查，不通读"
    },
    {
      "module": "算法",
      "resource": "Hello 算法（中文开源书）+ LeetCode 热题 100 的 easy 部分",
      "usage": "每天 3—5 题，做完写一句思路"
    },
    {
      "module": "数据库",
      "resource": "SQLBolt（交互式）+ PostgreSQL 官方 Tutorial",
      "usage": "SQLBolt 当天做完，Postgres 边用边查"
    },
    {
      "module": "后端",
      "resource": "FastAPI 官方文档 Tutorial 与 Advanced",
      "usage": "照着敲，遇到不懂的再看源码注释"
    },
    {
      "module": "前端",
      "resource": "MDN 的 HTML / CSS / JS 入门",
      "usage": "只学够用的一节，别系统学"
    },
    {
      "module": "Docker",
      "resource": "Docker 官方 Get Started",
      "usage": "两小时过一遍，够用"
    },
    {
      "module": "AI 应用",
      "resource": "DeepSeek / 通义千问 API 文档 + 提示词工程指南",
      "usage": "重点看返回格式、限流、错误码"
    },
    {
      "module": "架构与设计",
      "resource": "《数据密集型应用系统设计》第 5、7、11 章",
      "usage": "选读，理解一致性与流处理"
    },
    {
      "module": "面试",
      "resource": "牛客 FDE / 交付岗面经；公司技术博客里的交付案例",
      "usage": "每周看两篇，记下不会的问题"
    }
  ],
  "rules": [
    "每天必须有一个能跑或能看的东西，没有产出的一天算没过。",
    "卡住超过 40 分钟就问人（同学、老师、AI 都算），不要死磕到怀疑自己。",
    "进度落后时先砍项目切片，不砍主线课程。主线断了后面全乱。"
  ],
  "quotes": [
    "每天必须有一个能跑或能看的东西，没有产出的一天算没过。",
    "卡住超过 40 分钟就问人——同学、老师、AI 都算，别死磕到怀疑自己。",
    "进度落后时先砍项目切片，不砍主线课程。主线断了，后面全乱。",
    "连续三天完不成当天任务：把每天压到 5 小时，先保连续性，别保总量。",
    "到第 20 天还写不出一个能跑的 CRUD：停下来重做第 2 周的练习。",
    "到第 40 天还没部署成功：先用本地环境演示，部署挪到 1 月。",
    "这 51 天不是让你变成工程师，是让你有资格开始当工程师。",
    "关掉教程，从空白文件开始写。抄三遍也长不出手感。",
    "看不懂就换一份讲解，别看第三遍同一篇。",
    "手机放在另一个房间——不是静音，是另一个房间。"
  ],
  "review": {
    "questions": [
      "这周做完了什么？（列产出，不写「学习了 XX」）",
      "哪里卡住了？是概念没懂、环境问题，还是时间不够？",
      "下周最重要的一件事是什么？（只写一件）",
      "有没有为了赶进度跳过了产出？跳过了就补回来。"
    ],
    "checklist": [
      "本周每天的产出物都在，代码已提交。",
      "能不看资料讲清本周的核心概念（随便挑三个讲给自己听）。",
      "本周的练习全部跑通，报错都自己解决过。",
      "项目切片有进展，能演示或能跑。",
      "写了笔记，且有「没懂的问题」清单。",
      "身体没垮：至少运动三次，每天睡够 7 小时。"
    ],
    "stopLoss": [
      "连续三天完不成当天任务：把每天压到 5 小时，先保连续性，别保总量。",
      "到第 20 天还写不出一个能跑的 CRUD：停下来重做第 2 周的练习，别硬往前冲。",
      "到第 40 天还没部署成功：先用本地环境做演示，部署挪到 1 月，别在这儿卡死。"
    ]
  },
  "faq": [
    {
      "q": "看不懂怎么办？",
      "a": "换一份讲解，别看第三遍同一篇。还看不懂就跳过，往后学两天再回来看——很多概念是「用着用着就懂了」，不是「看懂了才能用」。但要记进问题池，周末回头看一次。"
    },
    {
      "q": "看懂了但写不出来？",
      "a": "这是最常见的状态，说明只是「认识」不是「会」。解决办法只有一个：关掉教程，从空白文件开始写，写不出来再看一眼，然后关掉继续写。抄代码抄三遍也长不出手感。"
    },
    {
      "q": "每天 8 小时坐不住？",
      "a": "按 50 分钟一轮来，每轮结束站起来走 5 分钟，上午四轮、下午四轮。手机放在另一个房间，不是静音——是另一个房间。"
    },
    {
      "q": "要不要看视频课？",
      "a": "可以，但视频只占概念块的时间，别用视频替代动手。一节 40 分钟的视频，最多配 2 小时练习，比例低于这个就是低效。"
    },
    {
      "q": "算法题要做多少？",
      "a": "51 天里 50 题左右够了，easy 为主，中等题挑数组和哈希。FDE 面试考的是工程能力，不是算法竞赛。"
    },
    {
      "q": "项目做不完会不会很丢人？",
      "a": "不会。做到第 5 个切片就已经能演示了，剩下的慢慢补。面试官更在意你能不能讲清楚「为什么这么做」「哪里失败了」，而不是功能数量。"
    },
    {
      "q": "要不要现在就投实习？",
      "a": "不建议。12 月前你的项目还跑不起来，投了也是浪费机会。1 月中旬带着能演示的系统去投，通过率高得多。"
    },
    {
      "q": "怎么知道自己真的学会了？",
      "a": "两个检验：一是能不能不看资料给别人讲五分钟；二是能不能在原来的代码上改一个新需求。两个都行，才算会。"
    }
  ],
  "finalChecklist": [
    "一个能在线访问的系统，能演示「建活动 → 排班 → 出稿 → 审核」。",
    "一份 README：项目背景、架构图、怎么跑起来。",
    "一份评测报告：20 条样本、准确率、误报率、三个失败案例。",
    "一份 51 天复盘：学会了什么、还缺什么、1 月补什么。",
    "一份简历初稿，项目那一段已经能写出来。"
  ]
};
