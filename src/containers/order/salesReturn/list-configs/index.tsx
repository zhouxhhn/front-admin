import * as React from 'react';
import { Tag, Divider } from 'antd';
import { List } from '@sipin/siyue-admin-components';
import { toJS } from 'mobx';
import nanoid from 'nanoid';
import createColumns from './columns';
import createFilters from './filters';
import {
  STATUS_PENDING_PAY,
  STATUS_SUCCESS_PAY,
  STATUS_DONE,
} from '../../../../utils/common-status';
import { TAGS } from '../../components/detail/constant';

/**
 * @param {*} props - props
 * @returns {*} - *
 */
export default function createListConfigs(props): any {
  const { actions } = props;

  const handleRowClick = (record: any): void =>
    actions.setData({
      expandedRowKey: actions.expandedRowKey === record.id ? '' : record.id,
    });

  return {
    table: {
      columns: createColumns(),
      rowSelection: false,
      pagination: true,
      expandedRowRender(record) {
        const align: any = 'center';
        const tableConfig = {
          columns: [
            {
              title: '商品名称',
              dataIndex: 'name',
              align,
            },
            {
              title: 'SKU',
              dataIndex: 'skuSn',
              align,
            },
            {
              title: '属性',
              dataIndex: 'specification',
              align,
              render(text, record) {
                return (
                  <span>
                    规格：
                    {text.trim() ? text : '无'}
                    <Divider type="vertical" /> 颜色：
                    {record.color.trim() ? record.color : '无'}
                    <Divider type="vertical" /> 材质：
                    {record.texture.trim() ? record.texture : '无'}
                  </span>
                );
              },
            },
            {
              title: '售价',
              dataIndex: 'amount',
              align,
            },
            {
              title: '',
              dataIndex: '',
              align,
              render(text, record) {
                return (
                  <span>
                    {Object.keys(TAGS).map(
                      item =>
                        record[item] ? (
                          <Tag color={TAGS[item].color} key={TAGS[item].color}>
                            {TAGS[item].name}
                          </Tag>
                        ) : null
                    )}
                  </span>
                );
              },
            },
            {
              title: '退货数量',
              dataIndex: 'quantity',
              align,
            },
            {
              title: '退货金额',
              dataIndex: 'refund',
              align,
            },
          ],
          rowKey: record => record.id || nanoid(),
          dataSource: toJS(record.orderDetailList),
          pagination: false,
        };

        return <List table={tableConfig} />;
      },
      expandRowByClick: true,
      expandedRowKeys: [actions.expandedRowKey],
      onExpand: (expanded, record) => handleRowClick(record),
      onRow: record => {
        return {
          onClick: () => handleRowClick(record),
        };
      },
    },
    tabs: {
      activeKey: actions.activeKey,
      options: [
        {
          label: '全部',
          value: '',
        },
        {
          label: '待审核',
          value: STATUS_PENDING_PAY,
        },
        {
          label: '已审核',
          value: STATUS_SUCCESS_PAY,
        },
        {
          label: '已取消',
          value: STATUS_DONE,
        },
      ],
      onChange(key) {
        actions.getList({
          apisAdditionalParams: { statusId: key },
        });
        actions.setData({ activeKey: key });
      },
    },
    filters: createFilters(),
  };
}
