$(document).ready(function () {// essentially tells engine to load 1)html & 2)css first.

    //Assign saveBtn click listener for user input and time stamp??
    $(".saveBtn").on("click", function () {
        //get nearby values.
        console.log(this);
        var text = $(this).siblings(".description").val();
        var time = $(this).parent().attr("id");

        //set items in local storage.
        localStorage.setItem(time, text);
    })
    //load any saved data from LocalStorage - do this for each hour created.
    $("#note1 .description").val(localStorage.getItem("note1"));
    $("#note2 .description").val(localStorage.getItem("note2"));
    $("#note3 .description").val(localStorage.getItem("note3"));
    $("#note4 .description").val(localStorage.getItem("note4"));
    $("#note5 .description").val(localStorage.getItem("note5"));
    $("#note6 .description").val(localStorage.getItem("note6"));


    function noteTracker() {

        // loop over time blocks
        $(".note-block").each(function () {
            var blockHour = parseInt($(this).attr("id").split("hour")[1]);
            console.log(blockHour)

            //check if we've moved past this time
            if (blockHour) {
                $(this).addClass("past");
                $(this).removeClass("future");
                $(this).removeClass("present");
            }
            else if (blockHour) {
                $(this).removeClass("past");
                $(this).addClass("present");
                $(this).removeClass("future");
            }
            else {
                $(this).removeClass("present");
                $(this).removeClass("past");
                $(this).addClass("future");
            }
        })
    }
    noteTracker();
})

// //----------For Clear Schedule button----------//
$("#clear").click(function () {
    localStorage.clear();
    location.reload();
});
