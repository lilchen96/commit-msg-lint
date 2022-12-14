/*
 * @Author: chenzihan
 * @Date: 2022-09-26 10:18:29
 * @LastEditTime: 2022-10-17 15:42:17
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\core\checkActivity.ts
 */
import { exec } from 'child_process';
import { promisify } from 'util';
import dayjs from 'dayjs';
import { ACTIVE_DAYS } from '../config';
import { ActivityResult, ActivityResultItem } from '../type';

const execPromise = promisify(exec);

async function getAllBranchs() {
  const { stdout: str } = await execPromise('git branch -r');
  const branchs = str
    .split('\n')
    .map((item) => item.trim())
    .filter((item) => item);
  return branchs;
}

async function getActivityInfo(branch: string): Promise<ActivityResultItem> {
  const { stdout: timeStamp } = await execPromise(
    `git log --pretty=format:"%ad" "${branch}" -1`
  );
  const diffDays = Math.abs(dayjs(timeStamp).diff(new Date(), 'day'));
  let isActive = false;
  if (diffDays <= ACTIVE_DAYS) {
    isActive = true;
  }
  return {
    branch,
    lastDate: dayjs(timeStamp).format('YYYY-MM-DD'),
    isActive,
  };
}

export async function checkActivity(): Promise<ActivityResult> {
  const branchs = await getAllBranchs();
  const res = await Promise.all(
    branchs.map((branch) => getActivityInfo(branch))
  );
  return res;
}
