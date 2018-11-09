import { Action as BaseAction } from '@sipin/siyue-admin-components';
import { action, observable } from 'mobx';
import { get as getPath } from 'object-path';
import webapi from '../../../configs/webapi';
import { handleResponse, getTips } from '../../../utils/tool-box';

const passwordHidden = '******';

export default class Action extends BaseAction {
  @observable
  shopList = [];

  @observable
  roleList = [];

  @action
  setdata(data) {
    Object.keys(data).forEach(k => (this[k] = data[k]));
  }

  getShopList = async () => {
    const res = await webapi.salesMember.salesFrontSearchShop();
    const data = getPath(res, 'data.records', []);
    this.isSuccess(res) && data.length && this.setdata({ shopList: data });
  };

  getRoleList = async ({ shopName }) => {
    const params = { scope: shopName };
    const res = await webapi.salesMember.salesRolesIndex(params);
    const data = getPath(res, 'data.records', []);
    this.isSuccess(res) && data.length && this.setdata({ roleList: data });
  };

  changeStatus = async id => {
    const res = await webapi.salesMember.salesUserSetStatus(id);
    handleResponse(res, '修改状态', () => this.getList());
  };

  async transformGetItemData(data, params) {
    data.roles = data.roles.map(item => item.id);

    return Object.assign(
      { password: passwordHidden },
      this.data.get(params[0]),
      data
    );
  }

  async transformUpdateParams(params, addition) {
    const {
      store: { roles },
    } = addition;
    if (roles && roles.length) {
      const { id, password } = params;
      params = { ...params, roles };
      delete params.id;
      if (password === passwordHidden) {
        delete params.password;
      }

      return [id, params];
    } else {
      getTips({ isSuccess: false, msg: '提交失败！请返回为该员工绑定角色！' });

      return;
    }
  }
}
