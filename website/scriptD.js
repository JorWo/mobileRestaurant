desAmount = JSON.parse(localStorage.getItem("desQty")) || [];
desIds = JSON.parse(localStorage.getItem("desIds")) || [];
var timeOut;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    var mydata = JSON.parse(this.responseText);

    window.loadItemBox = function loadItemBox(x) {
        clearTimeout(timeOut);
        if (desAmount[x] !== 0) {
            document.getElementById("addToCartButton").innerHTML = "Modify amount";
        }
        else {
            document.getElementById("addToCartButton").innerHTML = "Add to cart";
            document.getElementById("itemAmount").innerHTML = desAmount[x];
        }
        window.addItemAmount = function addItemAmount(x) {
            desAmount[x]++;
            document.getElementById("itemAmount").innerHTML = desAmount[x];
        }
        window.minusItemAmount = function minusItemAmount(x) {
            if (desAmount[x] !== 0) {
            desAmount[x]--;
            document.getElementById("itemAmount").innerHTML = desAmount[x];
            }
        }
        window.addItemToCart = function addItemToCart(x) {
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
        document.getElementById("itemName").innerHTML = mydata.desserts[x].name;
        document.getElementById("itemPrice").innerHTML = "$"+(mydata.desserts[x].price).toFixed(2);
        document.getElementById("itemDesc").innerHTML = mydata.desserts[x].desc;
        document.getElementById("itemAmount").innerHTML = desAmount[x];
        document.getElementById("minusToCartBut").style.visibility = "visible";
        document.getElementById("addToCartBut").style.visibility = "visible";
        document.getElementById("addToCartButton").style.visibility = "visible";
        document.getElementById("addToCartBut").setAttribute("onclick","addItemAmount("+x+")");
        document.getElementById("minusToCartBut").setAttribute("onclick","minusItemAmount("+x+")");
        document.getElementById("addToCartButton").setAttribute("onclick","addItemToCart("+x+")");
    }

    for (i=0;i<Object.keys(mydata.desserts).length;i++) {
        if (desAmount.length < Object.keys(mydata.desserts).length) {
            desAmount[i] = 0;
        }

        var objTo1 = document.getElementById("selScroll");
        var itemBox = document.createElement("div");
        itemBox.setAttribute("class","selBox");
        itemBox.setAttribute("onclick","loadItemBox("+i+")");
        objTo1.appendChild(itemBox);
        
        var objTo2 = document.getElementsByClassName("selBox")[i];
        var itemImage = document.createElement("img")
        itemImage.src = mydata.desserts[i].image;
        itemImage.setAttribute("width","100%");
        objTo2.appendChild(itemImage);
    }    
    }
}
xmlhttp.open("GET","items.json",true);
xmlhttp.send();
