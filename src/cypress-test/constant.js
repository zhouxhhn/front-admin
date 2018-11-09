// HOST
export const HOST = 'http://local.admin.sipin.latest.dev.e.sipin.one';

export const URL_LOGIN = '/#/login';
export const URL_AGENCY = '/#/system/agency';
export const URL_GOODS = '/#/goods/list';
export const URL_MEMBER = '/#/system/member';
export const URL_ROLE = '/#/system/role';
export const URL_SALES_ORDER = '/#/order/sales';
export const URL_PURCHASE_ORDER = '/#/order/purchase';
export const URL_SHOP = '/#/system/shop';

export const PAGE_LOGIN = HOST + URL_LOGIN;
export const PAGE_GOODS = HOST + URL_GOODS;
export const PAGE_MEMBER = HOST + URL_MEMBER;
export const PAGE_SALES_ORDER = HOST + URL_SALES_ORDER;
export const PAGE_PURCHASE_ORDER = HOST + URL_PURCHASE_ORDER;
export const PAGE_SHOP = HOST + URL_SHOP;
export const PAGE_AGENCY = HOST + URL_AGENCY;
export const PAGE_ROLE = HOST + URL_ROLE;

// default account
export const USERNAME = 'admin';
export const PASSWORD = '123456';
export const SHOPCODE = 'NULL';

// table doms
export const DOM_FILTERS = '.sy-admin-form-group-items>.ant-form-item';
export const DOM_ROWS = '.ant-table .ant-table-tbody>.ant-table-row';
export const DOM_SHOP_MENU =
  '.ant-select-dropdown-menu>.ant-select-dropdown-menu-item';

export const PAGE = {
  [PAGE_AGENCY]: '经销商管理',
  [PAGE_GOODS]: '商品列表',
  [PAGE_MEMBER]: '员工管理',
  [PAGE_ROLE]: '角色管理',
  [PAGE_PURCHASE_ORDER]: '采购订单',
  [PAGE_SALES_ORDER]: '销售订单',
  [PAGE_SHOP]: '门店管理',
};
