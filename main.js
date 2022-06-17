const divData = document.querySelector('.display-data');
const detailBtn = document.querySelector('.flag-name');
const searchBtn = document.querySelector('.search-icon');
const cityName = document.querySelector('.search-class');
const regionsBtn = document.querySelectorAll('.region');

const apiCall = async () => {
    try{
        const response = await fetch('https://restcountries.com/v3.1/all');
        if(!response.ok){
            throw new Error("ERROR");
        }
        const data = await response.json()
        displayData(data);

    } catch (error){
        console.log(error);
    }
}

const displayByName = (country) =>{
    divData.innerHTML = ""
    const element = document.createElement('article');
        element.classList.add("flag-data");
        element.innerHTML = `<div class="flag-name">
            <img src="${country.flags.png}" width="60px">
            <span class="country-name">${country.name.common}</span>
        </div>
   
        <div class="capital-country">
            <span class="capital-symbol"><i class='bx bx-star'></i></span>
            <span>${country.capital}</span>
            <hr class="line">
            <span>${country.region}</span>
            <div class="fav-div">
                <i class='bx bx-heart'></i>
            </div>
        </div>`

        divData.appendChild(element)
        const flagDetail = document.querySelectorAll('.flag-name');
        flagDetail.forEach(btn => btn.addEventListener("click", flagDetailCall))
       

}
const saveCountry = (country) => {
    const newArray = JSON.parse(localStorage.getItem("saveCountry") || "[]");
    newArray.push(country)
    localStorage.setItem("saveCountry", JSON.stringify(newArray))
}
const clickin = (ev) => {
    /* const newArray = JSON.parse(localStorage.getItem("saveCountry") || "[]")
     newArray.push(country)
     localStorage.setItem("saveCountry", JSON.stringify(newArray))
     console.log(newArray)*/
    const countryTarget = ev.target.parentElement.parentElement.parentElement.firstChild.children[1].textContent
    saveFavCountry(countryTarget)
 }



const saveFavCountry = async (target) => {
    try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${target}`)
        if(!response.ok){
            throw new Error("ERROR");
        }
        const data = await response.json()
        saveCountry(data[0])
    } catch(err){
        console.log(err)
    }
}


const displayData = (data) => {
    divData.innerHTML = ""
    data.forEach(country => {
        const element = document.createElement('article');
        element.classList.add("flag-data");
        element.innerHTML = `<div class="flag-name">
            <img src="${country.flags.png}" width="60px">
            <span class="country-name">${country.name.common}</span>
        </div>
   
        <div class="capital-country">
            <span class="capital-symbol"><i class='bx bx-star'></i></span>
            <span>${country.capital}</span>
            <hr class="line">
            <span>${country.region}</span>
            <button class="fav-div">
                <i class='bx bx-heart'></i>
            </button>
        </div>`

        divData.appendChild(element)})
        
        const favBtn = document.querySelectorAll('.fav-div')
        favBtn.forEach(boton => boton.addEventListener('click', clickin))
        const flagDetail = document.querySelectorAll('.flag-name');
        flagDetail.forEach(btn => btn.addEventListener("click", flagDetailCall))
}

const displayDetail = (data) => {
    divData.innerHTML = ""
    data.forEach(country => {
        const element = document.createElement('div')
        element.classList.add("box");
        element.innerHTML = `<img class="flag-detail" src="${country.flags.png}" width="400px" alt="">
        <h1 class="name-detail">${country.name}</h1>
        <div class="capitol-div">
            <i class='bx bx-star'></i>
            <span class="capitol-detail">${country.capital}</span>
            <hr class="line-capitol">
            <span class="region-detail">${country.region}</span>
        </div>
        <div class="population-div">
            <div class="population-icon">
                <i class='bx bx-group'></i>
            </div>
            <span class="population-detail">${country.population}</span>
        </div>
        <div class="currency-detail">
            <span class="name-currency-detail">Currency: ${country.currencies[0].name}</span>
            <span class="symbol-detail">Symbol: ${country.currencies[0].symbol}</span>
        </div>`
        divData.appendChild(element)
    })
}

const flagDetailCall = async (ev) => {
    const name = ev.target.parentElement.firstChild.nextSibling.nextSibling.nextSibling.textContent
   try{
    const response = await fetch(`https://restcountries.com/v2/name/${name}`)
    if(!response.ok){
        throw new Error("ERROR");
    } else{
        const data = await response.json()
        displayDetail(data)
    }

   } catch(err){
    console.log(err)
   }
}


regionsBtn.forEach(region => {
    region.addEventListener("click", () =>{
        searchByRegion(region.textContent)
    })
})

const displaySaved = () =>{
    const arrSaved = JSON.parse(localStorage.getItem("saveCountry") || "[]")
    divData.innerHTML = ""
   arrSaved.forEach(country => {
    const element = document.createElement('article');
        element.classList.add("flag-data");
        element.innerHTML = `<div class="flag-name">
            <img src="${country.flags.png}" width="60px">
            <span class="country-name">${country.name.common}</span>
        </div>
   
        <div class="capital-country">
            <span class="capital-symbol"><i class='bx bx-star'></i></span>
            <span>${country.capital}</span>
            <hr class="line">
            <span>${country.region}</span>
            <button class="fav-div">
                <i class='bx bx-heart'></i>
            </button>
        </div>`

        divData.appendChild(element)
        const flagDetail = document.querySelectorAll('.flag-name');
        flagDetail.forEach(btn => btn.addEventListener("click", flagDetailCall))
   })
}

const searchByRegion = async (region) => {
    try{
        if(region === "All"){
            apiCall()
        } else if(region === "Favourites"){
            displaySaved()
        }else{
            const response = await fetch(`https://restcountries.com/v3.1/region/${region}`)
            if(!response.ok){
                throw new Error("ERROR");
            }
            const data = await response.json()
            displayData(data)
        }

      

    } catch(error){
        console.log(error)
    }
}


const searchByName = async () => {
    try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${cityName.value}`);
        if(!response.ok){
            throw new Error("ERROR");
        }
        const data = await response.json()
        displayByName(data[0]);

    } catch (error){
        console.log(error);
    }
}



searchBtn.addEventListener("click", searchByName)


apiCall()