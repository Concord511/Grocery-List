let id = 0;

let list = {
    produce: [],
    dairy: [],
    meats: [],
    canned: [],
    noodlesSauces: [],
    other: []
}

$(".form-container").on("submit", function(event) {
    event.preventDefault();

    var newItem = $("#new-item").val().trim();
    var itemCategory = $("input[name='store-section']:checked").val();
    var listItemEl = $("<div>")
        .attr("id", id);
    var gotItButton = $("<button>")
        .addClass("got-it")
        .attr("id", "Yes" + id)
        .text("✓︁");
    var unavailableButton = $("<button>")
        .addClass("unavailable")
        .attr("id", "No-" + id)
        .text("X︁");
    var itemText = $("<span>")
        .addClass("list-item")
        .text(newItem);
    listItemEl.append(gotItButton, itemText, unavailableButton);
    $(itemCategory + "-container").append(listItemEl);
    id++;
    // RESET FORM PLZ
});

// function to save list in localStorage
const saveList = function() {
    localStorage.setItem("list", JSON.stringify(list));
}

// function to load list from localStorage
// const loadList = function() {
//     newList = JSON.parse(localStorage.getItem("list"));
//     if (!newList) {
//         return;
//     }
//     console.log(newList);
//     for (var array of newList) {
//         list[array] = array;
//     }
// }