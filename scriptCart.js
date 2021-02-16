var totalItemsInCart = (localStorage.length)-1;
console.log(totalItemsInCart);

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var mydata = JSON.parse(this.responseText);
        var itemIds = JSON.parse(localStorage.getItem("itemIds"));
        console.log(itemIds);
        
        for (var i=0; i<totalItemsInCart; i++) {
            var objTo1 = document.getElementById("cartItems");
            var itemBox = document.createElement("div");
            itemBox.setAttribute("class","cartItemBox");
            objTo1.appendChild(itemBox);

            var objTo2 = document.getElementsByClassName("cartItemBox")[i];
            var itemImage = document.createElement("img");
            itemImage.src = mydata.beverages[itemIds[i]].image;
            itemImage.setAttribute("class","cartItemPic");
            itemImage.setAttribute("width","100%");
            objTo2.appendChild(itemImage);

            var nameAndPriceCont = document.createElement("div");
            nameAndPriceCont.setAttribute("id","cartItemNameAndPrice");
            var objTo3 = objTo2.appendChild(nameAndPriceCont);

            var itemName = document.createElement("p");
            var itemNameNode = document.createTextNode(mydata.beverages[itemIds[i]].name);
            itemName.appendChild(itemNameNode);
            itemName.setAttribute("class","cartItemName");
            objTo3.appendChild(itemName);
            
            var itemPrice = document.createElement("p");
            var itemPriceNode = document.createTextNode("$"+mydata.beverages[itemIds[i]].price.toFixed(2));
            itemPrice.appendChild(itemPriceNode);
            itemPrice.setAttribute("class","cartItemPrice");
            objTo3.appendChild(itemPrice);
            
            var qtyCont = document.createElement("div");
            qtyCont.setAttribute("class","cartQtyCont");
            var objTo4 = objTo2.appendChild(qtyCont);

            var minus = document.createElement("div");
            minus.setAttribute("class","cartMinus");
            objTo4.appendChild(minus);
            var minusSym = document.createTextNode("-");
            minus.appendChild(minusSym);

            var itemQty = document.createElement("p");
            var itemQtyNode = document.createTextNode(localStorage.getItem("itemQty"+itemIds[i]));
            itemQty.appendChild(itemQtyNode);
            itemQty.setAttribute("class","cartQty");
            objTo4.appendChild(itemQty);

            var add = document.createElement("div");
            add.setAttribute("class","cartAdd");
            objTo4.appendChild(add);
            var addSym = document.createTextNode("+");
            add.appendChild(addSym);

            var itemTotalPrice = document.createElement("p");
            var itemTotalPriceNode = document.createTextNode("$"+(localStorage.getItem("itemQty"+itemIds[i])*mydata.beverages[itemIds[i]].price).toFixed(2));
            itemTotalPrice.appendChild(itemTotalPriceNode);
            itemTotalPrice.setAttribute("class","itemTotalPrice");
            objTo4.appendChild(itemTotalPrice);
        } 
    }
}
xmlhttp.open("GET","items.json",true);
xmlhttp.send();

function finalizeOrder() {
    localStorage.clear();
}