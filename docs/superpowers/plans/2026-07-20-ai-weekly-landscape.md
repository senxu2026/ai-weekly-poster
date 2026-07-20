# AI 信息周报横版看板实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 2026-07-20 AI 信息周报重排为 1920px 基准的四列横版看板，完整保留全部文字，并在页头、页脚使用真实“森旭服务”Logo。

**Architecture:** 继续使用单页静态 HTML 与内嵌 CSS；新增一个项目内 PNG 素材，通过 CSS Grid 在桌面端形成四列拼贴，在中屏降为两列，在手机端降为单列。使用 Node 回归脚本验证内容数量、Logo 引用与关键响应式规则，再用真实浏览器截图验证布局和资源加载。

**Tech Stack:** HTML5、CSS Grid、Node.js 内置 `assert/fs`、Playwright CLI、PNG。

## Global Constraints

- 四个指标、三条主线、九个栏目、37 条信息、两个产研视角、来源与免责声明全部保留。
- Logo 必须使用 `object-fit: contain`，不得拉伸或裁切。
- 桌面四列、中屏两列、手机单列；正文不得横向滚动。
- 不引入前端框架、构建工具或外部字体依赖。

---

### Task 1: 建立横版结构回归检查

**Files:**
- Create/Test: `ai-weekly-landscape.test.js`

**Interfaces:**
- Consumes: `ai_weekly_poster_2026-07-20.html`、`assets/senxu-service-logo.png`
- Produces: 退出码 0 表示内容数量、Logo 和响应式结构满足要求

- [ ] **Step 1: 写入当前应失败的结构测试**

```js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const html = fs.readFileSync('ai_weekly_poster_2026-07-20.html', 'utf8');
const logo = 'assets/senxu-service-logo.png';
assert.equal((html.match(/<section class="card/g) || []).length, 9);
assert.equal((html.match(/class="item"/g) || []).length, 37);
assert.equal((html.match(/<div class="stat"/g) || []).length, 4);
assert.equal((html.match(/<li>/g) || []).length, 3);
assert.equal((html.match(/class="brand-logo"/g) || []).length, 2);
assert.match(html, /grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
assert.match(html, /\.card\.wide\{grid-column:span 2\}/);
assert.match(html, /@media\(max-width:1180px\)/);
assert.match(html, /@media\(max-width:680px\)/);
assert.ok(fs.existsSync(logo));
assert.equal(fs.readFileSync(logo).subarray(1, 4).toString(), 'PNG');
console.log('PASS: landscape structure and content invariants');
```

- [ ] **Step 2: 运行失败测试**

Run: `node ai-weekly-landscape.test.js`

Expected: FAIL，报告真实 Logo 或四列结构尚不存在。

---

### Task 2: 加入 Logo 并完成四列横版布局

**Files:**
- Create: `assets/senxu-service-logo.png`
- Modify: `ai_weekly_poster_2026-07-20.html:8-28,33-38,74-98,123-124`

**Interfaces:**
- Consumes: `/var/folders/sl/nkk9mf9d3b913zpfm1v5xmg80000gn/T/codex-clipboard-6f03ce31-55a1-427b-ba8e-26898d5d5b4d.png`
- Produces: 两个真实 Logo、桌面四列、中屏两列、手机单列布局

- [ ] **Step 1: 复制 Logo 并核对 4096×1373 尺寸**

```bash
mkdir -p assets
cp '/var/folders/sl/nkk9mf9d3b913zpfm1v5xmg80000gn/T/codex-clipboard-6f03ce31-55a1-427b-ba8e-26898d5d5b4d.png' assets/senxu-service-logo.png
sips -g pixelWidth -g pixelHeight assets/senxu-service-logo.png
```

- [ ] **Step 2: 页头替换为真实 Logo + 标题信息**

```html
<header class="hd">
  <div class="brand-panel"><img class="brand-logo" src="assets/senxu-service-logo.png" alt="森旭服务"></div>
  <div class="headline">
    <div class="kicker"><span class="dot"></span><span>R&amp;D INTELLIGENCE BRIEFING · 周刊</span></div>
    <h1 class="title">森旭产研 · <em>AI情报周报</em></h1>
    <div class="sub"><div class="en">Agent · LLM · Compute · Physical AI · Power-Compute Synergy</div><div class="daterange"><div class="lbl">本期覆盖 / COVERAGE</div><div class="val">2026.07.14 — 07.20</div></div></div>
  </div>
</header>
```

- [ ] **Step 3: 应用四列方块化关键 CSS**

```css
.wrap{position:relative;z-index:2;width:min(1920px,100%);margin:0 auto;padding:24px clamp(20px,2.8vw,52px) 34px}
.hd{display:grid;grid-template-columns:minmax(260px,420px) 1fr;align-items:center;gap:36px;padding:24px 0 26px;border-bottom:1px solid var(--line)}
.brand-panel{height:132px;display:flex;align-items:center;padding:16px 22px;background:rgba(255,255,255,.72);border:1px solid var(--line);border-radius:12px;box-shadow:var(--shadow)}
.brand-logo{display:block;width:100%;height:100%;object-fit:contain}
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:18px 0}
.lead ol{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;align-items:start}
.card.wide{grid-column:span 2}
.twocol{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px 20px}
@media(max-width:1180px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.card.wide{grid-column:span 2}.hd{grid-template-columns:280px 1fr}.lead ol{grid-template-columns:1fr}.stats{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:680px){.hd{grid-template-columns:1fr}.grid,.stats{grid-template-columns:1fr}.card.wide{grid-column:span 1}.twocol{grid-template-columns:1fr}.sub{flex-direction:column;align-items:flex-start}.daterange{text-align:left}}
```

- [ ] **Step 4: 三个重点栏目改为跨两列**

```html
<section class="card wide">
<section class="card wide hot">
<section class="card wide hot">
```

- [ ] **Step 5: 页脚替换为真实 Logo**

```html
<footer class="ft"><div class="brand"><div class="footer-logo"><img class="brand-logo" src="assets/senxu-service-logo.png" alt="森旭服务"></div><div class="bn">产研 · AI 情报周报<small>SENXU R&amp;D · WEEKLY AI BRIEFING</small></div></div><div class="note">信息来源：OpenAI / Anthropic / Google / NVIDIA / 中国网信网 / 新华社 / 上海市政府 / 美联社 / Pure DC / Kimi 等公开信息<br>仅供产研线内部参考 · 数据截至 2026.07.20</div></footer>
```

- [ ] **Step 6: 运行结构测试**

Run: `node ai-weekly-landscape.test.js`

Expected: `PASS: landscape structure and content invariants`。

---

### Task 3: 浏览器渲染与视觉验收

**Files:**
- Create: `output/playwright/ai-weekly-landscape/AI信息周报_2026-07-20_横版长图.png`
- Test: `ai-weekly-landscape.test.js`

**Interfaces:**
- Consumes: 修改后的 HTML 与 Logo
- Produces: 桌面横版截图、移动端无溢出证据和最终高度

- [ ] **Step 1: 以 1920×1080 打开页面并检查结构**

```bash
python3 -m http.server 8765 --bind 127.0.0.1
playwright-cli --session aiweekly-landscape open http://127.0.0.1:8765/ai_weekly_poster_2026-07-20.html
playwright-cli --session aiweekly-landscape resize 1920 1080
playwright-cli --session aiweekly-landscape snapshot
```

- [ ] **Step 2: 检查桌面指标并导出完整长图**

```js
async (page) => {
  const metrics = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    cards: document.querySelectorAll('.card').length,
    logos: document.querySelectorAll('.brand-logo').length,
    overflow: document.documentElement.scrollWidth > innerWidth
  }));
  console.log(metrics);
  await page.screenshot({path:'AI信息周报_2026-07-20_横版长图.png',fullPage:true});
}
```

Expected: `width: 1920`、`cards: 9`、`logos: 2`、`overflow: false`，高度显著低于旧版 4231px。

- [ ] **Step 3: 以 390×844 检查手机端无横向溢出**

```js
async (page) => {
  await page.setViewportSize({width:390,height:844});
  const result = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    cards: document.querySelectorAll('.card').length,
    overflow: document.documentElement.scrollWidth > innerWidth
  }));
  console.log(result);
}
```

Expected: `width: 390`、`cards: 9`、`overflow: false`。

- [ ] **Step 4: 最终回归检查**

```bash
node ai-weekly-landscape.test.js
git diff --check
git status --short -- ai_weekly_poster_2026-07-20.html assets/senxu-service-logo.png ai-weekly-landscape.test.js
```

Expected: 测试通过、diff 无空白错误、状态只包含本任务文件。
