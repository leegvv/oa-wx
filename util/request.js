const request = function(url, data, method = 'GET', func) {
	return uni.request({
		url: url,
		method: method,
		header: {
			token: uni.getStorageSync("token")
		},
		data: data,
		success: function(resp) {
			if (resp.statusCode == 401) {
				uni.redirectTo({
					url: '/pages/login/login.vue'
				});
			} else if (resp.statusCode == 200 && resp.data.code == 200) {
				const data = resp.data;
				if (data.hasOwnProperty("token")) {
					const token = data.token;
					console.log(token);
					uni.setStorageSync('token', token);
				}
				if (func) {
					func(resp);
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: resp.data
				});
			}
		}
	});
};

request.get = (url, data, func) => {
	return request(url, data, 'GET', func)
};

request.post = (url, data, func) => {
	return request(url, data, 'POST', func)
};


export default request;