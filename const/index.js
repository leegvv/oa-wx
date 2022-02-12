const baseUrl = 'http://localhost:8080/oa-api';
const url = {
	register: baseUrl + '/user/register',
	login: baseUrl + "/user/login",
	checkin: baseUrl + '/checkin/checkin',
	createFaceModel: baseUrl + '/checkin/createFaceModel',
	validCanCheckIn: baseUrl + '/checkin/validCanCheckin',
	searchTodayCheckin: baseUrl + '/checkin/searchTodayCheckin',
	searchUserSummary: baseUrl + '/user/searchUserSummary',
	searchMonthCheckin: baseUrl + '/checkin/searchMonthCheckin'
};


export {baseUrl, url};