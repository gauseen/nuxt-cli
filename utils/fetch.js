import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'

const api = '/mdm2/api/'

export const get = (url, data, options) => {
	return common('GET', url, data, options)
}

export const post = (url, data, options) => {
	return common('POST', url, data, options)
}

export const common = (type, url, data, options = {}) => {
	const config = {
		method: type,
		url: `${api}${url}`,
		data: data,
		dataType: 'json',
		headers: {
			'content-type': 'application/json;charset=utf-8',
		},
	}
	if (!options.disableLoading) {
		Indicator.open({spinnerType: 'fading-circle'})
	}
	return axios(config).then((res) => {
		if (res.success) {
			return res.data || {}
		} else {
			return Promise.reject(res.data)
		}
	})
}

axios.interceptors.request.use(function (config) {
	return config
}, function (error) {
	return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
	// 关闭loading
	Indicator.close()

	return response.data || {}
}, function (error) {
	// 关闭loading
	Indicator.close()

	if (error.message) Toast(error.message)
	return Promise.reject(error)
})

const install = function (Vue) {
	Vue.prototype.$get = get
	Vue.prototype.$post = post
}

export default install
