//вывести весь рюкзак
const getAllDesires = function() {
    var data = localStorage.getItem("backpack");
    var parsedData = data ? JSON.parse(data) : null;
    if (parsedData.length){ //если ответ не пустой
        console.log("data here", parsedData); 
        parsedData.forEach(
            function(item){
                var html = '<div class="oneThing">';
                html+= '<center>';                
                html+= `<img class="image" src="${item.pictureURL}" alt="здесь фото">`;
                html+= `<button id="${item.id}" class="smallButton delete">удалить</button>`;
                html+= '</center>';
                html+= '</div>';

                var parent = document.getElementById('myBackpack'); 
                parent.insertAdjacentHTML('beforeend', html);
            });
    } else {
        var html = '<center> <p class="text">Добавьте свой первый товар!</p> </center>';                
        var parent = document.getElementById('myBackpack'); 
        parent.insertAdjacentHTML('beforeend', html);
        console.log("data isn't here", parsedData);
    }
     
};
getAllDesires();




//кнопка добавить и далее
var button = document.getElementsByClassName("addThing")[0];
var close = document.getElementById("thingClose");
var descriptionOfThing = document.getElementsByClassName("descriptionOfThing")[0];
button.onclick = () => {
    descriptionOfThing.style.display='block';
}
close.onclick = () =>{
    descriptionOfThing.style.display='none';
}

var butAdd = document.getElementById("thing");
butAdd.onclick = () => {
    event.preventDefault();
    const descriptionField = event.target.parentNode.querySelector('.discription');       
    const body = {
        "type":"",
        "name":"",
        "pictureURL":"",
        "description":""
        }     
    body.type = "FOOD";
    body.description = descriptionField.value;
    const name = event.target.parentNode.querySelector('.nameOfProduct');
    body.name = name.value;
    const URL = event.target.parentNode.querySelector('.link');
    body.pictureURL = URL.value;
    const userId = localStorage.getItem("userId");

    createRequest({ path: '/api/v001/barter/'+userId+'/backpack', method: "POST" },{}, body)
    .then(
        result => {descriptionOfThing.style.display = 'none';}
    );  
}

//кнопка удалить
var butDel = document.querySelectorAll(".delete");
butDel.forEach(item => { item.addEventListener("click", deleteThing); });

function deleteThing(event){
    const userId = localStorage.getItem("userId");
    console.log("event.target", event.target);
    const productId = event.target.id;

    createRequest({ path: '/api/v001/barter/' + userId + '/' + productId, method: "DELETE" })
    .then(
        result => {
            console.log('deleted!');
        },
        error => {
            console.log('not deleted');
        }
    )
}


