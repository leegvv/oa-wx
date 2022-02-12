<template>
	<view>
		<image src="../../static/logo-1.png" class="logo" mode="widthFix"></image>
		<view class="logo-title">在线办公系统</view>
		<view class="logo-subtitle">Ver 2022.11</view>
		<button class="login-btn" open-type="getUserInfo" @tap="login()">登陆</button>
		<view class="register-container">
			没有账号？
			<text class="register" @tap="toRegister()">立即注册</text>
		</view>
	</view>
</template>

<script>
	import {
		url
	} from '../../const/index.js';
	import {
		request
	} from '../../util/index.js';

	export default {
		data() {
			return {

			}
		},
		methods: {
			login: function() {
				let that = this;
				uni.login({
					provider: 'weixing',
					success: function(resp) {
						const code = resp.code;
						request.post(url.login, {
							"code": code
						}, function(resp) {
							const permission = resp.data.permission;
							uni.setStorageSync('permission', permission);
							console.log("success");
							uni.switchTab({
								url: "../index/index"
							});
						});
					},
					fail: function(e) {
						console.log(e);
						uni.showToast({
							icon: 'none',
							title: '执行异常'
						})
					}
				})
			},
			toRegister: () => {
				uni.navigateTo({
					url: "../register/register"
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("login.less");
</style>
