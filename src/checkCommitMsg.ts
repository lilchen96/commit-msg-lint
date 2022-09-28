/*
 * @Author: chenzihan
 * @Date: 2022-09-26 16:02:39
 * @LastEditTime: 2022-09-28 15:00:30
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\checkCommitMsg.ts
 */
import { exec } from 'child_process';
import { promisify } from 'util';
import dayjs from 'dayjs';
import { LogList } from './type';
import {
  COMMIT_MAX_NUM,
  COMMIT_LEGAL_TARGET,
  COMMIT_TIME_RANGE,
  CHECK_FUN,
} from './config';

const execPromise = promisify(exec);
const timeRange: number = Number(COMMIT_TIME_RANGE.split('_')[0]);
const timeUnit: any = COMMIT_TIME_RANGE.split('_')[1];

const separator = '_$_';
export async function checkCommitMsg(branch: string) {
  const since = dayjs()
    .add(timeRange * -1, timeUnit)
    .add(-1, 'day')
    .format('YYYY-MM-DD');
  const { stdout: allLogList } = await execPromise(
    `git log --pretty=format:"%ad${separator}%s" ${branch} --since='${since}'`
  );
  let logList = allLogList
    .split('\n')
    .map((item) => item.trim())
    .filter((item) => item)
    .map((item) => {
      const arr = item.split(separator);
      return {
        date: dayjs(arr[0]).format('YYYY-MM-DD'),
        msg: arr[1],
      };
    })
    .filter(
      (item) =>
        !item.msg.startsWith('Merge ') && !item.msg.startsWith('Update ')
    )
    .map((item) => {
      return {
        ...item,
        ...CHECK_FUN(item.msg),
      };
    });
  if (logList.length > COMMIT_MAX_NUM) {
    logList = logList.slice(0, COMMIT_MAX_NUM);
  }
  const commitMsgResult = {
    branch: branch,
    list: logList,
    ...getStatistics(logList),
  };
  return commitMsgResult;
}

function getStatistics(list: LogList) {
  const legalItems = list.filter((item) => item.legal);
  const illegalItems = list.filter((item) => !item.legal);
  const num = list.length;
  const legalNum = legalItems.length;
  const illegalNum = illegalItems.length;
  let legalPercent = 0;
  if (num !== 0) {
    legalPercent = Math.floor((legalNum / num) * 1000) / 1000;
  }
  const pass = legalPercent >= COMMIT_LEGAL_TARGET;
  return {
    num,
    legalNum,
    illegalNum,
    legalPercent,
    pass,
  };
}
