/*
 * @Author: chenzihan
 * @Date: 2022-09-28 16:03:40
 * @LastEditTime: 2022-09-28 17:28:15
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\commander.ts
 */
import { program } from 'commander';
import inquirer from 'inquirer';
import { checkProject } from './checkProject';

program.command('lint').action(lintCallback);

program.parse(process.argv);

async function lintCallback() {
  const { url } = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: '请输入git地址：',
      validate: function (input) {
        const reg =
          /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?.git$/;
        if (reg.test(input)) {
          return true;
        } else {
          return '格式不正确！';
        }
      },
    },
  ]);

  const urlArr = url.split('/');
  const defaultName = urlArr[urlArr.length - 1].replace('.git', '');
  const { name, link } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '请输入项目名：',
      default: defaultName,
      validate: function (input) {
        return input ? true : '不能为空！';
      },
    },
    {
      type: 'input',
      name: 'link',
      message: '请输入项目网页链接（选填）：',
    },
  ]);
  console.log(name, url, link);
  checkProject({
    name,
    url,
    link,
  });
}
