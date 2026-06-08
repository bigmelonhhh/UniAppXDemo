---
alwaysApply: false
---

---

## 6. `06-ui-component.md`

放 UI 和组件规则。

```md
# UI Component Rules

## 强制规则

- 优先使用 uni-app x 内置组件。
- 优先使用官方 uni-ui x。
- 第三方 UI 组件必须验证 uni-app x 兼容性。
- 业务组件必须声明 props 类型。
- 组件事件参数必须声明类型。
- 禁止组件内部直接请求接口，除非是明确的业务容器组件。

## 推荐结构

```text
components/
├─ BaseButton.uvue
├─ BaseInput.uvue
├─ BaseCard.uvue
├─ BasePopup.uvue
├─ EmptyView.uvue
└─ LoadingView.uvue
```

## 推荐 props 类型
type UserCardProps = {
  user: UserInfo
  showPhone: boolean
}