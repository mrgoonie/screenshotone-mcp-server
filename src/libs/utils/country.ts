export const countryList = [
	{ code: 'AE', name: 'United Arab Emirates' },
	{ code: 'AR', name: 'Argentina' },
	{ code: 'AT', name: 'Austria' },
	{ code: 'AU', name: 'Australia' },
	{ code: 'BE', name: 'Belgium' },
	{ code: 'BG', name: 'Bulgaria' },
	{ code: 'BN', name: 'Brunei' },
	{ code: 'BR', name: 'Brazil' },
	{ code: 'BY', name: 'Belarus' },
	{ code: 'CA', name: 'Canada' },
	{ code: 'CH', name: 'Switzerland' },
	{ code: 'CL', name: 'Chile' },
	{ code: 'CN', name: 'China' },
	{ code: 'CO', name: 'Colombia' },
	{ code: 'CZ', name: 'Czech Republic' },
	{ code: 'DE', name: 'Germany' },
	{ code: 'DK', name: 'Denmark' },
	{ code: 'DZ', name: 'Algeria' },
	{ code: 'EC', name: 'Ecuador' },
	{ code: 'EG', name: 'Egypt' },
	{ code: 'ES', name: 'Spain' },
	{ code: 'FI', name: 'Finland' },
	{ code: 'FR', name: 'France' },
	{ code: 'GB', name: 'United Kingdom' },
	{ code: 'GR', name: 'Greece' },
	{ code: 'HK', name: 'Hong Kong' },
	{ code: 'HR', name: 'Croatia' },
	{ code: 'HU', name: 'Hungary' },
	{ code: 'ID', name: 'Indonesia' },
	{ code: 'IE', name: 'Ireland' },
	{ code: 'IL', name: 'Israel' },
	{ code: 'IN', name: 'India' },
	{ code: 'IT', name: 'Italy' },
	{ code: 'JO', name: 'Jordan' },
	{ code: 'JP', name: 'Japan' },
	{ code: 'KE', name: 'Kenya' },
	{ code: 'KH', name: 'Cambodia' },
	{ code: 'KR', name: 'South Korea' },
	{ code: 'KZ', name: 'Kazakhstan' },
	{ code: 'LA', name: 'Laos' },
	{ code: 'LK', name: 'Sri Lanka' },
	{ code: 'MA', name: 'Morocco' },
	{ code: 'MM', name: 'Myanmar' },
	{ code: 'MO', name: 'Macau' },
	{ code: 'MX', name: 'Mexico' },
	{ code: 'MY', name: 'Malaysia' },
	{ code: 'NG', name: 'Nigeria' },
	{ code: 'NL', name: 'Netherlands' },
	{ code: 'NO', name: 'Norway' },
	{ code: 'NZ', name: 'New Zealand' },
	{ code: 'PE', name: 'Peru' },
	{ code: 'PH', name: 'Philippines' },
	{ code: 'PK', name: 'Pakistan' },
	{ code: 'PL', name: 'Poland' },
	{ code: 'PT', name: 'Portugal' },
	{ code: 'QA', name: 'Qatar' },
	{ code: 'RO', name: 'Romania' },
	{ code: 'RS', name: 'Serbia' },
	{ code: 'RU', name: 'Russia' },
	{ code: 'SA', name: 'Saudi Arabia' },
	{ code: 'SE', name: 'Sweden' },
	{ code: 'SG', name: 'Singapore' },
	{ code: 'SK', name: 'Slovakia' },
	{ code: 'TH', name: 'Thailand' },
	{ code: 'TN', name: 'Tunisia' },
	{ code: 'TR', name: 'Turkey' },
	{ code: 'TW', name: 'Taiwan' },
	{ code: 'UK', name: 'Ukraine' },
	{ code: 'UG', name: 'Uganda' },
	{ code: 'US', name: 'United States' },
	{ code: 'VN', name: 'Vietnam' },
	{ code: 'ZA', name: 'South Africa' },
	{ code: 'BA', name: 'Bosnia and Herzegovina' },
	{ code: 'BD', name: 'Bangladesh' },
	{ code: 'EE', name: 'Estonia' },
	{ code: 'IQ', name: 'Iraq' },
	{ code: 'LU', name: 'Luxembourg' },
	{ code: 'LV', name: 'Latvia' },
	{ code: 'MK', name: 'North Macedonia' },
	{ code: 'SI', name: 'Slovenia' },
	{ code: 'PA', name: 'Panama' },
];

export const getCountry = () => {
	const random = Math.floor(Math.random() * countryList.length);
	return countryList[random] || { code: 'US', name: 'United States' };
};

export function getCountryNameByCode(code: string) {
	return (
		countryList.find((country) => country.code === code)?.name || 'Unknown'
	);
}

export function getCountryNames(codes: string[]) {
	return countryList
		.filter((country) => codes.includes(country.code))
		.map((country) => country.name);
}

export function getCountryCodes(names: string[]) {
	return countryList
		.filter((country) => names.includes(country.name))
		.map((country) => country.code);
}
