'use strict'
//Global Variables and Arrays


let sumClicks = 0;
let allowedClicks = 25;
let allProducts = [];
let productOne = document.querySelector('section img:first-child');
let productTwo = document.querySelector('section img:nth-child(2)');
let productThree = document.querySelector('section img:nth-child(3)');
let section = document.querySelector('section');
let buttonResult = document.getElementById('final');

//Constructor 

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);

}
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('usb', 'gif');
new Product('water-can');
new Product('wine-glass');

//function for getting products at random

function getRandomProducts() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  let indexArray = []
  indexArray[0] = getRandomProducts();
  indexArray[1] = getRandomProducts();
  indexArray[2] = getRandomProducts();

  while (indexArray[0] === indexArray[1]) {
    indexArray[1] = getRandomProducts();
    console.log('duplicated item')
  }
  while (indexArray[1] === indexArray[2]) {
    indexArray[2] = getRandomProducts();
  }
  while (indexArray[2] === indexArray[0]) {
    indexArray[0] = getRandomProducts();
  }

  productOne.src = allProducts[indexArray[0]].src;
  productOne.title = allProducts[indexArray[0]].name;
  allProducts[indexArray[0]].views++;

  productTwo.src = allProducts[indexArray[1]].src;
  productTwo.title = allProducts[indexArray[1]].name;
  allProducts[indexArray[1]].views++;

  productThree.src = allProducts[indexArray[2]].src;
  productOne.title = allProducts[indexArray[2]].name;
  allProducts[indexArray[2]].views++;
}

//render function 

function renderClickResults() {
  let myClicks = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} votes, and was seen${allProducts[i].views} time`;
    myClicks.appendChild(li);

  }

}

function clickHandler(event) {
  if (event.target === section) {
    alert('Please click an image as per the instructions');
  }
  sumClicks++;

  let clickedItem = event.target.title;

  for (let i = 0; i < allProducts.length; i++) {
    if (clickedItem === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  renderProducts();
  if (sumClicks === allowedClicks) {
    section.removeEventListener('click', clickHandler);

  }
}
function buttonClick(event) {
  if (sumClicks === allowedClicks) {
    renderClickResults();
  }
}

renderProducts();

section.addEventListener('click', clickHandler);

buttonResult.addEventListener('click', renderClickResults);