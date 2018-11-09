import { get as getPath } from 'object-path';
import { USER_TYPE_SYSTEM_ADMIN } from './constant';

export default async props => {
  const userType = getPath(props, 'stores.userStore.user.type', '');

  return [
    {
      title: '商品管理',
      path: '/goods',
      icon: 'home',
      children: [
        {
          title: '商品列表',
          path: '/goods/list',
        },
      ],
    },
    {
      title: '订单管理',
      path: '/order',
      icon: 'home',
      children: [
        {
          title: '销售订单',
          path: '/order/sales',
        },
        {
          title: '采购订单',
          path: '/order/purchase',
        },
        {
          title: '销售退货单',
          path: '/order/salesReturn',
        },
      ],
    },
    {
      title: '系统管理',
      path: '/system',
      icon: 'setting',
      children: [
        {
          title: '员工管理',
          path: '/system/member',
        },
        {
          title: '角色管理',
          path: '/system/role',
        },
        userType === USER_TYPE_SYSTEM_ADMIN && {
          title: '门店列表',
          path: '/system/shop',
        },
        userType === USER_TYPE_SYSTEM_ADMIN && {
          title: '经销商列表',
          path: '/system/agency',
        },
      ].filter(Boolean),
    },
  ];
};
