"use strict";
import Spa from "./spa.js"
import {
  db
} from "./firebase.js";


let spa = new Spa("login");

window.pageChange = function () {
  spa.pageChange();
}
//-------------- event listeners ---------------------------------------------
//------------------------- for nav ---------------------------------
document.querySelector(".trunIn").addEventListener("click", navToEnd)
document.querySelector(".seeMore-btn").addEventListener("click", navToGraf)
document.querySelector(".score-btn").addEventListener("click", navToScore)
//--------------- for sign in and out --------------------------------------
document.querySelector(".logout").addEventListener("click", signOut)
document.querySelector(".login-btn").addEventListener("click", login)
//----------------- adding data -------------------------------------------
document.querySelector(".trunIn").addEventListener("click", addData)

//----------------------- nav functions -------------------------------------
// "afslut" button
function navToEnd() {
  spa.navigateTo("end")
}
// "ser mere" button
function navToGraf() {
  spa.navigateTo("graf-view")
}

function navToScore() {
  spa.navigateTo("leaderbord")
}
//----------------------------- firebase login ------------------
// login button
function login() {
  let email = document.querySelector("#loginEmail").value;
  let password = document.querySelector("#loginPassword").value;
  firebase.auth().signInWithEmailAndPassword(email, password);
}

// checking if signIn or not
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // navs to fill page
    // console.log(user.uid)
    spa.navigateTo("fill")
  } else {
    // User is signed out.
    // navs back to login
    spa.navigateTo("login")
  }
});

// sign out button
function signOut() {
  firebase.auth().signOut()
}
//--------------------- reading user data from firebase ----------------------------
//--------------------- reading data for leaderbord ---------------------------------
db.collection("users").get().then((querySnapshot) => {
  let users = [];
  querySnapshot.forEach((doc) => {
    let user = doc.data();
    console.log(user);
    user.uid = doc.id;
    users.push(user);
  });
  appendUsers(users);
  readDataDiesel(users);
  readDataPower(users);
  readDataCows(users);
  readDatafeed(users)
});
//leaderboard
function appendUsers(users) {
  let leaderboard = document.querySelector(".leaderboard-container");
  leaderboard.innerHTML="";
  users.sort();
  users.reverse();
for(let user of users) {
 let name = document.createElement("div");
 let score = document.createElement("div");
 name.classList.add("name");
 score.classList.add("score");
 name.innerHTML = user.name;
 score.innerHTML = user.score;

 let scoreRow = document.createElement("div");
 scoreRow.classList.add("row");
 scoreRow.appendChild(name);
 scoreRow.appendChild(score);
 leaderboard.appendChild(scoreRow);
}
}
// append users date to graf in DOM
function readDataDiesel() {
  let currentUser = firebase.auth().currentUser
    db.collection("users").doc(currentUser.uid).collection("diesel").get()
      .then(querySnapshot => {
        let diesels = [];
        diesels =[];
        querySnapshot.forEach(doc => {
          let diesel = doc.data()
          // console.log(doc.id, " => ", doc.data());
          diesel.id = doc.id
          diesels.push(diesel);
           console.log(diesel.id, " => ", doc.data())
          console.log(currentUser.uid)
        });
        dieselData(diesels)
      });

  function dieselData(diesels) {
    let dieselChart = document.getElementById("diesel-graf").getContext('2d')
    for (let diesel of diesels){

      let dieselCo2Chart = new Chart(dieselChart, {
        type: 'bar',
        data: {
          labels: ['2015', '2016', '2017', '2018', '2019'],
          datasets: [{
            label: 'co2',
            data: [
              diesel.year1,
              diesel.year2,
              diesel.year3,
              diesel.year4,
              diesel.year5
            ]
          }]
        }
      });

    }
  }
}


function readDataPower() {
  let currentUser = firebase.auth().currentUser
    db.collection("users").doc(currentUser.uid).collection("power").get()
      .then(querySnapshot => {
        let powers = [];
        querySnapshot.forEach(doc => {
          let power = doc.data()
          // console.log(doc.id, " => ", doc.data());
          power.id = doc.id
          powers.push(power);
        });
        powerData(powers)
      });


  function powerData(powers) {
    let powerChart = document.getElementById("power-graf").getContext('2d')
    for (let power of powers) {

      let powerCo2Chart = new Chart(powerChart, {
        type: 'bar',
        data: {
          labels: ['2015', '2016', '2017', '2018', '2019'],
          datasets: [{
            label: 'co2',
            data: [
              power.year1,
              power.year2,
              power.year3,
              power.year4,
              power.year5
            ]
          }]
        }
      });

    }
  }
}

function readDataCows() {
  let currentUser = firebase.auth().currentUser
    db.collection("users").doc(currentUser.uid).collection("power").get()
      .then(querySnapshot => {
        let cows = [];
        querySnapshot.forEach(doc => {
          let cow = doc.data()
          // console.log(doc.id, " => ", doc.data());
          cow.id = doc.id
          cows.push(cow);
        });
        cowData(cows)
      });


  function cowData(cows) {
    let cowChart = document.getElementById("cow-graf").getContext('2d')
    for (let cow of cows) {

      let cowCo2Chart = new Chart(cowChart, {
        type: 'bar',
        data: {
          labels: ['2015', '2016', '2017', '2018', '2019'],
          datasets: [{
            label: 'co2',
            data: [
              cow.year1,
              cow.year2,
              cow.year3,
              cow.year4,
              cow.year5
            ]
          }]
        }
      });

    }
  }
}

function readDatafeed() {
  let currentUser = firebase.auth().currentUser
    db.collection("users").doc(currentUser.uid).collection("power").get()
      .then(querySnapshot => {
        let feeds = [];
        querySnapshot.forEach(doc => {
          let feed = doc.data()
          // console.log(doc.id, " => ", doc.data());
          feed.id = doc.id
          feeds.push(feed);
        });
        feedData(feeds)
      });

  function feedData(feeds) {
    let feedChart = document.getElementById("feed-graf").getContext('2d')
    for (let feed of feeds) {

      let feedCo2Chart = new Chart(feedChart, {
        type: 'bar',
        data: {
          labels: ['2015', '2016', '2017', '2018', '2019'],
          datasets: [{
            label: 'co2',
            data: [
              feed.year1,
              feed.year2,
              feed.year3,
              feed.year4,
              feed.year5
            ]
          }]
        }
      });

    }
  }
}




  //----------------------------------------------------- input data in to firebase ----------------------------------------------

function addData(){
  db.collection("users").get().then((querySnapshot) => {
    let users = [];
    querySnapshot.forEach((doc) => {
      let user = doc.data();
      console.log(user);
      user.id = doc.id;
      users.push(user);
    });
  for(let user of users){
  db.collection("users").doc(user.id).collection("raw-data").doc("data").set({
  feed:document.querySelector("#feed-raw").value,
  milk:document.querySelector("#milk-raw").value,
  cows:document.querySelector("#cows-raw").value,
  diesel:document.querySelector("#diesel-raw").value,
  power:document.querySelector("#power-raw").value
  });
  };
});
}
