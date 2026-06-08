# AGENTS.md — ZykUniappx（智医康）项目编码指南

## 项目概述

基于 **uni-app x** 的跨端医疗健康 App，目标平台为 Android App。使用 uvue（页面）+ uts（逻辑）+ SCSS（变量）开发，编译目标为 Kotlin（Android）。

---

## 1. 项目结构与模块组织

```
├── App.uvue                 # 应用根组件 + 全局 CSS 工具类
├── main.uts                 # 应用入口，createSSRApp(App)
├── manifest.json            # 应用清单（需包含 "uni-app-x": {}、"vueVersion": "3"）
├── pages.json               # 页面路由注册和导航栏配置
├── platformConfig.json      # 编译目标（当前仅 APP-ANDROID）
├── uni.scss                 # 全局 SCSS 变量（官方变量 + 项目语义变量）
├── index.html               # H5 入口
├── package.json             # npm 元数据 + `lint` 脚本
│
├── pages/                   # 页面目录（每个页面一个子目录 + index.uvue）
│   ├── index/               # 首页/启始页
│   ├── history/             # 历史对话
│   ├── profile/             # 健康档案
│   ├── settings/            # 系统设置
│   ├── account/             # 账号设置
│   ├── feedback/            # 举报与反馈
│   ├── about/               # 关于我们
│   └── integration/         # 接入准备演示页
│
├── components/ui/           # 桥接组件层（业务页面只引用此目录）
│   ├── UiNavBar.uvue        # 导航栏（桥接到 uni-nav-bar）
│   ├── UiSectionCard.uvue   # 通用卡片容器
│   └── UiEmptyState.uvue    # 空态/占位提示组件
│
├── constants/               # 静态常量与演示数据
│   └── demo-data.uts        # 路由常量 + 所有页面演示数据导出函数
│
├── uni_modules/             # 真实 uni-ui x 插件（通过 HBuilderX 插件市场导入）
│   └── uni-nav-bar-x/       # 官方导航栏组件
│
├── api/                     # 接口封装（未来使用）
├── types/                   # 业务类型定义（未来使用）
├── stores/                  # 状态管理（未来使用）
├── hooks/                   # 组合式 hooks（未来使用）
├── utils/                   # 工具函数（未来使用）
├── layouts/                 # 布局组件（未来使用）
├── static/                  # 静态资源（图片等）
│   └── logo.png
├── scripts/                 # 工程脚本
│   └── lint.mjs            # 自定义工程骨架校验
├── docs/                    # 项目文档
├── .trae/rules/             # AI 编码规则
└── H5/                      # 参考页面截图
```

---

## 2. 构建 / Lint / 测试命令

### Lint（工程校验）

```bash
npm run lint
```

校验内容：必需文件与目录存在 → manifest.json 关键配置 → pages.json 首页路径 → 全部 uvue 文件 CSS 兼容性（禁止 `page` 选择器、百分比 `min-height`/`max-width`/`width`）。

### 构建

该项目使用 HBuilderX IDE 进行编译，无独立前端构建工具链（无 vite/webpack/tsconfig）。构建通过 HBuilderX 的「运行到手机或模拟器」菜单完成。

若要命令行编译（需安装 HBuilderX CLI）：

```bash
"D:\HBuilderX\cli.exe" open --project . --target APP-ANDROID
```

### 测试

当前项目**未建立自动化测试体系**。不涉及测试文件。

---

## 3. 代码风格与协作规则

### 3.1 语言与框架约束

- **页面**必须使用 `.uvue` 文件，**逻辑**必须使用 `.uts` 文件。
- 使用 Vue 3，禁止引入 Vue 2 或 Options API 的旧写法（页面推荐 `<script setup lang="uts">`，组件可使用 Options API）。
- **禁止**直接套用传统 uni-app、uView、nativeplugins 的写法。
- 原生能力扩展优先使用 uts 插件，**禁止未经验证直接引入传统 uni-app 原生插件**。

### 3.2 UTS 强类型规则

- 使用 `const`/`let`，**禁止 `var`**。
- 函数参数和返回值**必须**声明类型。
- 数组**必须**声明元素类型（`[] as Array<T>` 或 `Array<T>`）。
- 业务对象**必须**定义 `type`（使用 `type` 关键字而非 `interface`）。
- 可空字段使用 `| null`，默认空值使用 `null`（**禁止**依赖 `undefined`）。
- **禁止** `Promise<any>`、无说明的 `any`、动态扩展普通对象属性。

```uts
// 推荐
type UserInfo = { id: string; name: string; avatar: string | null }
const DEFAULT_PAGE_SIZE: number = 20
let userList: Array<UserInfo> = []
let currentUser: UserInfo | null = null
function getUserName(user: UserInfo): string { return user.name }

// 禁止
let list = []
let user
let obj = {}
obj.name = 'Tom'
function format(data) { return data.name }
```

### 3.3 页面规则

- `data()` 必须完整初始化。
- 数组使用 `[] as Array<T>`，对象使用 `{} as T` 或完整字段初始化。
- 可空对象使用 `null as T | null`。
- 页面层**不得直接解析 `UTSJSONObject`**，只使用业务类型。

```uts
// 推荐
data() {
  return {
    loading: false,
    keyword: '',
    user: null as UserInfo | null,
    list: [] as Array<UserInfo>
  }
}

// 禁止
data() { return { list: [], user, total } }
```

### 3.4 API 与数据规则

- 页面**禁止直接调用 `uni.request`**，所有接口通过 `api/` 层统一封装。
- 接口返回值**必须**定义明确类型。
- 原始数据**必须**经过 `adapters/*Adapter.uts` 转换为业务类型，后端字段差异只在 adapter 层处理。
- API 函数签名示例：`export function getUserInfo(userId: string): Promise<UserInfo>`

### 3.5 跨端规则

- 跨端代码**必须先定义后使用**（禁止依赖变量提升和函数提升）。
- 平台差异使用条件编译（`#ifdef APP-ANDROID` / `#ifdef APP-IOS` / `#ifdef WEB` / `#ifdef MP-WEIXIN`）或 `platform/` 层隔离。
- **不允许**在页面中散落平台判断。

### 3.6 CSS / 样式规则

- **仅支持 class 选择器**（禁止子选择器、通配符、标签选择器、后代选择器嵌套）。
- `flex-direction` **必须显式声明**（uni-app x 默认 `column`，非 Web 默认的 `row`）。
- **禁止**：`page` 选择器、百分比 `min-height`/`max-width`/`width`、`sticky` 定位。
- 全局样式类定义在 `App.uvue` 的 `<style>` 块中，使用 BEM 命名约定，颜色体系统一：
  - 品牌色 `#2f80ed` / `#00b7a5`、文字色 `#183b4d` / `#607282`、边框 `#edf1f4`、背景 `#eef5f3`
- 变量定义在 `uni.scss`，项目语义变量以 `$app-` 前缀。

### 3.7 组件规则

- 业务页面**只引用 `components/ui/*`**，不直接引用 `uni_modules/*`。
- `components/ui/` 作为桥接层：内部可封装真实 uni-ui x 组件，页面层隔离变化。
- 组件 **props 类型必须声明**，组件内**禁止直接请求接口**（除非是明确的业务容器组件）。
- 组件可混用 Options API（`export default { props: {...} }`）和 Composition API（`<script setup lang="uts">` + `defineProps`）。

### 3.8 Imports 与命名规范

- 相对路径导入：`import X from '../../constants/demo-data.uts'`
- easycom 自动注册组件无需手动 import（如 `uni-nav-bar`）。
- 路由常量集中在 `constants/demo-data.uts`，以 `ROUTE_` 前缀导出。
- 组件类名使用 `ui-` 前缀（BEM），页面类名使用功能前缀（如 `home-`、`history-`）。
- 全局工具类使用 `app-` 前缀（如 `app-screen`、`app-card`、`app-row`）。

### 3.9 错误处理

- async 方法使用 `try/finally` 模式确保 loading 状态正确。
- 页面内关键操作应有异常处理，避免静默失败。

### 3.10 提交前自检清单

```
[ ] 是否使用了 var
[ ] 函数参数/返回值是否全部声明类型
[ ] 是否存在未说明原因的 any 或 undefined
[ ] 页面 data 是否完整初始化
[ ] 数组是否声明元素类型
[ ] 页面是否直接解析 UTSJSONObject
[ ] 是否存在动态扩展普通对象属性
[ ] 平台差异是否集中隔离
[ ] CSS 是否仅使用了 class 选择器
[ ] flex-direction 是否显式声明
[ ] npm run lint 是否通过
```

---

## 4. 关键约束速查

| 类别 | 禁止 | 必须 |
|------|------|------|
| 变量 | `var`、`undefined` | `const`/`let`、`null` |
| 类型 | `any`（无说明）、`Promise<any>` | 明确类型声明 |
| 页面 | 直接解析 `UTSJSONObject`、直接调 `uni.request` | data 完整初始化 |
| CSS | `page` 选择器、百分比宽高、子选择器 | class 选择器 + 显式 flex-direction |
| 组件 | 页面直接引用 `uni_modules/*` | 通过 `components/ui/*` 桥接 |
| 插件 | 直接引入传统 uni-app 原生插件 | uts 插件 + 兼容性验证 |
| 跨端 | 散落平台判断、变量提升依赖 | 条件编译 / platform 层 |
