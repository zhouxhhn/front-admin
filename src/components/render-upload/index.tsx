import * as React from 'react';
import Upload from '../qiniu-upload';

/**
 *
 * @param {string} label - label
 * @param {string} key - key
 * @param {*} param2 - props
 * @param {*} createAttachmentParams - attachmentParams
 * @param {*} formItemProps - formItemProps
 * @return {*} - new formItem configs
 */
export const renderQiniuUpload = (
  label = '',
  key = '',
  { max = 1, params = {} },
  createAttachmentParams = null,
  formItemProps = {}
): any => {
  return Object.assign(
    {
      type: 'react',
      label,
      key,
      options: {
        initialValue: [],
        rules: [
          {
            required: true,
            message: `${label}不能为空!`,
            type: 'array',
          },
          {
            max: max,
            message: `不能超过${max}张图片!`,
            type: 'array',
          },
        ],
      },
      render() {
        return (
          <Upload
            max={max}
            params={params}
            createAttachmentParams={createAttachmentParams}
          />
        );
      },
    },
    formItemProps && Object.values(formItemProps).length
      ? { formItemProps }
      : {}
  );
};
