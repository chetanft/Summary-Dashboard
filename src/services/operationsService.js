// src/services/operationsService.js
// Simple service to fetch dock occupancy data

export const fetchDockOccupancyData = async () => {
  // In a real app, this would be an API call
  // For now, return mock data
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  // Simple data structure
  const docks = Array.from({ length: 10 }, (_, i) => `Dock ${i + 1}`);
  const hours = Array.from({ length: 18 }, (_, i) => `${i + 6}:00`);
  const vehicleTypes = {
    'Mini Truck': { color: '#ffbe07' },
    '14-ft Truck': { color: '#003c9b' },
    'Trailer': { color: '#04bc15' },
    'Container': { color: '#939393' }
  };
  
  // Generate some sample occupancy data
  const occupancy = [
    { dockIndex: 0, hourIndex: 0, vehicleType: 'Mini Truck', duration: 2 },
    { dockIndex: 1, hourIndex: 2, vehicleType: '14-ft Truck', duration: 3 },
    { dockIndex: 2, hourIndex: 5, vehicleType: 'Trailer', duration: 2 },
    { dockIndex: 3, hourIndex: 8, vehicleType: 'Container', duration: 4 },
    { dockIndex: 4, hourIndex: 12, vehicleType: 'Mini Truck', duration: 2 },
    { dockIndex: 5, hourIndex: 14, vehicleType: '14-ft Truck', duration: 3 },
    { dockIndex: 6, hourIndex: 0, vehicleType: 'Trailer', duration: 2 },
    { dockIndex: 7, hourIndex: 3, vehicleType: 'Container', duration: 3 },
    { dockIndex: 8, hourIndex: 7, vehicleType: 'Mini Truck', duration: 2 },
    { dockIndex: 9, hourIndex: 10, vehicleType: '14-ft Truck', duration: 4 },
    // Add more realistic data
    { dockIndex: 0, hourIndex: 6, vehicleType: 'Container', duration: 3 },
    { dockIndex: 1, hourIndex: 9, vehicleType: 'Mini Truck', duration: 2 },
    { dockIndex: 2, hourIndex: 11, vehicleType: '14-ft Truck', duration: 3 },
    { dockIndex: 3, hourIndex: 14, vehicleType: 'Trailer', duration: 2 },
    { dockIndex: 4, hourIndex: 3, vehicleType: 'Container', duration: 4 },
    { dockIndex: 5, hourIndex: 8, vehicleType: 'Mini Truck', duration: 2 },
    { dockIndex: 6, hourIndex: 10, vehicleType: '14-ft Truck', duration: 3 },
    { dockIndex: 7, hourIndex: 13, vehicleType: 'Trailer', duration: 2 },
    { dockIndex: 8, hourIndex: 15, vehicleType: 'Container', duration: 3 },
    { dockIndex: 9, hourIndex: 2, vehicleType: 'Mini Truck', duration: 2 }
  ];
  
  return {
    docks,
    hours,
    vehicleTypes,
    occupancy
  };
};
