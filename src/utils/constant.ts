// 失败
export const FAIL = 1;
// 成功
export const SUCCESS = 0;

// error
export const ERROR_FAIL = FAIL;
export const ERROR_PARAM_EMPTY = 101;
export const ERROR_PARAM_INVALID = 102;
export const ERROR_CODE_INVALID = 103;
export const ERROR_OBJECT_EXIST = 201;
export const ERROR_OBJECT_NOT_EXIST = 202;
export const ERROR_USER_NOT_EXIST = 203;
export const ERROR_OBJECT_NOT_BIND = 204;
export const ERROR_AUTH_FAIL = 301;
export const ERROR_PERMISSION_DENIED = 302;
export const ERROR_CREATE_FAIL = 401;
export const ERROR_UPDATE_FAIL = 402;
export const ERROR_DELETE_FAIL = 403;
export const ERROR_NOT_FOUND = 404;
export const ERROR_TOKEN_TIMEOUT_CODE = 405;
export const ERROR_DOWNGRADE = 406;
export const ERROR_SERVER_ERROR_CODE = 500;
export const ERROR_CAPTCHA_INVALID = 901;
export const UNKNOWN_ERROR = 902;
export const FILE_NOT_FOUND = 903;
export const CUSTOM_NOTIFY = 1024;

export const RES_CODE_INFO = {
  [SUCCESS]: '成功',
  [ERROR_FAIL]: '未知错误，失败',
  [ERROR_PARAM_EMPTY]: '参数为必填',
  [ERROR_PARAM_INVALID]: '参数无效',
  [ERROR_CODE_INVALID]: '验证码无效',
  [ERROR_OBJECT_EXIST]: '对象已存在',
  [ERROR_OBJECT_NOT_EXIST]: '对象不存在',
  [ERROR_USER_NOT_EXIST]: '用户名不存在或密码错误',
  [ERROR_OBJECT_NOT_BIND]: '用户未绑定',
  [ERROR_AUTH_FAIL]: '未授权操作',
  [ERROR_PERMISSION_DENIED]: '无权限操作',
  [ERROR_CREATE_FAIL]: '创建失败',
  [ERROR_UPDATE_FAIL]: '更新失败',
  [ERROR_DELETE_FAIL]: '删除失败',
  [ERROR_NOT_FOUND]: '资源没找到',
  [ERROR_TOKEN_TIMEOUT_CODE]: 'token过期或者无效',
  [ERROR_DOWNGRADE]: '网络异常，请稍后重试',
  [ERROR_SERVER_ERROR_CODE]: '服务器错误',
  [ERROR_CAPTCHA_INVALID]: '验证码无效',
  [UNKNOWN_ERROR]: '系统繁忙，请稍后再试....',
  [FILE_NOT_FOUND]: '你要读取的资源找不到',
  [CUSTOM_NOTIFY]: '返回自定义提示',
};

export const FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss';

export const FORMAT_DATE = 'YYYY-MM-DD';

const apiConstant = {
  FAIL,
  SUCCESS,
};

window['apiConstant'] = apiConstant;

export default apiConstant;
