/// <reference types="Cypress" />

import {
  assertRecords,
  initPage,
  testPage,
  testRight,
  testWrong,
  testReset,
  getRandomRecordField,
  generateRandom,
  getRecordFields,
  execModalConfirm,
  getRecordField,
  assertRecordUpdated,
  removeItem,
  assertRecordRemoved,
} from '../utils/index';
import { PAGE_SHOP, DOM_ROWS } from '../constant';

describe('门店管理测试', () => {
  beforeEach(() => initPage(2, 2));

  it('点击导航进入页面并渲染', () => testPage(PAGE_SHOP, { filters: 3 }));

  it('先按未有的【门店名称】查找，然后重置', () => {
    const keyword = 'null';

    testWrong('name', keyword);

    testReset();
  });

  it('按已有的【门店名称】查找', () => {
    const key = 'name';
    const keyword = getRandomRecordField(key);

    testRight(key, keyword);
  });

  it('先按未有的【门店编码】查找，然后重置', () => {
    const keyword = 'null';

    testWrong('code', keyword);

    testReset();
  });

  it('按已有但不完整的【门店编码】查找', () => {
    const key = 'code';
    const keyword = getRandomRecordField(key).slice(0, 1);

    testWrong(key, keyword);

    testReset();
  });

  it('按已有的【门店编码】查找', () => {
    const key = 'code';
    const keyword = getRandomRecordField(key);

    testRight(key, keyword);
  });

  it('先按未有的【所属经销商】查找，然后重置', () => {
    const keyword = 'null';

    testWrong('agencyName', keyword);

    testReset();
  });

  it('按已有的【所属经销商】查找', () => {
    const key = 'agencyName';
    const keyword = getRandomRecordField(key)
      .split('(')
      .shift();

    testRight(key, keyword);
  });

  it('尝试门店【新增】操作', () => {
    const shopName_Existed = '广州新天地门店';

    const shopInfo = {
      name: generateRandom('string', 3, { prefix: '0', characters: '0-9' }),
      address: '广东省广州市',
      phone: 123,
      agencyName: 'A00002',
    };

    cy.get('.sy-admin-list button')
      .contains('添 加')
      .click({ force: true });

    cy.wait(500);

    cy.get('.ant-modal-content .sy-admin-form-group')
      .last()
      .find('.ant-form-item')
      .should('have.length', 4);

    cy.log('【断言】新增门店表单完整');

    cy.log('尝试使用【已有名称】添加门店');

    cy.get('.ant-modal-content input#name').type(shopName_Existed);

    cy.get('.ant-modal-footer button')
      .last()
      .click();

    cy.wait(500);

    cy.get('.ant-form-item-control.has-error').should(
      'have.length.greaterThan',
      0
    );
    cy.log('【断言】必填项未填后给予提示');

    cy.get('.ant-modal-content input#address').type(shopInfo.address);

    cy.get('.ant-modal-content input#phone').type(shopInfo.phone);

    cy.get('.ant-modal-content .sy-admin-form-group button')
      .contains('选择经销商')
      .click({ force: true });

    cy.wait(500);

    cy.get('.ant-modal-body .ant-table-body td')
      .contains(shopInfo.agencyName)
      .next()
      .find('button')
      .click();

    cy.get('.ant-modal-footer button')
      .last()
      .click();

    cy.wait(500);

    cy.get('.ant-message .ant-message-error')
      .should('contain', '门店名称重复')
      .then(() => cy.log('【断言】输入已有的门店名称提示报错'));

    cy.wait(500);

    cy.log('尝试使用【新名称】添加门店');

    cy.get('.ant-modal-content input#name')
      .clear()
      .type(shopInfo.name);

    cy.get('.ant-modal-footer button')
      .last()
      .click();

    cy.wait(1000);

    assertRecords(true, shopInfo);
  });

  it('尝试门店【编辑】操作', () => {
    const index = 2;
    const record = getRecordFields(index, [
      'name',
      'address',
      'phone',
      'agencyName',
    ]);
    const code = getRecordField(index, 'code');

    let newKeyWord;

    cy.get('.ant-table-selection-column .ant-checkbox-input')
      .eq(index + 1)
      .check();

    cy.wait(500);

    cy.get('.sy-admin-list button')
      .contains('编 辑')
      .click({ force: true });

    cy.wait(800);

    cy.get('.ant-modal-content .sy-admin-form-group')
      .last()
      .find('.ant-form-item')
      .should('have.length', 4)
      .then($el =>
        Object.keys(record).forEach((key, index) => {
          if (index !== 3) {
            cy.wrap($el.eq(index).find('input')).should(
              'have.value',
              record[key]
            );
          } else {
            cy.wrap($el.eq(index).find('.ant-tag')).should(
              'have.text',
              record[key].split('(').shift()
            );
          }
        })
      );

    cy.log('【断言】门店已有信息完整且准确');

    cy.wait(500);

    cy.log('尝试更改【所属经销商】以编辑门店');

    cy.get('.ant-modal-content .sy-admin-form-group button')
      .contains('选择经销商')
      .click({ force: true });

    cy.wait(500);

    // 随机选择一个经销商
    cy.log('【随机】选择一个经销商');
    cy.get('.ant-modal-body .ant-table-tbody')
      .children('tr')
      .then($el => {
        $el
          .filter(
            (i, el) =>
              Cypress.$(el)
                .find('td')
                .eq(1)
                .text() !== code
          )
          .eq(Math.round(Math.random() * ($el.length - 1)) - 1)
          .find('td')
          .last()
          .find('button')
          .click();
      });

    cy.wait(800).then(() => {
      newKeyWord = Cypress.$('.ant-form-item .ant-tag').text();
    });

    cy.get('.ant-modal-footer button')
      .last()
      .click();

    cy.wait(1000).then(() => {
      assertRecordUpdated('name', record.name, {
        ...record,
        agencyName: newKeyWord,
      });
    });
  });

  it('尝试门店【删除】操作', () => {
    const index = 2;

    removeItem(index);

    cy.wait(1000);

    assertRecordRemoved('code', getRecordField(index, 'code'));
  });

  it.skip('尝试门店【管理配送信息】操作', () => {
    const deliveryInfo = {
      receiverName: '01',
      cellphone: '123',
      address: '广州',
    };

    const index = 0;

    cy.get('.ant-table-selection-column .ant-checkbox-input')
      .eq(index + 1)
      .check();

    cy.wait(500);

    cy.get('.sy-admin-list button')
      .contains('管理配送信息')
      .click({ force: true });

    cy.wait(800);

    cy.log('【测试】新增配送地址');

    cy.get('.ant-modal')
      .find('button')
      .contains('添 加')
      .click({ force: true });

    cy.wait(500);

    Object.keys(deliveryInfo).forEach(k =>
      cy
        .get('.ant-modal-body')
        .find(`input#${k}`)
        .type(deliveryInfo[k])
    );

    cy.get('.ant-cascader-picker')
      .click({ force: true })
      .then(() => {
        cy.wait(500);

        cy.get('.ant-cascader-menu-item[title="北京"]').click();

        cy.wait(200);

        cy.get('.ant-cascader-menu-item[title="东城区"]').click();

        cy.wait(200);

        cy.get('.ant-cascader-menu-item[title="内环到三环里"]').click();

        cy.get('input#defaultAddress').check();
      });

    cy.wait(500);

    execModalConfirm();

    cy.wait(500);

    assertRecords.call('.ant-modal', true, deliveryInfo);

    cy.wait(500);

    cy.log('【测试】编辑配送地址');

    cy.get('.ant-modal .ant-table-selection-column .ant-checkbox-input')
      .eq(Cypress.$(`.ant-modal ${DOM_ROWS}`).length - 1)
      .check();

    cy.wait(200);

    cy.get('.ant-modal')
      .find('button')
      .contains('编 辑')
      .click({ force: true });

    cy.wait(500);

    const newKeyword = '深圳';

    cy.get('.ant-modal-body')
      .find(`input#address`)
      .clear()
      .type(newKeyword);

    execModalConfirm(200);

    cy.wait(500).then(() => {
      cy.get(`.ant-modal ${DOM_ROWS}`)
        .eq(0)
        .find('td.address')
        .should('contain', newKeyword)
        .then(() => cy.log('【断言】配送信息更改成功！'));
    });

    cy.wait(500);

    cy.log('【测试】删除配送地址');

    let id = '';

    cy.then(() => {
      id = getRecordField.call(
        Cypress.$('.ant-modal'),
        Cypress.$(`.ant-modal ${DOM_ROWS}`).length - 1,
        'id'
      );
    });

    cy.get('.ant-modal .ant-table-selection-column .ant-checkbox-input')
      .eq(Cypress.$(`.ant-modal ${DOM_ROWS}`).length - 1)
      .check();

    cy.wait(500);

    cy.get('.ant-modal')
      .find('button')
      .contains('删 除')
      .click({ force: true });

    cy.wait(500);

    cy.get('.ant-popover .ant-popover-buttons')
      .children()
      .last()
      .click({ force: true });

    cy.wait(800);

    cy.then(() => {
      assertRecords.call('.ant-modal', false, 'id', id);
    });

    cy.wait(500);

    cy.log('【测试】设为默认配送地址');

    cy.get('.ant-modal .ant-table-selection-column .ant-checkbox-input')
      .eq(Cypress.$(`.ant-modal ${DOM_ROWS}`).length - 1)
      .check();

    cy.wait(500);

    cy.get('.ant-modal')
      .find('button')
      .contains('设为默认')
      .click({ force: true });

    cy.wait(500);

    cy.get('.ant-popover .ant-popover-buttons')
      .children()
      .last()
      .click({ force: true });

    cy.wait(800);

    cy.get(`.ant-modal ${DOM_ROWS}`)
      .eq(Cypress.$(`.ant-modal ${DOM_ROWS}`).length - 1)
      .find('td.address')
      .should('have.descendants', '.ant-tag')
      .then($el =>
        cy
          .wrap($el.find('.ant-tag'))
          .should('have.text', '默认')
          .then(() => cy.log('【断言】地址已被设为默认'))
      );
  });
});
