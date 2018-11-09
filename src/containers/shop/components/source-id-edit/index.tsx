import {
  getStoreAndActions,
  createFormTrigger,
} from '@sipin/siyue-admin-components';
import Action from './action';
import webapi from '../../../../configs/webapi';
import isSuccess from '../../../../utils/is-success';

const apis = {
  update: async (id, params, cb) => {
    const res = await webapi.salesMember.salesAgencyUpdateSourceId.call(
      webapi.salesMember,
      id,
      params
    );
    isSuccess(res) && setTimeout(() => cb(), 200);

    return res;
  },
};

/**
 * formStoreKeys
 */
const formStoreKeys = {
  sourceId: '',
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
      label: 'sourceId',
      key: 'sourceId',
      fieldProps: {
        placeholder: '请填写sourceId',
      },
      options: {
        rules: [{ required: true, message: 'sourceId不能为空' }],
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

export const SourceIdEditFormTrigger = createFormTrigger({
  store,
  actions: new Action({ apis: apis, ...store }),
  formStoreKeys,
  formConfigs,
  apis,
  getApisAdditionalParams({ shopId, sourceId, createSuccessCb }) {
    return {
      shopId,
      sourceId,
      createSuccessCb,
    };
  },
});
