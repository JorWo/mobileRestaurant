function finalizeOrder() {
    localStorage.clear();
}

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var mydata = JSON.parse(this.responseText);
        var bevIds = JSON.parse(localStorage.getItem("bevIds"));
        var apeIds = JSON.parse(localStorage.getItem("apeIds"));

        var bevAmount = JSON.parse(localStorage.getItem("bevQty"));
        var apeAmount = JSON.parse(localStorage.getItem("apeQty"));

        var bevTotalPrice = 0;
        var apeTotalPrice = 0;

        //Load beverages into cart
        for (var i=0; i<bevIds.length; i++) {
            var objTo1 = document.getElementById("cartItems");
            var itemBox = document.createElement("div");
            itemBox.setAttribute("class","cartItemBox");
            objTo1.appendChild(itemBox);

            var objTo2 = document.getElementsByClassName("cartItemBox")[i];
            var itemImage = document.createElement("img");
            itemImage.src = mydata.beverages[bevIds[i]].image;
            itemImage.setAttribute("class","cartItemPic");
            itemImage.setAttribute("width","100%");
            objTo2.appendChild(itemImage);

            var nameAndPriceCont = document.createElement("div");
            nameAndPriceCont.setAttribute("id","cartItemNameAndPrice");
            var objTo3 = objTo2.appendChild(nameAndPriceCont);

            var itemName = document.createElement("p");
            var itemNameNode = document.createTextNode(mydata.beverages[bevIds[i]].name);
            itemName.appendChild(itemNameNode);
            itemName.setAttribute("class","cartItemName");
            objTo3.appendChild(itemName);
            
            var itemPrice = document.createElement("p");
            var itemPriceNode = document.createTextNode("$"+mydata.beverages[bevIds[i]].price.toFixed(2));
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
            var itemQtyNode = document.createTextNode(localStorage.getItem("bevQty"+bevIds[i]));
            itemQty.appendChild(itemQtyNode);
            itemQty.setAttribute("class","cartQty");
            objTo4.appendChild(itemQty);

            var add = document.createElement("div");
            add.setAttribute("class","cartAdd");
            objTo4.appendChild(add);
            var addSym = document.createTextNode("+");
            add.appendChild(addSym);

            var itemTotalPrice = document.createElement("p");
            var itemTotalPriceNode = document.createTextNode("$"+(localStorage.getItem("bevQty"+bevIds[i])*mydata.beverages[bevIds[i]].price).toFixed(2));
            itemTotalPrice.appendChild(itemTotalPriceNode);
            itemTotalPrice.setAttribute("class","itemTotalPrice");
            objTo4.appendChild(itemTotalPrice);

            bevTotalPrice += localStorage.getItem("bevQty"+bevIds[i])*mydata.beverages[bevIds[i]].price;
            document.getElementById("cartTotal").innerHTML = "$"+(bevTotalPrice + apeTotalPrice).toFixed(2);
        } 
        
        //Load appetizers into cart
        for (var i=0; i<apeIds.length; i++) {
            var objTo1 = document.getElementById("cartItems");
            var itemBox = document.createElement("div");
            itemBox.setAttribute("class","cartItemBox");
            objTo1.appendChild(itemBox);

            var objTo2 = document.getElementsByClassName("cartItemBox")[i+bevIds.length];
            var itemImage = document.createElement("img");
            itemImage.src = mydata.appetizers[apeIds[i]].image;
            itemImage.setAttribute("class","cartItemPic");
            itemImage.setAttribute("width","100%");
            objTo2.appendChild(itemImage);

            var nameAndPriceCont = document.createElement("div");
            nameAndPriceCont.setAttribute("id","cartItemNameAndPrice");
            var objTo3 = objTo2.appendChild(nameAndPriceCont);

            var itemName = document.createElement("p");
            var itemNameNode = document.createTextNode(mydata.appetizers[apeIds[i]].name);
            itemName.appendChild(itemNameNode);
            itemName.setAttribute("class","cartItemName");
            objTo3.appendChild(itemName);
            
            var itemPrice = document.createElement("p");
            var itemPriceNode = document.createTextNode("$"+mydata.appetizers[apeIds[i]].price.toFixed(2));
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
            var itemQtyNode = document.createTextNode(localStorage.getItem("apeQty"+apeIds[i]));
            itemQty.appendChild(itemQtyNode);
            itemQty.setAttribute("class","cartQty");
            objTo4.appendChild(itemQty);

            var add = document.createElement("div");
            add.setAttribute("class","cartAdd");
            objTo4.appendChild(add);
            var addSym = document.createTextNode("+");
            add.appendChild(addSym);

            var itemTotalPrice = document.createElement("p");
            var itemTotalPriceNode = document.createTextNode("$"+(localStorage.getItem("apeQty"+apeIds[i])*mydata.appetizers[apeIds[i]].price).toFixed(2));
            itemTotalPrice.appendChild(itemTotalPriceNode);
            itemTotalPrice.setAttribute("class","itemTotalPrice");
            objTo4.appendChild(itemTotalPrice);

            apeTotalPrice += localStorage.getItem("apeQty"+apeIds[i])*mydata.appetizers[apeIds[i]].price;
            document.getElementById("cartTotal").innerHTML = "$"+(bevTotalPrice + apeTotalPrice).toFixed(2);
        } 
    }
}
xmlhttp.open("GET","items.json",true);
xmlhttp.send();

