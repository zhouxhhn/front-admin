import * as React from 'react';
import { observer } from 'mobx-react';
import { Button, Tabs } from 'antd';
import { createModal } from '@sipin/siyue-admin-components';
import PermissionCheckGroup from './permission-check-group';
import store from './store';

const TabPane = Tabs.TabPane;

const Modal = createModal(({ disabled, getData }) => ({
  title: '权限列表',
  width: '90%',
  okText: '完成',
  onOk() {
    return true;
  },
  trigger: (
    <Button disabled={disabled} onClick={() => getData()} type="primary">
      绑定权限
    </Button>
  ),
}));

export interface PermisionModalProps {
  roleId: number;
  disabled?: boolean;
  type?: 'front' | 'back';
}

@observer
export default class PermisionModal extends React.Component<
  PermisionModalProps
> {
  onTabChange = key => {
    const { roleId } = this.props;
    if (roleId) {
      store.getActionIndex(roleId, key);
    }
  };
  getData = async (page = 1) => {
    const { roleId, type } = this.props;
    if (roleId) {
      await store.getGroupIndex(page, type);
      const [{ id }] = store.groups;
      store.getActionIndex(roleId, id);
    }
  };
  nextPage = () => {
    if (store.current < store.pages) {
      this.getData(store.current + 1);
    }
  };
  prevPage = () => {
    if (store.current > 1) {
      this.getData(store.current - 1);
    }
  };
  render() {
    const { roleId } = this.props;

    const operations = (
      <>
        <Button className="u-mr-20" disabled={store.current <= 1}>
          上一页
        </Button>
        <Button disabled={store.current >= store.pages}>下一页</Button>
      </>
    );

    return (
      <Modal {...this.props} getData={this.getData}>
        <Tabs onChange={this.onTabChange} tabBarExtraContent={operations}>
          {store.groups.map(item => (
            <TabPane tab={item.name} key={item.id}>
              <PermissionCheckGroup roleId={roleId} groupId={item.id} />
            </TabPane>
          ))}
        </Tabs>
      </Modal>
    );
  }
}
