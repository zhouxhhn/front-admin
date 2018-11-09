export const STATUS_PENDING_PAY = 0;
export const STATUS_PENDING_FINAL_PAY = 1;
export const STATUS_SUCCESS_PAY = 2;
export const STATUS_PENDING_DELIVER = 3;
export const STATUS_DONE_DELIVER = 4;
export const STATUS_DONE = 5;
export const STATUS_PARTIAL_DELIVER = 6;
export const STATUS_FROZEN = 100;
export const STATUS_PENDING_CHECK = 200;
export const STATUS_PENDING_RETURN = 201;
export const STATUS_SUCCESS_RETURN = 202;
export const STATUS_PENDING_REFUND = 202;
export const STATUS_CANCELED = 300;

export default {
  [STATUS_PENDING_PAY]: '等待付款',
  [STATUS_PENDING_FINAL_PAY]: '等待尾款',
  [STATUS_SUCCESS_PAY]: '付款成功',
  [STATUS_PENDING_DELIVER]: '等待发货',
  [STATUS_DONE_DELIVER]: '已发货',
  [STATUS_DONE]: '已完成',
  [STATUS_PARTIAL_DELIVER]: '部分发货',
  [STATUS_FROZEN]: '已冻结',
  [STATUS_PENDING_CHECK]: '退货待审',
  [STATUS_PENDING_RETURN]: '等待退货',
  [STATUS_SUCCESS_RETURN]: '已退货',
  [STATUS_PENDING_REFUND]: '退款中',
  [STATUS_CANCELED]: '已取消',
};
