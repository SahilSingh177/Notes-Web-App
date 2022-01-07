console.log('Welcome to magic notes app');
showNotes();

// If user adds a note, add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj={
        title: addTitle.value,
        text: addTxt.value
    }

    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
})

// Showing notes from the localStorage in the saved notes section
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += ` 
        <div class="noteCard my-2 mx-3 card" style="width: 18rem;">
        <div class="container-fluid card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text" id='${index}'>${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            <!--<button id="${index}" onclick="editNote(this.id)" class="btn btn-primary">Edit Note</button>-->
        </div>
     </div> `
        //  this.id is used to give the id of that particular element
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<div class="alert alert-primary" role="alert style="width: 18rem;">
        No note found.Please enter a note above
      </div>`
    }
}

//function for  Deleting notes
function deleteNote(index) {
    console.log('Deleting note', Number(index) + 1);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// Function for searching notes
search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    // we did tolowercase so that even if word is typed in capital it shows the result.
    console.log('Input event activated!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
        // Here style.display is used for displaying the element,if it is block it is showed and if it's none it is not shown.  
    })
})

// // Edit function - Work on this
// function editNote(index) {
//     let editTxt = document.getElementsByTagName('p');
//     let edit= editTxt[index];
//     let mouseoverevent=edit.addEventListener('mouseover',function(){
//         let html=editTxt[index].innerHTML;
//         edit=`<textarea class="textarea form-control" id='textarea' rows='3'>${html}</textarea>`
//         editTxt[index].innerText=edit.innerText
//         console.log(html)
//     })
// };
// try to add title to the notes and also user based system

// To DOs
// Add Edit function
// Add Date and Time of note