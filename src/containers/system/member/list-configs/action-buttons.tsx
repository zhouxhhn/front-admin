import * as React from 'react';
import { Button } from 'antd';
import { toJS } from 'mobx';
import { RolesFormTrigger } from '../components/roles-form-trigger';
import { ACTIVATE_ON } from '../constant';

/**
 * createActionButtons
 * @returns {*} any
 */
export default function createActionButtons({ actions }): any {
  return [
    {
      useSelectRow: r => r.length === 1,
      render({ selectedRows }: any) {
        const data = [...toJS(selectedRows)];
        const text = data.length
          ? data[0].status === ACTIVATE_ON
            ? '禁用'
            : '启用'
          : '启/禁用';
        const disabled = data.length !== 1;
        const { id = '' } = data[0] || {};

        return (
          <Button
            type="primary"
            className="u-mr-10"
            disabled={disabled}
            onClick={() => data && actions.changeStatus(id)}
          >
            {text}
          </Button>
        );
      },
    },
    {
      useSelectRow: r => r.length === 1,
      render({ selectedRows }: any) {
        const data = [...toJS(selectedRows)];
        const text = '绑定角色';
        const disabled = data.length !== 1;
        const { id = '' } = data[0] || {};

        return (
          <RolesFormTrigger
            id={id}
            callback={() => actions.getList.call(actions)}
            triggerOptions={{
              title: text,
              trigger: (
                <Button type="primary" className="u-mr-10" disabled={disabled}>
                  {text}
                </Button>
              ),
            }}
          />
        );
      },
    },
  ];
}
