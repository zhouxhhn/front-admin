import './utils/constant';
import '@sipin/basic-libs/src/css/utils.scss';
import './styles/index.less';
import './utils/common-action';
import { create } from '@sipin/siyue-admin-core';
import getMenuConfigs from './configs/menus';
import getRouteConfigs from './configs/routes';
import actions from './actions';
import getLoginPageConfigs from './containers/login';
import pkg from '../package.json';

const app = create({
  async getAppConfigs() {
    return {
      name: pkg.projectName,
      description: pkg.projectName,
      version: pkg.version,
    };
  },
  actions,
  getMenuConfigs,
  getRouteConfigs,
  getLoginPageConfigs,
});

app.start('#app-container');
