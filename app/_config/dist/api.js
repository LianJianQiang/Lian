/**
 * 生产环境下的服务配置
 */
const ApiConfig = {
  isDebug: false, // true：本地调试开发，false：线上版本
  base: "/Volcano",
  domain: {
    auth: '/Volcano',
    Volcano: "/Volcano",
  }
};
// export default ApiConfig;
module.exports = ApiConfig;
