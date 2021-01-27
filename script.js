const form=document.querySelector('form');
const inputxt=document.querySelector('#txtTaskName');
const ul=document.querySelector('#taskList');
const btnDeleteAll=document.querySelector('#btnDeleteAll');

let tasks;
eventsLists();
loadTask();
function eventsLists(){
  form.addEventListener('submit',addTask);
  btnDeleteAll.addEventListener('click',deleteAll);
  ul.addEventListener('click',deleteTask)
};
function loadTask(){
  tasks=getFromLs();
  tasks.forEach(function(item){
    createItem(item);
  })
};

//get item local staorage
function getFromLs(){
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;// Bir array gonderir
};


//set item to local storage

function setToItemLs(text){
tasks=getFromLs();
tasks.push(text);
localStorage.setItem('tasks',JSON.stringify(tasks));
}

///delete item from lacal storage
function deleteFromLs(text){
  tasks= getFromLs();
  tasks.forEach(function(item,index){
      if(item===text){
      tasks.splice(index,1);
      };
  });
 localStorage.setItem('tasks',JSON.stringify(tasks));
  
}


function createItem(text){
   //create li
 var li=document.createElement('li');
 li.className='list-group-item list-group-item-secondary';
 //create a
 var a=document.createElement('a');
 a.className='list-group-link text-decoration-none';
 a.setAttribute('href','#');
 // create i
 var i=document.createElement('i');
 i.className='fas fa-times float-right';
 //append childs
 a.appendChild(document.createTextNode(text));
 li.appendChild(a);
 li.appendChild(i);
 ul.appendChild(li);
};



//Form EVENT add task
function addTask(e){
  if(inputxt.value===''){
    alert('Lutfen birseyler yazin');
  } else{
    createItem(inputxt.value);
    setToItemLs(inputxt.value);
    inputxt.value='';
  };
    e.preventDefault();
};



//DELETE ALL
function deleteAll(w){
  if(confirm('Hepsini silmek istermisinz?')){
    ul.innerHTML=" "
  };
  localStorage.clear();
  w.preventDefault();
};


//DELETE TASK
function deleteTask(k){
if(k.target.className==='fas fa-times float-right'&&confirm('Bu taski silmek istermisinz')){
  if(k.target.className==='fas fa-times float-right'){
    k.target.parentElement.remove();
    deleteFromLs(k.target.parentElement.textContent);
    }
  }
 
}