<script>
	export default {
		onLaunch: function() {
			const token = localStorage.getItem("token")
			if(!token) {
				uni.reLaunch({
					url: "/pages/login/login"
				})
			}
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	#container {
		.tv-lightweight-charts {
			canvas {
				width: 0 !important;
			}
		}
	}
	
	
</style>