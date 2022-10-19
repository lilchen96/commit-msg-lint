/*
 * @Author: chenzihan
 * @Date: 2022-10-19 10:13:20
 * @LastEditTime: 2022-10-19 10:15:36
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\utils\index.ts
 */
export function getProjectName(url: string) {
  const arr = url.split('/');
  return arr[arr.length - 1].replace('.git', '');
}
