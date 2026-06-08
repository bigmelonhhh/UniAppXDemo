# AI Coding Rules for uni-app x / UTS Project

本项目是 uni-app x 跨端 App 项目，主要使用 uvue + uts 开发。AI 生成、修改、重构代码时必须遵守以下规则。

## 1. 项目技术栈

- 使用 uni-app x，不是传统 uni-app。
- 页面使用 `.uvue`。
- 业务逻辑、工具函数、状态管理、接口封装使用 `.uts`。
- 原生能力扩展优先使用 uts 插件。
- 不允许直接套用传统 uni-app、Vue2、旧 uView、nativeplugins 的写法。

## 2. UTS 强类型规则

- 必须把 uts 当作强类型语言使用。
- 优先使用 `const`，其次使用 `let`。
- 禁止使用 `var`。
- 函数参数必须声明类型。
- 函数返回值必须声明类型。
- 数组必须声明元素类型。
- 业务对象必须定义 `type`。
- 可空字段必须使用 `| null`。
- 不允许依赖 `undefined`。
- 禁止动态扩展普通对象属性。
- 禁止无说明地使用 `any`。

## 3. 页面规则

- `.uvue` 页面中的 `data()` 必须完整初始化。
- 复杂对象和数组必须使用 `as` 声明类型。
- 页面层不得直接解析复杂接口原始数据。
- 页面只使用业务类型，不直接处理 `UTSJSONObject`。

## 4. API 与数据规则

- 页面禁止直接大量调用 `uni.request`。
- 所有接口必须通过 `api/request.uts` 统一封装。
- 接口返回值必须定义明确类型。
- 原始接口数据必须经过 `adapters/*Adapter.uts` 转换。
- 禁止接口函数返回 `Promise<any>`。
- 后端字段差异必须在 adapter 层处理，不得扩散到页面。

## 5. 跨端规则

- 跨端代码必须遵循“先定义，后使用”。
- 禁止依赖变量提升和函数提升。
- 平台差异必须使用条件编译或 `platform/` 层隔离。
- 不允许在页面中散落 Android、iOS、Web、小程序判断。

## 6. 插件规则

- 涉及扫码、定位、蓝牙、推送、支付、地图、相机、相册、文件、第三方 SDK 时，必须先确认 uni-app x 兼容性。
- 优先使用 uts 插件。
- 禁止未经验证直接引入传统 uni-app 原生插件。

## 7. 生成代码前要求

生成或修改代码前，先判断任务类型，并读取对应规则：

- 写 UTS 工具函数：读取 `docs/ai-rules/01-uts-style.md`
- 写 uvue 页面：读取 `docs/ai-rules/02-uvue-page.md`
- 写接口或数据模型：读取 `docs/ai-rules/03-api-adapter.md`
- 写平台差异逻辑：读取 `docs/ai-rules/04-platform.md`
- 写原生能力或插件：读取 `docs/ai-rules/05-plugin.md`
- 写 UI 组件：读取 `docs/ai-rules/06-ui-component.md`
- 提交前自检：读取 `docs/ai-rules/99-review.md`

## 8. 绝对禁止

以下代码不得生成：

```ts
var name = 'test'
let list = []
let obj = {}
obj.name = 'test'
function getUser(data) {}
function getUser(): Promise<any> {}
let user = undefined