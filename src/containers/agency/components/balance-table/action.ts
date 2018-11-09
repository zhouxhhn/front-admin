import { Action as BaseAction } from '@sipin/siyue-admin-components';

export default class Action extends BaseAction {
  async transformGetListParams(params, additon) {
    const {
      match: {
        params: { id },
      },
    } = additon;

    return [id, params];
  }
}
