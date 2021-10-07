const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = [];

//fetch random user and money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0]
    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
    }

    addData(newUser)
}

getRandomUser()
getRandomUser()
getRandomUser()

function addData(obj){
    data.push(obj)

    updateDOM()
}

function doubleMoney(){
    data = data.map((person)=>{
        return {...person, money:person.money*2}
    })
    updateDOM()
}

function sortByWealth () {//descending order
    data=data.sort((a,b)=>{
        return b.money-a.money
    })
    updateDOM()
}

function filterMillionaires(){
    data = data.filter((i)=>{
        return i.money>1000000
    })
    updateDOM()
}

function calculateWealth(){
    const wealth = data.reduce((acc, user)=> (acc+=user.money), 0)
    
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML=`<h3>Total Wealth <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthElement)
}
//updateDom
function updateDOM(providedData = data){
    //Clear main dic
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'

    providedData.forEach((person)=>{
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML=`<strong>${person.name}</strong> ${formatMoney(person.money)}`
        main.appendChild(element);
    })

}

formatMoney=(number)=>{
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}


//EventListeners

addUserBtn.addEventListener('click',getRandomUser)
doubleBtn.addEventListener('click',doubleMoney)
sortBtn.addEventListener('click',sortByWealth)
showMillionairesBtn.addEventListener('click', filterMillionaires)
calculateWealthBtn.addEventListener('click',calculateWealth)
