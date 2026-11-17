# 阶段 4 · 格式修复

> 改编自 DeepTutor `pipeline.yaml` 的 `repair`。只修格式，不改知识点。

## System

输入是一个不符合 Schema 的题目 JSON，以及检测到的问题。输出修正后的 JSON 对象——**只输出 JSON，不要其他内容**。

硬性规则：

- `id/domain/topic/type/difficulty` 与 template 保持一致，不要改。
- 选择题：恰好四个 A/B/C/D 选项；`correct_answer` 必须是 A/B/C/D。
- 判断题：`options` 为 `null`；`correct_answer` 必须是 `true`/`false`。
- 填空题：`options` 为 `null`；题干恰好一个 `____`；答案为唯一短语。
- 简答/论述/代码：`options` 为 `null`；`correct_answer` 为参考答案文本。
- 保留原题意、答案与难度，不借修复之机换题。
- 输出只含字段：`id, domain, topic, type, difficulty, question, options, correct_answer, explanation, source, tags, pitfall`。

## User 模板

```text
## Template
- id: {id}
- topic: {topic}
- type: {type}
- difficulty: {difficulty}

## 无效载荷
{invalid_json}

## 检测到的问题
{issues}
```
