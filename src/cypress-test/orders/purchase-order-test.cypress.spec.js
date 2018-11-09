/// <reference types="Cypress" />

import {
  testWrong,
  testRight,
  testReset,
  assertRecords,
  testPage,
  initPage,
} from '../utils/index';
import { PAGE_PURCHASE_ORDER, DOM_ROWS } from '../constant';

describe('采购订单测试', () => {
  beforeEach(() => initPage(1, 1));

  it('点击导航进入页面并渲染', () =>
    testPage(PAGE_PURCHASE_ORDER, { filters: 3 }));

  it('先按未有的【订单号】查找，然后重置', () => {
    const keyword = 'null';

    testWrong('orderNo', keyword);

    testReset();
  });

  it('按已有的【订单号】查找', () => {
    const index = Math.round(Math.random());
    const keyword = Cypress.$('td.orderNo')
      .eq(index)
      .text();

    testRight('orderNo', keyword);
  });

  it('先按未有的【下单时间】查找，然后重置', () => {
    const keyword = ['2018年8月6日', '2018年8月8日'];
    const timeStart = `[title=${keyword[0]}] > .ant-calendar-date`;
    const timeEnd = `[title=${keyword[1]}] > .ant-calendar-date`;

    cy.get('#createdAt.ant-calendar-picker').click();

    cy.wait(500);

    cy.get(timeStart)
      .click()
      .then(() =>
        cy
          .get(timeEnd)
          .click()
          .then(() => cy.get('.ant-calendar-ok-btn').click())
      );

    cy.get('button[type=submit]').click();

    cy.wait(1000);

    assertRecords(false);

    testReset();
  });

  it('按已有的【下单时间】查找', () => {
    const keyword = ['2018年8月27日', '2018年8月28日'];
    const rightTime = '2018-08-28';
    const timeStart = `[title=${keyword[0]}] > .ant-calendar-date`;
    const timeEnd = `[title=${keyword[1]}] > .ant-calendar-date`;

    cy.get('#createdAt.ant-calendar-picker').click();

    cy.wait(500);

    cy.get(timeStart)
      .eq(0)
      .click()
      .then(() =>
        cy
          .get(timeEnd)
          .eq(0)
          .click()
          .then(() => cy.get('.ant-calendar-ok-btn').click())
      );

    cy.get('button[type=submit]').click();

    cy.wait(1000);

    assertRecords(true, 'createdAt > span', rightTime);
  });

  it('先按未有的【门店】查找，然后重置', () => {
    cy.get('.ant-select.select-shop').click();

    cy.wait(500);

    cy.get('.ant-select-dropdown-menu>li')
      .last()
      .click();

    cy.get('button[type=submit]').click();

    cy.wait(1000);

    assertRecords(false);

    testReset();
  });

  it('按已有的【门店】查找', () => {
    const shop = { name: '广州新天地门店', code: 'S000001' };

    cy.get('.ant-select.select-shop').click();

    cy.wait(500);

    cy.get('.ant-select-dropdown-menu>li')
      .eq(0)
      .click();

    cy.get('button[type=submit]').click();

    cy.wait(1000);

    assertRecords(true, 'shopName', shop.name);
  });

  it('按未有的【状态】查找', () => {
    const index = 3;

    cy.get('.ant-tabs-nav')
      .children('div[role=tab]')
      .eq(index)
      .click();

    cy.wait(1000);

    assertRecords(false);
  });

  it('按已有的【状态】查找', () => {
    const status = { code: 1, name: '等待付款' };
    const statusBar = cy.get('.ant-tabs-nav').children('div[role=tab]');

    statusBar.eq(status.code).click();

    cy.wait(1000);

    assertRecords(true, 'status', status.name);
  });

  it('展开订单结果查看关联商品', () => {
    const index = Math.round(Math.random());

    cy.get(DOM_ROWS)
      .eq(index)
      .find('.ant-table-row-expand-icon')
      .click();

    cy.wait(500);

    cy.log('【断言】扩展表格的结构完整');
    cy.get('.ant-table-expanded-row .ant-table-thead > tr > th').should(
      'have.length',
      6
    );

    cy.log('【断言】该订单关联的商品不为空');
    cy.get('.ant-table-expanded-row .ant-table-tbody > tr').should(
      'have.length.greaterThan',
      0
    );
  });

  it('进入任一订单的详情页【查看详情】，然后返回列表', () => {
    const index = Math.round(Math.random());

    cy.get(DOM_ROWS)
      .eq(index)
      .find('td.orderNo')
      .invoke('text')
      .then(orderNo => {
        cy.get(DOM_ROWS)
          .eq(index)
          .children('td')
          .last()
          .find('a')
          .click({ force: true });

        cy.wait(500);

        cy.log('【断言】当前页面为相关订单的详情页');
        cy.url().should('contain', `/order/purchase/detail/${orderNo}`);

        cy.log('【断言】页面显示的订单号与目标订单号一致');
        cy.get('.order-basicInfo')
          .find('.orderNo')
          .children()
          .last()
          .should('have.text', orderNo);
      });

    cy.then(() => {
      if (Cypress.$('.order-basicInfo').find('.title-basic-info').length) {
        cy.log('【断言】该订单的基础信息完整');
        cy.get('.order-basicInfo .ant-row')
          .children()
          .should('have.length.greaterThan', 0);
      }

      if (
        Cypress.$('.order-deliveryInfo').find('.title-delivery-info').length
      ) {
        cy.log('【断言】该订单的配送信息完整');
        cy.get('.order-deliveryInfo .ant-row')
          .children()
          .should('have.length.greaterThan', 0);
      }

      if (Cypress.$('.card-purchaseInfo').find('.ant-card-head-title').length) {
        cy.log('【断言】该订单的采购信息不为空');
        cy.get('tr.tableRow-purchaseInfo').should('have.length.greaterThan', 0);
      }
    });

    cy.get('.antd-pro-page-header-action > button').click();

    cy.wait(500);

    cy.log('【断言】返回列表后的路由准确');
    cy.url().should('eq', PAGE_PURCHASE_ORDER);
  });
});
