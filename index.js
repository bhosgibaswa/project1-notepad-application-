showNotes();
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }

    let myObj = {
        title : addtitle.value,
        text :addtxt.value,
    }

    notesobj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    addtitle.value="";
    console.log(notesobj);
    showNotes();
});

function showNotes(){
    let notes = localStorage.getItem("notes");
   
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
 <div class="notecard my-2 mx-2 card" style="width: 18rem; ">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1} : ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
        </div>
      </div>`;
    });

    let notesElm = document.getElementById("notes");
    if (notesobj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show use "Add Note" section above to add notes `
    }

}

function deleteNote(index) {
    console.log("iam deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showNotes();
}



let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {

    let inputval = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard")
    Array.from(noteCards).forEach(function (element) {
        let cardtxt = element.getElementByTagName("p")[0].innerText;
        if (cardtxt.includes(inputval)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})