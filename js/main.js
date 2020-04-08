document.addEventListener("DOMContentLoaded", function() {

  // // Life expectancy
  // max_age = 80
  // extra_age = 20
  // // Fixed number of weeks/year
  // week_count = 52
  // Define some global variables
  dob = new Date(1800,0,1,12,0,0);
  // Sign-up date
  sud = new Date(2020,0,1,12,0,0);
  // Whether a box is active or not
  box_is_active = false ;

  console.log('Your document is ready!');

  update_dob();

  get_orientation();

  get_weeks();

  draw();
});

function draw() {
    init_dimensions();
    draw_title() ;
    draw_boxes() ;
    draw_popup() ;
}


function update_dob() {
  // Should get the date from a cookie / browser session / from DB if signed in. For now fake it
  dob.setFullYear(1989);
  dob.setMonth(1);
  dob.setDate(12);
  console.log("Date of birth: " + dob);
}

function get_orientation() {
    orientation_landscape = window.screen.width > window.screen.height ;
}

function get_weeks() {

  // Life expectancy
  max_age = 80
  extra_age = 20
  // Fixed number of weeks/year
  week_count = 52

  boxes = []

  max_age_date = new Date(dob);
  max_age_date.setFullYear(dob.getFullYear() + max_age);
  var dobDate = dob.getDate() ;
  var dobMonth = dob.getMonth() ;
  var now = new Date();
  var lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  // Could get this from the server or a cookie/browser storage, but fake it for now
  for (year = 0 ; year < (max_age + extra_age) ; year++) {
    for (week = 0 ; week < week_count ; week++) {
        var weekDate = new Date(dob);
        weekDate.setFullYear(dob.getFullYear() + year) ;
        weekDate.setDate(dobDate + 7*week);
        var box = {
          'year':year,
          'week':week,
          'date':weekDate,
          'stretch_year': (year > max_age),
          'unclicked': weekDate > sud,
          'this_week': (weekDate <= now && weekDate > lastWeek)
        }
        boxes.push(box);
    }
  }
}
