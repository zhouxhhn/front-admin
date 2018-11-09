import * as React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FORMAT_TIME } from '../../../../utils/constant';
import { PaymentRecord } from '../../components/form-trigger';

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
      width: '180px',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      className: 'createdAt',
      width: '140px',
      render(text) {
        return text ? <span>{moment(text).format(FORMAT_TIME)}</span> : null;
      },
    },
    {
      title: '退款金额',
      dataIndex: 'refund',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      className: 'status',
    },
    {
      title: '操作员',
      dataIndex: 'operatorName',
    },
    {
      title: '退款原因',
      dataIndex: 'reason',
      align,
      width: '250px',
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
      align: 'center',
      render(record) {
        return (
          <span>
            <Link
              to={{
                pathname: `/order/salesReturn/detail/${record.no}`,
                state: { page: 'order' },
              }}
            >
              查看详情
            </Link>
            <div className="ant-divider" />
            <PaymentRecord
              triggerOptions={{
                title: '支付记录',
                trigger: <a>支付记录</a>,
                width: '60%',
                footer: null,
              }}
            />
          </span>
        );
      },
    },
  ];
}
