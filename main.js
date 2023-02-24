// ----------------------------------------------------------------------------------------------------------

const calendar = document.getElementById('calendar');
const dates = calendar.querySelector('.dates');

const arrowRight = document.getElementById('next');
const arrowLeft = document.getElementById('prev');

const yearElem = document.getElementById('yearElem');
const monthElem = document.getElementById('monthElem');

let currentDate = new Date();

let currentFullYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

// ----------------------------------------------------------------------------------------------------------

arrowRight.addEventListener('click', () => {
	currentMonth++;
	if (currentMonth < 11) {
	} else {
		currentFullYear++;
		currentMonth = 0;
	}

	draw(currentFullYear, currentMonth, dates);
});

arrowLeft.addEventListener('click', () => {
	currentMonth--;

	if (currentMonth >= 0) {
	} else {
		currentFullYear--;
		currentMonth = 11;
	}

	draw(currentFullYear, currentMonth, dates);
});

// ----------------------------------------------------------------------------------------------------------

draw(currentFullYear, currentMonth, dates);

function draw(year, month, dates) {
	let arr = [];
	let firstDateOfMonth = 1;
	let lastDateOfMonth = getLastDayOfMonth(year, month);

	let shiftElemsNum = getShiftElemsNum(year, month);

	let pushElemsNum = getPushElemsNum(year, month);

	arr = createArr(firstDateOfMonth, lastDateOfMonth);
	arr = shiftElems(shiftElemsNum, '', arr);
	arr = pushElems(pushElemsNum, '', arr);
	arr = chunkArr(7, arr);

	drawMonthAndYear(year, month);

	createTable(arr, dates);
}

// ----------------------------------------------------------------------------------------------------------

function createTable(arr, parent) {
	parent.innerHTML = '';

	for (let i = 0; i < arr.length; i++) {
		let tr = document.createElement('tr');

		for (let j = 0; j < arr[i].length; j++) {
			let td = document.createElement('td');
			td.innerHTML = arr[i][j];
			tr.appendChild(td);
		}

		parent.appendChild(tr);
	}
}

// ----------------------------------------------------------------------------------------------------------

function createArr(from, to) {
	let arr = [];
	for (i = from; i <= to; i++) {
		arr.push(i);
	}

	return arr;
}

// ----------------------------------------------------------------------------------------------------------

function shiftElems(num, elem, arr) {
	for (let i = 0; i < num; i++) {
		arr.unshift(elem);
	}

	return arr;
}

// ----------------------------------------------------------------------------------------------------------

function pushElems(num, elem, arr) {
	for (let i = 0; i < num; i++) {
		arr.push(elem);
	}

	return arr;
}

// ----------------------------------------------------------------------------------------------------------

function drawMonthAndYear(year, month) {
	thisMonth = null;

	switch (month) {
		case 0:
			thisMonth = 'Січень';
			break;
		case 1:
			thisMonth = 'Лютий';
			break;
		case 2:
			thisMonth = 'Березень';
			break;
		case 3:
			thisMonth = 'Квітень';
			break;
		case 4:
			thisMonth = 'Травень';
			break;
		case 5:
			thisMonth = 'Червень';
			break;
		case 6:
			thisMonth = 'Ливень';
			break;
		case 7:
			thisMonth = 'Серпень';
			break;
		case 8:
			thisMonth = 'Вересень';
			break;
		case 9:
			thisMonth = 'Жовтень';
			break;
		case 10:
			thisMonth = 'Листопад';
			break;
		case 11:
			thisMonth = 'Грудень';
			break;
	}

	yearElem.innerHTML = year;
	monthElem.innerHTML = thisMonth;
}

// ----------------------------------------------------------------------------------------------------------

function getLastDayOfMonth(year, month) {
	let date = new Date(year, month + 1, 0);
	return date.getDate();
}

// ----------------------------------------------------------------------------------------------------------

function isLeap(year) {
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
		return true;
	}

	return false;
}

// ----------------------------------------------------------------------------------------------------------

function getShiftElemsNum(year, month) {
	let jsDayNum = getFirstWeekDayOfMonthNum(year, month);
	let realDayNum = getRealDayOfWeekNum(jsDayNum);

	return realDayNum - 1;
}

// ----------------------------------------------------------------------------------------------------------

function getPushElemsNum(year, month) {
	let jsDayNum = getLastWeekDayOfMonthNum(year, month);
	let realDayNum = getRealDayOfWeekNum(jsDayNum);

	return 7 - realDayNum;
}

// ----------------------------------------------------------------------------------------------------------

function chunkArr(num, arr) {
	let result = [];
	let chunk = [];

	while (arr.length / num) {
		chunk = arr.splice(0, num);
		result.push(chunk);
	}

	return result;
}

// ----------------------------------------------------------------------------------------------------------

function getRealDayOfWeekNum(jsDayNum) {
	if (jsDayNum === 0) {
		return 7;
	}

	return jsDayNum;
}

// ----------------------------------------------------------------------------------------------------------

function getFirstWeekDayOfMonthNum(year, month) {
	let date = new Date(year, month, 1);
	return date.getDay();
}

// ----------------------------------------------------------------------------------------------------------

function getLastWeekDayOfMonthNum(year, month) {
	let date = new Date(year, month + 1, 0);
	return date.getDay();
}
