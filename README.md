# 独立开发者作品集 · Dev Portfolio

一款展示独立软件开发者作品的单页作品集网站，包含网页游戏、Web 应用、IDEA 插件与技术博客。

## ✨ 特性

- 🎮 **4 款网页游戏**：暗夜幸存者、飞机大战、王国守卫、贪吃蛇，纯前端实现
- 📱 **14 款 Web 应用**：温暖陪伴、LinguaVerse 多语种学习平台、在线 PS 图像编辑器、咪咪工具箱、珊瑚音乐、咪咪剪辑、心动星球、约会灵感站、小商家预约排队、闲置交换、古韵抽卡、汪汪时间管理局、猫咪生活报、汪汪签到局
- 🔌 **2 款 IDEA 插件**：桌面宠物鲸鱼、按键统计工具窗口
- 📝 **技术博客**：6 篇技术文章卡片
- 🌍 **中英文切换**：完整 i18n 支持，一键切换
- 🎨 **双主题**：珊瑚橙（温暖）+ 赛博朋克（科技感），一键切换
- 🎬 **视频预览**：Canvas 实时动画游戏预告片
- 📱 **响应式**：桌面 / 平板 / 手机全适配
- ⚡ **零依赖、零构建**：纯 HTML + CSS + JS，双击即运行
- 🧩 **模块化结构**：样式按层拆分、脚本按功能拆分，改哪块找哪块

## 📁 项目结构

```
dev-portfolio/
├── index.html              # 页面骨架：导航 / Hero / 各区块 / 弹窗结构 + 资源引用
├── css/
│   ├── tokens.css          # 设计令牌：CSS 变量与双主题（珊瑚橙 / 赛博朋克）配色
│   ├── base.css            # 全局重置、区块基础样式、滚动显现动画
│   ├── layout.css          # 导航栏与 Hero 首屏
│   ├── components.css      # 作品卡片：游戏 / 应用 / 博客
│   ├── sections.css        # 关于我、联系与页脚
│   ├── modal.css           # 视频弹窗与预告片画布
│   ├── responsive.css      # 响应式适配（媒体查询）
│   └── visuals.css         # 无封面图时的渐变视觉、插件卡片与主题补丁
├── js/
│   ├── i18n.js             # 中英文词典与语言切换
│   ├── ui.js               # 主题切换、导航交互、滚动显现
│   ├── hero-canvas.js      # Hero 首屏粒子背景动画
│   ├── trailers/
│   │   ├── modal.js        # 视频弹窗控制与预告片调度
│   │   ├── survivor.js     # 暗夜幸存者预告片
│   │   ├── plane-war.js    # 飞机大战预告片
│   │   ├── kingdom.js      # 王国守卫预告片
│   │   └── snake.js        # 贪吃蛇预告片
│   └── main.js             # 入口初始化
├── assets/
│   ├── favicon.svg                  # 站点图标（珊瑚橙 L 标识）
│   ├── dev-avatar.jpg               # 开发者头像
│   ├── survivor-cover.jpg           # 暗夜幸存者封面
│   ├── planewar-cover.jpg           # 飞机大战封面
│   ├── kingdom-cover.png            # 王国守卫封面
│   ├── snake-cover.png              # 贪吃蛇封面
│   ├── warmcompanion-cover.jpg      # 温暖陪伴封面
│   ├── poetry-cover.png             # 古韵抽卡封面
│   ├── workbench-cover.png          # 汪汪时间管理局封面
│   ├── newspaper-cover.png          # 猫咪生活报封面
│   ├── checkin-cover.png            # 汪汪签到局封面
│   ├── linguaverse-cover.jpg        # LinguaVerse 多语种学习平台封面
│   ├── onlineps-cover.png           # 在线 PS 封面
│   ├── onlinetools-cover.png        # 咪咪工具箱封面
│   ├── music-cover.png             # 珊瑚音乐封面
│   ├── video-cover.png             # 咪咪剪辑封面
│   ├── dating-inspiration-cover.jpg # 约会灵感站封面
│   ├── heartverse-cover.jpg        # 心动星球封面
│   ├── shop-booking-cover.jpg      # 小商家预约排队封面
│   ├── idle-exchange-cover.jpg     # 闲置交换封面
│   ├── pet-cover.jpg                # IDEA 桌面宠物封面
│   └── keyboard-cover.png           # IDEA 按键统计封面
├── LICENSE
└── README.md
```

> 样式表按 `index.html` 中的引入顺序层叠（tokens → base → layout → components → sections → modal → responsive → visuals），
> 脚本同样按引入顺序执行，全部为普通 `<script>`（非 ES Module），因此 `file://` 直接打开也能正常运行。

## 🚀 快速开始

### 方式一：直接打开

双击 `index.html` 用浏览器打开即可（无需构建、无需服务器）。

### 方式二：本地服务器

```bash
cd dev-portfolio
python -m http.server 8090
# 浏览器访问 http://localhost:8090
```

## 🎨 主题

### 珊瑚橙主题（默认）

温暖的珊瑚橙主色调 + 奶油底色，卡通萌系风格。

### 赛博朋克主题

霓虹青色 + 品红配色，扫描线网格 + 霓虹发光 + 深色科技感。

点击右上角 🌙 / ☀️ 图标即可切换主题，设置会保存到 localStorage。

## 🎮 作品列表

共 4 款网页游戏、14 款 Web 应用、2 款 IDEA 插件与 6 篇技术博客。标 🌐 的为已验证在线地址；标 — 的应用同样托管于 Cloudflare Pages，源码见对应仓库。

### 网页游戏（4）

- **暗夜幸存者 · Survivor Game** — 仿《吸血鬼幸存者》浏览器小游戏。🌐 https://survivor-game-9e3.pages.dev/ · 📦 https://gitee.com/li-luoqiang/survivor-game · 5 种武器 · 5 种敌人 · 升级三选一 · 本地排行榜
- **飞机大战 · Plane War** — 经典飞机射击游戏。🌐 https://plane-war-c5b.pages.dev/ · 📦 https://gitee.com/li-luoqiang/plane-war · 6 种武器道具 · BOSS 弹幕 · 程序化音效 · 移动端适配
- **王国守卫 · Kingdom Defense** — 纯前端策略塔防，Canvas 矢量绘制全部场景。📦 https://gitee.com/li-luoqiang/kingdom-defense · 3 种防御塔 · 波次递增 · Boss 波 · 金币经济 · 塔升级
- **贪吃蛇 · Snake** — 经典贪吃蛇的 Roguelite 进化版。📦 https://gitee.com/li-luoqiang/snake-game · 升级卡 · 3 生命 · 连击倍率 · Boss 蛇 · 排行榜

### Web 应用（14）

| 应用 | 简介 | 在线 | 源码 |
|------|------|------|------|
| 温暖陪伴 | 情感陪伴聊天 App 原型（打字机 / 富文本 / mock AI） | [🌐](https://warm-companion.pages.dev/) | [📦](https://gitee.com/li-luoqiang/warm-companion) |
| LinguaVerse | 多语种学习平台（英日韩法西） | [🌐](https://linguaverse-web.pages.dev/) | [📦](https://gitee.com/li-luoqiang/linguaverse-web) |
| 在线 PS | 浏览器图像编辑器（图层 / 蒙版 / 选区） | [🌐](https://online-ps.pages.dev) | [📦](https://gitee.com/li-luoqiang/online-ps) |
| 咪咪工具箱 | 13 款开发者工具（JSON / 正则 / JWT…） | [🌐](https://online-tools-x0y.pages.dev/) | [📦](https://gitee.com/li-luoqiang/online-tools) |
| 珊瑚音乐 | 零依赖在线播放器（频谱 / LRC / PWA） | — | [📦](https://gitee.com/li-luoqiang/online-music) |
| 咪咪剪辑 | 浏览器视频剪辑（多轨 / WebCodecs 导出） | — | [📦](https://gitee.com/li-luoqiang/online-video) |
| 心动星球 | 心动社交星球（粉紫渐变） | — | [📦](https://gitee.com/li-luoqiang/heartverse-web) |
| 约会灵感站 | 约会创意灵感（场景 / 预算 / 天气筛选） | — | [📦](https://gitee.com/li-luoqiang/dating-inspiration) |
| 小商家预约排队 | 美甲 / 理发 / 餐饮预约排队 MVP | — | [📦](https://gitee.com/li-luoqiang/shop-booking) |
| 闲置交换 | 社区二手闲置交换（分类 / 距离筛选） | [🌐](https://idle-exchange.pages.dev/) | [📦](https://gitee.com/li-luoqiang/idle-exchange) |
| 古韵抽卡 | 古诗词抽卡 + Canvas 水墨配图 + 收藏册 | — | [📦](https://gitee.com/li-luoqiang) |
| 汪汪时间管理局 | 萌系个人时间管理（日程 / 习惯 / 番茄钟） | — | [📦](https://gitee.com/li-luoqiang/workbench-mobile) |
| 猫咪生活报 | 喵星人编辑部每日生活报 | — | [📦](https://gitee.com/li-luoqiang) |
| 汪汪签到局 | 汪汪主题习惯签到（日历 / 统计） | — | [📦](https://gitee.com/li-luoqiang/checkin-workbench) |

### IDEA 插件（2）

- **桌面宠物鲸鱼 · Pet Whale** — IntelliJ 状态栏鲸鱼陪伴 + 休息 / 喝水提醒 + 提交庆祝（Kotlin / IntelliJ Platform SDK）。📦 https://gitee.com/li-luoqiang/idea-pet-whale
- **按键统计 · Keyboard Stats** — 实时按键 / 快捷键统计 + 可视化图表。📦 https://gitee.com/li-luoqiang/idea-keyboard-stats

### 技术博客（6）

- 纯 Canvas 如何实现满屏敌人不掉帧
- Web Audio API 程序化合成游戏音效
- 从 mock 到真实 API：聊天原型的渐进式设计
- 单文件部署到 Cloudflare Pages 的最佳实践
- localStorage 游戏排行榜的正确实现方式
- Canvas 矢量绘制卡通角色的技巧

## 🛠️ 技术栈

- **HTML5**：语义化结构，`index.html` 只负责骨架
- **CSS3**：CSS 变量 / Grid / Flexbox / 动画，按层拆分为 8 个样式模块
- **JavaScript**：原生 JS，零框架依赖，按功能拆分为 9 个脚本模块
- **Canvas 2D**：游戏预告片动画 + Hero 背景粒子
- **i18n**：自实现的双语切换系统（`js/i18n.js`）
- **主题系统**：CSS 变量 + `data-theme` 属性（`css/tokens.css`）

## 🌍 语言切换

支持中文（zh）和英文（en），点击导航栏「中/EN」按钮切换，设置保存到 localStorage。

## 📝 自定义

### 修改文案

编辑 `js/i18n.js` 中的 `i18n` 词典，同时补齐 `zh` 与 `en` 两套 key，否则切换语言时会漏词。
页面元素通过 `data-i18n="key"` 引用。

### 更换主题色

编辑 `css/tokens.css` 中 `:root` 下的 CSS 变量（如 `--coral`、`--cream` 等）即可快速换色；
赛博朋克主题的覆盖值在同文件的 `[data-theme="cyberpunk"]` 选择器下。

### 添加作品

在 `index.html` 对应 section（`#projects` / `#app` / `#plugins` / `#blog`）中复制一个 `.project-card`，
修改内容与链接，并按区块内顺序递增 `project-number` 编号；卡片样式在 `css/components.css`。

### 新增游戏预告片

1. 在 `js/trailers/` 下新建脚本，导出形如 `startXxxTrailer()` 的函数；
2. 在 `js/trailers/modal.js` 的 `openVideoModal()` 中补充一个分支；
3. 在 `index.html` 末尾的 `<script>` 列表里按顺序引入新脚本。

## 📄 License

MIT License
