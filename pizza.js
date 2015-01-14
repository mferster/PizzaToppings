// Mathieu Ferster
// 1/12/2015

function groupAndSort(data) {
    return _.chain(data).groupBy("toppings")
    .map(function (key, value) {
        return { toppings: key, val: value }
    })
    .sortBy(function (value) { return value.toppings; })
    .reverse()
    .value();
}

function display(grouped) {
    var out = 'Rank | Topping | Frequency<br/>';
    for (var i = 0; i < grouped.length; i++) {
        if (i >= 20)
            break;
        out += (i + 1) + ". " + grouped[i].val + " " + grouped[i].toppings.length + "<br/>";
    }
    document.getElementById('place').innerHTML = out;
}

function go() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://files.olo.com/pizzas.json";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var toppings = JSON.parse(xmlhttp.responseText);
            var grouped = groupAndSort(toppings);
            display(grouped);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
