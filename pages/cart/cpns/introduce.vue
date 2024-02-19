<template>
	<view>
		<text style="color: red;">介绍</text>
		<uni-data-select v-model="value" placeholder="请选择喜爱的运动" :localdata="range" @change="change"></uni-data-select>

		<view>
			<uni-data-checkbox v-model="radio1" :localdata="sex" @change="onSexChange"></uni-data-checkbox>
			<uni-data-checkbox multiple mode="tag" v-model="checkbox1" :localdata="range"
				@change="onHobbyChange"></uni-data-checkbox>
		</view>

		<!-- <swiper class="swiper" :indicator-dots="true">
			<swiper-item>
				<uni-grid :column="3" :highlight="true" @change="change">
					<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
						<view class="grid-item-box">
							<image :src="item.url" class="image" mode="aspectFill" />
							<text class="text">{{ item.text }}</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</swiper-item>
			<swiper-item>
				<uni-grid :column="3" :highlight="true" @change="change">
					<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
						<view class="grid-item-box">
							<image :src="item.url" class="image" mode="aspectFill" />
							<text class="text">{{ item.text }}</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</swiper-item>
			<swiper-item>
				<uni-grid :column="3" :highlight="true" @change="change">
					<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
						<view class="grid-item-box">
							<image :src="item.url" class="image" mode="aspectFill" />
							<text class="text">{{ item.text }}</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</swiper-item>
		</swiper> -->

		<view>
			<uni-dateformat :date="now"></uni-dateformat>
		</view>
		<view>
			<uni-dateformat :date="now - 60000" :threshold="[60000, 3600000]"></uni-dateformat>
		</view>
		<uni-badge class="uni-badge-left-margin" :text="msgNum" absolute="rightTop" size="normal">
			<view class="box">
				<text class="box-text">右上</text>
			</view>
		</uni-badge>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"

	const msgNum = ref("")
	const timer = setInterval(() => {
		if (msgNum.value > 199) {
			clearInterval(timer)
		}
		msgNum.value++
	}, 100)

	const value = ref(0)
	const now = ref(Date.now())

	const range = [{
			value: 0,
			text: "篮球"
		},
		{
			value: 1,
			text: "足球"
		},
		{
			value: 2,
			text: "游泳"
		}
	]

	const change = (val) => {
		console.log(val)
	}

	const radio1 = ref(0)
	const sex = [{
		text: '男',
		value: 0
	}, {
		text: '女',
		value: 1
	}, {
		text: '未知',
		value: 2
	}]

	const onSexChange = (e) => {
		console.log(e.detail.value)
		uni.setStorage({
			key: "sex",
			data: e.detail.value,
			success: () => {
				console.log("success")
			}
		})
		uni.getStorage({
			key: "sex",
			success: (res) => {
				console.log(res.data)
			}
		})
	}

	const checkbox1 = ref([])

	const onHobbyChange = (e) => {
		console.log(e.detail.value)
	}

	const list = [{
			url: '/static/c1.png',
			text: 'Grid 1',
			badge: '0',
			type: "primary"
		},
		{
			url: '/static/c2.png',
			text: 'Grid 2',
			badge: '1',
			type: "success"
		},
		{
			url: '/static/c3.png',
			text: 'Grid 3',
			badge: '99',
			type: "warning"
		},
		{
			url: '/static/c4.png',
			text: 'Grid 4',
			badge: '2',
			type: "error"
		},
		{
			url: '/static/c5.png',
			text: 'Grid 5'
		},
		{
			url: '/static/c6.png',
			text: 'Grid 6'
		},
		{
			url: '/static/c7.png',
			text: 'Grid 7'
		},
		{
			url: '/static/c8.png',
			text: 'Grid 8'
		},
		{
			url: '/static/c9.png',
			text: 'Grid 9'
		}
	]
</script>

<style lang="scss" scoped>
	.swiper {
		height: 420px;

		.image {
			width: 25px;
			height: 25px;
		}

		.text {
			font-size: 14px;
			margin-top: 5px;
		}


		.grid-item-box {
			flex: 1;
			// position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 15px 0;
		}
	}
</style>