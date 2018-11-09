import { removeToken } from '@sipin/siyue-admin-core';
import { message } from 'antd';
import createHashHistory from 'history/createHashHistory';
import NProgress from 'nprogress';
import * as CONSTANT from './constant';

const history = createHashHistory();
export interface ResType {
  code?: string | number;
  data?: any;
  msg?: string;
  status?: string;
  message?: string;
}

/**
 * proxy
 * API 请求预处理
 * @export
 * @param {*} promise api promise
 * @returns {Promise<ResType>} res
 */
export default function proxy(promise): Promise<ResType> {
  NProgress.start();

  return new Promise((resolve, reject) => {
    promise
      .then(function(res: ResType) {
        NProgress.done();
        switch (Number(res.status)) {
          case CONSTANT.ERROR_SERVER_ERROR_CODE:
            message.error(
              `${CONSTANT.ERROR_SERVER_ERROR_CODE} ${res.msg ||
                res.message ||
                CONSTANT.RES_CODE_INFO[res.code]}`
            );
            reject(res);

            return;
          default:
            break;
        }
        switch (res.code) {
          case CONSTANT.SUCCESS:
            resolve(res);
            break;
          case CONSTANT.ERROR_TOKEN_TIMEOUT_CODE:
            message.error('登录信息已过期, 请重新登录');
            removeToken();
            history.push('/login');
            reject(res);
            break;
          default:
            message.error(
              res.msg ||
                res.message ||
                res.data ||
                CONSTANT.RES_CODE_INFO[res.code]
            );
            reject(res);
            break;
        }
      })
      .catch(function(err: any) {
        NProgress.done();
        reject(err);
      });
  });
}
