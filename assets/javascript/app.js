
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAeffOTVWdWWCDLMkAB0rrEAmjvFrb2mHU",
    authDomain: "trainapp-f4973.firebaseapp.com",
    databaseURL: "https://trainapp-f4973.firebaseio.com",
    projectId: "trainapp-f4973",
    storageBucket: "trainapp-f4973.appspot.com",
    messagingSenderId: "53445332244"
  };
  firebase.initializeApp(config);


// create variable to serve as reference to firebase
  var trainInfo = firebase.database();

  var name = "";
  var destination = "";
  var firstTrain = "";
  var frequency = 0;

//Everytime submit button clicked, all user input is stored in variables defined in On Click function
  $("#submitBtn").on("click",function(){
      var trainName = $("#nameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("x");
      var frequency = $("#frequencyInput").val().trim();

     var newTrain = {
         name: trainName,
         destination: destination,
         firstTrain: firstTrain,
         frequency: frequency
     }


// adds data to table  
  trainInfo.ref().push(newTrain);

  alert("Train Added!");

  $("#nameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  return false;

})

trainInfo.ref().on("child_added",function(snapshot){
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
    

})





