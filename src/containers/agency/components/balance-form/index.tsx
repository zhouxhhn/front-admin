import {
  getStoreAndActions,
  createFormTrigger,
} from '@sipin/siyue-admin-components';
import webapi from '../../../../configs/webapi';
import { BALANCE_OPTIONS } from './constant';

const apis = {
  create: webapi.salesMember.salesAgencyUpdateBalance.bind(webapi.salesMember),
};

/**
 * formStoreKeys
 */
const formStoreKeys = {
  amount: undefined,
  operateType: 'add',
};

/**
 * formConfigs
 *
 * @returns {*} any
 */
function formConfigs(): any {
  const baseFormData: any = [
    {
      type: 'radioGroup',
      label: '类型',
      key: 'operateType',
      fieldProps: {
        options: BALANCE_OPTIONS,
      },
      options: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      type: 'number',
      label: '金额',
      key: 'amount',
      fieldProps: {
        placeholder: '必填',
        min: 0,
        step: 0.01,
      },
      options: {
        rules: [
          {
            required: true,
            message: '金额不能为空!',
          },
        ],
      },
    },
  ];
  const formData: any = [].concat(baseFormData);
  const configs = {
    configs: [
      {
        formData,
      },
    ],
    actionButtons: [],
  };

  return configs;
}

const { store, actions } = getStoreAndActions({ formStoreKeys, apis });

export const BalanceFormTrigger = createFormTrigger({
  store,
  actions,
  formStoreKeys,
  formConfigs,
  apis,
  getApisAdditionalParams({ agencyId }) {
    return {
      agencyId,
    };
  },
  transformCreateParams(params, { agencyId }) {
    return [agencyId, params];
  },
});
