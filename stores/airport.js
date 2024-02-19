import { defineStore } from "pinia"

const useAirportStore = defineStore("airport", {
	state: () => ({
		startPlace: "",
		destination: ""
	}),
	actions: {
		setStartPlace(place) {
			this.startPlace = place
		},
		setDestination(place) {
			this.destination = place
		}
	}
})

export default useAirportStore