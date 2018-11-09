import { observable, action } from 'mobx';
import { Action as BaseAction } from '@sipin/siyue-admin-components';
import moment from 'moment';

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

    if (time && time.length) {
      const startTimeAt = moment(time[0]).format();
      const endTimeAt = moment(time[1]).format();
      params = Object.assign(params, { startTimeAt, endTimeAt });
      delete params.createdAt;
    }

    delete params.statusId;

    return [Object.assign(params, statusId ? { statusId } : {})];
  }

  async transformGetListData(data) {
    data.records.forEach(d => (d.id = d.no));

    return data;
  }
}
