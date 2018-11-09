export const renderInput = (
  label = '',
  key = '',
  type = 'input',
  required = true
): any => {
  const rules = required && [
    {
      required: true,
      message: `${label}不能为空!`,
    },
  ];

  return {
    type,
    label,
    key,
    fieldProps: {
      placeholder: required ? '必填' : '',
    },
    options: {
      initialValue: '',
      rules,
    },
  };
};
