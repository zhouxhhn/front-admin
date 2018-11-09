import * as React from 'react';
import { observer } from 'mobx-react';
import { StoreForm, getStoreAndActions } from '@sipin/siyue-admin-components';
import { Icon } from 'antd';
import Action from './actions';
import getLayout from '../../../components/layout';

const { store } = getStoreAndActions({
  formStoreKeys: {
    oldPassword: '',
    newPassword: '',
    renewPassword: '',
  },
  apis: {},
});

const actions = new Action({
  ...store,
  apis: {},
});

const actionButtons = [
  {
    title: '确定',
    buttonProps: {
      className: '',
    },
    onClick: async data => actions.handlePasswordChange(data),
  },
];

@observer
class Password extends React.Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      isHiden: {
        oldPassword: true,
        newPassword: true,
        renewPassword: true,
      },
    };
  }

  handleIconChange = key => {
    const { isHiden }: any = this.state;
    isHiden[key] = !isHiden[key];
    this.setState({
      isHiden,
    });
  };

  createFormConfigs = () => {
    const { isHiden }: any = this.state;

    return [
      {
        title: '',
        formData: [
          {
            type: 'input',
            label: '原密码',
            key: 'oldPassword',
            fieldProps: {
              placeholder: '请输入原密码',
              type: isHiden['oldPassword'] ? 'password' : 'text',
              suffix: (
                <Icon
                  onClick={() => this.handleIconChange('oldPassword')}
                  type={isHiden['oldPassword'] ? 'lock' : 'unlock'}
                  style={{ cursor: 'pointer' }}
                  title={`点击${isHiden['oldPassword'] ? '显示' : '隐藏'}密码`}
                />
              ),
            },
            options: {
              rules: [
                {
                  required: true,
                  message: '原密码不能为空',
                },
              ],
            },
          },
          {
            type: 'input',
            label: '新密码',
            key: 'newPassword',
            fieldProps: {
              placeholder: '请输入新密码',
              onChange() {
                actions.setFieldErrors({ renewPassword: undefined });
              },
              type: isHiden['newPassword'] ? 'password' : 'text',
              suffix: (
                <Icon
                  onClick={() => this.handleIconChange('newPassword')}
                  type={isHiden['newPassword'] ? 'lock' : 'unlock'}
                  style={{ cursor: 'pointer' }}
                  title={`点击${isHiden['newPassword'] ? '显示' : '隐藏'}密码`}
                />
              ),
            },
            options: {
              validateTrigger: ['onChange'],
              rules: [
                {
                  required: true,
                  message: '新密码不能为空',
                },
                {
                  min: 6,
                  message: '密码长度至少为6位',
                },
                {
                  validator(rule, value, callback) {
                    if (/[^A-z\d]|_/gi.test(value)) {
                      callback(-1);
                    } else {
                      callback();
                    }
                  },
                  message: '输入的密码含有非法字符',
                },
                {
                  validator(rule, value, callback) {
                    if (value === store.form['oldPassword']) {
                      callback(-1);
                    } else {
                      callback();
                    }
                  },
                  message: '输入的密码不能与原密码一致',
                },
                {
                  validator(rule, value, callback) {
                    if (
                      value !== store.form['renewPassword'] &&
                      store.form['renewPassword']
                    ) {
                      callback(-1);
                    } else {
                      callback();
                    }
                  },
                  message: '输入的密码与确认密码不一致',
                },
              ],
            },
          },
          {
            type: 'input',
            label: '确认密码',
            key: 'renewPassword',
            fieldProps: {
              placeholder: '请确认新密码',
              onChange() {
                actions.setFieldErrors({ newPassword: undefined });
              },
              type: isHiden['renewPassword'] ? 'password' : 'text',
              suffix: (
                <Icon
                  onClick={() => this.handleIconChange('renewPassword')}
                  type={isHiden['renewPassword'] ? 'lock' : 'unlock'}
                  style={{ cursor: 'pointer' }}
                  title={`点击${
                    isHiden['renewPassword'] ? '显示' : '隐藏'
                  }密码`}
                />
              ),
            },
            options: {
              validateTrigger: ['onChange'],
              rules: [
                {
                  required: true,
                  message: '确认密码不能为空',
                },
                {
                  validator(rule, value, callback) {
                    if (
                      value !== store.form['newPassword'] &&
                      store.form['newPassword']
                    ) {
                      callback(-1);
                    } else {
                      callback();
                    }
                  },
                  message: '输入的密码与新密码不一致',
                },
              ],
            },
          },
        ],
      },
    ];
  };

  render() {
    return (
      <div className="u-pt-20" style={{ width: '50%' }}>
        <StoreForm
          store={store.form}
          actions={actions}
          configs={this.createFormConfigs()}
          actionButtons={actionButtons}
        />
      </div>
    );
  }
}

export default getLayout('修改密码', Password);
