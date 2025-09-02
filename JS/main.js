document.addEventListener("DOMContentLoaded", function () {
  // page register
  var register_btn = document.getElementById("register-btn");

  if (register_btn) {
      register_btn.addEventListener("click", function (event) {
         event.preventDefault();

         var FN_register = document.getElementById("FN_register").value;
         var LN_register = document.getElementById("LN_register").value;
         var email_register = document.getElementById("email_register").value;
         var password_register = document.getElementById("password_register").value;
         var confirm_password_register = document.getElementById("confirm_password_register").value;

         if (!FN_register || !LN_register || !email_register || !password_register || !confirm_password_register) {
            alert("Invalid data, please enter correct data!");
         } 
         else if (password_register !== confirm_password_register) {
            alert("Please confirm password correctly!");
         } 
         else {
            localStorage.setItem("name" , FN_register)
            localStorage.setItem("email", email_register);
            localStorage.setItem("password", password_register);

            alert('Account created successfully!');
            window.location.href = "login.html";
         }
      });
  }

  // start page login
  var login_btn = document.getElementById("login-btn");

  if (login_btn) {
      login_btn.addEventListener("click", function (event) {
         event.preventDefault();

         var email_login = document.getElementById("email-login").value;
         var password_login = document.getElementById("password-login").value;

         if (!email_login || !password_login) {
            alert("Please enter data!");
            } 
         else {
            var savedEmail = localStorage.getItem("email");
            var savedPassword = localStorage.getItem("password");

            if (email_login === savedEmail && password_login === savedPassword) {
               alert("Login is success");
               window.location.href = "loggedin.html";
            } else {
               alert("Invalid email or password! " ); 
            }
         }
      });
   }

   var Loggedin_hello = document.querySelector("#Loggedin-hello");
   var savedName = localStorage.getItem("name");
   if (Loggedin_hello) {
      Loggedin_hello.innerHTML = "hello, " + savedName;
   }


   // start function search 

   var search_btn = document.getElementById("search-btn")

      search_btn.addEventListener("click" , function(){

         var searchType = document.getElementById("searchType").value;
         var searchBox = document.getElementById("search-box").value.toLowerCase();

         let cards = document.querySelectorAll(".card")
         

         if(searchType === "name"){
            cards.forEach(function(item){
               let name = item.querySelector(".card-title").getAttribute("name").toLowerCase();
               if(name.includes(searchBox)){
                  item.style.display = "";
               }
               else{
                  item.style.display = "none";
               }

               
            })
         }
         else{
            cards.forEach(function(item){
               var category = item.querySelector(".category").getAttribute("category").toLowerCase();
               if(category.includes(searchBox)){
                  item.style.display = "";
               }
               else{
                  item.style.display = "none";
               }
            })
         }

      })

      
// toggle_cart

      
      var cards = document.querySelectorAll(".card");
var toggle_cart = document.getElementById("toggle_cart");
var totalPrice = document.getElementById("totalPrice")
var show = document.getElementById("show")
var cart_num = document.getElementById("cart_num")
var shopping = document.getElementById("shopping")

function updateTotalPrice(){ 

   let total =0
   let products = toggle_cart.querySelectorAll(".cart-product")
   products.forEach(function(item){
      let count = parseInt(item.querySelector(".qty").dataset.count)
      let price = parseFloat(item.querySelector("p").textContent.replace("price:","").replace("$",""));

      total += count * price
   })

   totalPrice.classList.remove("d-none")
   totalPrice.classList.add("d-block")
   if(total === 0){
      totalPrice.innerHTML = "Cart is empty";
      totalPrice.classList.remove("bg-success")
      totalPrice.classList.add("bg-light")
      
   }
   else{
      totalPrice.innerHTML = "TotalePrice: $" + total;
      totalPrice.classList.remove("bg-light")
      totalPrice.classList.add("bg-success")
   }
}

function updateCartNum(){ 

   var num = 0;
   let products = toggle_cart.querySelectorAll(".cart-product")
   products.forEach(function(item){
      let count = parseInt(item.querySelector(".qty").dataset.count)
      num += count 
   })
   cart_num.innerHTML =  num;
}



cards.forEach(function(item) {
  let btn = item.querySelector(".add-cart");
  let name = item.querySelector(".card-title").getAttribute("name");
  let price = item.querySelector(".price").getAttribute("price");
  var favorite = item.querySelector(".favoirte")

  favorite.addEventListener("click" , function(){
      
         favorite.classList.toggle("text-dark")
         favorite.classList.toggle("text-danger")
   
   })

   shopping.addEventListener("click" , function(){
      show.classList.toggle("d-none")
      show.classList.toggle("d-block")
})

  btn.addEventListener("click", function(event) {
    event.preventDefault();

   var existingProduct = toggle_cart.querySelector(`[data-name="${name}"]`);
   
   if (existingProduct) {
         existingProduct.remove();
         btn.classList.remove("btn-danger")
         btn.classList.add("btn-primary")
         btn.innerHTML = "Add to cart";
         updateTotalPrice()
         updateCartNum()

         
   }
    // شوف لو المنتج موجود بالفعل

   //  else if (existingProduct) {
   //    // لو موجود → زود العدد
   //    let qtySpan = existingProduct.querySelector(".qty");
   //    let currentCount = parseInt(qtySpan.dataset.count);
   //    qtySpan.dataset.count = currentCount + 1;
   //    qtySpan.textContent = currentCount + 1;
   //  }
     
   else {
      // لو مش موجود → أضفه لأول مرة
      const productCard = document.createElement("div");
      productCard.classList.add("p-2", "mb-1", "cart-product");
      productCard.style.borderRadius = "8px";
      productCard.style.backgroundColor = "rgb(205, 204, 204)";
      productCard.setAttribute("data-name", name);
      btn.classList.remove("btn-primary")
      btn.classList.add("btn-danger")
      btn.innerHTML = "Remove from cart"
      

      productCard.innerHTML = `
      <div class="d-flex justify-content-between" data-name="${name}" style="width: 10rem;">
         <h5 class="w-50 name">${name}</h5>
         <p class="w-50 ml-4">price: <br> ${price}$</p>
      </div>

      <div>
         <button class=" btn-minus" style="font-size: 20px; width:20px; border-radius:5px;   ">-</button>
         <span class="qty" data-count="1">1</span>
         <button class="btn-plus" style="font-size: 20px; width:20px; border-radius:5px;">+</button>
      </div>
      `;
         
      toggle_cart.appendChild(productCard);

   


      // زرار + / -
      let minusBtn = productCard.querySelector(".btn-minus");
      let plusBtn = productCard.querySelector(".btn-plus");
      let qtySpan = productCard.querySelector(".qty");

      plusBtn.addEventListener("click", function() {
        let currentCount = parseInt(qtySpan.dataset.count);
        qtySpan.dataset.count = currentCount + 1;
        qtySpan.textContent = currentCount + 1;
        updateTotalPrice()
         updateCartNum()
        
      });

      minusBtn.addEventListener("click", function() {
        let currentCount = parseInt(qtySpan.dataset.count);
        if (currentCount > 1) {
          qtySpan.dataset.count = currentCount - 1;
          qtySpan.textContent = currentCount - 1;
        } else {
            productCard.remove(); // لو العدد وصل 0 → امسح المنتج
            btn.classList.remove("btn-danger") 
            btn.classList.add("btn-primary") 
            btn.innerHTML="Add to cart"
            
         }
        updateTotalPrice()
        updateCartNum()
      });

       updateTotalPrice()
       updateCartNum()

   }

  });
});







   

   
   














     



   
 
});



