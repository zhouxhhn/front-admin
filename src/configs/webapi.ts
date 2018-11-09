import * as webapi from '@sipin/sipin-sales-cloud-api';
import { removeToken } from '@sipin/siyue-admin-core';
import { message } from 'antd';
import { createHashHistory } from 'history';
import openNotification from '../utils/notification';
import actions from '../actions';

/**
 *  处理HTTP状态码
 */
// 服务端错误
export const SERVER_ERROR = 500;
// 服务端校验不正确
export const SERVER_VALIDATION_FAILS = 400;
// 登录信息过期
export const SERVER_UNAUTHORIZED = 401;
// 权限验证失败
export const SERVER_PERMISSION_DENIED = 403;
// token过期或者无效
export const SERVER_TOKEN_INVALID = 405;
// 网关错误
export const SERVER_BAD_GATEWAY = 502;
// 服务器爆炸
export const SERVER_BOOM = 503;
// 网关超时
export const SERVER_GATEWAY_TIMEOUT = 504;

/**
 *
 * @param {*} error any
 * @returns {*} any
 */
function errorHandler(error): any {
  if (!error || !error.response || error.status === SERVER_BAD_GATEWAY) {
    openNotification({
      type: 'error',
      message: '服务器开了个小差...',
      description:
        '可能原因：正在更新服务，如果长时间不正常请立即联系技术人员解决！',
      duration: 10,
      key: 'SERVER_ERROR',
    });

    return;
  }

  const { body, text } = error.response;

  if (error.status >= SERVER_BOOM) {
    const msg =
      (body.errors && body.errors.default) ||
      '可能原因：服务器过载，当前无法处理请求！';
    openNotification({
      type: 'error',
      message: '服务端错误',
      description: msg,
      key: 'SERVER_ERROR',
    });
  }
  if (error.status >= SERVER_ERROR) {
    const msg =
      (body.errors && body.errors.default) ||
      '可能原因：正在更新服务，如果长时间不正常请立即联系技术人员解决！';
    openNotification({
      type: 'error',
      message: '服务端错误',
      description: msg,
      key: 'SERVER_ERROR',
    });
  }
  if (error.status === SERVER_TOKEN_INVALID) {
    openNotification({
      type: 'error',
      message: '登录信息已失效，请重新登录',
      description: '请重新登录',
      duration: 10,
      key: 'SERVER_TOKEN_INVALID',
    });
    setTimeout(() => {
      actions.user.logout();
      removeToken();
      createHashHistory().push('/login');
    }, 500);
  }
  if (error.status === SERVER_PERMISSION_DENIED) {
    const msg = (body.errors && body.errors.default) || '没有权限进行此操作';
    openNotification({
      type: 'error',
      message: '权限验证失败',
      description: msg,
      duration: 10,
      key: 'SERVER_PERMISSION_DENIED',
    });
  }
  if (error.status === SERVER_UNAUTHORIZED) {
    const { code, msg } = JSON.parse(text || {});
    openNotification({
      type: 'error',
      message: code === SERVER_TOKEN_INVALID ? '登录信息已过期' : '未获得权限',
      description: code === SERVER_TOKEN_INVALID ? '请重新登录' : msg,
      duration: 10,
      key: 'SERVER_PERMISSION_DENIED',
    });
    code === SERVER_TOKEN_INVALID &&
      setTimeout(() => {
        actions.user.logout();
        removeToken();
        createHashHistory().push('/login');
      }, 500);
  }
  if (error.status === SERVER_VALIDATION_FAILS) {
    let msg = body.message || '';
    if (!msg && body.errors) {
      Object.keys(body.errors).forEach(e => {
        msg += `${body.errors[e]};\r`;
      });
    }
    if (+body.code === 1000) {
      // checkVersionNotification();
    } else if (msg) {
      message.error(msg);
    }
  }
}

Object.keys(webapi).forEach(item => {
  webapi[item].addErrorHandler(errorHandler);
  webapi[item].setTokenHandler(() => {
    const userInfo: any = JSON.parse(
      localStorage.getItem(location.host + '.user') || '{}'
    );

    return userInfo.token;
  });
});

export default webapi;
