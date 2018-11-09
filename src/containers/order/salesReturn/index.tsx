import { createCompositeList } from '@sipin/siyue-admin-components';
import getLayout from '../../../components/layout';
import listConfigs from './list-configs/index';
import Action from './action';
import webapi from '../../../configs/webapi';

const apis = {
  getList: webapi.order.salesOrderBackendIndexOrders.bind(webapi.order),
};

const List = createCompositeList({
  listConfigs,
  apis,
  Action,
  getApisAdditionalParams: p => p,
});

export default getLayout('销售退货单', List);
