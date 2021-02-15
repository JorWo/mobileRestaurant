bevAmount = [];

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    var mydata = JSON.parse(this.responseText);

    window.loadItemBox = function loadItemBox(x) {
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
            if (bevAmount[x] !== 0) {
            localStorage.setItem("itemPic"+x,mydata.beverages[x].image);  
            localStorage.setItem("itemName"+x,mydata.beverages[x].name);    
            localStorage.setItem("itemPrice"+x,mydata.beverages[x].price); 
            localStorage.setItem("itemQty"+x,bevAmount[x]); 
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
        bevAmount[i] = 0;

        var objTo1 = document.getElementById("selScroll");
        var itemBox = document.createElement("div");
        itemBox.setAttribute("class","selBox");
        itemBox.setAttribute("onclick","loadItemBox("+i+")");
        objTo1.appendChild(itemBox);
        
        var objTo2 = document.getElementsByClassName("selBox")[i];
        var itemImage = document.createElement("img")
        itemImage.src = mydata.beverages[i].image;
        itemImage.setAttribute("width","100%");
        objTo2.appendChild(itemImage);

    }    
    }
}
xmlhttp.open("GET","items.json",true);
xmlhttp.send();





