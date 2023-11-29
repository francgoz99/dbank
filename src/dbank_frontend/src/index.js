import {dbank_backend} from "../../declarations/dbank_backend";

window.addEventListener("load", async function(){
    update();
});

document.querySelector("form").addEventListener("submit", async function(event){

    event.preventDefault()

    const button = event.target.querySelector("#submit-btn");

    const inputAmt = parseFloat(document.getElementById("input-amount").value);
    const outputAmt = parseFloat(document.getElementById("withdrawal-amount").value);

    
    button.setAttribute("disable", true); 
    
    if(document.getElementById("input-amount").value.length != 0){
    await dbank_backend.topUp(inputAmt);
    }

    if(document.getElementById("withdrawal-amount").value.length != 0){
        await dbank_backend.withdrawAmt(outputAmt);
    }

    await dbank_backend.compound();

    update();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";

    button.removeAttribute("disable");




})

async function update(){
    const currentAmt = await dbank_backend.checkBalance();
    document.getElementById("value").innerText = currentAmt.toFixed(2);
}