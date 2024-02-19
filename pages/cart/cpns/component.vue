<template>
	<view>
		<text style="color: yellow;">组件</text>
		<navbar>
			<template v-slot:left>
				<view>左边插槽内容</view>
			</template>
			<template v-slot:center>
				<view>中间插槽内容</view>
			</template>
			<template v-slot:right>
				<view>右边插槽内容</view>
			</template>
		</navbar>
	</view>
</template>

<script setup>
import Navbar from "@/components/navbar/index.vue"
</script>

<style lang="scss" scoped>
	
</style>