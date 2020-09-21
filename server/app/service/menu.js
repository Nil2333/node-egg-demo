/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 11:11:10
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-18 17:42:45
 */
'use strict';
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class MenuService extends Service {
  /**
   * 获取列表
   * @param { String } limit 最大限制
   * @param { String } page 分页
   * @param { String } pid 父id
   */
  async index ({ limit = 20, page = 1, pid = 0 }) {
    const maxPage = Number(limit);
    try {
      const menu = await this.ctx.model.MzcMenu.findAndCountAll({
        where: {
          pid: 1,
          deleted_at: null
        },
        offset: (page - 1) * maxPage,
        limit: maxPage,
      })

      if (menu.rows.length == 0) return { msg: '没有找到相关信息', errorStatus: HttpStatus.NOT_FOUND };

      return {
        data: {
          data: menu.rows,
          meta: {
            current_page: parseInt(page),
            per_page: maxPage,
            total: menu.count,
            total_pages: Math.ceil(menu.count / maxPage),
          }
        }
      }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 
   * @param { String } id 当前id
   * @param { String } key 字段名
   * @param { String } value 字表值
   */
  async update ({ id, key, value }) {
    try {
      await this.ctx.model.MzcMenu.update({ [key]: value }, {
        where: {
          id,
          deleted_at: null
        },
      })
      return { httpStatus: HttpStatus.OK }
    } catch (error) {
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}

module.exports = MenuService;