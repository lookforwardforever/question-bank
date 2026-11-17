---
name: project-question-bank
description: 从本地讲义离线生成/扩充项目题库（选择、判断、填空、简答、论述），产出 JSONL+JSON+JS+Markdown 背诵版+离线 HTML 刷题页，用于复习、背诵、模拟考试。Use when the user asks to 出题、扩充题库、更新题库、按讲义复习、生成考试卷。
---

# 项目题库 Skill（离线静态题库）

> 改编自 DeepTutor 的出题流水线：[pipeline.yaml](../../A-DeepTutor-main/DeepTutor-main/deeptutor/agents/question/prompts/zh/pipeline.yaml)
> 原流程是「探索 → 规划 → 逐题生成 → 格式修复」，依赖在线 LLM 与工具调用。
> 本 Skill 保留其出题方法论，去掉 tool-call 协议，改为**读本地讲义 → 批量落盘 JSONL → 静态网页刷题**，生成后不再需要 token。

## 何时使用

- 用户说「出第二批题」「把控制算法补进题库」「按讲义生成考试题」「更新背诵版」。
- 用户要针对某批讲义复习、背诵、模拟考试，而题库里还没有覆盖。
- 不用于：在线答疑、讲解知识点（那是一次性对话，不产出题库）。

## 文件布局

```
question-bank/
├─ index.html                 # 离线刷题 App（练习/考试/错题本/收藏/背诵/统计）
├─ data/
│  ├─ questions.jsonl         # 唯一真源：一行一题，追加批次也写这里
│  ├─ questions.json          # 构建产物（数组）
│  ├─ questions.js            # 构建产物（window.QUESTION_BANK，供 file:// 加载）
│  ├─ meta.json               # 题库标题/领域/批次/日期
│  └─ questions.json          # 只读产物，不要手改
├─ 项目题库-背诵版.md         # 构建产物：按题型分组的问答背诵文档
└─ skill/
   ├─ SKILL.md                # 本文件
   ├─ build.cjs               # 校验 + 生成 JSON/JS/Markdown
   └─ prompts/                # 出题各阶段提示词
```

## Android APK

- 源码在 `APK/`，交付包为 `APK/question-bank-v1.0.0.apk`。
- targetSdk 37（Android 17），minSdk 26，release 签名，约 0.55 MB。
- WebView 壳加载 `assets/index.html` + `assets/data/questions.js`；进度存 WebView localStorage。
- 导出/导入进度走 Android 系统文件选择器（SAF），不申请存储权限。
- 构建：`APK\gradlew.bat assembleRelease`；详细测试与手机验收步骤见 `APK/TEST-REPORT.md`。

## 数据与性能

- 题库是静态文件，不是数据库：`data/questions.js` 约 1.7 MB，页面打开时一次读进内存。
- 推荐双击 `启动刷题.cmd`：本地服务固定 `http://127.0.0.1:8123`，进度写入 `data/progress.json`，不依赖浏览器存储；关闭命令行窗口即停止服务。
- 也可直接双击 `index.html` 离线使用，此时进度只存浏览器 localStorage，清理浏览器数据、无痕模式或换入口会丢。
- 首屏只渲染当前题；背诵每页 50 题，答题卡每页 100 题，避免一次渲染 1900 多个节点。
- 进度写入按 300ms 合并，页面隐藏或关闭时立即落盘；服务端写入再按 400ms 合并，减少无谓磁盘写入。

## 离线刷题页（index.html）

自包含静态页，只引用 `data/questions.js`；通过 `启动刷题.cmd` 启动时由本地服务持久化进度，直接双击时退回 localStorage。

- **练习**：题型/领域/难度/学习状态筛选、题干搜索、随机顺序；答完立即看答案、解析、来源与易错点；选择题/判断题/填空题答对自动跳下一题，答错停留手动下一题。
- **断点续做**：未做完的一轮自动保存，刷新后从原题继续，可一键从头开始。
- **答题卡**：按已答/正确/半会/错误/收藏着色，点击跳题；大题量时卡片区内部滚动。
- **错题本**：答错自动收录、答对自动移出；支持错题练习、错题背诵、单题移出与清空。
- **收藏夹**：练习时按 `M` 或点星标收藏，可集中练习或背诵。
- **垃圾箱**：练习、背诵、错题本、收藏夹都可删除题目；删除只是进垃圾箱，不再出现在练习/背诵/考试中，可随时恢复或全部恢复。
- **模拟考试**：可选题量 10/20/40/60；答题卡跳题；交卷前提示未答数；客观题自动判分、主观题自评；刷新恢复未交卷考试。
- **背诵模式**：展开/收起全部、字号 A-/A+，偏好持久化，支持打印。
- **统计**：今日作答、连续学习天数、分题型/分领域掌握度、薄弱考点 Top，进度 JSON 可导出/导入/重置。
- **快捷键**：选择题 `A`–`D`/`1`–`4`，判断题 `1`/`2`，简答自评 `1`/`2`/`3`，`←`/`→` 切题，`Enter` 下一题，`M` 收藏，`R` 重做。

## 数据 Schema（唯一真源 JSONL）

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | 是 | 全局唯一，如 `VLA-001`、`CTRL-001`；追加批次不要复用 |
| `domain` | 是 | 知识域，如 `VLA/具身智能`、`控制算法`、`水下机器人` |
| `topic` | 是 | 一句话考点，**全库唯一**，用于去重 |
| `type` | 是 | `choice` / `concept` / `fill_in_blank` / `short_answer` / `written` / `coding` |
| `difficulty` | 是 | `easy` / `medium` / `hard` |
| `question` | 是 | 题干；填空题必须恰好一个 `____` |
| `options` | 条件 | 选择题必须是 `{"A":"","B":"","C":"","D":""}`；其他题型为 `null` |
| `correct_answer` | 是 | 选择题为 `A/B/C/D`；判断题为 `true/false`；其他为参考答案文本 |
| `explanation` | 是 | 为什么对/错，面向复习，2-5 句 |
| `source` | 是 | 讲义相对路径，如 `memory/lerobot-learning/xxx.md`，必须真实存在 |
| `tags` | 是 | 字符串数组，2-4 个 |
| `pitfall` | 否 | 易错点/面试追问，一句 |

示例（选择题）：

```json
{"id":"VLA-001","domain":"VLA/具身智能","topic":"VLA 四大组件","type":"choice","difficulty":"easy","question":"以下哪一项不属于 VLA 的四大核心组件？","options":{"A":"视觉塔","B":"语言模型骨干","C":"动作头","D":"奖励模型"},"correct_answer":"D","explanation":"VLA 四组件是视觉塔、语言模型骨干、动作头、输入适配层；奖励模型属于 RL 训练侧。","source":"memory/lerobot-learning/A01-VLA通用架构理解手册.md","tags":["架构","四组件"],"pitfall":"别把 reward model 混进推理结构。"}
```

## 每批规则

- **20 题/批**：选择 8 + 判断 4 + 填空 4 + 简答 3 + 论述 1。
- 先落盘再开下一批；每批结束跑一次构建，确认校验通过。
- 同一 `topic` 全库唯一；出题前先 `Grep` 现有题库的题干与 topic，避免换说法重复。
- 每题必须能指回一份真实讲义；**不允许凭记忆编造讲义里没有的内容**。
- 一个题库可以容纳多个领域；新领域用独立 `id` 前缀（如 `CTRL-`、`RL-`、`UUV-`），`domain` 字段区分，网页按领域筛选。
- 第一批 VLA/具身智能 100 题已完成，见 `data/questions.jsonl`。

## 五阶段流程

1. **探索**（[prompts/01-explore.md](prompts/01-explore.md)）
   读目标讲义，产出 15-25 个「考点卡片」：考点、来源文件、重要度、可出题型。
   只调研，不写题。
2. **规划**（[prompts/02-plan.md](prompts/02-plan.md)）
   把考点拆成 20 个互不重复的 template，分配题型与难度；先查重。
3. **生成**（[prompts/03-generate.md](prompts/03-generate.md)）
   一次一题，严格按 Schema 输出 JSON；选择题干扰项同长同风格，判断题只考一个命题，填空题恰好一个空。
   题干与解析必须同时符合 [prompts/07-humanizer-style.md](prompts/07-humanizer-style.md) 的人话风格：直接问、带数字、用讲义口诀，不写模板腔。
4. **修复**（[prompts/04-repair.md](prompts/04-repair.md)）
   只在 JSON 不合法时修格式，不改知识点与答案。
5. **校验**（[prompts/05-validate.md](prompts/05-validate.md)）
   追加到 `data/questions.jsonl`，运行 `node skill/build.cjs`，通过后打开 `index.html` 抽查。

## 质量红线

- 选择题：正确答案不能明显比干扰项更长/更详细；干扰项必须是“像真的错答案”，不能凑数。
- 判断题：只考一个命题，禁止“以上都对/都不对”式表述。
- 填空题：答案唯一且短（词/短语），题干只能有一个 `____`。
- 简答/论述：参考答案按「先结论 → 再要点 → 带数字/术语」组织，适合直接背诵。
- 解析必须解释“为什么”，不能复述题干。
- `source` 必须真实存在；构建脚本会校验，不存在直接失败。
- 题干不得与已有题目近似重复（构建脚本会查题干与 topic）。

## 与 DeepTutor 原提示词的差异

| 原流程 | 本 Skill |
|---|---|
| 在线 LLM + 工具调用（`THINK/TOOL/FINISH` 协议） | 离线读文件，无工具调用协议 |
| 结果写 SQLite 题库 | 写 JSONL 真源 + 静态 App |
| 单次交互式出题 | 20 题/批，可跨会话增量 |
| 依赖知识库 RAG 检索 | 直接读 `memory/lerobot-learning` 讲义 |
| 面向即时练习 | 面向长期复习、背诵、考试 |

## 常用命令

```powershell
# 校验并重新生成 JSON / JS / Markdown
node question-bank/skill/build.cjs

# 打开刷题页（双击也可以）
start question-bank/index.html
```

## 剩余批次路线（建议顺序）

见 [prompts/06-batch-plan.md](prompts/06-batch-plan.md)。核心原则：**先面试第一梯队，再项目精读补全**；每批 20 题，稳定落盘，不追求一次生成完。

## 总体规划（题量上限与单元划分）

见 [prompts/08-master-plan.md](prompts/08-master-plan.md)。全库规划约 **2400 题、12 个单元**；每个核心概念配 3 题、重点项目配 4 题、一般项目 1–2 题；难度按 3:5:2。

## 网络来源规则（不限于本机文档）

- 本机讲义没覆盖或已过时的内容，必须联网补：arXiv、项目官网、GitHub/Gitea、权威机构博客、知名技术媒体。
- **主动收集义务**：触觉、mimic、人形 RL、世界模型等快速迭代方向，每个单元开工前必须先做 2–4 次联网搜索补最新项目，不能只依赖本机旧讲义；公众号/Gitea 可作为线索，事实回 arXiv 或官方仓库核对。
- 公众号只当线索，事实回 arXiv 或官方仓库核对；数字（参数量、训练时长、频率）找不到出处就不写。
- `source` 直接填 http(s) URL；构建器只校验 URL 合法性，离线可构建。
- 本机说法与权威来源冲突时以权威来源为准，并在 `explanation` 注明旧说法。
- 网络题与本地题共用同一 Schema、同一人话风格（[07-humanizer-style.md](prompts/07-humanizer-style.md)）、同一去重规则。

## 提速约定（大批量并行生产）

- **蓝图先行**：单元开工前先列该单元的考点清单（概念/项目/流程），一次备齐素材（讲义 + 2–4 次网络搜索），出题中途不再反复查资料。
- **并行分片**：一个单元拆 2–3 个 jsonl 片段（如 part12a/part12b 各 40 题），同一轮对话里并行 Write 落盘，单轮可产 60–100 题。
- **目标数量驱动**：不足目标数就补写，不允许“尝试几次算了”；每片内部题型配比固定（40 题：16 选择/8 判断/8 填空/6 简答/2 论述）。
- **一次构建兜底**：全部片段写完才合并跑一次 `build.cjs`；报错按题号集中修（文件名、topic 重复、缺字段），修完用片段重建 jsonl，不手工拼真源。
- **分片规则**：同单元的 id 连续、topic 不跨片重复；网络题与本地题可混在同片，但 source 各自合法。
- 单条经验上限：单片不超过 40 题，超过后模型尾部质量下降，宁可多开一片。
