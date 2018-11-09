import { Action as BaseAction } from '@sipin/siyue-admin-components';

const urlIndicator = '!';

export class Action extends BaseAction {
  getHandledParams = params => {
    const { id, discount, license, ...rest } = params;
    const url = license[0].url;

    return {
      ...rest,
      discount: Number.prototype.toFixed.call(+discount / 10, 2),
      licenseImgUrl: url.split(urlIndicator)[0],
      licenseImgSecret: url.split(urlIndicator)[1],
    };
  };

  async transformRemoveParams({ record: { id } }) {
    return [id];
  }

  async transformGetItemData(data) {
    const { id, name, licenseImgUrl, licenseImgSecret, discount = 9.9 } = data;
    data = this.data.get(id);

    return Object.assign(data, {
      discount: discount * 10,
      license:
        licenseImgUrl && licenseImgSecret
          ? [
              {
                id,
                name,
                url: licenseImgUrl + urlIndicator + licenseImgSecret,
              },
            ]
          : [],
    });
  }

  async transformCreateParams(params) {
    return [this.getHandledParams(params)];
  }

  async transformUpdateParams(params) {
    return [params.id, this.getHandledParams(params)];
  }
}
