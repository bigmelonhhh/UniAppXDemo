---
alwaysApply: false
---

---

## 4. `04-platform.md`

放跨端隔离规则。

```md
# Platform Rules

## 强制规则

- 平台差异必须集中处理。
- 不允许在页面里散落平台判断。
- Android、iOS、Web、小程序差异必须通过条件编译或 `platform/` 层封装。
- 跨端代码必须先定义后使用。
- 禁止依赖变量提升。

## 推荐目录

```text
platform/
├─ index.uts
├─ android.uts
├─ ios.uts
└─ web.uts
```

## 推荐条件编译
// #ifdef APP-ANDROID
// Android logic
// #endif

// #ifdef APP-IOS
// iOS logic
// #endif

// #ifdef WEB
// Web logic
// #endif

// #ifdef MP-WEIXIN
// WeChat Mini Program logic
// #endif