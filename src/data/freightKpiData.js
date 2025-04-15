// Mock data for the Freight KPI Chart
export const freightKpiData = {
  actual: [
    { date: "2025-03-01", value: 1.2 },
    { date: "2025-03-02", value: 2.5 },
    { date: "2025-03-03", value: 3.1 },
    { date: "2025-03-04", value: 3.8 },
    { date: "2025-03-05", value: 4.6 },
    { date: "2025-03-06", value: 5.2 },
    { date: "2025-03-07", value: 5.9 },
    { date: "2025-03-08", value: 6.4 },
    { date: "2025-03-09", value: 7.0 },
    { date: "2025-03-10", value: 7.8 },
    { date: "2025-03-11", value: 8.5 },
    { date: "2025-03-12", value: 9.1 },
    { date: "2025-03-13", value: 9.6 },
    { date: "2025-03-14", value: 10.2 },
    { date: "2025-03-15", value: 10.8 }
  ],
  projectedValue: 22,
  budgetValue: 20
};

// Function to generate data for the entire month
export const generateFullMonthData = (actualData, projectedValue, budgetValue) => {
  const lastActualDate = new Date(actualData[actualData.length - 1].date);
  const lastActualValue = actualData[actualData.length - 1].value;
  
  // Get the last day of the month
  const year = lastActualDate.getFullYear();
  const month = lastActualDate.getMonth();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  
  // Calculate how many days are left in the month
  const daysLeft = lastDayOfMonth - lastActualDate.getDate();
  
  // Calculate the daily increment needed to reach the projected value
  const valueLeft = projectedValue - lastActualValue;
  const dailyIncrement = valueLeft / daysLeft;
  
  // Generate the projected data points
  const projectedData = [];
  let currentValue = lastActualValue;
  
  for (let i = 1; i <= daysLeft; i++) {
    const nextDate = new Date(lastActualDate);
    nextDate.setDate(lastActualDate.getDate() + i);
    
    currentValue += dailyIncrement;
    
    projectedData.push({
      date: nextDate.toISOString().split('T')[0],
      value: currentValue
    });
  }
  
  // Generate the budget data (constant value for each day)
  const budgetData = [];
  const startDate = new Date(actualData[0].date);
  
  for (let i = 0; i < lastDayOfMonth; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    budgetData.push({
      date: currentDate.toISOString().split('T')[0],
      value: budgetValue
    });
  }
  
  return {
    actual: actualData,
    projected: projectedData,
    budget: budgetData,
    projectedValue,
    budgetValue
  };
};

// Generate the full month data
export const fullMonthData = generateFullMonthData(
  freightKpiData.actual,
  freightKpiData.projectedValue,
  freightKpiData.budgetValue
);
