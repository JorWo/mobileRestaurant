var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var mydata = JSON.parse(this.responseText);
        var bevIds = JSON.parse(localStorage.getItem("bevIds")) || [];
        var apeIds = JSON.parse(localStorage.getItem("apeIds")) || [];
        var entIds = JSON.parse(localStorage.getItem("entIds")) || [];
        var desIds = JSON.parse(localStorage.getItem("desIds")) || [];

        var bevAmount = JSON.parse(localStorage.getItem("bevQty")) || [];
        var apeAmount = JSON.parse(localStorage.getItem("apeQty")) || [];
        var entAmount = JSON.parse(localStorage.getItem("entQty")) || [];
        var desAmount = JSON.parse(localStorage.getItem("desQty")) || [];

        var bevTotalPrice = 0;
        var apeTotalPrice = 0;
        var entTotalPrice = 0;
        var desTotalPrice = 0;

        var allCartItems = [];

        window.showTotal = function showTotal() {
            document.getElementById("subTotal").innerHTML = "$"+(bevTotalPrice + apeTotalPrice + entTotalPrice + desTotalPrice).toFixed(2);
            document.getElementById("cartTotal").innerHTML = "$"+((bevTotalPrice + apeTotalPrice + entTotalPrice + desTotalPrice)*1.04712).toFixed(2);
        }

        //Beverage modify quantity function
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
        //Appetizer modify quantity function
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
        //Entree modify quantity function
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
        //Dessert modify quantity function
        window.addDesAmount = function addDesAmount(x) {
            desAmount[desIds[x]]++;
            document.getElementsByClassName("cartQty")[x+bevIds.length+apeIds.length+entIds.length].innerHTML = desAmount[desIds[x]];
            localStorage.setItem("desQty",JSON.stringify(desAmount));
            desTotalPrice += mydata.desserts[desIds[x]].price;
            document.getElementsByClassName("itemTotalPrice")[x+bevIds.length+apeIds.length+entIds.length].innerHTML = "$"+(desAmount[desIds[x]]*mydata.desserts[desIds[x]].price).toFixed(2);
            showTotal();
        }
        window.minusDesAmount = function minusDesAmount(x) {
            if (desAmount[desIds[x]] !== 0) {
                desAmount[desIds[x]]--;
                document.getElementsByClassName("cartQty")[x+bevIds.length+apeIds.length+entIds.length].innerHTML = desAmount[desIds[x]];
                localStorage.setItem("desQty",JSON.stringify(desAmount));
                desTotalPrice -= mydata.desserts[desIds[x]].price;
                document.getElementsByClassName("itemTotalPrice")[x+bevIds.length+apeIds.length+entIds.length].innerHTML = "$"+(desAmount[desIds[x]]*mydata.desserts[desIds[x]].price).toFixed(2);
                showTotal();
            }
            else if (desAmount[desIds[x]] <= 0) {
                document.getElementById("cartItems").removeChild(document.getElementsByClassName("cartItemBox")[x+bevIds.length+apeIds.length+entIds.length]);
                desIds.splice(desIds.indexOf(desIds[x]),1);
                localStorage.setItem("desIds",JSON.stringify(desIds));
                localStorage.setItem("desQty",JSON.stringify(desAmount));
                for (var i=0;i<desIds.length;i++) {
                    document.getElementsByClassName("cartMinus")[i+bevIds.length+apeIds.length+entIds.length].setAttribute("onclick","minusDesAmount("+i+")");
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

            allCartItems.push(bevAmount[bevIds[i]] + " x " + mydata.beverages[bevIds[i]].name);
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

            allCartItems.push(apeAmount[apeIds[i]] + " x " + mydata.appetizers[apeIds[i]].name);
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

            allCartItems.push(entAmount[entIds[i]] + " x " + mydata.entrees[entIds[i]].name);
            entTotalPrice += entAmount[entIds[i]]*mydata.entrees[entIds[i]].price;
            showTotal();
        } 

        //Load desserts into cart
        for (var i=0; i<desIds.length; i++) {
            var objTo1 = document.getElementById("cartItems");
            var itemBox = document.createElement("div");
            itemBox.setAttribute("class","cartItemBox");
            objTo1.appendChild(itemBox);

            var objTo2 = document.getElementsByClassName("cartItemBox")[i+bevIds.length+apeIds.length+entIds.length];
            var itemImage = document.createElement("img");
            itemImage.src = mydata.desserts[desIds[i]].image;
            itemImage.setAttribute("class","cartItemPic");
            itemImage.setAttribute("width","100%");
            objTo2.appendChild(itemImage);

            var nameAndPriceCont = document.createElement("div");
            nameAndPriceCont.setAttribute("id","cartItemNameAndPrice");
            var objTo3 = objTo2.appendChild(nameAndPriceCont);

            var itemName = document.createElement("p");
            var itemNameNode = document.createTextNode(mydata.desserts[desIds[i]].name);
            itemName.appendChild(itemNameNode);
            itemName.setAttribute("class","cartItemName");
            objTo3.appendChild(itemName);
            
            var itemPrice = document.createElement("p");
            var itemPriceNode = document.createTextNode("$"+mydata.desserts[desIds[i]].price.toFixed(2));
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
            minus.setAttribute("onclick","minusDesAmount("+i+")");
            minus.appendChild(minusSym);

            var itemQty = document.createElement("p");
            var itemQtyNode = document.createTextNode(desAmount[desIds[i]]);
            itemQty.appendChild(itemQtyNode);
            itemQty.setAttribute("class","cartQty");
            objTo4.appendChild(itemQty);

            var add = document.createElement("div");
            add.setAttribute("class","cartAdd");
            objTo4.appendChild(add);
            var addSym = document.createTextNode("+");
            add.setAttribute("onclick","addDesAmount("+i+")");
            add.appendChild(addSym);

            var itemTotalPrice = document.createElement("p");
            var itemTotalPriceNode = document.createTextNode("$"+(desAmount[desIds[i]]*mydata.desserts[desIds[i]].price).toFixed(2));
            itemTotalPrice.appendChild(itemTotalPriceNode);
            itemTotalPrice.setAttribute("class","itemTotalPrice");
            objTo4.appendChild(itemTotalPrice);

            allCartItems.push(desAmount[desIds[i]] + " x " + mydata.desserts[desIds[i]].name);
            desTotalPrice += desAmount[desIds[i]]*mydata.desserts[desIds[i]].price;
            showTotal();
        }

        window.finalizeOrder = function finalizeOrder() {
            if ((bevTotalPrice+apeTotalPrice+entTotalPrice+desTotalPrice) !== 0) {
            document.getElementById("makeOrderButton").innerHTML = "Order Received ✓"
            var newOrder = {
                "tableNum": 1,
                "order": allCartItems.toString(),
                "subtotal": "$"+(bevTotalPrice + apeTotalPrice + entTotalPrice + desTotalPrice).toFixed(2),
                "total":"$"+((bevTotalPrice + apeTotalPrice + entTotalPrice + desTotalPrice)*1.04712).toFixed(2)
            };
            xmlhttp.open('POST', '/kitchen.php', true);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 || this.status === 200) {
                    console.log(this.responseText); // echo from php
                }
            };
            xmlhttp.send(JSON.stringify(newOrder));
            console.log(JSON.stringify(newOrder));

            localStorage.clear();
            //setTimeout(function(){location.href="index.html"},1000);
            }
        } 
    }
}
xmlhttp.open("GET","items.json",true);
xmlhttp.send();

