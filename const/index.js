const baseUrl = 'http://localhost:8080/oa-api';
const url = {
	register: baseUrl + '/user/register',
	login: baseUrl + "/user/login",
	checkin: baseUrl + '/checkin/checkin',
	createFaceModel: baseUrl + '/checkin/createFaceModel',
	validCanCheckIn: baseUrl + '/checkin/validCanCheckin',
	searchTodayCheckin: baseUrl + '/checkin/searchTodayCheckin',
	searchUserSummary: baseUrl + '/user/searchUserSummary',
	searchMonthCheckin: baseUrl + '/checkin/searchMonthCheckin',
	refreshMessage: baseUrl + '/message/refreshMessage',
	searchMessageByPage: baseUrl + '/message/searchMessageByPage',
	searchMessageById: baseUrl + '/message/searchMessageById',
	updateUnreadMessage: baseUrl + '/message/updateUnreadMessage',
	deleteMessageRefById: baseUrl + '/message/deleteMessageRefById'
};


export {baseUrl, url};