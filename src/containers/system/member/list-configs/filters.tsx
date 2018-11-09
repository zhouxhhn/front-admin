import React from 'react';
import ShopSelectNative from '../../../components/shop-select-native';
// import { STATUS_ON, STATUS_OFF } from '../constant';

/**
 * @returns {*} - filters
 */
export default function createFilters(): any {
  const FILTER_CONFIGS = [
    {
      formData: [
        {
          label: '姓名',
          key: 'userName',
          type: 'input',
          fieldProps: {
            placeholder: '请输入员工姓名',
          },
        },
        {
          label: '工号',
          key: 'empno',
          type: 'input',
          fieldProps: {
            placeholder: '请输入员工工号',
          },
        },
        // ！！后期需要根据“权限角色”加载可选门店！！
        {
          label: '所属门店',
          key: 'shopCode',
          type: 'react',
          render() {
            return <ShopSelectNative />;
          },
        },
        // {
        //   label: '状态',
        //   key: 'status',
        //   type: 'select',
        //   fieldProps: {
        //     options: [
        //       {
        //         label: '启用',
        //         value: STATUS_ON + '',
        //       },
        //       {
        //         label: '禁用',
        //         value: STATUS_OFF + '',
        //       },
        //     ],
        //     placeholder: '请选择状态',
        //   },
        // },
      ],
    },
  ];

  return {
    configs: FILTER_CONFIGS,
  };
}
