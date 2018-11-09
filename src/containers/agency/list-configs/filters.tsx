/**
 * createFilters
 * @param {*} props - props
 * @returns {*} - columns
 */
export default function createFilters(): any {
  const FILTER_CONFIGS = [
    {
      formData: [
        {
          label: '经销商名称',
          key: 'name',
          type: 'input',
          fieldProps: {
            placeholder: '请输入经销商名称',
          },
        },
        {
          label: '经销商编码',
          key: 'code',
          type: 'input',
          fieldProps: {
            placeholder: '请输入完整的经销商编码',
          },
        },
        {
          label: '经销商等级',
          key: 'grade',
          type: 'input',
          fieldProps: {
            placeholder: '请输入经销商等级',
          },
        },
      ],
    },
  ];

  return {
    configs: FILTER_CONFIGS,
  };
}
