export function getDateKey() {
	const dateNow = new Date();
	const getDate = dateNow.getDate();
	const getMonth = dateNow.getMonth() + 1;

	const date = getDate > 9 ? getDate : `0${getDate}`;
	const month = getMonth > 9 ? getMonth : `0${getMonth}`;

    const dateKey = `${date}${month}${dateNow.getFullYear()}`;

    return dateKey;
}