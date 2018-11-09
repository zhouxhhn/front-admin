import * as React from 'react';
// import { toJS } from 'mobx';
import ShopSelectNative from '../../../components/shop-select-native';
import { renderFormItem } from '../../../../utils/tool-box';
import {
  TYPE_SHOP_ADMIN,
  TYPE_SYSTEM_ADMIN /*, ACTIVATE_OFF */,
} from '../constant';

/**
 * getFormItemConfigs
 * @param {*} props props
 * @returns {*} any
 */
function getFormItemConfigs({ /*actions,*/ store }): any {
  // const roleList = toJS(actions.roleList);

  return [
    {
      key: 'type',
      label: '类型',
      type: 'select',
      fieldProps: {
        placeholder: '请选择类型',
        disabled: !!store.id,
        options: [
          { label: '门店管理员', value: TYPE_SHOP_ADMIN + '' },
          { label: '系统管理员', value: TYPE_SYSTEM_ADMIN + '' },
        ],
      },
    },
    // ！！后期需要根据“权限角色”加载可选门店！！
    store.type !== TYPE_SYSTEM_ADMIN + '' && {
      key: 'shopCode',
      label: '所属门店',
      type: 'react',
      render() {
        return <ShopSelectNative />;
      },
      fieldProps: {
        disabled: !!store.id,
        placeholder: '请选择员工所属门店',
      },
    },
    {
      key: 'name',
      label: '姓名',
      type: 'input',
      fieldProps: {
        placeholder: '请输入员工姓名',
      },
    },
    {
      key: 'empno',
      label: '工号',
      type: 'input',
      fieldProps: {
        placeholder: '请输入员工工号',
      },
    },
    {
      key: 'password',
      label: '登录密码',
      type: 'input',
      fieldProps: {
        placeholder: '请输入登录密码',
      },
    },
    // roleList.length && {
    //   key: 'roles',
    //   label: '权限角色',
    //   type: 'select',
    //   fieldProps: {
    //     mode: 'multiple',
    //     disabled: !store.id,
    //     options: roleList.map(item => ({
    //       label: item.name,
    //       value: item.id,
    //       disabled:
    //         +item.status === ACTIVATE_OFF ||
    //         store.roles.some(name => name === item.name),
    //     })),
    //     placeholder: '请选择权限角色',
    //   },
    //   ...(store.id ? {} : { options: {} }),
    //   formItemProps: {
    //     extra: store.id ? '' : '请先添加员工再配置权限！',
    //   },
    // },
  ].filter(Boolean);
}

export const formStoreKeys = {
  id: '',
  type: '',
  shopCode: '',
  name: '',
  empno: '',
  password: '',
  roles: [],
};

/**
 * createFormConfigs
 * @param {*} props - store
 * @returns {*} - formItems
 */
export function createFormConfigs(props): any {
  let formData;

  formData = getFormItemConfigs(props).map(item =>
    renderFormItem(item.key, item)
  );

  return { configs: [{ title: '员工信息', formData }] };
}
