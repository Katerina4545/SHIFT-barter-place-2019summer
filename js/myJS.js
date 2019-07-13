
//событие "ВОЙТИ" переопределенно : 
const getUserId = document.querySelector("#get-userId");
getUserId && getUserId.addEventListener("submit", event => {
  event.preventDefault();
  const data = getFieldData(event.target);  
  localStorage.setItem("name", data.userName);
  console.log(data);  
  createRequest({ path: `/api/v001/barter/login`, method: "POST" })
    .then(
      result => { 
        localStorage.setItem("userId", result.userId);
        location.href = '../html/mainIndex.html';
      },
      error => {
        console.warn("error", error);
      }
    );
    //location.href = '../html/mainIndex.html';
});
 
const imageEnter = document.getElementsByClassName("enter")[0];
imageEnter.onclick = () => location.href = '../index.html';; 
 
//событие "клик на профиль" :
function profile(){
  location.href = '../html/mainIndex.html';
}

//событие "клик на желания"
function desires(){
  event.preventDefault();
  createRequest({ path: `/api/v001/barter/desires`, method: "GET" })
    .then(
      result => {  
        console.log("result", result);            
        localStorage.setItem("desiresGlobal", JSON.stringify(result)); //сохраняем ответ, чтобы пользоваться им на новой страничке
        location.href = '../html/desiresGlobalIndex.html';
      },
      error => {
        console.warn("error", error);
      }
    );
    //location.href = '../html/desiresGlobalIndex.html';
}

//событие "клик на предложения"
function offers(){
  event.preventDefault();
  createRequest({ path: `/api/v001/barter/offers`, method: "GET" })
    .then(
      result => {        
        localStorage.setItem("offersGlobal", JSON.stringify(result)); //сохраняем ответ, чтобы пользоваться им на новой страничке
        location.href = '../html/offersGlobalIndex.html';
      },
      error => {
        console.warn("error", error);
      }
    );
    //location.href = '../html/offersGlobalIndex.html';
}

//событие "клик на рюкзак"
function backpack(){
  event.preventDefault();
  let userId = localStorage.getItem("userId");
  createRequest({ path: '/api/v001/barter/' + userId + '/backpack', method: "GET" })
    .then(
      result => {        
        localStorage.setItem("backpack", JSON.stringify(result)); //сохраняем ответ, чтобы пользоваться им на новой страничке
        console.log("result", result);
        location.href = '../html/backpackIndex.html';
      },
      error => {
        console.warn("error", error);
      }
    );
    //location.href = '../html/backpackIndex.html';
}

//событие "клик на сделки" -> открыть страничку с двумя кнопками
function deals(){
  location.href = '../html/dealsIndex.html';
}

//событие "клик на мои ответы" -> открыть страничку с двумя кнопками
function myAnswers(){
  location.href = '../html/myAnswersIndex.html';
}











