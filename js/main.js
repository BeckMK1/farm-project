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

db.collection("users").get().then((querySnapshot) => {
  let users = [];
  querySnapshot.forEach((doc) => {
    let user = doc.data();
    console.log(user);
    user.id = doc.id;
    users.push(user);
  });
  appendUsers(users);
  readDataDiesel(users);
  readDataPower(users);
  readDataCows(users);
  readDatafeed(users)
});
// append users to the DOM
function appendUsers(users) {
  let htmlTemplate = "";
  for (let user of users) {
    console.log(user.id)
    console.log(user.name)
    htmlTemplate += `
  <article>
  <h2>${user.name}</h2>
  </article>
  `;
  }
  document.querySelector(".leaderbord-container").innerHTML = htmlTemplate;
};

// append users date to graf in DOM
function readDataDiesel(users) {
  for (let user of users) {
    db.collection("users").doc(user.id).collection("diesel").get()
      .then(querySnapshot => {
        let diesels = [];
        querySnapshot.forEach(doc => {
          let diesel = doc.data()
          console.log(doc.id, " => ", doc.data());
          diesel.id = doc.id
          diesels.push(diesel);
        });
        dieselData(diesels)
      });
  }

  function dieselData(diesels) {
    let dieselChart = document.getElementById("diesel-graf").getContext('2d')
    for (let diesel of diesels) {

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

function readDataPower(users){
  for (let user of users) {
    db.collection("users").doc(user.id).collection("power").get()
      .then(querySnapshot => {
        let powers = [];
        querySnapshot.forEach(doc => {
          let power = doc.data()
          console.log(doc.id, " => ", doc.data());
          power.id = doc.id
          powers.push(power);
        });
        powerData(powers)
      });
  }
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

function readDataCows(users){
  for (let user of users) {
    db.collection("users").doc(user.id).collection("power").get()
      .then(querySnapshot => {
        let cows = [];
        querySnapshot.forEach(doc => {
          let cow = doc.data()
          console.log(doc.id, " => ", doc.data());
          cow.id = doc.id
          cows.push(cow);
        });
        cowData(cows)
      });
  }
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

function readDatafeed(users){
  for (let user of users) {
    db.collection("users").doc(user.id).collection("power").get()
      .then(querySnapshot => {
        let feeds = [];
        querySnapshot.forEach(doc => {
          let feed = doc.data()
          console.log(doc.id, " => ", doc.data());
          feed.id = doc.id
          feeds.push(feed);
        });
        feedData(feeds)
      });
  }
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