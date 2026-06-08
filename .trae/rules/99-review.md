---
alwaysApply: false
---

---

## 7. `99-review.md`

放 Code Review 检查清单。

```md
# UTS Code Review Checklist

提交前必须检查：

```text
[ ] 是否使用了 var
[ ] 函数参数是否全部声明类型
[ ] 函数返回值是否全部声明类型
[ ] 是否存在未说明原因的 any
[ ] 是否存在 undefined 默认值
[ ] 页面 data 是否完整初始化
[ ] 数组是否声明元素类型
[ ] 接口返回值是否经过 adapter 转换
[ ] 页面是否直接解析 UTSJSONObject
[ ] 是否存在动态扩展普通对象属性
[ ] 是否存在跨端变量提升依赖
[ ] 平台差异是否集中隔离
[ ] 是否引入未经验证的传统 uni-app 插件
[ ] 是否新增了必要的 type 定义
[ ] 是否破坏统一 request 封装
```