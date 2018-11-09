import { message } from 'antd';
import generateId from 'nanoid/generate';
import { renderQiniuUpload } from '../components/render-upload';
import isSuccess from './is-success';

/**
 * isType
 * @param {*} value value
 * @param {string} type type
 * @returns {boolean} true || false
 */
export function isType(value, type): boolean {
  return (
    Object.prototype.toString
      .call(value)
      .slice(8, -1)
      .toUpperCase() === type.toUpperCase()
  );
}

/**
 * 获取response对应的tips
 * @param {*} res - response
 * @returns {void}- void
 */
export function getTips(
  res = {
    isSuccess: false,
    msg: '失败，服务器返回异常',
  }
): any {
  let method = res.isSuccess ? 'success' : 'error';
  message[method](res.msg);
}

/**
 * 处理响应逻辑
 * @param {*} res - response
 * @param {string} tips - tips
 * @param {*} cb - callback
 * @returns {void} - *
 */
export function handleResponse(res, tips = '操作', cb?): any {
  if (isSuccess(res)) {
    message.success(`${tips}成功`);
  } else {
    message.error(res.msg ? res.msg : `${tips}失败，请稍后重试！`);
  }

  return cb ? cb(res.data) : false;
}

/**
 * 简单的表单item渲染封装
 * @param {string} key - key
 * @param {*} configs - configs
 * @returns {*} - *
 */
export function renderFormItem(key = '', configs): any {
  const { type, label, fieldProps, formItemProps } = configs;
  const configs_default = {
    key,
    label: '',
    type: 'input',
    options: {
      initialValue:
        type === 'radioGroup' || type === 'number'
          ? '0'
          : type === 'checkGroup'
            ? []
            : '',
      rules: [
        {
          required: true,
          message: `${label}不能为空!`,
        },
      ],
    },
  };

  return type === 'upload'
    ? renderQiniuUpload(
        label,
        key,
        { max: fieldProps.max, params: fieldProps.params },
        fieldProps.createAttachmentParams,
        formItemProps
      )
    : Object.assign(configs_default, configs);
}

/**
 * generateRandom - 生成随机值（可自定义类型，长度，指定字符集、前缀、后缀）
 * @param {string} type       type - 类型：'number' | 'string' | 'letters' | 'lettersUpperCase' | 'lettersLowerCase'
 * @param {number} length     length - 长度：默认为 6
 * @param {*} options         options - {characters: 字符集, prefix: 前缀, suffix: 后缀}
 * @returns {*}               value
 */
export function generateRandom(
  type?:
    | 'number'
    | 'string'
    | 'letters'
    | 'lettersUpperCase'
    | 'lettersLowerCase',
  length?: number,
  options?: { characters?: string; prefix?: any; suffix?: any }
): any {
  // Default params init
  type = type || 'string';
  length = length || 6;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const number = '0123456789';
  const charset = `${alphabet}${alphabet.toLowerCase()}${number}`;

  let { characters = '', prefix = '', suffix = '' } = options || {};

  const _prefixLength = (prefix + '').length;
  const _suffixLength = (suffix + '').length;
  const _additionalLength = _prefixLength + _suffixLength;
  const _length = length > _additionalLength ? length - _additionalLength : 0;

  let value = '';

  let regex = characters.match(/[\w\d]-[\w\d]/g);

  try {
    regex &&
      regex.length &&
      (characters = regex.reduce((pre, reg) => {
        pre += (charset.match(new RegExp(`[${reg}]+`)) || [])[0];

        return pre;
      }, ''));

    switch (type) {
      case 'number':
        _length &&
          (value += generateId(
            (characters.match(new RegExp(`[${number}]+`)) || [])[0] || number,
            _length
          ));
        break;
      case 'letters':
        _length &&
          (value += generateId(
            (characters.match(/[A-z]+/) || [])[0] ||
              `${alphabet}${alphabet.toLowerCase()}`,
            _length
          ));
        break;
      case 'lettersUpperCase':
        _length &&
          (value += generateId(
            (characters.match(new RegExp(`[${alphabet}]+`)) || [])[0] ||
              alphabet,
            _length
          ));
        break;
      case 'lettersLowerCase':
        _length &&
          (value += generateId(
            (characters.match(new RegExp(`[${alphabet.toLowerCase()}]+`)) ||
              [])[0] || alphabet.toLowerCase(),
            _length
          ));
        break;
      default:
        _length && (value += generateId(characters || `${charset}_~`, _length));
        break;
    }
    value =
      (prefix + '').slice(0, length) +
      value +
      (suffix + '').slice(_prefixLength - length);

    return type === 'number' ? +value : value;
  } catch (err) {
    throw new Error(err);
  }
}
