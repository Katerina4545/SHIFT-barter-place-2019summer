var desireNOW;

//вывести список всех предложений
const getAllOffers = function() {
    var data = localStorage.getItem("offersGlobal");
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
    } else{
        var html = '<center><p class="text"> Пока никто не добавлял своих предложений, будьте первым! </p></center>';                
        var parent = document.getElementById('endOfMenu'); 
        parent.insertAdjacentHTML('beforeend', html);
        console.log("data isn't here");
    }     
};
getAllOffers();


//клик на "добавить"
var button = document.getElementsByClassName("addOffer")[0];
const userId = localStorage.getItem("userId");
let flag1 = -1;
let flag2 = -1;
button.onclick = () => {
    createRequest({ path: '/api/v001/barter/'+ userId +'/backpack', method: "GET" })
    .then(
        result => {
            console.log("result", result);
            
            var myBackpack = document.getElementsByClassName("backpack")[0];            
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
                    var html = '<p class="text"> Ваш рюкзак пуст!</p>';
                    var parent = document.getElementById('myBackpack'); 
                    parent.insertAdjacentHTML('beforeend', html);                    
                }
                myBackpack.style.display = 'block'; 
            }
            const images = document.querySelectorAll(".backpackImage");
            images.forEach(item => item.addEventListener('click', changeView));            
        },
        error => {console.log("error", error);}
    );
    
}

//клик на картинку из рюкзака
function changeView(event) {   
    var body = {};
    body.productId = event.target.id;
    body.description = "";
    createRequest({ path: '/api/v001/barter/offers', method: "POST" }, {}, body)
    .then(
        result => {
            console.log("RESULT", result);
            var myBackpack = document.getElementById("myBackpack");
            myBackpack.style.display = 'none';
        },
        error =>{console.log("ERROR", error);}
        );
};










//клик на "обмен"

var exchange = document.querySelectorAll(".exchange");
exchange.forEach(item => { item.addEventListener("click", changeView_two); });

let flag1_ = -1;
let flag2_ = -1;
function changeView_two(event) {
    desireNOW = event.target.id;
    console.log("desireNOW", desireNOW);
    createRequest({ path: '/api/v001/barter/'+ userId +'/backpack', method: "GET" })
    .then(
        result => {
            //console.log("result", result);
            localStorage.setItem("backpackList", JSON.stringify(result));
            var myBackpack = document.getElementById("myBackpack");            
            if (result.length != 0){ //если ответ не пустой 
                if(flag1_ == -1)
                {   
                    flag1_++;
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
                if(flag2_ == -1)
                {
                    flag2_++;
                    var html = '<p class="text"> Ваш рюкзак пуст!</p>';
                    var parent = document.getElementById('myBackpack'); 
                    parent.insertAdjacentHTML('beforeend', html);                    
                }
                myBackpack.style.display = 'block'; 
            }
            const images = document.querySelectorAll(".backpackImage");
            images.forEach(item => item.addEventListener('click', changeView_three));
            
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

function changeView_three(event) {
    const productId = event.target.id;    
    const dealId = desireNOW;
    localStorage.setItem("productId", productId);

    createRequest({ path: '/api/v001/barter/' + dealId + '/offerResponse', method: "POST" })
    .then(
        result => {
            //console.log("RESULT", result);
            var myBackpack = document.getElementById("myBackpack");
            myBackpack.style.display = 'none';
        },
        error =>{console.log("ERROR", error);}
        );
};








