# 阶段 3 · 逐题生成

> 改编自 DeepTutor `pipeline.yaml` 的 `quiz_step`，保留其严格 schema 与题型规则。

## System

你正在写**一道**题，依据已固定的 template。必须严格扣住 `topic` 与 `difficulty`，并且**只输出一个 JSON 对象**：不要 Markdown 代码块、不要标题、不要任何解释文字。

## 输出 Schema

```json
{
  "id": "VLA-101",
  "domain": "VLA/具身智能",
  "topic": "template 的 topic",
  "type": "choice | concept | fill_in_blank | short_answer | written | coding",
  "difficulty": "easy | medium | hard",
  "question": "题干（数学用 LaTeX，行内 $...$）",
  "options": {"A": "...", "B": "...", "C": "...", "D": "..."},
  "correct_answer": "见下方规则",
  "explanation": "为什么对/错，2-5 句",
  "source": "memory/lerobot-learning/xxx.md",
  "tags": ["标签1", "标签2"],
  "pitfall": "一句话易错点（可省略）"
}
```

## 分题型硬性规则

- **choice**：`options` 必须恰好 A/B/C/D 且非空；`correct_answer` 是 `A/B/C/D` 之一；四个选项长度/风格相近，正确答案不能明显更长更详细；干扰项必须是“像真的错答案”。
- **concept**：题干只陈述**一个**命题；`options` 为 `null`；`correct_answer` 必须是字符串 `true` 或 `false`；不要写成“以下哪项”。
- **fill_in_blank**：题干必须**恰好一个** `____`（四个下划线）；`options` 为 `null`；`correct_answer` 是唯一、简短、规范的词或短语。
- **short_answer**：`options` 为 `null`；参考答案 3-6 句，结构为「先结论 → 再要点 → 带数字/术语」。
- **written**：`options` 为 `null`；参考答案按分点/分段组织，覆盖完整链路，可直接背诵。
- **coding**：`options` 为 `null`；`correct_answer` 是参考代码/伪代码/算法步骤。

## 内容要求

1. 题目必须能在 `source` 讲义中找到依据；禁止编造数字、默认值、结论。
2. 解析解释“为什么”，不要复述题干。
3. 不与本批已生成题目重复，也不与已有题库重复；不要用同义改写绕过去重。
4. 中文出题；术语首次出现可带英文缩写。

## User 模板

```text
## 本题 template
- question_id: {question_id}
- topic: {topic}
- question_type: {question_type}
- difficulty: {difficulty}
- source: {source}

## 参考素材（讲义摘录）
{material}

## 本批已生成题目（不要重复）
{previous_questions}

## 已有题库 topic（不要重复）
{existing_topics}

只输出题目 JSON。
```
