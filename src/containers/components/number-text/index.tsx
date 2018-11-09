import * as React from 'react';
import { InputNumber } from 'antd';

export interface propTypes {
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: any;
  onChange?: (v: any) => void;
}

export default class NumberText extends React.Component<propTypes, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  componentDidMount() {
    const { value } = this.props;
    this.setState({
      value,
    });
  }
  componentWillReceiveProps(nextProps) {
    nextProps.value &&
      this.setState({
        value: nextProps.value,
      });
  }
  handleChange(value) {
    const { onChange } = this.props;
    this.setState({
      value,
    });
    onChange(value);
  }
  render() {
    const { prefix, suffix, min, max, step } = this.props;
    const { value } = this.state;

    return (
      <div>
        {prefix && <span style={{ marginRight: '5px' }}>{prefix}</span>}
        <InputNumber
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={v => this.handleChange(v)}
        />
        {suffix && <span style={{ marginLeft: '5px' }}>{suffix}</span>}
      </div>
    );
  }
}
