'use strict'
//Global Variables and Arrays


let sumClicks = 0;
let allowedClicks = 25;
let allProducts = [];
let indexArray = [];
let imageCount = 6;
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

function assignImage(productElement,productIndex){
  productElement.src = allProducts[productIndex].src;
  productElement.title = allProducts[productIndex].name;
  allProducts[productIndex].views++;

}
//function to show random products

function renderProducts() {
  while (indexArray.length < imageCount) {
    let randomProducts = getRandomProducts();
    while (!indexArray.includes(randomProducts)) {
      indexArray.push(randomProducts)
    }
  }
  console.log(indexArray);

  let productOneIndex = indexArray.shift();
  let productTwoIndex = indexArray.shift();
  let productThreeIndex = indexArray.shift();

  assignImage(productOne,productOneIndex);
  assignImage(productTwo,productTwoIndex);
  assignImage(productThree,productThreeIndex);

 
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
    renderChart();
  }
}

function buttonClick(event) {
  if (sumClicks === allowedClicks) {

  }
}
section.addEventListener('click', clickHandler);

renderProducts();

//render chart

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }
  let chartObject = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Views',
        data: productViews,
        backgroundColor: 'rgb(159,170,174,0.8)',
        borderColor: 'rgb 26,57,76',
        borderWidth: 2,
      },
      {
        label: 'Clicks',
        data: productClicks,
        backgroundColor: 'black',
        borderColor: 'yellow',
        borderWidth: 1,
      }],
    },
    options: {
      
      legend:{
        labels:{
          fontColor: 'white',
        },

      },
  scales: {
    xAxes: [{
      ticks: {
        fontColor:'black',
        beginAtZero: true,
        stepSize: 1,
      },
    }],
    yAxes: [{
      ticks: {
        fontColor:'yellow',
        beginAtZero: true,
        stepSize: 1,
      },
    }],
      },
},
  };
let ctx = document.getElementById('resultChart').getContext('2d');
let myChart = new Chart(ctx, chartObject);
}
