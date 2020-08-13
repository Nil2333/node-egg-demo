/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-08-11 17:12:27
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-08-13 16:54:07
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('mzc-recruit-droptype', {
      id: {
        allowNull: !1, // 是否为空
        autoIncrement: !0, // 自增
        primaryKey: !0, // 主键
        type: INTEGER(8).UNSIGNED, // 类型
        comment: 'ID', // 备注
      },
      dropContent: {
        allowNull: !1, // 是否为空
        type: STRING(20), // 类型
        defaultValue: '', // 默认值
        comment: '下拉内容', // 备注 0 -> 不存在
      },
      position: {
        allowNull: !1, // 是否为空
        type: STRING(20), // 类型
        defaultValue: '职位', // 默认值
        comment: '职位', // 备注
      },
      address: {
        allowNull: !1, // 是否为空
        type: STRING(20), // 类型
        defaultValue: '地址', // 默认值
        comment: '地址', // 备注
      },
      people: {
        allowNull: !1, // 是否为空
        type: STRING(5), // 类型
        defaultValue: '人数', // 默认值
        comment: '人数', // 备注
      },
      education: {
        allowNull: !1, // 是否为空
        type: STRING(10), // 类型
        defaultValue: '学历', // 默认值
        comment: '学历', // 备注
      },
      sex: {
        allowNull: !1, // 是否为空
        type: STRING(5), // 类型
        defaultValue: '性别', // 默认值
        comment: '性别', // 备注
      },
      created_time: {
        allowNull: !1, // 是否为空
        type: STRING(5), // 类型
        comment: '发布时间', // 备注
      },
      created_at: {
        allowNull: !0, // 是否为空
        type: STRING(13), // 类型
        comment: '创建时间', // 备注
      },
      updated_at: {
        allowNull: !0, // 是否为空
        type: STRING(13), // 类型
        comment: '修改时间', // 备注
      },
      delete_at: {
        allowNull: !0, // 是否为空
        type: STRING(13), // 类型
        comment: '删除时间', // 备注
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mzc-recruit-droptype');
  },
};
