import * as React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';

/**
 * createColumns
 * @param {*} props - props
 * @returns {*} - columns
 */
export default function createColumns(): any {
  return [
    {
      title: '经销商名称',
      dataIndex: 'name',
      className: 'name',
    },
    {
      title: '经销商编码',
      dataIndex: 'code',
      className: 'code',
    },
    {
      title: '等级',
      dataIndex: 'grade',
      className: 'grade',
    },
    {
      title: '结算折扣',
      dataIndex: 'discount',
      className: 'discount',
      render(text) {
        return <span>{text ? `${text * 10}折` : '-'}</span>;
      },
    },
    {
      title: '账户余额',
      dataIndex: 'balance',
      className: 'balance',
      render(text, record) {
        return (
          <Link
            title="点击查看余额明细"
            to={`/system/agency/balance/${record.id}`}
          >
            ￥{Number.prototype.toFixed.call(+text, 2)}
          </Link>
        );
      },
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
    },
    {
      title: '联系人',
      dataIndex: 'contacts',
    },
    {
      title: '关联门店',
      dataIndex: 'shopResponseList',
      width: '200px',
      render(list) {
        return (
          <>
            {list && list.length
              ? list.map((item, index) => (
                  <Tag
                    color="#2db7f5"
                    key={item.id}
                    style={index > 0 ? { marginTop: '5px' } : null}
                  >
                    {item.name}({item.code})
                  </Tag>
                ))
              : null}
          </>
        );
      },
    },
    {
      title: 'outerCode',
      dataIndex: 'outerCode',
      align: 'center',
      render(text) {
        return <span>{text ? text : '-'}</span>;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];
}
