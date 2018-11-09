import { Action as BaseAction } from '@sipin/siyue-admin-components';
import { transformList } from '../../utils/transform';

export default class Action extends BaseAction {
  async transformGetListData(data) {
    return transformList(data);
  }
}
