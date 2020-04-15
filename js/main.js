import Spa from "./spa.js"


let spa = new Spa("login");

window.pageChange = function(){
spa.pageChange();
}
