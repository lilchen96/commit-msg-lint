/*
 * @Author: chenzihan
 * @Date: 2022-10-18 18:10:39
 * @LastEditTime: 2022-10-19 14:25:08
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\generateExcel\index.ts
 */
import { PROJECT_LIST } from '../config';
import { generateMd } from '../generateMd/generate';
import {
  ActivityResult,
  ActivityResultItem,
  CommitMsgResult,
  Project,
} from '../type';
import { ExcelColumns, ExcelRow } from './type';
import { generateExcel } from './generate';
import { getProjectName } from '../utils';

const defaultFont = {
  name: 'Microsoft YaHei',
  size: '10',
};

function getCellFill(row: ExcelRow) {
  let fill = {};
  switch (row.completion) {
    case '已完成':
      fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE1F3D8' },
      };
      break;
    case '未完成':
      fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFDE2E2' },
      };
      break;
    case '已废弃':
      fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE9E9EB' },
      };
      break;
    default:
      break;
  }
  return fill;
}

const excelColumns: ExcelColumns = [
  {
    key: 'url',
    header: '项目',
    width: 70,
    headCell: {
      font: {
        ...defaultFont,
        bold: true,
      },
    },
    cell: {
      value: (val: string) => ({
        text: val,
        hyperlink: val,
      }),
      font: {
        ...defaultFont,
        underline: 'single',
        color: { argb: 'FF002FA7' },
      },
      fill: (val: string, row: ExcelRow) => getCellFill(row),
    },
  },
  {
    key: 'completion',
    header: '完成情况',
    width: 10,
    headCell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
        bold: true,
      },
    },
    cell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
      },
      fill: (val: string, row: ExcelRow) => getCellFill(row),
    },
  },
  {
    key: 'activeOrNot',
    header: '状态',
    width: 10,
    headCell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
        bold: true,
      },
    },
    cell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
      },
      fill: (val: string, row: ExcelRow) => getCellFill(row),
    },
  },
  {
    key: 'branch',
    header: '检测提交记录的分支',
    width: 30,
    headCell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
        bold: true,
      },
    },
    cell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
      },
      fill: (val: string, row: ExcelRow) => getCellFill(row),
    },
  },
  {
    key: 'commitNum',
    header: '近期提交记录总数',
    width: 20,
    headCell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
        bold: true,
      },
    },
    cell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
      },
      fill: (val: string, row: ExcelRow) => getCellFill(row),
    },
  },
  {
    key: 'commitLegalNum',
    header: '合格提交记录',
    width: 15,
    headCell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
        bold: true,
      },
    },
    cell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
      },
      fill: (val: string, row: ExcelRow) => getCellFill(row),
    },
  },
  {
    key: 'legalPer',
    header: '合格率',
    width: 10,
    headCell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
        bold: true,
      },
    },
    cell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
      },
      fill: (val: string, row: ExcelRow) => getCellFill(row),
    },
  },
  {
    key: 'isPass',
    header: '是否通过检测',
    width: 15,
    headCell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
        bold: true,
      },
    },
    cell: {
      alignment: { horizontal: 'center' },
      font: {
        ...defaultFont,
      },
      fill: (val: string, row: ExcelRow) => getCellFill(row),
    },
  },
];
async function run() {
  const excelData = [];
  for (let i = 0; i < PROJECT_LIST.length; i++) {
    const project = {
      url: PROJECT_LIST[i].url,
      name: getProjectName(PROJECT_LIST[i].url),
    };
    const data = await generateMd(project, false);
    excelData.push(getExcelData(project, data));
  }
  await generateExcel(excelColumns, excelData);
}

function getExcelData(
  project: Project,
  data: {
    activityResult: ActivityResult;
    mostActiveBranch: ActivityResultItem;
    commitMsgResult: CommitMsgResult;
  }
) {
  const { activityResult, mostActiveBranch, commitMsgResult } = data;
  const mid_isActive = activityResult.some((item) => item.isActive);

  const isPass = commitMsgResult.pass ? '通过' : '未通过';
  const url = project.url || '';
  const branch = mostActiveBranch.branch.replace('origin/', '');
  const activeOrNot = mid_isActive ? '活跃' : '不活跃';
  const completion = mid_isActive
    ? commitMsgResult.pass
      ? '已完成'
      : '未完成'
    : '已废弃';
  const commitNum = commitMsgResult.num;
  const commitLegalNum = commitMsgResult.legalNum;
  const legalPer = `${(commitMsgResult.legalPercent * 100).toFixed(0)}%`;
  return {
    url,
    isPass,
    branch,
    activeOrNot,
    completion,
    commitNum,
    commitLegalNum,
    legalPer,
  };
}

run();
