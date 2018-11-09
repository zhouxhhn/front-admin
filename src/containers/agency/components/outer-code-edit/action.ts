import { Action as BaseAction } from '@sipin/siyue-admin-components';

export default class Action extends BaseAction {
  async transformGetItemData(...data) {
    const {
      apisAdditionalParams: { agencyId: id, outerCode },
    } = data[2];

    return { id, outerCode };
  }

  async transformUpdateParams(params, addition) {
    const { id, outerCode } = params;
    const { createSuccessCb } = addition;

    return [id, { outerCode }, createSuccessCb];
  }
}
