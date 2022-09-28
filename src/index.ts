/*
 * @Author: chenzihan
 * @Date: 2022-09-16 15:15:40
 * @LastEditTime: 2022-09-28 17:31:49
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\index.ts
 */

import { PROJECT_LIST, PROJECT_NAME } from './config';
import { checkProject } from './checkProject';

const project =
  PROJECT_LIST.find((item) => item.name === PROJECT_NAME) || PROJECT_LIST[0];

checkProject(project);
