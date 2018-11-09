import { Action as BaseAction } from '@sipin/siyue-admin-components';

export default class Action extends BaseAction {
  async transformGetItemData(...data) {
    const {
      apisAdditionalParams: { shopId: id, sourceId },
    } = data[2];

    return { id, sourceId };
  }

  async transformUpdateParams(params, addition) {
    const { id, sourceId } = params;
    const { createSuccessCb } = addition;

    return [id, { sourceId }, createSuccessCb];
  }
}
