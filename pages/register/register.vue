<template>
	<view>
		<button type="default" @click="toLogin">登录</button>
	</view>
</template>

<script setup>
const toLogin = () => {
	uni.navigateTo({
		url: "/pages/login/login"
	})
}
</script>

<style lang="scss" scoped>

</style>
