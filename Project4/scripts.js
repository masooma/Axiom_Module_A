// Access DOM Elements

const base_country = document.getElementById('base-country');
const target_country = document.getElementById('target-country');
const base_currency = document.getElementById('base-currency');
const target_currency = document.getElementById('target-currency');
const swap = document.getElementById('swap');
const calculate_r = document.getElementById('calculate');
const xrate = document.getElementById('rate');
const text_area = document.getElementById('text_area');
const all_count = document.getElementById('all_countries');

// Event Listeners

calculate_r.addEventListener('click', calculate);
all_count.addEventListener('click', all_count_conversionRates);
swap.addEventListener('click', () => {
    const temp_v = base_country.value;
    base_country.value = target_country.value;
    target_country.value = temp_v;

})

//function to calculate the exchange rate
function calculate(){

    const b_country = base_country.value;
    const t_country = target_country.value;
    const b_currency = base_currency.value;

    fetch(`https://v6.exchangerate-api.com/v6/dd884050c638c6acf706ab73/pair/${b_country}/${t_country}`)
        .then( res => res.json())
        .then(data => {
            const converted_currency = (data.conversion_rate * base_currency.value).toFixed(2);
            target_currency.value = converted_currency;
            xrate.innerHTML = `Conversion rate = ${data.conversion_rate}`;
        })        
};

// function to show exchange rates of all countries
function all_count_conversionRates(){

    const b_country = base_country.value;
    fetch(`https://v6.exchangerate-api.com/v6/dd884050c638c6acf706ab73/latest/${b_country}`)
        .then(res => res.json())
        .then(data => {
            const conversion_r = data.conversion_rates;
            //console.log(conversion_r);
            text_area.value = JSON.stringify(conversion_r);
        })
    
};