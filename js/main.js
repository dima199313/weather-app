
const getData = (url) =>
new Promise((resolve, reject) =>
fetch(url)
.then((response) => response.json())
.then((json) => resolve(json))
.catch((error) => reject(error))
);


//Получаем значение из формы
const form = document.querySelector('.input-group');
const input = document.querySelector('.form-control');



//Слушаю отправку формы
form.addEventListener('submit', (event) => {
    //отменяем отправку формы
    event.preventDefault();
    
    //берем значение инпута, обрезаем пробелы
    let sity = input.value.trim()
    console.log(sity)

    
    
    
    //делаем запрос
    const apiKey = '08550d828c9c40a98f150231241601';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${sity}`;
    getData(url)
      .then((data) =>{
        //отображение на странице
        const html = `
        <section class="card">
        <div class="container">
          <div class="card-item">
            <div class="card__row-1">
              <div class="card__sity">
                <p class="sity">${data.location.name}</p>
              </div>
              <div class="card__bage">
                <p class="bage">${data.location.country}</p>
              </div>
            </div>

            <div class="card__row-2">
              <div class="card__show-item">
                <div class="card__show-p">
                  <p class="status">${data.current.condition.text}</p>
                </div>
                <div class="card__show-img">
                  <img src="${data.current.condition.icon}" width="120px" alt="status">
                </div>
              </div>
              <div class="card__temperature">
                <p class="temperature-p">${String(Math.trunc(data.current.temp_c)) + '°'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
        `

        cardRemove()

        //добавление кода на страницу
        appendHtml(html)


        //Очистка формы
        input.value = ''
      })
      .catch((error) => {
        cardRemove()
        console.log(error)
        createMessageError(error.message)
      });
});

function cardRemove(){
  const card = document.querySelector('.card')
  if(card) document.querySelector('.card').remove()
}

function createMessageError(error){
  let errorHTML = `
  <section class="card">
  <div class="container">
    <div class="card-item">
      Ошибка типа: невозможно прочитать свойства неопределенного значения (чтение «имя») <br>
      ${error}
    </div>
  </div>
</section>
  `
//добавление кода на страницу
appendHtml(errorHTML)
}

function appendHtml(html) {
  document.querySelector('.title').insertAdjacentHTML('afterend', html)
}