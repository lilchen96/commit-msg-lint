/*
 * @Author: chenzihan
 * @Date: 2022-10-17 15:18:18
 * @LastEditTime: 2022-10-19 10:01:08
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\core\init.ts
 */
import { Project } from '../type';

import { exec, spawnSync } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);

export async function initGit() {
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

export function initProject(project: Project) {
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
