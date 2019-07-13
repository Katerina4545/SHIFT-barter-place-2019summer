var desireNOW;

//вывести список всех желаний
const getAllDesires = function() {
    var data = localStorage.getItem("desiresGlobal");
    var parsedData = data ? JSON.parse(data) : null;
    if (parsedData.length){ //если ответ не пустой
        console.log("data here", parsedData); 
        parsedData.forEach(
            function(item){
                var html = '<div class="oneThing">';
                html+= '<center>';                
                html+= `<img  class="image" src="${item.product.pictureURL}" alt="здесь фото">`;
                html+= `<button id="${item.id}" class="smallButton exchange">обмен</button>`;
                html+= '</center>';
                html+= '</div>';

                var parent = document.getElementById('endOfMenu'); 
                parent.insertAdjacentHTML('beforeend', html);
            });
    } else {
        var html = '<center><p class="text">Пока никто не добавлял своих желаний, будьте первым!</p></center>';
                
        var parent = document.getElementById('endOfMenu'); 
        parent.insertAdjacentHTML('beforeend', html);
        console.log("data isn't here");
    }
     
};
getAllDesires();

//клик на "добавить"
var button = document.getElementsByClassName("addDesire")[0];
var descriptionOfDesires = document.getElementsByClassName("descriptionOfDesires")[0];
var close = document.getElementById("addClose");

button.onclick = () => {        
    descriptionOfDesires.style.display = 'block';
}

close.onclick = () => {
    descriptionOfDesires.style.display = 'none';
}

//отправка запроса
var butAdd = document.getElementById("add");
butAdd.onclick = () => {
    const descriptionField = event.target.parentNode.querySelector('#discription');
    console.log(event.target.parentNode);
    event.preventDefault();   
    const body = {
        "description" : "",
        "product" :  
                    {
                        "type":"",
                        "name":"",
                        "pictureURL":"",
                        "description":""
                    }
    };

    body.descrition =  descriptionField.value; 
    body.product.type = "FOOD";
    body.product.description = "descriptionOfProduct";
    const name = event.target.parentNode.querySelector('.nameOfProduct');
    body.product.name = name.value;
    const URL = event.target.parentNode.querySelector('.link');
    body.product.pictureURL = URL.value;

    createRequest({ path: `/api/v001/barter/desires`, method: "POST" },{}, body)
    .then(
        result => {descriptionOfDesires.style.display = 'none';}
    )  
}


//клик на "обмен"
var exchange = document.querySelectorAll(".exchange");
exchange.forEach(item => { item.addEventListener("click", changeView); });
const userId = localStorage.getItem("userId");
let flag1 = -1;
let flag2 = -1;
function changeView(event) {
    desireNOW = event.target.id;
    console.log("desireNOW", desireNOW);
    createRequest({ path: '/api/v001/barter/'+ userId +'/backpack', method: "GET" })
    .then(
        result => {
            console.log("result", result);
            localStorage.setItem("backpackList", JSON.stringify(result));
            var myBackpack = document.getElementById("myBackpack");            
            if (result.length != 0){ //если ответ не пустой 
                if(flag1 == -1)
                {   
                    flag1++;
                    result.forEach(
                    function(item){
                    var html = '<div class="oneThing">';
                    html+= '<center>';
                    html+= `<img id="${item.id}" class="image backpackImage" src="${item.pictureURL}" alt="здесь фото">`;                
                    html+= '</center>';
                    html+= '</div>';
                    
                    var parent = document.getElementById('myBackpack'); 
                    parent.insertAdjacentHTML('beforeend', html);
                    });                    
                }
                myBackpack.style.display = 'block';
            } else {
                if(flag2==-1)
                {
                    flag2++;
                    var html = '<center><p class="text"> Ваш рюкзак пуст!</p></center>';
                    var parent = document.getElementById('myBackpack'); 
                    parent.insertAdjacentHTML('beforeend', html);                    
                }
                myBackpack.style.display = 'block'; 
            }
            const images = document.querySelectorAll(".backpackImage");
            images.forEach(item => item.addEventListener('click', changeView_two));
            
        },
        error => {console.log("error", error);}
        );
        
        //image = document.querySelectorAll(".backpackImage");
        //[...image].forEach(item => { item.addEventListener("click", changeView_two); });

};
//exchange.forEach(button => button.onclick = changeView(event));

//закрыть рюкзак
const parent = document.getElementById("myBackpack");
var close2 = parent.querySelector(".closeButton");
close2.onclick = () => {
    var myBackpack = document.getElementById("myBackpack");
    myBackpack.style.display = 'none';
}

//нажатие на картинку в рюкзаке

function changeView_two(event) {
    const productId = event.target.id;    
    const dealId = desireNOW;
    localStorage.setItem("productId", productId);

    createRequest({ path: '/api/v001/barter/' + dealId + '/desireResponse', method: "POST" })
    .then(
        result => {
            //console.log("RESULT", result);
            var myBackpack = document.getElementById("myBackpack");
            myBackpack.style.display = 'none';
        },
        error =>{console.log("ERROR", error);}
        );
};












