import { goodsForbidStatus, goodsStatus } from '../constant';

/**
 * @returns {*} - filters
 */
export default function createFilters(): any {
  const FILTER_CONFIGS = [
    {
      formData: [
        {
          label: '商品编码',
          key: 'skuNo',
          type: 'input',
          fieldProps: {
            placeholder: '请输入商品编码',
          },
        },
        {
          label: '商品名称',
          key: 'name',
          type: 'input',
          fieldProps: {
            placeholder: '请输入商品名称',
          },
        },
        {
          label: 'SKU',
          key: 'skuSn',
          type: 'input',
          fieldProps: {
            placeholder: '请输入完整的SKU',
          },
        },
        {
          label: '状态',
          key: 'status',
          type: 'select',
          fieldProps: {
            options: Object.keys(goodsStatus).map(key => ({
              label: goodsStatus[key],
              value: String(key),
            })),
            placeholder: '请选择状态',
            mode: 'multiple',
          },
        },
        {
          label: '是否禁用',
          key: 'forbidStatusId',
          type: 'select',
          fieldProps: {
            className: 'select-status',
            options: Object.keys(goodsForbidStatus).map(key => ({
              label: goodsForbidStatus[key],
              value: String(key),
            })),
            placeholder: '请选择状态',
          },
        },
      ],
    },
  ];

  return {
    configs: FILTER_CONFIGS,
  };
}
