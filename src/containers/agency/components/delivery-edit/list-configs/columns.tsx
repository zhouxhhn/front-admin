import * as React from 'react';
import { Tag, Divider } from 'antd';

const align: any = 'center';

/**
 * createColumns
 * @param {*} props - props
 * @returns {*} - columns
 */
export default function createColumns(): any {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      align,
    },
    {
      title: '配送详情',
      dataIndex: '',
      align,
      render(text, record) {
        return (
          <>
            {record.defaultAddress ? (
              <span>
                <Tag color="blue">默认</Tag>
                <Divider type="vertical" />
              </span>
            ) : null}
            {record.receiverName ? (
              <span>
                {record.receiverName}
                <Divider type="vertical" />
              </span>
            ) : null}
            {record.cellphone ? (
              <span>
                {record.cellphone}
                <Divider type="vertical" />
              </span>
            ) : null}
            {record.fullAddress ? <span>{record.fullAddress}</span> : null}
          </>
        );
      },
    },
  ];
}
