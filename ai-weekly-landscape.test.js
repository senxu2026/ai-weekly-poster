const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('ai_weekly_poster_2026-07-20.html', 'utf8');
const logo = 'assets/senxu-service-logo.png';

assert.equal((html.match(/<section class="card/g) || []).length, 9, '应保留 9 个栏目');
assert.equal((html.match(/class="item"/g) || []).length, 37, '应保留 37 条信息');
assert.equal((html.match(/<div class="stat"/g) || []).length, 4, '应保留 4 个指标');
assert.equal((html.match(/<li>/g) || []).length, 3, '应保留 3 条主线');
assert.equal((html.match(/class="brand-logo"/g) || []).length, 2, '页头和页脚应各有一个真实 Logo');
assert.match(html, /grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/, '桌面端应为四列');
assert.match(html, /\.card\.wide\{grid-column:span 2\}/, '重点卡片应跨两列');
assert.match(html, /@media\(max-width:1180px\)/, '应提供中屏两列断点');
assert.match(html, /@media\(max-width:680px\)/, '应提供手机单列断点');
assert.ok(fs.existsSync(logo), 'Logo 素材应复制到 assets 目录');
assert.equal(fs.readFileSync(logo).subarray(1, 4).toString(), 'PNG', 'Logo 必须为 PNG');

console.log('PASS: landscape structure and content invariants');
