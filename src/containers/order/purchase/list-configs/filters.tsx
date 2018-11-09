import * as React from 'react';
import ShopSelectNative from '../../../components/shop-select-native';
import { FORMAT_DATE, FORMAT_TIME } from '../../../../utils/constant';

/**
 * createFilters
 * @param {*} props - props
 * @returns {*} - filters
 */
export default function createFilters(): any {
  const FILTER_CONFIGS = [
    {
      formData: [
        {
          label: '订单号',
          key: 'orderNo',
          type: 'input',
          fieldProps: {
            placeholder: '请输入完整的订单号',
          },
        },
        {
          label: '下单时间',
          key: 'createdAt',
          type: 'dateRange',
          fieldProps: {
            showTime: true,
            format: `${FORMAT_DATE} ${FORMAT_TIME}`,
          },
        },
        {
          label: '门店',
          key: 'shopCode',
          type: 'react',
          render() {
            return <ShopSelectNative />;
          },
        },
      ],
    },
  ];

  return {
    configs: FILTER_CONFIGS,
  };
}
