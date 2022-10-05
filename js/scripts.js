const gallery = document.getElementById('gallery');
const h = document.querySelector("h2");
const form = document.querySelector('form');

//Targeted info("https://randomuser.me/api/?results=12&inc=name,email,location,phone,dob,nat=&nat=US")
//Fetch Functions
fetch("https://randomuser.me/api/?results=12&nat=us")
    .then((response) => response.json())
    .then((data) => generateImage(data.results))

//Get & Display 12 Random Users
function generateImage(result) {
    //console.log(result)
    let card;
    
    result.forEach((result, index) => {
        card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="card-img-container">
            <img class="card-img" src="${result.picture.medium}" alt="${result.name.first}">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${result.name.first} ${result.name.last} </h3>
            <p class="card-text">${result.email}</p>
            <p class="card-text cap">${result.location.city}, ${result.location.state}</p> 
        </div>`

        gallery.insertAdjacentElement('beforeend', card);
        
        card.addEventListener("click", (e) => {
            displayModal(result, index)
        })
    })
}

function displayModal(card, index) {
    //console.log(card, index);

    let modalContainer = document.createElement("div");
    modalContainer.className = 'modal-container';

    gallery.appendChild(modalContainer);
   
    //Stored the card.dob.date in a new variables. Worked with the split() method to format the date of birth  
    let output = card?.dob?.date.split("T")[0].split("-");
    let year = output[0];
    let month = output[1];
    let day = output[2]

    //Created A Modal Window
    modalContainer.innerHTML = `
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${card?.picture?.medium}" alt="${card?.name?.first}">
                        <h3 id="name" class="modal-name cap">${card?.name?.first} ${card?.name?.last}</h3>
                        <p class="modal-text">${card?.email}</p>
                        <p class="modal-text cap">${card?.location?.city}</p>
                        <hr>
                        <p class="modal-text">${card?.phone}</p>
                        <p class="modal-text">${card?.location?.street?.number}, ${card?.location?.street?.name}, ${card?.location?.city}, ${card?.location?.state} ${card?.location?.postcode}</p>
                        <p class="modal-text">Birthday: ${month}/${day}/${year}</p>
                    </div>
                </div
    `
/* Created an eventListener to listen for clicks specfically engaging the X button and not allowing clicks elsewhere on the screen. Checked if the e.target's tagName was equal to "STRONG" then gallery.removeChild(gallery.lastElementChild) because the modal is appended as the last element of the gallery div. */

    modalContainer.addEventListener("click", (e) => {
        if(e.target.tagName === 'STRONG'){
            gallery.removeChild(gallery.lastElementChild);
        }
    })
}
