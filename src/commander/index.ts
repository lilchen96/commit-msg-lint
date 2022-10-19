/*
 * @Author: chenzihan
 * @Date: 2022-10-17 15:34:11
 * @LastEditTime: 2022-10-17 15:40:20
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\commander\index.ts
 */
import { program } from 'commander';
import { lintCallback } from './lint';

program.command('lint').action(lintCallback);

program.parse(process.argv);
