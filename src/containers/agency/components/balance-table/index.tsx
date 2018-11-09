import * as React from 'react';
import { Button } from 'antd';
import { createCompositeList } from '@sipin/siyue-admin-components';
import { createHashHistory } from 'history';
import moment from 'moment';
import Action from './action';
import webapi from '../../../../configs/webapi';
import { TYPE } from '../../constant';

const apis = {
  getList: async (id, params) =>
    await webapi.salesMember.salesAgencyGetBalance(id, params),
};

/**
 * listConfigs
 * @returns {*} any
 */
function listConfigs(): any {
  const columns = [
    {
      title: '发生时间',
      dataIndex: 'createAt',
      render(text) {
        return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>;
      },
    },
    {
      title: '业务',
      dataIndex: 'smallType',
      render(text) {
        return <span>{text ? TYPE[text] : '暂无记录'}</span>;
      },
    },
    {
      title: '商户订单号',
      dataIndex: 'orderNo',
      render(text) {
        return <span>{text ? text : '暂无记录'}</span>;
      },
    },
    {
      title: '交易流水号',
      dataIndex: 'serialNo',
      render(text) {
        return <span>{text ? text : '暂无记录'}</span>;
      },
    },
    {
      title: '操作人',
      dataIndex: 'operator',
    },
    {
      title: '发生金额',
      dataIndex: 'balance',
    },
    {
      title: '期末余额',
      dataIndex: 'terminalBalance',
    },
  ];

  const tableConfig = {
    columns,
    rowSelection: false, // 是否出现选择框
    pagination: true,
  };

  const actionButtons = [
    {
      title: '',
      render() {
        return <Button className="u-hidden u-op-0" />;
      },
    },
    {
      title: '',
      render() {
        return (
          <div className="u-pa u-inline-block" style={{ right: 20 }}>
            <Button type="primary" onClick={() => createHashHistory().goBack()}>
              返回列表
            </Button>
          </div>
        );
      },
    },
  ];

  return {
    table: tableConfig,
    actionButtons,
  };
}

export default createCompositeList({
  listConfigs,
  apis,
  Action,
  getApisAdditionalParams: p => p,
});
