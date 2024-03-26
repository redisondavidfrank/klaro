//unique API key
const apiKey = "eb7a6afd-dd93-4675-99a8-e4168cb34a65";
// URL where all my comment information is stored:
//project-1-api.herokuapp.com/?api_key=eb7a6afd-dd93-4675-99a8-e4168cb34a65

//Function start for my default comments
function displayComments(arr) {
  //Used DOM  API to connect my JS to my HTML with the empty div I created
  let commentContainer = document.querySelector(".comment__default-comment");
  commentContainer.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    //changes ms to actual date
    let m = new Date(arr[i]["timestamp"]);
    let dateString =
      m.getUTCMonth() + 1 + "/" + m.getUTCDate() + "/" + m.getUTCFullYear();

    //Div that holds all of my default comment content
    let defaultContainer = document.createElement("div");
    defaultContainer.classList.add("comment__default");
    commentContainer.appendChild(defaultContainer);

    //image container
    let imageContainer = document.createElement("div");
    imageContainer.classList.add("comment__image-container-one");
    defaultContainer.appendChild(imageContainer);

    // div that holds my header elements of my default comments
    let headerContainer = document.createElement("div");
    headerContainer.classList.add("comment__header");
    defaultContainer.appendChild(headerContainer);

    //image
    let image = document.createElement("div");
    image.classList.add("comment__header--image-one");
    imageContainer.appendChild(image);

    //name
    let name = document.createElement("h2");
    name.classList.add("comment__header--name");
    name.innerText = arr[i]["name"];
    headerContainer.appendChild(name);

    //date
    let date = document.createElement("h3");
    date.classList.add("comment__header--date");
    date.innerText = dateString;
    headerContainer.appendChild(date);

    //comment container
    let textContainer = document.createElement("div");
    textContainer.classList.add("comment__text-container-default");
    defaultContainer.appendChild(textContainer);

    //comment
    let comment = document.createElement("p");
    comment.classList.add("comment__text-container-default--comment");
    comment.innerText = arr[i]["comment"];
    textContainer.appendChild(comment);

    //delete button container
    let deleteButtonContainer = document.createElement("div");
    deleteButtonContainer.classList.add("comment__delete-button-container");
    defaultContainer.appendChild(deleteButtonContainer);

    //delete
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("comment__delete-button");
    deleteButton.addEventListener("click", event => {
      let varId = event.target.id;
      deleteComment(varId);
    });
    deleteButton.id = arr[i]["id"];
    deleteButton.innerText = "Remove";
    deleteButtonContainer.appendChild(deleteButton);
  }
}

//use Dom APi to get access to the form in html
const form = document.querySelector(".comment__input-container");

//attach an event listener on the form of type submit in order to create new comments
form.addEventListener("submit", submitEvent => {
  //prevents page form reloading upon clicking submit button
  submitEvent.preventDefault();

  //Post Comments
  let newAdd = axios.post(
    "https://project-1-api.herokuapp.com/comments?api_key=eb7a6afd-dd93-4675-99a8-e4168cb34a65",
    {
      name: submitEvent.target.name.value,
      comment: submitEvent.target.comment.value
    }
  );

  newAdd.then(() => {
    //Get Comments
    getComments();
  });

  //clears my input from the entry fields
  let clearInput = document.querySelector(".comment__input-container");
  clearInput.reset();
});

// function to get comments
function getComments() {
  axios
    .get(
      "https://project-1-api.herokuapp.com/comments?api_key=eb7a6afd-dd93-4675-99a8-e4168cb34a65"
    )
    .then(response => {
      displayComments(
        response.data.sort(function(a, b) {
          return b.timestamp - a.timestamp;
        })
      );
    });
}

//Get Comments
getComments();

//Delete Comments
function deleteComment(id) {
  axios
    .delete(
      `https://project-1-api.herokuapp.com/comments/${id}?api_key=eb7a6afd-dd93-4675-99a8-e4168cb34a65`
    )
    .then(response => {
      getComments();
    });
}
