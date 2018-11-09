import * as React from 'react';
import { Tag } from 'antd';
import {
  ACTIVATE_ON,
  TYPE_SYSTEM_ADMIN,
  TAGS,
  TYPE_SHOP_ADMIN,
} from '../constant';

const align: any = 'center';

/**
 * createColumns
 * @param {*} props - props
 * @returns {*} - columns
 */
export default function createColumns(): any {
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      className: 'name',
    },
    {
      title: '员工编号',
      dataIndex: 'code',
      className: 'code',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render(text) {
        return (
          <span>
            {text === TYPE_SYSTEM_ADMIN ? (
              <Tag color={TAGS[TYPE_SYSTEM_ADMIN]}>系统管理员</Tag>
            ) : (
              <Tag color={TAGS[TYPE_SHOP_ADMIN]}>门店管理员</Tag>
            )}
          </span>
        );
      },
    },
    {
      title: '工号',
      dataIndex: 'empno',
      className: 'empno',
    },
    {
      title: '状态',
      dataIndex: 'status',
      className: 'status',
      render(text) {
        return <span>{text === ACTIVATE_ON ? '已启用' : '已禁用'}</span>;
      },
    },
    {
      title: '权限角色',
      dataIndex: 'roleList',
      className: 'roleList',
      align,
      render(list) {
        return (
          <>
            {list.length
              ? list.map(item => <p key={item.id}>{item.name}</p>)
              : '-'}
          </>
        );
      },
    },
    {
      title: '所属门店',
      dataIndex: 'shopName',
      className: 'shopName',
    },
  ];
}
