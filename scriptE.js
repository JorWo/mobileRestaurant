entAmount = JSON.parse(localStorage.getItem("entQty")) || [];
entIds = JSON.parse(localStorage.getItem("entIds")) || [];
var timeOut;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    var mydata = JSON.parse(this.responseText);

    window.loadItemBox = function loadItemBox(x) {
        clearTimeout(timeOut);
        if (entAmount[x] !== 0) {
            document.getElementById("addToCartButton").innerHTML = "Modify amount";
        }
        else {
            document.getElementById("addToCartButton").innerHTML = "Add to cart";
            document.getElementById("itemAmount").innerHTML = entAmount[x];
        }
        window.addItemAmount = function addItemAmount(x) {
            entAmount[x]++;
            document.getElementById("itemAmount").innerHTML = entAmount[x];
        }
        window.minusItemAmount = function minusItemAmount(x) {
            if (entAmount[x] !== 0) {
            entAmount[x]--;
            document.getElementById("itemAmount").innerHTML = entAmount[x];
            }
        }
        window.addItemToCart = function addItemToCart(x) {
            if (entAmount[x] !== 0 && !(x in entIds)) {
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
        document.getElementById("itemName").innerHTML = mydata.entrees[x].name;
        document.getElementById("itemPrice").innerHTML = "$"+(mydata.entrees[x].price).toFixed(2);
        document.getElementById("itemDesc").innerHTML = mydata.entrees[x].desc;
        document.getElementById("itemAmount").innerHTML = entAmount[x];
        document.getElementById("minusToCartBut").style.visibility = "visible";
        document.getElementById("addToCartBut").style.visibility = "visible";
        document.getElementById("addToCartButton").style.visibility = "visible";
        document.getElementById("addToCartBut").setAttribute("onclick","addItemAmount("+x+")");
        document.getElementById("minusToCartBut").setAttribute("onclick","minusItemAmount("+x+")");
        document.getElementById("addToCartButton").setAttribute("onclick","addItemToCart("+x+")");
    }

    for (i=0;i<Object.keys(mydata.entrees).length;i++) {
        if (entAmount.length < Object.keys(mydata.entrees).length) {
            entAmount[i] = 0;
        }

        var objTo1 = document.getElementById("selScroll");
        var itemBox = document.createElement("div");
        itemBox.setAttribute("class","selBox");
        itemBox.setAttribute("onclick","loadItemBox("+i+")");
        objTo1.appendChild(itemBox);
        
        var objTo2 = document.getElementsByClassName("selBox")[i];
        var itemImage = document.createElement("img")
        itemImage.src = mydata.entrees[i].image;
        itemImage.setAttribute("width","100%");
        objTo2.appendChild(itemImage);
    }    
    }
}
xmlhttp.open("GET","items.json",true);
xmlhttp.send();