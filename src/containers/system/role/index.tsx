import { createCompositeList } from '@sipin/siyue-admin-components';
import getLayout from '../../../components/layout';
import webapi from '../../../configs/webapi';
import listConfigs from './list-config';
import { formConfigs, formStoreKeys } from './form-config';
import { Action } from './action';

const apis = {
  getList: webapi.salesMember.salesRolesIndex.bind(webapi.salesMember),
  create: webapi.salesMember.salesRolesAdd.bind(webapi.salesMember),
  update: webapi.salesMember.salesRolesUpdate.bind(webapi.salesMember),
  remove: webapi.salesMember.salesRolesDelete.bind(webapi.salesMember),
};

const List = createCompositeList({
  listConfigs,
  formConfigs,
  formStoreKeys,
  apis,
  Action,
});

export default getLayout('角色管理', List);
