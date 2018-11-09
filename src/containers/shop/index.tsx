import * as React from 'react';
import { Button } from 'antd';
import { createCompositeList } from '@sipin/siyue-admin-components';
import getLayout from '../../components/layout';
import webapi from '../../configs/webapi';
import { renderInput } from '../../components/render-input';
import { Action } from './action';
import AgencySelect from '../components/agency-select';
import Address from '../agency/components/address';
import { SourceIdEditFormTrigger } from './components/source-id-edit';

const apis = {
  getList: webapi.salesMember.salesShopIndexShop.bind(webapi.salesMember),
  create: webapi.salesMember.salesShopAddShop.bind(webapi.salesMember),
  update: webapi.salesMember.salesShopUpdateShop.bind(webapi.salesMember),
  remove: webapi.salesMember.salesShopDeleteShop.bind(webapi.salesMember),
};

/**
 * @param {*} props props
 * @returns {*} any
 */
function listConfigs({ actions }): any {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      className: 'name',
    },
    {
      title: '编码',
      dataIndex: 'code',
      className: 'code',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      className: 'phone',
    },
    {
      title: '地址',
      dataIndex: 'address',
      className: 'address',
    },
    {
      title: '关联经销商',
      className: 'agencyName',
      render(record) {
        return (
          <>
            {record.agencyName}({record.agencyCode})
          </>
        );
      },
    },
    {
      title: 'sourceId',
      dataIndex: 'sourceId',
      align: 'center',
      render(text) {
        return <span>{text ? text : '-'}</span>;
      },
    },
  ];

  const tableConfig = {
    columns,
    rowSelection: true, // 是否出现选择框
    pagination: true,
  };

  const filters = {
    configs: [
      {
        formData: [
          {
            type: 'input',
            label: '门店名称',
            key: 'name',
            fieldProps: {
              placeholder: '请输入门店名称',
            },
          },
          {
            type: 'input',
            label: '门店编码',
            key: 'code',
            fieldProps: {
              placeholder: '请输入完整的门店编码',
            },
          },
          {
            type: 'input',
            label: '所属经销商',
            key: 'agencyName',
            fieldProps: {
              placeholder: '请输入门店所属经销商',
            },
          },
        ],
      },
    ],
  };

  const actionButtons = [
    {
      useSelectRow: (selectedRows: any): boolean => selectedRows.length === 1,
      render({ selectedRows, disabled }: any) {
        const trigger = (
          <Button type="primary" disabled={disabled}>
            管理配送信息
          </Button>
        );
        const record = selectedRows[0] || {};

        return (
          <Address isTrigger triggerOptions={{ trigger }} shopId={record.id} />
        );
      },
    },
    {
      useSelectRow: (selectedRows: any): boolean => selectedRows.length === 1,
      render({ selectedRows, disabled }: any) {
        const trigger = {
          title: '更改sourceId',
          trigger: (
            <Button type="primary" disabled={disabled} className="u-ml-10">
              更改sourceId
            </Button>
          ),
        };
        const record = selectedRows[0] || {};

        return (
          <SourceIdEditFormTrigger
            triggerOptions={trigger}
            id={record.id}
            shopId={record.id}
            sourceId={record.sourceId}
            createSuccessCb={() => {
              actions.getList();
            }}
          />
        );
      },
    },
  ];

  return {
    table: tableConfig,
    filters,
    actionButtons,
  };
}

/**
 * @returns {*} any
 */
function formConfigs(): any {
  const formData = [
    renderInput('名称', 'name'),
    renderInput('地址', 'address'),
    renderInput('电话', 'phone', 'input'),
    {
      type: 'react',
      label: '所属经销商',
      key: 'agency',
      render() {
        return <AgencySelect returnType="record" />;
      },
      options: {
        rules: [{ required: true, message: '请选择门店所属经销商' }],
      },
    },
  ];

  return { configs: [{ formData }] };
}
const formStoreKeys = {
  id: '',
  name: '',
  code: '',
  address: '',
  phone: '',
  agency: '',
};

const List = createCompositeList({
  listConfigs,
  formConfigs,
  formStoreKeys,
  apis,
  Action,
});

export default getLayout('门店管理', List);
