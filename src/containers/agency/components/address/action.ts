import { Action as BaseAction } from '@sipin/siyue-admin-components';
import { action, observable } from 'mobx';
import webapi from '../../../../configs/webapi';
import proxy from '../../../../utils/proxy';

export class Action extends BaseAction {
  @observable
  btnText = '设为默认';

  @action
  setData(data) {
    Object.keys(data).forEach(k => (this[k] = data[k]));
  }

  async transformGetListParams(p1, { shopId }) {
    return [shopId, p1];
  }

  async transformGetListData({ records, ...rest }) {
    return {
      ...rest,
      records: records.map(item => ({
        ...item,
        region: [item.provinceCode, item.cityCode, item.districtCode],
        defaultAddress: String(item.defaultAddress),
      })),
    };
  }

  async transformGetItemData(data) {
    const { provinceCode, cityCode, districtCode } = data;

    return Object.assign(this.data.get(data.id), data, {
      region: [provinceCode + '', cityCode + '', districtCode + ''],
    });
  }

  async transformCreateParams(
    { region: [provinceCode, cityCode, districtCode], defaultAddress, ...rest },
    { shopId }
  ) {
    return [
      {
        ...rest,
        defaultAddress: defaultAddress ? 1 : 0,
        provinceCode,
        cityCode,
        districtCode,
        shopId,
      },
    ];
  }

  async transformUpdateParams(
    { region: [provinceCode, cityCode, districtCode], defaultAddress, ...rest },
    { shopId }
  ) {
    return [
      shopId,
      {
        ...rest,
        defaultAddress: defaultAddress ? 1 : 0,
        provinceCode,
        cityCode,
        districtCode,
        shopId,
      },
    ];
  }

  async transformRemoveParams({ record: { id } }) {
    return [id];
  }

  setDefault = id =>
    proxy(webapi.salesMember.salesAgencyDeliveryEditDefaultAddress(id));
}
