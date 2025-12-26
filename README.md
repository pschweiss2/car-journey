# Car Evaluation & Payment Calculator

## Features

### 🚗 Vehicle Evaluation
- **Trade-in Analysis**: Displays current vehicles with loan balances, trade-in values, and net equity
- **Available Cars**: Comprehensive list of 17 vehicles with detailed specifications
- **3 Car Seats Feasibility**: Rates how practical three car seats are in each vehicle (Excellent/Good/Tight/Not Feasible)
- **Annual Maintenance Estimates**: Calculates maintenance costs based on:
  - Vehicle age and mileage
  - Engine type (gas vs electric)
  - Brand (luxury vs standard)
  - Upcoming major maintenance needs

### 💰 Payment Calculator
- **Multi-term Options**: Shows monthly payments for 48, 60, and 72-month terms
- **Missouri Sales Tax Credit**: Correctly calculates sales tax only on the difference between purchase price and trade-in value
- **Adjustable Parameters**:
  - Interest rate (with decimal precision)
  - Missouri sales tax rate (default 4.225%)
  - Miscellaneous closing costs
- **Real-time Updates**: All calculations update instantly as you change parameters

### 📊 Interactive Features
- **Vehicle Selection**: 
  - Select trade-in vehicles (multiple allowed)
  - Select up to 2 vehicles for purchase
- **Visual Feedback**: Hover effects and selection highlighting
- **Calculation Details**: Shows breakdown of all costs and taxes

### 📥 Export Functionality
- **Excel/CSV Export**: Download complete evaluation report including:
  - All vehicle data with maintenance estimates
  - Payment calculator settings
  - Selected vehicles and calculations

## Vehicle Data Included

### Trade-in Vehicles
1. **Subaru** - $10,000 loan, $18,000 trade-in value ($8,000 equity)
2. **Honda** - $18,000 loan, $14,000 trade-in value ($4,000 negative equity)

### Available Vehicles (17 total)
**7-Seaters:**
- Hyundai Santa Fe Limited Ultimate (2018)
- Ford Explorer Limited Ultimate (2021) 
- Volkswagen Atlas 3.6L V6 SE (2022)
- Dodge Durango GT Plus AWD (2021)
- Subaru Ascent Onyx Edition (2022)

**5-Seaters:**
- Volkswagen ID.4 Pro S (Electric, 2021)
- Subaru Forrester Premium (2018)
- Hyundai Santa Fe SEL (2022)
- Mazda CX-5 2.5 S Select (2022)
- Volkswagen Atlas Cross Sport 2.0T SE (2022)
- Lincoln Corsair Standard (2022)
- Subaru Outback Touring (2022)
- Audi Q5 S line Premium Plus (2022)
- RAM 1500 Classic Tradesman (2021)
- Mini Cooper S Clubman All4 (2024)
- Volkswagen Passat 1.8T SE (2017)
- Subaru Legacy Premium (2024)

## How to Use

1. **Open the Application**: Open `index.html` in a web browser
2. **Select Trade-ins**: Check the boxes next to your current vehicles
3. **Choose New Cars**: Select up to 2 vehicles to purchase
4. **Adjust Parameters**: Modify interest rate, sales tax, and closing costs as needed
5. **View Payments**: See calculated monthly payments for all three terms
6. **Export Data**: Click "Export to Excel" to download the complete report

## Technical Details

### Maintenance Calculation Logic
- **Base Cost**: $500 annually
- **Age Factors**: +$200/year after 5 years, +$300/year after 10 years
- **Mileage Factors**: +$150 per 10k miles over 60k, +$250 per 10k over 100k
- **Engine Adjustments**: Electric vehicles get 40% discount
- **Luxury Brands**: Audi and Lincoln cost 50% more
- **Major Service**: Adds costs for timing belt, transmission service, etc.

### Payment Formula
Uses standard amortization formula:
```
Monthly Payment = P × (r × (1+r)^n) / ((1+r)^n - 1)
```
Where:
- P = Principal (total amount to finance)
- r = Monthly interest rate
- n = Number of months

### Missouri Tax Calculation
```
Sales Tax = (Purchase Price - Trade-in Value) × Tax Rate
```
Only the difference between new car price and trade-in value is taxed.

## File Structure
- `index.html` - Main application interface
- `app.js` - Core functionality and calculations
- `cars_csv.csv` - Original vehicle data
- `README.md` - This documentation

The application is fully self-contained and works offline once loaded in a browser.
