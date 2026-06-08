# uni-ui x 接入说明

## 当前状态

- 当前仓库已实际导入一个真实 `uni-ui x` 官方组件：`uni-nav-bar-x`
- 组件源码来自官方开源仓库 `https://gitcode.com/dcloud/uni-ui-x/tree/alpha`
- 真实组件已落入项目根目录 `uni_modules/uni-nav-bar-x/`
- 仓库内保留 `components/ui/*` 桥接层，业务页面继续通过桥接层复用真实组件
- 保留了 `pages/integration/uni-ui-x-ready.uvue` 作为接入状态说明页

## 为什么当前不直接使用 npm

当前项目虽然已有基础 `package.json`，但这只用于仓库脚本管理，不代表 `uni-ui x` 应改为 npm 接入。根据官方接入模式，`uni-ui x` 面向 `uni-app x` 的推荐方式仍然是通过 HBuilderX 插件市场导入到项目根目录的 `uni_modules` 中。本次修复选择了官方开源仓库中的真实源码做最小落地，而不是伪造 npm 安装结果。

## 本次接入结果

### 已引入组件

- `uni-nav-bar-x`

### 实际复用位置

- `components/ui/UiNavBar.uvue` 内部已切换为真实 `uni-nav-bar`
- `pages/about/index.uvue`
- `pages/account/index.uvue`
- `pages/feedback/index.uvue`
- `pages/history/index.uvue`
- `pages/profile/index.uvue`
- `pages/settings/index.uvue`
- `pages/integration/uni-ui-x-ready.uvue`

## 推荐扩展方式

### 方式一：导入 `uni-ui x` 套装

适合需要一次性评估多个组件的阶段。

### 方式二：按需导入单组件

适合先验证关键基础能力，例如：

- `uni-nav-bar`
- `uni-link`
- `uni-rate`
- `uni-number-box`

## 建议操作步骤

1. 使用 HBuilderX 打开当前项目根目录
2. 进入插件市场搜索 `uni-ui x`
3. 后续按需继续导入套装或单组件
4. 确认新增组件仍落在根目录 `uni_modules/`
5. 优先验证 `uni-link`、`uni-rate`、`uni-number-box` 等低风险组件
6. 延续“桥接层内替换，业务页面不直接依赖插件路径”的策略

## 首批桥接组件沉淀

当前仓库已经沉淀首批公共基础组件，统一放在 `components/ui/` 下：

- `UiNavBar.uvue`
- `UiSectionCard.uvue`
- `UiEmptyState.uvue`

这三个组件承担的角色分别是：

- 页面顶部标题区桥接
- 轻量区块卡片容器
- 通用空态与接入准备态提示

当前已在 `UiNavBar` 内部完成首次真实替换，其余组件后续也应优先沿用该策略，而不是直接修改业务页面引用。

## 仓库内桥接约定

### 对业务层

业务页面优先引用仓库内桥接组件，而不是直接引用未来真实插件路径：

- `components/ui/UiNavBar.uvue`
- `components/ui/UiSectionCard.uvue`
- `components/ui/UiEmptyState.uvue`

### 对接入层

当前已在桥接组件内部完成第一次替换：`UiNavBar` -> `uni-nav-bar`。后续新增真实组件时，也应优先在桥接组件内部完成替换，而不是直接在业务页面中大面积替换引用。

## 后续替换建议

### 第一批已完成

- `UiNavBar` -> `uni-nav-bar`

### 第二批按实际需求评估

- 列表、评分、链接、数字输入等基础组件

### 保持自研更合适的部分

对于卡片容器、业务空态、页面段落说明等轻量结构，优先保留项目自研桥接组件，不强行替换为 `uni-ui x`，避免为了接入而接入。

## 注意事项

- 不要手工编造不存在的第三方组件实现
- 不要在业务页面里直接写死未来插件路径
- 当前仓库已真实导入 `uni-nav-bar-x`，后续新增组件应继续使用官方来源
- 当前存在 `package.json` 也不意味着 `uni-ui x` 应改为 npm 接入
