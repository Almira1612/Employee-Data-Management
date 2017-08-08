
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB88ioHAxl_Ndc1ElWlVn6eN3KtvVimmP4",
    authDomain: "time-tracker-3d71f.firebaseapp.com",
    databaseURL: "https://time-tracker-3d71f.firebaseio.com",
    projectId: "time-tracker-3d71f",
    storageBucket: "",
    messagingSenderId: "366607864899"
  };
  firebase.initializeApp(config);
 //Stores firebase variable
var database = firebase.database();

//Click event function for submit button
//Will take values from form, store in firebase, and add to table
$("#submitButton").on("click",function(){

	//user inputs from form
	var name = $("#employeeName").val().trim();
	var role = $("#role").val().trim();
	var startDate = $("#startDate").val().trim();
	var monthlyRate = $("#monthlyRate").val().trim();
   
     console.log(name, role, startDate, monthlyRate);

	//   $("#EmployeeTable").append(newRow);
	// $("#EmployeeTable").append([
	// '<tr>',
	//     '<td>' + name + '</td>',
	//     '<td>' + role +'</td>',
	//     '<td>' + startDate + '</td>',
	//     '<td></td>',
	//     '<td>' + monthlyRate + '</td>',
	//     '<td></td>',
	// '</tr>'
	// ].join(""));
   
   //Makes new entry in firebase for new user inputs
	database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP //timestamp for when you hit submit
      });

	//clears user input fields
	$("#employeeName").val("");
	$("#role").val("");
	$("#startDate").val("");
	$("#monthlyRate").val("");

});


//Loads most recently added user to page
  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

	//Appends a new row to the table with data entries from most recent entry in Firebase database 
	$("#EmployeeTable").append(
	'<tr>' +
	    '<td>' + snapshot.val().name + '</td>' +
	    '<td>' + snapshot.val().role +'</td>' +
	    '<td>' + snapshot.val().startDate + '</td>' +
	    '<td></td>' +
	    '<td>' + snapshot.val().monthlyRate + '</td>' +
	    '<td></td>' +
	'</tr>');
  });