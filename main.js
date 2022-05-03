const url = "https://restcountries.com/v3.1/all";
const mainBlock = document.querySelector(".content__main");
let strPage = "";
let temp;

/* API script */
function getApi(){
    fetch(url)
        .then(response => {
            response.json()
            .then(data => {
                getStartPage(data)
            })
        })
}

/* Region menu */
function region(){
    document.querySelector(".content__region__block__list").classList.toggle("showRegionMenu");
}

/* Dark mode */
function darkModeBtn(){
    document.querySelector(".whale-section").classList.toggle("darkMode");
    document.body.style.backgroundColor = "var(--very-dark-blue)";
}

/* Search script */
let searchResult = "";
let visitorSearch = "";

function getVisitorSearch(){
    visitorSearch += document.querySelector(".search-input").value;
    getNameApi(visitorSearch);
    getCapitalApi(visitorSearch);
    visitorSearch="";
}

function getNameApi(j){
    if(j.length === 0){
        getApi()
    }
    let urlName = "https://restcountries.com/v3.1/name/" + j;
    fetch(urlName)
        .then(response => {
            response.json()
            .then(data => {
                getStartPage(data)
            })
        })
}

function getCapitalApi(d){
    if(d.length === 0){
        getApi()
    }
    let urlCapital = "https://restcountries.com/v3.1/capital/" + d;
    fetch(urlCapital)
        .then(response => {
            response.json()
            .then(data => {
                getStartPage(data)
            })
        })
}

/* Main content */
function comma(n){
    let d = String(n);
    let g = "";
    let j = d.length%3;
    let o = d.slice(j, d.length);
    if(j === 0){
        for(let i = 0; i < d.length; i++){
            if(i !== 0 && i % 3 === 0){
                g+= "," + d[i];
            } else{
                g+= d[i];
            }
        }
    }else{
        g += d.slice(0, j);
        for(let x = 0; x < o.length; x++){
            if(x % 3 ===0){
                g+= "," + o[x]
            }else{
                g+=o[x]
            }
            
        }
    }
    return g;
}

function getStartPage(g){
    strPage = "";
    g.forEach(country => {
        strPage+= `
            <a class="content__main__block" onclick="getInfo('${country.name.official}')" href="./more.html">
                <div class="content__main__block__image">
                    <img src="${country.flags.png}" alt="${country.name.official} flag">
                </div>
                <div class="content__main__block__text">
                    <h2>${country.name.official}</h2>
                    <div class="content__main__block__text__about">
                        <p class="population"><span class="bold-text">Population:</span> ${comma(country.population)}</p>
                        <p class="region"><span class="bold-text">Region:</span> ${country.region}</p>
                        <p class="capital"><span class="bold-text">Capital:</span> ${country.capital}</p>
                    </div>
                </div>
            </a>`
    })
    mainBlock.innerHTML = strPage;
}

function getInfo(name){
    sessionStorage.setItem('testName', name);
    console.log(name)
}

/* Region script */
const regionUrl = "https://restcountries.com/v3.1/region/";
let regionBlock  = "";

function getRegionApi(region){
    regionBlock = "";
    let urlFinal = regionUrl + region;
    fetch(urlFinal)
        .then(response => {
            response.json()
            .then(data => {
                filterFeedback(data)
            })
        })
}

function filterFeedback(n){
    n.forEach(country => {
        regionBlock+= `
        <div class="content__main__block">
            <div class="content__main__block__image">
                <img src="${country.flags.png}" alt="${country.name.official} flag">
            </div>
            <div class="content__main__block__text">
                <h2>${country.name.official}</h2>
                <div class="content__main__block__text__about">
                    <p class="population"><span class="bold-text">Population:</span> ${comma(country.population)}</p>
                    <p class="region"><span class="bold-text">Region:</span> ${country.region}</p>
                    <p class="capital"><span class="bold-text">Capital:</span> ${country.capital}</p>
                </div>
            </div>
        </div>`
    })

    mainBlock.innerHTML = regionBlock;
}


