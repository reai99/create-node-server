# create-node-server

1、安装依赖

yarn

2、运行项目

yarn dev


3、项目效果测试

（1）jwt验证：请求接口localhost:7001/api/login?name=xxxx 进行登陆， localhost:7001/api/logout

（2）静态资源文件： 静态资源文件存放在public/static下，通过localhost:7001/static/xxx访问

（3）普通接口转发：apiConfig文件下的requestType配置接口，通过调用接口进行localhost:7001/api/process?_m_=配置名称 进行访问

（4）静态文件下载：文件存放在public/templates下，通过接口进行访问 localhost:7001/api/common/template/download?ident=文件名 进行访问

（5）文件导入：requestType配置接口,访问接口localhost:7001/api/common/import?_m_=配置名称 通过forData进行传参数（file）

（6）文件导出：requestType配置接口,访问接口localhost:7001/api/common/download?_m_=配置名称 进行文件导出

（7）自定义接口：在controller创建控制器文件并写入自己想要的方法，进入routers文件进行路由配置，例如：router.all(url, Controler['xxx'].xxx);

 
其他丰富功能待补充
 
