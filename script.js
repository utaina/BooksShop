fetch('./books.json') 
        .then(response => {
            return response.json();
        })
        .then(data => {
            generateBooks(data);
        });



let pageLayout = document.createDocumentFragment();
let header = document.createElement('header');
    let shopName = document.createElement('h1');
        shopName.innerHTML = 'Black Books';
    let moto = document.createElement('p')
        moto.innerHTML = 'No mobiles! No walkmans! None of that! Or any of the others!';
    header.append(shopName, moto);
    pageLayout.append(header);


let main = document.createElement('main');
    main.className = 'main';
    let bookListBlock = document.createElement('div');
        bookListBlock.className = 'bookListBlock';
    let orderBlock =  document.createElement('div');
        orderBlock.className = 'orderBlock';
    //order block
    let finalContainer = document.createElement('div');
    finalContainer.className = 'final-container';
    let total = document.createElement('div');
    total.innerHTML = 'Total: $0';
    total.className = 'totalSum';
    let formButton = document.createElement('a');
    formButton.innerHTML = 'Confirm order';
    formButton.href = './form/form.html';
    formButton.target = "_blank";
    formButton.className = 'confirm-button';
    finalContainer.append(total, formButton);
    orderBlock.append(finalContainer);
    let booksDocFrag = new DocumentFragment();
    main.append(bookListBlock, orderBlock);
    let overlay = document.createElement('div');
        overlay.id = 'overlay';
    pageLayout.append(main, overlay);
    document.body.append(pageLayout);
    
    function generateBooks(data) {
    data.forEach(element => {
        let bookCard = document.createElement('div');
            bookCard.className = 'book-card';
        let bookCover = document.createElement('img');
            bookCover.src = element.imageLink;
            bookCover.alt = 'book cover';
            bookCover.className = 'book-cover';
        let bookCardContent = document.createElement('div');
            bookCardContent.className = 'bookCardContent';
        let author = document.createElement('p');
            author.innerHTML = element.author;
        let bookName = document.createElement('h2');
            bookName.innerHTML = element.title;
        let price = document.createElement('p');
            price.innerHTML = '$ ' + element.price;
        let buttonBlock = document.createElement('div');
            buttonBlock.className = 'buttonBlock';
        let moreInfoButton = document.createElement('button');
            moreInfoButton.innerHTML = 'Show more';
            moreInfoButton.className = 'show-more';
        let addToBagButton = document.createElement('button');
            addToBagButton.innerHTML = 'Add to bag';
            addToBagButton.className = 'add-to-bag-button';
        let modalContainer = document.createElement('div');
            modalContainer.className = 'modal';
        let modalHeader = document.createElement('div');
            modalHeader.className = 'modal-header';
        let modalTittle = document.createElement('h3');
            modalTittle.innerHTML = element.title;
            modalTittle.className = 'modal-title';
        let modalCloseButton = document.createElement('button');
            modalCloseButton.className = 'modal-close-button';
            modalCloseButton.innerHTML = '&times;';
            modalCloseButton.setAttribute('data-modal-close-button', '');
        let modalDescription = document.createElement('p');
            modalDescription.innerHTML = element.description;
            modalDescription.className = 'modal-body';
        modalHeader.append(modalTittle, modalCloseButton);
        modalContainer.append(modalHeader, modalDescription);
        buttonBlock.append(moreInfoButton, addToBagButton);   
        bookCardContent.append(author, bookName, price, buttonBlock, modalContainer);
        bookCard.append(bookCover, bookCardContent);
        booksDocFrag.append(bookCard);
    })
    bookListBlock.append(booksDocFrag);
    addModalId();
    addButtonTarget();

    //pop-ups
    const showMoreButtons = document.querySelectorAll('[data-modal-target]');
    const closeButton = document.querySelectorAll('[data-modal-close-button]');
    const overLay = document.getElementById('overlay');

    showMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            let modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        })
    })
    closeButton.forEach(button => {
        button.addEventListener('click', () => {
            let modal = button.closest('.modal');
            closeModal(modal);
        })
    })
    overLay.addEventListener('click', () => {
        let modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal)
        })
    });

    //bag
    
    (function() {
    const addButtons = document.querySelectorAll('.add-to-bag-button');
        
    addButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            let book = button.closest('.book-card');
            let addBookContainer = book.cloneNode(true);
            let buttons = addBookContainer.lastElementChild.children[3];
            let modal = addBookContainer.lastElementChild.children[4];
            let price = addBookContainer.lastElementChild.children[2].innerHTML;
            let finalPrice = price.slice(1).trim()
            let deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = '&times;';
            deleteButton.addEventListener('click', (event) => {
                console.log(event.target);
                let card = event.target.parentElement;
                console.log(card)
                card.remove();
                let priceDel = addBookContainer.children[1].lastElementChild.innerHTML;
                let finalPriceDel = priceDel.slice(1).trim()
                console.log(finalPriceDel);
                let sum = document.querySelector('.totalSum').innerHTML;
                let finalSum = sum.slice(8);
                sum = finalSum - finalPriceDel;
                document.querySelector('.totalSum').innerHTML = 'Total: $' + sum;
            })
            buttons.remove();
            modal.remove();
            addBookContainer.append(deleteButton);
            orderBlock.prepend(addBookContainer);
            let sum = document.querySelector('.totalSum').innerHTML;
            let finalSum = sum.slice(8);
            sum = +finalSum + +finalPrice;
            document.querySelector('.totalSum').innerHTML = 'Total: $' + sum;
            console.log(sum)
        })
    })
})();



}





function addModalId() {
    let modal = document.getElementsByClassName("modal"); 
        for (let i = 0; i < modal.length; i++) {
            modal[i].id = "modal-" + (i + 1);
    }
};
function addButtonTarget() {
    let buttons = document.getElementsByClassName("show-more"); 
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].dataset.modalTarget = "#modal-" + (i + 1);
    }
};
function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active')
}
function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active')
    overlay.classList.remove('active')
}







    





