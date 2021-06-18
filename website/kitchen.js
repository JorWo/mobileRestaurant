var tables = 10;

for (i=0;i<tables;i++) {
    var objTo1 = document.getElementById("tables");
    var tableBox = document.createElement("div");
    tableBox.setAttribute("class","tableBox");
    objTo1.appendChild(tableBox);

    var objTo2 = document.getElementsByClassName("tableBox")[i];
    var tableTitle = document.createElement("p");
    tableTitle.setAttribute("class","tableTitle");
    objTo2.appendChild(tableTitle);
    document.getElementsByClassName("tableTitle")[i].innerHTML = "Table " + (i+1);
}