import { createCompositeList } from '@sipin/siyue-admin-components';
import getLayout from '../../components/layout';
import webapi from '../../configs/webapi';
import { Action } from './action';
import createListConfigs from './list-configs/index';
import { createFormConfigs, formStoreKeys } from './form-configs';

const apis = {
  getList: webapi.salesMember.salesAgencyIndexAgency.bind(webapi.salesMember),
  getItem: webapi.salesMember.salesAgencySearchAgency.bind(webapi.salesMember),
  create: webapi.salesMember.salesAgencyAddAgency.bind(webapi.salesMember),
  update: webapi.salesMember.salesAgencyUpdateAgency.bind(webapi.salesMember),
  // remove: webapi.salesMember.salesAgencyDeleteAgency.bind(webapi.salesMember),
};

const List = createCompositeList({
  listConfigs: createListConfigs,
  formConfigs: createFormConfigs,
  formStoreKeys,
  apis,
  Action,
});

export default getLayout('经销商管理', List);
