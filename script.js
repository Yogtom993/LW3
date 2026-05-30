document.addEventListener('DOMContentLoaded', () => {
  const clock = document.getElementById('clock');
  function showClock(){ if(clock){ clock.textContent = new Date().toLocaleTimeString('uk-UA'); } }
  showClock(); setInterval(showClock, 1000);

  document.getElementById('fontDemo')?.addEventListener('click', () => {
    const out = document.getElementById('fontOutput');
    out.innerHTML = '';
    showText('Текст розміром 18px', '18px');
    showText('Текст розміром 24px', '24px');
    showText('Текст розміром 30px', '30px');
    function showText(text, size){
      const p = document.createElement('p');
      p.textContent = text;
      p.style.fontSize = size;
      out.appendChild(p);
    }
  });

  const movingImg = document.getElementById('movingImg');
  if(movingImg){
    setInterval(() => {
      movingImg.style.left = Math.floor(Math.random() * 230) + 'px';
      movingImg.style.top = Math.floor(Math.random() * 82) + 'px';
    }, 1000);
  }

  document.getElementById('paragraphBtn')?.addEventListener('click', () => {
    const paragraphs = document.getElementsByTagName('p');
    for(let i = 0; i < paragraphs.length; i++){
      paragraphs[i].setAttribute('style', 'font-size: 15px;');
    }
  });

  document.getElementById('wipeBtn')?.addEventListener('click', () => {
    const block = document.getElementById('wipeText');
    let opacity = 1;
    const timer = setInterval(() => {
      opacity -= 0.1;
      block.style.opacity = opacity;
      if(opacity <= 0){ clearInterval(timer); }
    }, 250);
  });

  document.getElementById('colorSelect')?.addEventListener('change', (event) => {
    document.getElementById('colorSquare').style.backgroundColor = event.target.value;
  });

  document.addEventListener('mousemove', (event) => {
    const block = document.getElementById('mouseCoords');
    if(block){ block.textContent = 'X: ' + event.clientX + '; Y: ' + event.clientY; }
  });
  document.addEventListener('keydown', (event) => {
    const block = document.getElementById('keyCode');
    if(block){ block.textContent = 'Код клавіші: ' + event.code; }
  });

  function setCookie(name, value, days){
    const date = new Date();
    date.setTime(date.getTime() + days*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  }
  function getCookie(name){
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if(parts.length === 2) return parts.pop().split(';').shift();
    return '';
  }
  const readText = document.getElementById('readText');
  let textSize = Number(getCookie('textSize') || 16);
  function applyTextSize(){ if(readText){ readText.style.fontSize = textSize + 'px'; } }
  applyTextSize();
  document.getElementById('fontPlus')?.addEventListener('click', () => { textSize += 2; setCookie('textSize', textSize, 30); applyTextSize(); });
  document.getElementById('fontMinus')?.addEventListener('click', () => { textSize = Math.max(10, textSize - 2); setCookie('textSize', textSize, 30); applyTextSize(); });

  document.getElementById('rainbowBtn')?.addEventListener('click', () => {
    const phrase = document.getElementById('rainbowText');
    const colors = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed'];
    const text = phrase.textContent;
    phrase.innerHTML = text.split('').map((letter, i) => '<span style="color:' + colors[i % colors.length] + '">' + letter + '</span>').join('');
  });

  const promo = document.getElementById('promo');
  if(promo && localStorage.getItem('promoHiddenDate') === new Date().toDateString()){
    promo.style.display = 'none';
  }
  document.getElementById('hidePromo')?.addEventListener('click', () => {
    localStorage.setItem('promoHiddenDate', new Date().toDateString());
    promo.style.display = 'none';
  });

  function renderNotes(){
    const list = document.getElementById('noteList');
    if(!list) return;
    const notes = JSON.parse(localStorage.getItem('buyerNotes') || '[]');
    list.innerHTML = notes.length ? notes.map(note => '<p>' + note + '</p>').join('') : 'Немає записів.';
  }
  renderNotes();
  document.getElementById('saveNote')?.addEventListener('click', () => {
    const input = document.getElementById('noteInput');
    const notes = JSON.parse(localStorage.getItem('buyerNotes') || '[]');
    if(input.value.trim()){
      notes.push(input.value.trim());
      localStorage.setItem('buyerNotes', JSON.stringify(notes));
      input.value = '';
      renderNotes();
    }
  });
  document.getElementById('clearNotes')?.addEventListener('click', () => {
    localStorage.removeItem('buyerNotes');
    renderNotes();
  });

  document.getElementById('orderForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('formResult').textContent = 'Форму перевірено. Дані замовлення готові до відправлення.';
  });
});


// Блок 1, завдання 2: рухоме зображення через setInterval
function moveImage() {
  const img = document.getElementById("movingImg");
  const area = document.querySelector(".moving-area");
  if (!img || !area) return;

  const maxX = Math.max(20, area.clientWidth - img.clientWidth - 10);
  const maxY = Math.max(20, area.clientHeight - img.clientHeight - 10);

  const x = Math.max(10, Math.floor(Math.random() * maxX));
  const y = Math.max(10, Math.floor(Math.random() * maxY));

  img.style.left = x + "px";
  img.style.top = y + "px";
}

setInterval(moveImage, 1000);
