import { toJS } from 'mobx';
import { ACTIVATE_OFF } from './constant';

export const formStoreKeys = {
  id: '',
  roles: [],
};

/**
 * formConfigs
 * @param {*} props props
 * @returns {*} any
 */
export function createFormConfigs({ actions, store }): any {
  const roleList = toJS(actions.roleList);

  const formData: any = [
    {
      key: 'roles',
      label: '权限角色',
      type: 'select',
      fieldProps: {
        mode: 'multiple',
        options: roleList.map(item => ({
          label: item.name,
          value: String(item.id),
          disabled:
            +item.status === ACTIVATE_OFF ||
            store.roles.some(name => name === item.name),
        })),
        placeholder: '请选择权限角色',
      },
      options: {
        rules: [{ required: true, message: '权限角色不能为空' }],
      },
    },
  ];

  const configs = {
    configs: [
      {
        formData,
      },
    ],
  };

  return configs;
}
