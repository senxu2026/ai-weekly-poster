# AI 情报周报封面页 · 设计说明

## 概述
为 AI 情报周报创建一个 HTML 封面页，作为 GitHub Pages 的 Landing 入口页。

## 设计决策
- **方案**：居中 Hero 大封面（方案 A）
- **风格**：与现有周报海报同源的浅色科技风
- **内容**：简洁封面 —— 标题、日期、三条主线摘要 + 入口按钮

## 布局
```
[几何 SVG 装饰背景]
  ● R&D INTELLIGENCE BRIEFING
  森旭产研 · AI情报周报（大字衬线蓝青渐变）
  Agent · LLM · Compute · RAG · Power-Compute Synergy
  2026.07.06 — 07.13
  ┌─ 三条主线 ─┐
  │ ❶ ❷ ❸     │
  └────────────┘
  [ 查看完整周报 → ]
  森旭服务 · 产研 AI 情报周报
```

## 技术要点
- 单文件 HTML，内嵌 CSS
- 沿用原周报的 CSS 变量（--bg, --blue, --cyan, --teal, --ink 等）
- 字体栈：Songti SC / PingFang SC / Microsoft YaHei / Rajdhani
- 背景：浅色网格纹理 + radial-gradient 光晕
- 入口按钮链接到 ai_weekly_poster_2026-07-13_light.html
- 响应式，移动端适配
