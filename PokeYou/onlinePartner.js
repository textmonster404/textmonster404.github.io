var instance = 2;
async function Online() {
  var player = {};
  for (var key in Characters.Player) {
    player[key] = Characters.Player[key];
  }
  if (instance == 1) {
    //await firebase.firestore().collection("storage").doc(window.location.search+"/player").update(player);
    await firebase.database().ref(window.location.search+"/player").update(player);
  }
  if (instance == 2) {
    //await firebase.firestore().collection("storage").doc(window.location.search+"/partner").update(player);
    await firebase.database().ref(window.location.search+"/partner").update(player);
  }
}



firebase.database().ref(window.location.search+"/partner").on(
  "value",
  function(d){
    if (instance == 1) {
      for (var key in d.val()) {
        Characters.Partner[key] = d.val()[key];
      }
    }
  }
);

firebase.database().ref(window.location.search+"/player").on(
  "value",
  function(d){
    if (instance == 2) {
      for (var key in d.val()) {
        Characters.Partner[key] = d.val()[key];
      }
    }
  }
);

/*
firebase.firestore().collection("storage").doc(window.location.search+"/partner").onSnapshot(
  function(d){
    if (instance == 1) {
      for (var key in d.data()) {
        Characters.Partner[key] = d.data()[key];
      }
    }
  }
);

firebase.firestore().collection("storage").doc(window.location.search+"/player").onSnapshot(
  function(d){
    if (instance == 2) {
      for (var key in d.data()) {
        Characters.Partner[key] = d.data()[key];
      }
    }
  }
);
*/