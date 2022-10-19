/*
 * @Author: chenzihan
 * @Date: 2022-10-18 14:46:15
 * @LastEditTime: 2022-10-19 10:56:07
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\generateExcel\type.ts
 */
export type ExcelColumns = {
  [props: string]: any;
  key: string;
  header: string;
  headCell: CellOption;
  cell: CellOption;
}[];

export type ExcelData = ExcelRow[];

export type ExcelRow = {
  [props: string]: any;
  url: string;
  isPass: string;
  branch: string;
  activeOrNot: string;
  completion: string;
};

export type CellOption = {
  [props: string]: any;
  value?: string | ((val: string, row?: ExcelRow) => any);
};
