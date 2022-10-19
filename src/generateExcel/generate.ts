/*
 * @Author: chenzihan
 * @Date: 2022-10-17 15:53:30
 * @LastEditTime: 2022-10-19 11:58:31
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\generateExcel\generate.ts
 */
import { ExcelColumns, ExcelRow, ExcelData, CellOption } from './type';
import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import chalk from 'chalk';
import ExcelJS from 'exceljs';

const ASCIIA = 'A'.charCodeAt(0);

function setCell(cellOption: CellOption, cell: any, row?: ExcelRow) {
  Object.keys(cellOption).forEach((key) => {
    if (typeof cellOption[key] === 'function') {
      cell[key] = cellOption[key](cell.value, row);
    } else {
      cell[key] = cellOption[key];
    }
  });
}

function setHeaders(worksheet: any, excelColumns: ExcelColumns) {
  excelColumns.forEach((col, index) => {
    const cell = worksheet.getCell(`${String.fromCharCode(ASCIIA + index)}1`);
    setCell(col.headCell, cell);
  });
}

function setRows(
  worksheet: any,
  excelColumns: ExcelColumns,
  excelData: ExcelData
) {
  excelData.forEach((row, index) => {
    excelColumns.forEach((col, i) => {
      const cell = worksheet.getCell(
        `${String.fromCharCode(ASCIIA + i)}${index + 2}`
      );
      setCell(col.cell, cell, row);
    });
  });
}

export async function generateExcel(
  excelColumns: ExcelColumns,
  excelData: ExcelData
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(dayjs().format('YYYY-MM-DD'));
  const rows = excelData.map((item) => excelColumns.map((it) => item[it.key]));
  worksheet.columns = excelColumns.map((col) => ({
    header: col.header,
    width: col.width,
  }));

  worksheet.addRows(rows);
  setHeaders(worksheet, excelColumns);
  setRows(worksheet, excelColumns, excelData);
  const dirName = path.resolve(__dirname, '..', 'excel');
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
  const fileName = `git提交检测结果_${dayjs().format('YYYY-MM-DD')}.xlsx`;
  const filePath = path.resolve(dirName, fileName);
  await workbook.xlsx.writeFile(filePath);
  console.log(chalk.green(`${fileName} 生成成功！`));
  exec(`start ${filePath}`);
}
