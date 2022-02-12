<template>
	<view>
		<image src="../../static/logo-2.png" class="logo"></image>
		<view class="register-container">
			<input type="text" placeholder="输入你的邀请码" class="register-code" maxlength="6" v-model="registerCode" />
			<view class="register-desc">管理员创建员工证账号之后，你可以从你的个人邮箱中获得注册邀请码</view>
			<button class="register-btn" open-type="getUserInfo" @tap="register()">注册</button>
		</view>
	</view>
</template>

<script>
	import {url} from '../../const/index.js';
	import {request} from '../../util/index.js';
	export default {
		data() {
			const that = this;
			return {
				axaj: that.ajax,
				url: that.url,
				registerCode: null
				
			}
		},
		methods: {
			register: function(){
				if (this.registerCode == null || this.registerCode.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '邀请码不能为空'
					});
					return;
				} else if (/^[0-9]{6}$/.test(this.registerCode) == false) {
					uni.showToast({
						icon: 'none',
						title: '邀请码必须是6位数字'
					});
					return;
				}
				const that = this;
				uni.login({
					provider: "weixing",
					success: function(resp) {
						console.log(22222);
						console.log(resp.code);
						const code = resp.code;
						uni.getUserInfo({
							provider: "weixin",
							success: function(resp) {
								const nickname = resp.userInfo.nickName;
								const avatarUrl = resp.userInfo.avatarUrl;
								const data = {
									code: code,
									nickname: nickname,
									photo: avatarUrl,
									registerCode: that.registerCode
								}
								request(url.register, data, 'POST', function(resp){
									const permission = resp.data.permission;
									uni.setStorageSync('permission', permission);
									//跳转到index页面
									uni.switchTab({
										url: "../index/index"
									});
								});
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("register.less");
</style>
