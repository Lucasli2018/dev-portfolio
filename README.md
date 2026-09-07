# 独立开发者作品集 · Dev Portfolio

一款展示独立软件开发者作品的单页作品集网站，包含网页游戏、APP 原型与技术博客。

## ✨ 特性

- 🎮 **2 款网页游戏**：暗夜幸存者 + 飞机大战，纯前端单文件实现
- 📱 **APP 原型**：温暖陪伴情感聊天 App 界面原型
- 📝 **技术博客**：6 篇技术文章卡片
- 🌍 **中英文切换**：完整 i18n 支持，一键切换
- 🎨 **双主题**：珊瑚橙（温暖）+ 赛博朋克（科技感），一键切换
- 🎬 **视频预览**：Canvas 实时动画游戏预告片
- 📱 **响应式**：桌面 / 平板 / 手机全适配
- ⚡ **零依赖**：纯 HTML + CSS + JS，双击即运行

## 🎨 主题

### 珊瑚橙主题（默认）
温暖的珊瑚橙主色调 + 奶油底色，卡通萌系风格。

### 赛博朋克主题
霓虹青色 + 品红配色，扫描线网格 + 霓虹发光 + 深色科技感。

点击右上角 🌙 / ☀️ 图标即可切换主题，设置会保存到 localStorage。

## 🎮 作品列表

### 暗夜幸存者 · Survivor Game
仿《吸血鬼幸存者》的浏览器小游戏。

- 🌐 在线试玩：https://survivor-game-9e3.pages.dev/
- 📦 源码：https://gitee.com/li-luoqiang/survivor-game
- 5 种武器 · 5 种敌人 · 升级三选一 · 本地排行榜

### 飞机大战 · Plane War
经典飞机射击游戏。

- 🌐 在线试玩：https://plane-war-c5b.pages.dev/
- 📦 源码：https://gitee.com/li-luoqiang/plane-war
- 6 种武器道具 · BOSS 弹幕 · 程序化音效 · 移动端适配

### 温暖陪伴 · Warm Companion
温柔治愈风格的情感陪伴聊天 App 原型。

- 🌐 在线体验：https://warm-companion.pages.dev/
- 📦 源码：https://gitee.com/li-luoqiang/warm-companion
- 三栏布局 · 打字机效果 · 富文本+代码高亮 · mock AI 回复

## 🚀 快速开始

### 方式一：直接打开
双击 `index.html` 用浏览器打开即可。

### 方式二：本地服务器
```bash
cd portfolio
python -m http.server 8090
# 浏览器访问 http://localhost:8090
```

## 📁 项目结构

```
portfolio/
├── index.html          # 主页面（全部代码内联）
├── assets/
│   ├── dev-avatar.jpg       # 开发者头像
│   ├── survivor-cover.jpg   # 暗夜幸存者封面
│   ├── planewar-cover.jpg   # 飞机大战封面
│   └── warmcompanion-cover.jpg  # 温暖陪伴封面
└── README.md
```

## 🛠️ 技术栈

- **HTML5**：语义化结构
- **CSS3**：CSS 变量 / Grid / Flexbox / 动画
- **JavaScript**：原生 JS，零框架依赖
- **Canvas 2D**：游戏预告片动画 + Hero 背景粒子
- **i18n**：自实现的双语切换系统
- **主题系统**：CSS 变量 + data-theme 属性

## 🌍 语言切换

支持中文（zh）和英文（en），点击导航栏「中/EN」按钮切换，设置保存到 localStorage。

## 🎨 主题切换

- 🌙 图标：切换到赛博朋克主题
- ☀️ 图标：切换到珊瑚橙主题

设置自动保存到 localStorage，下次访问时恢复。

## 📝 自定义

### 修改文案
在 `index.html` 中搜索 `const i18n = {` 找到翻译对象，修改对应语言的 key-value 即可。

### 更换主题色
修改 `:root` 下的 CSS 变量（如 `--coral`、`--cream` 等）即可快速换色。

### 添加作品
在 `projects` section 中复制一个 `.project-card`，修改内容和链接即可。

## 📄 License

MIT License
