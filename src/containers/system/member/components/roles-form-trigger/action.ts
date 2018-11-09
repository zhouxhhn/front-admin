import { Action as BaseAction } from '@sipin/siyue-admin-components';
import { observable, action } from 'mobx';
import { get as getPath } from 'object-path';
import webapi from '../../../../../configs/webapi';

export class ActionRoles extends BaseAction {
  @observable
  roleList = [];

  @action
  setdata(data) {
    Object.keys(data).forEach(k => (this[k] = data[k]));
  }

  getRoleList = async ({ shopName }) => {
    const params = { scope: shopName };
    const res = await webapi.salesMember.salesRolesIndex(params);
    const data = getPath(res, 'data.records', []);
    this.isSuccess(res) && data.length && this.setdata({ roleList: data });
  };

  async transformGetItemData(data, [id]) {
    data.roles = data.roles.map(item => item.id);

    this.getRoleList(data);

    return { ...data, id };
  }

  async transformUpdateParams(params, addition) {
    const { id } = params;
    const {
      store: { type, shopCode, name, empno, roles },
      callback,
    } = addition;
    const submitParams = { type, shopCode, name, empno, roles };

    return [id, submitParams, callback];
  }
}
