const path = `./images/${THEME_CONFIG.name}`;

export const IMAGE_MAP = {
    /** 登录页面背景 */
    loginBg: require(path + '/login_bg@2x.png'),

    /** 默认头像 */
    defaultAvatar: require(path + '/default-user.png'),
    /** 地图标记图标 */
    mapStationMarker: require(path + '/icon_location@2x.png'),
    /** 当前定位图标 */
    mapLocationMarker: require(path + '/location@2x.png'),
    /** 登录界面logo */
    logo: require(path + '/logo@2x.png'),
    /** 首页电站详情 */
    detailsIcon: require(path + '/details@2x.png'),
    /** 首页电站详情 */
    navigationIcon: require(path + '/navigation@2x.png'),
    // /** 成功 */
    // success: require(`${path}/successed@2x.png`),
    // /** 钱包界面背景 */
    // walletBg: require(`${path}/wallet_bg@2x.png`),
    // /** 充电中背景 */
    // recharingBg: require(`${path}/recharing-bg.png`),
    // /** 充电中圆环背景 */
    // calibration: require(`${path}/calibration@2x.png`),
    // /** 充电中number */
    // number: require(`./images/number@2x.png`),
    // /** 充电中voltage */
    // voltage: require(`./images/voltage@2x.png`),
    // /** 充电中power */
    // power: require(`./images/power@2x.png`),
    // /** 充电中current */
    // current: require(`./images/current@2x.png`),
    // /** 充电中wallet_s */
    // wallet: require(`./images/wallet_s@2x.png`),
    // /** 充电中electricity */
    // electricity: require(`./images/electricity@2x.png`),
    // /** code */
    // code: require(`./images/code@2x.png`),
    /** gps */
    gps: require('./images/gps@2x.png'),
    /** list */
    list: require('./images/list@2x.png'),
    // /** map */
    // map: require(`./images/map@2x.png`),
    /** mine */
    mine: require('./images/mine@2x.png'),
    // /** nodata */
    // nodata: require(`./images/nodata@2x.png`),
    // /** order */
    order: require('./images/order@2x.png'),
    // /** record */
    // record: require(`./images/record@2x.png`),
    // /** wallet */
    walletIcon: require('./images/wallet@2x.png'),
    // /** setting */
    // setting: require(`./images/setting@2x.png`),
    // /** vihiclelicense */
    // vihiclelicense: require(`./images/vihiclelicense.jpg`),

    /** 扫码 */
    scanning: require('./images/scanning@2x.png'),
    /** 输入桩号 */
    numCodewhite: require('./images/num_code_white@2x.png'),
    /** toast-alert */
    toastAlert: require('./images/toast_alert_32x32.png'),
    /** toast-success */
    toastSuccess: require('./images/toast_success_32x32.png'),
    /** toast-faiure */
    toastFaiure: require('./images/toast_failure_32x32.png'),
    /** 电桩使用中图片 */
    charging_busy: require("./images/charging_busy@2x.png"),
    /** 电桩故障图片 */
    charging_fault: require("./images/charging_fault@2x.png"),
    /** 电桩空闲图片 */
    charging_free: require("./images/charging_free@2x.png"),
}
