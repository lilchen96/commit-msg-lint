/*
 * @Author: chenzihan
 * @Date: 2022-10-18 16:24:57
 * @LastEditTime: 2022-10-18 16:26:35
 * @LastEditors: chenzihan
 * @Description: 
 * @FilePath: \commit-msg-lint\src\generateExcel\tem.ts
 */
// /*
//  * @Author: chenzihan
//  * @Date: 2022-10-18 16:24:57
//  * @LastEditTime: 2022-10-18 16:24:57
//  * @LastEditors: chenzihan
//  * @Description: 
//  * @FilePath: \commit-msg-lint\src\generateExcel\tem.ts
//  */
// import path from 'path';
// import { ExcelOptions, ExcelData } from './type';
// const ExcelJS = require('exceljs');

// const options: ExcelOptions = [
//   {
//     key: 'project',
//     label: '项目',
//     headerTemplate: '<th>{data}</th>',
//     template: '<td><a href={data}>{data}</a></td>',
//   },
//   {
//     key: 'completion',
//     label: '完成情况',
//     headerTemplate: '<th align="center">{data}</th>',
//     template:
//       '<td align="center"><div style="text-align=center">{data}</div></td>',
//   },
//   {
//     key: 'activeOrNot',
//     label: '是否活跃',
//     headerTemplate: '<th align="center">{data}</th>',
//     template: '<td align="center">{data}</td>',
//   },
// ];

// const data = [
//   {
//     project: 'https://git2.aegis-info.com/goahan/tj_law_firm',
//     completion: '已完成',
//     activeOrNot: '活跃',
//   },
//   {
//     project: 'https://git2.aegis-info.com/goahan/tj_law_firm',
//     completion: '已废弃',
//     activeOrNot: '不活跃',
//   },
// ];


// const table = getTableHtml(options, data);
// const workbook = new ExcelJS.Workbook();
// const worksheet = workbook.addWorksheet('My Sheet');


// // const columns = options.map(item=>item.)
// // const rows = data.map(item=>Object.k)

// worksheet.addTable({
//   name: '2022-10-18',
//   ref: 'A1',
//   style: {
//   },
//   columns: [
//     { name: 'Date', totalsRowLabel: 'Totals:', filterButton: true },
//     { name: 'Amount', totalsRowFunction: 'sum', filterButton: false },
//   ],
//   rows: [
//     [new Date('2019-07-20'), 70.1],
//     [new Date('2019-07-21'), 70.6],
//     [new Date('2019-07-22'), 70.1],
//   ],
// });

// workbook.xlsx.writeFile('test.xlsx');

// function setCell(cell: string) {}
// // const workbook = XLSX.read(table, { type: 'string' });
// // XLSX.writeFile(workbook, 'test.xlsx', { compression: true });

// function getTableHeader(excelOptions: ExcelOptions) {
//   return `<thead><tr>${excelOptions
//     .map((item) => item.headerTemplate.replace(/{data}/g, item.label))
//     .join('')}</tr></thead>`;
// }
// function getTableBody(excelOptions: ExcelOptions, excelData: ExcelData) {
//   return `<tbody>${excelData
//     .map(
//       (item) =>
//         `<tr>${excelOptions
//           .map((it) => it.template.replace(/{data}/g, item[it.key]))
//           .join('')}</tr>`
//     )
//     .join('')}</tbody>`;
// }

// function getTableHtml(excelOptions: ExcelOptions, excelData: ExcelData) {
//   const header = getTableHeader(excelOptions);
//   const body = getTableBody(excelOptions, excelData);
//   return `<table>${header}${body}</table>`;
// }
