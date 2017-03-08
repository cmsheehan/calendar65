/**
 * A 65 Day calendar app. Generates a pdf calendar.
 *
 */

angular.module('calendar65App', ['ngMaterial']).controller('CalendarCtrl', function($scope) {

  $scope.holidayDate = null;
  $scope.startDate = null;
  $scope.endDate = null;
  $scope.holidayName = "";
  $scope.holidays = {};

  var doc = null;
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  //calendar vars
  const CELL_HEIGHT = 25;
  const CELL_WIDTH = 25;
  const LEFT_PAD = 30;
  const TOP_PAD = 30;

  //add holiday to list
  $scope.addHoliday = function() {
    if ($scope.holidayName && $scope.holidayDate) {
      $scope.holidays[$scope.holidayName] = $scope.holidayDate;
    } else {
      console.log("Enter a name and date for the holiday")
    }
  }

  //remove holiday from list
  $scope.removeHoliday = function(holiday) {
    delete $scope.holidays[holiday];
  }

  //export pdf
  $scope.generatePDF = function() {
    if ($scope.startDate && $scope.endDate) {
      if ($scope.startDate.getTime() < $scope.endDate.getTime()) {
        $scope.drawCalendar($scope.startDate, $scope.endDate);
      } else {
        console.log("School years have to start before they can end.")
      }
    } else {
      console.log("Enter a start and end date for the calendar")
    }
  }

  $scope.drawCalendar = function(startDate, endDate) {

    //init pdf
    doc = new jsPDF();
    doc.setFontSize(8);

    var current = startDate;
    var x = LEFT_PAD;
    var y = TOP_PAD;

    


    var totalMonths = getTotalMonths(startDate, endDate)
    for (var i = 0; i < totalMonths; i++) {
      // GET START/END DATE


      // DRAW MONTH


      // NEW PAGE
    }


    //first and last day of month
    //var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    while (current.getTime() <= end.getTime()) {

      // start new month
      if (current.getDate() == 1) {
        //draw new month header
        $scope.drawDayHeaders(y);

        // if drawing second month on page
        if (y > SECONDMONTH) {
          y = SECONDMONTH + TOP_PAD*2;
        }
      }

      // draw current day
      $scope.drawDay(x, y);

      // if saturday, increment row
      if (current.getDay() == 6) {
        y += CELL_HEIGHT;
      }

      //increment current date
      current.setDate(current.getDate() + 1);

    }
    current.getFullYear

    doc.save('.pdf');
  }

  $scope.drawCell = function(x, y) {
    doc.rect(x, y, CELL_WIDTH, CELL_HEIGHT);
  }

  //return true if date param is a weekend or holiday
  $scope.isHolidayOrWeekend = function(date) {
    var day = date.getDay();

    //if weekend
    if (day === 0 || day === 6) {
      return true;
    }

    //if holiday
    for (holiday in $scope.holidays) {
      if ( holiday.date.getFullYear() === date.getFullYear()
          && holiday.date.getMonth() === date.getMonth()
          && holiday.date.getDate() === date.getDate()) {
            return true;
      }
    }

    return false;
  }

  $scope.drawDayHeaders = function(y) {
    for (var i=0; i < days.length; i++) {
      doc.text(days[i].offset, y - 10, days[i].text);
    }
  }
});


function isLastDayOfMonth(date) {
  return daysInMonth(date.getMonth(), date.getYear()) == date.getDate
}

function daysInMonth(month,year) {
  return new Date(year, month, 0).getDate();
}
