/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-07-21 11:11:10
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-14 18:18:36
 */
'use strict';

const bcrypt = require('bcryptjs')
const Service = require('egg').Service;
const HttpStatus = require('../utils/httpStatus');

class AdminService extends Service {
  /**
   * 注册
   * @param { Object || String } params 用户信息
   */
	async create (params) {
		const { ctx } = this;

		try {

			const admin = await ctx.model.MzcAdmin.findOne({
				where: {
					nickname: params.nickname,
					deleted_at: null
				}
			})

			if (admin) return ['管理员已存在', HttpStatus.FORBIDDEN];

			const create = new ctx.model.MzcAdmin;
			create.nickname = params.nickname;
			create.password = params.password;
			create.save();

			return ['管理员注册成功', HttpStatus.CREATED];

		} catch (error) {
			return [error.message, HttpStatus.INTERNAL_SERVER_ERROR];
		}
	}

	/**
	 * 校验颁发token
	 * @param { Object || String } params 用户信息
	 */
	async userVerify (params) {
		const { ctx } = this;

		try {
			const admin = await ctx.model.MzcAdmin.findOne({
				where: {
					nickname: params.nickname,
					deleted_at: null
				}
			})

			if (!admin) return ['账号不存在或者密码不正确', HttpStatus.INVALID_REQUEST];

			const verify = bcrypt.compareSync(params.password, admin.password);

			if (!verify) return ['账号不存在或者密码不正确', HttpStatus.INVALID_REQUEST];

			//颁发token secret -> 加密类型 params -> jwt参数
			const token = ctx.app.jwt.sign({
				userId: admin.id,
			}, ctx.app.config.jwt.secret, ctx.app.config.jwt.params);

			//获取redis保存的token
			const redisGetToken = await ctx.app.redis.get(ctx.app.config.usetToken);
			if (redisGetToken) {
				//校验token令牌 secret -> 加密类型 params -> jwt参数
				const redisToken = await ctx.app.jwt.verify(redisGetToken, ctx.app.config.jwt.secret, ctx.app.config.jwt.params);
				if (redisToken.userId === admin.id) {
					return ['用户已登录！请半小时后再重新登录', HttpStatus.FORBIDDEN];
				} else {
					return ['未知错误！', HttpStatus.INTERNAL_SERVER_ERROR];
				}
			} else {
				//保存token 设置过期时间
				await ctx.app.redis.set(ctx.app.config.usetToken, token);
				await ctx.app.redis.expire(ctx.app.config.usetToken, ctx.app.config.jwt.expired);
				return await ctx.helper.success(ctx, { token }, '登录成功！');
			}

		} catch (error) {
			return await ctx.helper.json(ctx, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
   * 查找用户信息
   * @param { String } params token
   */
	async userDetail (params) {
		const { ctx } = this;

		const adminToken = await ctx.app.jwt.verify(params, ctx.app.config.jwt.secret, ctx.app.config.jwt.params);
		const admin = await ctx.model.MzcAdmin.findByPk(adminToken.userId, {
			attributes: { exclude: ['password'] }
		});

		return await ctx.helper.success(ctx, admin, '获取用户信息成功！');
	}

	/**
   * 用户退出登录
   * @param { String } params token
   */
	async userLogout (params) {
		const { ctx } = this;

		const redisToken = await ctx.app.redis.get(ctx.app.config.usetToken);
		if (redisToken === params) {
			await ctx.app.redis.del(ctx.app.config.usetToken)
			return await ctx.helper.json(ctx, '退出登录成功');
		} else {
			return await ctx.helper.json(ctx, '非法请求！', HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}

module.exports = AdminService;
