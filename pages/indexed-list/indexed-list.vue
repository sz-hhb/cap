<template>
	<view>
		<uni-indexed-list :options="list" :show-select="true" @click="bindClick" />
	</view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app"
import useAirportStore from "@/stores/airport.js"
import airport from "@/static/data/airport.js"

const airportStore = useAirportStore()

const list = ref()
const mark = ref("")

onLoad((options) => {
	console.log(options);
	mark.value = options.mark
})

onMounted(() => {
	list.value = airport.list
})

const bindClick = (e) => {
	const { item } = e
	if(mark.value === "startPlace") {
		airportStore.setStartPlace(item.name)
	}else if(mark.value === "destination") {
		airportStore.setDestination(item.name)
	}
	uni.navigateBack()
}
</script>

<style lang="scss" scoped>

</style>
