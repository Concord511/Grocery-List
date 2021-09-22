let ids = {
    produceId: 0,
    dairyId: 0,
    meatsId: 0,
    cannedId: 0,
    noodlesSaucesId: 0,
    otherId: 0
}

let list = {}
let nextTime = {}

// button handler for adding items
$(".form-container").on("click", ".form-button", function(event) {
    console.log("Triggered add item");
    var newItem = $("#new-item").val().trim();
    if (newItem === "") {
        return;
    }
    var itemCategory = $("input[name='store-section']:checked").val();
    console.log(itemCategory);
    list[itemCategory].push(newItem);
    $("#new-item").val("");
    $("#other").prop("checked", true);
    saveList();
    renderList(list);
});

// button handler for green checkmark
$('.store-sections').on("click", ".got-it", function() {
    console.log("Triggered green checkmark");
    var property = $(this)
        .attr("id")
        .replace("Id", "");
    var index = $(this)
        .attr("propertyId");
    list[property].splice(index, 1);
    saveList();
    renderList(list);
});

$('.store-sections').on("click", ".unavailable", function() {
    console.log("Triggered red X");
    var property = $(this)
        .attr("id")
        .replace("Id", "");
    var item = $(this)
        .closest("li").children("span")
        .text()
        .trim();
    console.log(item);
    var index = $(this)
        .attr("propertyId");
    list[property].splice(index, 1);
    nextTime[property].push(item);
    saveList();
    renderList(list);
});

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
    localStorage.setItem("nextTime", JSON.stringify(nextTime));
}

// function to load list from localStorage
const loadList = function() {
    list = JSON.parse(localStorage.getItem("list"));
    nextTime = JSON.parse(localStorage.getItem("nextTime"));
    if (!list && !nextTime) {
        list = {
            produce: [],
            dairy: [],
            meats: [],
            canned: [],
            noodlesSauces: [],
            other: []
        }
        nextTime = {
            produce: [],
            dairy: [],
            meats: [],
            canned: [],
            noodlesSauces: [],
            other: []
        };
    }
    else {
        // determine whether either list or nextTime are empty
        let listEmpty = true;
        let nextTimeEmpty = true;
        for (let property in list) {
            if (list[property].length > 0) {
                listEmpty = false;
            }
        }
        for (let property in nextTime) {
            if (nextTime[property].length > 0) {
                nextTimeEmpty = false;
            }
        }
        if (listEmpty && !nextTimeEmpty) {
            list = nextTime;
            nextTime = {
                produce: [],
                dairy: [],
                meats: [],
                canned: [],
                noodlesSauces: [],
                other: []
            }
        }
        saveList();
        renderList(list);
    }

}

loadList();