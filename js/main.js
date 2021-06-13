
  var pName=document.getElementById("pName");
  var pPrice=document.getElementById("pPrice");
  var pCat=document.getElementById("pCat");
  var pDesc=document.getElementById("pDesc");
  var alert = document.querySelector(".alert")
  var myStore;

  if(localStorage.getItem("productStorage")==null)
  {
      myStore=[];
  }
  else
  {
      myStore=JSON.parse(localStorage.getItem("productStorage"));
  }
  displayProduct()
  function addProduct()
  {
      var oneProduct={
          productName:pName.value,
          productPrice:pPrice.value,
          productCat:pCat.value,
          productDesc:pDesc.value,
      }
      if(oneProduct.productCat != "" && oneProduct.productName != "" & oneProduct.productPrice !="")
      {
        myStore.push(oneProduct);
        localStorage.setItem("productStorage",JSON.stringify(myStore));
        displayProduct();
        clearInput();
        alert.style.display = "none"
      }
      else{
          alert.style.display = "block"
      }

      
  }


  function clearInput()
  {
      pName.value="";
      pPrice.value="";
      pCat.value="";
      pDesc.value="";
  }

  function displayProduct()
  {
      var haSalah=""
      var i
     for(i=0 ; i<myStore.length ; i++)
      {
          haSalah +='<tr>  <td>'+i+`</td> <td>`+myStore[i].productName+`</td> <td>`+
          myStore[i].productPrice+`</td> <td>`+myStore[i].productCat+'</td> <td class="hide">'+
          myStore[i].productDesc+`</td> <td> <button class="btn btn-danger" onclick="deleteProduct(`+i+`)"> Delete</button>`
          +`</td> <td> <button class="btn btn-primary" onclick="editProduct(`+i+`)"> Edit</button>`+`
          </td></tr> `
      }

      document.getElementById("myTableBody").innerHTML=haSalah;
  }

function deleteProduct(index)
{
    myStore.splice(index,1)
    displayProduct();
    localStorage.setItem("productStorage",JSON.stringify(myStore));
}
function editProduct(index)
{
    pName.value = myStore[index].productName
    pPrice.value = myStore[index].productPrice
    pCat.value = myStore[index].productCat
    pDesc.value = myStore[index].productDesc
    displayProduct();

    document.querySelector(".edit").removeAttribute("disabled");
    $(".edit").val(index)
    

}
function Reset()
{
    pName.value = ""
    pPrice.value = ""
    pCat.value = ""
    pDesc.value = ""
    displayProduct();

    $(".edit").attr("disabled","disabled")
}

function Confirm(){
    index = $(".edit").val();
     myStore[index].productName = pName.value
    myStore[index].productPrice = pPrice.value
    myStore[index].productCat   = pCat.value
     myStore[index].productDesc = pDesc.value
    displayProduct();
    
}


function searchProduct(userWord)
{
    var haSalah='';
    for(var i=0;i<myStore.length;i++)
    {
        if(myStore[i].productName.includes(userWord))
        {
            haSalah+='<tr>  <td>'+i+`</td> <td>`+myStore[i].productName+`</td> <td>`+
            myStore[i].productPrice+`</td> <td>`+myStore[i].productCat+'</td> <td>'+
            myStore[i].productDesc+`</td> <td> <button class="btn btn-danger" onclick="deleteProduct(`+i+`)"> Delete</button>
            </td></tr> `
        }

        document.getElementById("myTableBody").innerHTML=haSalah;
    }
}
