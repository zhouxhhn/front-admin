import { common } from '@sipin/siyue-admin-components';
import proxy, { ResType } from './proxy';

// 用于组件库的action
class Action {
  catchError(err) {
    if (err && err.msg) {
      return {
        default: err.msg,
      };
    }
  }
  async proxy(api): Promise<ResType> {
    const res = await proxy(api);

    return res;
  }
}

// 创建自定义action 取代缺省值
common.createGlobalAction(Action);
