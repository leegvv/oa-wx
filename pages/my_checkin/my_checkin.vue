<template>
	<view>
		<view class="statistics">
			<image src='../../static/big-icon-1.png' mode="widthFix" class="big-icon"></image>
			<view class="report-title">
				<text class="days">{{sum1}}</text>
				<text class="unit">天</text>
			</view>
			<view class="sub-title">
				<text>本月签到</text>
			</view>
			<view class="report">
				<view class="column green">
					<text class="column-title">正常签到</text>
					<text class="number">{{sum1}}</text>
				</view>
				<view class="column orange">
					<text class="column-title">迟到签到</text>
					<text class="number">{{sum2}}</text>
				</view>
				<view class="column red">
					<text class="column-title">缺勤签到</text>
					<text class="number">{{sum3}}</text>
				</view>
			</view>
		</view>
		<view class="calendar-container">
			<uni-calendar :insert="true" :lunar="false" :selected="list" @monthSwitch="changeMonth" @confirm="changeMonth"></uni-calendar>
		</view>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';
	import {url} from '@/const/index.js';
	import {request} from '@/util/index.js';
	export default {
		components: {
			uniCalendar
		},
		data() {
			return {
				list: [],
				sum1: 0,
				sum2: 0,
				sum3: 0
			}
		},
		onShow: function() {
			const that = this;
			const date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			that.searchMonthCheckin(that, year, month);
		},
		methods: {
			searchMonthCheckin: function(ref, year, month) {
				const that = ref;
				that.sum1 = 0;
				that.sum2 = 0;
				that.sum3 = 0;
				that.list.length = 0;
				request.get(url.searchMonthCheckin, {year: year, month: month}, (resp) => {
					const ret = resp.data;
					const list = ret.data;
					for (let one of list) {
						if(one.status != null && one.status != '') {
							let color = '';
							if (one.status == '正常') {
								color = 'green';
							} else if (one.status == '迟到') {
								color = 'orange';
							} else if (one.status == '缺勤') {
								color = 'red';
							};
							that.list.push({
								date: one.date,
								info: one.status,
								color: color
							})
						}
					}
					that.sum1 = ret.sum1;
					that.sum2 = ret.sum2;
					that.sum3 = ret.sum3;
				});
			},
			changeMonth: function(e) {
				const that = this;
				const year = e.year;
				const month = e.month;
				that.searchMonthCheckin(that, year, month);
			}
		}
	}
</script>

<style lang="less">
	@import url('my_checkin.less');

</style>
