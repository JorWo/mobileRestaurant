bevAmount = JSON.parse(localStorage.getItem("bevQty")) || [];
bevIds = JSON.parse(localStorage.getItem("bevIds")) || [];
apeAmount = JSON.parse(localStorage.getItem("apeQty")) || [];
apeIds = JSON.parse(localStorage.getItem("apeIds")) || [];
entAmount = JSON.parse(localStorage.getItem("entQty")) || [];
entIds = JSON.parse(localStorage.getItem("entIds")) || [];
desAmount = JSON.parse(localStorage.getItem("desQty")) || [];
desIds = JSON.parse(localStorage.getItem("desIds")) || [];
var timeOut;

function searchItem() {
    var totalBevItems = 0;
    var totalApeItems = 0;
    var totalEntItems = 0;
    var totalDesItems = 0;

    document.getElementById("pop").style.visibility = "hidden";
    document.getElementById("popular").style.visibility = "hidden";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var mydata = JSON.parse(this.responseText);

        window.loadBevBox = function loadBevBox(x) {
            clearTimeout(timeOut);
            if (bevAmount[x] !== 0) {
                document.getElementById("addToCartButton").innerHTML = "Modify amount";
            }
            else {
                document.getElementById("addToCartButton").innerHTML = "Add to cart";
                document.getElementById("itemAmount").innerHTML = bevAmount[x];
            }
            window.addBevAmount = function addBevAmount(x) {
                bevAmount[x]++;
                document.getElementById("itemAmount").innerHTML = bevAmount[x];
            }
            window.minusBevAmount = function minusBevAmount(x) {
                if (bevAmount[x] !== 0) {
                    bevAmount[x]--;
                    document.getElementById("itemAmount").innerHTML = bevAmount[x];
                }
            }
            window.addBevToCart = function addBevToCart(x) {
                if (bevAmount[x] !== 0 && !(bevIds.includes(x))) {
                    bevIds.push(x);
                    localStorage.setItem("bevIds",JSON.stringify(bevIds));  
                    localStorage.setItem("bevQty",JSON.stringify(bevAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Item added ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Modify amount";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
                else if (bevAmount[x] == 0 && (document.getElementById("addToCartButton").innerHTML == "Modify amount")) {
                    bevIds.splice(bevIds[x],1);
                    localStorage.setItem("bevIds",JSON.stringify(bevIds));  
                    localStorage.setItem("bevQty",JSON.stringify(bevAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Item removed ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Add to cart";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
                else if (bevAmount[x] !== 0 && (document.getElementById("addToCartButton").innerHTML == "Modify amount")){
                    localStorage.setItem("bevIds",JSON.stringify(bevIds));  
                    localStorage.setItem("bevQty",JSON.stringify(bevAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Amount modified ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Modify amount";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
            }
    
            document.getElementById("itemPic").src = mydata.beverages[x].image;
            document.getElementById("itemPic").style.width = "400px";
            document.getElementById("itemPic").style.height = "400px";
            document.getElementById("itemPic").style.marginTop = "100px";
            document.getElementById("itemName").innerHTML = mydata.beverages[x].name;
            document.getElementById("itemPrice").innerHTML = "$"+(mydata.beverages[x].price).toFixed(2);
            document.getElementById("itemDesc").innerHTML = mydata.beverages[x].desc;
            document.getElementById("itemAmount").innerHTML = bevAmount[x];
            document.getElementById("minusToCartBut").style.visibility = "visible";
            document.getElementById("addToCartBut").style.visibility = "visible";
            document.getElementById("addToCartButton").style.visibility = "visible";
            document.getElementById("addToCartBut").setAttribute("onclick","addBevAmount("+x+")");
            document.getElementById("minusToCartBut").setAttribute("onclick","minusBevAmount("+x+")");
            document.getElementById("addToCartButton").setAttribute("onclick","addBevToCart("+x+")");
        }

        window.loadApeBox = function loadApeBox(x) {
            clearTimeout(timeOut);
            if (apeAmount[x] !== 0) {
                document.getElementById("addToCartButton").innerHTML = "Modify amount";
            }
            else {
                document.getElementById("addToCartButton").innerHTML = "Add to cart";
                document.getElementById("itemAmount").innerHTML = apeAmount[x];
            }
            window.addApeAmount = function addApeAmount(x) {
                apeAmount[x]++;
                document.getElementById("itemAmount").innerHTML = apeAmount[x];
            }
            window.minusApeAmount = function minusApeAmount(x) {
                if (apeAmount[x] !== 0) {
                apeAmount[x]--;
                document.getElementById("itemAmount").innerHTML = apeAmount[x];
                }
            }
            window.addApeToCart = function addApeToCart(x) {
                if (apeAmount[x] !== 0 && !(apeIds.includes(x))) {
                    apeIds.push(x);
                    localStorage.setItem("apeIds",JSON.stringify(apeIds));  
                    localStorage.setItem("apeQty",JSON.stringify(apeAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Item added ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Modify amount";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
                else if (apeAmount[x] == 0 && (document.getElementById("addToCartButton").innerHTML == "Modify amount")) {
                    apeIds.splice(apeIds[x],1);
                    localStorage.setItem("apeIds",JSON.stringify(apeIds));  
                    localStorage.setItem("apeQty",JSON.stringify(apeAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Item removed ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Add to cart";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
                else if (apeAmount[x] !== 0 && (document.getElementById("addToCartButton").innerHTML == "Modify amount")){
                    localStorage.setItem("apeIds",JSON.stringify(apeIds));  
                    localStorage.setItem("apeQty",JSON.stringify(apeAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Amount modified ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Modify amount";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
            }
    
            document.getElementById("itemPic").src = mydata.appetizers[x].image;
            document.getElementById("itemPic").style.width = "400px";
            document.getElementById("itemPic").style.height = "400px";
            document.getElementById("itemPic").style.marginTop = "100px";
            document.getElementById("itemName").innerHTML = mydata.appetizers[x].name;
            document.getElementById("itemPrice").innerHTML = "$"+(mydata.appetizers[x].price).toFixed(2);
            document.getElementById("itemDesc").innerHTML = mydata.appetizers[x].desc;
            document.getElementById("itemAmount").innerHTML = apeAmount[x];
            document.getElementById("minusToCartBut").style.visibility = "visible";
            document.getElementById("addToCartBut").style.visibility = "visible";
            document.getElementById("addToCartButton").style.visibility = "visible";
            document.getElementById("addToCartBut").setAttribute("onclick","addApeAmount("+x+")");
            document.getElementById("minusToCartBut").setAttribute("onclick","minusApeAmount("+x+")");
            document.getElementById("addToCartButton").setAttribute("onclick","addApeToCart("+x+")");
        }

        window.loadEntBox = function loadEntBox(x) {
            clearTimeout(timeOut);
            if (entAmount[x] !== 0) {
                document.getElementById("addToCartButton").innerHTML = "Modify amount";
            }
            else {
                document.getElementById("addToCartButton").innerHTML = "Add to cart";
                document.getElementById("itemAmount").innerHTML = entAmount[x];
            }
            window.addEntAmount = function addEntAmount(x) {
                entAmount[x]++;
                document.getElementById("itemAmount").innerHTML = entAmount[x];
            }
            window.minusEntAmount = function minusEntAmount(x) {
                if (entAmount[x] !== 0) {
                entAmount[x]--;
                document.getElementById("itemAmount").innerHTML = entAmount[x];
                }
            }
            window.addEntToCart = function addEntToCart(x) {
                if (entAmount[x] !== 0 && !(entIds.includes(x))) {
                    entIds.push(x);
                    localStorage.setItem("entIds",JSON.stringify(entIds));  
                    localStorage.setItem("entQty",JSON.stringify(entAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Item added ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Modify amount";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
                else if (entAmount[x] == 0 && (document.getElementById("addToCartButton").innerHTML == "Modify amount")) {
                    entIds.splice(entIds[x],1);
                    localStorage.setItem("entIds",JSON.stringify(entIds));  
                    localStorage.setItem("entQty",JSON.stringify(entAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Item removed ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Add to cart";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
                else if (entAmount[x] !== 0 && (document.getElementById("addToCartButton").innerHTML == "Modify amount")){
                    localStorage.setItem("entIds",JSON.stringify(entIds));  
                    localStorage.setItem("entQty",JSON.stringify(entAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Amount modified ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Modify amount";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
            }
    
            document.getElementById("itemPic").src = mydata.entrees[x].image;
            document.getElementById("itemPic").style.width = "400px";
            document.getElementById("itemPic").style.height = "400px";
            document.getElementById("itemPic").style.marginTop = "100px";
            document.getElementById("itemName").innerHTML = mydata.entrees[x].name;
            document.getElementById("itemPrice").innerHTML = "$"+(mydata.entrees[x].price).toFixed(2);
            document.getElementById("itemDesc").innerHTML = mydata.entrees[x].desc;
            document.getElementById("itemAmount").innerHTML = entAmount[x];
            document.getElementById("minusToCartBut").style.visibility = "visible";
            document.getElementById("addToCartBut").style.visibility = "visible";
            document.getElementById("addToCartButton").style.visibility = "visible";
            document.getElementById("addToCartBut").setAttribute("onclick","addEntAmount("+x+")");
            document.getElementById("minusToCartBut").setAttribute("onclick","minusEntAmount("+x+")");
            document.getElementById("addToCartButton").setAttribute("onclick","addEntToCart("+x+")");
        }

        window.loadDesBox = function loadDesBox(x) {
            clearTimeout(timeOut);
            if (desAmount[x] !== 0) {
                document.getElementById("addToCartButton").innerHTML = "Modify amount";
            }
            else {
                document.getElementById("addToCartButton").innerHTML = "Add to cart";
                document.getElementById("itemAmount").innerHTML = desAmount[x];
            }
            window.addDesAmount = function addDesAmount(x) {
                desAmount[x]++;
                document.getElementById("itemAmount").innerHTML = desAmount[x];
            }
            window.minusDesAmount = function minusDesAmount(x) {
                if (desAmount[x] !== 0) {
                desAmount[x]--;
                document.getElementById("itemAmount").innerHTML = desAmount[x];
                }
            }
            window.addDesToCart = function addDesToCart(x) {
                if (desAmount[x] !== 0 && !(desIds.includes(x))) {
                    desIds.push(x);
                    localStorage.setItem("desIds",JSON.stringify(desIds));  
                    localStorage.setItem("desQty",JSON.stringify(desAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Item added ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Modify amount";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
                else if (desAmount[x] == 0 && (document.getElementById("addToCartButton").innerHTML == "Modify amount")) {
                    desIds.splice(desIds[x],1);
                    localStorage.setItem("desIds",JSON.stringify(desIds));  
                    localStorage.setItem("desQty",JSON.stringify(desAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Item removed ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Add to cart";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
                else if (desAmount[x] !== 0 && (document.getElementById("addToCartButton").innerHTML == "Modify amount")){
                    localStorage.setItem("desIds",JSON.stringify(desIds));  
                    localStorage.setItem("desQty",JSON.stringify(desAmount)); 
                    document.getElementById("addToCartButton").innerHTML = "Amount modified ✓";
                    document.getElementById("addToCartButton").style.pointerEvents = "none";
                    timeOut = setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Modify amount";},1000);
                    document.getElementById("addToCartButton").style.pointerEvents = 'auto';
                }
            }
    
            document.getElementById("itemPic").src = mydata.desserts[x].image;
            document.getElementById("itemPic").style.width = "400px";
            document.getElementById("itemPic").style.height = "400px";
            document.getElementById("itemPic").style.marginTop = "100px";
            document.getElementById("itemName").innerHTML = mydata.desserts[x].name;
            document.getElementById("itemPrice").innerHTML = "$"+(mydata.desserts[x].price).toFixed(2);
            document.getElementById("itemDesc").innerHTML = mydata.desserts[x].desc;
            document.getElementById("itemAmount").innerHTML = desAmount[x];
            document.getElementById("minusToCartBut").style.visibility = "visible";
            document.getElementById("addToCartBut").style.visibility = "visible";
            document.getElementById("addToCartButton").style.visibility = "visible";
            document.getElementById("addToCartBut").setAttribute("onclick","addDesAmount("+x+")");
            document.getElementById("minusToCartBut").setAttribute("onclick","minusDesAmount("+x+")");
            document.getElementById("addToCartButton").setAttribute("onclick","addDesToCart("+x+")");
        }
    
        while (document.getElementById("selScroll").firstChild) {
            document.getElementById("selScroll").removeChild(document.getElementById("selScroll").firstChild);
        }

        for (i=0;i<(Object.keys(mydata.beverages).length);i++) {
            if (bevAmount.length < Object.keys(mydata.beverages).length) {
                bevAmount[i] = 0;
            }
            if (((mydata.beverages[i].name).toUpperCase().indexOf(document.getElementById("searchBar").value.toUpperCase()) > -1) && (document.getElementById("searchBar").value != "")) {
                var objTo1 = document.getElementById("selScroll");
                document.getElementById("selScroll").style.marginTop = "575px";
                var itemBox = document.createElement("div");
                itemBox.setAttribute("class","selBox");
                itemBox.setAttribute("onclick","loadBevBox("+i+")");
                objTo1.appendChild(itemBox);
            
                totalBevItems++;
                var objTo2 = document.getElementsByClassName("selBox")[totalBevItems-1];
                var itemImage = document.createElement("img");
                itemImage.src = mydata.beverages[i].image;
                itemImage.setAttribute("width","100%");
                objTo2.appendChild(itemImage);
            }
        } 
        
        for (i=0;i<(Object.keys(mydata.appetizers).length);i++) {
            if (apeAmount.length < Object.keys(mydata.appetizers).length) {
                apeAmount[i] = 0;
            }
            if (((mydata.appetizers[i].name).toUpperCase().indexOf(document.getElementById("searchBar").value.toUpperCase()) > -1) && (document.getElementById("searchBar").value != "")) {
                var objTo1 = document.getElementById("selScroll");
                document.getElementById("selScroll").style.marginTop = "575px";
                var itemBox = document.createElement("div");
                itemBox.setAttribute("class","selBox");
                itemBox.setAttribute("onclick","loadApeBox("+i+")");
                objTo1.appendChild(itemBox);
                
                totalApeItems++;
                var objTo2 = document.getElementsByClassName("selBox")[totalApeItems-1+totalBevItems];
                var itemImage = document.createElement("img");
                itemImage.src = mydata.appetizers[i].image;
                itemImage.setAttribute("width","100%");
                objTo2.appendChild(itemImage);
            }
        } 

        for (i=0;i<(Object.keys(mydata.entrees).length);i++) {
            if (entAmount.length < Object.keys(mydata.entrees).length) {
                entAmount[i] = 0;
            }
            if (((mydata.entrees[i].name).toUpperCase().indexOf(document.getElementById("searchBar").value.toUpperCase()) > -1) && (document.getElementById("searchBar").value != "")) {
                var objTo1 = document.getElementById("selScroll");
                document.getElementById("selScroll").style.marginTop = "575px";
                var itemBox = document.createElement("div");
                itemBox.setAttribute("class","selBox");
                itemBox.setAttribute("onclick","loadEntBox("+i+")");
                objTo1.appendChild(itemBox);
                
                totalEntItems++;
                var objTo2 = document.getElementsByClassName("selBox")[totalEntItems-1+totalApeItems+totalBevItems];
                var itemImage = document.createElement("img");
                itemImage.src = mydata.entrees[i].image;
                itemImage.setAttribute("width","100%");
                objTo2.appendChild(itemImage);
            }
        }

        for (i=0;i<(Object.keys(mydata.desserts).length);i++) {
            if (desAmount.length < Object.keys(mydata.desserts).length) {
                desAmount[i] = 0;
            }
            if (((mydata.desserts[i].name).toUpperCase().indexOf(document.getElementById("searchBar").value.toUpperCase()) > -1) && (document.getElementById("searchBar").value != "")) {
                var objTo1 = document.getElementById("selScroll");
                document.getElementById("selScroll").style.marginTop = "575px";
                var itemBox = document.createElement("div");
                itemBox.setAttribute("class","selBox");
                itemBox.setAttribute("onclick","loadDesBox("+i+")");
                objTo1.appendChild(itemBox);
                
                totalDesItems++;
                var objTo2 = document.getElementsByClassName("selBox")[totalDesItems-1+totalEntItems+totalApeItems+totalBevItems];
                var itemImage = document.createElement("img");
                itemImage.src = mydata.desserts[i].image;
                itemImage.setAttribute("width","100%");
                objTo2.appendChild(itemImage);
            }
        }

        if (document.getElementById("searchBar").value == "") {
            document.getElementById("pop").style.marginTop = "-400px";
            document.getElementById("pop").style.visibility = "visible";
            document.getElementById("popular").style.visibility = "visible";
            document.getElementById("itemPic").src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            document.getElementById("itemName").innerHTML = "";
            document.getElementById("itemPrice").innerHTML = "";
            document.getElementById("itemDesc").innerHTML = "";
            document.getElementById("itemAmount").innerHTML = "";
            document.getElementById("minusToCartBut").style.visibility = "hidden";
            document.getElementById("addToCartBut").style.visibility = "hidden";
            document.getElementById("addToCartButton").style.visibility = "hidden";
        }
    }
    }
xmlhttp.open("GET","items.json",true);
xmlhttp.send();
}

 