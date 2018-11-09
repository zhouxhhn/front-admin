import * as React from 'react';
import {
  createFormTrigger,
  getStoreAndActions,
} from '@sipin/siyue-admin-components';
import { ActionPoint } from './actions';
import {
  formStoreKeysDelivery,
  createFormConfigsDelivery,
} from './form-configs';
import webapi from '../../../../../configs/webapi';

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

export const DeliveryEdit = createFormTrigger({
  formConfigs: createFormConfigsDelivery,
  formStoreKeys: formStoreKeysDelivery,
  apis: apis.delivery,
  getApisAdditionalParams: p => p,
  store,
  actions: new ActionPoint({ apis: apis.delivery, ...store }),
  triggerOptions: {
    title: '发货',
    trigger: <a>发货</a>,
  },
});
