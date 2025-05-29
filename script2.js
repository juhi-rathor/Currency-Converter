const API_KEY = "cur_live_Pv2iRnVurlUk3sSArQ2jeeWVVkfNSbaopKi9vCEl";
const API_URL = "https://api.currencyapi.com/v3/latest";

// Select elements
const btn = document.querySelector('.btn');
const quantityInput = document.querySelector("input[name='quantity']");
const currencySelect = document.querySelector("select[name='currency']");
const outputTable = document.querySelector("tbody");
const outputDiv = document.querySelector(".output");

// Function to fetch and display conversion data
const populate = async (amount, baseCurrency) => {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&base_currency=${baseCurrency}`);
        const data = await response.json();

        // Ensure output is shown
        outputDiv.classList.add("show");

        let tableRows = "";
        const rates = data.data;

        for (const code in rates) {
            const currencyData = rates[code];
            const convertedValue = Math.round(currencyData.value * amount);

            tableRows += `
                <tr>
                    <td>${code}</td>
                    <td>${currencyData.code}</td>
                    <td>${convertedValue}</td>
                </tr>`;
        }

        outputTable.innerHTML = tableRows;
    } catch (error) {
        console.error("Error fetching conversion data:", error);
        outputTable.innerHTML = `<tr><td colspan="3">Failed to fetch data. Please try again later.</td></tr>`;
    }
};

// Button click event
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const amount = parseFloat(quantityInput.value);
    const baseCurrency = currencySelect.value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    populate(amount, baseCurrency);
});
