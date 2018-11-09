/// <reference types="Cypress" />

import generateId from 'nanoid/generate';
import {
  PAGE_LOGIN,
  HOST,
  USERNAME,
  PASSWORD,
  DOM_SHOP_MENU,
  DOM_FILTERS,
  DOM_ROWS,
  PAGE,
  SHOPCODE,
} from '../constant';

/**
 * typeLogin - 输入默认账户信息
 * @param {*} usr   用户名称
 * @param {*} pwd   用户密码
 */
export function typeLogin(usr, pwd) {
  cy.get('#userCode').type(usr);
  cy.get('#password').type(pwd);
}

// 获取门店信息
export function getMenu() {
  cy.get('.shop-selector').click({ force: true });

  cy.wait(500);

  cy.get(DOM_SHOP_MENU).should('have.length.least', 1);
  cy.log('【断言】门店信息不为空');
}

// 登录
export function login() {
  cy.log('【登录】使用admin账户');
  cy.visit(PAGE_LOGIN);

  typeLogin(USERNAME, PASSWORD);

  getMenu();

  cy.get(`${DOM_SHOP_MENU}[data-shopcode=${SHOPCODE}]`).click({ force: true });

  cy.get('button[type=submit]').click({ force: true });

  cy.wait(500);

  // 页面跳转到首页
  cy.url()
    .should('eq', `${HOST}/#/`)
    .then(() => {
      cy.log('【断言】路由成功跳转到首页');

      // 本地存储 token 不为空
      const userInfo = JSON.parse(
        localStorage.getItem(location.host + '.user') || '{}'
      );
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');

      cy.wrap(userInfo)
        .its('name')
        .should('not.be.empty');
      cy.log('【断言】localStorage - userName不为空');

      cy.wrap(userInfo)
        .its('token')
        .should('not.be.empty');
      cy.log('【断言】localStorage - token不为空');

      cy.wrap(userData).should('not.be.empty');
      cy.log('【断言】localStorage - userData不为空');
    });
}

// 登出
export function logout() {
  cy.get('.ant-layout-header .ant-dropdown-trigger')
    .trigger('mouseover')
    .then(() =>
      cy
        .get('.ant-dropdown-menu')
        .children('.ant-dropdown-menu-item')
        .last()
        .click()
    );

  cy.wait(500);

  cy.get('.ant-modal-body .ant-confirm-btns > button')
    .last()
    .click();

  cy.wait(500);

  cy.url()
    .should('eq', PAGE_LOGIN)
    .then(() => {
      cy.log('【断言】路由成功跳转到登录页面');

      const userInfo = JSON.parse(
        localStorage.getItem(location.host + '.user') || '{}'
      );
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');

      cy.wrap(userInfo).should('be.empty');
      cy.log('【断言】localStorage - userInfo为空');

      cy.wrap(userData).should('be.empty');
      cy.log('【断言】localStorage - userData为空');
    });
}

/**
 * openPage - 打开导航对应页面
 * @param {*} headIndex 导航主菜单index
 * @param {*} subIndex  导航子菜单index
 */
export function openPage(headIndex = 0, subIndex = 0) {
  cy.get('.ant-menu > .ant-menu-submenu')
    .eq(headIndex)
    .as('head')
    .click();

  cy.wait(500);

  cy.get('@head')
    .find('.ant-menu-item')
    .eq(subIndex)
    .click();
}

/**
 * openPage - 初始化对应页面
 * @param {*} headIndex 导航主菜单index
 * @param {*} subIndex  导航子菜单index
 */
export function initPage(headIndex = 0, subIndex = 0) {
  login();
  cy.wait(500);
  openPage(headIndex, subIndex);
  cy.wait(500);
}

// <============================ !!! List Records UT Only !!! ============================>

/**
 * assertRecords - 搜索结果断言
 * @param {*} hasRecords    结果是否为空
 * @param {*} key           关联字段
 * @param {*} value         关键词
 */
export function assertRecords(hasRecords, key, value) {
  cy.then(() => {
    let records = Cypress.$(this || 'body').find(DOM_ROWS);
    if (hasRecords) {
      cy.wrap(records).should('have.length.greaterThan', 0);
      cy.log('【断言】当前列表显示的结果不为空');

      if (typeof arguments[1] === 'object') {
        Object.keys(arguments[1]).forEach(key => {
          cy.wrap(records.find(`td.${key}`)).should(
            'contain',
            arguments[1][key]
          );
          cy.log(
            `【断言】当前列表存在关键字段"${key}" 包含 "${
              arguments[1][key]
            }"的记录`
          );
        });
      } else {
        if (
          typeof arguments[1] === 'string' &&
          typeof arguments[2] === 'string'
        ) {
          cy.wrap(records.find(`td.${key}`)).should('contain', value);
          cy.log(`【断言】当前列表存在关键字段"${key}" 包含 "${value}"的记录`);
        } else {
          return;
        }
      }
    } else {
      if (arguments[1]) {
        if (typeof arguments[1] === 'object') {
          Object.keys(arguments[1]).forEach(key => {
            cy.wrap(records.find(`td.${key}`)).should(
              'not.contain',
              arguments[1][key]
            );
            cy.log(
              `【断言】当前列表不存在关键字段"${key}" 包含 "${
                arguments[1][key]
              }"的记录`
            );
          });
        } else {
          if (
            typeof arguments[1] === 'string' &&
            typeof arguments[2] === 'string'
          ) {
            cy.wrap(records.find(`td.${key}`)).should('not.contain', value);
            cy.log(
              `【断言】当前列表不存在关键字段"${key}" 包含 "${value}"的记录`
            );
          } else {
            return;
          }
        }
      } else {
        cy.wrap(records).should('have.length', 0);
        cy.log(`【断言】当前列表所显示的记录为空`);
      }
    }
  });
}

export function assertRecordAdded() {}

/**
 * assertRecordUpdated - 记录更新断言
 * @param {*} key           用于识别记录的唯一key
 * @param {*} value         key的对应值
 * @param {*} fields        更新的字段集
 * @param {*} useRestrict   是否使用严格模式
 */
export function assertRecordUpdated(
  key = 'id',
  value,
  fields,
  useRestrict = false
) {
  cy.then(() => {
    if (!(value || Object.values(fields).length)) {
      return;
    }
    let records = Cypress.$(this || 'body').find(DOM_ROWS);
    Object.keys(fields).forEach(k => {
      cy.wrap(records.find(`td.${key}`))
        .contains(value)
        .parent('.ant-table-row')
        .find(`td.${k}`)
        .should(useRestrict ? 'have.text' : 'contain', fields[k])
        .then(() => {
          cy.log(
            `【断言】目标记录更新后的关键字段${k}值${fields[k]}与预期相符`
          );
        });
    });
    cy.log(`【断言】目标记录的新信息更新成功`);
  });
}

/**
 * assertRecordRemoved - 记录删除断言
 * @param {*} uniqueKey   uniqueKey - 用于识别记录的唯一key
 * @param {*} value       key的对应值
 */
export function assertRecordRemoved(uniqueKey = 'id', value) {
  cy.then(() => {
    let flag = true;
    cy.get(DOM_ROWS)
      .find(`td.${uniqueKey}`)
      .should($col => {
        $col &&
          $col.get().every(item => {
            if (
              Cypress.$(item)
                .eq(0)
                .text() === value
            ) {
              flag = false;
              cy.log('【断言】记录删除失败');

              return false;
            } else {
              return true;
            }
          });
      })
      .then(() => flag && cy.log('【断言】记录删除成功'));
  });
}

/**
 * typeAndSearch - 键入关键词并执行搜索
 * ！！！Warning: 只支持输入input格式的表单元素！！！
 * @param {*} formKey
 * @param {*} keyword
 */
export function typeAndSearch(formKey, keyword) {
  cy.get(`input#${formKey}`)
    .type(keyword)
    .then(() => cy.get('button[type=submit]').click());
}

// 测试重置
export function testReset() {
  cy.get('button[type=button]')
    .contains('重 置')
    .click({ force: true });

  cy.wait(1000);

  cy.get(DOM_ROWS).should('have.length.greaterThan', 0);
  cy.log('【断言】重置条件后（即默认条件下）的结果不为空');
}

// 测试错误搜索
export function testWrong(formKey, keyword) {
  typeAndSearch(formKey, keyword);

  cy.wait(1000);

  assertRecords(false);
}

// 测试正确搜索
export function testRight(formKey, keyword) {
  typeAndSearch(formKey, keyword);

  cy.wait(1000);

  assertRecords(true, formKey, keyword);
}

/**
 * testPage - 测试当前页面是否正确
 * @param {*} page      页面
 * @param {*} options   可选项 {filters: 筛选条数，hasRecords: 默认查询结果是否为空}}
 */
export function testPage(page, options) {
  const { filters = 0, hasRecords = true } = options || {};
  cy.url().should('eq', page);
  cy.log('【断言】路由成功进入采购订单页面');

  cy.get('.antd-pro-page-header-title').should(
    'contain',
    PAGE[page].replace('\b', '')
  );
  cy.log('【断言】pageHeader标题正确');

  if (filters) {
    cy.get(DOM_FILTERS).should('have.length', filters);
    cy.log('【断言】filters完整');
  }

  if (hasRecords) {
    cy.get(DOM_ROWS).should('have.length.greaterThan', 0);
    cy.log('【断言】默认查询条件下的结果不为空');
  }
}

/**
 * getRecordField - 获取指定某一条记录的某一个字段
 * @param {*} index rowIndex
 * @param {*} key columnKey
 */
export function getRecordField(index, key) {
  const container = Cypress.$(this || '.ant-table');

  return container
    .find(`table td.${key}`)
    .eq(index)
    .text();
}

/**
 * getRecordFields - 获取指定某一条记录的指定字段集
 * @param {*} index rowIndex
 * @param {*} key columnKeys
 */
export function getRecordFields(index, keys = []) {
  const container = Cypress.$(this || '.ant-table');

  return keys && keys.length
    ? keys.reduce((init, key) => {
        init[key] = container
          .find(`table td.${key}`)
          .eq(index)
          .text();

        return init;
      }, {})
    : '';
}

/**
 * getRandomRecordField - 获取随机记录的某一个字段
 * @param {*} key columnKey
 */
export function getRandomRecordField(key) {
  const container = Cypress.$(this || '.ant-table');
  const index = Math.round(Math.random() * Cypress.$(DOM_ROWS).length) - 1;

  return container
    .find(`table td.${key}`)
    .eq(index)
    .text();
}

/**
 * generateRandom - 生成随机值（可自定义类型，长度，指定字符集、前缀、后缀）
 * @param {string} type       type - 类型：'number' | 'letters' | 'lettersUpperCase' | 'lettersLowerCase'，默认为任意字符串
 * @param {number} length     length - 长度：默认为 6
 * @param {*} options         options - {characters: 字符集, prefix: 前缀, suffix: 后缀}
 * @returns {*}               value
 */
export function generateRandom(type, length, options) {
  // Default params init
  type = type || 'string';
  length = length || 6;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const number = '0123456789';
  const charset = `${alphabet}${alphabet.toLowerCase()}${number}`;

  let { characters = '', prefix = '', suffix = '' } = options || {};

  const _prefixLength = (prefix + '').length;
  const _suffixLength = (suffix + '').length;
  const _additionalLength = _prefixLength + _suffixLength;
  const _length = length > _additionalLength ? length - _additionalLength : 0;

  let value = '';

  let regex = characters.match(/[\w\d]-[\w\d]/g);

  try {
    regex &&
      regex.length &&
      (characters = regex.reduce((pre, reg) => {
        pre += (charset.match(new RegExp(`[${reg}]+`)) || [])[0];

        return pre;
      }, ''));

    switch (type) {
      case 'number':
        _length &&
          (value += generateId(
            (characters.match(new RegExp(`[${number}]+`)) || [])[0] || number,
            _length
          ));
        break;
      case 'letters':
        _length &&
          (value += generateId(
            (characters.match(/[A-z]+/) || [])[0] ||
              `${alphabet}${alphabet.toLowerCase()}`,
            _length
          ));
        break;
      case 'lettersUpperCase':
        _length &&
          (value += generateId(
            (characters.match(new RegExp(`[${alphabet}]+`)) || [])[0] ||
              alphabet,
            _length
          ));
        break;
      case 'lettersLowerCase':
        _length &&
          (value += generateId(
            (characters.match(new RegExp(`[${alphabet.toLowerCase()}]+`)) ||
              [])[0] || alphabet.toLowerCase(),
            _length
          ));
        break;
      default:
        _length && (value += generateId(characters || `${charset}_~`, _length));
        break;
    }
    value =
      (prefix + '').slice(0, length) +
      value +
      (suffix + '').slice(_prefixLength - length);

    return type === 'number' ? +value : value;
  } catch (err) {
    console.log(err);
  }
}

export function execModalConfirm(delay) {
  cy.wait(delay || 0);
  cy.then(() => {
    const container = Cypress.$(this || '.ant-modal');
    cy.wrap(container.find('.ant-modal-footer button'))
      .contains('确 定')
      .click({ force: true });
  });
}

/* !!! get按钮逻辑需完善 !!! */

/**
 * editItem - 触发编辑记录操作
 * @param {*} index ItemIndex
 */
export function editItem(index) {
  cy.get('.ant-table-selection-column .ant-checkbox-input')
    .eq(index + 1)
    .check();

  cy.wait(500);

  cy.get('.sy-admin-list button')
    .contains('编 辑')
    .click({ force: true });
}

/**
 * removeItem - 触发删除记录操作
 * @param {*} index ItemIndex
 */
export function removeItem(index) {
  cy.get('.ant-table-selection-column .ant-checkbox-input')
    .eq(index + 1)
    .check();

  cy.wait(500);

  cy.get('.sy-admin-list button')
    .contains('删 除')
    .click({ force: true })
    .then(() => {
      cy.wait(500).then(() => {
        cy.get('.ant-popover .ant-popover-buttons')
          .children()
          .last()
          .click({ force: true });
      });
    });
}

/**
 * shouldHaveError - 提示错误测试
 * @param {*} tips - wrongTips
 */
export function shouldHaveError(tips) {
  cy.get('.ant-message-error')
    .find('span')
    .should('have.text', tips)
    .then(() => cy.log('【断言】提示错误信息：' + tips));
}
