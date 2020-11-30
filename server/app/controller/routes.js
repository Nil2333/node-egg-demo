/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-06-30 19:36:54
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-12-01 00:11:42
 */

'use strict';
const Controller = require('egg').Controller;

class RoutesController extends Controller {
  /**
   * 获取列表
   */
  async index () {
    const admin = await this.ctx.service.admin.list();
    const routes = await this.ctx.service.routes.index(admin);
    await this.ctx.helper.checkData(routes);
  }
}
module.exports = RoutesController;