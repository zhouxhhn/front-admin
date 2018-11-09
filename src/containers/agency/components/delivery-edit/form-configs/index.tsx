import * as React from 'react';
import { renderFormItem } from '../../../../../utils/tool-box';
import RegionPicker from '../../../../../components/region-picker';

/**
 * getFormItemConfigs
 * @param {*} param0 props
 * @returns {*} any
 */
function getFormItemConfigs(): any {
  return [
    {
      key: 'receiverName',
      label: '联系人',
      type: 'input',
      fieldProps: {
        placeholder: '请填写联系人',
      },
    },
    {
      key: 'cellphone',
      label: '电话',
      type: 'input',
      fieldProps: {
        placeholder: '请填写联系电话',
      },
    },
    {
      key: 'addressCodes',
      label: '地址',
      type: 'react',
      render() {
        return <RegionPicker />;
      },
    },
    {
      key: 'address',
      label: '详细地址',
      type: 'textarea',
      fieldProps: {
        placeholder: '请填写详细地址',
      },
    },
    {
      key: 'defaultAddress',
      label: '设为默认',
      type: 'boolean',
    },
  ];
}

export const formStoreKeys = {
  id: '',
  name: '',
  address: '',
  phone: '',
};

/**
 * createFormConfigs
 * @param {*} props - store
 * @returns {*} - formItems
 */
export function createFormConfigs(): any {
  let formData;
  formData = getFormItemConfigs().map(item => renderFormItem(item.key, item));

  return { configs: [{ title: '', formData }] };
}
