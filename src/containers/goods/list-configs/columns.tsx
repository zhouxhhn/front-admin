import * as React from 'react';
import { Tag } from 'antd';
import { goodsStatus, goodsForbidStatus } from '../constant';

/**
 * createColumns
 * @param {*} props - props
 * @returns {*} - columns
 */
export default function createColumns(): any {
  return [
    {
      title: '商品编码',
      dataIndex: 'number',
      className: 'skuNo',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      className: 'name',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      className: 'skuSn',
    },
    {
      title: '分类（SPU）',
      dataIndex: 'spu',
    },
    {
      title: '属性规格',
      dataIndex: 'specification',
      render(text, record) {
        return (
          <span>
            规格：
            {text.trim() ? text : '无'}
            ；颜色：
            {record.color.trim() ? record.color : '无'}
            ；材质：
            {record.texture.trim() ? record.texture : '无'}
          </span>
        );
      },
    },
    {
      title: '指导单价',
      dataIndex: 'amount',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(value) {
        return (
          <Tag color={['magenta', 'orange', 'lime', 'blue', 'purple'][value]}>
            {goodsStatus[value]}
          </Tag>
        );
      },
    },
    {
      title: '是否禁用',
      dataIndex: 'forbidStatus',
      className: 'status',
      render(value) {
        return (
          value !== null && (
            <Tag color={['red', 'green'][value]}>
              {goodsForbidStatus[value]}
            </Tag>
          )
        );
      },
    },
  ];
}
