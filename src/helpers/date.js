import { distanceInWordsToNow } from 'date-fns'

export function formatDate(dateStr) {
	return distanceInWordsToNow(
		new Date(dateStr),
		{includeSeconds: true}
	) + ' ago'
}