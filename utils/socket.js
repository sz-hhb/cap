let socketTask = null
let socketTask2 = null

const initSocket = () => {
	if (!socketTask) {
		socketTask = uni.connectSocket({
			url: "ws://localhost:8088",
			success: () => {
				console.log("socket创建成功");
			},
			fail: (err) => {
				console.log("socket连接失败", err);
			}
		})
		
		socketTask.onClose((res) => {
			socketTask = null
		})
	}
	
	if (!socketTask2) {
		socketTask2 = uni.connectSocket({
			url: "ws://localhost:8089",
			success: () => {
				console.log("socket创建成功");
			},
			fail: (err) => {
				console.log("socket连接失败", err);
			}
		})
		
		socketTask2.onClose((res) => {
			socketTask2 = null
		})
	}
}

export { initSocket, socketTask, socketTask2 }