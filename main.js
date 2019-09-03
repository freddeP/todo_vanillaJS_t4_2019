let fakeDataBase = [
    {id:1, task: "Gå och handla", ready:false},
    {id:2, task: "Gå och sporta", ready:false},
    {id:3, task: "Gå och håll någon i handen", ready:false}
];

let order = true;

_id("orderButton").addEventListener("click",changeOrder);

function changeOrder(){

    order = !order;
    renderFakeData();
}


renderFakeData();

function renderFakeData(){
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
    }
    _id("taskId").value = "";
    _id("taskId").focus();
  
}


function deleteTask(index){

  fakeDataBase.splice(index,1);
  renderFakeData();

}

function doneTask(index){

    fakeDataBase[index].ready = !fakeDataBase[index].ready;
    renderFakeData();


}



// helpers

function _id(id){
    return document.getElementById(id);
}