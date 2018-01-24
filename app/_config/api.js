/**
 * 开发环境下的服务配置, 修改此文件会自动打包, 不需重启服务
 */
const ApiConfig = {
    isDebug: true, // true：本地调试开发，false：线上版本x.com/qdw', */
    base: "http://10.116.19.78:8083/Volcano",
    domain: {
        auth: 'http://10.116.19.78:8083/Volcano',
        Volcano: "http://10.116.19.78:8083/Volcano",
        msgcenter: 'ws://10.116.19.78:8083/Volcano',
    },
    rap: {
        baseUrl: 'http://14.118.131.154:83', // mock服务URL
        projectId: 20, // 项目Id
    },
    port: {
        proxyServer: 8001, // 本地代理所占用端口
        devServer: 8888 // webpack dev server 所占用端口
    },
};
ApiConfig.proxyServer = `http://10.116.19.51:${ApiConfig.port.proxyServer}/`; // 'http://{ip}:${PORT.proxyServer}/' // 设置为自己电脑 ip, 可供局域网访问
// ApiConfig.proxyServer = `http://localhost:${ApiConfig.port.proxyServer}/`; // 'http://{ip}:${PORT.proxyServer}/' // 设置为自己电脑 ip, 可供局域网访问

module.exports = ApiConfig;
