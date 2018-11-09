import * as React from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { SelectProps } from 'antd/lib/select';
import Store from './store';

const { Option } = Select;

interface ShopSelectType extends SelectProps {
  formItemProps?: any;
  hasDefault?: boolean;
  returnType?: 'code' | 'name';
  onChange?: any;
  value?: any;
}

@observer
export default class ShopSelectNative extends React.Component<ShopSelectType> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    Store.getShopList();
  }

  componentWillReceiveProps(nextProps) {
    const { value, onChange } = this.props;
    if (nextProps.value !== value) {
      this.setState({ value: nextProps.value });
      onChange(nextProps.value);
    }
  }

  render() {
    const {
      returnType = 'code',
      onChange,
      formItemProps,
      hasDefault,
      ...restProps
    }: any = this.props;

    const { value }: any = this.state;

    const defaultOption = hasDefault
      ? [{ id: 'NULL', code: 'NULL', name: '总部' }]
      : [];

    const { type, shopCode } = JSON.parse(
      localStorage.getItem('userData') || '{}'
    );

    return (
      <Select
        className="select-shop"
        placeholder="请选择门店"
        {...formItemProps}
        {...restProps}
        onChange={v => onChange(v)}
        value={value ? value : undefined}
      >
        {defaultOption
          .concat(toJS(Store.shopList || []))
          .map(
            item =>
              (hasDefault || type === '1' || shopCode === item.code) && (
                <Option
                  key={item.id}
                  value={returnType === 'code' ? item.code : item.name}
                  data-shopcode={item.code}
                >
                  {item.name}
                </Option>
              )
          )
          .filter(Boolean)}
      </Select>
    );
  }
}
