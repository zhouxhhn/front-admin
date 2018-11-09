import React from 'react';
import { Cascader } from 'antd';
import webapi from '../../configs/webapi';
import isSuccess from '../../utils/is-success';
import proxy from '../../utils/proxy';

/**
 *
 * @param {*} data any
 * @returns {*} any
 */
function transRegionList(data = []): any {
  return data.map(item => ({
    ...item,
    value: item.id,
    label: item.name,
    children: transRegionList(item.children),
  }));
}

export interface RegionPickerProps {
  value?: string[];
  onChange?: (v: any) => any;
}

export default class RegionPicker extends React.Component<RegionPickerProps> {
  state = {
    data: [],
  };

  async componentDidMount() {
    const res = await proxy(webapi.salesMember.regionIndex());
    if (isSuccess(res)) {
      this.setState({ data: transRegionList(res.data) });
    }
  }

  onChange = item => {
    const { onChange = () => undefined } = this.props;
    onChange(item);
  };

  render() {
    const { data } = this.state;

    return (
      <Cascader
        expandTrigger="hover"
        {...this.props}
        options={data}
        onChange={this.onChange}
        placeholder="选择地区"
      />
    );
  }
}
