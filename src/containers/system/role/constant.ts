export const STATUS_ON = '0';
export const STATUS_OFF = '1';

export const SYSTEM_FRONTEND = '0';
export const SYSTEM_BACKEND = '1';

export const TYPE_PUBLIC = '0';
export const TYPE_PRIVATE = '1';
export const TYPE_ADMIN = '2';

export const STATUS_OPTIONS = [
  {
    label: '禁用',
    value: STATUS_OFF,
  },
  {
    label: '启用',
    value: STATUS_ON,
  },
];

export const CHILDREN_SYSTEM = [
  {
    label: '前台',
    value: SYSTEM_FRONTEND,
  },
  {
    label: '后台',
    value: SYSTEM_BACKEND,
  },
];

export const TYPE = {
  [TYPE_PUBLIC]: '公有',
  [TYPE_PRIVATE]: '私有',
  [TYPE_ADMIN]: '系统管理员',
};
