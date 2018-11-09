import { createCompositeList } from '@sipin/siyue-admin-components';
import webapi from '../../../../configs/webapi';
import { Action } from './action';
import createListConfigs from './list-configs/index';
import { createFormConfigs, formStoreKeys } from './form-configs';

const apis = {
  getList: webapi.salesMember.salesAgencyDeliveryIndex.bind(webapi.salesMember),
  create: webapi.salesMember.salesAgencyDeliveryAddAddress.bind(
    webapi.salesMember
  ),
  update: webapi.salesMember.salesAgencyDeliveryUpdateAddress.bind(
    webapi.salesMember
  ),
  remove: webapi.salesMember.salesAgencyDeliveryDeleteAddress.bind(
    webapi.salesMember
  ),
};

const List = createCompositeList({
  listConfigs: createListConfigs,
  formConfigs: createFormConfigs,
  formStoreKeys,
  apis,
  Action,
  getApisAdditionalParams: props => props,
});

export default List;
