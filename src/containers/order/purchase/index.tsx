import { createCompositeList } from '@sipin/siyue-admin-components';
import getLayout from '../../../components/layout';
import listConfigs from './list-configs/index';
import Action from './action';
import webapi from '../../../configs/webapi';

const apis = {
  getList: webapi.purchase.backendPurchaseOrderList.bind(webapi.purchase),
};

const List = createCompositeList({
  listConfigs,
  apis,
  Action,
  getApisAdditionalParams: p => p,
});

export default getLayout('采购订单', List);
