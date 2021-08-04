var client_list = [];
var total_budget = 0;
sessionStorage.setItem("client_list",JSON.stringify(client_list));
sessionStorage.setItem("total_budget", total_budget);
function clearInput() {
    document.getElementById("client_name").value = '';
    document.getElementById("project_name").value = '';
    document.getElementById("budget").value = '';
}

function storeData() {
    if (document.getElementById("budget").value >= 0) {
        total_budget = JSON.parse(sessionStorage.getItem("total_budget")) + parseInt(document.getElementById("budget").value);
        sessionStorage.setItem("total_budget", total_budget);
        var newClient = {client_name:document.getElementById("client_name").value, project_name:document.getElementById("project_name").value, budget:document.getElementById("budget").value};
        var newClientArray = JSON.parse(localStorage.getItem("client_list") || "[]");
        newClientArray.push(newClient);
        localStorage.setItem("client_list", JSON.stringify(newClientArray));
    }
}

function financeTeams() {
    document.getElementById("finance_teams").innerHTML = "Annual Budget<br>";

    let clients = JSON.parse(localStorage.getItem("client_list") || "[]");
    JSON.stringify(clients);
    var tableContent="";
    var startTable = "<table border=1><tr><th>Client Name </th><th>Project Name</th><th>Budget Amount: </th></tr>";
    var budget = 0;
    clients.forEach(entry=>{
        tableContent += "<tr><td>" +entry.client_name+"</td><td>"+entry.project_name+"</td><td>"+entry.budget+"<td></tr>";
        budget += entry.budget;
    });
    var endTable = "</table>";
    tableContent = startTable + tableContent + endTable;
    document.getElementById("finance_teams").innerHTML+=tableContent;
    
    calculateTotal();
}

function calculateTotal() {
    let clients = JSON.parse(localStorage.getItem("client_list") || "[]");
    JSON.stringify(clients);
    var tableContent="";
    var startTable = "<table border=1><tr><th>Client Name </th><th>Project Name</th><th>Budget Amount: </th></tr>";
    var budget = 0;
    clients.forEach(entry=>{
        budget += +entry.budget;
    });
    document.getElementById("total").textContent = 'Total: $' + budget;
}