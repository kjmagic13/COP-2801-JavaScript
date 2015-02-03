/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 2
   Tutorial Case

   Author: 
   Date:   

   Function List:
   showDate(dateObj)
      Returns the current date in the format mm/dd/yyyy

   showTime(dateObj)
      Returns the current time in the format hh:mm:ss am/pm

   calcDays(currentDate)
      Returns the number of days between the current date and January 1st
      of the next year

      */

function showDate(dateObj) {
	thisDate = dateObj.getDate();
	thisMonth = dateObj.getMonth()+1;
	thisYear = dateObj.getFullYear();
	return thisMonth + "/" + thisDate + "/" + thisYear;
}

function showTime(dateObj) {
	thisSecond = dateObj.getSeconds();
	thisMinute = dateObj.getMinutes();
	thisHour = dateObj.getHours();

	// time conditions 
	var ampm = (thisHour < 12) ? " a.m." : " p.m.";
	thisHour = (thisHour > 12) ? thisHour - 12 : thisHour;
	thisHour = (thisHour == 0) ? 12 : thisHour;
	thisMinute = (thisMinute < 10) ? "0"+thisMinute : thisMinute;
	thisSecond = (thisSecond < 10) ? "0"+thisSecond : thisSecond;

	return thisHour + ":" + thisMinute + ":" + thisSecond + ampm;
}

function calcDays(currentDate) {
	// create a date object for January 1 of the next year
	newYear = new Date("January 1, 2011");
	NextYear = currentDate.getFullYear()+1;
	newYear.setFullYear(NextYear);

	// calculate the differences between currentDate and January 1
	days = (newYear - currentDate)/(1000*60*60*24);
	return days;
}