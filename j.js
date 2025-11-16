function calci(princi, anal, monPay) {
    const monRate = anal / 12 / 100;
    let bal = princi;
    let month = 0;
    let totalPaid = 0;
    const schedule = [];
    
    while (bal > 0 && month < 1000) {
        month++;
        
        // Interest for this month
        const interestPayment = bal * monRate;
        
        // Determine actual payment
        const actualPayment = Math.min(monthlyPayment, bal + interestPayment);
        
        // Principal payment
        const principalPayment = actualPayment - interestPayment;
        
        // Update balance
        bal -= principalPayment;
        totalPaid += actualPayment;
        
        schedule.push({
            month: month,
            payment: actualPayment,
            principal: principalPayment,
            interest: interestPayment,
            bal: Math.max(0, bal)
        });
    }
    
    const totalInterest = totalPaid - principal;
    return { months: month, totalPaid, totalInterest, schedule };
}

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', { 
        maximumFractionDigits: 0,
        minimumFractionDigits: 0 
    });
}

// Main calci
const principal = 2000000; 
const rate = 9; 
const monthlyPayment = 100000;

console.log('='.repeat(80));
console.log('LOAN COMPARISON ANALYSIS');
console.log(`Principal: ${formatCurrency(principal)}`);
console.log(`Interest Rate: ${rate}% per annum`);
console.log(`Your Monthly Payment: ${formatCurrency(monthlyPayment)}`);
console.log('='.repeat(80));
console.log();

const result = calci(principal, rate, monthlyPayment);
const years = result.months / 12;

console.log(`RESULTS WITH ${formatCurrency(monthlyPayment)}/MONTH PAYMENT:`);
console.log(`  Time to Pay Off: ${result.months} months (${years.toFixed(2)} years)`);
console.log(`  Total Amount Paid: ${formatCurrency(result.totalPaid)}`);
console.log(`  Total Interest Paid: ${formatCurrency(result.totalInterest)}`);
console.log(`  Interest Saved vs 10-year plan: ${formatCurrency(1040219 - result.totalInterest)}`);
console.log(`  Interest Saved vs 5-year plan: ${formatCurrency(491003 - result.totalInterest)}`);
console.log();

// Print detailed schedule
console.log('='.repeat(80));
console.log('DETAILED AMORTIZATION SCHEDULE (First 6 months)');
console.log('='.repeat(80));
console.log('Month'.padEnd(10) + 'Payment'.padEnd(18) + 'Principal'.padEnd(18) + 
            'Interest'.padEnd(18) + 'Balance');
console.log('-'.repeat(80));

for (let i = 0; i < result.schedule.length; i++) {
    const s = result.schedule[i];
    console.log(
        s.month.toString().padEnd(10) +
        formatCurrency(s.payment).padEnd(18) +
        formatCurrency(s.principal).padEnd(18) +
        formatCurrency(s.interest).padEnd(18) +
        formatCurrency(s.bal)
    );
}

if (result.schedule.length > 6) {
    console.log('...');
    console.log('\nLast 3 months:');
    console.log('-'.repeat(80));
    for (let i = Math.max(0, result.schedule.length - 3); i < result.schedule.length; i++) {
        const s = result.schedule[i];
        console.log(
            s.month.toString().padEnd(10) +
            formatCurrency(s.payment).padEnd(18) +
            formatCurrency(s.principal).padEnd(18) +
            formatCurrency(s.interest).padEnd(18) +
            formatCurrency(s.bal)
        );
    }
}

// compare
console.log('\n' + '='.repeat(80));
console.log('FINAL COMPARISON SUMMARY');
console.log('='.repeat(80));
console.log();
console.log('Scenario'.padEnd(30) + 'Tenure'.padEnd(15) + 'Total Paid'.padEnd(20) + 'Total Interest');
console.log('-'.repeat(80));
console.log('10-Year Plan (EMI)'.padEnd(30) + '120 months'.padEnd(15) + 
            formatCurrency(3040219).padEnd(20) + formatCurrency(1040219));
console.log('5-Year Plan (EMI)'.padEnd(30) + '60 months'.padEnd(15) + 
            formatCurrency(2491003).padEnd(20) + formatCurrency(491003));
console.log(`Your Plan (₹1L/month)`.padEnd(30) + `${result.months} months`.padEnd(15) + 
            formatCurrency(result.totalPaid).padEnd(20) + formatCurrency(result.totalInterest));
console.log('='.repeat(80));
console.log();
console.log('WINNER: Your plan with ₹1,00,000/month payment!');
console.log(`   - Pays off in just ${result.months} months (${years.toFixed(2)} years)`);
console.log(`   - Saves ${formatCurrency(1040219 - result.totalInterest)} compared to 10-year plan`);
console.log(`   - Saves ${formatCurrency(491003 - result.totalInterest)} compared to 5-year plan`);
