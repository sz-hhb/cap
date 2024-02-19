const BASE_URL = "https://httpbin.org"

class LWRequest {
  request(options) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: BASE_URL + options.url,
        method: options.method,
        timeout: 60000,
        data: options.data,
        success: (res) => {
			if (res.statusCode === 401) {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			} else {
				resolve(res.data)
			}
        },
        fail: (err) => {
          uni.showModal({
            icon: "none",
            title: err,
            duration: 3000
          })
          reject(err)
        }
      })
	  
	  // uni.addInterceptor("request", {
		 //  fail: (err) => {
		 //  	uni.reLaunch({
		 //  		url: "/pages/login/login"
		 //  	})
		 //  }
	  // })
    })
  }

  get(config) {
    return this.request({
      ...config,
      method: "GET"
    })
  }

  post(config) {
    return this.request({
      ...config,
      method: "POST"
    })
  }
}

export default new LWRequest()
