bevAmount = JSON.parse(localStorage.getItem("bevQty")) || [];
bevIds = JSON.parse(localStorage.getItem("bevIds")) || [];

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    var mydata = JSON.parse(this.responseText);

    window.loadItemBox = function loadItemBox(x) {
        if (bevAmount[x] !== 0) {
            document.getElementById("addToCartButton").innerHTML = "Change amount";
        }
        else {
            document.getElementById("addToCartButton").innerHTML = "Add to cart";
            document.getElementById("itemAmount").innerHTML = bevAmount[x];
        }
        window.addItemAmount = function addItemAmount(x) {
            bevAmount[x]++;
            document.getElementById("itemAmount").innerHTML = bevAmount[x];
        }
        window.minusItemAmount = function minusItemAmount(x) {
            if (bevAmount[x] !== 0) {
                bevAmount[x]--;
                document.getElementById("itemAmount").innerHTML = bevAmount[x];
            }
        }
        window.addItemToCart = function addItemToCart(x) {
            if (bevAmount[x] !== 0 && !(x in bevIds)) {
                bevIds.push(x);
            }
            else if (bevAmount[x] == 0) {
                bevIds.splice(bevIds[x],1);
                localStorage.setItem("bevIds",JSON.stringify(bevIds));  
                localStorage.setItem("bevQty",JSON.stringify(bevAmount)); 
                document.getElementById("addToCartButton").innerHTML = "Item removed ✓";
                document.getElementById("addToCartButton").style.pointerEvents = "none";
                setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Add to cart";},2000);
                document.getElementById("addToCartButton").style.pointerEvents = 'auto';
            }
            else {
                localStorage.setItem("bevIds",JSON.stringify(bevIds));  
                localStorage.setItem("bevQty",JSON.stringify(bevAmount)); 
                if (document.getElementById("addToCartButton").innerHTML == "Change amount") {
                    document.getElementById("addToCartButton").innerHTML = "Item changed ✓";
                }
                else {
                    document.getElementById("addToCartButton").innerHTML = "Item added ✓";
                }
                document.getElementById("addToCartButton").style.pointerEvents = 'none';
                setTimeout(function(){document.getElementById("addToCartButton").innerHTML = "Change amount";},2000);
                document.getElementById("addToCartButton").style.pointerEvents = 'auto';
            }
        }

        document.getElementById("itemPic").src = mydata.beverages[x].image;
        document.getElementById("itemName").innerHTML = mydata.beverages[x].name;
        document.getElementById("itemPrice").innerHTML = "$"+(mydata.beverages[x].price).toFixed(2);
        document.getElementById("itemDesc").innerHTML = mydata.beverages[x].desc;
        document.getElementById("itemAmount").innerHTML = bevAmount[x];
        document.getElementById("minusToCartBut").style.visibility = "visible";
        document.getElementById("addToCartBut").style.visibility = "visible";
        document.getElementById("addToCartButton").style.visibility = "visible";
        document.getElementById("addToCartBut").setAttribute("onclick","addItemAmount("+x+")");
        document.getElementById("minusToCartBut").setAttribute("onclick","minusItemAmount("+x+")");
        document.getElementById("addToCartButton").setAttribute("onclick","addItemToCart("+x+")");
    }

    for (i=0;i<Object.keys(mydata.beverages).length;i++) {
        if (bevAmount.length < Object.keys(mydata.beverages).length) {
            bevAmount[i] = 0;
        }
        var objTo1 = document.getElementById("selScroll");
        var itemBox = document.createElement("div");
        itemBox.setAttribute("class","selBox");
        itemBox.setAttribute("onclick","loadItemBox("+i+")");
        objTo1.appendChild(itemBox);
        
        var objTo2 = document.getElementsByClassName("selBox")[i];
        var itemImage = document.createElement("img");
        itemImage.src = mydata.beverages[i].image;
        itemImage.setAttribute("width","100%");
        objTo2.appendChild(itemImage);
    }    
    }
}
xmlhttp.open("GET","items.json",true);
xmlhttp.send();





