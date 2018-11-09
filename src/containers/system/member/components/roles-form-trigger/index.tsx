/* eslint-disable */
import {
  getStoreAndActions,
  createFormTrigger,
} from '@sipin/siyue-admin-components';
import { ActionRoles } from './action';
import { formStoreKeys, createFormConfigs } from './form-configs';
import webapi from '../../../../../configs/webapi';
import isSuccess from '../../../../../utils/is-success';

const apis = {
  getItem: webapi.salesMember.salesUserSearchUser.bind(webapi.salesMember),
  update: async (id, params, cb) => {
    const res = await webapi.salesMember.salesUserUpdateUser(id, params);

    isSuccess(res) && cb();

    return res;
  },
};

const { store } = getStoreAndActions({ formStoreKeys, apis });

export const RolesFormTrigger = createFormTrigger({
  store,
  actions: new ActionRoles({ apis: apis, ...store }),
  formStoreKeys,
  formConfigs: createFormConfigs,
  apis,
  getApisAdditionalParams: p => p,
});
