import * as React from 'react';
import { Button } from 'antd';
import { createModalSelect } from '@sipin/siyue-admin-components';
import { Action } from './action';
import webapi from '../../../configs/webapi';

const apis = {
  getList: webapi.salesMember.salesShopIndexShop.bind(webapi.salesMember),
  getItem: webapi.salesMember.salesShopSearchShop.bind(webapi.salesMember),
};

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: 'code',
    dataIndex: 'code',
  },
];
const ShopSelect = createModalSelect({
  apis,
  columns,
  Action,
  triggerOptions: {
    title: '选择门店',
    trigger: <Button type="primary">选择门店</Button>,
  },
  // mapping: {
  //   id: 'shopId',
  // },
});

export default ShopSelect;
