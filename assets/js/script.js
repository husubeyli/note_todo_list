let notes = [];

function toggleModal() {
  let modal = document.querySelector(".modal");
  modal.classList.toggle("active");
}

function addNote() {
  let messageVal = document.querySelector("#messageId");
  let message = messageVal.value.split("\n");
  let title1 = message.shift();
  let content1 = message.join(" ");
  // if(content1.length == 0){
  //   validateContent = title1.split(".");
  //   title1 = validateContent.shift();
  //   content1 = validateContent.join(' ')
  // }

  
  let payLoad = {
    title: title1,
    content: content1,
    status: "active"
  };
  toggleModal();
  if (title1.length == 0) {
    return;
  }
  //content hisse yazilmayanda title ayrica secilib bir hisse gotursun qalanida contentde duwsun ora

  notes.push(payLoad);
  messageVal.value = "";
  renderDOM('active');
}

function renderDOM(val) {
  document.querySelector(".todo-list").innerHTML = "";
  for (let i = 0; i < notes.length; i++) {

    if (notes[i].status == val){
      let list = document.createElement("li");
      list.classList.add("m-b-15");
      list.id = 'lists'
      list.dataset['index'] = i;
      list.setAttribute('onclick', `readList(${i})`);

      //bu funksiyada basili saxlayandan 3 saniye sora silmelidi buna bax
      // list.addEventListener('touchstart', touchStart)
      // list.addEventListener('touchend', touchEnd)


  
      let del = document.createElement("button");
      del.classList.add("btn", "btn-danger");
      del.id = 'btnDel'
      del.innerText = "Sil";
      del.setAttribute('onclick', `deleteItem(${i})`);
  
      let strong = document.createElement("strong");
      strong.classList.add("dblock", "text-600", "text-large");
      strong.innerText = notes[i].title;
  
      let paragpraph = document.createElement("p");
      paragpraph.classList.add("m-b-0", "m-t-20");
      paragpraph.innerText =
        notes[i].content.length > 100
          ? notes[i].content.slice(0, 100) + "..."
          : notes[i].content;
  
      list.append(strong);
      list.append(paragpraph);
      list.append(del);
      document.querySelector(".todo-list").append(list);
      
    }

  }
  document.querySelector('#notlar').innerText = 'NOTLAR'


  if (notes.length > 0) {
    if (document.querySelector("#empty"))
      document.querySelector("#empty").remove();
  }
}


// listin uzerine click elediyimiz zaman acib oxumaq
readList = function (indeks){
  if(event.target.type !== 'submit'){
    let title = document.createElement('h4')
    title.innerText = notes[indeks].title;
    let content = document.createElement('p');
    content.innerText = notes[indeks].content;
    document.querySelector('.todo-list').innerHTML = ''
    document.querySelector('.todo-list').append(title);
    document.querySelector('.todo-list').append(content);

  
  } 
  document.querySelector('#notlar').innerText = 'Geri qayıt'
}


//delete buttonin funksiyasi
function deleteItem(index) {
  
  if (notes[index].status == 'active') {
    notes[index].status = 'deleted'
  } else {
    let userAsk = confirm('Do you want clear or return in the list') // burda soruwuram ki list temiz silmek isteyirsiz yoxsa geri qaytarmaq isteyirsiz
    if(!userAsk){
      notes[index].status = 'active'
    }else {
      event.target.parentNode.remove()
      notes[index].status = ' '
    }
  }
  event.target.parentNode.remove()
  //uzerindeki ilk parent olan ilk lini sil
  // event.target.closest('li')
 
}

function changeTab(val){
    document.querySelector('#notlar').setAttribute('onclick', `renderDOM('${val}')`)
    
    renderDOM(val)
}


// UZERINE BASIB SAXLAMAQ UCUN LAZIM OLAN FUNCKSIYALAR

// let timer = false;
// let duration = 3000;
// function touchStart(){
//   if(!timer){
//     timer = setTimeout(deleteItem, duration)
//   }
// }
// function touchEnd(){
//   if(timer){
//       clearTimeout(timer)
//       timer = false;
//   }
// }


// asagida yerlesen hamisi ve silinenlere klik elediyimiz zaman uzerindeki renglerin yerlerini deyismesi
document.querySelectorAll('.toolbar-nav > li > button').forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll('.toolbar-nav > li').forEach(item => {
      item.classList.remove('active')
    })
   item.parentNode.classList.add('active')

    
  })
})

renderDOM('active');
