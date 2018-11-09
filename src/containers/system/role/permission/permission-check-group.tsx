import * as React from 'react';
import { observer } from 'mobx-react';
import { Checkbox, Row, Col } from 'antd';
import store from './store';

export interface PermissionCheckGroupProps {
  roleId: number;
  groupId: number;
}

@observer
export default class PermissionCheckGroup extends React.Component<
  PermissionCheckGroupProps
> {
  onCheckAllChange = ({ target: { checked } }) => {
    const { roleId, groupId } = this.props;
    const list = checked ? store.actionIndex.map(({ id }) => id) : [];
    store.setRolePermission(roleId, groupId, list);
  };
  onChange = list => {
    const { roleId, groupId } = this.props;
    store.setRolePermission(roleId, groupId, list);
  };
  render() {
    const checkedValue = store.actionIndex
      .filter(({ status }) => status == 1)
      .map(({ id }) => id);

    const indeterminate =
      checkedValue.length > 0 && checkedValue.length < store.actionIndex.length;

    const options = store.actionIndex.map(({ displayName, id }) => (
      <Col key={id} span={8} style={{ marginBottom: '10px' }}>
        <Checkbox value={id}>{displayName}</Checkbox>
      </Col>
    ));

    return options.length ? (
      <>
        <div
          style={{
            borderBottom: '1px solid #E9E9E9',
            paddingBottom: '10px',
            marginLeft: '30px',
            marginBottom: '10px',
          }}
        >
          <Checkbox
            indeterminate={indeterminate}
            onChange={this.onCheckAllChange}
            checked={checkedValue.length === store.actionIndex.length}
          >
            全选
          </Checkbox>
        </div>
        <Checkbox.Group
          style={{ marginLeft: '30px', width: '100%' }}
          value={checkedValue}
          onChange={this.onChange}
        >
          <Row>{options}</Row>
        </Checkbox.Group>
      </>
    ) : (
      <div style={{ marginLeft: '30px' }}>当前组无可配置项</div>
    );
  }
}
