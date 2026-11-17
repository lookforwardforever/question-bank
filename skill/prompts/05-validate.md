# 阶段 5 · 校验与落盘

## 落盘

1. 把本批 20 题按 Schema 追加到 `question-bank/data/questions.jsonl`，一行一题，不要改动已有行。
2. 新题 `id` 使用域前缀 + 递增编号（如 `CTRL-001`），不得与全库重复。
3. 更新 `data/meta.json` 的 `batch`、`updated`、`notes`。

## 构建

```powershell
node question-bank/skill/build.cjs
```

脚本会做：

- JSON 解析、必填字段、题型/难度合法性；
- 选择题 A/B/C/D 与答案合法性；
- 判断题 true/false；
- 填空题恰好一个 `____`；
- `id`、`topic`、题干三重去重；
- `source` 文件是否存在；
- 生成 `questions.json`、`questions.js`、规范化 `questions.jsonl`、`<标题>-背诵版.md`。

任何一项失败都会列出具体题号并退出，先修再重跑。

## 抽查（必做）

- 打开 `question-bank/index.html`：
  - 练习模式能逐题作答、选择题/判断题/填空题自动判分；
  - 简答/论述能自评；
  - 答错进错题本，答对移出；
  - 模拟考试能组卷、答题卡跳题、交卷出分；
  - 背诵模式能展开答案；
  - 刷新页面后进度还在。
- 随机抽 3 题，对照 `source` 讲义确认事实无误。

## 常见错误

| 报错 | 修法 |
|---|---|
| 选择题必须恰好 A/B/C/D | 补/删选项，保持四个 |
| 填空题必须恰好一个 ____ | 合并或删除多余空 |
| topic 重复 | 换一个具体考点，不要同义改写 |
| 题干重复 | 删除重复题，换考点 |
| source 不存在 | 改成真实讲义路径（Grep 确认文件名） |
| 非选择题 options 应为 null | 删除 options 字段或设为 null |
