/*
 * @Author: chenzihan
 * @Date: 2022-09-26 11:43:55
 * @LastEditTime: 2022-10-19 10:11:52
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\type.ts
 */
export type Project = {
  name: string;
  url: string;
};

export type ActivityResultItem = {
  branch: string;
  lastDate: string;
  isActive: boolean;
};
export type ActivityResult = ActivityResultItem[];

export type LogList = {
  date: string;
  msg: string;
  error?: string;
  legal?: boolean;
}[];

export type CommitMsgResult = {
  branch: string;
  num: number;
  legalNum: number;
  illegalNum: number;
  legalPercent: number;
  pass: boolean;
  list: LogList;
};
