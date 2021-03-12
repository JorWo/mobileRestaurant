function search() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var mydata = JSON.parse(this.responseText);
        
        for (var i;i<Object.keys(mydata);i++) {
            
        }
    }
    xmlhttp.open("GET","items.json",true);
    xmlhttp.send();
}
}