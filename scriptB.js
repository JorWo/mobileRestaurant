bevAmount = [];

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    var mydata = JSON.parse(this.responseText);

    window.loadItemBox = function loadItemBox(x) {
        document.getElementById("itemPic").src = mydata.beverages[x].image;
        document.getElementById("itemName").innerHTML = mydata.beverages[x].name;
        document.getElementById("itemPrice").innerHTML = "$"+(mydata.beverages[x].price).toFixed(2);
        document.getElementById("itemDesc").innerHTML = mydata.beverages[x].desc;
        document.getElementById("itemAmount").innerHTML = bevAmount[x];
        for (i=0; i<2;i++) {
        document.getElementsByClassName("addToCartBut")[i].style.visibility = "visible";
        }
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
        objTo2.appendChild(itemImage);
    }    
    }
}
xmlhttp.open("GET","items.json",true);
xmlhttp.send();





