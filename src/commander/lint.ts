/*
 * @Author: chenzihan
 * @Date: 2022-10-17 15:39:13
 * @LastEditTime: 2022-10-19 10:20:09
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\commander\lint.ts
 */
import inquirer from 'inquirer';
import { generateMd } from '../generateMd/generate';

export async function lintCallback() {
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
  ]);
  console.log(name, url, link);
  generateMd({
    name,
    url,
  });
}
