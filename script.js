// 1. We create an array of objects and display them onscreen

const productArray = [
  {
    productID: 1,
    productImg:
      "https://images.unsplash.com/photo-1561808843-7adeb9606939?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    productName: "Breezy My Heart",
    unitPrice: "300",
  },
  {
    productID: 2,
    productImg:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    productName: "Megatron The Ruler",
    unitPrice: "1200",
  },
  {
    productID: 3,
    productImg:
      "https://images.unsplash.com/photo-1583979365152-173a8f14181b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU3fHxzaG9lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    productName: "Bumblebee Forever",
    unitPrice: "800",
  },
  {
    productID: 4,
    productImg:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    productName: "How about Jazz",
    unitPrice: "600",
  },
  {
    productID: 5,
    productImg:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU1fHxzaG9lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    productName: "Optimus Prime",
    unitPrice: "1500",
  },
  {
    productID: 6,
    productImg:
      "https://images.unsplash.com/photo-1600185365778-7875a359b924?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    productName: "Mud Flap Vow",
    unitPrice: "500",
  },
  {
    productID: 7,
    productImg:
      "https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQ2fHxzaG9lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    productName: "Hound The Sky",
    unitPrice: "600",
  },
  {
    productID: 8,
    productImg:
      "https://media.istockphoto.com/photos/fashion-white-sneakers-in-neon-light-sport-shoes-for-training-in-the-picture-id1301394040?b=1&k=20&m=1301394040&s=170667a&w=0&h=DM2FyLVbwZ-YjZeb5P8d45RgF2x_gTmT8kC66u7zIrk=",
    productName: "Drift Rule All",
    unitPrice: "2000",
  },
];

// 2. Loop through each item of the array and display them on screen

const renderProductList = (productArray) => {
  let htmlElements = "";

  productArray.map((item) => {
    htmlElements += `
       <div
            class="col col-12 col-sm-6 col-md-4 col-lg-3 gy-5 card-item text-center"
          >
            <div class="card">
              <img
                src=${item.productImg}
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">${item.productName}</h5>
                <p class="card-text px-3 fw-bold"><span>AUD </span>${item.unitPrice}</p>
                <hr />

                <div class="d-inline-flex align-items-center">
                  <label for="quantity" class="me-2 w-75">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    class="form-control w-60 ms-5 quantity"
                  />
                </div>
              </div>
            </div>
          </div>
      `;
  });

  document.getElementById("productDisplaySection").innerHTML = htmlElements;
};

renderProductList(productArray);

// 3. Adding the products to the basket

let basket = [];

const handleAddToBasket = () => {
  const quantityElms = document.querySelectorAll(".quantity");

  //   console.log(quantityElms);

  quantityElms.forEach((qtyElm, index) => {
    if (qtyElm.value > 0) {
      let obj = {
        productID: productArray[index].productID,
        productName: productArray[index].productName,
        productQuantity: +qtyElm.value,
        unitPrice: +productArray[index].unitPrice,
        amount: 0,
      };

      if (basket.length === 0) {
        basket.push(obj);
        // console.log({ obj });
      } else {
        let found = false;

        basket.forEach((basketItem) => {
          if (basketItem.productID === obj.productID) {
            found = true;
            basketItem.productQuantity += +qtyElm.value;
          }
        });

        if (!found) {
          basket.push(obj);
        }
      }
    }
  });

  renderOrderDetails();

  // 5. Clearing the form after quantity has been selected and added to cart

  const inputField = document.querySelectorAll("input");

  inputField.forEach((element) => {
    element.value = null;
  });
};

// 4. Display the selected products/products in the order details section when add to cart is clicked

const renderOrderDetails = () => {
  // 4.1 Total and grandTotal Calculation

  let grandTotal = 0;
  basket.map((basketObj, index) => {
    basketObj.amount = basketObj.productQuantity * basketObj.unitPrice;
    grandTotal += basketObj.amount;
  });

  // basket.map((basketObj, index) => {});

  let productOrdered = "";
  basket.forEach((basketObj, index) => {
    productOrdered += `
    
    <tr id = "${basketObj.productID}">
              <td class = "align-middle">${
                basketObj.productName.split(" ")[0]
              }</td>
              <td class = "align-middle">${basketObj.productQuantity}</td>
              <td class = "align-middle right">${basketObj.unitPrice.toLocaleString(
                "en-AU"
              )}</td>
              <td class = "align-middle">${basketObj.amount.toLocaleString(
                "en-AU"
              )}</td>
              <td  colspan = "2">
              <button class = "deleteBtn" onclick="deleteSelectedProduct(${index})">
                  <i class= "fa-solid fa-trash"></i>
              </button>
                &nbsp; 
              <button class = "editBtn" onclick="editSelectedProduct(${index})">
                  <i class= "fa-solid fa-cart-shopping"></i>
              </button>
              
              </td>
            </tr>
    `;
  });

  document.getElementById("tbody").innerHTML = productOrdered;

  document.getElementById("total").innerHTML =
    grandTotal.toLocaleString("en-AU");
};

// 5.1 Delete selection

const deleteSelectedProduct = (item, index) => {
  basket.splice(index, 1);

  // console.log(basket);

  renderOrderDetails();
};

const editSelectedProduct = (index) => {
  let qty = prompt("Please enter the new quantity");
  // qty = +qty;

  if (qty === null) {
    return;
  } else if (qty < 1) {
    alert("Please enter a valid quantity");
    editSelectedProduct(index);
  } else {
    basket[index].productQuantity = qty;
  }

  renderOrderDetails();
};
