// SET DATE IN TOP BAR

var months = ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"]

var days = ["Sunday", "Monday", "Tuesday",
"Wednesday", "Thursday", "Friday", "Saturday"]

var now = new Date();

var year = now.getFullYear();
var month = now.getMonth();
var date = now.getDate();
var day = now.getDay().toString();

var today = days[day] + " " + months[month] + " " + date + ", " + year;

$('#date').html(today);
