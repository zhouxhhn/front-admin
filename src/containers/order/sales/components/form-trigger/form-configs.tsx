import { renderFormItem } from '../../../../../utils/tool-box';

const formConfigsDelivery = [
  {
    key: 'delivery',
    label: '物流公司',
    type: 'input',
  },
  {
    key: 'orderNo',
    label: '运单号',
    type: 'input',
  },
];

export const formStoreKeysDelivery = {
  delivery: '',
  orderNo: '',
};

/**
 *
 * @param {*} props - props
 * @returns {*} - *
 */
export function createFormConfigsDelivery(): any {
  return {
    configs: [
      {
        formData: formConfigsDelivery.map(item =>
          renderFormItem(item.key, item)
        ),
      },
    ],
  };
}
