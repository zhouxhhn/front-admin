import { observable, action } from 'mobx';
import { message } from 'antd';
import webapi from '../../../../configs/webapi';
import isSuccess from '../../../../utils/is-success';

const GroupIndexApis = {
  front: webapi.salesMember.salesPermissionGroupIndexFrontGroup.bind(
    webapi.salesMember
  ),
  back: webapi.salesMember.salesPermissionGroupIndexBackGroup.bind(
    webapi.salesMember
  ),
};

class PermissionStore {
  @observable
  groups = [];
  @observable
  pages = 1;
  @observable
  current = 1;
  @observable
  actionIndex = [];

  @action
  setGroup(data) {
    this.groups = data.records;
    this.pages = data.pages;
    this.current = data.current;
  }

  async getGroupIndex(page = this.current, type = 'back') {
    const res = await GroupIndexApis[type]({ page });
    if (isSuccess(res)) {
      this.setGroup(res.data);
    }
  }

  @action
  setAction(data) {
    this.actionIndex = data.records;
  }

  async getActionIndex(roleId: number, groupId: number) {
    const res = await webapi.salesMember.salesPermissionGroupIndexAction(
      roleId,
      groupId
    );
    if (isSuccess(res)) {
      this.setAction(res.data);
    }
  }

  async setRolePermission(
    roleId: number,
    groupId: number,
    list: number[] = []
  ) {
    const res = await webapi.salesMember.salesPermissionRoleSetRolePermission(
      roleId,
      {
        groupId,
        permissionActionIds: list,
      }
    );
    if (isSuccess(res)) {
      message.success('更新成功');
      this.getActionIndex(roleId, groupId);
    } else {
      message.error('更新失败');
    }
  }
}

export default new PermissionStore();
