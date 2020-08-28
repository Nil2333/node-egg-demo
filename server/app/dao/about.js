/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-18 15:05:28
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-28 15:34:48
 */
'use strict';

const { Op } = require('sequelize')
/**
 * 下拉详情
 */
class AboutDao {
  /**
   * 下拉列表
   * @param { Object } ctx 全局this
   * @param { String } cid 二级菜单id
   */
  static async list (ctx, cid) {
    return await ctx.model.MzcAbout.findAll({
      where: {
        deleted_at: null,
        category_id: { [Op.lte]: cid }
      }
    });
  }
}

module.exports = AboutDao;
