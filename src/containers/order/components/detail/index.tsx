import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { PageHeader } from '@sipin/siyue-admin-core';
import { createHashHistory } from 'history';
import store from './store';
import OrderInfo from './components/order-info/index';

@observer
export default class OrderDetails extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      location: { pathname },
      match: {
        params: { orderNo },
      },
    } = this.props;
    const page = pathname.split('/')[2];

    this.setState({ page });

    store.getOrderDetails(page, orderNo);
  }

  renderContent = () => {
    const { page }: any = this.state;

    return <OrderInfo store={store} page={page} />;
  };

  render() {
    return (
      <PageHeader
        title="订单详情"
        action={
          <Button type="primary" onClick={() => createHashHistory().goBack()}>
            返回列表
          </Button>
        }
        {...this.props}
      >
        {this.state && this.renderContent()}
      </PageHeader>
    );
  }
}
