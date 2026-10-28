# 独立开发者作品集 · Dev Portfolio

一款展示独立软件开发者作品的单页作品集网站，包含网页游戏、Web 应用、IDEA 插件与技术博客。

## ✨ 特性

- 🎮 **11 款网页游戏**：暗夜幸存者、飞机大战、王国守卫、贪吃蛇、俄罗斯方块、月光牧场、肉鸽卡牌、星海抽卡者、迷雾剧场、仙途挂机、诗词小游戏，纯前端实现
- 📱 **35 款 Web 应用**：温暖陪伴、LinguaVerse 多语种学习平台、在线 PS 图像编辑器、咪咪工具箱、珊瑚音乐、咪咪剪辑、心动星球、约会灵感站、小商家预约排队、闲置交换、古韵抽卡、汪汪时间管理局、猫咪生活报、汪汪签到局、节假日宠物寄养、活动报名签到、团队排班、家修管家、错题本、求职作战台、GitHub 镜像代理、塘朗山自然教育、AuraSage 跨境电商、跨境选品决策台、游戏选品决策台、学习目标管理台、星座运势、发布小工具、古文学习导航、今天吃啥、项目管理、SOMNA 冥想睡眠、思维导图 MindFlow、西瓜博客、全能工作台
- 🔌 **2 款 IDEA 插件**：桌面宠物鲸鱼、按键统计工具窗口
- 📝 **技术博客**：6 篇技术文章卡片
- 🌍 **中英文切换**：完整 i18n 支持，一键切换
- 🎨 **双主题**：珊瑚橙（温暖）+ 赛博朋克（科技感），一键切换
- 🎬 **视频预览**：8 款游戏（暗夜幸存者 / 飞机大战 / 王国守卫 / 贪吃蛇 / 俄罗斯方块 / 月光牧场 / 肉鸽卡牌 / 星海抽卡者）带 Canvas 实时动画预告片
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
│   ├── main.js             # 入口初始化
│   └── trailers/           # 游戏预告片（Canvas 实时动画）
│       ├── modal.js        # 视频弹窗控制与预告片调度
│       ├── survivor.js     # 暗夜幸存者预告片
│       ├── plane-war.js    # 飞机大战预告片
│       ├── kingdom.js      # 王国守卫预告片
│       ├── snake.js        # 贪吃蛇预告片
│       ├── tetris.js       # 俄罗斯方块预告片
│       ├── ranch.js        # 月光牧场预告片
│       ├── roguelike-card.js   # 肉鸽卡牌预告片
│       └── roguelike-gacha.js  # 星海抽卡者预告片
├── assets/
│   ├── favicon.svg              # 站点图标（珊瑚橙 L 标识）
│   ├── dev-avatar.jpg           # 开发者头像
│   └── *-cover.jpg              # 各作品封面（游戏 11 / 应用 35 / 插件 2，共 48 张 jpg，文件名与项目 key 对应）
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

共 11 款网页游戏、35 款 Web 应用、2 款 IDEA 插件与 6 篇技术博客。标 🌐 的为 Cloudflare Pages 在线地址；📦 为 Gitee 源码仓库。

### 网页游戏（11）

- **暗夜幸存者 · Survivor** — 仿《吸血鬼幸存者》浏览器小游戏。🌐 https://survivor-game-9e3.pages.dev/ · 📦 https://gitee.com/li-luoqiang/survivor-game · 5 种武器 · 5 种敌人 · 升级三选一 · 本地排行榜
- **飞机大战 · Plane War** — 经典飞机射击游戏。🌐 https://plane-war-c5b.pages.dev/ · 📦 https://gitee.com/li-luoqiang/plane-war · 6 种武器道具 · BOSS 弹幕战 · 程序化音效 · TOP 10 排行榜
- **王国守卫 · 塔防 · Kingdom Defense** — 纯前端策略塔防，Canvas 矢量绘制全部场景。🌐 https://kingdom-defense.pages.dev/ · 📦 https://gitee.com/li-luoqiang/kingdom-defense · 3 种防御塔 · 波次递增 · Boss 波 · 金币经济
- **贪吃蛇 · Snake** — 经典贪吃蛇的 Roguelite 进化版。🌐 https://snake-game-ah7.pages.dev/ · 📦 https://gitee.com/li-luoqiang/snake-game · Roguelite 升级卡 · 3 生命 · 连击倍率 · Boss 蛇
- **俄罗斯方块 · Tetris** — 经典方块消除游戏。🌐 https://tetris-10i.pages.dev/ · 📦 https://gitee.com/li-luoqiang/tetris · 7 种方块 · 幽灵投影 · 消行特效 · 等级加速
- **月光牧场 · Moonlight Ranch** — 月下模拟经营。🌐 https://ranch-moon.pages.dev/ · 📦 https://gitee.com/li-luoqiang/ranch-moon · 开垦种植 · 饲养牲畜 · 月夜循环 · 金币经营
- **肉鸽卡牌 · Roguelike Card** — 卡牌构筑 Roguelike。🌐 https://roguelike-card-game.pages.dev/ · 📦 https://gitee.com/li-luoqiang/roguelike-card-game · 5 大职业 · 卡牌战斗 · 遗物系统 · Roguelike 随机
- **星海抽卡者 · Star-Sea Gacha** — 星海抽卡 Roguelike。🌐 https://roguelike-gacha.pages.dev/ · 📦 https://gitee.com/li-luoqiang/roguelike-gacha · 抽卡召唤 · 出战队伍 · 共鸣系统 · 层层探索
- **迷雾剧场 · 文字悬疑推理 · Mystery Script** — 九部剧本推理合集。🌐 https://mystery-script.pages.dev/ · 📦 https://gitee.com/li-luoqiang/mystery-script · 九部完整剧本 · 搜证盘问指认 · 每部 4 结局 · 连环案解锁
- **仙途挂机 · Xiuxian Idle** — 修仙放置游戏。🌐 https://xiuxian-idle.pages.dev/ · 📦 https://gitee.com/li-luoqiang/xiuxian-idle · 打坐修炼 · 门人弟子产出 · 十重境界突破 · 离线挂机
- **诗词小游戏 · 诗趣 · Poetry Game** — 四种玩法玩着背诗。🌐 https://poetry-game-8hy.pages.dev/ · 📦 https://gitee.com/li-luoqiang/poetry-game · 诗词填空 · 答题闯关 · 飞花令 · 诗词接龙

### Web 应用（35）

| # | 应用 | 简介 | 在线 | 源码 |
|---|------|------|------|------|
| 1 | 温暖陪伴 | 情感陪伴聊天 App 原型（打字机 / 富文本 / mock AI） | [🌐](https://warm-companion.pages.dev/) | [📦](https://gitee.com/li-luoqiang/warm-companion) |
| 2 | LinguaVerse | 多语种学习平台（英日韩法西） | [🌐](https://linguaverse-web.pages.dev/) | [📦](https://gitee.com/li-luoqiang/linguaverse-web) |
| 3 | 在线 PS | 浏览器图像编辑器（图层 / 蒙版 / 选区） | [🌐](https://online-ps.pages.dev) | [📦](https://gitee.com/li-luoqiang/online-ps) |
| 4 | 咪咪工具箱 | 13 款开发者工具（JSON / 正则 / JWT…） | [🌐](https://online-tools-x0y.pages.dev/) | [📦](https://gitee.com/li-luoqiang/online-tools) |
| 5 | 珊瑚音乐 | 零依赖在线播放器（频谱 / LRC / PWA） | [🌐](https://online-music.pages.dev/) | [📦](https://gitee.com/li-luoqiang/online-music) |
| 6 | 咪咪剪辑 | 浏览器视频剪辑（多轨 / WebCodecs 导出） | [🌐](https://online-video.pages.dev/) | [📦](https://gitee.com/li-luoqiang/online-video) |
| 7 | 心动星球 | 心动社交星球（粉紫渐变） | [🌐](https://heartverse-web.pages.dev/) | [📦](https://gitee.com/li-luoqiang/heartverse-web) |
| 8 | 约会灵感站 | 约会创意灵感（场景 / 预算 / 天气筛选） | [🌐](https://dating-inspiration.pages.dev/) | [📦](https://gitee.com/li-luoqiang/dating-inspiration) |
| 9 | 小商家预约排队 | 美甲 / 理发 / 餐饮预约排队 MVP | [🌐](https://shop-booking.pages.dev/) | [📦](https://gitee.com/li-luoqiang/shop-booking) |
| 10 | 闲置交换 | 社区二手闲置交换（分类 / 距离筛选） | [🌐](https://idle-exchange.pages.dev/) | [📦](https://gitee.com/li-luoqiang/idle-exchange) |
| 11 | 古韵抽卡 | 古诗词抽卡 + Canvas 水墨配图 + 收藏册 | [🌐](https://poetry-cards.pages.dev/) | [📦](https://gitee.com/li-luoqiang/poetry-cards) |
| 12 | 汪汪时间管理局 | 萌系个人时间管理（日程 / 习惯 / 番茄钟） | [🌐](https://workbench-mobile-cod.pages.dev/) | [📦](https://gitee.com/li-luoqiang/workbench-mobile) |
| 13 | 猫咪生活报 | 喵星人编辑部每日生活报 | [🌐](https://cat-newspaper-workbench.pages.dev/) | [📦](https://gitee.com/li-luoqiang/cat-newspaper-workbench) |
| 14 | 汪汪签到局 | 汪汪主题习惯签到（日历 / 统计） | [🌐](https://checkin-workbench.pages.dev/) | [📦](https://gitee.com/li-luoqiang/checkin-workbench) |
| 15 | 活动报名签到 | 活动创建 / 扫码签到 / 到场率统计 | [🌐](https://event-signin.pages.dev/) | [📦](https://gitee.com/li-luoqiang/event-signin) |
| 16 | 节假日宠物寄养 | 寄养家庭发布 / 在线预约 / 宠物档案管理 | [🌐](https://warm-host.pages.dev/) | [📦](https://gitee.com/li-luoqiang/warm-host) |
| 17 | 团队排班 | 团队排班管理 / 调班换班 / CSV·ICS 导出 | [🌐](https://team-schedule-bna.pages.dev/) | [📦](https://gitee.com/li-luoqiang/team-schedule) |
| 18 | 家修管家 | 家庭维修预约 / 师傅评分 / 订单管理 | [🌐](https://home-repair-ewe.pages.dev/) | [📦](https://gitee.com/li-luoqiang/home-repair) |
| 19 | 错题本 | 拍照记错题 / 间隔复习 / 科目分类 | [🌐](https://wrong-book-8ne.pages.dev/) | [📦](https://gitee.com/li-luoqiang/wrong-book) |
| 20 | 求职作战台 | 零依赖求职管理（投递漏斗 / 简历PDF / 80 题题库） | [🌐](https://job-hunt-cbm.pages.dev/) | [📦](https://gitee.com/li-luoqiang/job-hunt) |
| 21 | GitHub 镜像代理 | GitHub 加速镜像代理，免翻墙高速下载 Release 与仓库档案 | [🌐](https://github-proxy-9cy.pages.dev/) | [📦](https://gitee.com/li-luoqiang) |
| 22 | 塘朗山自然教育 | 山野资源数字体验（自然教育 / 步道导览） | [🌐](https://tanglang-nature.pages.dev/) | [📦](https://gitee.com/li-luoqiang/tanglang-nature) |
| 23 | AuraSage 跨境电商 | 五行珠宝香薰出海品牌站（五行测试 / 多币种结算） | [🌐](https://aurasage-du3.pages.dev/) | [📦](https://gitee.com/li-luoqiang/aurasage) |
| 24 | 跨境选品决策台 | 东方神秘文化赛道选品（六维评分 / 气泡品类地图 / 合规红线） | [🌐](https://east-mystic-picker.pages.dev/) | [📦](https://gitee.com/li-luoqiang/east-mystic-picker) |
| 25 | 游戏选品决策台 | 游戏立项决策（候选 / 六维加权评分 / 买量回收模拟器） | [🌐](https://game-picker.pages.dev/) | [📦](https://gitee.com/li-luoqiang/game-picker) |
| 26 | 学习目标管理台 | 目标拆解打卡（树状拆解 / 进度追踪） | [🌐](https://learning-goals.pages.dev/) | [📦](https://gitee.com/li-luoqiang/learning-goals) |
| 27 | 星座运势 | 每日星象运势（星座 / 塔罗 / 占星） | [🌐](https://star-fortune.pages.dev/) | [📦](https://gitee.com/li-luoqiang/star-fortune) |
| 28 | 发布小工具 | 网页版发布工具（一键部署 / 发布流程） | [🌐](https://publish-kit-web-dtl.pages.dev/) | [📦](https://gitee.com/li-luoqiang/publish-kit-web) |
| 29 | 古文学习导航 | 古籍学习一站式入口（经史子集导航） | [🌐](https://guwen-nav.pages.dev/) | [📦](https://gitee.com/li-luoqiang/guwen-nav) |
| 30 | 今天吃啥 | 转盘帮你决定吃啥（随机选择 / 菜单） | [🌐](https://what-to-eat-bpd.pages.dev/) | [📦](https://gitee.com/li-luoqiang/what-to-eat) |
| 31 | 项目管理 | 多项目任务与团队协作（看板 / 甘特） | [🌐](https://project-manager-9lq.pages.dev/) | [📦](https://gitee.com/li-luoqiang/project-manager) |
| 32 | SOMNA 冥想睡眠 | 呼吸引导与环境音助眠 | [🌐](https://somnia-sleep.pages.dev/) | [📦](https://gitee.com/li-luoqiang/somnia-sleep) |
| 33 | 思维导图 MindFlow | 在线思维导图 + 流程图 + 白板（自动布局 / 云端同步 / 模板中心） | [🌐](https://gitmind-48x.pages.dev/) | [📦](https://gitee.com/li-luoqiang/gitmind) |
| 34 | 西瓜博客 | 个人技术博客（Markdown 写作 / RSS 订阅 / Cloudflare 全栈） | [🌐](https://blog-5dh.pages.dev/) | [📦](https://gitee.com/li-luoqiang/blog) |
| 35 | 全能工作台 | 一站式个人工作台（待办 / 习惯打卡 / 记账预算 / 体重体脂） | [🌐](https://all-in-one-workbench.pages.dev/) | [📦](https://gitee.com/li-luoqiang/all-in-one-workbench) |

### IDEA 插件（2）

- **桌面宠物鲸鱼 · Pet Whale** — IntelliJ 状态栏鲸鱼陪伴 + 休息 / 喝水提醒 + 提交庆祝（Kotlin / IntelliJ Platform SDK）。📦 https://gitee.com/li-luoqiang/idea-pet-whale
- **按键统计 · Keyboard Stats** — 实时按键 / 快捷键统计 + 可视化图表。📦 https://gitee.com/li-luoqiang/idea-keyboard-stats

### 技术博客（6）

- 纯 Canvas 如何实现满屏敌人不掉帧（2026-08-23）
- Web Audio API 程序化合成游戏音效（2026-08-17）
- 从 mock 到真实 API：聊天原型的渐进式设计（2026-09-06）
- 单文件部署到 Cloudflare Pages 的最佳实践（2026-09-01）
- localStorage 游戏排行榜的正确实现方式（2026-08-10）
- Canvas 矢量绘制卡通角色的技巧（2026-07-28）

## 🛠️ 技术栈

- **HTML5**：语义化结构，`index.html` 只负责骨架
- **CSS3**：CSS 变量 / Grid / Flexbox / 动画，按层拆分为 8 个样式模块
- **JavaScript**：原生 JS，零框架依赖，按功能拆分为 13 个脚本模块（含 8 个游戏预告片）
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

现有 8 个预告片：`survivor.js` / `plane-war.js` / `kingdom.js` / `snake.js` / `tetris.js` / `ranch.js` / `roguelike-card.js` / `roguelike-gacha.js`。
新增步骤：

1. 在 `js/trailers/` 下新建脚本，导出形如 `startXxxTrailer()` 的函数；
2. 在 `js/trailers/modal.js` 的 `openVideoModal()` 中补充一个分支；
3. 在 `index.html` 末尾的 `<script>` 列表里按顺序引入新脚本。

## 📄 License

MIT License
