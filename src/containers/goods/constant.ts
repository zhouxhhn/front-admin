export const STATUS_ON = 1;
export const STATUS_OFF = 0;
const values = {
  // 商品状态
  GOODS_NOT_ENABLED: 0, // NOT_ENABLED(0, "CPZT005", "存档"),
  GOODS_ENABLED: 1, // ENABLED(1, "CPZT002", "上架"),
  GOODS_STOP_PRODUCTION: 2, // STOP_PRODUCTION(2, "CPZT001", "停产"),
  GOODS_OBSOLET: 3, // OBSOLET(3, "CPZT003", "淘汰"),
  GOODS_SAMPLE: 4, // SAMPLE(4, "CPZT004", "打样");

  GOODS_FORBID_STATUS_NOT_ENABLED: STATUS_OFF, // 禁用
  GOODS_FORBID_STATUS_ENABLED: STATUS_ON, // 启用
};

export const goodsStatus = {
  [values.GOODS_NOT_ENABLED]: '存档',
  [values.GOODS_ENABLED]: '上架',
  [values.GOODS_STOP_PRODUCTION]: '停产',
  [values.GOODS_OBSOLET]: '淘汰',
  [values.GOODS_SAMPLE]: '打样',
};

export const goodsForbidStatus = {
  [values.GOODS_FORBID_STATUS_NOT_ENABLED]: '禁用',
  [values.GOODS_FORBID_STATUS_ENABLED]: '启用',
};
