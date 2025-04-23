import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@mui/material';
import Icon from '../../common/Icon';

/**
 * Print Button component
 * Button to print the journey details
 *
 * @param {Object} props - Component props
 * @param {Object} props.journeyDetails - Journey details object
 * @returns {JSX.Element}
 */
const PrintButton = forwardRef(({ journeyDetails }, ref) => {
  const handlePrint = () => {
    // Get stop color based on type
    const getStopColor = (type) => {
      const colors = {
        'Origin': '#1D4ED8',
        'Pickup': '#10B981',
        'Transfer': '#6366F1',
        'Destination': '#EF4444',
        'Return Pickup': '#F59E0B',
        'Return Origin': '#1D4ED8'
      };
      return colors[type] || '#9CA3AF';
    };

    // Create a new window for printing
    const printWindow = window.open('', '_blank');

    // Generate print-friendly HTML
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Journey Details: ${journeyDetails.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 { font-size: 24px; margin-bottom: 20px; }
          h2 { font-size: 18px; margin-top: 30px; margin-bottom: 10px; }
          .overview-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
          }
          .overview-item { margin-bottom: 15px; }
          .label { font-weight: bold; display: block; font-size: 14px; color: #666; }
          .value { font-size: 16px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { text-align: left; padding: 10px; background: #f3f4f6; font-weight: 500; }
          td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
          .stop-type {
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            color: white;
            text-align: center;
            line-height: 30px;
            margin-right: 10px;
            font-weight: bold;
            font-size: 12px;
          }
          .location-info {
            display: inline-block;
            vertical-align: top;
          }
          .location-name {
            font-weight: bold;
            margin-bottom: 4px;
          }
          .location-address {
            color: #666;
            font-size: 14px;
          }
          @media print {
            body { font-size: 12pt; }
            h1 { font-size: 18pt; }
            h2 { font-size: 14pt; }
          }
        </style>
      </head>
      <body>
        <h1>Journey Details: ${journeyDetails.id}</h1>

        <div class="overview-grid">
          <div class="overview-item">
            <span class="label">Shipper</span>
            <span class="value">${journeyDetails.shipper.name}</span>
          </div>

          <div class="overview-item">
            <span class="label">Trip starts on</span>
            <span class="value">${journeyDetails.tripStart.formattedDate}</span>
          </div>

          <div class="overview-item">
            <span class="label">Standard transit time</span>
            <span class="value">${journeyDetails.transitTime.days} days ${journeyDetails.transitTime.hours} hrs ${journeyDetails.transitTime.minutes} min</span>
          </div>

          <div class="overview-item">
            <span class="label">Total distance</span>
            <span class="value">${journeyDetails.totalDistance.value} ${journeyDetails.totalDistance.unit}</span>
          </div>
        </div>

        <h2>Route Details</h2>
        <table>
          <thead>
            <tr>
              <th>Stops</th>
              <th>Vehicle & Driver</th>
              <th>Load ID</th>
            </tr>
          </thead>
          <tbody>
            ${journeyDetails.stops.map(stop => `
              <tr>
                <td>
                  <div style="display: flex; align-items: flex-start;">
                    <div class="stop-type" style="background-color: ${getStopColor(stop.type)}">
                      ${stop.typeCode}
                    </div>
                    <div class="location-info">
                      <div class="location-name">${stop.location.name}</div>
                      <div class="location-address">${stop.location.city}, ${stop.location.state}</div>
                    </div>
                  </div>
                </td>
                <td>
                  ${stop.vehicle ? `${stop.vehicle.number}<br>${stop.driver.name}` : ''}
                </td>
                <td>
                  ${stop.load.isReturn ? '<span style="font-style: italic; color: #666;">Return: </span>' : ''}${stop.load.id}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;

    // Write to the new window and print
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <Tooltip title="Print journey details (P)">
      <Button
        ref={ref}
        variant="outlined"
        startIcon={<Icon name="Printer" size={16} />}
        onClick={handlePrint}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePrint();
          }
        }}
        aria-label="Print journey details"
        tabIndex={0}
        sx={{
        ml: 2,
        borderColor: 'divider',
        color: 'text.secondary',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'transparent'
        },
        '&:focus-visible': {
          backgroundColor: 'action.hover',
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px'
        }
      }}
    >
      Print
    </Button>
    </Tooltip>
  );
});

PrintButton.propTypes = {
  journeyDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shipper: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    tripStart: PropTypes.shape({
      formattedDate: PropTypes.string.isRequired
    }).isRequired,
    transitTime: PropTypes.shape({
      days: PropTypes.number.isRequired,
      hours: PropTypes.number.isRequired,
      minutes: PropTypes.number.isRequired
    }).isRequired,
    totalDistance: PropTypes.shape({
      value: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired
    }).isRequired,
    stops: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        typeCode: PropTypes.string.isRequired,
        location: PropTypes.shape({
          name: PropTypes.string.isRequired,
          city: PropTypes.string,
          state: PropTypes.string
        }).isRequired,
        vehicle: PropTypes.shape({
          number: PropTypes.string
        }),
        driver: PropTypes.shape({
          name: PropTypes.string
        }),
        load: PropTypes.shape({
          id: PropTypes.string.isRequired,
          isReturn: PropTypes.bool
        }).isRequired
      })
    ).isRequired
  }).isRequired
};

// Display name for debugging
PrintButton.displayName = 'PrintButton';

export default PrintButton;
