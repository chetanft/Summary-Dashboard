// src/services/operationsService.js
// Simple service to fetch dock occupancy data

export const fetchDockOccupancyData = async () => {
  // In a real app, this would be an API call
  // For now, return mock data
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  // Simple data structure
  const docks = Array.from({ length: 10 }, (_, i) => `Dock ${i + 1}`);
  const hours = [
    '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', 
    '19:00', '20:00', '21:00', '22:00', '23:00'
  ];
  
  const vehicleTypes = {
    'Mini Truck': { color: '#ffbe07' },
    '14-ft Truck': { color: '#003c9b' },
    'Trailer': { color: '#04bc15' },
    'Container': { color: '#939393' }
  };
  
  // Generate sample occupancy data that matches the image
  const occupancy = [
    // First row - 6:00
    { dockIndex: 0, hourIndex: 0, vehicleType: 'Mini Truck', duration: 2 },
    { dockIndex: 6, hourIndex: 0, vehicleType: 'Trailer', duration: 2 },
    
    // Second row - 7:00
    { dockIndex: 1, hourIndex: 1, vehicleType: 'Mini Truck', duration: 1 },
    { dockIndex: 8, hourIndex: 1, vehicleType: 'Trailer', duration: 1 },
    
    // Third row - 8:00 (empty)
    
    // Fourth row - 9:00
    { dockIndex: 2, hourIndex: 3, vehicleType: 'Mini Truck', duration: 1 },
    { dockIndex: 3, hourIndex: 3, vehicleType: '14-ft Truck', duration: 2 },
    { dockIndex: 4, hourIndex: 3, vehicleType: '14-ft Truck', duration: 1 },
    
    // Fifth row - 10:00
    { dockIndex: 6, hourIndex: 4, vehicleType: '14-ft Truck', duration: 1 },
    { dockIndex: 7, hourIndex: 4, vehicleType: 'Container', duration: 2 },
    
    // Sixth row - 11:00 (empty)
    
    // Seventh row - 12:00 (empty)
    
    // Eighth row - Container spanning multiple rows
    { dockIndex: 0, hourIndex: 2, vehicleType: 'Container', duration: 3 },
    
    // Ninth row - Mini Truck and Trailer
    { dockIndex: 0, hourIndex: 5, vehicleType: 'Mini Truck', duration: 1 },
    { dockIndex: 2, hourIndex: 5, vehicleType: 'Trailer', duration: 1 },
    
    // Additional rows
    { dockIndex: 0, hourIndex: 6, vehicleType: 'Trailer', duration: 1 },
    { dockIndex: 2, hourIndex: 6, vehicleType: 'Trailer', duration: 1 },
    
    // More data for other hours
    { dockIndex: 0, hourIndex: 7, vehicleType: 'Container', duration: 1 },
    { dockIndex: 2, hourIndex: 7, vehicleType: 'Container', duration: 1 },
    { dockIndex: 4, hourIndex: 7, vehicleType: 'Container', duration: 1 },
    { dockIndex: 5, hourIndex: 7, vehicleType: 'Container', duration: 1 },
    
    { dockIndex: 0, hourIndex: 8, vehicleType: 'Container', duration: 1 },
    { dockIndex: 2, hourIndex: 8, vehicleType: 'Container', duration: 1 },
    
    { dockIndex: 5, hourIndex: 9, vehicleType: 'Container', duration: 1 },
    
    { dockIndex: 4, hourIndex: 10, vehicleType: 'Container', duration: 1 },
    { dockIndex: 7, hourIndex: 10, vehicleType: 'Mini Truck', duration: 1 },
    
    { dockIndex: 9, hourIndex: 11, vehicleType: 'Mini Truck', duration: 1 }
  ];
  
  return {
    docks,
    hours,
    vehicleTypes,
    occupancy
  };
};
