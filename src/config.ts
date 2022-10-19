/*
 * @Author: chenzihan
 * @Date: 2022-09-26 10:39:50
 * @LastEditTime: 2022-10-19 14:48:26
 * @LastEditors: chenzihan
 * @Description:
 * @FilePath: \commit-msg-lint\src\config.ts
 */
// 活跃度的判断（x天内有提交记录为活跃，x天内无提交记录为不活跃）
export const ACTIVE_DAYS = 14;
// 审核的提交记录数量（取近x条记录）
export const COMMIT_MAX_NUM = 50;
// 审核的提交记录数量时间范围（取近x时间的记录）格式例如：1_month   1_day   1_year  1_week
export const COMMIT_TIME_RANGE = '1_month';
// 提交记录通过率目标
export const COMMIT_LEGAL_TARGET = 0.75;

// 自定义git commit msg检测方法,入参为git commit msg的文本信息，需要返回一个对象{error,legal}，error：为错误的文字提示；legal：是否通过检测
export const CHECK_FUN = (
  msg: string
): {
  error: string;
  legal: boolean;
} => {
  const regex = /^([a-z]+)(\(.+\))?: (.+)/;
  const regexAns = regex.exec(msg);
  let type = '',
    module = '',
    value = '',
    errorList: string[] = [],
    error = '',
    legal = true;
  if (regexAns) {
    type = regexAns[1] || '';
    module = regexAns[2]?.substring(1, regexAns[2].length - 1) || '';
    value = regexAns[3] || '';
    if (!type) {
      errorList.push('缺少类型');
      legal = legal && false;
    }
    if (!module) {
      errorList.push('缺少模块');
      legal = legal && true;
    }
    if (!value) {
      errorList.push('缺少内容');
      legal = legal && false;
    }
  } else {
    errorList.push('缺少类型');
    legal = false;
  }
  error = errorList.join();
  return {
    error,
    legal,
  };
};

//检测的项目集合(generate:excel)
export const PROJECT_LIST = [
  {
    url: 'https://git2.aegis-info.com/goahan/tj_law_firm',
  },
  {
    url: 'https://git2.aegis-info.com/liyubo/contract-review',
  },
  {
    url: 'https://git2.aegis-info.com/court/intelligent-delivery',
  },
  {
    url: 'https://git2.aegis-info.com/court/intelligent-delivery-intranet',
  },
  {
    url: 'https://git2.aegis-info.com/chensi/police-map',
  },
  {
    url: 'https://git2.aegis-info.com/muyuwen/400-Shunt-System',
  },
  {
    url: 'https://git2.aegis-info.com/shaowei/little-law-butler',
  },
  {
    url: 'https://git2.aegis-info.com/shanghai/front-end/yidian-system-v2',
  },
  {
    url: 'https://git2.aegis-info.com/YangDan/Judgment_document',
  },
  {
    url: 'https://git2.aegis-info.com/chenzihan/i-mediate',
  },
  {
    url: 'https://git2.aegis-info.com/liyubo/straddle-end',
  },
  {
    url: 'https://git2.aegis-info.com/15205176399/icontractreviewpcpc',
  },
  {
    url: 'https://git2.aegis-info.com/liyubo/trafficmanagement',
  },
  {
    url: 'https://git2.aegis-info.com/java-group/financial-dispute-mediation-fe',
  },
  {
    url: 'https://git2.aegis-info.com/guangzhou/consult_online_client',
  },
  {
    url: 'https://git2.aegis-info.com/guangzhou/consult_online_manage',
  },
  {
    url: 'https://git2.aegis-info.com/xuzhile/jd-h5',
  },
  {
    url: 'https://git2.aegis-info.com/SolutionCenterProjects/court-arrangement-system',
  },
  {
    url: 'https://git2.aegis-info.com/tool/tool_manage',
  },
  {
    url: 'https://git2.aegis-info.com/guangzhou/consult_online_client_mul',
  },
  {
    url: 'https://git2.aegis-info.com/shanghai/front-end/electronic_iou_h5',
  },
  {
    url: 'https://git2.aegis-info.com/yf-frontend-group/jd-management',
  },
  {
    url: 'https://git2.aegis-info.com/shenzhen-gov-weixin/shenzhen-gov-wechat-fe',
  },
  {
    url: 'https://git2.aegis-info.com/SolutionCenterProjects/wechat-video',
  },
  {
    url: 'https://git2.aegis-info.com/wujie-integration-xiaofa-project/wujie-FE-xiaofa',
  },
  {
    url: 'https://git2.aegis-info.com/guangzhou/gz_pufa',
  },
  {
    url: 'https://git2.aegis-info.com/yf-frontend-group/jd-h5',
  },
  {
    url: 'https://git2.aegis-info.com/qdy-yq/yqseoproduct',
  },
  {
    url: 'https://git2.aegis-info.com/guangzhou/itegralexchangeweb',
  },
];

// 检测的项目的url(generate:md)
export const PROJECT = {
  url: 'https://git2.aegis-info.com/guangzhou/itegralexchangeweb',
};
