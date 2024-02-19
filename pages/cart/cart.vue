<template>
	<view class="tabs">
		<!-- <uni-nav-bar title="标题栏" :border="false" left-icon="left" left-text="返回" right-text="设置"></uni-nav-bar> -->

		<scroll-view class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab, index) in tabList" :key="tab.id" class="tab-item" :id="tab.id" :data-current="index"
				@click="onTabClick(index)">
				<text :class="{active: tabIndex === index}">{{ tab.name }}</text>
			</view>
		</scroll-view>
		<swiper class="swiper" :style="`height: calc(100vh - 40px - ${windowTop}px - ${windowBottom}px)`"
			:current="tabIndex" :duration="300" @change="onSwiperChange">
			<swiper-item v-for="(item, index) in tabList" :key="item.id">
				<!-- <view class="swiper-item uni-bg-red">{{ item.name }}</view> -->
				<!-- 动态组件 -->
				<!-- <keep-alive include="api, component, global-file, introduce, plugin, project, tutorial"> -->
					<scroll-view :scroll-y="true" :show-scrollbar="false">
						<component :is="tabs[item.cpnName]"></component>
					</scroll-view>
				<!-- </keep-alive> -->
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		onReady,
		onNavigationBarButtonTap
	} from "@dcloudio/uni-app"
	import Introduce from "./cpns/introduce.vue"
	import Tutorials from "./cpns/tutorials.vue"
	import GlobalFile from "./cpns/global-file.vue"
	import Component from "./cpns/component.vue"
	import Api from "./cpns/api.vue"
	import Plugin from "./cpns/plugin.vue"
	import Project from "./cpns/project.vue"

	onNavigationBarButtonTap((e) => {
		if (e.text === "设置") {
			uni.showModal({
				title: "点击了" + e.text + "跳转到设置页面",
				success: () => {
					uni.switchTab({
						url: "/pages/profile/index"
					})
				}
			})
		}
	})

	const onLeftClick = () => {
		console.log("left slot");
	}

	const onRightClick = () => {
		console.log("right slot");
	}

	const windowTop = ref(0)
	const windowBottom = ref(0)

	onReady(() => {
		uni.getSystemInfo({
			success: (res) => {
				// const { windowTop, windowBottom } = res
				windowTop.value = res.windowTop
				windowBottom.value = res.windowBottom
			}
		})
	})

	const tabIndex = ref(0)
	const scrollInto = ref("")

	const tabs = {
		Introduce,
		Tutorials,
		GlobalFile,
		Component,
		Api,
		Plugin,
		Project
	}

	const tabList = ref([{
			id: "jieshao",
			name: "介绍",
			cpnName: "Introduce"
		},
		{
			id: "jiaocheng",
			name: "教程",
			cpnName: "Tutorials"
		},
		{
			id: "quanjuwenjian",
			name: "全局文件",
			cpnName: "GlobalFile"
		},
		{
			id: "zujian",
			name: "组件",
			cpnName: "Component"
		},
		{
			id: "api",
			name: "API",
			cpnName: "Api"
		},
		{
			id: "chajian",
			name: "插件",
			cpnName: "Plugin"
		},
		{
			id: "gongchenghua",
			name: "工程化",
			cpnName: "Project"
		}
	])

	const onTabClick = (index) => {
		switchIndex(index)
	}

	const onSwiperChange = (event) => {
		const {
			current
		} = event.detail
		switchIndex(current)
	}

	const switchIndex = (index) => {
		tabIndex.value = index
		scrollInto.value = tabList.value[index].id
	}
</script>

<style scoped lang="scss">
	.tabs {
		.scroll-h {
			height: 80rpx;
			white-space: nowrap;
		}

		.tab-item {
			display: inline-block;
			height: 100%;
			line-height: 80rpx;
			padding: 0 40rpx;
		}

		.active {
			color: #0000ff;
		}

		.swiper {}
	}
</style>