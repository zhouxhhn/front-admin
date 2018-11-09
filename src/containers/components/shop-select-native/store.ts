import { action, observable } from 'mobx';
import { get as getPath } from 'object-path';
import webapi from '../../../configs/webapi';
import isSuccess from '../../../utils/is-success';

export class StoreLogin {
  @observable
  shopList = [];

  @action
  setdata(data) {
    Object.keys(data).forEach(k => (this[k] = data[k]));
  }

  @action
  getShopList = async () => {
    const res = await webapi.salesMember.salesFrontSearchShop();
    const data = getPath(res, 'data.records', []);
    isSuccess(res) && data.length && this.setdata({ shopList: data });
  };
}

export default new StoreLogin();
