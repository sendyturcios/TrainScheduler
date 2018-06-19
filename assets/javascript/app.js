
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyChVjlgjr8z2LyIcKWzuoLIfsy5lH077HA",
    authDomain: "my-train-app-e996f.firebaseapp.com",
    databaseURL: "https://my-train-app-e996f.firebaseio.com",
    projectId: "my-train-app-e996f",
    storageBucket: "",
    messagingSenderId: "803587208126"
  };
  firebase.initializeApp(config);


// create variable to serve as reference to firebase
  var database= firebase.database();





//Everytime submit button clicked, all user input is stored in variables defined in On Click function
  $("#addTrainBtn").on("click",function(){
   
  
//User input
      var trainName = $("#nameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").format("HH:mm");
      var frequency = $("#frequencyInput").val().trim();

     var newTrain = {
         name: trainName,
         destination: destination,
         firstTrain: firstTrain,
         frequency: frequency
     };


// pushes data to table  
  database.ref().push(newTrain);


  // Logs to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Train successfully added");

 
//Clears input box
  $("#nameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  return false;

});

database.ref().on("child_added",function(snapshot){

    console.log(snapshot.val());

    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);
    



  // Add train data into the table
  $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");


})


