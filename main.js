
function generateRandomId() {
    return Math.floor(Math.random() * Date.now());
}

function minsToHours(min) {
    if (min > 59) {
        dec = (min / 60) % 1;
        hoursToAdd = Math.floor(min / 60);
        minsToAdd = Math.floor(dec * 60);
        return [hoursToAdd, minsToAdd]
    }
    else return [0, min]
}

//New Topic Form Data Handling Logic
let tooltipflag = false;
let form = document.querySelector("#form");
const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

let addTopicModal = new bootstrap.Modal(document.getElementById("staticBackdrop"))

//New Topic Form Data Handling Logic
function handleForm(event) {
    event.preventDefault();
    let fd = new FormData(form)
    let mins = Number(fd.get("duration"))
    console.log(mins)
    let correctedHoursMins = minsToHours(mins);
    console.log(correctedHoursMins)
    fd.set("id", generateRandomId())
    fd.set("hours",correctedHoursMins[0]);
    fd.set("mins", correctedHoursMins[1])
    fd.set("duration",`${fd.get("hours").padStart(2, "0")} Hours ${fd.get("mins").padStart(2, "0")} Minutes`)
    fd.set("status", true)
    let table = document.getElementById("table-body")
    table.innerHTML += `<tr class="show" id="${fd.get("id")}">
                <td><input type="checkbox" class="row-ckbx" /></td>
                <td>${fd.get("topic")}</td>
                <td>${fd.get("hours").padStart(2, "0")} Hours ${fd.get("mins").padStart(2, "0")} Minutes</td>
                <td><a href="${fd.get("link")}"> ${fd.get("link")} </td>
               <td><div class="d-grid gap-2"><button type="button" class="btn btn-outline-danger delete" data-bs-toggle="modal"
                                data-bs-target="#confirmDeletion" onClick="delRow(event)">Delete</button><button type="button"
                                class="btn btn-outline-warning edit" data-bs-toggle="modal"
                                data-bs-target="#editForm" onclick="editRow(event)">Edit</button>
                                </div>
                                </td>
                                </tr>`;
    const newRow = document.getElementById(`${fd.get("id")}`)
    observeClassChange(newRow)
    editAll();
    checkBoxChecking();
    addTopicModal.hide();
    handleFormData(fd,false);
    toastBootstrap.show()

}




form.addEventListener('submit', handleForm);

let view = document.getElementById("view")

function trimStr(e){
    e.target.value = e.target.value.trim();
}


//A utility function for changing the view and updating the UI to show proper data.
function viewChanger() {
    if (view.value == "show") {
        let toHide = document.getElementsByClassName("hide")
        for (const i of toHide) {
            i.style.display = "none"
        }
        let toShow = document.getElementsByClassName("show")
        for (const i of toShow) {
            i.style.display = "table-row"
        }
        document.getElementById("view-toggle").innerText = "Hide";
        document.getElementById("btn-add").style.display = "table-row";
        uncheck();

    }
    if (view.value == "hide") {
        let toHide = document.getElementsByClassName("show")
        for (const i of toHide) {
            i.style.display = "none"
        }
        let toShow = document.getElementsByClassName("hide")
        for (const i of toShow) {
            i.style.display = "table-row"
        }
        document.getElementById("view-toggle").innerText = "Show";
        document.getElementById("btn-add").style.display = "none";
        uncheck();
    }

}
viewChanger()
view.addEventListener("change", viewChanger)

//A utility function that unchecks the checkboxes on UI Update
function uncheck() {
    let rows = document.getElementsByClassName("row-ckbx");
    for (const i of rows) {
        i.checked = false;
    }
    document.getElementById("master-ckbx").checked = false;
}


//This function returns an array containing the checked rows w.r.t. view.
function toChange(view) {
    let toHide = []
    if (view == "show") {
        let rows = document.getElementsByClassName("show");

        for (const i of rows) {
            if (i.children[0].children[0].checked) toHide.push(i);
        }
    }
    if (view == "hide") {
        let rows = document.getElementsByClassName("hide");

        for (const i of rows) {
            if (i.children[0].children[0].checked) toHide.push(i);
        }
    }
    return toHide
}

//This button triggers the change of classes and UI update.
let viewBtn = document.getElementById("view-toggle")
viewBtn.addEventListener("click", () => {

    if (view.value == "show") {
        //debugger;
        let rows = document.getElementsByClassName("show")
        let toHide = toChange("show");
        for (const i of toHide) {
            i?.classList?.replace("show", "hide")
        }
        uncheck();
        viewChanger();
    }
    if (view.value == "hide") {
        let rows = document.getElementsByClassName("hide")
        let toHide = toChange("hide");
        for (const i of toHide) {
            i.classList.replace("hide", "show")
        }
        uncheck();
        viewChanger();
    }

})


//Logic for master Checkbox which when checked checks all the checkboxes in the view.
let masterCheck = document.getElementById("master-ckbx")

masterCheck.addEventListener("change", () => {
    if (view.value == "show") {
        let rows = document.getElementsByClassName("show")
        for (const i of rows) {
            i.children[0].children[0].checked = masterCheck.checked;
        }
    }
    if (view.value == "hide") {
        let rows = document.getElementsByClassName("hide")
        for (const i of rows) {
            console.log(masterCheck.checked)
            i.children[0].children[0].checked = masterCheck.checked;
        }
    }
})




//Checkbox Errors Solution:
let ckbxs = document.getElementsByClassName("row-ckbx")

function checkBoxChecking(){

    for (const ckbx of ckbxs) {
        ckbx.addEventListener("change", () => {
            let row_ckbx = document.getElementsByClassName("row-ckbx");
            console.log(row_ckbx[0].parentElement.parentElement.classList.value)
            let check = true;
            for (const i of row_ckbx) {
                if (check && i.parentElement.parentElement.classList.value == "show" && view.value == "show" && i.checked) {
                    console.log(check);
                } else if (check && i.parentElement.parentElement.classList.value == "hide" && view.value == "hide" && i.checked) {
                    console.log(check);
                } else if (i.parentElement.parentElement.classList.value == "show" && view.value == "hide") console.log(check);
                else if (i.parentElement.parentElement.classList.value == "hide" && view.value == "show") console.log(check);
                else check = false;
            }
            if (check) {
                masterCheck.checked = true;
            }
            else masterCheck.checked = false;
        })
    }
}
checkBoxChecking();

//Deleting a Row:
let rowToDelete = document.getElementsByClassName("delete");


let eVar = null;

function delRow(e) {
    document.getElementById("btn-confirm-delete").addEventListener("click", () => {
        e.target.parentElement.parentElement.parentElement.remove()
        console.log(e)
        handleDelete(e.target.parentElement.parentElement.parentElement);
    })
}


for (const del of rowToDelete) {
    let row = del;
    del.addEventListener("click", (e) => {
        document.getElementById("btn-confirm-delete").addEventListener("click", () => {
            row.parentElement.parentElement.parentElement.remove()
        })
    })
}



// The following code implements the Edit Row Logic:

let editBtn = document.getElementsByClassName("edit")
let currRow = null;


function editRow(e) {
    let row = e.target.parentElement.parentElement.parentElement
    let topic = row.children[1].innerText;
    let hours = Number(row.children[2].innerText.split(" ")[0]);
    let mins = Number(row.children[2].innerText.split(" ")[2]);
    let link = row.children[3].innerText;
    let editForm = document.getElementById("edit-form-body").children
    editForm[1].value = topic;
    editForm[3].value = hours*60 + mins;
    editForm[5].value = link;
    currRow = row;
    
   
}

function editAll(){
    
    for (const edit of editBtn) {
        edit.addEventListener("click", editRow);
    }
}
editAll();

let editForm = document.getElementById("formEdit");

const editToast = document.getElementById('editToast')
const editToastBootstrap = bootstrap.Toast.getOrCreateInstance(editToast)

let editFormModal = new bootstrap.Modal(document.getElementById("editForm"));
let link = null;
editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let ef = new FormData(editForm);
    let mins = ef.get("duration")
    let correctedHoursMins = minsToHours(mins);
    ef.set("hours", correctedHoursMins[0]);
    ef.set("mins", correctedHoursMins[1])
    currRow.children[1].innerText = ef.get("topic");
    currRow.children[2].innerText = `${ef.get("hours").padStart(2, "0")} Hours ${ef.get("mins").padStart(2, "0")} Minutes`;
    link = currRow.children[3]
    currRow.children[3].children[0].href = ef.get("link");
    currRow.children[3].children[0].innerText = ef.get("link")
    editToastFlag = true;
    if(currRow.classList[0] == "show") ef.set("status",true);
    else if(currRow.classList[0] == "hide") ef.set("status",false);
    ef.set("id", currRow.id)
    ef.set("duration",`${ef.get("hours").padStart(2, "0")} Hours ${ef.get("mins").padStart(2, "0")} Minutes`);
    handleFormData(ef,true);
    editFormModal.hide();
    editToastBootstrap.show()

})




// All API Handling Code is here:



// A function to Handle POST API calls i.e. when ever a new topic/row is added in the ui
// This function gets called and executes and sends data to Server
async function handleFormData(formData, updateData) {
    // Creating a new object to hold the form data
    const data = {
        Topic: formData.get('topic'),
        Duration: formData.get('duration'),
        Link: formData.get('link'),
        Id: formData.get("id"),
        Status: formData.get("status")
    };

    const url = 'http://localhost:3000/api/topics';
    const method = updateData ? 'PUT' : 'POST';
    console.log(data)
    await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Handling success
    })
    .catch(error => {
        console.error('Error:', error); // Handling error
    });
}

async function handleDelete(row){
    const id = row.id;
    console.log(id)
    const url = `http://localhost:3000/api/topics/${id}`;
    await fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function loadTopics() {
    try {
        const response = await fetch('http://localhost:3000/api/topics');
        const topics = await response.json();
        
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = ''; 

        topics.forEach(topic => {
            const row = document.createElement('tr');
            console.log(topic)
            console.log(topic.status)
            row.className = (topic.status)? 'show': 'hide';
            row.id = topic.id;

            row.innerHTML = `
                <td><input type="checkbox" class="row-ckbx" /></td>
                <td>${topic.topic}</td>
                <td>${topic.duration}</td>
                <td><a href="${topic.link}" target="_blank">${topic.link}</a></td>
                <td>
                    <div class="d-grid gap-2">
                        <button type="button" class="btn btn-outline-danger delete" data-bs-toggle="modal"
                            data-bs-target="#confirmDeletion" onClick="delRow(event)">Delete</button>
                        <button type="button" class="btn btn-outline-warning edit" data-bs-toggle="modal"
                            data-bs-target="#editForm" onClick="editRow(event)">Edit</button>
                    </div>
                </td>
            `;
            observeClassChange(row);
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading topics:', error);
    } finally {
        viewChanger();
        checkBoxChecking();
    }
}

// Call loadTopics when the page loads
document.addEventListener('DOMContentLoaded', loadTopics);

// Function to handle class change
function handleClassChange(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target;
            console.log('Class changed for', target);
            const newClass = target.className;
            if(newClass == "hide") statusChange(target.id,false)
            else if(newClass == "show") statusChange(target.id,true)
        }
    }
}

// Function to observe class changes on a specific element
function observeClassChange(element) {
    const observer = new MutationObserver(handleClassChange);
    observer.observe(element, { attributes: true, attributeFilter: ['class'] });
}

// Function to observe all rows
function observeAllRows() {
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => observeClassChange(row));
}
async function statusChange(rowId, newStatus) {
    try {
        const response = await fetch('http://localhost:3000/api/topics/status', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: rowId, status: newStatus })
        });

        if (!response.ok) {
            throw new Error('Failed to update status');
        }

        const updatedTopic = await response.json();
        console.log('Status updated:', updatedTopic);
    } catch (error) {
        console.error('Error updating status:', error);
    }
}