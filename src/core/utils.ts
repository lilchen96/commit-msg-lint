/*
 * @Author: chenzihan
 * @Date: 2022-10-17 15:16:20
 * @LastEditTime: 2022-10-17 15:17:22
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\core\utils.ts
 */
import { ActivityResult } from '../type';

export function getMostActiveBranch(activityResult: ActivityResult) {
  const mostActiveBranch = activityResult.reduce(
    (res, item) =>
      new Date(item.lastDate).getTime() > new Date(res.lastDate).getTime()
        ? item
        : res,
    activityResult[0]
  );
  return mostActiveBranch;
}
