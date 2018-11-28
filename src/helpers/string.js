

export function shortString(str, length = 200) {
	return str.length >= length ? str.slice(0, length) + '...' : str
}