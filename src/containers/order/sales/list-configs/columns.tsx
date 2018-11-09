import * as React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import moment from 'moment';
import { PaymentRecord } from '../../components/form-trigger';
import { FORMAT_TIME } from '../../../../utils/constant';

const align: any = 'center';

/**
 * createColumns
 * @param {*} props - props
 * @returns {*} - columns
 */
export default function createColumns(): any {
  return [
    {
      title: '订单号',
      dataIndex: 'no',
      className: 'no',
      width: '150px',
      render(text, record) {
        return (
          <div className="u-pr">
            <span>{text ? text : '-'}</span>
            {record.return ? (
              <Tag
                color="red"
                className="u-f10 u-pa"
                style={{
                  top: '-20px',
                  padding: '0 5px',
                  backgroundColor: '#fff',
                  borderRadius: '100%',
                }}
              >
                退
              </Tag>
            ) : null}
          </div>
        );
      },
    },
    {
      title: '会员',
      dataIndex: 'member',
    },
    {
      title: '门店',
      dataIndex: 'shopName',
      className: 'shopName',
      width: '120px',
    },
    {
      title: '经销商',
      dataIndex: 'agencyName',
      className: 'agencyName',
      width: '150px',
    },
    {
      title: '下单时间',
      dataIndex: 'createdAt',
      className: 'createdAt',
      width: '140px',
      render(text) {
        return text ? <span>{moment(text).format(FORMAT_TIME)}</span> : null;
      },
    },
    {
      title: '应付金额',
      dataIndex: 'payableAmount',
    },
    {
      title: '已付金额',
      dataIndex: 'paidAmount',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      className: 'status',
    },
    {
      title: '导购员',
      dataIndex: 'salerName',
    },
    {
      title: '操作员',
      dataIndex: 'createrName',
    },
    {
      title: '备注',
      dataIndex: 'note',
      align,
      width: '200px',
      render(text, record) {
        return (
          <div className="u-text-center" style={{ maxWidth: '250px' }}>
            {text ? <p>{text}</p> : ''}
            {record.adminNote ? (
              <p>
                管理员：
                {record.adminNote}
              </p>
            ) : null}
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: '',
      width: '180px',
      render(text, record) {
        return (
          <span>
            <PaymentRecord
              triggerOptions={{
                title: '支付记录',
                trigger: <a>支付记录</a>,
                width: '60%',
                footer: null,
              }}
            />
            {record.return ? (
              <span>
                <span className="ant-divider" />
                <Link
                  to={{
                    pathname: `/order/salesReturn`,
                  }}
                >
                  退货记录
                </Link>
              </span>
            ) : null}
            <span className="ant-divider" />
            <Link
              to={{
                pathname: `/order/sales/detail/${record.no}`,
                state: { page: 'order' },
              }}
            >
              查看详情
            </Link>
          </span>
        );
      },
    },
  ];
}
