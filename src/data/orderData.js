/**
 * Sample order data for the TMS Dashboard
 */

export const orders = [
  {
    id: '21424',
    soNumber: '21424',
    totalWeight: '70 Ton',
    numberOfDOs: 1,
    numberOfSKUs: 20,
    totalCost: '₹ 5,00,000',
    createdAt: '3 PM, 10 Feb 24',
    status: 'In Transit',
    isOnTime: true,
    eta: '09:34 AM, 12 Mar 23',
    sta: '06:14 AM, 11 Mar 23',
    nextMilestone: 'At Destination',
    nextMilestoneEta: '07:20 AM, 11 Mar 23',
    sender: {
      name: 'MDC Labs Ltd',
      address: 'Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, Amritsar, Punjab',
      gstin: '123456789',
      email: 'someemailaddress@somemail.com',
      phone: '84973-47593'
    },
    shipTo: {
      name: 'Sai Traders',
      address: 'Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, New Delhi 110001',
      gstin: '123456789',
      email: 'someemailaddress@somemail.com',
      phone: '84973-47593'
    },
    billTo: {
      name: 'Sai Traders',
      address: 'Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, New Delhi 110001',
      gstin: '123456789',
      email: 'someemailaddress@somemail.com',
      phone: '84973-47593'
    },
    planningId: '84975345',
    indentId: '84975345',
    journeyId: '84975345',
    epodId: '-',
    invoiceNumber: '-'
  },
  {
    id: '21425',
    soNumber: '21425',
    totalWeight: '45 Ton',
    numberOfDOs: 2,
    numberOfSKUs: 15,
    totalCost: '₹ 3,50,000',
    createdAt: '5 PM, 15 Feb 24',
    status: 'Delivered',
    isOnTime: true,
    eta: '10:30 AM, 18 Feb 24',
    sta: '09:45 AM, 18 Feb 24',
    nextMilestone: 'Completed',
    nextMilestoneEta: 'N/A',
    sender: {
      name: 'ABC Pharmaceuticals',
      address: 'Industrial Area, Phase 2, Chandigarh',
      gstin: '987654321',
      email: 'info@abcpharma.com',
      phone: '98765-43210'
    },
    shipTo: {
      name: 'City Hospital',
      address: 'Medical Complex, Sector 10, Mumbai 400001',
      gstin: '456789123',
      email: 'procurement@cityhospital.com',
      phone: '87654-32109'
    },
    billTo: {
      name: 'City Hospital',
      address: 'Medical Complex, Sector 10, Mumbai 400001',
      gstin: '456789123',
      email: 'accounts@cityhospital.com',
      phone: '87654-32109'
    },
    planningId: '84975346',
    indentId: '84975346',
    journeyId: '84975346',
    epodId: '84975346',
    invoiceNumber: 'INV-2024-0123'
  },
  {
    id: '21426',
    soNumber: '21426',
    totalWeight: '30 Ton',
    numberOfDOs: 1,
    numberOfSKUs: 8,
    totalCost: '₹ 2,75,000',
    createdAt: '9 AM, 20 Feb 24',
    status: 'Planning',
    isOnTime: false,
    eta: '02:00 PM, 25 Feb 24',
    sta: 'N/A',
    nextMilestone: 'Vehicle Assignment',
    nextMilestoneEta: '12:00 PM, 22 Feb 24',
    sender: {
      name: 'XYZ Electronics',
      address: 'Tech Park, Electronic City, Bangalore',
      gstin: '567891234',
      email: 'dispatch@xyzelectronics.com',
      phone: '76543-21098'
    },
    shipTo: {
      name: 'Retail Solutions Inc',
      address: 'Commercial Street, Chennai 600001',
      gstin: '678912345',
      email: 'orders@retailsolutions.com',
      phone: '65432-10987'
    },
    billTo: {
      name: 'Retail Solutions Inc',
      address: 'Commercial Street, Chennai 600001',
      gstin: '678912345',
      email: 'finance@retailsolutions.com',
      phone: '65432-10987'
    },
    planningId: '84975347',
    indentId: '-',
    journeyId: '-',
    epodId: '-',
    invoiceNumber: '-'
  }
];

export const orderTimelines = {
  '21424': [
    {
      id: 1,
      date: '12 March 2023',
      events: [
        {
          id: 'so-generated',
          type: 'SO Generated',
          time: '09:34 AM',
          details: 'SO: 7134895',
          icon: 'document'
        },
        {
          id: 'planning',
          type: 'Planning',
          time: 'Time taken: 2 hrs',
          details: 'SO: 7134895',
          icon: 'planning',
          subEvents: [
            {
              id: 'in-process',
              type: 'In Process',
              details: 'Weight: 21 Ton',
              time: 'Runtime: 2 hr'
            },
            {
              id: 'plan-generated',
              type: 'Plan generated',
              details: 'Plan ID: 32151235',
              time: 'At 09:34 AM'
            }
          ]
        },
        {
          id: 'indent',
          type: 'Indent',
          time: 'Time taken: 12 hrs',
          details: 'Indent ID: 7283465',
          icon: 'indent',
          subEvents: [
            {
              id: 'published',
              type: 'Published',
              details: 'Acceptance deadline: 09:45 AM, 26 April 2025',
              time: 'On: 09:34 AM',
              additionalInfo: 'Published to: Safe and Express Transporters'
            },
            {
              id: 'pending-acceptance',
              type: 'Pending Acceptance',
              time: 'Time taken: 2 hrs',
              timeRange: {
                start: '09:34 AM',
                end: '11:34 AM'
              }
            },
            {
              id: 'in-assignment',
              type: 'In Assignment',
              time: 'Time taken: 4 hrs',
              timeRange: {
                start: '09:34 AM',
                end: '11:34 AM'
              }
            },
            {
              id: 'reporting',
              type: 'Reporting',
              details: 'Vehicle No: AP 12K 1234',
              time: 'Reported On: 09:34 AM'
            }
          ]
        },
        {
          id: 'transit',
          type: 'Transit',
          time: 'Time taken: 3 days',
          details: 'Trip ID: 7283465',
          icon: 'transit'
        }
      ]
    }
  ],
  '21425': [
    {
      id: 1,
      date: '18 February 2024',
      events: [
        {
          id: 'so-generated',
          type: 'SO Generated',
          time: '10:00 AM',
          details: 'SO: 7134896',
          icon: 'document'
        },
        {
          id: 'planning',
          type: 'Planning',
          time: 'Time taken: 1 hr',
          details: 'SO: 7134896',
          icon: 'planning'
        },
        {
          id: 'indent',
          type: 'Indent',
          time: 'Time taken: 6 hrs',
          details: 'Indent ID: 7283466',
          icon: 'indent'
        },
        {
          id: 'transit',
          type: 'Transit',
          time: 'Time taken: 2 days',
          details: 'Trip ID: 7283466',
          icon: 'transit'
        },
        {
          id: 'delivered',
          type: 'Delivered',
          time: '09:45 AM',
          details: 'POD ID: 7283466',
          icon: 'delivered'
        }
      ]
    }
  ],
  '21426': [
    {
      id: 1,
      date: '20 February 2024',
      events: [
        {
          id: 'so-generated',
          type: 'SO Generated',
          time: '09:00 AM',
          details: 'SO: 7134897',
          icon: 'document'
        },
        {
          id: 'planning',
          type: 'Planning',
          time: 'In Progress',
          details: 'SO: 7134897',
          icon: 'planning',
          status: 'active'
        }
      ]
    }
  ]
};

export const orderComments = {
  '21424': [
    {
      id: 1,
      user: 'Shastri',
      time: '11:20 AM, 12 Mar 24',
      comment: 'Some comments done by some user on some time'
    },
    {
      id: 2,
      user: 'Shastri',
      time: '11:20 AM, 12 Mar 24',
      comment: 'Some comments done by some user on some time'
    }
  ],
  '21425': [
    {
      id: 1,
      user: 'Rajesh',
      time: '02:15 PM, 18 Feb 24',
      comment: 'Delivery completed successfully. Customer signed the POD.'
    }
  ],
  '21426': []
};
