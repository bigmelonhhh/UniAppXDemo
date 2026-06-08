---
alwaysApply: false
---

---

## 3. `03-api-adapter.md`

这是非常重要的子规则，建议写得最细。

```md
# API and Adapter Rules

## 目录规范

```text
api/
├─ request.uts
├─ user.uts
└─ common.uts

adapters/
├─ userAdapter.uts
└─ commonAdapter.uts

types/
├─ response.uts
├─ user.uts
└─ common.uts
```

## 强制规则
页面不得直接调用 uni.request。
页面不得直接解析 UTSJSONObject。
API 函数不得返回 Promise<any>。
每个接口必须有明确返回类型。
原始数据必须在 adapter 层转换为业务类型。
后端字段名变化只允许影响 adapter，不允许影响页面。

## 推荐接口写法
export function getUserInfo(userId: string): Promise<UserInfo> {
  return request<UserInfo>({
    url: '/api/user/detail',
    method: 'GET',
    data: {
      userId
    }
  })
}
## 推荐 adapter 写法
export function parseUserInfo(data: UTSJSONObject): UserInfo {
  return {
    id: data.get('id') as string,
    name: data.get('name') as string,
    avatar: data.get('avatar') as string | null
  }
}