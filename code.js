// класс создания item в которое есть цвет и название дел
//стоит добавить дату
class ItemDeal {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

//итак, у нас есть класс, который  может создавать нам объекты с цветом и текстом дела



//здесь мы задаем массив с фразами, которые должны нас мотивировать
let motivation_array = ['К черту все! Берись и делай!',
  'Если ты не знаешь, чего хочешь, ты в итоге останешься с тем, чего точно не хочешь',
  'Все победы начинаются с победы над самим собой',
  'Это своего рода забава, делать невозможное', 'Неважно, кто мы такие, важно, какой у нас план'];



let select = document.querySelector('#important');
//в этом элементе мы получаем значение о важности данного дела
let field = document.querySelector('input');
//здесь мы получаем само значение дела ( "помыть посуду", "постирать  белье и т.д.")
let button = document.querySelector('.button_plus');
//кнопка, при клике на которую  у нас случается событие добавления
let deals = document.querySelector('.deals');
//наш 'root' в который у нас будут добавляться дела 



// итак, я хочу задавать в зависимости от важности цвет моего дела
// has-text-danger -- те которые нужно выполнить как можно скорее
// has-text-warning - со второй  сложностью
// has-text-info - имеют класс c третьей сложностью


var IA = ['first-danger', 'second-danger', 'third-danger'];

// и различные анимации удаления (Это просто так)

var Animation_Array = ["bounceOut", "rollOut", "rotateOut", "lightSpeedOut"];

function GR() {
  return Math.ceil(Math.random() * (3));
}
console.log(GR());


// Здесь у нас модуль в котором происходит прорисовка to-doшечек из версии
(function DrawOnLoad() {
  for (var i = 0; i < localStorage.length; i++) {
    var y = localStorage.key(i);
    let second = localStorage.getItem(y);
    let third  = JSON.parse(second);
    console.log(third);
    console.log(third.color);
    deals.insertAdjacentHTML('afterbegin', `<div class='wrap-task'><div class="task is-size-4 ${IA[third.color]}"><p>${third.name}</p></div>
      <span class="icon is-large tr">
      <i class="fas fa-trash-alt trash"></i>
      </span>
      </div>`);
    field.value = '';
  }
})();





//функция создания нового to-do
function createItem() {

  let text = field.value;
  if (!text) {
    return;
    //return сразу прекращает выполнение функции
  }
  let item = new ItemDeal(`${text}`, `${select.value - 1}`);
  let N = item.name;
  let myJson = JSON.stringify(item);
  localStorage.setItem(N, myJson);
  deals.insertAdjacentHTML('afterbegin', `<div class='wrap-task animated zoomInLeft'><div class="task is-size-4 ${IA[select.value - 1]}"><p>${text}</p></div>
  <span class="icon is-large tr">
  <i class="fas fa-trash-alt trash"></i>
  </span>
</div>`);
  field.value = '';
}



button.onclick = () => {
  createItem();
  //здесь создается item. Но что-то мне подсказывает, что можно было переписать куда короче
}

document.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    createItem();
  }
});



// удаление элемента
deals.addEventListener('click', function (event) {
  let item = event.target.closest('i');
  let item2 = event.target.closest('.wrap-task');

  if (!item || !deals.contains(item)) {
    return;
  }

  item2.className = `animated ${Animation_Array[GR()]} wrap-task`;
  setTimeout(function () {
    item2.parentNode.removeChild(item2);
    let x = item2.textContent;
    x = x.trim();
    //трим вырезает лишние пробелы
    console.log(x);
    localStorage.removeItem(x);
  }, 700)
});



// здесь у нас происходит смена цитат
function changePhrase() {
  document.querySelector('.MotSpeech').innerHTML = motivation_array[Math.round(Math.random() * (motivation_array.length - 1))];
  document.querySelector('.MotSpeech').className = "MotSpeech anime";
}
//запуск смены фраз;
setInterval(changePhrase, 8000);


