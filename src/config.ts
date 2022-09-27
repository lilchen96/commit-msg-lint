/*
 * @Author: chenzihan
 * @Date: 2022-09-26 10:39:50
 * @LastEditTime: 2022-09-27 17:21:49
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\config.ts
 */
// 活跃度的判断（x天内有提交记录为活跃，x天内无提交记录为不活跃）
export const ACTIVE_DAYS = 14;
// 审核的提交记录数量（取近x条记录）
export const COMMIT_MAX_NUM = 50;
// 审核的提交记录数量时间范围（取近x时间的记录）格式例如：1_month   1_day   1_year  1_week
export const COMMIT_TIME_RANGE = '1_month';
// 提交记录通过率目标
export const COMMIT_LEGAL_TARGET = 0.75;

// 待检测的项目集合
export const PROJECT_LIST = [
  {
    name: 'commit-msg-lint',
    url: 'https://github.com/lilchen96/commit-msg-lint.git',
    link: 'https://github.com/lilchen96/commit-msg-lint',
  },
];

// 当前检测的项目的name
export const PROJECT_NAME = 'commit-msg-lint';
