# uni_modules 接入说明

当前仓库已真实导入官方 `uni-ui x` 组件 `uni-nav-bar-x`，并保留 `uni_modules/` 作为后续真实组件的统一落位目录。

## 当前来源

- 本次已引入：`uni_modules/uni-nav-bar-x/`
- 来源：官方开源仓库 `https://gitcode.com/dcloud/uni-ui-x/tree/alpha`

## 推荐来源

后续新增真实 `uni-ui x` 组件，优先继续通过官方插件市场或官方开源仓库同步到该目录。

## 当前约定

- 保留该目录用于存放真实官方组件
- 不手工编造不存在的 `uni-ui x` 组件实现
- 业务代码不直接引用该目录下未来可能变化的具体路径
- 桥接层统一收口在 `components/ui/*`
