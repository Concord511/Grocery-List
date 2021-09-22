let ids = {
    produceId: 0,
    dairyId: 0,
    meatsId: 0,
    cannedId: 0,
    noodlesSaucesId: 0,
    otherId: 0
}

let list = {
    produce: [],
    dairy: [],
    meats: [],
    canned: [],
    noodlesSauces: [],
    other: []
}

// Add item button handler
$(".form-container").on("click", "button", function(event) {
    var newItem = $("#new-item").val().trim();
    if (newItem === "") {
        return;
    }
    var itemCategory = $("input[name='store-section']:checked").val();
    list[itemCategory].push(newItem);
    $("#new-item").val("");
    $("#other").prop("checked", true);
    saveList();
    renderList(list);
});

// Green checkmark button handler
$('.store-sections').on("click", ".got-it", function() {
    var property = $(this).attr("id").replace("Id", "");
    var index = $(this).attr("propertyId");
    list[property].splice(index, 1);
    saveList();
    renderList(list);
})

// construct list elements
const renderList = function(listObj) {
    // remove current render and reset ids object's properties to 0
    $(".ul-container").children("li").each(function() {
        $(this).remove();
        for (let property in ids) {
            ids[property] = 0;
        }
    });
    for (let arrays in listObj) {
        let objectArray = listObj[arrays];
        for (let i = 0; i < objectArray.length; i++) {
            let newItem = objectArray[i];
            let itemCategory = arrays;
            let propertyId = itemCategory + "Id";            
            var listItemEl = $("<li>")
                .addClass("item-container")
                .attr("id", propertyId)
                .attr("propertyId", ids[propertyId]);
            var gotItButton = $("<button>")
                .addClass("got-it")
                .attr("id", propertyId)
                .attr("propertyId", ids[propertyId])
                .text("✓︁");
            var itemText = $("<span>")
                .addClass("list-item")
                .text(newItem);
            var unavailableButton = $("<button>")
                .addClass("unavailable")
                .attr("id", propertyId)
                .attr("propertyId", ids[propertyId])
                .text("X︁");
            listItemEl.append(gotItButton, itemText, unavailableButton);
            $("#" + itemCategory + "-container").append(listItemEl);
            ids[propertyId]++;
        }
    }   
};

// function to save list in localStorage
const saveList = function() {
    localStorage.setItem("list", JSON.stringify(list));
}

// function to load list from localStorage
const loadList = function() {
    list = JSON.parse(localStorage.getItem("list"));
    if (!list) {
        list = {
            produce: [],
            dairy: [],
            meats: [],
            canned: [],
            noodlesSauces: [],
            other: []
        };
    }
    renderList(list);
}
loadList();