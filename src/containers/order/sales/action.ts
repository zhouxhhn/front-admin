import { Action as BaseAction } from '@sipin/siyue-admin-components';
import { action, observable } from 'mobx';
import moment from 'moment';
import { FORMAT_DATE } from '../../../utils/constant';

export default class Action extends BaseAction {
  @observable
  activeKey = '';

  @observable
  expandedRowKey = '';

  @action
  setData(data) {
    Object.keys(data).forEach(k => (this[k] = data[k]));
  }

  async transformGetListParams(params, addition) {
    const time = params.createdAt;
    const { statusId } = addition;

    time && (params.createdAt = moment(time).format(FORMAT_DATE));

    delete params.statusId;

    return [Object.assign(params, statusId ? { statusId } : {})];
  }

  async transformGetListData(data) {
    data.records.forEach(d => (d.id = d.no));

    return data;
  }
}
