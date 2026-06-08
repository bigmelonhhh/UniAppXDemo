# components/ui 组件桥接说明

## 目标

`components/ui` 用于沉淀项目对外可复用的基础 UI 组件，并作为项目接入真实 `uni-ui x` 组件的统一桥接层。

业务页面应优先依赖这里的组件，而不是直接引用未来由 HBuilderX 导入的 `uni_modules/*` 实际路径。

## 首批公共基础组件

- `UiNavBar.uvue`
  - 页面顶部标题区桥接组件
  - 当前已对接真实 `uni-nav-bar`
- `UiSectionCard.uvue`
  - 通用卡片容器
  - 当前保持项目自研，不强制映射到某个 `uni-ui x` 组件
- `UiEmptyState.uvue`
  - 通用空态与准备态提示组件
  - 当前保持项目自研，可按业务需要与真实组件能力组合使用

## 使用约定

- 页面层只引用 `components/ui/*`
- 优先在桥接组件内部复用真实 `uni-ui x` 组件
- 若某个基础结构没有明显收益，不强制替换为 `uni-ui x`
- 不在当前目录伪造任何第三方组件源码

## 后续接入建议

1. 保持业务页面优先依赖桥接层
2. 新增真实 `uni-ui x` 组件时优先落在根目录 `uni_modules/`
3. 继续沿用 `UiNavBar` 到 `uni-nav-bar` 的桥接替换模式
4. 再按业务收益决定是否继续扩展桥接范围
