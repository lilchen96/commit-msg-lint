/*
 * @Author: chenzihan
 * @Date: 2022-10-17 15:30:17
 * @LastEditTime: 2022-10-19 10:15:52
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\generateMd\index.ts
 */
import { PROJECT } from '../config';
import { generateMd } from './generate';
import { getProjectName } from '../utils';

const project = {
  url: PROJECT.url,
  name: getProjectName(PROJECT.url),
};

generateMd(project);
