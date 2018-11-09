/// <reference types="Cypress" />

import {
  assertRecords,
  initPage,
  testPage,
  testRight,
  testWrong,
  testReset,
  generateRandom,
  getRecordField,
  execModalConfirm,
  assertRecordUpdated,
  typeAndSearch,
} from '../utils/index';
import { PAGE_MEMBER, DOM_ROWS } from '../constant';

const keys = ['name', 'empno', 'shopName', 'status'];

const empno = generateRandom('number');

describe('系统管理->员工管理 测试', () => {
  beforeEach(() => initPage(2, 0));

  it('点击导航进入页面并渲染', () => testPage(PAGE_MEMBER, { filters: 3 }));

  it('先按未有的【姓名】查找，然后重置', () => {
    const keyword = 'null';

    typeAndSearch('userName', keyword);

    cy.wait(1000);

    assertRecords(false);

    testReset();
  });

  it('按已有的【姓名】查找', () => {
    const index = Math.round(Math.random());
    const keyword = Cypress.$(`td.${keys[0]}`)
      .eq(index)
      .text();

    typeAndSearch('userName', keyword);

    cy.wait(1000);

    assertRecords(true, keys[0], keyword);
  });

  it('先按未有的【工号】查找，然后重置', () => {
    const keyword = 'null';

    testWrong(keys[1], keyword);

    testReset();
  });

  it('按已有但不完整的【工号】查找', () => {
    const index = Math.round(Math.random());
    const keyword = Cypress.$(`td.${keys[1]}`)
      .eq(index)
      .text()
      .slice(0, 1);

    testWrong(keys[1], keyword);

    testReset();
  });

  it('按已有的完整的【工号】查找', () => {
    const index = Math.round(Math.random());
    const keyword = Cypress.$(`td.${keys[1]}`)
      .eq(index)
      .text();

    testRight(keys[1], keyword);
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
    const shopName = '广州新天地门店';

    cy.get('.ant-select.select-shop').click();

    cy.wait(500);

    cy.get('.ant-select-dropdown-menu>li')
      .eq(0)
      .click();

    cy.get('button[type=submit]').click();

    cy.wait(1000);

    assertRecords(true, keys[2], shopName);
  });

  it('尝试员工【新增】操作', () => {
    const empno_Existed = '01';

    const memberInfo = {
      type: '门店管理员',
      shopName: '广州新天地门店',
      name: '01',
      empno,
      password: '001',
    };

    cy.get('.sy-admin-list button')
      .contains('添 加')
      .click({ force: true });

    cy.wait(500);

    cy.get('.ant-modal-content .sy-admin-form-group')
      .last()
      .find('.ant-form-item')
      .should('have.length', 5);

    cy.log('【断言】新增员工表单完整');

    cy.log('尝试使用【已有工号】添加员工');

    cy.get('.ant-modal-content input#empno').type(empno_Existed);

    cy.get('.ant-modal-footer button')
      .last()
      .click();

    cy.wait(500);

    cy.get('.ant-form-item-control.has-error').should(
      'have.length.greaterThan',
      0
    );
    cy.log('【断言】必填项未填后给予提示');

    cy.get('.ant-modal-content .ant-select')
      .eq(0)
      .click({ force: true })
      .then(() => {
        cy.wait(500);
        cy.get('.ant-select-dropdown li')
          .contains(memberInfo.type)
          .click();
      });

    cy.get('.ant-modal-content .ant-select')
      .eq(1)
      .click({ force: true })
      .then(() => {
        cy.wait(500);
        cy.get('.ant-select-dropdown li')
          .contains(memberInfo.shopName)
          .click();
      });

    cy.get('.ant-modal-content input#name').type(memberInfo.name);

    cy.get('.ant-modal-content input#password').type(memberInfo.password);

    execModalConfirm(500);

    cy.wait(500);

    cy.get('.ant-message .ant-message-error').should(
      'contain',
      '工号重复，不能新增'
    );
    cy.log('【断言】输入已有工号提示报错');

    cy.wait(500);

    cy.log('尝试使用【新工号】添加员工');
    cy.get('.ant-modal-content input#empno')
      .clear()
      .type(memberInfo.empno);

    execModalConfirm(500);

    cy.wait(1000);

    assertRecords(true, 'empno', memberInfo.empno);
  });

  it('尝试员工【绑定角色】操作', () => {
    const role = '角色授权';

    cy.get(DOM_ROWS)
      .find('td.empno')
      .contains(empno)
      .then($el => {
        cy.wrap($el)
          .siblings('.ant-table-selection-column')
          .find('.ant-checkbox-input')
          .check();
      });

    cy.wait(500);

    cy.get('.sy-admin-list .u-mb-10 button')
      .last()
      .click({ force: true });

    cy.wait(500);

    cy.get('.ant-modal .ant-select')
      .click()
      .then(() => {
        cy.wait(200);

        cy.get('.ant-select-dropdown-menu')
          .find('li[aria-disabled=false]')
          .contains(role)
          .click();
      });

    execModalConfirm(500);

    cy.wait(1000);

    cy.get(DOM_ROWS)
      .find('td.empno')
      .contains(empno)
      .then($el => {
        cy.log(
          `【断言】员工绑定角色${
            $el
              .siblings('.roleList')
              .find('p')
              .get()
              .some(el => Cypress.$(el).text() === role)
              ? '成功'
              : '失败'
          }`
        );
      });
  });

  it('尝试员工【编辑】操作', () => {
    const keys = ['shopName', 'name', 'empno'];

    let record = {};

    let code = '';

    const newKeyWord = generateRandom('string', 5, {
      prefix: '0',
      characters: '0-9',
    });

    cy.get(DOM_ROWS)
      .find('td.empno')
      .contains(empno)
      .then($el => {
        cy.then(() =>
          keys.reduce((pre, cur) => {
            pre[cur] = $el
              .parent()
              .find(`td.${cur}`)
              .text();

            return pre;
          }, record)
        );

        code = $el.siblings(`td.code`).text();

        cy.wrap($el)
          .siblings('.ant-table-selection-column')
          .find('.ant-checkbox-input')
          .check();
      });

    cy.wait(500);

    cy.get('.sy-admin-list button')
      .contains('编 辑')
      .click({ force: true });

    cy.wait(800);

    cy.get('.ant-modal-content .sy-admin-form-group')
      .last()
      .find('.ant-form-item')
      .should('have.length', 5)
      .then($el =>
        Object.keys(record).forEach((key, index) => {
          if (index !== 0) {
            cy.wrap($el.eq(index + 1).find('input')).should(
              'have.value',
              record[key]
            );
          } else {
            cy.wrap(
              $el.eq(index + 1).find('.ant-select-selection-selected-value')
            ).should('have.text', record[key]);
          }
        })
      );

    cy.log('【断言】员工已有信息完整且准确');

    cy.wait(500);

    cy.log('尝试更改【工号】以编辑员工');

    cy.get('.ant-modal-content')
      .find('input#empno')
      .clear()
      .type(newKeyWord);

    execModalConfirm(500);

    cy.wait(1000).then(() => {
      assertRecordUpdated('code', code, { ...record, empno: newKeyWord });
    });
  });

  it('尝试员工【修改状态】操作', () => {
    const index = 0;
    const status = getRecordField(index, 'status');
    cy.get('.ant-table-selection-column .ant-checkbox-input')
      .eq(index + 1)
      .check();

    cy.wait(500);

    cy.get('.sy-admin-list .u-mb-10 button')
      .eq(2)
      .click({ force: true });

    cy.wait(1000);

    cy.get(DOM_ROWS)
      .get(`td.${keys[3]}`)
      .eq(index)
      .should('not.eq', status)
      .then(() => {
        cy.wait(800);
        cy.log('【断言】状态修改成功');
      });
  });
});
