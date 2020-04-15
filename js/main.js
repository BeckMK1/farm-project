import Spa from "./spa.js"


let spa = new Spa("login");

window.pageChange = function(){
spa.pageChange();
}

document.querySelector(".login-btn").addEventListener("click", navToFill)
document.querySelector(".trunIn").addEventListener("click", navToEnd)

function navToFill(){
spa.navigateTo("fill")
}
function navToEnd(){
spa.navigateTo("end")
}