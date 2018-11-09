import * as React from 'react';
import { renderFormItem } from '../../../utils/tool-box';
import NumberText from '../../components/number-text';
import Uploader from '../../../components/new-uploader';
import webapi from '../../../configs/webapi';

const uploadConfigs = {
  action: webapi.files.getDomain() + '/siyue/files/fileUpload',
  data: {
    token: JSON.parse(localStorage.getItem(location.host + '.user') || '{}')
      .token,
  },
};

/**
 * getFormItemConfigs
 * @param {*} param0 props
 * @returns {*} any
 */
function getFormItemConfigs(): any {
  return [
    {
      key: 'name',
      label: '名称',
      type: 'input',
      fieldProps: {
        placeholder: '请输入经销商名称',
      },
    },
    {
      key: 'grade',
      label: '等级',
      type: 'input',
      fieldProps: {
        placeholder: '请输入等级（ 如：A ）',
      },
    },
    {
      key: 'discount',
      label: '折扣',
      type: 'react',
      render() {
        return <NumberText min={0.1} step={0.1} suffix="折" />;
      },
    },
    {
      key: 'address',
      label: '通讯地址',
      type: 'input',
      fieldProps: {
        placeholder: '请输入通讯地址',
      },
      options: {},
    },
    {
      key: 'phone',
      label: '联系电话',
      type: 'input',
      fieldProps: {
        placeholder: '请输入联系电话',
      },
      options: {},
    },
    {
      key: 'contacts',
      label: '联系人',
      type: 'input',
      fieldProps: {
        placeholder: '请输入联系人',
      },
      options: {},
    },
    {
      key: 'license',
      label: '营业执照',
      type: 'react',
      render() {
        return (
          <Uploader
            accept="image/*"
            listType="picture"
            max={1}
            type="drag"
            {...uploadConfigs}
          />
        );
      },
    },
    {
      key: 'remark',
      label: '备注',
      type: 'textarea',
      fieldProps: {
        placeholder: '请输入备注',
      },
      options: {},
    },
  ];
}

export const formStoreKeys = {
  id: '',
  name: '',
  grade: '',
  discount: 9.9,
  license: [],
  contacts: '',
  address: '',
  phone: '',
  remark: '',
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
