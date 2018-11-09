import * as React from 'react';
import moment from 'moment';
import Permission from './permission';
import useSingleRow from '../../../utils/use-single-row';
import { STATUS_ON, TYPE, SYSTEM_BACKEND } from './constant';

import { FORMAT_TIME } from '../../../utils/constant';

/**
 *
 * role list
 * @returns {*} any
 */
export default function listConfigs(): any {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      className: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      className: 'name',
    },
    {
      title: '编号',
      dataIndex: 'code',
      className: 'code',
    },
    {
      title: '子系统',
      dataIndex: 'childrenSystem',
      className: 'childrenSystem',
      render(text) {
        return <span>{text == SYSTEM_BACKEND ? '后台' : '前台'}</span>;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      className: 'type',
      render(type) {
        return <span>{TYPE[type]}</span>;
      },
    },
    {
      title: '可用范围',
      dataIndex: 'salesShop.name',
      className: 'shopName',
      align: 'center',
      render(text) {
        return <>{text ? (text === STATUS_ON ? '启用' : '禁用') : '-'}</>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      className: 'status',
      render(text) {
        return <>{text === STATUS_ON ? '启用' : '禁用'}</>;
      },
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render(text) {
        return text ? <span>{moment(text).format(FORMAT_TIME)}</span> : null;
      },
    },
  ];

  const tableConfig = {
    columns,
    rowSelection: true, // 是否出现选择框
    pagination: true,
  };

  // const filters = {
  //   configs: [
  //     {
  //       formData: [
  //         {
  //           type: 'input',
  //           label: '名称',
  //           key: 'name',
  //         },
  //       ],
  //     },
  //   ],
  // };

  const actionButtons = [
    {
      useSelectRow: useSingleRow,
      render({ selectedRows: [seleted = {}], disabled }: any) {
        return (
          <Permission
            roleId={seleted.id}
            type={seleted.childrenSystem == 0 ? 'front' : 'back'}
            disabled={disabled}
          />
        );
      },
    },
  ];

  return {
    table: tableConfig,
    actionButtons,
  };
}
