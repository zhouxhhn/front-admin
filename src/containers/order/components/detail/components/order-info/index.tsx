import * as React from 'react';
import { observer } from 'mobx-react';
import { Card, Tag, Divider } from 'antd';
import { List } from '@sipin/siyue-admin-components';
import { toJS } from 'mobx';
import moment from 'moment';
import nanoid from 'nanoid';
import { createMultipleDescriptionList } from '../../utils';
import STATUS from '../../../../../../utils/common-status';
import { FORMAT_TIME } from '../../../../../../utils/constant';
import {
  ORDER,
  GOODS,
  PURCHASE,
  INFO_BASIC,
  INFO_DELIVERY,
  INFO_GOODS,
  INFO_PAYMENT,
  INFO_PURCHASE,
  TAGS,
  ABSTRACT,
} from '../../constant';
import style from './index.module.scss';

export interface OrderInfoProps {
  store: any;
  page: any;
}

@observer
export default class OrderInfo extends React.Component<OrderInfoProps> {
  constructor(props) {
    super(props);
  }

  getBasicInfoConfig = data => {
    const { page } = this.props;
    const isPageSales = page === 'sales';

    return {
      listProps: { title: <h3 className="title-basic-info">基础信息</h3> },
      data,
      items: [
        {
          label: '订单号',
          dataIndex: 'no',
          className: 'orderNo',
        },
        {
          label: '经销商',
          dataIndex: 'agencyName',
        },
        {
          label: '订单状态',
          dataIndex: 'statusId',
          render(text) {
            return <span>{STATUS[text]}</span>;
          },
        },
        {
          label: '下单时间',
          dataIndex: 'createdAt',
          render(text) {
            return text ? (
              <span>{moment(text).format(FORMAT_TIME)}</span>
            ) : null;
          },
        },
        isPageSales && {
          label: '导购员',
          dataIndex: 'salerName',
        },
        {
          label: '操作员',
          dataIndex: isPageSales ? 'createrName' : 'auditorName',
        },
        {
          label: '备注',
          dataIndex: 'note',
          width: '100%',
        },
      ].filter(Boolean),
    };
  };

  getDeliveryInfoConfig = data => {
    const { page } = this.props;
    const isPageSales = page === 'sales';

    return {
      listProps: { title: <h3 className="title-delivery-info">配送信息</h3> },
      data,
      items: [
        {
          label: '收货人',
          dataIndex: 'name',
        },
        {
          label: '手机',
          dataIndex: 'mobile',
        },
        {
          label: '收货地址',
          dataIndex: 'address',
          width: '100%',
          render(text, record) {
            if (record && Object.values(record).length) {
              const {
                province = '',
                city = '',
                district = '',
                addr = '',
              }: any = record;

              return <span>{`${province} ${city} ${district} ${addr}`}</span>;
            } else {
              return null;
            }
          },
        },
        {
          label: '',
          dataIndex: isPageSales ? 'waybills' : 'expressInfo',
          width: '50%',
          render(data) {
            const align: any = 'center';
            const tableConfig = {
              columns: [
                {
                  title: '物流公司',
                  dataIndex: isPageSales
                    ? 'logisticsCompany'
                    : 'expressCompany',
                  width: '300px',
                  align,
                },
                {
                  title: '运单号',
                  dataIndex: isPageSales ? 'waybillNumber' : 'expressNo',
                  width: '350px',
                  align,
                },
              ],
              rowKey: record => record.expressNo || nanoid(),
              rowSelection: false,
              dataSource: data,
              pagination: false,
              title: () => <h3 className="title-express-info">物流信息</h3>,
            };

            return <List table={tableConfig} />;
          },
        },
      ],
    };
  };

  getOrderAbstractConfig = data => {
    return {
      listProps: { className: `goodsAmount ${style.abstractWrap}` },
      data,
      items: [
        {
          label: (
            <span className={`${style.labelWrap} u-ellipsis`}>
              会员折扣优惠
            </span>
          ),
          dataIndex: 'discount',
          width: '100%',
          render(text) {
            return <span>￥{text || 0}</span>;
          },
        },
        {
          label: (
            <span className={`${style.labelWrap} u-ellipsis`}>优惠券金额</span>
          ),
          dataIndex: 'couponAmount',
          width: '100%',
          render(text) {
            return <span>￥{text || 0}</span>;
          },
        },
        {
          label: (
            <span className={`${style.labelWrap} u-ellipsis`}>
              整单优惠金额
            </span>
          ),
          dataIndex: 'wholeDiscountAmount',
          width: '100%',
          render(text) {
            return <span>￥{text || 0}</span>;
          },
        },
        {
          label: (
            <span className={`${style.labelWrap} u-ellipsis`}>应收金额</span>
          ),
          dataIndex: 'payableAmount',
          width: '100%',
          render(text, record) {
            const {
              cashAmount,
              giveChange,
              onlinePayment,
              pointsDiscount,
            } = record;

            return (
              <div>
                <div>￥{text}</div>
                <div>
                  ( 现金：￥
                  {cashAmount || 0}
                  <Divider type="vertical" />
                  在线支付：￥
                  {onlinePayment || 0}
                  <Divider type="vertical" />
                  积分抵扣：￥
                  {pointsDiscount || 0}
                  <Divider type="vertical" />
                  找零：￥
                  {giveChange || 0} )
                </div>
              </div>
            );
          },
        },
        {
          label: (
            <span className={`${style.labelWrap} u-ellipsis`}>实收金额</span>
          ),
          dataIndex: 'paidAmount',
          width: '100%',
          render(text) {
            return <span>￥{text || 0}</span>;
          },
        },
      ],
    };
  };

  getItemConfig = (type, data): any => {
    switch (type) {
      case INFO_BASIC:
        return this.getBasicInfoConfig(data);
      case INFO_DELIVERY:
        return this.getDeliveryInfoConfig(data);
      case ABSTRACT:
        return this.getOrderAbstractConfig(data);
      default:
        break;
    }
  };

  renderDescription = (item, itemData): any => {
    return createMultipleDescriptionList(this.getItemConfig(item, itemData));
  };

  renderTable(item, dataSource) {
    const {
      store: { basicInfo /*, deliveryInfo*/ },
    } = this.props;

    const align: any = 'center';

    const columns = {
      [INFO_PURCHASE]: [
        {
          title: '商品名称',
          dataIndex: 'name',
          align,
        },
        {
          title: 'SKU',
          dataIndex: 'skuSn',
          align,
        },
        {
          title: '属性',
          dataIndex: 'specification',
          align,
          render(text, record) {
            return (
              <span>
                规格：
                {text.trim() ? text : '无'}
                ；颜色：
                {record.color.trim() ? record.color : '无'}
                ；材质：
                {record.texture.trim() ? record.texture : '无'}
              </span>
            );
          },
        },
        {
          title: '售价',
          dataIndex: 'amount',
          align,
        },
        {
          title: '采购价',
          dataIndex: 'discountAmount',
          align,
        },
        {
          title: '采购数量',
          dataIndex: 'total',
          align,
        },
      ],
      [INFO_PAYMENT]: [
        {
          title: '支付金额',
          dataIndex: 'price',
          align,
        },
        {
          title: '支付方式',
          dataIndex: 'paymentMethod',
          align,
          render(text) {
            return <span>{text}</span>;
          },
        },
        {
          title: '支付账号',
          dataIndex: 'account',
          align,
        },
        {
          title: '交易号',
          dataIndex: 'partnerTradeNo',
          align,
        },
        {
          title: '交易时间',
          dataIndex: 'paidAt',
          align,
          render(text) {
            return <span>{text ? moment(text).format(FORMAT_TIME) : ''}</span>;
          },
        },
      ],
      [INFO_GOODS]: [
        {
          title: '商品名称',
          dataIndex: 'name',
          align,
        },
        {
          title: 'SKU',
          dataIndex: 'skuSn',
          align,
        },
        {
          title: '属性',
          dataIndex: 'specification',
          align,
          render(text, record) {
            return (
              <span>
                规格：
                {text.trim() ? text : '无'}
                ；颜色：
                {record.color.trim() ? record.color : '无'}
                ；材质：
                {record.texture.trim() ? record.texture : '无'}
              </span>
            );
          },
        },
        {
          title: '合计数量',
          dataIndex: 'quantity',
          align,
        },
        {
          title: '系统售价',
          dataIndex: 'originalAmount',
          align,
        },
        {
          title: '实际售价',
          dataIndex: 'amount',
          align,
        },
        {
          title: '小计',
          dataIndex: 'subtotal',
          align,
        },
        {
          title: '标记',
          dataIndex: '',
          align,
          render(text, record) {
            return (
              <span>
                {Object.keys(TAGS).map(
                  item =>
                    record && record[item] ? (
                      <Tag color={TAGS[item].color} key={nanoid()}>
                        {TAGS[item].name}
                      </Tag>
                    ) : item === 'pickup' && !record[item] ? (
                      <Tag color={TAGS[item].color} key={nanoid()}>
                        寄送
                      </Tag>
                    ) : null
                )}
              </span>
            );
          },
        },
      ],
    };
    const tableConfig = {
      columns: columns[item],
      rowKey: record => record.id || nanoid(),
      rowSelection: false,
      dataSource,
      pagination: false,
      rowClassName: () => `tableRow-${item}`,
      title: () =>
        item === INFO_PAYMENT ? (
          <h3 className="title-payment-info">支付信息</h3>
        ) : null,
      footer: data =>
        data && data.length ? (
          <div className="u-text-right u-color-333">
            {`共 ${data.length} 件，商品总额：￥ ${toJS(basicInfo).amount ||
              0} 元`}
          </div>
        ) : null,
    };

    return <List table={tableConfig} />;
  }

  render() {
    const { store, page } = this.props;
    const _renderItems = {
      [ORDER]: [INFO_BASIC, INFO_DELIVERY, INFO_PAYMENT],
      [GOODS]: [INFO_GOODS],
      [PURCHASE]: [INFO_PURCHASE],
    };

    return (
      <div className="order-info-container">
        {Object.keys(_renderItems).map(
          (sec, index) =>
            Object.values(toJS(store[_renderItems[sec][0]]) || []).length ? (
              <Card
                key={sec}
                type="inner"
                title={
                  <span className="u-f18">
                    {sec}
                    信息
                  </span>
                }
                className={`card-${_renderItems[sec][0]} ${
                  index > 0 ? style.mt20 : ''
                }`}
              >
                {_renderItems[sec].map((item, index) => {
                  const itemData = toJS(store[item]);

                  return itemData && Object.values(itemData).length ? (
                    page === 'purchase' && item === INFO_PAYMENT ? null : (
                      <div
                        className={`order-${item} ${
                          index > 0 ? style.dividerTop : ''
                        }`}
                        key={itemData.id || index}
                      >
                        {item === INFO_BASIC || item === INFO_DELIVERY
                          ? this.renderDescription(item, itemData)
                          : this.renderTable(item, itemData)}
                        {item === INFO_GOODS ? (
                          <div className={style.mt20}>
                            {this.renderDescription(
                              ABSTRACT,
                              toJS(store[INFO_BASIC])
                            )}
                          </div>
                        ) : null}
                      </div>
                    )
                  ) : null;
                })}
              </Card>
            ) : null
        )}
      </div>
    );
  }
}
