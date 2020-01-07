/** appId可以手动在微信开发者工具里面更换，也可以在更换之后重新运行项目 */

const dev = {
  ENV: 'dev',
  /** 接口请求地址 */
  API_URL: 'https://wx.succtime.com/wx',
  /** 应用名称 */
  APP_NAME: '甜瓜充电',
  /** 小程序appid-这个地方只做记录，如有需要请修改 project.dev.config 文件 */
  APP_ID: 'wxfb97f20c872d34a2'
}

const pro = {
  ENV: 'pro',
  /** 接口请求地址 */
  API_URL: 'https://wx.youdaocharge.com/wx',
  /** 应用名称 */
  APP_NAME: '充电有道',
  /** 小程序appid-这个地方只做记录，如有需要请修改 project.pro.config 文件 */
  APP_ID: 'wxfb97f20c872d34a2'
}

module.exports = dev;