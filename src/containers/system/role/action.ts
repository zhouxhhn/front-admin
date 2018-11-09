import { Action as BaseAction } from '@sipin/siyue-admin-components';

export class Action extends BaseAction {
  async transformGetListData(data) {
    data.records = data.records.map(item => ({
      ...item,
      status: String(item.status),
      childrenSystem: String(item.childrenSystem),
      type: String(item.type),
    }));

    return data;
  }
  async transformCreateParams({ scope, ...rest }) {
    return [scope ? { ...rest, scope: scope.id } : rest];
  }
  async transformUpdateParams({ id, scope, ...rest }) {
    return [id, scope ? { ...rest, scope: scope.id } : rest];
  }
}
