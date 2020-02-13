

document.getElementById("loan-form").addEventListener('submit', function(e){
  //hide RESULTS
  console.log("wtf");
  document.getElementById("results").style.display = "none";
  //show loader
    document.getElementById("loading").style.display = "block";

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});



//calculate RESULTS
function calculateResults() {
  //console.log("so far right");
  //get ui vars
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

const principle = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
const calculatedPayment =  parseFloat(years.value) * 12;




//compute monthly payments
const x = Math.pow(1 + calculatedInterest, calculatedPayment);
const monthly = (principle * x * calculatedInterest) / (x - 1);

if(isFinite(monthly)) {
  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly * calculatedPayment).toFixed(2);
  totalInterest.value = ((monthly * calculatedPayment) - principle).toFixed(2);
//show Results
  document.getElementById("results").style.display = "block";

  //hide spinner
  document.getElementById("loading").style.display = "none";
} else {
  showError("please Check your numbers");
  document.getElementById("loading").style.display = "none";

}

}
//show error
  function showError(error) {
    //create div
    const errorDiv = document.createElement("div");
    //get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");
  //add class
    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error));
    //insert error above heading
    card.insertBefore(errorDiv, heading);
    //clear error
    setTimeout(clearError, 3000);
  }

  function clearError() {
    document.querySelector(".alert").remove();
  }
