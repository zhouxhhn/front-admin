import { notification } from 'antd';

notification.config({
  placement: 'bottomRight',
});

const openNotificationWithIcon = ({ type, ...rest }): any => {
  notification[type](rest);
};

export default openNotificationWithIcon;
