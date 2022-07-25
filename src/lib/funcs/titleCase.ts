export default function toTitleCase(s: string): string {
	if (s) {
		const lowerCase = s.toLowerCase();

		return lowerCase.replace(
			/\w\S*/g,
			(x) => x.charAt(0).toUpperCase() + x.substring(1).toLowerCase()
		);
	}

	return '';
}
