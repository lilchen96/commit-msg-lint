# commit-msg-lint

git commit msg 检测器

安装依赖：`pnpm install`

修改 `src/config.ts` 的配置后，启动检测：`pnpm run dev`

报告生成后会自动打开，报告文件生成位置：`dist/md/`

提交信息规范格式：`type(module): content`。未来会开放检测规则，支持自定义。
