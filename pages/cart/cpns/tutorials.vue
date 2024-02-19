<template>
	<view>
		<text style="color: blue;">教程</text>
		<view>
			<uni-collapse accordion>
				<uni-collapse-item title="手风琴效果">
					<view class="content">
						<text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="手风琴效果">
					<view class="content">
						<text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="手风琴效果">
					<view class="content">
						<text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="container">
			<uni-section title="本地数据" type="line" padding style="height: 500px;">
				<uni-data-picker placeholder="请选择班级" :popup-title="popupTitle" :localdata="dataTree" v-model="classes"
					@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened"
					@popupclosed="onpopupclosed">
				</uni-data-picker>
			</uni-section>
		</view>
		<uni-section title="实心标签" type="line">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" style-type="button"
					active-color="#007aff" @clickItem="onClickItem" />
			</view>
			<view class="content">
				<view v-if="current === 0"><text class="content-text">选项卡1的内容</text></view>
				<view v-if="current === 1"><text class="content-text">选项卡2的内容</text></view>
				<view v-if="current === 2"><text class="content-text">选项卡3的内容</text></view>
			</view>
		</uni-section>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	
	const current = ref(0)
	const items = ["选项卡1", "选项卡2", "选项卡3"]
	const onClickItem = (e) => {
		console.log(e);
	}
	

	const classes = ref("")
	const dataTree = [{
			text: "一年级",
			value: "1-0",
			children: [{
					text: "1.1班",
					value: "1-1"
				},
				{
					text: "1.2班",
					value: "1-2"
				}
			]
		},
		{
			text: "二年级",
			value: "2-0",
			children: [{
					text: "2.1班",
					value: "2-1"
				},
				{
					text: "2.2班",
					value: "2-2"
				}
			]
		},
		{
			text: "三年级",
			value: "3-0",
			disable: true
		}
	]
	const datas = ref([])
	const popupTitle = ref("请选择年级")

	const onchange = (e) => {
		console.log("onchange", e)
	}

	const onnodeclick = (e) => {
		console.log("onnodeclick", e)
		datas.value.push(e)
		if (datas.value.length > 0) {
			popupTitle.value = "请选择班级"
		}
	}

	const onpopupopened = () => {
		console.log("onpopupopened")
	}

	const onpopupclosed = () => {
		console.log("onpopupclosed")
	}
</script>

<style lang="scss" scoped>
</style>