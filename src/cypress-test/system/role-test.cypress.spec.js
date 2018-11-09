/// <reference types="Cypress" />

import {
  assertRecords,
  initPage,
  testPage,
  execModalConfirm,
  editItem,
  getRecordFields,
  assertRecordUpdated,
  removeItem,
  assertRecordRemoved,
  generateRandom,
  shouldHaveError,
} from '../utils/index';
import { PAGE_ROLE } from '../constant';

describe('系统管理->角色管理 测试', () => {
  beforeEach(() => initPage(2, 1));

  it('点击导航进入页面并渲染', () => testPage(PAGE_ROLE));

  it('尝试角色【新增】操作', () => {
    const nameExisted = '超级管理员';

    const roleInfo = {
      name: generateRandom('string', 3, { prefix: 0, characters: '0-9' }),
      childrenSystem: '后台',
      status: '启用',
      type: '公有',
      shopName: '广州新天地门店',
    };

    cy.get('.sy-admin-list button')
      .contains('添 加')
      .click({ force: true });

    cy.wait(500);

    cy.get('.ant-modal-content .sy-admin-form-group')
      .last()
      .find('.ant-form-item')
      .should('have.length', 5);

    cy.log('【断言】新增角色表单完整');

    cy.wait(200);

    cy.log('尝试以【已存在】的名称新增员工');

    cy.get('.ant-modal-content input#name').type(nameExisted);

    execModalConfirm(200);

    cy.wait(500);

    cy.get('.ant-form-item-control.has-error')
      .should('have.length.greaterThan', 0)
      .then(() => cy.log('【断言】必填项未填后给予提示'));

    Object.keys(roleInfo)
      .slice(1, -1)
      .forEach(k => {
        cy.get('.ant-modal-content .ant-form-item')
          .find(`#${k} .ant-radio-wrapper`)
          .contains(roleInfo[k])
          .prev('.ant-radio')
          .find('input[type=radio]')
          .check();
        cy.wait(200);
      });

    cy.get('.ant-modal-content .ant-form-item')
      .find('button')
      .contains('选择门店')
      .click({ force: true })
      .then(() => {
        cy.wait(500);
        cy.get('.ant-modal-content .ant-table-row')
          .contains(roleInfo.shopName)
          .nextAll('td')
          .last()
          .find('button')
          .click({ force: true });
      });

    execModalConfirm(500);

    cy.wait(200);

    shouldHaveError('角色名已重复，不能创建');

    cy.wait(200);

    cy.log('尝试以【已存在】的名称新增员工');

    cy.get('.ant-modal-content input#name')
      .clear()
      .type(roleInfo.name);

    execModalConfirm(500);

    cy.wait(1000);

    assertRecords(true, roleInfo);
  });

  it('尝试角色【编辑】操作', () => {
    const index = 0;
    const record = getRecordFields(index, [
      'id',
      'name',
      'childrenSystem',
      'status',
      'type',
      'shopName',
    ]);

    let newKeyWord = record.status === '1' ? '启用' : '禁用';

    editItem(index);

    cy.wait(800);

    cy.get('.ant-modal-content .sy-admin-form-group')
      .last()
      .find('.ant-form-item')
      .should('have.length', 5)
      .then($el =>
        cy.wait(1000).then(() =>
          Object.keys(record).forEach((key, index) => {
            if (index === 0) {
              return;
            }
            if (key === 'name') {
              cy.wrap($el.eq(index - 1).find('input')).should(
                'have.value',
                record[key]
              );
            } else {
              if (key === 'shopName') {
                cy.wrap($el.eq(index - 1).find('.ant-tag')).should(
                  'contain',
                  record[key]
                );
              } else {
                cy.wrap($el.eq(index - 1).find('.ant-radio-wrapper'))
                  .contains(record[key])
                  .prev('.ant-radio')
                  .should('have.class', 'ant-radio-checked');
              }
            }
          })
        )
      );

    cy.log('【断言】角色已有信息完整且准确');

    cy.wait(500);

    cy.log('尝试更改【状态】以更新角色');

    cy.get('.ant-modal-content .ant-form-item')
      .find(`#status`)
      .contains(newKeyWord)
      .find('input[type=radio]')
      .check();

    execModalConfirm(500);

    cy.wait(1000).then(() => {
      assertRecordUpdated(
        'id',
        record.id,
        { ...record, status: newKeyWord },
        true
      );
    });
  });

  it('尝试角色【删除】操作', () => {
    const index = 0;
    const record = getRecordFields(index, ['id']);
    removeItem(index);
    cy.wait(1000);
    assertRecordRemoved('id', record.id);
  });
});
