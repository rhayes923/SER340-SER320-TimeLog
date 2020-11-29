// gets the array of assignment completion times stored in cookies
if (window.localStorage.getItem("assignmentTimeList") != "undefined") {
    var assignmentTimeList = window.localStorage.getItem("assignmentTimeList");
    if (assignmentTimeList != null) {
        assignmentTimeList = assignmentTimeList.split(",");
    }
}

// gets the array of assignment names stored in cookies
if (window.localStorage.getItem("assignmentsNamesList") != "undefined") {
    var assignmentsNamesList = window.localStorage.getItem("assignmentsNamesList");
    if (assignmentsNamesList != null) {
        assignmentsNamesList = assignmentsNamesList.split(",");
    }
}

// gets the array of assignments
if (window.localStorage.getItem("assns") != "undefined") {
    var assignments = window.localStorage.getItem("assns");
    if (assignments != null) {
        assignments = assignments.split(",");
    }
} else {
    var assignments = [];
}
if (assignments == null) {
    var assignments = [];
}

// applies the assignment delete function to each assignment
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    };
}

// when the window loads populate the page with existing assignments and completion data
window.onload = function () {
    // add each assignment
    var n;
    if (assignments.length > 0) {
        for (n = 0; n < assignments.length; n++) {
            var li = document.createElement("li");
            var inputValue = assignments[n];
            var t = document.createTextNode(inputValue);
            li.appendChild(t);
            // append each assignent to the unordered list
            document.getElementById("myUL").appendChild(li);
            document.getElementById("myInput").value = "";
            // add the text and the x button
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);
            // apply the assignment delete button to each assignment
            for (i = 0; i < close.length; i++) {
                close[i].onclick = function () {
                    var div = this.parentElement;
                    div.style.display = "none";
                    // find value of deleted item in array and remove it
                    var index = assignments.indexOf(div.firstChild.data);
                    if (index > -1) {
                        assignments.splice(index, 1);
                    }
                    // store the assignments in the cookie
                    window.localStorage.setItem("assns", assignments);
                };
            }
        }
    }

    // add the assignment names to the results section
    if (assignmentsNamesList != null) {
        if (assignmentsNamesList.length > 0) {
            for (n = 0; n < assignmentsNamesList.length; n++) {
                var li2 = document.createElement("li2");
                var inputValue2 = assignmentsNamesList[n];
                // append each assignment name to the results list
                var t2 = document.createTextNode(inputValue2);
                li2.appendChild(t2);

                document.getElementById("resultsList").appendChild(li2);
                document.getElementById("myInput").value = "";

                var span2 = document.createElement("SPAN");
                var txt2 = document.createTextNode("");
                span2.className = "close";
                span2.appendChild(txt2);
                li2.appendChild(span2);

                //add the times
                var li3 = document.createElement("li");
                var inputValue3 = assignmentTimeList[n];

                var t3 = document.createTextNode(inputValue3);
                li3.appendChild(t3);

                document.getElementById("resultsList").appendChild(li3);
                document.getElementById("myInput").value = "";

                var span3 = document.createElement("SPAN");
                var txt3 = document.createTextNode("");
                span3.className = "close";
                span3.appendChild(txt3);
                li3.appendChild(span3);
            }
        }
    }
};

function exportCsv(filename, content) {
    // generate download results.txt file with survey results
    // initialize content variable to prevent initial null string when appending assignments to it
    var content = "";
    if (assignmentsNamesList != null) {
        if (assignmentsNamesList.length > 0) {
            for (n = 0; n < assignmentsNamesList.length; n++) {
                // format txt output in a csv style to allow for importing to spreadsheet
                content += assignmentsNamesList[n] + "," + assignmentTimeList[n] + "\n";
            }
        }
    }

    // set fownload filename
    var filename = "results.csv";

    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
    element.setAttribute("download", filename);

    element.click();
}

// add new assignment button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === "") {
        // alert the user there is no assignment name input
        alert("Please input an assignment name");
    } else {
        // add the new assignment name to the display list
        document.getElementById("myUL").appendChild(li);
        assignments.push(inputValue);
        window.localStorage.setItem("assns", assignments);
    }
    document.getElementById("myInput").value = "";
    // add the survey time results under the associated assignment names
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    // add close button to newly added assignments
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
            // find value of deleted item in array and remove it
            var index = assignments.indexOf(div.firstChild.data);
            if (index > -1) {
                assignments.splice(index, 1);
            }
            // store the assignments in the cookie
            window.localStorage.setItem("assns", assignments);
        };
    }
}
