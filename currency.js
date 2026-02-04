const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
let fromCurrency=document.querySelector(".drop-from select");
let toCurrency=document.querySelector(".drop-to select");
let to=document.getElementById("to");
let from=document.getElementById("from");
for(select of dropdown){
    for(crrcode in countryList){
        let option=document.createElement("option");
        option.value=crrcode;
        option.innerText=crrcode;
        if(select.name=="from" && crrcode=="USD"){
            option.selected="selected";
        }
        if(select.name=="to" && crrcode=="PKR"){
            option.selected="selected";
        }
        select.append(option);
    }
        select.addEventListener("change",e=>{
            updateflag(e.target);
        })  ;
        
}
const updateflag=(element)=>{
    let crrcode=element.value;
    let countrycode=countryList[crrcode];
    console.log(crrcode, countrycode);
    let flagURL=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=flagURL;
}


btn.addEventListener("click",async()=>{
    let amount=document.querySelector(".amnt input");
    let amntVal=amount.value;
    if(amntVal=="" || amntVal==0){
        alert("Please enter a valid amount");
    }
    let url=`${baseURL}/${fromCurrency.value.toLowerCase()}.json`;
    let response=await fetch(url);
    
    let data=await response.json();
    let desire=await data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let total=(amntVal*desire).toFixed(5);
    document.querySelector(".resu").innerText=`${amntVal} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
    
})