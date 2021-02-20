apeAmount = JSON.parse(localStorage.getItem("apeQty")) || [];
apeIds = JSON.parse(localStorage.getItem("apeIds")) || [];

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    var mydata = JSON.parse(this.responseText);

    window.loadItemBox = function loadItemBox(x) {
        document.getElementById("addToCartButton").innerHTML = "Add to cart";
        document.getElementById("itemAmount").innerHTML = apeAmount[x];

        window.addItemAmount = function addItemAmount(x) {
            apeAmount[x]++;
            document.getElementById("itemAmount").innerHTML = apeAmount[x];
        }
        window.minusItemAmount = function minusItemAmount(x) {
            if (apeAmount[x] !== 0) {
            apeAmount[x]--;
            document.getElementById("itemAmount").innerHTML = apeAmount[x];
            }
        }
        window.addItemToCart = function addItemToCart(x) {
            if (apeAmount[x] !== 0) {  
                apeIds.push(x);
                localStorage.setItem("apeIds",JSON.stringify(apeIds));  
                localStorage.setItem("apeQty",JSON.stringify(apeAmount)); 
                document.getElementById("addToCartButton").innerHTML = "Item added ✓";
            }    
        }

        document.getElementById("itemPic").src = mydata.appetizers[x].image;
        document.getElementById("itemName").innerHTML = mydata.appetizers[x].name;
        document.getElementById("itemPrice").innerHTML = "$"+(mydata.appetizers[x].price).toFixed(2);
        document.getElementById("itemDesc").innerHTML = mydata.appetizers[x].desc;
        document.getElementById("itemAmount").innerHTML = apeAmount[x];
        document.getElementById("minusToCartBut").style.visibility = "visible";
        document.getElementById("addToCartBut").style.visibility = "visible";
        document.getElementById("addToCartButton").style.visibility = "visible";
        document.getElementById("addToCartBut").setAttribute("onclick","addItemAmount("+x+")");
        document.getElementById("minusToCartBut").setAttribute("onclick","minusItemAmount("+x+")");
        document.getElementById("addToCartButton").setAttribute("onclick","addItemToCart("+x+")");
    }

    for (i=0;i<Object.keys(mydata.appetizers).length;i++) {
        if (apeAmount.length < Object.keys(mydata.appetizers).length) {
            apeAmount[i] = 0;
        }

        var objTo1 = document.getElementById("selScroll");
        var itemBox = document.createElement("div");
        itemBox.setAttribute("class","selBox");
        itemBox.setAttribute("onclick","loadItemBox("+i+")");
        objTo1.appendChild(itemBox);
        
        var objTo2 = document.getElementsByClassName("selBox")[i];
        var itemImage = document.createElement("img")
        itemImage.src = mydata.appetizers[i].image;
        itemImage.setAttribute("width","100%");
        objTo2.appendChild(itemImage);
    }    
    }
}
xmlhttp.open("GET","items.json",true);
xmlhttp.send();




