
export function checkResponse(response) {
	if(response.status !== 200) return false;
	return true;
}