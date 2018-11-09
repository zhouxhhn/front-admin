import * as React from 'react';
import { List } from '@sipin/siyue-admin-components';
import nanoid from 'nanoid';
import { renderFormItem } from '../../../../utils/tool-box';

const align: any = 'center';

const columns = [
  {
    title: '交易流水号',
    dataIndex: 'no',
    key: 'no',
    align,
  },
  {
    title: '交易时间',
    dataIndex: 'time',
    key: 'time',
    align,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align,
  },
  {
    title: '交易方式',
    dataIndex: 'method',
    key: 'method',
    align,
  },
  {
    title: '交易金额',
    dataIndex: 'amount',
    key: 'amount',
    align,
  },
  {
    title: '操作员',
    dataIndex: 'operatorName',
    key: 'operatorName',
    align,
  },
];

/**
 *
 * @param {*} dataSource data
 * @returns {*} -
 */
function createTableConfig(dataSource = []): any {
  return {
    columns,
    rowKey: r => r.id || nanoid(),
    rowSelection: false,
    dataSource,
  };
}

const formConfigsDelivery = [
  {
    key: 'payment',
    label: null,
    type: 'react',
    formItemProps: {
      wrapperCol: { span: 24 },
    },
    render(text, record) {
      /*eslint-disable*/
      console.log(record);

      return <List table={createTableConfig(record)} />;
    },
  },
];

export const formStoreKeysDelivery = {
  payment: '',
};

/**
 *
 * @param {*} props - props
 * @returns {*} - *
 */
export function createFormConfigsDelivery(): any {
  return {
    configs: [
      {
        formData: formConfigsDelivery.map(item =>
          renderFormItem(item.key, item)
        ),
      },
    ],
  };
}
