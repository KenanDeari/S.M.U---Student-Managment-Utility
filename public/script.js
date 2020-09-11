//-------------------array for each note block-------------------//
var Notes = ["Note-1", "Note-2", "Note-3"
    , "Note-4", "Note-5", "Note-6",];

for (var i = 1; i < Notes.length + 1; i++) {
    var container = $("<div>");
    container.attr("class", "container");

    var row = $("<div>");
    row.attr("class", "row");

    var timeBlock = $("<div>");
    timeBlock.attr("class", "time-block past bg-secondary");
    timeBlock.text(Notes[i - 1]);

    //--form for inserted text --//    
    var textArea = $("<textarea>");
    textArea.attr("id", "note" + i);

    //-----------Save buttons----------------------//
    var myButton = $("<button>");
    myButton.attr("id", "saveNote" + i);
    myButton.attr("class", "saveBtn");
    myButton.attr("data-id", i);
    myButton.text("Save");

    row.append(timeBlock, textArea, myButton);
    container.append(row);
    $(".appendTo").append(container);
}
//--To save inserted text to local Storage after pressing save--//
$(".appendTo").on("click", ".saveBtn", function () {
    var notes = $("#note" + $(this).attr("data-id")).val();
    console.log(notes);
    localStorage.setItem("Note" + $(this).attr("data-id"), JSON.stringify(notes));
});
//----------For Clear Schedule button----------//
$("#clear").click(function () {
    localStorage.clear();
    location.reload();
});

//---To display text in text area after refreshing browser---//
localStorageReturnAndShowOnPage();

function localStorageReturnAndShowOnPage() {
    for (var j = 1; j < Notes.length + 1; j++) {
        var localStorageNote = JSON.parse(localStorage.getItem("Note" + j));

        if (localStorageNote !== null) {
            $("#note" + j).text(localStorageNote);
        }
    }
}