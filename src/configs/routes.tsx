import Welcome from '../containers/welcome';
import Role from '../containers/system/role';
import Shop from '../containers/shop';
import Agency from '../containers/agency';
import AgencyBalance from '../containers/agency/components/balance-table/index';
import Sales from '../containers/order/sales/index';
import Purchase from '../containers/order/purchase/index';
import SalesReturn from '../containers/order/salesReturn/index';
import OrderDetail from '../containers/order/components/detail/index';
import Goods from '../containers/goods/index';
import Member from '../containers/system/member/index';
import Password from '../containers/system/user/password';

export default async () => [
  {
    type: 'local',
    path: '/',
    auth: true,
    component: Welcome,
    title: '首页',
  },
  {
    type: 'local',
    path: '/goods',
    auth: true,
    component: 'div',
    title: '商品管理',
    children: [
      {
        type: 'local',
        path: '/list',
        auth: true,
        component: Goods,
        title: '商品列表',
      },
    ],
  },
  {
    type: 'local',
    path: '/order',
    auth: true,
    component: 'div',
    title: '订单管理',
    children: [
      {
        type: 'local',
        path: '/sales',
        auth: true,
        component: Sales,
        title: '销售订单',
        children: [
          {
            type: 'local',
            auth: true,
            component: OrderDetail,
            title: '订单详情',
            path: '/detail/:orderNo',
          },
        ],
      },
      {
        type: 'local',
        path: 'purchase',
        auth: true,
        component: Purchase,
        title: '采购订单',
        children: [
          {
            type: 'local',
            auth: true,
            component: OrderDetail,
            title: '订单详情',
            path: '/detail/:orderNo',
          },
        ],
      },
      {
        type: 'local',
        path: 'salesReturn',
        auth: true,
        component: SalesReturn,
        title: '销售退货单',
        children: [
          {
            type: 'local',
            auth: true,
            component: OrderDetail,
            title: '订单详情',
            path: '/detail/:orderNo',
          },
        ],
      },
    ],
  },
  {
    type: 'local',
    path: '/system/shop',
    auth: true,
    component: Shop,
    title: '门店管理',
  },
  {
    type: 'local',
    path: '/system',
    auth: true,
    component: 'div',
    title: '经销商管理',
    children: [
      {
        type: 'local',
        path: '/agency',
        auth: true,
        component: Agency,
        title: '经销商列表',
      },
      {
        type: 'local',
        path: '/agency/balance/:id',
        auth: true,
        component: AgencyBalance,
        title: '余额明细',
      },
    ],
  },
  {
    type: 'local',
    path: '/system',
    auth: true,
    component: 'div',
    title: '系统管理',
    children: [
      {
        type: 'local',
        path: '/member',
        auth: true,
        component: Member,
        title: '员工管理',
      },
      {
        type: 'local',
        path: '/role',
        auth: true,
        component: Role,
        title: '角色管理',
      },
    ],
  },
  {
    type: 'local',
    path: '/user/password',
    auth: true,
    component: Password,
    title: '修改密码',
  },
];
