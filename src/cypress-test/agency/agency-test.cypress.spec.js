/// <reference types="Cypress" />

import {
  assertRecordUpdated,
  execModalConfirm,
  initPage,
  testPage,
  testRight,
  testWrong,
  testReset,
  getRecordField,
  getRecordFields,
  generateRandom,
  editItem,
} from '../utils/index';
import { PAGE_AGENCY, DOM_ROWS } from '../constant';

describe('经销商管理测试', () => {
  beforeEach(() => initPage(2, 3));

  it('点击导航进入页面并渲染', () => testPage(PAGE_AGENCY, { filters: 3 }));

  it('先按未有的【经销商名称】查找，然后重置', () => {
    const keyword = 'null';

    testWrong('name', keyword);

    testReset();
  });

  it('按已有的【经销商名称】查找', () => {
    const index = Math.round(Math.random());
    const keyword = Cypress.$('td.name')
      .eq(index)
      .text();

    testRight('name', keyword);
  });

  it('先按未有的【经销商编码】查找，然后重置', () => {
    const keyword = 'null';

    testWrong('code', keyword);

    testReset();
  });

  it('按已有但不完整的【经销商编码】查找', () => {
    const index = Math.round(Math.random());
    const keyword = Cypress.$('td.code')
      .eq(index)
      .text()
      .slice(0, 1);

    testWrong('code', keyword);

    testReset();
  });

  it('按已有的完整的【经销商编码】查找', () => {
    const index = Math.round(Math.random());
    const keyword = Cypress.$('td.code')
      .eq(index)
      .text();

    testRight('code', keyword);
  });

  it('先按未有的【经销商等级】查找，然后重置', () => {
    const keyword = 'null';

    testWrong('grade', keyword);

    testReset();
  });

  it('按已有的【经销商等级】查找', () => {
    const index = Math.round(Math.random());
    const keyword = Cypress.$('td.grade')
      .eq(index)
      .text();

    testRight('grade', keyword);
  });

  it('尝试经销商【编辑】操作', () => {
    const index = 0;
    const record = getRecordFields(index, ['name', 'grade', 'discount']);

    let newKeyWord = generateRandom('lettersUpperCase', 1, {
      characters: 'ABCD'.replace(record.grade, ''),
    });

    editItem(index);

    cy.wait(800);

    cy.get('.ant-modal-content .sy-admin-form-group')
      .last()
      .find('.ant-form-item')
      .should('have.length', 8)
      .then($el =>
        cy.wait(1000).then(() =>
          Object.keys(record).forEach((key, index) => {
            cy.wrap($el.eq(index).find('input')).should(
              'have.value',
              key === 'discount'
                ? Number.prototype.toFixed.call(
                    +record[key].replace('折', ''),
                    1
                  )
                : record[key]
            );
          })
        )
      );

    cy.log('【断言】角色已有信息完整且准确');

    cy.wait(500);

    cy.log('尝试更改【等级】以更新角色');

    cy.get('.ant-modal-content .ant-form-item')
      .find(`input#grade`)
      .clear()
      .type(newKeyWord);

    execModalConfirm(500);

    cy.wait(1000).then(() => {
      assertRecordUpdated(
        'code',
        getRecordField(index, 'code'),
        { grade: newKeyWord },
        true
      );
    });
  });

  it('尝试【修改余额】操作', () => {
    const index = 0;
    const action = { type: 'add', amount: 3 };
    const record = Object.assign(getRecordFields(index, ['code']), {
      balance: Cypress.$('td.balance')
        .find('a')
        .text()
        .split('￥')[1],
    });

    const newKeyWord = (
      parseFloat(record.balance) +
      (action.type === 'add' ? action.amount : -action.amount)
    ).toFixed(2);

    cy.get('.ant-table-selection-column .ant-checkbox-input')
      .eq(index + 1)
      .check();

    cy.get('.sy-admin-list button')
      .contains('修改余额')
      .click({ force: true });

    cy.wait(500);

    cy.get('.ant-modal-content .sy-admin-form-group')
      .last()
      .find('.ant-form-item')
      .should('have.length', 2)
      .then(() => cy.log('【断言】新增角色表单完整'));

    cy.get('.ant-modal .ant-form-item')
      .find(`input.ant-radio-input[value=${action.type}]`)
      .check();

    cy.get('.ant-modal .ant-form-item')
      .find(`input#amount`)
      .type(action.amount);

    execModalConfirm(200);

    assertRecordUpdated('code', record.code, {
      balance: newKeyWord,
    });
  });
});
