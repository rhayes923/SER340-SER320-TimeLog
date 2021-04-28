// gets the array of courses names stored in cookies
if (window.localStorage.getItem("assignmentsNamesList") != "undefined") {
  var coursesNamesList = window.localStorage.getItem("coursesNamesList");
  if (coursesNamesList != null) {
    coursesNamesList = coursesNamesList.split(",");
  }
}

// gets the array of courses
if (window.localStorage.getItem("cours") != "undefined") {
  var courses = window.localStorage.getItem("cours");
  if (courses != null) {
    courses = courses.split(",");
  }
} else {
  var courses = [];
}
if (courses == null) {
  var courses = [];
}

// applies the course delete function to each course
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

//add the new course button
newElement = () => {
  var li = document.createElement("li");
  var inputValue = document.getElementById("courseID").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === "") {
    // alert the user there is no course name input
    alert("Please input an course name");
  } else {
    // add the new course name to the display list
    document.getElementById("newCourse").appendChild(li);
    courses.push(inputValue);
    window.localStorage.setItem("cours", courses);
  }
  document.getElementById("courseID").value = "";
  // add the survey time results under the associated courses names
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // add close button to newly added courses
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
      // find value of deleted item in array and remove it
      var index = courses.indexOf(div.firstChild.data);
      if (index > -1) {
        courses.splice(index, 1);
      }
      // store the courses in the cookie
      window.localStorage.setItem("cours", courses);
    };
  }
};
