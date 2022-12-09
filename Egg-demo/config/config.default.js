/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'test',
    username: 'root',
    password: '123456',
    // 配置数据库时间为东八区北京时间
    timezone: '+08:00',
    define: {  // model的全局配置
      timestamps: true,   // 添加create,update,delete时间戳
      paranoid: true,   // 添加软删除
      freezeTableName: true,  // 防止修改表名为复数
      underscored: false  // 防止驼峰式字段被默认转为下划线
    },
    // 打印日志
    logging: true,
    // 时间格式化
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    }
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1669631062494_4036';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
