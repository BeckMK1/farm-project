import Spa from "./spa.js"


let spa = new Spa("login");

window.pageChange = function(){
spa.pageChange();
}

// document.querySelector(".login-btn").addEventListener("click", navToFill)
document.querySelector(".trunIn").addEventListener("click", navToEnd)
document.querySelector(".seeMore-btn").addEventListener("click", navToGraf)
document.querySelector(".logout").addEventListener("click", signOut)

// function navToFill(){
//  spa.navigateTo("fill")
// }
function navToEnd(){
spa.navigateTo("end")
}
function navToGraf(){
spa.navigateTo("graf-view")
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    spa.navigateTo("fill")
      // ...
    } else {
      // User is signed out.
      spa.navigateTo("login")
      // ...
    }
  });
  function signOut(){
  firebase.auth().signOut()
  }