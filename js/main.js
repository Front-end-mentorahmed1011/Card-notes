// dom elements 

const addCardBtn = document.getElementById('addCard')
const container = document.getElementById('container')
const modal = document.getElementById('modal')
const errorMessage = document.getElementById('errorMessage')
const closeModalBtn = document.getElementById("closeModal")
const titleInput = document.getElementById('title')
const answerInput = document.getElementById('answer')
const modalBtn = document.getElementById('modalBtn')
const styleSection =document.querySelector(".sectionStyle")
const designTogglerBtn = document.getElementById("designToggler")

const iconShuffle = `<i class="fa-solid fa-shuffle"></i>`
const iconOrganized = `<i class="fa-solid fa-table-columns"></i>`

designTogglerBtn.addEventListener("click" , ()=> {
    if(designTogglerBtn.innerHTML === iconShuffle){
        designTogglerBtn.innerHTML = iconOrganized
    } else if(designTogglerBtn.innerHTML === iconOrganized){
        designTogglerBtn.innerHTML = iconShuffle
    }
    loadAndRefreshCards()
})

if(localStorage.length < 1){
    localStorage.setItem("cards" , JSON.stringify([]))
}

window.onload = ()=>{
    const data  =  getCards()
    if(data !== null){
        loadAndRefreshCards()
    }
}



function showModal(){
    container.classList.add('none')
    addCardBtn.classList.add('none')
    modal.classList.remove('none')
}

function closeModal(){
    handleUpdate(null)
    modal.classList.add('none')
    container.classList.remove('none')
    addCardBtn.classList.remove('none')
    if(!errorMessage.classList.contains("v-none")){
        errorMessage.classList.add("v-none") 
    }
    titleInput.value = ''
    answerInput.value = ''
}

function updateData(object){
    localStorage.setItem("cards" , JSON.stringify(object))
}


var globalId ;

function handleUpdate(id){
    let currentId = id
    return globalId = currentId || undefined
}

function saveCard(){
    if(titleInput.value.trim() === '' || answerInput.value.trim() === ''){
        errorMessage.classList.remove("v-none")
    }else{
        if(globalId){
            const cards = getCards()
            const cardindex = cards.findIndex((e)=>
                e.id === globalId
            )
            const card = cards[cardindex]
            if(titleInput.value.trim() === card.question && answerInput.value.trim() === card.answer){
                alert("Cannot update same data")
            }else{
                
                card.question = titleInput.value.trim()
                card.answer = answerInput.value.trim()
                console.log(card)
                cards[cardindex] = card
                // console.log(card[cardindex])
                titleInput.value = ''
                answerInput.value = ''
                updateData(cards)
                closeModal()
                loadAndRefreshCards()
                handleUpdate(null)
            }
        } else{
            const cards = getCards() || []
            let notExisted = true
            cards.forEach((card)=>{
                if(titleInput.value.trim() === card.question && answerInput.value.trim() === card.answer){
                    notExisted = false
                }
            })
            if(notExisted){
                let product = {}
            product.question = titleInput.value.trim()
            product.answer = answerInput.value.trim()
            product.id = cards.length + 1
            
            titleInput.value = ''
            answerInput.value = ''

            cards.push(product)
            updateData(cards)
            closeModal()
            loadAndRefreshCards()
            }
            else{
                alert("Card is already existed")
            }
        }
    }
}

function getCards(){
    let cardObjects = JSON.parse(localStorage.getItem("cards"))

    return cardObjects
}


function loadAndRefreshCards(){
    const cards = getCards()
    if(cards.length > 0){
       styleSection.classList.remove("none")
    }else{
        styleSection.classList.add("none")
    }
    const allproducts = []
    let includedShuffle = true
    if(designTogglerBtn.innerHTML === iconShuffle){
        includedShuffle = false
    }
      cards.forEach((item) => {
        allproducts.push(
        `
        <div class="card ${includedShuffle ? "random" : "organized"}">
            <h3>${item.question}</h3>
            <span class="none span" value="${item.id}">${item.answer}</span>
            <button class="mainBtn" onclick="showAndHide(${item.id})">Show/Hide</button>
            <div class="edits">
                <button class="edit" onclick="updateCard(${item.id})"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="remove" onclick="removeCard(${item.id})"><i class="fa-solid fa-trash "></i></button>
            </div>
        </div>
        `)
    })
    container.innerHTML = allproducts.join('')

}



function updateCard(id){
    const cards = getCards()
    const cardindex = cards.findIndex((e) => e.id === id)
    
    const card = cards[cardindex] 
    titleInput.value = card.question
    answerInput.value = card.answer
    showModal()
    handleUpdate(id)
}

function removeCard(id){
    const cards = getCards()
    const cardindex = cards.findIndex((e) => e.id === id)
    cards.splice(cardindex , 1)
    cards.forEach((card, index) => {
        card.id = index + 1; // IDs start from 1
    });
    updateData(cards)
    loadAndRefreshCards()
}

function showAndHide(id){
    const span =  document.querySelector(`[value="${id}"]`)
    span.classList.toggle("none")
}

// function updateCard(){
//     const cards = getCards()
    
// }









