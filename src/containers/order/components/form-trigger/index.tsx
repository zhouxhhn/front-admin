import {
  createFormTrigger,
  getStoreAndActions,
} from '@sipin/siyue-admin-components';
import { Action } from './actions';
import {
  formStoreKeysDelivery,
  createFormConfigsDelivery,
} from './form-configs';
import webapi from '../../../../configs/webapi';

const apis = {
  delivery: {
    getItem: webapi.purchase.backendGetPurchaseOrderDetails,
    create: '',
    update: '',
  },
};

const { store } = getStoreAndActions({
  formStoreKeys: formStoreKeysDelivery,
  apis: apis.delivery,
});

export const PaymentRecord = createFormTrigger({
  formConfigs: createFormConfigsDelivery,
  formStoreKeys: formStoreKeysDelivery,
  apis: apis.delivery,
  getApisAdditionalParams: p => p,
  store,
  actions: new Action({ apis: apis.delivery, ...store }),
});
