import { Action as BaseAction } from '@sipin/siyue-admin-components';
import { action, observable } from 'mobx';
import webapi from '../../../../configs/webapi';
import { DEFAULT_YES, DEFAULT_NO } from './constant';
import { handleResponse } from '../../../../utils/tool-box';

export class Action extends BaseAction {
  @observable
  shopId: any;

  @action
  setData(data: object) {
    Object.keys(data).forEach(k => (this[k] = data[k]));
  }

  async setDefaultAddress(addressId) {
    const res = await webapi.salesMember.salesAgencyDeliveryEditDefaultAddress(
      addressId
    );
    handleResponse(res, '设置默认地址', () => this.getList());
  }

  async transformGetListParams(params, addition) {
    !this.shopId && this.setData({ shopId: addition.id });

    return [this.shopId, params];
  }
  async transformCreateParams(params, addition) {
    const {
      addressCodes: [provinceCode, cityCode, districtCode],
      defaultAddress,
      ...rest
    } = params;
    const { id: shopId } = addition;

    return [
      {
        ...rest,
        shopId,
        defaultAddress: defaultAddress ? DEFAULT_YES : DEFAULT_NO,
        provinceCode,
        cityCode,
        districtCode,
      },
    ];
  }
}
