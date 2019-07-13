var pictureNOW, responseId, dealId;
var DESIRES = -1, OFFERS = -1;

//клик на мои "желания"
var butDesires = document.getElementById("myDesires");
butDesires.onclick = () => {
    DESIRES = 1; OFFERS = -1;
    const userId = localStorage.getItem("userId");
    createRequest({ path: '/api/v001/barter/'+ userId +'/desires', method: "GET" })
    .then(
        result => {changeView(result);},
        error => {console.log("error", error);}
    );
}

//клик на мои "предложения"
var butOffers = document.getElementById("myOffers");
butOffers.onclick = () => {
    DESIRES = -1; OFFERS = 1;
    const userId = localStorage.getItem("userId");
    createRequest({ path: '/api/v001/barter/'+ userId +'/offers', method: "GET" })
    .then(
        result => {changeView(result);},
        error => {console.log("error", error);}
    );
}

//вывод результата (желаний или предложений)
function changeView(result){
    var html;
    var parent = document.getElementsByClassName('endOfMenu')[0];
    if (result.length){ //если ответ не пустой  
        console.log(parent)
        result.forEach(
            function(item){
                html = '<div class="oneThing">';
                html+= '<center>';                
                html+= `<img  class="image" src="${item.product.pictureURL}" alt="здесь фото">`;
                html+= `<button id="${item.id}" class="smallButton answers">ответы</button>`;
                html+= '</center>';
                html+= '</div>';
            });
    } else {
        html = '<center><p class="text">Вы еще не добавили ни одного товара :( </p></center>';        
    }
    parent.innerHTML = html;
    var answers = document.querySelectorAll(".answers");
    answers.forEach(item => { item.addEventListener("click", showAnswers); });
}

//клик на "ответы" //пока только для желаний//
const userId = localStorage.getItem("userId");
function showAnswers(event) {
    pictureNOW = event.target.id;
    console.log("тартар", event.target);
    //responseId = 
    if(DESIRES == 1) showAnswers_forDesires();
    else if(OFFERS == 1) showAnswers_forOffers();
}
    
let flag1_d = -1;
let flag2_d = -1;
function showAnswers_forDesires(){
    let flag1 = -1;
    let flag2 = -1;
    createRequest({ path: '/api/v001/barter/desires/' + pictureNOW, method: "GET" })
    .then(
        result => {
            console.log("result", result);
            if (result.responses.length)
            {         
                var window = document.getElementsByClassName("window")[0];
                if(flag1_d == -1){  flag1_d=1;     
                result.responses.forEach(
                    function(item){                        
                        var html = '<div class="oneThing">';
                        html+= '<center>';                
                        html+= `<img  class="image" src="${item.responseProduct.pictureURL}" alt="здесь фото">`;
                        html+= `<button id="${item.responseId}" class="smallButton answerHim">ответить</button>`;
                        html+= '</center>';
                        html+= '</div>';                        
                        window.insertAdjacentHTML('beforeend', html);
                        
                    });}
                    window.style.display = 'block';
                    var answerHim = document.querySelectorAll(".answerHim");
                    answerHim.forEach(item => { item.addEventListener("click", backpackView); });
            }
            else
            {
                var window = document.getElementsByClassName("window")[0];
                if(flag2_d==-1){ flag2_d=1;
                var html = `<p class="text"> Пока что никто не ответил на ваше желание </p>`;                
                window.insertAdjacentHTML('beforeend', html);
                }
            }
            window.style.display = 'block';
        },
        error => {console.log("error", error);}
    );

    
}

let flag1_o = -1;
let flag2_o = -1;
function showAnswers_forOffers(){
    
    createRequest({ path: '/api/v001/barter/offers/' + pictureNOW, method: "GET" })
    .then(
        result => {
            
            if (result.responses.length)
            {    
                var window = document.getElementsByClassName("window")[0]; 
                if(flag1_o==-1){ flag1_o=1;           
                result.responses.forEach(
                    function(item){                        
                        var html = '<div class="oneThing">';
                        html+= '<center>';                
                        html+= `<img  class="image" src="${item.responseProduct.pictureURL}" alt="здесь фото">`;
                        html+= `<button id="${item.responseId}" class="smallButton answerHim">ответить</button>`;
                        html+= '</center>';
                        html+= '</div>';

                        
                        window.insertAdjacentHTML('beforeend', html);
                        
                    });}
                    window.style.display = 'block';
                    var answerHim = document.querySelectorAll(".answerHim");
                    answerHim.forEach(item => { item.addEventListener("click", YesOrNo); });
            }
            else
            {
                var window = document.getElementsByClassName("window")[0];
                if(flag2_o==-1){ flag2_o=1;
                var html = `<p class="text"> Пока что никто не ответил на ваше желание </p>`;
                
                window.insertAdjacentHTML('beforeend', html);
                }
                window.style.display = 'block';
            }
            
        },
        error => {console.log("error", error);}
    );

        
    

}

var close = document.getElementsByClassName("closeButton")[0];

close.onclick = () => {
    var window = document.getElementsByClassName("window")[0];
    window.style.display = 'none';
}

//кнопка ответить -> рюкзак
let flag1_b = -1;
let flag2_b = -1;
function backpackView(event){
    responseId = event.target.id;
    const userId = localStorage.getItem("userId");
    createRequest({ path: '/api/v001/barter/'+ userId +'/backpack', method: "GET" })
    .then(
        result => {                        
            var myBackpack = document.getElementById("myBackpack");            
            if (result.length != 0){ //если ответ не пустой 
                if(flag1_b == -1)
                {   
                    flag1_b++;
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
                if(flag2_b==-1)
                {
                    flag2_b++;
                    var html = '<p class="text"> Ваш рюкзак пуст!</p>';
                    var parent = document.getElementById('myBackpack'); 
                    parent.insertAdjacentHTML('beforeend', html);                    
                }
                myBackpack.style.display = 'block'; 
            }
            const images = document.querySelectorAll(".backpackImage");
            images.forEach(item => item.addEventListener('click', request));
            
        },
        error => {console.log("error", error);}
        );    
}

//закрыть рюкзак
const parent = document.getElementById("myBackpack");
var close2 = parent.querySelector(".closeButton");
close2.onclick = () => {
    var myBackpack = document.getElementById("myBackpack");
    myBackpack.style.display = 'none';
}

function request(event){
    const productId = event.target.id;
    localStorage.setItem("productId", productId);
    createRequest({ path: '/api/v001/barter/'+ pictureNOW +'/' + responseId + '/desireResponse', method: "POST" })
    .then(
        result => {
            console.log("RESULT", result);
            var myBackpack = document.getElementById("myBackpack");
            myBackpack.style.display = 'none'; 
            var window = document.getElementsByClassName("window")[0];
            window.style.display = 'none';

        },
        error => {console.log("error", error);}

    );
}

function YesOrNo(event){
    responseId = event.target.id;
    let yesOrNo = document.getElementsByClassName("yesOrNo")[0];
    yesOrNo.style.display='block';

    var yes = document.getElementsByClassName("yesButton")[0];
    yes.onclick = () => 
    {
        closeOffer();
    }

    var no = document.getElementsByClassName("noButton")[0];
    no.onclick = () => 
    {        
        refusalResponseOffer();
    }

}

function closeOffer()
{
    localStorage.setItem("responseId", responseId);
    createRequest({ path: '/api/v001/barter/'+ pictureNOW +'/acceptOffer', method: "POST" })
    .then(
        result =>{console.log("RESULT closeOffer", result);},
        error =>{console.log("error", error);}
    )
    let yesOrNo = document.getElementsByClassName("yesOrNo")[0];
    yesOrNo.style.display='none';
}

function refusalResponseOffer()
{
    localStorage.setItem("responseId", responseId);
    createRequest({ path: '/api/v001/barter/'+ pictureNOW +'/discardOfferResponse', method: "DELETE" })
    .then(
        result =>{console.log("RESULT refusalResponseOffer", result);},
        error =>{console.log("error", error);}
    )
    let yesOrNo = document.getElementsByClassName("yesOrNo")[0];
    yesOrNo.style.display='none';
}
