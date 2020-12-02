// load the assignment list created by faculty
if (window.localStorage.getItem("assns") != "undefined") {
  var assignments = window.localStorage.getItem("assns");
  if (assignments != null) {
    assignments = assignments.split(",");
  }
} else {
  var assignments = [];
}

// load any previously inputted assignment completion times
if (window.localStorage.getItem("assignmentTimeList") != "undefined") {
  var assignmentTimeList = window.localStorage.getItem("assignmentTimeList");
  if (assignmentTimeList != null) {
    assignmentTimeList = assignmentTimeList.split(",");
  }
} else {
  var assignmentTimeList = [];
}
if (assignmentTimeList == null) {
  var assignmentTimeList = [];
}

// load assignment names
if (window.localStorage.getItem("assignmentsNamesList") != "undefined") {
  var assignmentsNamesList = window.localStorage.getItem(
    "assignmentsNamesList"
  );
  if (assignmentsNamesList != null) {
    assignmentsNamesList = assignmentsNamesList.split(",");
  }
} else {
  var assignmentsNamesList = [];
}
if (assignmentsNamesList == null) {
  var assignmentsNamesList = [];
}

// submit all button
onSubmit = () => {
  // re-create the arrays to prevent duplicates
  assignmentTimeList = [];
  assignmentsNamesList = [];

  // add the assignment survey inputs to the browser storage and local arrays
  var n;
  if (assignments.length > 0) {
    for (n = 0; n < assignments.length + 1; n++) {
      assignmentsNamesList.push(
        document.getElementsByClassName("nameStyle")[n].innerHTML
      );
      assignmentTimeList.push(
        document.getElementsByClassName("form-control")[n].value
      );

      window.localStorage.setItem("assignmentTimeList", assignmentTimeList);
      window.localStorage.setItem("assignmentsNamesList", assignmentsNamesList);
    }
  }
  // submisson success alert
  alert("Successfully Submitted");
};

// when window loads add assignments and previously inputted data
window.onload = function () {
  var n;
  if (assignments.length > 0) {
    for (n = 0; n < assignments.length; n++) {
      var myDiv = document.getElementById("assignmentName");
      var divClone = myDiv.cloneNode(true);
      divClone.id = "assignmentName" + String(n);
      document.getElementById("assignmentList").appendChild(divClone);
      document.getElementById("assignmentName" + String(n)).innerHTML = String(
        assignments[n]
      );

      var myDiv2 = document.getElementById("input");
      var divClone2 = myDiv2.cloneNode(true);
      divClone2.id = "input" + String(n);
      document.getElementById("assignmentList").appendChild(divClone2);
    }
  }

  //set placeholder text to previously entered time if applicable
  if (assignmentTimeList.length > 0) {
    for (n = 0; n < assignments.length + 1; n++) {
      document.getElementsByClassName("form-control")[n].value = String(
        assignmentTimeList[n]
      );
    }
  }
};
