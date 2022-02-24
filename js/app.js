const main = document.getElementById('main');
const loadCard = () => {
    const error = document.getElementById('error');
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    // Validation 
    if (isNaN(inputValue) || inputValue == '') {
        error.innerText = "Please Give a number!";
        inputField.value = '';
        main.innerHTML = "";
    } else if (inputValue <= 0) {
        error.innerText = "Please Give a positive number!";
        inputField.value = '';
        main.innerHTML = "";
    } else if (inputValue > 50) {
        error.innerText = "You cannot give value more than 50!";
        inputField.value = '';
        main.innerHTML = "";
    } else {
        // Load Card
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
            .then(res => res.json())
            .then(data => displayCards(data.cards));
        inputField.value = '';
        error.innerHTML = '';
    }
}

const displayCards = (cards) => {
    main.innerHTML = '';
    cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'col-md-3';
        div.innerHTML = `
            <div class="card h-100">
                <img src="${card.image}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${card.suit}</h5>
                    <p class="card-text">${card.code}</p>
                    <button onclick="showDetail('${card.code}')" class="btn btn-primary" >Show Detail</button>
                </div>
            </div>
        `
        main.appendChild(div)
    });
}

const showDetail = (code) => {
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=50`)
        .then(res => res.json())
        .then(data => {
            main.innerHTML = '';
            const allCards = data.cards;
            const singleCard = allCards.find(card => card.code === code)
            const div = document.createElement('div');
            div.className = 'col-md-3';
            div.innerHTML = `
            <div class="card h-100">
                <img src="${singleCard.image}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${singleCard.suit}</h5>
                    <p class="card-text">${singleCard.code}</p>
                    <p class="card-text">${singleCard.value}</p>
                </div>
            </div>
        `
            main.appendChild(div)
        })
}