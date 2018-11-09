import * as React from 'react';
import { Button } from 'antd';
import { createModalSelect } from '@sipin/siyue-admin-components';
import { Action } from './action';
import webapi from '../../../configs/webapi';

const apis = {
  getList: webapi.salesMember.salesAgencyIndexAgency.bind(webapi.salesMember),
  getItem: webapi.salesMember.salesAgencySearchAgency.bind(webapi.salesMember),
};
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: 'Code',
    dataIndex: 'code',
  },
];
const AgencySelect = createModalSelect({
  apis,
  columns,
  Action,
  triggerOptions: {
    title: '选择经销商',
    trigger: <Button type="primary">选择经销商</Button>,
  },
});

export default AgencySelect;
