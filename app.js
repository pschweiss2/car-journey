// Car data from CSV
const carData = {
    tradeIns: [
        { make: 'Subaru', loanBalance: 10000, tradeInValue: 18000 },
        { make: 'Honda', loanBalance: 18000, tradeInValue: 14000 }
    ],
    newCars: [
        { year: 2018, make: 'Hyundai', model: 'Santa Fe', trim: 'Limited Ultimate', miles: 56000, engine: 'Gas', seats: 7, price: 19950 },
        { year: 2021, make: 'Ford', model: 'Explorer', trim: 'Limited Ultimate', miles: 60500, engine: 'Gas', seats: 7, price: 25950 },
        { year: 2022, make: 'Volkswagen', model: 'Atlas', trim: '3.6L V6 SE w/Technology', miles: 53000, engine: 'Gas', seats: 7, price: 26855 },
        { year: 2021, make: 'Volkswagen', model: 'ID.4', trim: 'Pro S', miles: 46000, engine: 'Electric', seats: 5, price: 20998 },
        { year: 2018, make: 'Subaru', model: 'Forrester', trim: 'Premium', miles: 47000, engine: 'Gas', seats: 5, price: 20950 },
        { year: 2022, make: 'Hyundai', model: 'Santa Fe', trim: 'SEL', miles: 32000, engine: 'Gas', seats: 5, price: 22950 },
        { year: 2022, make: 'Mazda', model: 'CX-5', trim: '2.5 S Select Package', miles: 32000, engine: 'Gas', seats: 5, price: 22950 },
        { year: 2022, make: 'Volkswagen', model: 'Atlas Cross Sport', trim: '2.0T SE', miles: 35000, engine: 'Gas', seats: 5, price: 25998 },
        { year: 2022, make: 'Lincoln', model: 'Corsair', trim: 'Standard', miles: 26000, engine: 'Gas', seats: 5, price: 26950 },
        { year: 2022, make: 'Subaru', model: 'Outback', trim: 'Touring', miles: 26500, engine: 'Gas', seats: 5, price: 27950 },
        { year: 2022, make: 'Audi', model: 'Q5', trim: 'S line Premium Plus', miles: 47000, engine: 'Gas', seats: 5, price: 27996 },
        { year: 2021, make: 'Dodge', model: 'Durango', trim: 'GT Plus AWD', miles: 37500, engine: 'Gas', seats: 7, price: 28700 },
        { year: 2022, make: 'Subaru', model: 'Ascent', trim: 'Onyx Edition', miles: 61000, engine: 'Gas', seats: 7, price: 28997 },
        { year: 2021, make: 'RAM', model: '1500 Classic', trim: 'Tradesman', miles: 64000, engine: 'Gas', seats: 5, price: 24950 },
        { year: 2024, make: 'Mini', model: 'Cooper S', trim: 'Clubman All4', miles: 28000, engine: 'Gas', seats: 5, price: 27950 },
        { year: 2017, make: 'Volkswagen', model: 'Passat', trim: '1.8T SE', miles: 61000, engine: 'Gas', seats: 5, price: 15965 },
        { year: 2024, make: 'Subaru', model: 'Legacy', trim: 'Premium', miles: 3000, engine: 'Gas', seats: 5, price: 25956 }
    ]
};

// State management
let selectedTradeIns = [];
let selectedCars = [];
let currentSortColumn = null;
let sortAscending = true;
let originalCarData = [];

// Initialize the application
function initApp() {
    // Store original car data
    originalCarData = [...carData.newCars];
    renderTradeIns();
    renderCars();
    setupEventListeners();
}

// Render trade-in vehicles
function renderTradeIns() {
    const tbody = document.getElementById('tradeInTableBody');
    tbody.innerHTML = '';
    
    carData.tradeIns.forEach((car, index) => {
        const netEquity = car.tradeInValue - car.loanBalance;
        const row = document.createElement('tr');
        row.className = 'trade-in-row';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" id="tradein-${index}" onchange="toggleTradeIn(${index})">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${car.make}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${car.loanBalance.toLocaleString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${car.tradeInValue.toLocaleString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm ${netEquity >= 0 ? 'text-green-600' : 'text-red-600'}">
                $${Math.abs(netEquity).toLocaleString()} ${netEquity >= 0 ? '(Equity)' : '(Negative)'}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Render available cars
function renderCars() {
    const tbody = document.getElementById('carsTableBody');
    tbody.innerHTML = '';
    
    carData.newCars.forEach((car, index) => {
        const originalIndex = originalCarData.indexOf(car);
        const row = document.createElement('tr');
        row.className = 'car-row';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${originalIndex + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" id="car-${index}" onchange="toggleCar(${index})">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${car.year}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${car.make}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${car.model}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${car.trim}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${car.miles.toLocaleString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${car.engine}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${car.seats}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$${car.price.toLocaleString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${getThreeCarSeatsFeasibility(car)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${estimateAnnualMaintenance(car).toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
}

// Get feasibility of three car seats
function getThreeCarSeatsFeasibility(car) {
    if (car.seats >= 7) return 'Excellent';
    if (car.seats === 5) {
        // Based on model knowledge for 5-seat vehicles
        const wideModels = ['Santa Fe', 'Atlas Cross Sport', 'Outback', 'Durango', 'Ascent'];
        if (wideModels.includes(car.model)) return 'Good';
        return 'Tight';
    }
    return 'Not Feasible';
}

// Estimate annual maintenance cost
function estimateAnnualMaintenance(car) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - car.year;
    const mileage = car.miles;
    
    let baseCost = 500; // Base maintenance cost
    
    // Age factor
    if (age > 5) baseCost += (age - 5) * 200;
    if (age > 10) baseCost += (age - 10) * 300;
    
    // Mileage factor
    if (mileage > 60000) baseCost += (mileage - 60000) / 10000 * 150;
    if (mileage > 100000) baseCost += (mileage - 100000) / 10000 * 250;
    
    // Engine type factor
    if (car.engine === 'Electric') baseCost *= 0.6; // Electric vehicles have lower maintenance
    if (car.make === 'Audi' || car.make === 'Lincoln') baseCost *= 1.5; // Luxury brands cost more
    
    // Upcoming major maintenance
    if (mileage >= 90000 && mileage < 100000) baseCost += 800; // Timing belt/water pump
    if (mileage >= 100000 && mileage < 110000) baseCost += 1200; // Major service
    if (mileage >= 120000 && mileage < 130000) baseCost += 600; // Transmission service
    
    return Math.round(baseCost);
}

// Toggle trade-in selection
function toggleTradeIn(index) {
    const checkbox = document.getElementById(`tradein-${index}`);
    if (checkbox.checked) {
        selectedTradeIns.push(index);
    } else {
        selectedTradeIns = selectedTradeIns.filter(i => i !== index);
    }
    updatePaymentCalculator();
}

// Toggle car selection
function toggleCar(index) {
    const checkbox = document.getElementById(`car-${index}`);
    if (checkbox.checked) {
        if (selectedCars.length < 2) {
            selectedCars.push(index);
        } else {
            checkbox.checked = false;
            alert('You can only select up to 2 cars for purchase');
            return;
        }
    } else {
        selectedCars = selectedCars.filter(i => i !== index);
    }
    updatePaymentCalculator();
}

// Update payment calculator
function updatePaymentCalculator() {
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const salesTaxRate = parseFloat(document.getElementById('salesTax').value) / 100;
    const closingCosts = parseFloat(document.getElementById('closingCosts').value);
    
    // Calculate total trade-in value and loan payoff
    let totalTradeInValue = 0;
    let totalLoanPayoff = 0;
    
    selectedTradeIns.forEach(index => {
        const tradeIn = carData.tradeIns[index];
        totalTradeInValue += tradeIn.tradeInValue;
        totalLoanPayoff += tradeIn.loanBalance;
    });
    
    // Calculate total car prices
    let totalCarPrice = 0;
    selectedCars.forEach(index => {
        totalCarPrice += carData.newCars[index].price;
    });
    
    // Calculate taxable amount (price minus trade-in value)
    const taxableAmount = Math.max(0, totalCarPrice - totalTradeInValue);
    const salesTax = taxableAmount * salesTaxRate;
    
    // Calculate total amount to finance (excluding sales tax - paid in cash)
    const totalAmount = totalCarPrice + closingCosts - totalTradeInValue + totalLoanPayoff;
    
    // Calculate monthly payments for different terms
    const payment48 = calculateMonthlyPayment(totalAmount, interestRate, 48);
    const payment60 = calculateMonthlyPayment(totalAmount, interestRate, 60);
    const payment72 = calculateMonthlyPayment(totalAmount, interestRate, 72);
    
    // Update display
    document.getElementById('payment48').textContent = `$${payment48.toFixed(2)}`;
    document.getElementById('payment60').textContent = `$${payment60.toFixed(2)}`;
    document.getElementById('payment72').textContent = `$${payment72.toFixed(2)}`;
    
    // Update calculation details
    const details = document.getElementById('calculationDetails');
    details.innerHTML = `
        <div class="space-y-1">
            <p><strong>Total Car Price:</strong> $${totalCarPrice.toLocaleString()}</p>
            <p><strong>Total Trade-in Value:</strong> $${totalTradeInValue.toLocaleString()}</p>
            <p><strong>Total Loan Payoff:</strong> $${totalLoanPayoff.toLocaleString()}</p>
            <p><strong>Taxable Amount:</strong> $${taxableAmount.toLocaleString()}</p>
            <p><strong>Sales Tax (${(salesTaxRate * 100).toFixed(3)}%):</strong> $${salesTax.toFixed(2)} (paid in cash)</p>
            <p><strong>Closing Costs:</strong> $${closingCosts.toLocaleString()}</p>
            <p><strong>Total Amount to Finance:</strong> $${totalAmount.toFixed(2)}</p>
            <p><strong>Interest Rate:</strong> ${(interestRate * 100).toFixed(2)}%</p>
            <p><strong>Cash Needed at Closing:</strong> $${(salesTax + closingCosts).toFixed(2)}</p>
        </div>
    `;
}

// Calculate monthly payment
function calculateMonthlyPayment(principal, annualRate, months) {
    const monthlyRate = annualRate / 12;
    if (monthlyRate === 0) return principal / months;
    
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('interestRate').addEventListener('input', updatePaymentCalculator);
    document.getElementById('salesTax').addEventListener('input', updatePaymentCalculator);
    document.getElementById('closingCosts').addEventListener('input', updatePaymentCalculator);
}

// Sort table function
function sortTable(column) {
    // Toggle sort direction if same column
    if (currentSortColumn === column) {
        sortAscending = !sortAscending;
    } else {
        currentSortColumn = column;
        sortAscending = true;
    }

    // Sort the car data
    carData.newCars.sort((a, b) => {
        let valueA, valueB;

        switch (column) {
            case 'rowNumber':
                const indexA = originalCarData.indexOf(a);
                const indexB = originalCarData.indexOf(b);
                valueA = indexA;
                valueB = indexB;
                break;
            case 'year':
                valueA = a.year;
                valueB = b.year;
                break;
            case 'make':
                valueA = a.make.toLowerCase();
                valueB = b.make.toLowerCase();
                break;
            case 'model':
                valueA = a.model.toLowerCase();
                valueB = b.model.toLowerCase();
                break;
            case 'miles':
                valueA = a.miles;
                valueB = b.miles;
                break;
            case 'engine':
                valueA = a.engine.toLowerCase();
                valueB = b.engine.toLowerCase();
                break;
            case 'seats':
                valueA = a.seats;
                valueB = b.seats;
                break;
            case 'price':
                valueA = a.price;
                valueB = b.price;
                break;
            case 'carSeats':
                const carSeatsOrder = { 'Excellent': 4, 'Good': 3, 'Tight': 2, 'Not Feasible': 1 };
                valueA = carSeatsOrder[getThreeCarSeatsFeasibility(a)];
                valueB = carSeatsOrder[getThreeCarSeatsFeasibility(b)];
                break;
            case 'maintenance':
                valueA = estimateAnnualMaintenance(a);
                valueB = estimateAnnualMaintenance(b);
                break;
            default:
                return 0;
        }

        // Handle string vs numeric comparison
        if (typeof valueA === 'string') {
            return sortAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            return sortAscending ? valueA - valueB : valueB - valueA;
        }
    });

    // Re-render the table
    renderCars();
}

// Export to Excel functionality
function exportToExcel() {
    let csvContent = "Car Evaluation Report\n\n";
    
    // Trade-ins
    csvContent += "TRADE-IN VEHICLES\n";
    csvContent += "Make,Loan Balance,Trade-in Value,Net Equity\n";
    carData.tradeIns.forEach(car => {
        const netEquity = car.tradeInValue - car.loanBalance;
        csvContent += `${car.make},${car.loanBalance},${car.tradeInValue},${netEquity}\n`;
    });
    
    csvContent += "\nAVAILABLE VEHICLES\n";
    csvContent += "#,Year,Make,Model,Trim,Miles,Engine,Seats,Price,3 Car Seats Feasibility,Annual Maintenance\n";
    
    carData.newCars.forEach((car, index) => {
        csvContent += `${index + 1},${car.year},${car.make},${car.model},"${car.trim}",${car.miles},${car.engine},${car.seats},${car.price},"${getThreeCarSeatsFeasibility(car)}",${estimateAnnualMaintenance(car)}\n`;
    });
    
    // Add payment calculator data
    csvContent += "\nPAYMENT CALCULATOR SETTINGS\n";
    csvContent += `Interest Rate,${document.getElementById('interestRate').value}%\n`;
    csvContent += `Sales Tax,${document.getElementById('salesTax').value}%\n`;
    csvContent += `Closing Costs,$${document.getElementById('closingCosts').value}\n`;
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'car_evaluation_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
