---
alwaysApply: false
---

---

# 四、子规则拆分建议

## 1. `01-uts-style.md`

放基础语法和类型规则。

```md
# UTS Style Rules

## 必须

- 使用 `const` / `let`。
- 禁止 `var`。
- 函数参数必须声明类型。
- 函数返回值必须声明类型。
- 数组必须声明元素类型。
- 对象必须定义 type。
- 可空字段使用 `| null`。
- 默认空值使用 `null`。
- 公共方法禁止返回 `any`。

## 禁止示例

```ts
let list = []
let user
let obj = {}
obj.name = 'Tom'
function format(data) {
  return data.name
}

## 推荐示例
type UserInfo = {
  id: string
  name: string
  avatar: string | null
}

const DEFAULT_PAGE_SIZE: number = 20
let userList: Array<UserInfo> = []
let currentUser: UserInfo | null = null

function getUserName(user: UserInfo): string {
  return user.name
}