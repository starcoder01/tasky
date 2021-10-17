const taskContainer = document.querySelector(".task__container");
let globalStore = [];
const generateNewCard = (taskData) =>
  `<div class="col-sm-12 col-md-6 col-lg-4">
    <div class="card border border-primary">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success">
          <i class="fas fa-pen text-success"></i>
        </button>

        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)">
          <i class="fas fa-trash-alt text-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i>
        </button>
      </div>
      <div class="card-body">
        <img src=${taskData.imageUrl} alt="image1" class="card-img-top">
        <h5 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-primary">${taskData.taskType}</a>
      </div>
  </div>`;
;

const loadInitialCardData = () => {
    //Local storage to get tasky card data
    const getCardData = localStorage.getItem("tasky");

    //Convert to normal object
    const {cards}=JSON.parse(getCardData);

    //loop over those array of task object to create HTML card, inject it to document
    cards.map((cardObject) => {
      taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
      globalStore.push(cardObject);
    });
    //update globalStore
}

//Delete function
const deleteCard = (event) =>{
  event= window.event;
  const targetID = event.target.id;
  const tagname=event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

  if(tagname==="BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value
  };
  console.log(taskData);

  taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));

  globalStore.push(taskData);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};
//Issues
//Page refresh causes data to get deleted
//API:Application Proramming Interface
//local storage:Accessing application via local storage
//Interface means a middle man
