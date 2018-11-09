export default () => {
  let user: any = {};
  try {
    user = JSON.parse(localStorage.getItem('userData')) || {};
  } catch (e) {
    console.error('获取当前用户数据失败', e);
  }

  return user;
};
