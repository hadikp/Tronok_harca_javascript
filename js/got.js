'use strict';
let lastName;
let imgSrc;
let nameSplit;
let findSearch = true;

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
getGot('json/got.json');

function run () {

}
//Karakterek profilképének megjelenítése
function charData(response) {
    //A halottakat kiszedem a tömbből
    const elem_dead = response.filter(item => item.dead != true);
    //Az adatokhoz berakom a lastName-t
     elem_dead.map(item => {
        const name_split = item.name.split(' '); //name-t szétszplitteltem  elem_dead.map(item =>item.name.split(' '));
        if (name_split[1] === undefined) {
             lastName = name_split[0];
        } else lastName = name_split[1];
        item.lastName = lastName;
     });
     
     //Névsorba rendezem
     elem_dead.sort((a, b) => {
         let textA = a.lastName;
         let textB = b.lastName;
         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
     })
     console.log(elem_dead);//Törölni!!!!!!!!!!!!!!!!!!!!!!!!! 
    
    //elemek kirakva a DOM-ba
     for (let i = elem_dead.length-1; i >= 0; i --) { 
        const templatePortrait = '<div class="portrait"><img class="portrait_img"><figcaption class="figcaption"></figcaption></div>';
        document.querySelector('.empty').insertAdjacentHTML('afterend', templatePortrait);
        document.querySelector('.portrait_img').src = elem_dead[i].portrait;
        document.querySelector('.portrait_img').alt = elem_dead[i].name;
        document.querySelector('.figcaption').textContent = elem_dead[i].name.toLocaleUpperCase();   
     }
     //nagyképet kirakom jobbra az aside_left-be
     const imgEvent = (event) => {
            if (event) { //A click esemény létezik?
                imgSrc = event.currentTarget.firstChild.getAttribute('src'); //kisképek elérési útjának kinyerés
            }
       elem_dead.forEach(item => { //nagyképek keresése
           if (imgSrc === item.portrait) { 
                    if (item.picture === undefined) {
                        item.picture = 'assets/pictures/placeholder.jpg';
                    }
                document.querySelector('.picture_img').src = item.picture;
                document.querySelector('.aside_figcaption').textContent = item.name;
                    if (item.house != undefined) {
                        document.querySelector('.aside_figcaption_img').src = `assets/houses/${item.house}.png`; //ház cimere
                    }
                document.querySelector('.bio').textContent = item.bio;
           }
       })
      // document.querySelector('img[src="assets/petyr.png"]').addEventListener('click', c); 
    }

     //Kiválasztom a nagyítandó képet a kisképekre klikkelve
     document.querySelectorAll('.portrait').forEach(element => {
        element.addEventListener('click', imgEvent)});
    
    //Search mező az aside alján
    document.querySelector('.btn_search').addEventListener('click', search);

   function search() {
        let inputValue = document.querySelector('.aside_input').value.split(' ');
        //Ha csak 1 név van ehhez kell
        if (inputValue[1] === undefined) {
            inputValue = `${inputValue[0].toLocaleUpperCase()}`;
        } else inputValue = `${inputValue[0].toLocaleUpperCase()} ${inputValue[1].toLocaleUpperCase()}`;
        
        //Name-ból megkeresem az imgSrc-t(kiskép elérési útvonala), kis-nagy betű nem számít
        findSearch = false;
        elem_dead.forEach(item => {
            
            nameSplit = item.name.split(' ');
            if (nameSplit[1] === undefined) {
                nameSplit = `${nameSplit[0].toLocaleUpperCase()}`;
            } else nameSplit = `${nameSplit[0].toLocaleUpperCase()} ${nameSplit[1].toLocaleUpperCase()}`;
            //Összehasonlítja a karakterek nevét az input mezőbe gépelttel
            if ( JSON.stringify(inputValue) === JSON.stringify(nameSplit)) {
                imgSrc = item.portrait;
                findSearch = true;
                imgEvent();
            } 
        }); 

        if (findSearch === false) {
                document.querySelector('.picture_img').src = '';
                document.querySelector('.aside_figcaption').textContent = 'Nincs ilyen karakter';
                document.querySelector('.bio').textContent = '';
                document.querySelector('.aside_figcaption_img').src = '';
        }
    }   
}



