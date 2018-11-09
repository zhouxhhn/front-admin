import * as React from 'react';
import ShopSelect from '../../components/shop-select';
import { renderInput } from '../../../components/render-input';
import { STATUS_OPTIONS, CHILDREN_SYSTEM, TYPE } from './constant';
import getUserData from '../../../utils/get-user-data';

export const formStoreKeys = {
  id: '',
  childrenSystem: '',
  name: '',
  scope: '',
  status: '',
  type: '1',
};

/**
 * @returns {*} any
 */
export function formConfigs({ store: { id, type } }): any {
  const currentUser = getUserData();
  const formData = [
    renderInput('名称', 'name'),
    {
      type: 'radioGroup',
      label: '子系统',
      key: 'childrenSystem',
      fieldProps: {
        options: CHILDREN_SYSTEM,
        disabled: !!id,
      },
      options: {
        rules: [
          {
            required: true,
            message: `状态不能为空!`,
          },
        ],
      },
    },
    {
      type: 'radioGroup',
      label: '状态',
      key: 'status',
      fieldProps: {
        options: STATUS_OPTIONS,
      },
      options: {
        rules: [
          {
            required: true,
            message: `状态不能为空!`,
          },
        ],
      },
    },
    {
      type: 'radioGroup',
      label: '类型',
      key: 'type',
      fieldProps: {
        options: Object.entries(TYPE).map(item => ({
          label: item[1],
          value: item[0],
        })),
        disabled: currentUser.type === '0' || !!id,
      },
      options: {
        rules: [
          {
            required: true,
            message: `状态不能为空!`,
          },
        ],
      },
    },
    currentUser.type === '1' &&
      type == '1' && {
        type: 'react',
        label: '可用范围',
        key: 'scope',
        options: {
          rules: [
            {
              required: true,
              message: `可用范围不能为空!`,
            },
          ],
        },
        render() {
          return <ShopSelect returnType="record" />;
        },
      },
  ].filter(Boolean);

  return { configs: [{ formData }] };
}
