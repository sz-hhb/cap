<template>
	<view class="navbar">
		<view class="left">
			<slot name="left"></slot>
		</view>
		<view class="center">
			<slot name="center"></slot>
		</view>
		<view class="right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.navbar {
		display: flex;
		align-items: center;

		.left,
		.right {
			width: fit-content;
			height: 44px;
			line-height: 44px;
			background-color: red;
		}

		.center {
			flex: 1;
			height: 44px;
			line-height: 44px;
			text-align: center;
			background-color: green;
		}
	}
</style>