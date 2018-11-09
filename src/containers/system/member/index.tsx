import { createCompositeList } from '@sipin/siyue-admin-components';
import getLayout from '../../../components/layout';
import listConfigs from './list-configs/index';
import Action from './action';
import webapi from '../../../configs/webapi';
import { createFormConfigs, formStoreKeys } from './form-configs';

const apis = {
  getList: webapi.salesMember.salesUserIndexUser.bind(webapi.salesMember),
  getItem: webapi.salesMember.salesUserSearchUser.bind(webapi.salesMember),
  create: webapi.salesMember.salesUserAddUser.bind(webapi.salesMember),
  update: webapi.salesMember.salesUserUpdateUser.bind(webapi.salesMember),
};

const List = createCompositeList({
  listConfigs,
  formConfigs: createFormConfigs,
  formStoreKeys: formStoreKeys,
  apis,
  Action,
  getApisAdditionalParams: p => p,
});

export default getLayout('员工管理', List);
