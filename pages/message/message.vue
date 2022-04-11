<template>
	<view class="message">
		<view class="header">
			<view class="desc">{{sendTime}}</view>
			<view class="opt" @tap="deleteMsg">删除</view>
		</view>
		<view class='content'>{{msg}}</view>
	</view>
</template>

<script>
	import {url} from '@/const/index.js';
	import {request} from '@/util/index.js';
	
	export default {
		data() {
			return {
				id: null,
				readFlag: null,
				refId: null,
				sendTime: '',
				msg: ''
			};
		},
		methods: {
			deleteMsg(){
				const that = this;
				console.log(that);
				uni.showModal({
					title: '提示信息',
					content: '是否要删除这条消息',
					success: (resp) => {
						if(resp.confirm) {
							request.post(url.deleteMessageRefById, {id: that.refId}, () => {
								uni.showToast({
									icon: 'success',
									title: '删除成功',
									complete: () => {
										setTimeout(() => {
											uni.navigateBack({
												delta: 1
											})
										}, 1000);
									}
								})
							})
						}
					}
				})
			}
		},
		onShow() {
			const that = this;
			uni.setNavigationBarTitle({
				title: '系统通知'
			});
			request.get(url.searchMessageById, {id: that.id}, (resp) => {
				const result = resp.data.data;
				that.sendTime = result.sendTime;
				that.msg = result.msg;
			});
		},
		onLoad(options){
			console.log(options);
			const that = this;
			that.id = options.id;
			that.readFlag = options.readFlag == 'true' ? true : false;
			that.refId = options.refId;
			if(!that.readFlag) {
				request.post(url.updateUnreadMessage, {id: that.refId}, () => {
					console.log('消息更新成已读状态');
				})
			}
		}
	}
</script>

<style lang="less">
	@import url('message.less');
</style>
