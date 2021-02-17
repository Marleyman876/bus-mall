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
//new steps 



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

  productOne.src = allProducts[productOneIndex].src;
  productOne.title = allProducts[productOneIndex].name;
  allProducts[productOneIndex].views++;

  productTwo.src = allProducts[productTwoIndex].src;
  productTwo.title = allProducts[productTwoIndex].name;
  allProducts[productTwoIndex].views++;

  productThree.src = allProducts[productThreeIndex].src;
  productThree.title = allProducts[productThreeIndex].name;
  allProducts[productThreeIndex].views++;
}

//render function 

// function renderClickResults() {
//   let myClicks = document.querySelector('ul');
//   for (let i = 0; i < allProducts.length; i++) {
//     let li = document.createElement('li');
//     li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes, and was seen ${allProducts[i].views} times`;
//     myClicks.appendChild(li);

//   }

// }

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

function renderChart(){
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
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Clicks',
        data: productClicks,
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        }],
      },
    },
  };
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject);
}

renderChart();


//buttonResult.addEventListener('click', renderClickResults);