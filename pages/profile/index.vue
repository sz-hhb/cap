<template>
	<view>
		<view>
			baidu:
			<text style="color: red">{{ stock.baidu }}</text>
		</view>
		<view>
			tencent:
			<text style="color: red">{{ stock.tencent }}</text>
		</view>
		<view>
			alibaba:
			<text style="color: red">{{ stock.alibaba }}</text>
		</view>
		<view>
			wangyi:
			<text style="color: red">{{ stock2.wangyi }}</text>
		</view>
		<view>
			zijie:
			<text style="color: red">{{ stock2.zijie }}</text>
		</view>
		<view>
			xiaomi:
			<text style="color: red">{{ stock2.xiaomi }}</text>
		</view>
		<button type="primary" @click="toChartPage">
			echart
		</button>
		<button type="primary" @click="uploadImg">
			上传图片
		</button>
		<button type="primary" @click="downloadImg">
			下载图片
		</button>
		<button type="primary" @click="showToast">
			显示消息提示框
		</button>
		<view>
			机场: {{ startPlace }} - {{ destination }}
		</view>
		<button type="primary" @click="selectAirport">
			选择起始地
		</button>
		<button type="primary" @click="selectDestination">
			选择目的地
		</button>
		<uni-file-picker ref="filePickerRef" v-model="imageValue" fileMediatype="image" mode="grid"
			file-extname="png,jpg" :limit="1" :auto-upload="false" @select="select" @progress="progress"
			@success="success" @fail="fail" />
		<uni-swipe-action>
			<template v-for="item in peoples" :key="item.id">
				<uni-swipe-action-item class="xxx-swipe-action" :right-options="options" @click="onClick"
					@change="change">
					<view class="item">{{ item.name }}</view>
					<template v-slot:right>
						<view class="btn top-btn" @click="handleTop(item.id)"><text>置顶</text></view>
						<view class="btn del-btn" @click="handleDel(item.id)"><text>删除</text></view>
					</template>
				</uni-swipe-action-item>
			</template>
		</uni-swipe-action>
		<uni-notice-bar show-icon scrollable show-close
			text="uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。" />
		<view class="exponents">
			<uni-row class="exponent-title">
				<uni-col :span="8">
					<text>代码/指数</text>
				</uni-col>
				<uni-col :span="8" class="text-right">
					<text>最新价</text>
				</uni-col>
				<uni-col :span="8" class="text-right">
					<text>跌涨幅</text>
				</uni-col>
			</uni-row>
			<view class="exponent-content">
				<template v-for="item in exponent" :key="item.id">
					<uni-row class="item" @click="clickExponentItem(item)">
						<uni-col :span="8" class="code-exponent">
							<view>{{ item.name }}</view>
							<view style="color: #858585">{{ item.id }}</view>
						</uni-col>
						<uni-col :span="8" class="text-right">
							<text>{{ item.price }}</text>
						</uni-col>
						<uni-col :span="8" class="text-right" style="color: #00B05A">
							<text>{{ item.range }}</text>
						</uni-col>
					</uni-row>
				</template>
			</view>
		</view>
		<uni-card padding="0" spacing="0">
			<template v-slot:cover>
				<view class="custom-cover">
					<image class="cover-image" mode="aspectFill" :src="cover">
					</image>
					<view class="cover-content">
						<text class="uni-subtitle uni-white">今日新闻热点</text>
					</view>
				</view>
			</template>
			<uni-list>
				<uni-list-item title="今日新闻" showArrow></uni-list-item>
				<uni-list-item title="今日新闻" showArrow></uni-list-item>
			</uni-list>
			<view slot="actions" class="card-actions no-border">
				<view class="card-actions-item" @click="actionsClick('分享')">
					<uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">分享</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('点赞')">
					<uni-icons type="heart" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">点赞</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('评论')">
					<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">评论</text>
				</view>
			</view>
		</uni-card>
		<view class="news">
			<uni-list>
				<template v-for="item in news" :key="item">
					<uni-list-item>
						<template v-slot:body>
							<view class="list-item">
								<view class="header">
									<text>{{ item.name }}</text>
									<text class="header-mid">{{ item.date.split(" ")[0] }}</text>
									<text>{{ item.date.split(" ")[1] }}</text>
								</view>
								<view class="brief">
									<text>{{ item.brief }}</text>
								</view>
							</view>
						</template>
					</uni-list-item>
				</template>
			</uni-list>
		</view>
		<uni-load-more :status="status"></uni-load-more>
		<uni-fab ref="fab" :content="fabContent" direction="vertical" horizontal="right" vertical="bottom"
			@trigger="trigger" @fabClick="fabClick" />
	</view>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance
	} from "vue";
	import {
		onLoad,
		onShow,
		onReady,
		onHide,
		onUnload,
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		storeToRefs
	} from "pinia"
	import useStockStore from "@/stores/stock.js"
	import useAirportStore from "@/stores/airport.js"
	// import {
	// 	initSocket,
	// 	socketTask,
	// 	socketTask2
	// } from "@/utils/socket.js"
	import exponent from "@/static/data/exponent.js"
	import news from "@/static/data/news.js"

	const fabContent = [{
			iconPath: '/static/image.png',
			selectedIconPath: '/static/image-active.png',
			text: '相册',
			active: false
		},
		{
			iconPath: '/static/home.png',
			selectedIconPath: '/static/home-active.png',
			text: '首页',
			active: false
		},
		{
			iconPath: '/static/star.png',
			selectedIconPath: '/static/star-active.png',
			text: '收藏',
			active: false
		}
	]

	const trigger = (e) => {
		const { text } = e.item
		console.log(e.item, text)
	}

	const fabClick = () => {
		console.log("点击悬浮按钮")
	}

	const cover = "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg"

	const actionsClick = (action) => {
		console.log(action);
	}

	const toChartPage = () => {
		uni.navigateTo({
			url: "/pages/chart/chart"
		})
	}

	// more loading noMore
	const status = ref("more")

	onReachBottom(() => {
		console.log("页面到底了");
		status.value = "loading"
		setTimeout(() => {
			status.value = "noMore"
		}, 5000)
	})

	const clickExponentItem = (item) => {
		console.log(item)
	}

	const airportStore = useAirportStore()
	const {
		startPlace,
		destination
	} = storeToRefs(airportStore)

	const selectAirport = () => {
		uni.navigateTo({
			url: "/pages/indexed-list/indexed-list?mark=startPlace"
		})
	}

	const selectDestination = () => {
		uni.navigateTo({
			url: "/pages/indexed-list/indexed-list?mark=destination"
		})
	}

	const peoples = ref([{
			id: 0,
			name: "联系人xxx"
		},
		{
			id: 1,
			name: "联系人yyy"
		},
		{
			id: 2,
			name: "联系人zzz"
		},
	])

	const options = ref([{
			text: "取消",
			style: {
				backgroundColor: "#007aff"
			}
		},
		{
			text: "删除",
			style: {
				backgroundColor: "#dd524d"
			}
		},
	])

	const onClick = (e) => {
		console.log(e)
		if (e.content.text === 0) {
			// 取消
			console.log("已取消");
		} else if (e.content.text === 1) {
			// 删除
			console.log("已删除");
		}
	}

	const change = (position) => {
		console.log(position)
	}

	const handleTop = (id) => {
		// console.log("已置顶")
		const findItem = peoples.value.find(item => item.id === id)
		const findIndex = peoples.value.findIndex(item => item.id === id)
		if (findItem && findIndex >= 0) {
			peoples.value.splice(findIndex, 1)
			peoples.value.unshift(findItem)
		}
	}

	const handleDel = (id) => {
		// console.log("已删除")
		const findIndex = peoples.value.findIndex(item => item.id === id)
		if (findIndex >= 0) {
			peoples.value.splice(findIndex, 1)
		}
	}

	const imageValue = ref([])
	const filePickerRef = ref()

	// 获取上传状态
	const select = (e) => {
		console.log("选择文件", e)
		// filePickerRef.value?.upload()
		uni.uploadFile({
			url: "http://localhost:3000/upload",
			filePath: e.tempFilePaths[0],
			name: "image",
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data)
			},
			fail: (err) => {
				console.log(err)
			}
		})
	}

	// 获取上传进度
	const progress = (e) => {
		console.log("上传进度", e)
	}

	// 上传成功
	const success = (e) => {
		console.log("上传成功", e)
	}

	// 上传失败
	const fail = (e) => {
		console.log("上传失败", e)
	}

	const stockStore = useStockStore()
	const {
		stock,
		stock2,
		socketTask,
		socketTask2
	} = storeToRefs(stockStore)

	// 页面加载完成后调用该生命周期
	onLoad((option) => {
		console.log("onLoad", option)
		// 初始化socket
		// initSocket()

		// 获取数据
		stockStore.bindEvents()
		stockStore.bindEvents2()
		
		uni.getNetworkType({
			success: (res) => {
				console.log(res.networkType);
			}
		})

		const instance = getCurrentInstance().proxy
		const eventChannel = instance.getOpenerEventChannel()
		eventChannel.emit("acceptDataFromOpenedPage", {
			data: 'data from test page'
		})
		eventChannel.emit('someEvent', {
			data: 'data from test page for someEvent'
		})
		eventChannel.on('acceptDataFromOpenerPage', function(data) {
			console.log(data)
		})
	})

	onReady(() => {
		uni.setNavigationBarTitle({
			title: "新的标题"
		})

		uni.setNavigationBarColor({
			frontColor: '#ffffff',
			backgroundColor: '#ff0000',
			animation: {
				duration: 400,
				timingFunc: 'easeIn'
			}
		})
	})

	// tab切换时会调用 onShow和onHide 生命周期
	// 页面显示时调用该生命周期
	// onShow(() => {
	// 	console.log("on show");
	// 	// 初始化socket
	// 	// initSocket()
		
	// 	// 获取数据
	// 	stockStore.bindEvents()
	// 	stockStore.bindEvents2()
	// })

	// // 页面隐藏时调用该生命周期
	// onHide(() => {
	// 	console.log("on hide");
	// 	if (socketTask.value) socketTask.value.close()
	// 	if (socketTask2.value) socketTask2.value.close()
	// })

	// 页面卸载时调用该生命周期
	onUnload(() => {
		console.log("onUnload");
		// 关闭socket连接
		if (socketTask.value) socketTask.value.close()
		if (socketTask2.value) socketTask2.value.close()
	})

	const itemList = ["A", "B", "C"]

	const showToast = () => {
		// uni.showToast({
		// 	title: "这是消息提示框"
		// })
		// uni.showModal({
		// 	title: "title",
		// 	content: "content",
		// 	confirmText: "确定",
		// 	cancelText: "取消",
		// 	editable: true,
		// 	placeholderText: "请输入文本"
		// })
		uni.showActionSheet({
			title: "按钮",
			itemList: itemList,
			success: function(res) {
				console.log(res);
				console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				console.log('item: ', itemList[res.tapIndex]);
			},
			fail: function(res) {
				console.log(res.errMsg);
			}
		})
	}

	const uploadImg = () => {
		uni.chooseImage({
			success: (chooseImageRes) => {
				const tempFilePaths = chooseImageRes.tempFilePaths
				const uploadTask = uni.uploadFile({
					url: "http://localhost:3000/upload",
					filePath: tempFilePaths[0],
					name: "image",
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data)
					},
					fail: (err) => {
						console.log(err);
					}
				})

				uploadTask.onProgressUpdate((res) => {
					console.log("上传进度" + res.progress)
					console.log("已经上传的数据长度" + res.totalBytesSent)
					console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend)

					// if(res.progress > 50) {
					// 	uploadTask.abort()
					// }
				})
			}
		})
	}

	const downloadImg = () => {
		const downloadTask = uni.downloadFile({
			url: "http://localhost:3000/image-1706170195050.png",
			success: (res) => {
				if (res.statusCode === 200) {
					// #ifndef H5
					uni.saveFile({
						tempFilePath: res.tempFilePath,
						success: (res) => {
							console.log('文件保存成功', res);
						},
						fail: (err) => {
							console.error('文件保存失败', err);
						}
					})
					// #endif
				}
			}
		})

		downloadTask.onProgressUpdate((res) => {
			console.log('下载进度' + res.progress);
			console.log('已经下载的数据长度' + res.totalBytesWritten);
			console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
		});
	}
</script>

<style lang="scss" scoped>
	.custom-cover {
		position: relative;
		height: 240px;

		.cover-image {
			width: 100%;
		}

		.cover-content {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 40px;
			padding-left: 15px;
			line-height: 40px;
			color: #fff;
			box-sizing: border-box;
			background-color: rgba(0, 0, 0, 0.4);
		}
	}

	.card-actions {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 45px;

		.card-actions-item {
			display: flex;
			align-items: center;
			gap: 5px;
		}
	}

	.uni-swipe.xxx-swipe-action {
		height: 80rpx;

		.item {
			height: 80rpx;
			line-height: 80rpx;
		}

		.uni-swipe_button-group {
			.btn {
				width: 144rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #fff;
			}

			.del-btn {
				background-color: #ff0000;
			}

			.top-btn {
				background-color: #007aff;
			}
		}
	}

	.exponents {
		padding: 40rpx;

		.exponent-title {
			padding-bottom: 20rpx;
			border-bottom: 2rpx solid #ccc;
		}

		.exponent-content {
			.item {
				display: flex;
				align-items: center;
				padding: 20rpx 0;
				border-bottom: 2rpx solid #ccc;
			}

			.code-exponent {
				display: flex;
				flex-direction: column;
				gap: 20rpx;
			}
		}
	}

	.news {
		padding: 40rpx;

		.list-item {
			padding: 20rpx 0;
		}

		.header {
			margin-bottom: 20rpx;
			font-size: 28rpx;

			.header-mid {
				padding: 0 12px;
			}
		}

		.brief {
			font-size: 28rpx;
		}
	}

	.text-right {
		text-align: right;
	}
</style>