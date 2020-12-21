'use strict';

let counter;
//Karakterek profilképének megjelenítése
function charData(response) {
    const template = '<div class="portrait"><img class="portrait_img"><figcaption class="figcaption"></figcaption></div>';
    //A halottakat kiszedem a tömbből
    const elem_dead = response.filter(item => item.dead != true);
    console.log(elem_dead);
    //console.log(elem_dead.length);
    /* response.forEach(element => {
        if (element.dead){
            response - element;
            console.log('Halott: ', element.name);
        }        
    }); */
    //(elem_dead.length / 8)
    
        
        //elemek kirakva a DOM-ba
        for (let i = 0; i < elem_dead.length; i += 1) {
            document.querySelector('.empty').insertAdjacentHTML('afterend', template);
            document.querySelector('.portrait_img').src = elem_dead[i].portrait;
            document.querySelector('.portrait_img').alt = elem_dead[i].name;
            document.querySelector('.figcaption').textContent = elem_dead[i].name.toLocaleUpperCase(); 
        }
}
//Json file beolvasása
async function getGot(url, options = {}) {
    try { 
        const response = await fetch(url, options);
        const gotData = await response.json();
        charData(gotData); 
    } catch (error) {
        console.error(error);
    }
    
}
getGot('/json/got.json');


