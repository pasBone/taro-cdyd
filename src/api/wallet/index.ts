import { post } from "@/utils/http"
import { StringOrNumber, BaseList } from "@/types"
import { RECHARGE_CARD_STATUS } from '@/constant';

export const walletApi = {
  /** 钱包充值 */
  recharge: post<walletApi.RechargeReq, walletApi.RechargeRes>("/recharge/recharge"),
  /** 钱包充值纪录 */
  list: post<walletApi.ListReq, walletApi.ListRes>("/recharge/list"),
  /** 获取支付渠道 */
  channelList: post<walletApi.ChannelListReq, walletApi.ChannelList>("/recharge/channelList"),
  /** 获取钱包余额 */
  walletBalance: post<walletApi.WalletReq, walletApi.WalletRes>("/wallet/get"),
  /** 获取充电卡详情 */
  cardDetail: post<walletApi.CardDetailReq, walletApi.CardDetailRes>('/chargeCard/get')

}
/* eslint-disable */
export namespace walletApi {
  export interface RechargeReq {
    /**  会员id **/
    meb_id: StringOrNumber
    /**  支付渠道 **/
    channel: StringOrNumber
    /**  银行类别 **/
    sub_type: StringOrNumber
    /**  支付  类型((1-微信APP支付,2-微信公众号,3-支付宝APP)**/
    way: StringOrNumber
    /**  运营商id **/
    operator_id: StringOrNumber
    /** 微信公众号/支付宝服务窗openid */
    open_id: StringOrNumber
    /**  充值金额 **/
    recharge_fee: StringOrNumber
    /** 同步通知地址 */
    return_url: StringOrNumber,
    /** 充电卡卡id */
    card_id?: string
  }

  export interface WalletReq {
    /** 用户id */
    meb_id: StringOrNumber,
    /** 运营商id */
    operator_id: StringOrNumber
  }

  export interface WalletRes {
    /** 是否提示（1-提示，0不提示） */
    isTip: StringOrNumber,
    totalAmount: StringOrNumber,
    giftAmount: StringOrNumber,
    rechargeAmount: StringOrNumber,
  }

  export interface RechargeRes {
    /** 返回支付信息；way为3时，直接返回url值；way为1或2时，需要取子对象值 */
    pay_info: string | WxPayParams
  }

  export interface ListReq {
    meb_id: StringOrNumber,
    pageNumber: StringOrNumber
  }

  export interface ListGetRes {
    meb_id: StringOrNumber,
    pageNumber: StringOrNumber
  }

  export interface ChannelListReq {
    /** 客户端（1-APP，2-微信公众号） */
    client: StringOrNumber
  }
  export interface ChannelListItemRes {
    /** 银行类别	 */
    sub_type: string
    /** 支付渠道	 */
    channel: string
    /** 支付类型描述	 */
    way_desc: string
    /** 支付类型((1-微信APP支付,2-微信公众号,3-支付宝APP)	 */
    way: number
  }

  export interface WxPayParams {
    /** 随机字符串	 */
    nonceStr: string
    /** 扩展字段	 */
    package: string
    /** 商户号ID	 */
    partnerid: string
    /** 预支付交易会话ID	 */
    prepayid: string
    /**  时间戳	 */
    timeStamp: string
    /** 签名 */
    paySign: string,
    /** 签名类型 */
    signType: string
  }
  /** 充电卡请求参数 */
  export interface CardDetailReq {
    /** meb_id 会员id？ */
    meb_id: string,
    /** 运营商标识 */
    operator_id: string
  }

  /** 充电卡响应 */
  export interface CardDetailRes {
    /** meb_id 会员id？ */
    card_id: string,
    /** 卡编号 */
    card_no: string,
    /** 运行时卡号	 */
    card_sn: string,
    /** 运营商id */
    operator_id: string,
    /** 拥有者id（根据类型） */
    owner_id: string,
    /** 拥有者类型 0-未绑定 1-会员 2-企业  */
    owner_type: string,
    /** 车牌号 */
    plate_number: string,
    /** 持卡人姓名 */
    name: string,
    card_desc: string,
    /** 持卡人手机  */
    tel: string,
    /** 区域表id */
    area_id: string,
    /** 开卡时间 */
    register_time: string,
    /** 创建时间 */
    create_time: string,
    /** 是否有效 0：无效 1：正常 */
    is_valid: string,
    /** 充电卡状态 0待使用 1-使用中 2-冻结 3-已作废 4-已销卡 */
    status: RECHARGE_CARD_STATUS,

    card_wallet: {
      /** 总金额 */
      totalAmount: string,
      /** 充值金额 */
      rechargeAmount: string,
      /** 赠送金额 */
      giftAmount: string
    }
  }

  export type ChannelList = BaseList<ChannelListItemRes>

  export type ListRes = BaseList<ListGetRes>
}
