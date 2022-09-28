/*
 * @Author: chenzihan
 * @Date: 2022-09-26 11:34:33
 * @LastEditTime: 2022-09-28 16:23:33
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\writeMarkdown.ts
 */
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { ActivityResult, CommitMsgResult } from './type';
import { ACTIVE_DAYS, COMMIT_LEGAL_TARGET } from './config';
import path from 'path';

export function getContent(
  activityResult: ActivityResult,
  commitMsgResult: CommitMsgResult
) {
  const activityResultText = getActivityResultText(activityResult);
  const commitMsgResultText = getCommitMsgResultText(commitMsgResult);
  return `活跃性结果\n${activityResultText}\n\n提交记录结果\n${commitMsgResultText}`;
}

function getActivityResultText(activityResult: ActivityResult) {
  const activeArr = activityResult.filter((item) => item.isActive);
  const unActiveArr = activityResult.filter((item) => !item.isActive);
  const conclusion = activeArr.length > 0 ? '项目活跃' : '项目废弃';
  const activeText = activeArr
    .map((item) => item.branch.replace('origin/', ''))
    .join('\n');
  const unActiveArrText = unActiveArr
    .map((item) => item.branch.replace('origin/', ''))
    .join('\n');
  return `${conclusion}\n活跃分支(近${ACTIVE_DAYS}天有提交记录)：\n${activeText}\n不活跃分支(近${ACTIVE_DAYS}天无提交记录)：\n${unActiveArrText}`;
}

function getCommitMsgResultText(commitMsgResult: CommitMsgResult) {
  const conclusion = commitMsgResult.pass ? '检测通过' : '检测不通过';
  const numText = `近期提交记录数量：${commitMsgResult.num};合格数量：${commitMsgResult.legalNum};不合格数量：${commitMsgResult.illegalNum}`;
  const percentText = `当前通过率：${
    commitMsgResult.legalPercent * 100
  }%;目标通过率：${COMMIT_LEGAL_TARGET * 100}%`;
  const listText = commitMsgResult.list
    .map(
      (item) =>
        `${item.date} ${item.msg}（${item.legal ? '通过' : '不通过'}${
          item.error ? '：' + item.error : ''
        }）`
    )
    .join('\n');
  return `检查分支：${commitMsgResult.branch.replace(
    'origin/',
    ''
  )}\n${conclusion}\n${numText}\n${percentText}\n提交记录列表：\n${listText}`;
}

export function writeMarkdown(content: string, name: string) {
  const dirName = path.resolve(__dirname, 'md');
  if (!existsSync(dirName)) {
    mkdirSync(dirName);
  }
  const fileName = `${name}.md`;
  const filePath = path.resolve(dirName, fileName);
  writeFileSync(filePath, content);
  console.log(`${fileName} 生成成功！`);
  return filePath;
}
