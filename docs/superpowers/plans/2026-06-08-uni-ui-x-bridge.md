# uni-ui x Bridge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不伪造真实 `uni-ui x` 组件包的前提下，为当前 `uni-app x` 仓库建立可落地的手动导入桥接层与占位结构。

**Architecture:** 通过“文档说明 + 组件桥接层 + 占位实现 + 演示入口”四部分完成接入准备。业务代码仅依赖仓库内桥接组件，不直接依赖未来由 HBuilderX 导入的真实 `uni_modules` 路径，从而保证后续真实接入时改动面可控。

**Tech Stack:** uni-app x、uvue、uts、SCSS、HBuilderX 插件市场导入模式

---

### Task 1: 建立接入文档与目录约定

**Files:**
- Create: `d:\UniAppProject\ZykUniappx\docs\integration\uni-ui-x-manual-integration.md`
- Create: `d:\UniAppProject\ZykUniappx\docs\superpowers\specs\2026-06-08-uni-ui-x-bridge-design.md`

- [ ] **Step 1: 写入接入说明文档**

```md
# uni-ui x 手动接入说明

- 当前仓库未实际导入 `uni-ui x`
- 推荐通过 HBuilderX 插件市场导入到 `uni_modules`
- 业务层统一走 `components/ui/*` 桥接组件
```

- [ ] **Step 2: 校对说明边界**

Run: 手工检查文档是否明确写明“未真实接入”“不伪造组件包”
Expected: 文档边界清晰，无“已安装”“已导入真实组件”等误导性描述

### Task 2: 建立基础桥接组件

**Files:**
- Create: `d:\UniAppProject\ZykUniappx\components\ui\UiNavBar.uvue`
- Create: `d:\UniAppProject\ZykUniappx\components\ui\UiSectionCard.uvue`
- Create: `d:\UniAppProject\ZykUniappx\components\ui\UiEmptyState.uvue`

- [ ] **Step 1: 创建 `UiNavBar` 占位桥接组件**

```vue
<template>
  <view class="ui-nav-bar">
    <text class="ui-nav-bar__title">{{ title }}</text>
  </view>
</template>
```

- [ ] **Step 2: 创建 `UiSectionCard` 占位桥接组件**

```vue
<template>
  <view class="ui-section-card">
    <slot />
  </view>
</template>
```

- [ ] **Step 3: 创建 `UiEmptyState` 占位桥接组件**

```vue
<template>
  <view class="ui-empty-state">
    <text>{{ title }}</text>
    <text>{{ description }}</text>
  </view>
</template>
```

### Task 3: 创建接入准备演示页

**Files:**
- Create: `d:\UniAppProject\ZykUniappx\pages\integration\uni-ui-x-ready.uvue`
- Modify: `d:\UniAppProject\ZykUniappx\pages.json`

- [ ] **Step 1: 新建演示页**

```vue
<template>
  <view>
    <UiNavBar title="uni-ui x 接入准备" />
    <UiSectionCard>
      <UiEmptyState title="尚未导入真实组件" description="请通过 HBuilderX 手动导入" />
    </UiSectionCard>
  </view>
</template>
```

- [ ] **Step 2: 注册演示页路由**

```json
{
  "path": "pages/integration/uni-ui-x-ready",
  "style": {
    "navigationBarTitleText": "uni-ui x 接入准备"
  }
}
```

### Task 4: 将首页改为接入准备入口

**Files:**
- Modify: `d:\UniAppProject\ZykUniappx\pages\index\index.uvue`
- Modify: `d:\UniAppProject\ZykUniappx\uni.scss`

- [ ] **Step 1: 首页展示当前接入状态和入口说明**

```vue
<template>
  <view>
    <text>当前未真实导入 uni-ui x</text>
    <button @click="goToReadyPage">查看接入准备页</button>
  </view>
</template>
```

- [ ] **Step 2: 补充最小主题变量**

```scss
$app-page-bg: #f5f7fb;
$app-card-bg: #ffffff;
```

### Task 5: 基础验证

**Files:**
- Verify: `d:\UniAppProject\ZykUniappx\pages\index\index.uvue`
- Verify: `d:\UniAppProject\ZykUniappx\pages\integration\uni-ui-x-ready.uvue`
- Verify: `d:\UniAppProject\ZykUniappx\docs\integration\uni-ui-x-manual-integration.md`

- [ ] **Step 1: 检查最近修改文件诊断**

Run: 获取 VS Code diagnostics
Expected: 最近修改文件无明显语法错误

- [ ] **Step 2: 执行 `npm run lint` 可行性检查**

Run: `npm run lint`
Expected: 若仓库缺少 `package.json`，则明确记录为工程阻塞点，而不是伪造脚本
