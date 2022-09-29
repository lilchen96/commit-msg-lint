# commit-msg-lint

git commit msg 检测器，自动生成git提交记录的检测结果。

#### 1. 安装依赖：
`pnpm install`

#### 2. 自定义配置：
修改`src/config.ts` 的配置。包括：

| 配置项   | 类型     | 备注 |
| -------- | -------- | -------- |
| ACTIVE_DAYS    | number | 单位：天；用来判断项目活跃度（ACTIVE_DAYS天内有提交记录为活跃，ACTIVE_DAYS天内无提交记录为不活跃）   |
| COMMIT_MAX_NUM  | number  | 审核的提交记录数量（取近COMMIT_TIME_RANGE时间内的近COMMIT_MAX_NUM条记录） |
| COMMIT_TIME_RANGE  | string  | 审核的提交记录数量时间范围（取近COMMIT_TIME_RANGE时间的记录）格式例如：1_month   1_day   1_year  1_week  |
| COMMIT_LEGAL_TARGET  | number  | 提交记录通过率目标，合格记录数量占总记录数量的比  |
| CHECK_FUN  | function：`(msg:string):{error: string;legal: boolean;}=>{}`  | 自定义git commit msg检测方法。 入参为git commit msg的文本信息，需要返回一个对象{error,legal}，error：为错误的文字提示；legal：是否通过检测。  |
| PROJECT_LIST  | array：`Array<{name:string,url:string,link?:string}>`  | 待检测的项目集合。name：项目名；url：git地址；link：项目网页链接（选填）（配置模式检测才生效）  |
| PROJECT_NAME  | string  |需要检测的项目名（配置模式检测才生效）|


#### 2. 检测：

##### 配置模式：
配置`PROJECT_LIST`和`PROJECT_NAME`后，运行`pnpm run dev`，生成对应的检测结果。

##### 命令模式：
运行`pnpm run lint`，按照指示输入信息，生成对应的检测结果。

#### 3. 结果：
生成的检测结果会自动打开，文件生成在`dist/md/`下。 