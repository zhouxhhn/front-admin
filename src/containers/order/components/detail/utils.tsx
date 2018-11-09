import * as React from 'react';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';

const { Description } = DescriptionList;

/**
 * 创建多项描述
 * @param {*} configs - configs
 * @returns {*} - DescriptionList - ReactNode
 */
export function createMultipleDescriptionList(configs: {
  // descriptionList 属性
  listProps?: object;
  // dataSource - 数据源
  data: object;
  /** description - 描述项
   *  format
   *  [
   *    {
   *      label?: any,
   *      dataIndex?: any,
   *      render?: any
   *    },
   *    ...
   *  ]
   */
  items: any[];
}): any {
  const { listProps, data, items } = configs;

  return (
    <DescriptionList {...{ ...{ size: 'small', title: '' }, ...listProps }}>
      {items.map((item, i) => {
        const {
          label = '',
          dataIndex,
          className,
          width,
          itemProps,
          render,
        } = item;

        return (
          <Description
            term={label}
            key={dataIndex || i}
            {...itemProps}
            className={className}
            style={{ width }}
          >
            {render
              ? render(data[dataIndex], data, i)
              : dataIndex && data[dataIndex]}
          </Description>
        );
      })}
    </DescriptionList>
  );
}
