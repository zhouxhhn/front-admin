/// <reference types="Cypress" />

import { PAGE_LOGIN, URL_LOGIN, HOST, PAGE_GOODS } from '../constant';
import { typeLogin, getMenu, login, logout } from '../utils/index';

const shopMenu = '.ant-select-dropdown-menu > .ant-select-dropdown-menu-item';

describe('登录页测试', () => {
  it('未选择门店或错误账号登录', () => {
    const username = 'test';
    const password = '123';

    cy.visit(PAGE_LOGIN);

    typeLogin(username, password);

    getMenu();

    // 不选门店登录
    cy.get('.shop-selector').click();

    cy.wait(500);

    cy.get('button[type=submit]').click();

    // 提示选择门店
    cy.get('.ant-form-explain').should('contain', '请选择门店');
    cy.log('【断言】未选择门店后提示“请选择门店”');

    // 选择门店
    getMenu();

    cy.get(shopMenu)
      .eq(0)
      .click();

    cy.get('button[type=submit]').click();

    // 弹出提示
    cy.get('.ant-notification-notice-message').should(
      'contain',
      '登录出现问题'
    );
    cy.log('【断言】使用错误信息登录后弹出提示框');

    cy.get('.ant-message-notice-content').should(
      'contain',
      '用户名不存在或密码错误'
    );
    cy.log('【断言】使用错误信息登录后给予提示');

    // 页面不需要跳转
    cy.url()
      .should('include', URL_LOGIN)
      .then(() => {
        cy.log('【断言】该情况下页面不需跳转');

        // 本地存储 token 为空
        const userInfo = JSON.parse(
          localStorage.getItem(location.host + '.user') || '{}'
        );
        const token = userInfo.token;

        cy.log('【断言】该情况下token为空');
        expect(token).to.eq(undefined);
      });
  });

  it('正常登录', () => login());

  it('登录后不能访问登录页', () => {
    login();

    // 页面跳转到首页
    cy.log('【断言】路由成功跳转至首页');
    cy.url()
      .should('eq', `${HOST}/#/`)
      .then(() => {
        cy.visit(PAGE_LOGIN);

        cy.log('【断言】该情况下路由不能跳转login页面');
        cy.url().should('eq', `${HOST}/#/`);
      });
  });

  it('正常登出', () => logout());

  it('登出后不能访问管理页面', () => {
    const page = PAGE_GOODS;

    login();

    cy.wait(500);

    logout();

    cy.wait(500);

    cy.visit(page);

    cy.wait(500);

    cy.url().should('eq', PAGE_LOGIN);
  });
});
