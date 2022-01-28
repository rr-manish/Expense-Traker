const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list= document.getElementById("list");
const form= document.getElementById("form");
const text= document.getElementById("text");
const amount =document.getElementById("amount");

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let Transactions= localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


function generateID(){
    return Math.floor(Math.random()*1000000000);
}

function addTransaction(e)
{
    e.preventDefault();
    if(
        text.value.trim()==='' || amount.value.trim()===''
    )
    {
        alert("Please add Text and amount")
    }
    else{
       const transaction ={ 
           id: generateID(),
           text:text.value,
           amount:amount.value                  
                        }
     Transactions.push(transaction);  
     addTransactionsDOM(transaction);
     updateValues();
     text.value='';
     amount.value='';
     updateLocalStorage();
  }
}


function addTransactionsDOM(transaction)
{
  const sign= transaction.amount <0 ? "-" :"+";
  const item= document.createElement("li");

   item.classList.add( transaction.amount <0 ? "minus" :"plus")
 item.innerHTML=`
 ${transaction.text}<span>${sign}${transaction.amount}</span>
 <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
 ` ;
list.appendChild(item);
}

function removeTransaction(id)
{
    Transactions=Transactions.filter((transaction)=> transaction.id!=id);
    updateLocalStorage();
    
    Init();

}

function updateValues()
{
   const amounts= Transactions.map(transaction => Number(transaction.amount))
   const total =amounts.reduce((acc,item)=>(acc+=item),0);
    console.log(total);
    console.log(amounts);
   const income =amounts.filter(item => item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
   const expense =amounts.filter(item => item<0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
   balance.innerHTML=`₹${total}`;
   money_plus.innerHTML=`₹${income}`;
   money_minus.innerHTML=`₹${expense}`;
}

function Init(){
    list.innerHTML="";
    Transactions.forEach(addTransactionsDOM);
    updateValues();
}
Init();

// update local storage
function updateLocalStorage()
{

 localStorage.setItem(
     "transactions",JSON.stringify(Transactions)
 )

}




form.addEventListener("submit",addTransaction);
