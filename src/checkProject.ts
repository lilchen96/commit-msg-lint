/*
 * @Author: chenzihan
 * @Date: 2022-09-28 16:04:50
 * @LastEditTime: 2022-09-28 17:27:07
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\checkProject.ts
 */
import { exec, spawnSync } from 'child_process';
import { promisify } from 'util';
import { Project, ActivityResult } from './type';
import { checkActivity } from './checkActivity';
import { checkCommitMsg } from './checkCommitMsg';
import { writeMarkdown, getContent } from './writeMarkdown';
const execPromise = promisify(exec);

export async function checkProject(project: Project) {
  await initGit();
  initProject(project);
  const activityResult = await checkActivity();
  const mostActiveBranch = getMostActiveBranch(activityResult);
  const commitMsgResult = await checkCommitMsg(mostActiveBranch.branch);
  const mdContent = `${project.name}\n${project.link}\n${getContent(
    activityResult,
    commitMsgResult
  )}`;
  const filePath = writeMarkdown(mdContent, project.name);
  exec(`start ${filePath}`);
}

function getMostActiveBranch(activityResult: ActivityResult) {
  const mostActiveBranch = activityResult.reduce(
    (res, item) =>
      new Date(item.lastDate).getTime() > new Date(res.lastDate).getTime()
        ? item
        : res,
    activityResult[0]
  );
  return mostActiveBranch;
}

async function initGit() {
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
}

function initProject(project: Project) {
  spawnSync(`git remote add origin ${project.url}`, {
    stdio: 'inherit',
    shell: true,
  });
  // fetch
  spawnSync('git fetch --all', {
    stdio: 'inherit',
    shell: true,
  });
}
