/*
 * @Author: chenzihan
 * @Date: 2022-09-26 16:02:39
 * @LastEditTime: 2022-09-27 16:47:22
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \checkCommit\src\checkCommitMsg.ts
 */
import { exec } from 'child_process';
import { promisify } from 'util';
import dayjs from 'dayjs';
import { LogList } from './type';
import {
  COMMIT_MAX_NUM,
  COMMIT_LEGAL_TARGET,
  COMMIT_TIME_RANGE,
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
        !item.msg.startsWith('Merge branch') && !item.msg.startsWith('Update ')
    )
    .map((item) => {
      const obj = {
        ...item,
        error: '',
        legal: true,
      };
      const regex = /([a-z]+)(\(.+\))?: (.+)/;
      const regexAns = regex.exec(item.msg);
      let type = '';
      let module = '';
      let value = '';
      let errorList = [];
      if (regexAns) {
        type = regexAns[1] || '';
        module = regexAns[2]?.substring(1, regexAns[2].length - 1) || '';
        value = regexAns[3] || '';
        if (!type) {
          errorList.push('缺少类型');
          obj.legal = obj.legal && false;
        }
        if (!module) {
          errorList.push('缺少模块');
          obj.legal = obj.legal && true;
        }
        if (!value) {
          errorList.push('缺少内容');
          obj.legal = obj.legal && false;
        }
      } else {
        errorList.push('缺少类型');
        obj.legal = false;
      }
      obj.error = errorList.join();
      return obj;
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
