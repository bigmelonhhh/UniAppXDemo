# Task3 Task4 Static Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 基于 `H5` 参考图补齐首批静态页面、页面路由跳转和集中管理的静态演示数据，并保持首页为 `pages/index/index`。

**Architecture:** 采用“集中静态数据 + 统一页面视觉基础 + 分页静态页面”方案。所有展示文案、列表项和跳转目标统一沉淀到 `constants/demo-data.uts`，页面层只负责消费数据与声明式跳转，避免硬编码散落在模板中。

**Tech Stack:** uni-app x、uvue、uts、pages.json、项目内 `components/ui/*` 基础桥接组件

---

### Task 1: 建立静态数据与路由常量

**Files:**
- Create: `d:\UniAppProject\ZykUniappx\constants\demo-data.uts`

- [ ] **Step 1: 定义页面路由常量与各页静态数据**
- [ ] **Step 2: 为导出函数补充完整注释说明**

### Task 2: 统一页面视觉基础

**Files:**
- Modify: `d:\UniAppProject\ZykUniappx\App.uvue`

- [ ] **Step 1: 补充通用页面背景、卡片、按钮、标签和列表行样式**
- [ ] **Step 2: 保持现有基础样式兼容**

### Task 3: 实现首页与历史页

**Files:**
- Modify: `d:\UniAppProject\ZykUniappx\pages\index\index.uvue`
- Create: `d:\UniAppProject\ZykUniappx\pages\history\index.uvue`

- [ ] **Step 1: 首页实现对话场景、消息区、快捷入口和输入栏占位**
- [ ] **Step 2: 历史页实现新建对话入口与历史列表**

### Task 4: 实现健康档案与设置相关页面

**Files:**
- Create: `d:\UniAppProject\ZykUniappx\pages\profile\index.uvue`
- Create: `d:\UniAppProject\ZykUniappx\pages\settings\index.uvue`
- Create: `d:\UniAppProject\ZykUniappx\pages\account\index.uvue`
- Create: `d:\UniAppProject\ZykUniappx\pages\feedback\index.uvue`
- Create: `d:\UniAppProject\ZykUniappx\pages\about\index.uvue`

- [ ] **Step 1: 健康档案页实现人物摘要和快捷入口**
- [ ] **Step 2: 系统设置页实现导航列表**
- [ ] **Step 3: 账号设置、举报反馈、关于我们页实现静态展示内容**

### Task 5: 注册路由并完成校验

**Files:**
- Modify: `d:\UniAppProject\ZykUniappx\pages.json`

- [ ] **Step 1: 注册全部首批页面并保持首页为 `pages/index/index`**
- [ ] **Step 2: 执行 `npm run lint` 并记录结果**
