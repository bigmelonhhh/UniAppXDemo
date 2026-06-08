---
alwaysApply: false
---

---

## 2. `02-uvue-page.md`

放页面写法规则。

```md
# uvue Page Rules

## 页面 data 规则

- `data()` 必须完整初始化。
- 数组使用 `[] as Array<T>`。
- 对象使用 `{} as T` 或初始化完整字段。
- 可空对象使用 `null as T | null`。
- 页面不得直接解析 `UTSJSONObject`。

## 推荐模板

```ts
export default {
  data() {
    return {
      loading: false,
      keyword: '',
      user: null as UserInfo | null,
      list: [] as Array<UserInfo>,
      pageNo: 1 as number,
      pageSize: 20 as number
    }
  },

  methods: {
    async loadData(): Promise<void> {
      this.loading = true

      try {
        const list = await getUserList()
        this.list = list
      } finally {
        this.loading = false
      }
    }
  }
}
## 禁止
data() {
  return {
    list: [],
    user,
    total
  }
}