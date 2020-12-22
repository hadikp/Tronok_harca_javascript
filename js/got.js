'use strict';

let lastName;
let first_lastName;
/* const strArr = [{"str": "The quick brown fox jumps over the lazy dog."}];
console.log(strArr);
const words = strArr[0]["str"].split(' ');
console.log(words);
console.log(words[1]);
strArr[0].fname = words[1];
console.log(strArr); */

//Karakterek profilképének megjelenítése
function charData(response) {
    const template = '<div class="portrait"><img class="portrait_img"><figcaption class="figcaption"></figcaption></div>';
    //A halottakat kiszedem a tömbből
    const elem_dead = response.filter(item => item.dead != true);

    //Az adatokhoz berakom a lastName-t
     elem_dead.map(item => {
        const name_split = item.name.split(' '); //name-t szétszplitteltem  elem_dead.map(item =>item.name.split(' '));
        if (name_split[1] === undefined) {
             lastName = name_split[0];
             first_lastName = `${name_split[0]}`; //a name class elkészítése kernev
        } else {
            lastName = name_split[1];
            first_lastName = `${name_split[0]}_${name_split[1]}`; //a name class elkészítése kernev_veznev
        }
        item.lastName = lastName;
        return first_lastName; //Ezek kellenek?
        
     });
     console.log(first_lastName)
     //Névsorba rendezem
     elem_dead.sort((a, b) => {
         let textA = a.lastName;
         let textB = b.lastName;
         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
     })
     console.log(elem_dead);
    
    
    //elemek kirakva a DOM-ba
     for (let i = elem_dead.length-1; i >= 0; i --) { 
        document.querySelector('.empty').insertAdjacentHTML('afterend', template);
        document.querySelector('.portrait_img').src = elem_dead[i].portrait;
        document.querySelector('.portrait_img').alt = elem_dead[i].name;
        document.querySelector('.figcaption').textContent = elem_dead[i].name.toLocaleUpperCase();     
     }

     //nagyképet kirakom jobbra az aside_left-be
     const imgEvent = () => {
        document.querySelector('img[src="assets/petyr.png"]').addEventListener('click', c); 
     }
     
     function c() {
         console.log('Katt');
     }
     imgEvent();
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


