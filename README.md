# Personal Portfolio 2026

白底、黄色几何动效与大字号排版的个人作品集。参考 ignoredone.space 的视觉方向，独立实现；未使用对方的作品、图片、字体文件或源代码。

## 更新作品

编辑 `content/site.json`。修改姓名、介绍、联系链接和 `projects` 数组即可。所有示例均标注为“设计示例”，请在正式展示前替换为真实内容。

每个项目包含：`slug`（小写英文和连字符、不可重复）、`title`、`category`、`year`、`summary`、`description`、`theme`（form/type/motion）、`image`、`imageAlt`、`demo`。

图片放进 `public/assets/`，把 `image` 设为 `assets/文件名.webp`，填写图片说明 `imageAlt`。建议使用 WebP/JPEG，宽约 1600 像素，避免上传原始超大文件。真实项目把 `demo` 改成 `false`。首页“当前项目为版式设计示例”的提示位于 `scripts/build.mjs`，正式发布时一并修改。不填图片会显示几何/字体版式示例。

## 本地预览

安装 Node.js 20 或更新版本，无需安装依赖。

```sh
npm run build
npm run check
npm start
```

访问 http://127.0.0.1:4173 。修改内容后重新运行 build 并刷新。

## GitHub Pages

在仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。推送 main 后会自动构建、检查并发布，通常需要几分钟。部署失败查看 Actions → Publish portfolio。

默认网址：https://cakelord1919.github.io/Personal-Portfolio2026/

绑定自己的域名时：先在 Pages 设置中添加并验证域名、按 GitHub 提示配置 DNS，再将 `content/site.json` 的 `siteUrl` 改为实际 HTTPS 地址并保留结尾斜线。重新发布将更新 canonical、站点地图和 robots.txt。无需购买后端服务器。

## 文件结构

- `content/site.json`：个人资料与项目内容
- `src/styles.css`：视觉与响应式布局
- `src/main.js`：分类筛选、指针与导航交互
- `scripts/build.mjs`：生成首页、项目详情页、404、sitemap 与 robots
- `public/assets/`：自己的作品素材
- `.github/workflows/pages.yml`：自动发布

内容直接输出 HTML，关闭 JS 仍能阅读项目、进入详情页。支持键盘焦点、跳转内容和减少动态效果偏好。字体通过 Google Fonts 加载，网络不可用时回退为系统字体。没有追踪器、数据库或付费运行时依赖。
