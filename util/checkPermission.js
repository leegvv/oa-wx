const checkPermission = function(perms) {
	const permission = uni.getStorageSync('permission');
	let result = false;
	for(let one of perms) {
		if(permission.indexOf(one) != -1) {
			result = true;
			break;
		}
	}
	return result;
}

export default checkPermission;