import * as React from 'react';
import { Icon } from 'antd';
import ShopSelectNative from '../components/shop-select-native';

/**
 * @returns {*} any
 */
export default function getLoginPageConfigs(): any {
  return {
    form: [
      {
        type: 'react',
        key: 'shopCode',
        options: {
          rules: [{ required: true, message: '请选择门店！' }],
        },
        render() {
          const formItemProps = {
            className: 'shop-selector',
            placeholder: '请选择门店',
          };

          return <ShopSelectNative formItemProps={formItemProps} hasDefault />;
        },
      },
      {
        type: 'input',
        key: 'userCode',
        fieldProps: {
          placeholder: '帐号',
          prefix: <Icon type="user" />,
        },
        options: {
          rules: [
            {
              required: true,
              message: '帐号不能为空!',
            },
          ],
        },
      },
      {
        type: 'password',
        key: 'password',
        fieldProps: {
          placeholder: '密码',
          prefix: <Icon type="lock" />,
        },
        options: {
          initialValue: '',
          rules: [
            {
              required: true,
              message: '密码不能为空!',
            },
          ],
        },
      },
    ],
  };
}
