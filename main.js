// get total
// create product
// save local storage
//clear inputs
// read
// count
// update
// search
// clean data

// defining variables of app
const title = document.getElementById('title')
const price = document.getElementById('price')
const taxes = document.getElementById('taxes')
const ads = document.getElementById('ads')
const discount = document.getElementById('discount')
const total = document.getElementById('total')
const count = document.getElementById('count')
const category = document.getElementById('category')
const create = document.getElementById('submit')
const tbody = document.getElementById('tbody')
// function getTotal

function getTotal () {
  if (price.value != '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value

    total.innerText = result
    total.style.background = 'green'
  } else {
    total.innerHTML = ''
    total.style.background = 'rgb(164, 15, 15)'
  }
}

// create
let products = []
if (localStorage.products != null) {
  products = JSON.parse(localStorage.products)
} else {
  products = []
}

create.onclick = () => {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value
  }
  if (!title.value || !price.value || !count.value || !category.value) {
    alert('complete fields please')
  } else {
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        products.push(newProduct)
      }
    } else {
      products.push(newProduct)
    }}
    localStorage.setItem('products', JSON.stringify(products))
    clearData()
    showData()
  
}

// clear inputs

function clearData () {
  title.value = ''
  price.value = ''
  taxes.value = ''
  ads.value = ''
  discount.value = ''
  total.innerHTML = ''
  count.value = ''
  category.value = ''
}

// show data

function showData () {
  let table = ''

  for (let i = 0; i < products.length; i++) {
    table += `
        <tr>
        <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button id='update'>update</button></td>
        <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>
        `
  }
  tbody.innerHTML = table
  
  if (products.length != 0) {
    document.querySelector('#deleteAll').innerHTML = `
        <button onclick='deleteAll()'>Delete All(${products.length})</button>
    `
  } else {
    document.querySelector('#deleteAll').innerHTML = ''
  }
}

// deleteData: for deleting current element
function deleteData (i) {
  products.splice(i, 1)
  localStorage.products = JSON.stringify(products)
  showData()
}

// deleteAll

function deleteAll () {
  localStorage.clear()
  products = []
  showData()
}

showData()
