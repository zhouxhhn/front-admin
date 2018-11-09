import { action, observable } from 'mobx';
import webapi from '../../../../configs/webapi';
import isSuccess from '../../../../utils/is-success';
import { isType } from '../../../../utils/tool-box';

export class OrderDetailStore {
  @observable
  basicInfo: any;

  @observable
  deliveryInfo: any;

  @observable
  goodsInfo: any[];

  @observable
  paymentInfo: any;

  @observable
  purchaseInfo: any;

  @action
  setData(data: object) {
    Object.keys(data).forEach(k => (this[k] = data[k]));
  }

  getOrderDetails = async (page, orderNo) => {
    let api;
    switch (page) {
      case 'purchase':
        api = webapi.purchase.backendShowPurchaseOrder.bind(webapi.purchase);
        break;
      case 'sales':
        api = webapi.order.salesOrderBackendDetailOrders.bind(webapi.order);
        break;
      case 'salesReturn':
        api = webapi.order.salesOrderBackendDetailOrders.bind(webapi.order);
        break;
      default:
        break;
    }
    const res = await api(orderNo);
    const data = res.data;
    if (isSuccess(res) && data && Object.values(data).length) {
      const {
        detailVos,
        orderConsignee,
        logisticsInfos: waybills,
        orderExpressList: expressInfo,
        orderDetailList: goodsInfo,
        paymentResponseList: payment,
        ...basicInfo
      } = data;
      this.setData({
        basicInfo,
        deliveryInfo: Object.assign(
          orderConsignee || {},
          waybills ? { waybills } : {},
          { expressInfo }
        ),
        paymentInfo: payment
          ? isType(payment, 'array')
            ? payment
            : [payment]
          : [],
        purchaseInfo: detailVos || [],
        goodsInfo,
      });
    }
  };
}

export default new OrderDetailStore();
