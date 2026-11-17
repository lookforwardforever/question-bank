/**
 * 题库构建脚本（离线、无 token）
 * 用法：node skill/build.cjs
 *
 * 输入：data/questions.jsonl（唯一真源，一行一题）
 * 输出：data/questions.json / data/questions.js / data/questions.jsonl（规范化）
 *       <题库标题>-背诵版.md
 *
 * 追加新批次：把新题按 data/schema 追加到 data/questions.jsonl，再跑本脚本。
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.env.QB_ROOT || path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const JSONL = path.join(DATA, 'questions.jsonl');
const META_FILE = path.join(DATA, 'meta.json');

const TYPE_LABEL = {
  choice: '选择题',
  concept: '判断题',
  fill_in_blank: '填空题',
  short_answer: '简答题',
  written: '论述题',
  coding: '代码题',
};
const ALLOWED_TYPES = Object.keys(TYPE_LABEL);
const DIFF = ['easy', 'medium', 'hard'];
const REQUIRED = ['id', 'domain', 'topic', 'type', 'difficulty', 'question', 'correct_answer', 'explanation', 'source', 'tags'];

const meta = JSON.parse(fs.readFileSync(META_FILE, 'utf8'));
const title = meta.title || '项目题库';
const workspace = process.env.QB_WORKSPACE || path.resolve(ROOT, '..');

const lines = fs.readFileSync(JSONL, 'utf8').split(/\r?\n/).filter(l => l.trim());
const questions = [];
const errors = [];

lines.forEach((line, i) => {
  let q;
  try { q = JSON.parse(line); }
  catch (e) { errors.push(`第 ${i + 1} 行 JSON 解析失败: ${e.message}`); return; }
  questions.push(q);
});

const seenId = new Map();
const seenTopic = new Map();
const seenQuestion = new Map();

questions.forEach((q, i) => {
  const tag = q.id || `第 ${i + 1} 行`;
  for (const k of REQUIRED) {
    if (q[k] === undefined || q[k] === null || q[k] === '' || (Array.isArray(q[k]) && q[k].length === 0)) {
      errors.push(`${tag} 缺字段 ${k}`);
    }
  }
  if (!ALLOWED_TYPES.includes(q.type)) errors.push(`${tag} 非法 type: ${q.type}`);
  if (!DIFF.includes(q.difficulty)) errors.push(`${tag} 非法 difficulty: ${q.difficulty}`);
  if (!Array.isArray(q.tags)) errors.push(`${tag} tags 必须是数组`);

  if (q.type === 'choice') {
    const keys = q.options ? Object.keys(q.options) : [];
    if (keys.join('') !== 'ABCD') errors.push(`${tag} 选择题必须恰好 A/B/C/D 四个选项`);
    if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) errors.push(`${tag} 选择题答案必须是 A/B/C/D`);
    for (const k of keys) {
      if (!q.options[k] || !String(q.options[k]).trim()) errors.push(`${tag} 选项 ${k} 为空`);
    }
  } else if (q.options !== null && q.options !== undefined) {
    errors.push(`${tag} 非选择题 options 应为 null`);
  }
  if (q.type === 'concept' && !['true', 'false'].includes(q.correct_answer)) {
    errors.push(`${tag} 判断题答案必须是 true/false`);
  }
  if (q.type === 'fill_in_blank') {
    const blanks = (String(q.question).match(/____/g) || []).length;
    if (blanks !== 1) errors.push(`${tag} 填空题必须恰好一个 ____，当前 ${blanks}`);
  }

  if (seenId.has(q.id)) errors.push(`${tag} id 重复（与第 ${seenId.get(q.id)} 题）`);
  else seenId.set(q.id, i + 1);

  const topic = String(q.topic).trim();
  if (seenTopic.has(topic)) errors.push(`${tag} topic 重复: ${topic}（与 ${seenTopic.get(topic)}）`);
  else seenTopic.set(topic, q.id);

  const qKey = String(q.question).replace(/\s+/g, '').trim();
  if (seenQuestion.has(qKey)) errors.push(`${tag} 题干重复（与 ${seenQuestion.get(qKey)}）`);
  else seenQuestion.set(qKey, q.id);

  if (q.source) {
    if (/^https?:\/\//.test(q.source)) {
      // 网络来源只校验 URL 形态，不做联网探测（构建保持离线可跑）
      try { new URL(q.source); } catch { errors.push(`${tag} source 不是合法 URL: ${q.source}`); }
    } else {
      const src = path.join(workspace, q.source);
      if (!fs.existsSync(src)) errors.push(`${tag} source 不存在: ${q.source}`);
    }
  }
});

if (errors.length) {
  console.error('校验失败：\n' + errors.map(e => ' - ' + e).join('\n'));
  process.exit(1);
}

const counts = {};
questions.forEach(q => { counts[q.type] = (counts[q.type] || 0) + 1; });

fs.writeFileSync(path.join(DATA, 'questions.json'), JSON.stringify(questions, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA, 'questions.js'), 'window.QUESTION_BANK = ' + JSON.stringify(questions, null, 2) + ';\n', 'utf8');
fs.writeFileSync(JSONL, questions.map(q => JSON.stringify(q)).join('\n') + '\n', 'utf8');

const sourceFiles = [...new Set(questions.map(q => q.source))];
let md = '';
md += `# ${title}·背诵版（${questions.length} 题）\n\n`;
md += `> 更新日期：${meta.updated || ''}｜领域：${meta.domain || ''}｜批次：${meta.batch || ''}\n`;
md += `> 题量：${ALLOWED_TYPES.filter(t => counts[t]).map(t => `${TYPE_LABEL[t]} ${counts[t]}`).join('｜')}\n`;
md += `> 来源：${sourceFiles.length} 份讲义（详见每题“来源”）；全部题目带答案、解析与易错点\n`;
md += `> 用法：先盖住答案自答，再对照解析；错题在 HTML 刷题页会自动进入错题本\n\n`;
md += `## 目录\n\n`;
for (const t of ALLOWED_TYPES) {
  if (!counts[t]) continue;
  const list = questions.filter(q => q.type === t);
  md += `- ${TYPE_LABEL[t]}（${list.length}）：${list[0].id} – ${list[list.length - 1].id}\n`;
}
md += `\n---\n\n`;

for (const t of ALLOWED_TYPES) {
  if (!counts[t]) continue;
  const list = questions.filter(q => q.type === t);
  md += `# ${TYPE_LABEL[t]}（${list.length} 题）\n\n`;
  for (const q of list) {
    md += `## ${q.id}｜${q.topic}\n\n`;
    md += `**领域：** ${q.domain}　**难度：** ${q.difficulty}　**标签：** ${q.tags.join('、')}\n\n`;
    md += `${q.question}\n\n`;
    if (q.type === 'choice') {
      for (const k of ['A', 'B', 'C', 'D']) md += `- ${k}. ${q.options[k]}\n`;
      md += `\n`;
    }
    let ans = q.correct_answer;
    if (q.type === 'concept') ans = q.correct_answer === 'true' ? '正确（true）' : '错误（false）';
    md += `**答案：** ${ans}\n\n`;
    md += `**解析：** ${q.explanation}\n\n`;
    if (q.pitfall) md += `**易错点：** ${q.pitfall}\n\n`;
    md += `**来源：** \`${q.source}\`\n\n---\n\n`;
  }
}
fs.writeFileSync(path.join(ROOT, `${title}-背诵版.md`), md, 'utf8');

console.log('OK');
console.log('题库:', title, '| 总题数:', questions.length);
console.log('题型分布:', JSON.stringify(counts));
console.log('来源文件数:', sourceFiles.length);
console.log('输出目录:', ROOT);
