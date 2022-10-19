/*
 * @Author: chenzihan
 * @Date: 2022-10-17 15:43:26
 * @LastEditTime: 2022-10-19 10:16:46
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\generateMd\generate.ts
 */
import { exec } from 'child_process';
import { Project } from '../type';
import { writeMarkdown, getContent } from './writeMarkdown';
import {
  checkActivity,
  checkCommitMsg,
  getMostActiveBranch,
  initGit,
  initProject,
} from '../core';

export async function generateMd(project: Project, start: boolean = true) {
  await initGit();
  initProject(project);
  const activityResult = await checkActivity();
  const mostActiveBranch = getMostActiveBranch(activityResult);
  const commitMsgResult = await checkCommitMsg(mostActiveBranch.branch);
  const mdContent = `${project.name}\n${project.url}\n${getContent(
    activityResult,
    commitMsgResult
  )}`;
  const filePath = writeMarkdown(mdContent, project.name);
  if (start) {
    exec(`start ${filePath}`);
  }
  return {
    activityResult,
    mostActiveBranch,
    commitMsgResult,
  };
}
