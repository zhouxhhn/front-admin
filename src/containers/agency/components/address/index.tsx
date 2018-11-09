import * as React from 'react';
import { toJS } from 'mobx';
import { Tag, message, Button } from 'antd';

import { createCompositeList } from '@sipin/siyue-admin-components';
import webapi from '../../../../configs/webapi';
import { renderInput } from '../../../../components/render-input';
import { Action } from './action';
import isSuccess from '../../../../utils/is-success';
import RegionPicker from '../../../../components/region-picker';
import { ADDRESS_DEFAULT_YES } from './constant';

const apis = {
  getList: webapi.salesMember.salesAgencyDeliveryIndex.bind(webapi.salesMember),
  getItem: webapi.salesMember.salesAgencyDeliverySearchAddress.bind(
    webapi.salesMember
  ),
  create: webapi.salesMember.salesAgencyDeliveryAddAddress.bind(
    webapi.salesMember
  ),
  update: webapi.salesMember.salesAgencyDeliveryUpdateAddress.bind(
    webapi.salesMember
  ),
  remove: webapi.salesMember.salesAgencyDeliveryDeleteAddress.bind(
    webapi.salesMember
  ),
};

/**
 * listConfigs
 * @param {*} props props
 * @returns {*} any
 */
function listConfigs({ actions, shopId }): any {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      className: 'id',
    },
    {
      title: '收货人',
      dataIndex: 'receiverName',
      className: 'receiverName',
    },
    {
      title: '号码',
      dataIndex: 'cellphone',
      className: 'cellphone',
    },
    {
      title: '地址',
      className: 'address',
      render(record) {
        let tag: any = null;
        if (record.defaultAddress === ADDRESS_DEFAULT_YES) {
          tag = <Tag color="magenta">默认</Tag>;
        }

        return (
          <>
            {tag} {record.fullAddress}
          </>
        );
      },
    },
  ];

  const tableConfig = {
    columns,
    rowSelection: true, // 是否出现选择框
    pagination: false,
  };

  const checkSelectRow = (selectedRows: any): boolean => {
    actions.setData({
      btnText:
        selectedRows.length &&
        selectedRows[0].defaultAddress === ADDRESS_DEFAULT_YES
          ? '取消默认'
          : '设为默认',
    });

    return selectedRows.length === 1 && toJS(actions.list.ids).length > 1;
  };

  const actionButtons = [
    {
      title: actions.btnText,
      popconfirm: `确定要${actions.btnText}地址？`,
      useSelectRow: checkSelectRow,
      async onClick(selectedRows) {
        const record = { ...toJS(selectedRows[0]) };
        const res = await actions.setDefault(record.id);
        if (isSuccess(res)) {
          message.success('设置成功');
          actions.getList({ apisAdditionalParams: { shopId } });
        } else {
          message.error('设置失败');
        }
      },
    },
  ];

  return {
    table: tableConfig,
    actionButtons,
  };
}

const formItemOps = {
  rules: [
    {
      required: true,
      message: `地区不能为空!`,
    },
  ],
};

/**
 * @returns {*} any
 */
function formConfigs({ store }): any {
  const formData = [
    renderInput('收货人', 'receiverName'),
    renderInput('电话', 'cellphone', 'input'),
    {
      type: 'react',
      label: '地区',
      key: 'region',
      options: formItemOps,
      render() {
        return <RegionPicker />;
      },
    },
    renderInput('详细地址', 'address', 'input'),
    !store.id && {
      type: 'checkbox',
      key: 'defaultAddress',
      label: '设为默认地址',
    },
  ].filter(Boolean);

  return { configs: [{ formData }] };
}
const formStoreKeys = {
  id: '',
  receiverName: '',
  region: '',
  address: '',
  cellphone: '',
  defaultAddress: '',
};

const Address = createCompositeList({
  listConfigs,
  formConfigs,
  formStoreKeys,
  apis,
  Action,
  getApisAdditionalParams({ shopId }) {
    return { shopId };
  },
  triggerOptions: {
    title: '管理配送信息',
    trigger: <Button type="primary">管理配送信息</Button>,
    width: '800px',
  },
});

export default Address;
