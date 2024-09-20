const tip_container = document.querySelectorAll(".tip-container");
const amount = document.getElementById("amount");
const bill = document.getElementById("bill");
const reset = document.getElementById("reset");
const total = document.getElementById("total");
const people = document.getElementById("people");
const error_msg = document.querySelector(".error-msg");
let selectedTip = null;

// Function to calculate the tip amount
const calculateTip = () => {
  const bill_amount = parseFloat(bill.value); // Get the bill amount
  const numberOfPeople = parseFloat(people.value);

  error_msg.style.display = "none";

  if (!bill_amount || !selectedTip || !numberOfPeople) {
    error_msg.style.display = "block";
    return;
  }

  const tip_amount = bill_amount * (selectedTip / 100); // Calculate the tip amount
  const total_amount = (bill_amount + tip_amount) / numberOfPeople; // Total amount per person including tip
  console.log("Tip Amount: ", tip_amount);

  // Update the UI with calculated values
  amount.innerText = `$${tip_amount.toFixed(2)}`; // Display the total tip amount
  total.innerText = `$${total_amount.toFixed(2)}`; // Display the total amount per person
};

// Add event listener for tip percentage selection
tip_container.forEach((tip) => {
  tip.addEventListener("click", () => {
    tip_container.forEach((t) => t.classList.remove("active"));
    tip.classList.add("active");

    selectedTip = parseFloat(tip.innerText); // Store the selected tip percentage
    calculateTip(); // Call the function whenever a tip is selected
  });
});

// Add input event listeners for bill and number of people
bill.addEventListener("input", calculateTip); // Run when the bill input changes
people.addEventListener("input", calculateTip); // Run when the number of people changes

// Add reset button functionality
reset.addEventListener("click", () => {
  bill.value = "";
  people.value = "";
  amount.innerText = "$0.00";
  total.innerText = "$0.00";
  selectedTip = null;
  tip_container.forEach((t) => t.classList.remove("active"));
});
