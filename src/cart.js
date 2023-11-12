
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);    
};

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemsData.find((y) => y.id == id  ) || [];  
                let {img, name, price} = search;            
                return `
            <div class="cart-item">
            <a href=${img}>
            <img width="100" src=${img} alt="">
            </a>
            <div class="details detail">
                <div class="title-price-x">
                      <h4 class="title-price">
                          <p>${name}</p>
                          <p class="cart-item-price">&#8377; ${price}</p>
                    </h4>
                      <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                </div>

                <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                 </div>

                <h3>&#8377; ${item * search.price}</h3>
            </div>
            </div>
            `
        }).join(""));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `<div class="getto">
        <a href="index.html">
            <button class="homeBtn"><i class="bi bi-caret-left"></i> Back to home</button>
        </a>
        <h2>Cart is Empty</h2>
        </div>
        <i class="bi bi-cart-x"></i> 
        `;
        
    }

};

generateCartItems();


let increment = (id) => {
    let search = basket.find((x) => x.id === id);
    if(search === undefined){
        basket.push({
            id:id,
            item:1,
        }); 
    } else {
        search.item += 1;
    }

    generateCartItems();
    update(id);

    localStorage.setItem("data", JSON.stringify(basket));
};


let decrement = (id) => {
    let search = basket.find((x) => x.id === id);

    if(search === undefined) return;
    if(search.item === 0) return;
     else {
        search.item -= 1;
    }

    update(id);
    basket = basket.filter((x) => x.item !== 0);

    generateCartItems();
    

    localStorage.setItem("data",JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};


let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let totalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id == id  ) || [];
            return item * search.price;
        }).reduce((x,y) => x + y, 0);
        label.innerHTML =`
        <h2 class="bill">Total Bill : &#8377; ${amount}</h2>
        <button class="checkout">Checkout</button> <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        ` 
    } else return;
};

totalAmount();