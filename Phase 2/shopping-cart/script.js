var shopping_cart = [];
var cartSize = 0;
function addItemToCart(name, price) {
    cartSize++;
    var cartSizeNullCheck = document.getElementById("cart_size");
    if (cartSizeNullCheck === null) {
        console.log("Cart size is null.");
    }
    else {
        cartSizeNullCheck.innerHTML = "Cart Size: " + cartSize;
    }
    var newItem = {
        name: name,
        price: price
    };
    shopping_cart.push(newItem);
    localStorage.setItem("ItemsInCart", JSON.stringify(shopping_cart));
}
window.onload = function display() {
    localStorage.getItem("ItemsInCart");
    console.log("Session Storage ItemsInCart: " + localStorage.getItem("ItemsInCart"));
    var shoppingCartCheckout = JSON.parse(localStorage.getItem("ItemsInCart") || "[]");
    var total_price = 0;
    var tableContent = "";
    var startTable = "<table border=1><tr><th>Item Name </th><th>Price</th></tr>";
    shoppingCartCheckout.forEach(function (entry) {
        tableContent += "<tr><td>" + entry.name + "</td><td>" + entry.price + "</td></tr>";
        total_price += entry.price;
    });
    var endTable = "</table>";
    tableContent = startTable + tableContent + endTable;
    var checkout_table = document.getElementById("checkout_table");
    if (checkout_table === null) {
        console.log("var checkout_table is null.");
    }
    else {
        checkout_table.innerHTML = tableContent;
        checkout_table.innerHTML += "<br>" + "Total: $" + total_price;
    }
};
