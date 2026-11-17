# APK 测试报告

## 构建信息

| 项目 | 值 |
|---|---|
| 包名 | `com.zihan.questionbank` |
| 版本 | 1.0.0（versionCode 1） |
| compileSdk / targetSdk | 37 / 37（Android 17） |
| minSdk | 26（Android 8.0） |
| 构建工具 | AGP 9.4.0、Gradle 9.6.0、JDK 17 |
| 签名 | release，APK Signature Scheme v2 |
| APK 大小 | 0.55 MB |
| SHA-256 | `3C5D5B3625F875DEB87580B2CA581F922BDA87469EAFD4D3353DD92C8307ACC7` |

## 已完成的检查

### APK 静态检查

- `aapt dump badging`：包名、版本、`targetSdkVersion 37`、应用名“项目题库”正确。
- `apksigner verify`：签名有效，v2 方案通过。
- `apkanalyzer manifest permissions`：没有 INTERNET、相机、麦克风、存储权限；只有 AndroidX 自动生成的私有权限 `com.zihan.questionbank.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION`。
- APK 内资源：`assets/index.html`、`assets/data/questions.js` 均存在，未打包 `progress.json`、`serve.cjs`、`skill/` 等无关文件。
- `apkanalyzer dex packages`：`MainActivity` 与 `AndroidBridge` 的 `available`、`exportProgress`、`importProgress` 方法在 R8 后仍保留。

### 页面与功能测试

从最终 APK 中提取 `assets`，在手机尺寸下运行同一份页面，并注入模拟的 `QBAndroid` 桥：

- 学习统计显示“数据位置：APK 本地存储（WebView）”。
- 点击“导出进度 JSON”：调用 Android 导出桥，文件名 `quiz-progress-2026-11-17.json` 正确。
- 点击“导入进度 JSON”：调用 Android 导入桥。
- 练习模式答对选择题后自动跳到下一题。
- 浏览器控制台无 JavaScript 错误。
- 页面在 476 px 宽度下 `scrollWidth 461 < innerWidth 476`，没有横向溢出；已补 390 px 小屏规则和 `overflow-x:hidden`。

## 未能完成的运行时测试

本机 CPU 虚拟化在固件层关闭（`VirtualizationFirmwareEnabled=False`），Android 模拟器无法正常启动；`adb devices` 也没有连接真机。因此以下 Android 运行时行为无法在交付前实测：

- WebView 加载 `file:///android_asset/index.html` 的实际显示。
- WebView localStorage 在 Android 17 上的实际持久化。
- Android 系统文件选择器导出/导入 JSON。
- 状态栏/导航栏 insets 和返回键双击退出。

这些代码均按 Android 官方 WebView 用法实现；拿到手机后建议按下面的“验收步骤”逐项过一遍。

## 手机验收步骤

1. 安装 APK，允许“安装未知应用”。
2. 打开应用，确认能看到题库首页。
3. 练习一道选择题，答对后确认自动跳下一题；答错确认停留。
4. 切到“错题本”“收藏夹”“垃圾箱”“背诵模式”“学习统计”，确认都能打开。
5. 在统计页点“导出进度 JSON”，选一个位置保存；再点“导入进度 JSON”，选刚保存的文件，确认提示导入成功。
6. 杀掉应用再打开，确认已练习数和上次位置还在。
7. 按两次返回键，确认退出。

## 存储占用

| 项目 | 大小 |
|---|---:|
| APK 文件 | 0.55 MB |
| APK 解压后 | 约 1.93 MB |
| 其中 `questions.js` | 1.72 MB（压缩后 0.48 MB） |
| 其中 `index.html` | 80 KB（压缩后 19 KB） |
| 运行时 WebView 本地存储 | 约 20–200 KB，随答题数量增长 |
| 导出的进度 JSON | 约 20–200 KB，只在手动导出时生成 |
| 网络/图片/音频缓存 | 无；WebView 设置为 `LOAD_NO_CACHE`，不申请网络权限 |

不申请存储权限，不往公共目录写文件；导入导出使用 Android 系统文件选择器（SAF），只有你主动选择的位置才会出现一个 JSON 文件。卸载应用或在系统设置里清除应用数据会清空本地进度，重要进度请先导出。

## 构建命令

```bat
set JAVA_HOME=E:\Android\jdk-17.0.2
set ANDROID_HOME=E:\Android\Sdk
gradlew.bat assembleRelease
```

产物：`app\build\outputs\apk\release\app-release.apk`
