/* Initial song list */
let songs = [{
  name: 'Jingle Bells',
  isLiked: false,
}, {
  name: 'We Wish You a Merry Christmas',
  isLiked: true,
}];

window.addEventListener('load', function () {

  for (let song of songs) {
    getSong(song);
  }
  setCount();
});

// function create button
function createBtn(name, className) {
  let btn = document.createElement('input');
  btn.setAttribute('type', 'button');
  btn.setAttribute('value', `${name}`);
  btn.classList.add(className);
  btn.addEventListener('click', function (event) {
    if (this.classList.contains('delete')) {
      getDeleteSong();
      let parent = event.target.parentNode;
      parent.remove();
      console.log(event.target, songs);
    }
    if (this.classList.contains('like')) {
      let parent = event.target.parentNode;
      createImg(parent);
      this.setAttribute('value', 'Unlike');
      this.classList.remove('like');
      this.classList.add('unlike');
    } else {
      let parent = event.target.parentNode;
      console.log(parent);
      parent.firstChild.remove();
      this.setAttribute('value', 'Like');
      this.classList.remove('unlike');
      this.classList.add('like');
    }
  });
  return btn;
}

// function create img ico
function createImg(addNode) {
  const imgElem = document.createElement('img');
  imgElem.setAttribute('src', 'images/like.svg');
  imgElem.setAttribute('alt', 'like');
  imgElem.classList.add('like-icon');
  return addNode.prepend(imgElem);
}

// function create songs
function getSong(song) {
  const ulElem = document.querySelector('.songs');
  let liElem = document.createElement('li');
  liElem.classList.add('item');
  liElem.textContent = song.name;
  ulElem.append(liElem);
  console.log(song.name);
  if (song.isLiked) {
    liElem.append(createBtn('Unlike', 'unlike'));
    createImg(liElem);
  } else {
    liElem.append(createBtn('Like', 'like'));
  }
  liElem.append(createBtn('Delete', 'delete'));
}

// add song in playlist
let btnAdd = this.document.querySelector('.button__add');
btnAdd.addEventListener('click', function (e) {
  let inputBox = document.querySelector('.input-box').value;
  if (inputBox) {
    let song = {
      name: inputBox,
      isLiked: false,
    }
    getSong(song);
    songs.push(song);
  }
  document.querySelector('.input-box').value = "";
  // set count songs
  setCount();
});

// creat fn delete song
function getDeleteSong() {
  const setElemLi = document.querySelectorAll('.item');
  setElemLi.forEach((item, index) => {
    item.addEventListener('click', function (e) {
      songs.splice(index, 1);
      setCount();
    });
  });
}

// set count songs
function setCount() {
  const countElem = document.querySelector('.count');
  const liElems = document.querySelectorAll('.item');
  return countElem.textContent = liElems.length;
}
setCount();