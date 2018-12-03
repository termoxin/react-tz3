
export function validatePassword(password) {
	return password.length >= 6 && password.trim() !== '' ? true : false
}

export function validateUsername(uname) {
	return uname.trim() !== '' && uname.length >= 2 ? true : false
}
