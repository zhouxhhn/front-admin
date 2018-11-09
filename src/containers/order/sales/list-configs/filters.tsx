import * as React from 'react';
import ShopSelectNative from '../../../components/shop-select-native';

/**
 * @param {*} props - props
 * @returns {*} - filters
 */
export default function createFilters(): any {
  const FILTER_CONFIGS = [
    {
      formData: [
        {
          label: '订单号',
          key: 'no',
          type: 'input',
          fieldProps: {
            placeholder: '请输入完整的订单号',
          },
        },
        {
          label: '下单时间',
          key: 'createdAt',
          type: 'date',
          fieldProps: {
            // showTime: true,
          },
          formItemProps: {
            style: {
              width: '25%',
            },
          },
        },
        {
          label: '门店',
          key: 'shopCode',
          type: 'react',
          render() {
            return <ShopSelectNative />;
          },
          formItemProps: {
            labelCol: { span: 3 },
          },
        },
      ],
    },
  ];

  return {
    configs: FILTER_CONFIGS,
  };
}
