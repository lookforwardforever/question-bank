@echo off
chcp 65001 >nul
title 项目题库
cd /d "%~dp0"

set "NODE_EXE=E:\Classification\Node\node.exe"
if exist "%NODE_EXE%" goto run

where node >nul 2>nul
if errorlevel 1 goto nonode
set "NODE_EXE=node"

:run
echo 正在启动项目题库...
echo.
"%NODE_EXE%" serve.cjs
if errorlevel 1 pause
exit /b

:nonode
echo 未检测到 Node.js，改为直接用浏览器打开。
echo 进度会保存在浏览器里；安装 Node.js 后可用本文件启动本地服务。
start "" "index.html"
timeout /t 3 >nul