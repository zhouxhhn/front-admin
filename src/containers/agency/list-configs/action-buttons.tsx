import * as React from 'react';
import { Button } from 'antd';
import { BalanceFormTrigger } from '../components/balance-form/index';
import { OuterCodeEditFormTrigger } from '../components/outer-code-edit';
// import Address from '../components/address';

/**
 * createActionButtons
 * @returns {*} any
 */
export default function createActionButtons({ actions }): any {
  const useSelectRowSingle = (selectedRows: any): boolean =>
    selectedRows.length === 1;

  return [
    {
      useSelectRow: useSelectRowSingle,
      render({ selectedRows, disabled }: any) {
        const trigger = {
          title: '修改余额',
          trigger: (
            <Button type="primary" disabled={disabled} className="u-mr-10">
              修改余额
            </Button>
          ),
        };
        const record = selectedRows[0] || {};

        return (
          <BalanceFormTrigger
            agencyId={record.id}
            triggerOptions={trigger}
            createSuccessCb={() => {
              actions.getList();
            }}
          />
        );
      },
    },
    {
      useSelectRow: useSelectRowSingle,
      render({ selectedRows, disabled }: any) {
        const trigger = {
          title: '更改outerCode',
          trigger: (
            <Button type="primary" disabled={disabled} className="u-mr-10">
              更改outerCode
            </Button>
          ),
        };
        const record = selectedRows[0] || {};

        return (
          <OuterCodeEditFormTrigger
            triggerOptions={trigger}
            id={record.id}
            agencyId={record.id}
            outerCode={record.outerCode || ''}
            createSuccessCb={() => {
              actions.getList();
            }}
          />
        );
      },
    },
    // {
    //   useSelectRow: useSelectRowSingle,
    //   render({ selectedRows, disabled }: any) {
    //     const trigger = (
    //       <Button type="primary" disabled={disabled}>
    //         管理配送信息
    //       </Button>
    //     );
    //     const record = selectedRows[0] || {};

    //     return (
    //       <Address isTrigger triggerOptions={{ trigger }} shopId={record.id} />
    //     );
    //   },
    // },
  ];
}
