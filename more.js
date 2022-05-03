let countryAbout = sessionStorage.getItem('testName');
console.log(countryAbout)

/* API script */
const url = "https://restcountries.com/v3.1/all";

function mainPage(){
    fetch(url)
        .then(response => {
            response.json()
            .then(data => {
                data.forEach(country => {
                    if(country.name.official === countryAbout){
                        getPage(country);
                        console.log(country)
                    }
                })
            })
        })
}

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

function getPage(u){ 
    let o;
    for(key in u.currencies){
        o = u.currencies[key].name
    }

    let y;
    for(key in u.name.nativeName){
        y = u.name.nativeName[key].official;
    }

    let f = "";
    for(key in u.languages){
        f+= u.languages[key] + ", ";
    }

    let h = '';
    if(u.borders){
        u.borders.forEach(border => {
        h+= `<li>${border}</li>`
        })
    }else{
        h = 'No information'
    }
    
    


    document.querySelector(".content__country").innerHTML = `
        <div class="country__flag">
            <img src="${u.flags.png}" alt="${u.name.official} flag">
        </div>
        <div class="country__text">
            <div class="country__text__main-inf">
                <div class="country__text__main-inf__left-column">
                    <div class="country__text__main-inf__name">
                        <h2>${u.name.official}</h2>
                    </div>
                    <div class="country__text__main-inf__main">
                        <p><span class="bold-text">Native Name:</span> ${y}</p>
                        <p><span class="bold-text">Population:</span> ${comma(u.population)}</p>
                        <p><span class="bold-text">Region:</span> ${u.region}</p>
                        <p><span class="bold-text">Sub Region:</span> ${u.subregion}</p>
                        <p><span class="bold-text">Capital:</span> ${u.capital}</p>
                    </div>
                </div>
                <div class="country__text__main-inf__right-column">
                    <p><span class="bold-text">Top Level Domain:</span> ${u.tld}</p>
                    <p><span class="bold-text">Currencies:</span> ${o}</p>
                    <p><span class="bold-text">Languages:</span> ${f.slice(0, f.length-2)}</p>
                </div>
            </div>
            <div class="country__text__border">
                <p>Border Countries:</p>
                <ul class="border-list">
                    ${h}
                </ul>
            </div>
        </div>
    `
}

/* Dark mode */
function darkModeBtn(){
    document.querySelector(".whale-section").classList.toggle("darkMode");
    document.body.style.backgroundColor = "var(--very-dark-blue)";
}