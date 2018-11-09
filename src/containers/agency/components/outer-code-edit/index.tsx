import {
  getStoreAndActions,
  createFormTrigger,
} from '@sipin/siyue-admin-components';
import Action from './action';
import webapi from '../../../../configs/webapi';
import isSuccess from '../../../../utils/is-success';

const apis = {
  update: async (id, params, cb) => {
    const res = await webapi.salesMember.salesAgencyUpdateOuterCode.call(
      webapi.salesMember,
      id,
      params
    );
    isSuccess(res) && setTimeout(() => cb(), 200);

    return res;
  },
};

const formStoreKeys = {
  outerCode: '',
};

/**
 * formConfigs
 *
 * @returns {*} any
 */
function formConfigs(): any {
  const formData: any = [
    {
      type: 'input',
      label: 'outerCode',
      key: 'outerCode',
      fieldProps: {
        placeholder: '请填写outerCode',
      },
      options: {
        rules: [{ required: true, message: 'outerCode不能为空' }],
      },
    },
  ];

  const configs = {
    configs: [
      {
        formData,
      },
    ],
  };

  return configs;
}

const { store } = getStoreAndActions({ formStoreKeys, apis });

export const OuterCodeEditFormTrigger = createFormTrigger({
  store,
  actions: new Action({ apis: apis, ...store }),
  formStoreKeys,
  formConfigs,
  apis,
  getApisAdditionalParams({ agencyId, outerCode, createSuccessCb }) {
    return {
      agencyId,
      outerCode,
      createSuccessCb,
    };
  },
});
