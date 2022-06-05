//      == mobile toggle ==
let ham = document.querySelector('.ham')
let hamx = document.querySelector('.hamx')
let x = document.querySelector('#x')
let search = document.querySelector('.bx-search-alt')
let mobileMenu = document.querySelector('.mobile_menu')
let srch = document.querySelector('.srch')
ham.addEventListener('click', ()=> {
    mobileMenu.classList.remove('cls')
})
search.addEventListener('click', ()=> {
    srch.classList.remove('cls')
})
hamx.addEventListener('click', ()=> {
    mobileMenu.classList.add('cls')
})
x.addEventListener('click', ()=> {
    srch.classList.add('cls')
})
