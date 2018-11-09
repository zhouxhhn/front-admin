import { getToken } from '@sipin/siyue-admin-core';
import webapi from './configs/webapi';
import isSuccess from './utils/is-success';
import proxy from './utils/proxy';

export default {
  user: {
    checkLogin: async () => {
      try {
        const data = getToken();
        if (data.token) {
          return data;
        }

        return {
          error: '未登录',
        };
      } catch (e) {
        // 输出错误信息
        return {
          error: e || '失败',
        };
      }
    },
    login: async params => {
      try {
        const { userCode, password, shopCode } = params;
        const res: any = await proxy(
          webapi.salesMember.salesUserUserLogin({
            userCode,
            password,
            shopCode: shopCode !== 'NULL' ? shopCode : null,
          })
        );
        if (isSuccess(res)) {
          const { data } = res;
          const user = data.salesUser || {};
          const { password, ...userData }: any = user;

          localStorage.setItem('userData', JSON.stringify(userData));

          return {
            ...user,
            token: data.token,
          };
        }

        return {
          error: res.data.errors || '失败',
        };
      } catch (e) {
        // 输出错误信息
        return {
          error: e || '失败',
        };
      }
    },
    logout: async () => {
      const res: any = await proxy(webapi.salesMember.salesUserUserLogout());
      if (isSuccess(res)) {
        localStorage.removeItem('userData');

        return true;
      }

      return false;
    },
  },
};
