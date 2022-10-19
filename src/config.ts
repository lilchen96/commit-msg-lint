/*
 * @Author: chenzihan
 * @Date: 2022-09-26 10:39:50
 * @LastEditTime: 2022-10-19 15:16:21
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

// 自定义git commit msg检测方法,入参为git commit msg的文本信息，需要返回一个对象{error,legal}，error：为错误的文字提示；legal：是否通过检测
export const CHECK_FUN = (
  msg: string
): {
  error: string;
  legal: boolean;
} => {
  const regex = /^([a-z]+)(\(.+\))?: (.+)/;
  const regexAns = regex.exec(msg);
  let type = '',
    module = '',
    value = '',
    errorList: string[] = [],
    error = '',
    legal = true;
  if (regexAns) {
    type = regexAns[1] || '';
    module = regexAns[2]?.substring(1, regexAns[2].length - 1) || '';
    value = regexAns[3] || '';
    if (!type) {
      errorList.push('缺少类型');
      legal = legal && false;
    }
    if (!module) {
      errorList.push('缺少模块');
      legal = legal && true;
    }
    if (!value) {
      errorList.push('缺少内容');
      legal = legal && false;
    }
  } else {
    errorList.push('缺少类型');
    legal = false;
  }
  error = errorList.join();
  return {
    error,
    legal,
  };
};

//检测的项目集合(generate:excel)
export const PROJECT_LIST = [
  {
    url: 'https://github.com/lilchen96/commit-msg-lint',
  },
  {
    url: 'https://github.com/tj/commander.js',
  },
];

// 检测的项目的url(generate:md)
export const PROJECT = {
  url: 'https://github.com/lilchen96/commit-msg-lint',
};
