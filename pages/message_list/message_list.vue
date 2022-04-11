<template>
	<view class="page">
		<uni-list>
			<uni-list-chat
				v-for="one in list"
				:title="one.senderName"
				:avatar="one.senderPhoto"
				:note="one.msg"
				badge-position="left"
				:badge-text="one.readFlag ? '' : 'dot'"
				:key="one.id"
				link="navigateTo"
				:to="'../message/message?id=' + one.id + '&readFlag=' + one.readFlag + '&refId=' + one.refId"
			>
				<view class="chat-custom-right">
					<text class="chat-custom-text">{{one.sendTime}}</text>
				</view>
			</uni-list-chat>
		</uni-list>
		
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListChat from '@/components/uni-list-chat/uni-list-chat.vue';
	import {url} from '@/const/index.js';
	import {request} from '@/util/index.js';
	
	export default {
		components: {
			uniList,
			uniListChat
		},
		data() {
			return {
				page: 1,
				length: 20,
				list: [],
				isLastPage: false
			};
		},
		onShow() {
			this.page = 1;
			this.isLastPage = false;
			uni.pageScrollTo({
				scrollTop: '0'
			});
			this.loadMessageList()
		},
		onReachBottom() {
			if(this.isLastPage) {
				return;
			}
			this.page = this.page + 1;
			this.loadMessageList();
		},
		methods: {
			loadMessageList(){
				const data = {
					page: this.page,
					length: this.length
				};
				request.get(url.searchMessageByPage, data, (resp) => {
					const result = resp.data.data;
					console.log(result);
					if(result == null || result.length ==0) {
						this.isLastPage = true;
						this.page = data.page - 1;
						uni.showToast({
							icon: 'none',
							title: '已经到底了'
						});
					} else {
						if (data.page == 1) {
							this.list = [];
						}
						this.list = this.list.concat(result);
						if(data.page > 1) {
							uni.showToast({
								icon: 'none',
								title: '又加载了' + result.length + '条消息'
							});
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("message_list.less");
</style>
