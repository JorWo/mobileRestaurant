function finalizeOrder() {
    if (localStorage.length !== 0) {
    document.getElementById("makeOrderButton").innerHTML = "Order Received ✓"
    localStorage.clear();
    }
}

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var mydata = JSON.parse(this.responseText);
        var bevIds = JSON.parse(localStorage.getItem("bevIds")) || [];
        var apeIds = JSON.parse(localStorage.getItem("apeIds")) || [];
        var entIds = JSON.parse(localStorage.getItem("entIds")) || [];

        var bevAmount = JSON.parse(localStorage.getItem("bevQty")) || [];
        var apeAmount = JSON.parse(localStorage.getItem("apeQty")) || [];
        var entAmount = JSON.parse(localStorage.getItem("entQty")) || [];

        var bevTotalPrice = 0;
        var apeTotalPrice = 0;
        var entTotalPrice = 0;

        window.showTotal = function showTotal() {
            document.getElementById("cartTotal").innerHTML = "$"+(bevTotalPrice + apeTotalPrice + entTotalPrice).toFixed(2);
        }

        window.addBevAmount = function addBevAmount(x) {
            bevAmount[bevIds[x]]++;
            document.getElementsByClassName("cartQty")[x].innerHTML = bevAmount[bevIds[x]];
            localStorage.setItem("bevQty",JSON.stringify(bevAmount));
            bevTotalPrice += mydata.beverages[bevIds[x]].price;
            document.getElementsByClassName("itemTotalPrice")[x].innerHTML = "$"+(bevAmount[bevIds[x]]*mydata.beverages[bevIds[x]].price).toFixed(2);
            showTotal();
        }
        window.minusBevAmount = function minusBevAmount(x) {
            if (bevAmount[bevIds[x]] !== 0) {
                bevAmount[bevIds[x]]--;
                document.getElementsByClassName("cartQty")[x].innerHTML = bevAmount[bevIds[x]];
                localStorage.setItem("bevQty",JSON.stringify(bevAmount));
                bevTotalPrice -= mydata.beverages[bevIds[x]].price;
                document.getElementsByClassName("itemTotalPrice")[x].innerHTML = "$"+(bevAmount[bevIds[x]]*mydata.beverages[bevIds[x]].price).toFixed(2);
                showTotal();
            }
            else if (bevAmount[bevIds[x]] <= 0) {
                document.getElementById("cartItems").removeChild(document.getElementsByClassName("cartItemBox")[x]);
                bevIds.splice(bevIds.indexOf(bevIds[x]),1);
                localStorage.setItem("bevIds",JSON.stringify(bevIds));
                localStorage.setItem("bevQty",JSON.stringify(bevAmount));
                for (var i=0;i<bevIds.length;i++) {
                    document.getElementsByClassName("cartMinus")[i].setAttribute("onclick","minusBevAmount("+i+")");
                }
            }
        }
        window.addApeAmount = function addApeAmount(x) {
            apeAmount[apeIds[x]]++;
            document.getElementsByClassName("cartQty")[x+bevIds.length].innerHTML = apeAmount[apeIds[x]];
            localStorage.setItem("apeQty",JSON.stringify(apeAmount));
            apeTotalPrice += mydata.appetizers[apeIds[x]].price;
            document.getElementsByClassName("itemTotalPrice")[x+bevIds.length].innerHTML = "$"+(apeAmount[apeIds[x]]*mydata.appetizers[apeIds[x]].price).toFixed(2);
            showTotal();
        }
        window.minusApeAmount = function minusApeAmount(x) {
            if (apeAmount[apeIds[x]] !== 0) {
                apeAmount[apeIds[x]]--;
                document.getElementsByClassName("cartQty")[x+bevIds.length].innerHTML = apeAmount[apeIds[x]];
                localStorage.setItem("apeQty",JSON.stringify(apeAmount));
                apeTotalPrice -= mydata.appetizers[apeIds[x]].price;
                document.getElementsByClassName("itemTotalPrice")[x+bevIds.length].innerHTML = "$"+(apeAmount[apeIds[x]]*mydata.appetizers[apeIds[x]].price).toFixed(2);
                showTotal();
            }
            else if (apeAmount[apeIds[x]] <= 0) {
                document.getElementById("cartItems").removeChild(document.getElementsByClassName("cartItemBox")[x+bevIds.length]);
                apeIds.splice(apeIds.indexOf(apeIds[x]),1);
                localStorage.setItem("apeIds",JSON.stringify(apeIds));
                localStorage.setItem("apeQty",JSON.stringify(apeAmount));
                for (var i=0;i<apeIds.length;i++) {
                    document.getElementsByClassName("cartMinus")[i+bevIds.length].setAttribute("onclick","minusApeAmount("+i+")");
                }
            }
        }
        window.addEntAmount = function addEntAmount(x) {
            entAmount[entIds[x]]++;
            document.getElementsByClassName("cartQty")[x+bevIds.length+apeIds.length].innerHTML = entAmount[entIds[x]];
            localStorage.setItem("entQty",JSON.stringify(entAmount));
            entTotalPrice += mydata.entrees[entIds[x]].price;
            document.getElementsByClassName("itemTotalPrice")[x+bevIds.length+apeIds.length].innerHTML = "$"+(entAmount[entIds[x]]*mydata.entrees[entIds[x]].price).toFixed(2);
            showTotal();
        }
        window.minusEntAmount = function minusEntAmount(x) {
            if (entAmount[entIds[x]] !== 0) {
                entAmount[entIds[x]]--;
                document.getElementsByClassName("cartQty")[x+bevIds.length+apeIds.length].innerHTML = entAmount[entIds[x]];
                localStorage.setItem("entQty",JSON.stringify(entAmount));
                entTotalPrice -= mydata.entrees[entIds[x]].price;
                document.getElementsByClassName("itemTotalPrice")[x+bevIds.length+apeIds.length].innerHTML = "$"+(entAmount[entIds[x]]*mydata.entrees[entIds[x]].price).toFixed(2);
                showTotal();
            }
            else if (entAmount[entIds[x]] <= 0) {
                document.getElementById("cartItems").removeChild(document.getElementsByClassName("cartItemBox")[x+bevIds.length+apeIds.length]);
                entIds.splice(entIds.indexOf(entIds[x]),1);
                localStorage.setItem("entIds",JSON.stringify(entIds));
                localStorage.setItem("entQty",JSON.stringify(entAmount));
                for (var i=0;i<entIds.length;i++) {
                    document.getElementsByClassName("cartMinus")[i+bevIds.length+apeIds.length].setAttribute("onclick","minusEntAmount("+i+")");
                }
            }
        }

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
            minus.setAttribute("onclick","minusBevAmount("+i+")");
            minus.appendChild(minusSym);

            var itemQty = document.createElement("p");
            var itemQtyNode = document.createTextNode(bevAmount[bevIds[i]]);
            itemQty.appendChild(itemQtyNode);
            itemQty.setAttribute("class","cartQty");
            objTo4.appendChild(itemQty);

            var add = document.createElement("div");
            add.setAttribute("class","cartAdd");
            objTo4.appendChild(add);
            var addSym = document.createTextNode("+");
            add.setAttribute("onclick","addBevAmount("+i+")");
            add.appendChild(addSym);

            var itemTotalPrice = document.createElement("p");
            var itemTotalPriceNode = document.createTextNode("$"+(bevAmount[bevIds[i]]*mydata.beverages[bevIds[i]].price).toFixed(2));
            itemTotalPrice.appendChild(itemTotalPriceNode);
            itemTotalPrice.setAttribute("class","itemTotalPrice");
            objTo4.appendChild(itemTotalPrice);

            bevTotalPrice += bevAmount[bevIds[i]]*mydata.beverages[bevIds[i]].price;
            showTotal();
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
            minus.setAttribute("onclick","minusApeAmount("+i+")");
            minus.appendChild(minusSym);

            var itemQty = document.createElement("p");
            var itemQtyNode = document.createTextNode(apeAmount[apeIds[i]]);
            itemQty.appendChild(itemQtyNode);
            itemQty.setAttribute("class","cartQty");
            objTo4.appendChild(itemQty);

            var add = document.createElement("div");
            add.setAttribute("class","cartAdd");
            objTo4.appendChild(add);
            var addSym = document.createTextNode("+");
            add.setAttribute("onclick","addApeAmount("+i+")");
            add.appendChild(addSym);

            var itemTotalPrice = document.createElement("p");
            var itemTotalPriceNode = document.createTextNode("$"+(apeAmount[apeIds[i]]*mydata.appetizers[apeIds[i]].price).toFixed(2));
            itemTotalPrice.appendChild(itemTotalPriceNode);
            itemTotalPrice.setAttribute("class","itemTotalPrice");
            objTo4.appendChild(itemTotalPrice);

            apeTotalPrice += apeAmount[apeIds[i]]*mydata.appetizers[apeIds[i]].price;
            showTotal();
        } 

        //Load entrees into cart
        for (var i=0; i<entIds.length; i++) {
            var objTo1 = document.getElementById("cartItems");
            var itemBox = document.createElement("div");
            itemBox.setAttribute("class","cartItemBox");
            objTo1.appendChild(itemBox);

            var objTo2 = document.getElementsByClassName("cartItemBox")[i+bevIds.length+apeIds.length];
            var itemImage = document.createElement("img");
            itemImage.src = mydata.entrees[entIds[i]].image;
            itemImage.setAttribute("class","cartItemPic");
            itemImage.setAttribute("width","100%");
            objTo2.appendChild(itemImage);

            var nameAndPriceCont = document.createElement("div");
            nameAndPriceCont.setAttribute("id","cartItemNameAndPrice");
            var objTo3 = objTo2.appendChild(nameAndPriceCont);

            var itemName = document.createElement("p");
            var itemNameNode = document.createTextNode(mydata.entrees[entIds[i]].name);
            itemName.appendChild(itemNameNode);
            itemName.setAttribute("class","cartItemName");
            objTo3.appendChild(itemName);
            
            var itemPrice = document.createElement("p");
            var itemPriceNode = document.createTextNode("$"+mydata.entrees[entIds[i]].price.toFixed(2));
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
            minus.setAttribute("onclick","minusEntAmount("+i+")");
            minus.appendChild(minusSym);

            var itemQty = document.createElement("p");
            var itemQtyNode = document.createTextNode(entAmount[entIds[i]]);
            itemQty.appendChild(itemQtyNode);
            itemQty.setAttribute("class","cartQty");
            objTo4.appendChild(itemQty);

            var add = document.createElement("div");
            add.setAttribute("class","cartAdd");
            objTo4.appendChild(add);
            var addSym = document.createTextNode("+");
            add.setAttribute("onclick","addEntAmount("+i+")");
            add.appendChild(addSym);

            var itemTotalPrice = document.createElement("p");
            var itemTotalPriceNode = document.createTextNode("$"+(entAmount[entIds[i]]*mydata.entrees[entIds[i]].price).toFixed(2));
            itemTotalPrice.appendChild(itemTotalPriceNode);
            itemTotalPrice.setAttribute("class","itemTotalPrice");
            objTo4.appendChild(itemTotalPrice);

            entTotalPrice += entAmount[entIds[i]]*mydata.entrees[entIds[i]].price;
            showTotal();
        } 
    }
}
xmlhttp.open("GET","items.json",true);
xmlhttp.send();

