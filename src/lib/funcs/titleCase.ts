export default function toTitleCase(s: string): string {
	if (s) {
		return s.replace(/\w\S*/g, (x) => x.charAt(0).toUpperCase() + x.substring(1));
	}

	return '';
}
