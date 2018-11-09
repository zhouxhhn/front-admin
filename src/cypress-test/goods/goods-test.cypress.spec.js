/// <reference types="Cypress" />

import { initPage, testPage } from '../utils/index';
import { DOM_ROWS, PAGE_GOODS } from '../constant';

function typeAndSearch(inputElement, keyword) {
  cy.get(`input#${inputElement}`)
    .type(keyword)
    .then(() => cy.get('button[type=submit]').click());
}

function testReset() {
  cy.get('button[type=button]').click();

  cy.wait(1000);

  cy.log('【断言】重置筛选条件后的结果不为空');
  cy.get(DOM_ROWS).should('have.length.greaterThan', 0);
}

function testWrong(inputElement, keyword) {
  typeAndSearch(inputElement, keyword);

  cy.wait(1000);

  cy.log('【断言】筛选条件不满足情况下的结果为空');
  cy.get(DOM_ROWS).should('have.length', 0);
}

function testRight(inputElement, keyword) {
  typeAndSearch(inputElement, keyword);

  cy.wait(1000);

  cy.log('【断言】筛选条件满足情况下的结果不为空');
  cy.get(DOM_ROWS).should('have.length.greaterThan', 0);

  cy.log('【断言】每一条记录的关键字段都与筛选条件相关');
  cy.get(`td.${inputElement}`).should('contain', keyword);
}

describe('商品管理测试', () => {
  beforeEach(() => initPage(0, 0));

  it('点击导航进入页面并渲染', () => testPage(PAGE_GOODS, { filters: 4 }));

  it('先按未有的【商品编码】查找，然后重置', () => {
    const keyword = 'null';

    testWrong('skuNo', keyword);

    testReset();
  });

  it('按已有的【商品编码】查找', () => {
    const keyword = '01';

    testRight('skuNo', keyword);
  });

  it('先按未有的【商品名称】查找，然后重置', () => {
    const keyword = 'null';

    testWrong('name', keyword);

    testReset();
  });

  it('按已有的【商品名称】查找', () => {
    const keyword = '库存量';

    testRight('name', keyword);
  });

  it('先按未有的【SKU】查找，然后重置', () => {
    const keyword = 'null';

    testWrong('skuSn', keyword);

    testReset();
  });

  it('按已有的非全字【SKU】查找', () => {
    const keyword = '22';

    typeAndSearch('skuSn', keyword);

    cy.wait(1000);

    cy.log('【断言】筛选条件不满足情况下的结果为空');
    cy.get(DOM_ROWS).should('have.length', 0);
  });

  it('按已有的全字【SKU】查找', () => {
    const keyword = '585622';

    testRight('skuSn', keyword);
  });

  it('按随机【状态】查找', () => {
    const status = { 1: '上架', 2: '下架' };
    const index = Math.round(Math.random() * 1) + 1;

    cy.get('button[type=submit]')
      .nextAll('a')
      .click();

    cy.wait(500);

    cy.get('.ant-select.select-status').click();

    cy.wait(500);

    cy.get('.ant-select-dropdown-menu>li')
      .eq(index)
      .click();

    cy.get('button[type=submit]').click();

    cy.wait(1000);

    cy.log('【断言】每一条记录的关键字段都与筛选条件对应');
    cy.get('td.status .ant-tag').should('contain', status[index]);
  });
});
