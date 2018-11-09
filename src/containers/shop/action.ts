import { Action as BaseAction } from '@sipin/siyue-admin-components';

export class Action extends BaseAction {
  async transformGetListData({ records, ...rest }) {
    return {
      ...rest,
      records: records.map(r => ({
        ...r,
        agency: { name: r.agencyName, code: r.agencyCode, id: r.agencyId },
      })),
    };
  }
  // async transformGetListParams(...params) {
  //   return [params[0]];
  // }

  async transformCreateParams({ agency, ...rest }) {
    return [{ ...rest, agencyCode: agency.code }];
  }

  async transformUpdateParams({ id, agency, ...rest }) {
    return [id, { ...rest, agencyCode: agency.code }];
  }
  // async transformRemoveParams({ rowKey }) {
  //   return [{ id: rowKey }];
  // }
}
