import { Action as BaseAction } from '@sipin/siyue-admin-components';
import { removeToken } from '@sipin/siyue-admin-core';
import { createHashHistory } from 'history';
import actions from '../../../actions';
import webapi from '../../../configs/webapi';
import { handleResponse } from '../../../utils/tool-box';
import openNotificationWithIcon from '../../../utils/notification';

export default class Action extends BaseAction {
  handlePasswordChange = async params => {
    const res = await this.proxy(
      webapi.salesMember.salesUserEditUserPwd(params)
    );

    handleResponse(res, '修改密码', () => {
      setTimeout(() => {
        openNotificationWithIcon({
          type: 'success',
          message: '请重新登录',
          description: '即将跳转至登录页...',
          duration: 2,
        });
        setTimeout(() => {
          actions.user.logout();
          removeToken();
          createHashHistory().push('/login');
        }, 2000);
      }, 800);
    });
  };
}
