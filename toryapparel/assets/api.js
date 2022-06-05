let swiperWrapper = document.querySelector('.swiper-wrapper')
let autoWidth = document.querySelector('#autoWidth')
let product = document.querySelector('#product')
fetch('https://fakestoreapi.com/products/category/jewelery')
            .then(res=>res.json())
            .then(jewelry => {
                jewelry.map((item) => {
                        swiperWrapper.innerHTML += `
                        <div class="swiper-slide">
                        <div class="img">
                            <div class="image">
                            <img src="${item.image}" alt="Hero image">
                            </div>
                        </div>
                        <div class="txt">
                            <h4>Get 50% off all jewelry purchases this month</h4>
                            <p>${item.description.substr(0,100)}...</p>
                            <button>Get Offer</button>
                        </div>
                    </div>
                            `
                        })
                })
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(files => {
                files.map((item) => {
                    autoWidth.innerHTML += `
                        <div class="box">
              <div class="slide-img">
                            <img src="${item.image}" alt="Hero image">
              </div>
              <div class="detail-box">
                <p>${item.title.substr(0,30)}...</p>
                <p>$ ${item.price}</p>                    
              </div>
            </div>
                            `
                        })
                })
fetch('https://fakestoreapi.com/products?sort=desc')
            .then(res=>res.json())
            .then(json => {
                json.map((item) => {
                    product.innerHTML += `
                        <div class="box">
              <div class="slide-img">
                            <img src="${item.image}" alt="Hero image">
              </div>
              <div class="detail-box">
                <p>${item.title.substr(0,30)}...</p>
                <p>$ ${item.price}</p>                    
              </div>
            </div>
                            `
                        })
                })