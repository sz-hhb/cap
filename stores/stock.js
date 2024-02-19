import { defineStore } from "pinia"
// import { socketTask,socketTask2 } from "@/utils/socket.js"

const useStockStore = defineStore("stock", {
	state: () => ({
		stock: {},
		stock2: {},
		socketTask: null,
		socketTask2: null
	}),
	actions: {
		bindEvents() {
			if (this.socketTask) {
				this.socketTask.close()
			}
			this.socketTask = uni.connectSocket({
				url: "ws://localhost:8088",
				success: () => {
					console.log("socket创建成功");
				},
				fail: (err) => {
					console.log("socket连接失败", err);
				}
			})
			this.socketTask.onOpen((res) => {
				console.log("连接已打开");
				this.socketTask.send({
					data: "msg",
					success: () => {
						console.log("发送消息成功");
					}
				})
			})
			this.socketTask.onMessage((res) => {
				this.stock = JSON.parse(res.data)
			})
			this.socketTask.onClose((res) => {
				this.socketTask = null
			})
		},
		bindEvents2() {
			if(this.socketTask2) {
				this.socketTask2.close()
			}
			this.socketTask2 = uni.connectSocket({
				url: "ws://localhost:8089",
				success: () => {
					console.log("socket创建成功");
				},
				fail: (err) => {
					console.log("socket连接失败", err);
				}
			})
			this.socketTask2.onOpen((res) => {
				console.log("连接已打开2");
				this.socketTask2.send({
					data: "msg2",
					success: () => {
						console.log("发送消息成功2");
					}
				})
			})
			this.socketTask2.onMessage((res) => {
				this.stock2 = JSON.parse(res.data)
			})
			this.socketTask2.onClose((res) => {
				this.socketTask2 = null
			})
		}
	}
})

export default useStockStore