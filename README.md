# UniAppXDemo

基于 `uni-app x + UTS + uvue` 的跨端 App Demo 项目，用于验证 `uni-app x` 技术路线、沉淀基础项目架构，并参考 `H5/` 目录中的页面稿实现一组静态业务页面。

## 项目简介

当前项目聚焦两个目标：

- 搭建一个可继续演进的 `uni-app x` 基础工程
- 以“智医康”场景为例，完成首页、历史对话、健康档案、系统设置等页面的静态展示

项目当前以静态演示为主，尚未接入真实后端接口，但已经完成以下基础能力：

- `uni-app x` 项目骨架初始化
- 页面路由与全局样式配置
- `components/ui` 公共桥接组件沉淀
- 真实 `uni-ui x` 组件 `uni-nav-bar-x` 接入
- 统一静态演示数据与路由常量管理
- 基础 `lint` 校验脚本

## 技术栈

- 框架：`uni-app x`
- 页面：`uvue`
- 逻辑：`UTS`
- Vue 版本：`Vue 3`
- UI 策略：`uni-ui x` 官方组件 + 项目桥接层
- 校验命令：`npm run lint`

## 页面清单

当前 `pages.json` 中已注册以下页面：

- `pages/index/index`：首页 / 对话页
- `pages/history/index`：历史对话
- `pages/profile/index`：健康档案
- `pages/settings/index`：系统设置
- `pages/account/index`：账号设置
- `pages/feedback/index`：举报与反馈
- `pages/about/index`：关于我们
- `pages/integration/uni-ui-x-ready`：`uni-ui x` 接入说明页

## 目录结构

```text
ZykUniappx/
├─ pages/                  页面目录
├─ components/ui/          项目 UI 桥接组件
├─ constants/              静态演示数据与路由常量
├─ uni_modules/            已接入的 uni-ui x 真实组件
├─ static/                 静态资源
├─ scripts/                工程脚本
├─ docs/                   项目文档
├─ H5/                     参考页面截图
├─ App.uvue                应用入口
├─ main.uts                启动入口
├─ pages.json              页面配置
├─ manifest.json           应用配置
├─ platformConfig.json     平台配置
└─ uni.scss                全局样式变量文件
```

## 核心约定

### 1. 页面层只消费稳定数据

- 静态演示数据统一放在 `constants/demo-data.uts`
- 页面优先直接导入顶层常量
- 避免在模板中使用复杂对象的深层属性访问

### 2. 业务页面优先依赖桥接层

- 页面不直接依赖 `uni_modules/*` 下的真实组件路径
- 页面统一优先使用 `components/ui/*`
- 当前 `UiNavBar.uvue` 已桥接到真实 `uni-nav-bar-x`

### 3. 先兼容 uni-app x，再考虑 Web 写法

`uni-app x / uvue` 与传统 Web CSS、Vue 模板习惯并不完全一致，开发时需要优先遵守 `uni-app x` 约束。

## 当前已接入的 UI 组件

当前仓库已实际引入一个真实 `uni-ui x` 官方组件：

- `uni_modules/uni-nav-bar-x`

项目内对应桥接方式如下：

- 页面层使用 `components/ui/UiNavBar.uvue`
- 桥接层内部复用真实 `uni-nav-bar`

这种方式可以减少业务页面对第三方组件目录结构的直接耦合，便于后续继续扩展 `uni-ui x` 组件接入范围。

## 开发方式

### 环境要求

- 推荐使用最新版 `HBuilderX`
- 需要本地 `Node.js` 环境以执行 `npm run lint`

### 本地运行

1. 使用 `HBuilderX` 打开项目根目录 `d:\UniAppProject\ZykUniappx`
2. 选择需要运行的平台，例如 Android、iOS、Web 或微信小程序
3. 通过 HBuilderX 编译并预览页面效果

### 代码校验

按当前项目约定，仅执行以下命令进行基础校验：

```bash
npm run lint
```

该命令目前会校验：

- 基础工程文件是否齐全
- `manifest.json` 与 `pages.json` 关键配置是否存在
- 常见 `uvue` 不兼容样式是否被误用

## 已知约束

这是当前项目在 `uni-app x / UTS` 下已经验证过的约束，后续开发请优先遵守：

- `uvue` CSS 不支持 `page` 选择器，必须改用 class 选择器
- `min-height`、`max-width` 等属性对百分比支持有限，优先使用数字或 `px`
- `UTS` 编译器对模板中的复杂对象属性推断不稳定
- 不建议在页面模板中通过 `v-for` 遍历 `any[]` 后继续访问 `item.xxx`
- 路由与静态数据优先使用显式常量，避免 `Any?` 到 `String` 的类型不匹配

## 参考资料

- 页面参考图：`H5/`
- `uni-ui x` 接入说明：`docs/integration/uni-ui-x-manual-integration.md`
- UI 桥接说明：`components/ui/README.md`
- 技术可行性文档：`技术架构.md`
- 项目规则：`.trae/rules/rules.md`

## 后续规划

后续可以继续沿当前工程演进：

- 补充更多真实 `uni-ui x` 基础组件
- 将静态页面逐步接入真实 API
- 补齐 `stores/`、`api/`、`adapters/` 等业务层结构
- 增加 Android、iOS、Web、小程序多端联调验证
