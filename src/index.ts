/*
 * @Author: chenzihan
 * @Date: 2022-09-16 15:15:40
 * @LastEditTime: 2022-09-27 17:23:07
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\index.ts
 */

import { exec, spawnSync } from 'child_process';
import { promisify } from 'util';
import { checkActivity } from './checkActivity';
import { checkCommitMsg } from './checkCommitMsg';
import { writeMarkdown, getContent } from './writeMarkdown';
import { PROJECT_LIST, PROJECT_NAME } from './config';
const execPromise = promisify(exec);

const project =
  PROJECT_LIST.find((item) => item.name === PROJECT_NAME) || PROJECT_LIST[0];

(async () => {
  spawnSync('git init', {
    stdio: 'inherit',
    shell: true,
  });
  const { stdout: remoteInfo } = await execPromise('git remote -v');
  if (remoteInfo) {
    spawnSync('git remote remove origin', {
      stdio: 'inherit',
      shell: true,
    });
  }
  spawnSync(`git remote add origin ${project.url}`, {
    stdio: 'inherit',
    shell: true,
  });
  // fetch
  spawnSync('git fetch --all', {
    stdio: 'inherit',
    shell: true,
  });
  const activityResult = await checkActivity();
  const mostActiveBranch = activityResult.reduce(
    (res, item) =>
      new Date(item.lastDate).getTime() > new Date(res.lastDate).getTime()
        ? item
        : res,
    activityResult[0]
  );
  const commitMsgResult = await checkCommitMsg(mostActiveBranch.branch);
  const mdContent = `${project.link}\n${getContent(
    activityResult,
    commitMsgResult
  )}`;
  const filePath = writeMarkdown(mdContent, project.name);
  exec(`start ${filePath}`);
})();
