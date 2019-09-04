let fakeDataBase;

if(localStorage.getItem("todo2019"))
{
    fakeDataBase = JSON.parse(localStorage.getItem("todo2019"));
}
else{
    fakeDataBase = [];
}
 

let order = true;

_id("orderButton").addEventListener("click",changeOrder);

function changeOrder(){

    order = !order;
    renderFakeData();
}


renderFakeData();

function renderFakeData(){

  console.log(fakeDataBase);

    // skapa html från vår fakeDataBase
    let htmlOutput = fakeDataBase.map(function(taskObject,index){
        console.log(index);
        return `
            <div>
                <h1 id = "${index}">${taskObject.task} <sub>${taskObject.ready}</sub></h1>

                <button  onclick = "deleteTask(${index})">Delete</button>
                <button  onclick = "doneTask(${index})">DONE</button>
                </div>`;
    });   // end map

    if(order)
    {
        _id("taskList").innerHTML = htmlOutput.join("<hr>");
    }
    else
    {
        _id("taskList").innerHTML = htmlOutput.reverse().join("<hr>");
    }

}


// lyssna efter form-submit
_id("taskForm").addEventListener("submit", addTask);

function addTask(event){

    // Hindra formuläret att skickas till servern
    event.preventDefault();
 
    // hämta input-datan
     let inputText = _id("taskId").value;
    // skapa ett task-objekt
    if(inputText.trim() != "")
    {
        let taskObject = {id: Date.now() ,task:inputText, ready:false}
        // spara i fakeDataBase
        fakeDataBase.push(taskObject);
        
        // rendera på nytt
        renderFakeData();

          // spara lokalt
          saveLocal();
    }
    _id("taskId").value = "";
    _id("taskId").focus();
  
}


function deleteTask(index){

  fakeDataBase.splice(index,1);
  renderFakeData();
  // spara lokalt
  saveLocal();

}

function doneTask(index){

    fakeDataBase[index].ready = !fakeDataBase[index].ready;
    renderFakeData();
      // spara lokalt
      saveLocal();

}


function saveLocal()
{
    localStorage.setItem("todo2019",JSON.stringify(fakeDataBase));
}



// helpers

function _id(id){
    return document.getElementById(id);
}