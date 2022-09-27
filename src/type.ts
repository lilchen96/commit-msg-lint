/*
 * @Author: chenzihan
 * @Date: 2022-09-26 11:43:55
 * @LastEditTime: 2022-09-26 17:54:29
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \checkCommit\src\type.ts
 */
export type ActivityResult = {
  branch: string;
  lastDate: string;
  isActive: boolean;
};

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
