/* Assigns variables */
let currentDay = $("#currentDay")
let timeTable = $("#timeTable")
let time = moment().format("H")
let storedData = []

/* Print current date */
currentDay.text(moment().format("dddd, MMMM, Do, YYYY"))

function readData(){
    /* Read data from local storage */
    storedData = JSON.parse(localStorage.getItem("dataStore"))
}

// Reads data from localstorage
readData()

/* Prints timetable */
for (let hour = 8; hour <= 17; hour ++){
/* Variable declarations */
let row = $("<div></div>"); 
let hourItem = $("<div></div>")
let inputField = $("<input></input>")
let saveButton = $("<button></button>")
let saveButtonIcon = $("<i>")

/* Attribute/class definitions for variables */
row.attr("class", "row")
hourItem.text(hour).attr("class", "col-md-2 hour")
inputField.attr("class", "textarea").attr("class", "col-md-8").attr("id", hour)
/* Error handling when storedData is empty */
try{
    inputField.attr("value", storedData[hour])
}
catch{}

saveButton.attr("class", "saveBtn col-md-2 fa fa-save").attr("id", hour)
saveButtonIcon.attr("class", "fa").attr("style", "font-size:48px").text("&#xf0c7;")

/* Appending of item */
row.append(hourItem)
row.append(inputField)
row.append(saveButton)
timeTable.append(row)

/* Add colour to rows */

/* If thime has passed */
if (hour < time){
    row.addClass("past")
}
// If it is the current time
else if (hour == time){
    row.addClass("present")
}

// If it is in the future
else{
    row.addClass("future")
}

}

// Button press event
$("button").on("click", function (){

    // Gets id of the time
    let id = $(this).attr("id")

    // Gets input text value
    let inputText = $(this).siblings("input").val()

    // Assigns it to an object, if id was already used, it overwrites it.
    Object.assign(storedData, {[id]: inputText})

    // Saves it to local storage
    localStorage.setItem("dataStore", JSON.stringify(storedData))
})
