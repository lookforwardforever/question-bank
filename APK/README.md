# 项目题库 APK

把 `question-bank/index.html` 与 `data/questions.js` 原样装进 Android WebView，离线运行。

## 功能

- 练习、错题本、收藏夹、垃圾箱、背诵、统计、模拟考试
- 选择题/判断题/填空题答对自动跳下一题，答错停留
- 答题卡分页、背诵分页、学习状态筛选、随机顺序
- 进度导出/导入 JSON（通过 Android 系统文件选择器，不需要存储权限）
- 返回键双击退出
- 适配 Android 17（API 37）edge-to-edge
- 目标版本：compileSdk / targetSdk 37，minSdk 26
- 交付 APK：`question-bank-v1.0.0.apk`（约 0.55 MB）
- 测试报告：见 `TEST-REPORT.md`

## 构建

环境：

- JDK 17：`E:\Android\jdk-17.0.2`
- Android SDK：`E:\Android\Sdk`
- 平台：`android-37.0`
- 构建工具：`37.0.0`

命令：

```bat
set JAVA_HOME=E:\Android\jdk-17.0.2
set ANDROID_HOME=E:\Android\Sdk
gradlew.bat assembleRelease
```

产物：

```text
app\build\outputs\apk\release\app-release.apk
```

## 安装

```bat
adb install -r app\build\outputs\apk\release\app-release.apk
```

也可以把 APK 传到手机，点击安装并允许“安装未知应用”。

## 数据与存储

- 进度保存在 WebView 的 localStorage，约 20–100 KB，随答题数量增长。
- 题库资源只读，来自 APK 内的 assets，不额外复制到手机存储。
- 不申请网络、相机、麦克风、存储权限。
- 导出进度时，只在你选择的位置生成一个 JSON 文件。
- 卸载应用或在系统设置里清除应用数据，会清空本地进度；重要进度请先导出 JSON。
- APK 体积约 3–5 MB（release，含 1.7 MB 题库）。

## 签名

`keystore/question-bank.jks` 是本地发布签名：

- alias：`questionbank`
- 密码：`QB-2026-Local-Key`

**请备份 keystore 和密码。** 丢失后无法覆盖安装后续版本。不要把 keystore 公开上传。

## 源码结构

```text
APK/
├─ app/src/main/assets/index.html       题库页面
├─ app/src/main/assets/data/questions.js 题库数据
├─ app/src/main/java/com/zihan/questionbank/MainActivity.java
├─ app/src/main/res/                     图标、启动页、主题
├─ app/src/main/AndroidManifest.xml
├─ app/build.gradle
├─ settings.gradle
└─ keystore/question-bank.jks
```
