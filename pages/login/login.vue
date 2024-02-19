<template>
	<view>
		<view>Login</view>
		<uni-forms ref="formRef" :modelValue="formData" :rules="formRules">
			<uni-forms-item label="账号" name="phone">
				<uni-easyinput type="text" v-model="formData.phone" placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item label="验证码" name="code">
				<uni-easyinput type="text" v-model="formData.code" placeholder="请输入验证码" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" :disabled="btnDisabled" @click="sendCode">{{ btnText }}</button>
		<button type="primary" @click="login">登录</button>
		<button type="default" @click="toRegister">注册</button>
	</view>
</template>

<script setup>
import { ref, reactive } from "vue"

const formRef = ref()

const formData = reactive({
	phone: "",
	code: ""
})

const formRules = reactive({
	phone: {
		rules: [
			{required: true, errorMessage: "请输入手机号"},
			{pattern: /^1[3-9]\d{9}$/, errorMessage: "请输入正确的手机号"}
		]
	},
	code: {
		rules: [
			{required: true, errorMessage: "请输入验证码"},
			{minLength: 6, maxLength: 6, errorMessage: 'code的长度为6',}
		]
	}
})

const btnDisabled = ref(false)
const btnText = ref("发送验证码")
const countDown = ref(10)
const timer = ref()
const sendCode = () => {
	formRef.value.validateField("phone")
	.then(res => {
		console.log("已发送验证码")
		btnDisabled.value = true
		timer.value = setInterval(() => {
			countDown.value--
			btnText.value = countDown.value + "s后重试"
			
			if(countDown.value <= 0) {
				countDown.value = 10
				btnDisabled.value = false
				btnText.value = "发送验证码"
				clearInterval(timer.value)
			}
		}, 1000)
	}).catch(err => {
		return 
	})
}

const login = () => {
	formRef.value.validate()
	.then(res => {
		if(formData.code === "123456") {
			localStorage.setItem("token", formData.code)
			uni.switchTab({
				url: "/pages/index/index"
			})
		}else {
			uni.showToast({
				title: "验证码错误",
				icon: "error"
			})
		}
	}).catch(err => {
		return
	})
}

const toRegister = () => {
	uni.navigateTo({
		url: "/pages/register/register"
	})
}
</script>

<style lang="scss">

</style>