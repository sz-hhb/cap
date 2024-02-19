<template>
	<view class="content">
		<view class="indicators">
			<view class="price-content">
				<text>{{ price }}-{{ count }}</text>
			</view>
			<view class="k-line-indicator">
				<uni-row :gutter="10">
					<uni-col :span="12">
						<view class="indicator">
							<text class="label">O</text>
							<text class="price">{{ openPrice }}</text>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="indicator">
							<text class="label">H</text>
							<text class="price">{{ highPrice }}</text>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="indicator">
							<text class="label">L</text>
							<text class="price">{{ lowPrice }}</text>
						</view>
					</uni-col>
					<uni-col :span="12">
						<view class="indicator">
							<text class="label">C</text>
							<text class="price">{{ closePrice }}</text>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</view>
		<view class="time-select">
			<view class="time active">
				<text>1D</text>
			</view>
			<view class="time">
				<text>1W</text>
			</view>
			<view class="time">
				<text>1M</text>
			</view>
			<view class="time">
				<text>1Y</text>
			</view>
		</view>
		<button class="button" type="primary" @click="toggle">
			<text class="button-text">筛选</text>
		</button>
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup">
				<view class="popup-content">
					<uni-row>
						<uni-col :span="8">
							<view class="item"><text>指标1</text></view>
						</uni-col>
						<uni-col :span="8">
							<view class="item"><text>指标2</text></view>
						</uni-col>
						<uni-col :span="8">
							<view class="item"><text>指标3</text></view>
						</uni-col>
						<uni-col :span="8">
							<view class="item"><text>指标4</text></view>
						</uni-col>
						<uni-col :span="8">
							<view class="item"><text>指标5</text></view>
						</uni-col>
						<uni-col :span="8">
							<view class="item"><text>指标6</text></view>
						</uni-col>
					</uni-row>
				</view>
			</uni-popup>
		</view>
		<view ref="chartContainer" id="container"></view>
		<button @click="increment">+1</button>
		<button @click="toProfilePage">profile</button>
		<button @click="toCartPage">cart</button>
		<navigator url="/pages/profile/index" open-type="switchTab">
			<button type="default">profile</button>
		</navigator>
		<navigator url="/pages/cart/cart" open-type="switchTab">
			<button type="default">cart</button>
		</navigator>
		<navigator url="/pages/category/category" open-type="navigate">
			<button type="default">category</button>
		</navigator>
	</view>
</template>

<script module="lightweight-charts" lang="renderjs">
	import {
		createChart
	} from "lightweight-charts";
	import {
		mapState,
		mapActions
	} from "pinia"
	import useCountStore from "../../stores/count.js"
	import {
		binGet
	} from "../../service/httpbin.js"
	import cDayData from "../../static/candlestick/day-data.js"

	export default {
		data() {
			return {
				price: "",
				openPrice: "",
				highPrice: "",
				lowPrice: "",
				closePrice: ""
			}
		},
		mounted() {
			this.initChart()
			this.getRes()
		},
		unmounted() {
			window.removeEventListener("resize", this.resizeHandler);
		},
		onPullDownRefresh: () => {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 3000)
		},
		computed: {
			...mapState(useCountStore, ["count"])
		},
		methods: {
			...mapActions(useCountStore, ["increment"]),
			toggle() {
				this.$refs.popup.open("bottom")
			},
			toProfilePage() {
				uni.switchTab({
					url: "/pages/profile/index",
					// events: {
					// 	acceptDataFromOpenedPage: (data) => {
					// 		console.log(data)
					// 	},
					// 	someEvent: (data) => {
					// 		console.log(data)
					// 	}
					// },
					// success: (res) => {
					// 	res.eventChannel.emit("acceptDataFromOpenerPage", { data: "data from starter page" })
					// }
				})
			},
			toCartPage() {
				uni.switchTab({
					url: "/pages/cart/cart"
				})
			},
			async getRes() {
				const res = await binGet();
				console.log(res);
				uni.setStorageSync("bin_url", res.url)
			},
			initChart() {
				const chart1 = createChart(
					document.getElementById('container'), {
						height: 250,
						rightPriceScale: {
							visible: true,
							minimumWidth: 66
						},
						leftPriceScale: {
							visible: true,
							mode: 2, // percentage
							minimumWidth: 66
						},
						crosshair: {
							mode: 0,
						},
						timeScale: {
							visible: false,
							timeVisible: true,
							secondsVisible: false
						},
						layout: {
							background: {
								type: 'solid',
								color: '#fff',
							},
						},
						grid: {
							horzLines: {
								visible: false
							},
							vertLines: {
								visible: false
							},
						}
					}
				);

				const candleStickSeries = chart1.addCandlestickSeries({
					upColor: "#26a69a",
					downColor: "#ef5350",
					borderVisible: false,
					wickUpColor: "#26a69a",
					wickDownColor: "#ef5350"
				})
				candleStickSeries.setData(this.generateCandlestickData(100))
				const mainSeries1 = chart1.addLineSeries({
					color: '#2962FF',
					priceScaleId: 'left'
				});
				mainSeries1.setData(this.generateData(0, true));

				const chart2 = createChart(
					document.getElementById('container'), {
						height: 250,
						rightPriceScale: {
							visible: true,
							minimumWidth: 66
						},
						leftPriceScale: {
							visible: true,
							minimumWidth: 66
						},
						layout: {
							background: {
								type: 'solid',
								color: '#fff',
							},
						},
						grid: {
							horzLines: {
								visible: false
							},
							vertLines: {
								visible: false
							},
						},
					}
				);
				const mainSeries2 = chart2.addHistogramSeries({
					priceFormat: {
						type: 'volume',
					},
				});
				mainSeries2.setData(this.generateData(100, false));

				chart1.timeScale().subscribeVisibleLogicalRangeChange(timeRange => {
					chart2.timeScale().setVisibleLogicalRange(timeRange);
				});

				chart2.timeScale().subscribeVisibleLogicalRangeChange(timeRange => {
					chart1.timeScale().setVisibleLogicalRange(timeRange);
				});

				// chart1.timeScale().fitContent();
				// chart2.timeScale().fitContent();

				chart1.subscribeCrosshairMove(param => {
					if (!param.time) return;
					const dataPoint = this.getCrosshairDataPoint(mainSeries1, param);
					this.syncCrosshair(chart2, mainSeries2, dataPoint);

					// 获取k线图的 open, high, low, close
					const {
						open,
						high,
						low,
						close
					} = param.seriesData.get(candleStickSeries);
					this.openPrice = open;
					this.highPrice = high;
					this.lowPrice = low;
					this.closePrice = close;

					// 获取每天的价格
					const {
						value
					} = param.seriesData.get(mainSeries1);
					this.price = value;
				});
				chart2.subscribeCrosshairMove(param => {
					if(!param.time) return;
					const dataPoint = this.getCrosshairDataPoint(mainSeries2, param);
					this.syncCrosshair(chart1, mainSeries1, dataPoint);
				});

				// 监听窗口的变化 重新设置图表的宽高
				window.addEventListener("resize", () => {
					this.resizeHandler(chart1, document.getElementById('container'))
					this.resizeHandler(chart2, document.getElementById('container'))
				})
			},
			resizeHandler(chart, container) {
				if (!chart || !container) return;
				const dimensions = container.getBoundingClientRect();
				chart.resize(dimensions.width, 250);
			},
			generateData(startValue, isLine, startDate) {
				const res = [];
				const time = startDate ?? (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0)));
				for (let i = 0; i < 500; ++i) {
					if (isLine) {
						res.push({
							time: time.getTime() / 1000,
							value: parseFloat((i + startValue).toFixed(2)),
						});
					} else {
						res.push({
							time: time.getTime() / 1000,
							value: parseFloat((i + startValue).toFixed(2)),
							color: i % 2 === 0 ? "red" : "#26a69a"
						});
					}

					time.setUTCDate(time.getUTCDate() + 1);
				}

				return res;
			},
			generateCandlestickData(startValue, startDate) {
				const res = [];
				const time = startDate ?? (new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0)));
				for (let i = 0; i < 500; ++i) {
					if (i % 2 === 0) {
						res.push({
							time: time.getTime() / 1000,
							open: parseFloat(((i + startValue) * 0.5).toFixed(2)),
							high: parseFloat(((i + startValue) * 1).toFixed(2)),
							low: parseFloat(((i + startValue) * 0.3).toFixed(2)),
							close: parseFloat(((i + startValue) * 0.9).toFixed(2))
						});
					} else {
						res.push({
							time: time.getTime() / 1000,
							open: parseFloat(((i + startValue) * 0.9).toFixed(2)),
							high: parseFloat(((i + startValue) * 1).toFixed(2)),
							low: parseFloat(((i + startValue) * 0.4).toFixed(2)),
							close: parseFloat(((i + startValue) * 0.5).toFixed(2))
						});
					}
					time.setUTCDate(time.getUTCDate() + 1);
				}

				return res;
			},
			getCrosshairDataPoint(series, param) {
				if (!param.time) {
					return null;
				}
				const dataPoint = param.seriesData.get(series);
				return dataPoint || null;
			},
			syncCrosshair(chart, series, dataPoint) {
				if (dataPoint) {
					chart.setCrosshairPosition(dataPoint.value, dataPoint.time, series);
					return;
				}
				chart.clearCrosshairPosition();
			}
		},
	}
</script>

<style scoped lang="scss">
	.content {
		.indicators {
			display: flex;
			align-items: center;
		}

		.price-content {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 30%;
			height: 100px;
			font-size: 30px;
			color: #f00;
		}

		.k-line-indicator {
			width: 70%;
			height: 100px;
			font-size: 20px;

			.uni-row {
				width: 100%;
				height: 100%;
			}

			.uni-col {
				height: 50%;
			}

			.indicator {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-basis: 48%;
				height: 100%;
			}

			.label {
				display: inline-block;
				width: 20px;
			}

			.price {
				color: #f00;
			}
		}

		.time-select {
			display: flex;
			align-items: center;
			gap: 10px;
			margin: 10px 0;

			.time {
				padding: 10px;
				border-radius: 8px;
				background-color: #eee;

				&.active {
					color: #fff;
					background-color: #00f;
				}
			}
		}

		.uni-popup {
			.popup-content {
				height: 60vh;
				border-radius: 32rpx 32rpx 0 0;
				background: #fff;
				overflow: hidden;

				.item {
					height: 80rpx;
					padding: 30rpx;
					line-height: 80rpx;
					text-align: center;
				}
			}
		}
	}
</style>