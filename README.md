# 项目题库

离线具身智能题库：1920 道题，覆盖 VLA、运动控制与 RL、世界模型与仿真、灵巧手、水下机器人、数据工程、推理部署、Agent 与中间件等方向。

## 打开方式

- Windows：双击 `启动刷题.cmd`（需要 Node.js，固定地址 `http://127.0.0.1:8123`）
- 直接打开 `index.html` 也可以使用，但进度保存在浏览器本地
- Android：安装 `APK/question-bank-v1.0.0.apk`

## 功能

- 练习 / 考试 / 背诵三种模式，答对自动跳下一题
- 错题本、收藏夹、垃圾箱、答题卡、断点续做
- 统计页、进度导入导出
- 本地服务模式把进度写入 `data/progress.json`

## 目录

| 路径 | 说明 |
|---|---|
| `data/questions.jsonl` | 题库唯一真源 |
| `data/questions.js` | 页面加载用的构建产物 |
| `index.html` | 离线刷题页 |
| `serve.cjs` | 本地静态服务（端口 8123） |
| `项目题库-背诵版.md` | 背诵版全文 |
| `项目题库-关键词知识地图.md` | 关键词思维导图 |
| `APK/` | Android 工程与安装包 |
| `skill/` | 题库维护技能与提示词 |

## 文档

- [Android 构建与安装](APK/README.md)
- [APK 测试报告](APK/TEST-REPORT.md)
- [关键词知识地图](项目题库-关键词知识地图.md)
