let nav = document.querySelector('.nav')
let ham = document.querySelector('.ham')
let fc = document.querySelector('.fc')
let c = document.querySelector('.c')
let cl = document.querySelector('.cl')
let cc = document.querySelector('.cc')
let f = document.querySelector('.f')

ham.addEventListener('click', function () {
    nav.classList.toggle('d-none')
    ham.classList.toggle('cl')
})
f.addEventListener('click', function () {
    fc.classList.toggle('d-none')
})
c.addEventListener('click', function () {
    cc.classList.toggle('d-none')
})

