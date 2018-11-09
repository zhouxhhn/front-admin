/// <reference types="Cypress" />

import {
  assertRecords,
  initPage,
  testPage,
  testRight,
  testWrong,
  testReset,
} from '../utils/index';
import { PAGE_SALES_ORDER, DOM_ROWS } from '../constant';

describe('销售订单测试', () => {
  beforeEach(() => initPage(1, 0));

  it('点击导航进入页面并渲染', () =>
    testPage(PAGE_SALES_ORDER, { filters: 3 }));

  it('先按未有的【订单号】查找，然后重置', () => {
    const keyword = 'null';

    testWrong('no', keyword);

    testReset();
  });

  it('按已有的【订单号】查找', () => {
    const index = Math.round(Math.random());
    const keyword = Cypress.$('td.no')
      .eq(index)
      .text();

    testRight('no', keyword);
  });

  it('先按未有的【下单时间】查找，然后重置', () => {
    const keyword = '2018年8月6日';
    const time = `[title=${keyword}] > .ant-calendar-date`;

    cy.get('#createdAt.ant-calendar-picker').click();

    cy.wait(500);

    cy.get(time).click();

    cy.get('button[type=submit]').click();

    cy.wait(1000);

    assertRecords(false);

    testReset();
  });

  it('按已有的【下单时间】查找', () => {
    const keyword = { name: '2018年8月28日', value: '2018-08-28' };
    const time = `[title=${keyword.name}] > .ant-calendar-date`;

    cy.get('#createdAt.ant-calendar-picker').click();

    cy.wait(500);

    cy.get(time).click();

    cy.get('button[type=submit]').click();

    cy.wait(1000);

    assertRecords(true, 'createdAt > span', keyword.value);
  });

  it('先按未有的【门店】查找，然后重置', () => {
    const index = 2;

    cy.get('.ant-select.select-shop').click();

    cy.wait(500);

    cy.get('.ant-select-dropdown-menu>li')
      .eq(index)
      .click();

    cy.get('button[type=submit]').click();

    cy.wait(1000);

    assertRecords(false);

    testReset();
  });

  it('按已有的【门店】查找', () => {
    const shopName = '广州新天地门店';

    cy.get('.ant-select.select-shop').click();

    cy.wait(500);

    cy.get('.ant-select-dropdown-menu>li')
      .eq(0)
      .click();

    cy.get('button[type=submit]').click();

    cy.wait(1000);

    assertRecords(true, 'shopName', shopName);
  });

  // it('按未有的【状态】查找', () => {
  //   const index = 2;

  //   cy.get('.ant-tabs-nav')
  //     .children('div[role=tab]')
  //     .eq(index)
  //     .click();

  //   cy.wait(1000);

  //   assertRecords(false);
  // });

  it('按已有【状态】查找', () => {
    const status = { 0: '等待付款', 1: '已付款', 2: '已完成' };
    const rightStatus = status[0];
    const statusBar = cy.get('.ant-tabs-nav').children('div[role=tab]');

    statusBar.eq(1).click();

    cy.wait(1000);

    assertRecords(true, 'status', rightStatus);
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
      .find('td.no')
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
        cy.url().should('contain', `/order/sales/detail/${orderNo}`);

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

      if (Cypress.$('.order-paymentInfo').find('.title-payment-info').length) {
        cy.log('【断言】该订单的支付信息完整');
        cy.get('tr.tableRow-paymentInfo').should('have.length.greaterThan', 0);
      }

      if (Cypress.$('.card-goodsInfo').find('.ant-card-head-title').length) {
        cy.log('【断言】该订单的商品信息不为空');
        cy.get('tr.tableRow-goodsInfo').should('have.length.greaterThan', 0);

        cy.log('【断言】该订单的商品账单不为空');
        cy.get('.goodsAmount > .ant-row')
          .children()
          .should('have.length', 5);
      }
    });

    cy.get('.antd-pro-page-header-action > button').click();

    cy.wait(500);

    cy.log('【断言】返回列表后的路由准确');
    cy.url().should('eq', PAGE_SALES_ORDER);
  });
});
