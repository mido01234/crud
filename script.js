// get total
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let span = document.querySelector("button span")
let tmpIndex = "" //* used to pass index from update function to submit function
let mood = "Create"

//* calculate the Total value of the product
//! we use keyup event to call the function because we
//! want to calculate the total when there a price added immediately
function getTotal() {
    if (price.value != "") {
        //! we make sure that there is a value and change the total based on it
        //! WE CONVERT STRING VALUES into NUMBERS
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "darkred";
    }
}
getTotal()
// * here we create the product and save it to local storage
//* we save data into an array as an array of objects
//* every object is a product
//* we save the data when we click on the button
let dataPro = JSON.parse(localStorage.getItem("products")) || [];

// let dataPro;
// if (localStorage.products != null) {
//     dataPro = JSON.parse(localStorage.getItem("products"))
// } else {
//     dataPro = []
// }

submit.onclick = function () {
    let productObj = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    if (title.value!="" && price.value!="" && productObj.count <= 10) {
        if(mood === "Create"){
            if (productObj.count < 1) {
                dataPro.push(productObj);
            } else {
                for (let j = 1; j <= productObj.count; j++) {
                    dataPro.push(productObj);
                }
            }
        }
        else{
            dataPro[tmpIndex] = productObj;
            mood = "Create"
            count.style.display = "block"
            submit.innerHTML = "Create"
            total.innerHTML = "";
            total.style.backgroundColor = "darkred";
        }
        clearInputs();
    }
    else{
        alert("you must write a title, price and category")
    }
   

    //* as each time we click the button and create a new object , the old object is deleted
    //* so we save the object into the array

    localStorage.setItem("products", JSON.stringify(dataPro));
    //* every time we reload the page the whole js file is readed from the beginning
    //* so the data of array is deleted and we need to save it in local storage
    //* so the data is not deleted when we reload
    //* but if we added a new item the data is deleted
    //* so we set the array to equal the products if there any products in local storage or []

    showData();
   
};

//* we make the function that clears the inputs after we create a product
function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    total.style.backgroundColor="darkred"
    count.value = "";
    category.value = "";
}

//* display the data
//* we need to loop over array elements

let deleteAll = document.getElementById("deleteAll");

function showData() {
   
    let tableData = "";
    for (let i = 0; i < dataPro.length; i++) {
        tableData += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick="updateProduct(${i})">update</button></td>
            <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
        </tr>
    `;
    }
    // tbody.innerHTML = tableData
    //! this is wrong because we add object into html

    let tbody = document.getElementById("tbody");
    tbody.innerHTML = tableData;
    if (dataPro.length > 0) {
        deleteAll.style.display = "block";
        span.innerHTML = `(${dataPro.length})`
    } else {
        deleteAll.style.display = "none";
    }
}
showData();
//* we put here to make it work when we reload without pressing the create button

function deleteProduct(i) {
    console.log(i);
    dataPro.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(dataPro));
    showData();
}

function deleteAllProducts() {
    dataPro.splice(0);
    localStorage.clear();
    showData();
}


function updateProduct(i) {
    console.log(i);
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    //* we need to call the function because it works only when you type on keyboard
    count.style.display = "none"
    //* here we do not create any product so we do not need count
    category.value = dataPro[i].category
    submit.innerHTML = "Update"
    tmpIndex = i
    mood="update"
    scroll({
        top: 0,
        behavior: "smooth"
    })
   
}

let searchMood= "title"
let radio_title = document.getElementById("radio_title")
let radio_category = document.getElementById("radio_category")
let radio_total = document.getElementById("radio_total")
let searchinp = document.getElementById("search")
searchinp.style.display="none"
function getSearchMood(id) {
    
    if (id == "radio_title") {
        searchMood="Title"
        // searchinp.placeholder="search by Title"
        // searchinp.style.display="block"
    }
    if(id == "radio_category") {
        searchMood="Category"
        // searchinp.placeholder="search by Category"
        // searchinp.style.display="block"
    }
    if(id == "radio_total") {
        searchMood="Total"
        // searchinp.placeholder="search by Total"
        // searchinp.style.display="block"
    }
    // searchinp.ariaPlaceholder="ks"
    searchinp.style.display="block"
    searchinp.placeholder=`search by ${searchMood}`
    searchinp.focus()
    searchinp.value=""
    showData()
    // console.log(id);
    // console.log(searchMood);
    
}

function searchData(value) {
    console.log(value);
    let tableData = "";
    if (searchMood === "Title") {
        for (let i = 0; i < dataPro.length; i++) {
          if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
            console.log(i);
                tableData += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                </tr>`;
          }  
         
        }
    }   
    if (searchMood === "Category") {
        for (let i = 0; i < dataPro.length; i++) {
          if (dataPro[i].category.toLowerCase().includes(value.toLowerCase)) {
            console.log(i);
                tableData += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                </tr>`;
          }  
        }
    } 
    if (searchMood === "Total") {
        for (let i = 0; i < dataPro.length; i++) {
          if (dataPro[i].total.includes(value)) {
            console.log(i);
                tableData += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                </tr>`;
          }  
        }
    }   
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = tableData;
}

const toggleMode = () => {
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
};