// Front
const formReq = document.querySelector('#formReq');
const formSignUp = document.querySelector('#signUpForm');
const formSignIn = document.querySelector('#signInForm');

// const favorits = document.querySelectorAll('.favorit');

const my_collection = document.querySelector('#my_collection');

// TODO: my_collection btn logics
my_collection?.addEventListener('click', async (e) => {
  e.preventDefault();
  // console.log(e.target);
  try {
    const responce = await fetch('/private/collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: 'Collection' }),
    });
    const result = await responce.json();
    showMyCollection(result);
    // result.forEach((el) => console.log(el.urls_thumb, el.alt_description));
    // console.log(result);
  } catch (err) {
    console.log('Не могу отправить запрос на колекцию', err);
  }
});

document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('favorit')) {
    const el = e.target;
    const parentEl = el.parentNode.parentNode;
    const firstChilde = parentEl.firstElementChild;
    const nextEl = firstChilde.nextElementSibling.firstElementChild;
    const dataObj = {
      alt_description: firstChilde.alt,
      urls_thumb: firstChilde.src,
      href: nextEl.href,
    };
    // console.log(parentEl);
    // console.log(dataObj);
    try {
      const responce = await fetch('/private', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj),
      });
      const result = await responce.status;
      console.log(result);
    } catch (err) {
      console.log('Не могу отправить запрос на добавление в мою коллекцию', err);
    }
  }
  if (e.target.classList.contains('closes')) {
    const elCloses = e.target;
    const parentEl = elCloses.parentNode.parentNode;
    const firstChilde = parentEl.firstElementChild;
    const nextEl = firstChilde.nextElementSibling.firstElementChild;
    const dataObj = {
      alt_description: firstChilde.alt,
      urls_thumb: firstChilde.src,
      href: nextEl.href,
    };
    // console.log(dataObj);
    try {
      // console.log('In fetch');
      const responce = await fetch('/private', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj),
      });
      // console.log('Out fetch');
      const result = await responce.status;
      if (result === 200) {
        parentEl.parentNode.removeChild(parentEl);
      }
      console.log(result);
    } catch (err) {
      console.log('Не могу отправить запрос на удаление с коллекции', err);
    }
  }
});

// TODO: Form SignIn
formSignIn?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(formSignIn));
  try {
    const responce = await fetch('/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log('SUCCESS Данные на формы входы отправлены-->>', data);
    formSignIn.reset();
    const result = await responce.status;
    console.log(result);
    // TODO: Дописать правильный роут на Privet
    if (result === 200) window.location.href = '/private';
    if (result === 401) window.location.href = '/auth/signup';
  } catch (error) {
    console.log('message error formSignIn --->> ', error);
  }
});

// TODO: Form SignUp
formSignUp?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(formSignUp));
  try {
    console.log('hit search --> ', data);
    const responce = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log('SUCCESS Данные на регистрацию отправлены-->>', data);
    formSignUp.reset();
    const result = await responce.status;
    if (result === 200) {
      // TODO: Дописать правильный роут на Privet
      window.location.href = '/private';
    }
    console.log(result);
  } catch (error) {
    console.log('message error --->> ', error);
  }
});

formReq?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(formReq));
  try {
    console.log('hit search --> ', data.userRequest);
    const responce = await fetch('/api/searchTerms', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await responce.json();
    // console.log('i am res', res);
    showData(res);
  } catch (error) {
    console.log('message error --->> ', error);
  }
  // console.log(data);
});

function showData(res) {
  const displayRes = document.querySelector('#masonry');
  // displayRes.classList.remove('displayRess2');
  // displayRes.classList.add('displayRess');
  let html = '';
  // console.log('Res->', res.response.results);
  res.response.results.forEach((el, index) => {
    html += `
    <div class="item_picture" key="${index}">
        <img alt="${el.alt_description}" src="${el.urls.thumb}">
        <div class="item_footer">
        <a target="_blank" href="${el.links.download}" class="_download"><img src="../images/icon/_download.svg"></img></a>
        <img class="favorit" src="../images/icon/_favorite.svg" />
</div>
<!--        <a target="_blank" href="${el.links.download}"><img src="https://cdn-icons-png.flaticon.com/32/318/318168.png" alt=""></a>-->
<!--        <p>Author: ${el.user.last_name}</p>-->
    </div>
  `;
  });
  displayRes.innerHTML = html;
}

function showMyCollection(res) {
  const displayRes = document.querySelector('#masonry');
  // displayRes.classList.remove('displayRess2');
  // displayRes.classList.add('displayRess');
  let html = '';
  // console.log('Res->', res.response.results);
  res.forEach((el, index) => {
    html += `
    <div class="item_picture" key="${index}">
        <img alt="${el.alt_description}" src="${el.urls_thumb}">
        <div class="item_footer">
            <a target="_blank" href="${el.href}" class="_download"><img src="../images/icon/_download.svg"></img></a>
            <img class="closes" src="../images/icon/_closes.svg" />
        </div>
    </div>
  `;
  });
  displayRes.innerHTML = html;
}

// TODO: Обработка логики на нажатие кнопки _favorit
