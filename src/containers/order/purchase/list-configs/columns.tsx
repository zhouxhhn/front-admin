import * as React from 'react';
import { Link } from 'react-router-dom';
// import { Divider } from 'antd';
import moment from 'moment';
// import { DeliveryEdit } from '../components/form-trigger/index';
import STATUS from '../../../../utils/common-status';
import { FORMAT_TIME } from '../../../../utils/constant';

/**
 * createColumns
 * @param {*} props - props
 * @returns {*} - columns
 */
export default function createColumns(/*props*/): any {
  return [
    {
      title: '订单号',
      dataIndex: 'no',
      className: 'orderNo',
    },
    {
      title: '门店名称',
      dataIndex: 'shopName',
      className: 'shopName',
      render(text, record) {
        return <span>{text ? text : record.shopCode}</span>;
      },
    },
    {
      title: '经销商',
      dataIndex: 'agencyName',
    },
    {
      title: '下单时间',
      dataIndex: 'createdAt',
      className: 'createdAt',
      render(text) {
        return <span>{text ? moment(text).format(FORMAT_TIME) : ''}</span>;
      },
    },
    {
      title: '应付金额',
      dataIndex: 'payableAmount',
    },
    {
      title: '已付金额',
      dataIndex: 'paidAmount',
      render(text) {
        return <span>{text || 0}</span>;
      },
    },
    {
      title: '订单状态',
      dataIndex: 'statusId',
      className: 'status',
      render(text) {
        return <span>{STATUS[text]}</span>;
      },
    },
    {
      title: '操作员',
      dataIndex: 'auditorName',
    },
    {
      title: '备注',
      dataIndex: 'note',
      align: 'center',
      render(text) {
        return (
          <div className="u-text-center" style={{ maxWidth: '260px' }}>
            {text}
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: '',
      render(record) {
        return (
          <span>
            <Link to={`/order/purchase/detail/${record.no}`}>查看详情</Link>
            {/* <Divider type="vertical" />
            <DeliveryEdit id="id" /> */}
            {/* <Divider type="vertical" />
            <a onClick={() => false}>关闭交易</a> */}
          </span>
        );
      },
    },
  ];
}
