import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import StandardTable from '../StandardTable';
import theme from '../../../../theme/unifiedThemeConfig';

describe('StandardTable', () => {
  const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'email', label: 'Email', sortable: false },
    { 
      id: 'status', 
      label: 'Status', 
      sortable: true,
      renderCell: (row) => (
        <div data-testid={`status-${row.id}`}>
          {row.status === 'active' ? 'Active' : 'Inactive'}
        </div>
      )
    },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
  ];

  const renderWithTheme = (ui) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  test('renders table with correct columns and data', () => {
    renderWithTheme(
      <StandardTable
        columns={columns}
        data={data}
      />
    );

    // Check if column headers are rendered
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Check if data rows are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByTestId('status-3')).toBeInTheDocument();
  });

  test('handles row click correctly', () => {
    const handleRowClick = jest.fn();
    renderWithTheme(
      <StandardTable
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
      />
    );

    // Click on a row
    fireEvent.click(screen.getByText('John Doe'));
    expect(handleRowClick).toHaveBeenCalledWith(data[0]);
  });

  test('handles sorting correctly', () => {
    renderWithTheme(
      <StandardTable
        columns={columns}
        data={data}
        initialSortBy="name"
        initialSortDirection="asc"
      />
    );

    // Check initial sort order (asc)
    const rows = screen.getAllByRole('row').slice(1); // Skip header row
    expect(within(rows[0]).getByText('Bob Johnson')).toBeInTheDocument();
    expect(within(rows[1]).getByText('Jane Smith')).toBeInTheDocument();
    expect(within(rows[2]).getByText('John Doe')).toBeInTheDocument();

    // Click on Name column header to change sort direction
    fireEvent.click(screen.getByText('Name'));

    // Check new sort order (desc)
    const rowsAfterSort = screen.getAllByRole('row').slice(1);
    expect(within(rowsAfterSort[0]).getByText('John Doe')).toBeInTheDocument();
    expect(within(rowsAfterSort[1]).getByText('Jane Smith')).toBeInTheDocument();
    expect(within(rowsAfterSort[2]).getByText('Bob Johnson')).toBeInTheDocument();
  });

  test('handles selection correctly', () => {
    const handleSelectionChange = jest.fn();
    renderWithTheme(
      <StandardTable
        columns={columns}
        data={data}
        selectable={true}
        onSelectionChange={handleSelectionChange}
      />
    );

    // Check if checkboxes are rendered
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(data.length + 1); // +1 for header checkbox

    // Select a row
    fireEvent.click(checkboxes[1]); // First row checkbox
    expect(handleSelectionChange).toHaveBeenCalledWith([1]);

    // Select another row
    fireEvent.click(checkboxes[2]); // Second row checkbox
    expect(handleSelectionChange).toHaveBeenCalledWith([1, 2]);

    // Deselect a row
    fireEvent.click(checkboxes[1]); // First row checkbox again
    expect(handleSelectionChange).toHaveBeenCalledWith([2]);

    // Select all rows
    fireEvent.click(checkboxes[0]); // Header checkbox
    expect(handleSelectionChange).toHaveBeenCalledWith([1, 2, 3]);

    // Deselect all rows
    fireEvent.click(checkboxes[0]); // Header checkbox again
    expect(handleSelectionChange).toHaveBeenCalledWith([]);
  });

  test('renders empty state message when no data', () => {
    renderWithTheme(
      <StandardTable
        columns={columns}
        data={[]}
        emptyStateMessage="No data available"
      />
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('renders loading state correctly', () => {
    renderWithTheme(
      <StandardTable
        columns={columns}
        data={data}
        loading={true}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles pagination correctly', () => {
    // Create more data for pagination
    const moreData = [
      ...data,
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'active' },
      { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', status: 'inactive' },
      { id: 6, name: 'Eve Franklin', email: 'eve@example.com', status: 'active' },
      { id: 7, name: 'George Harris', email: 'george@example.com', status: 'inactive' },
      { id: 8, name: 'Ivy Jackson', email: 'ivy@example.com', status: 'active' },
      { id: 9, name: 'Kevin Lewis', email: 'kevin@example.com', status: 'inactive' },
      { id: 10, name: 'Laura Miller', email: 'laura@example.com', status: 'active' },
      { id: 11, name: 'Mike Nelson', email: 'mike@example.com', status: 'inactive' },
    ];

    renderWithTheme(
      <StandardTable
        columns={columns}
        data={moreData}
        pagination={true}
        defaultRowsPerPage={5}
      />
    );

    // Check if only first 5 rows are rendered initially
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Eve Franklin')).toBeInTheDocument();
    expect(screen.queryByText('Ivy Jackson')).not.toBeInTheDocument();

    // Go to next page
    const nextPageButton = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextPageButton);

    // Check if next 5 rows are rendered
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Ivy Jackson')).toBeInTheDocument();
    expect(screen.getByText('Laura Miller')).toBeInTheDocument();

    // Change rows per page
    const rowsPerPageSelect = screen.getByRole('combobox');
    fireEvent.mouseDown(rowsPerPageSelect);
    const tenOption = screen.getByRole('option', { name: '10' });
    fireEvent.click(tenOption);

    // Check if 10 rows are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Laura Miller')).toBeInTheDocument();
  });

  test('applies zebra striping correctly', () => {
    renderWithTheme(
      <StandardTable
        columns={columns}
        data={data}
        zebra={true}
      />
    );

    const rows = screen.getAllByRole('row').slice(1); // Skip header row
    
    // Check if odd rows have different background color
    // This is a bit tricky to test with styled-components, so we'll just check if the style is applied
    expect(rows[0]).toHaveStyle('background-color: inherit');
    expect(rows[1]).toHaveStyle(`background-color: ${theme.palette.action.hover}`);
  });

  test('applies variant styles correctly', () => {
    const { rerender } = renderWithTheme(
      <StandardTable
        columns={columns}
        data={data}
        variant="outlined"
      />
    );

    // Check if the outlined variant has a border
    const table = screen.getByRole('table').closest('div');
    expect(table).toHaveStyle('border: 1px solid');

    // Rerender with elevated variant
    rerender(
      <ThemeProvider theme={theme}>
        <StandardTable
          columns={columns}
          data={data}
          variant="elevated"
        />
      </ThemeProvider>
    );

    // Check if the elevated variant has a box shadow
    const elevatedTable = screen.getByRole('table').closest('div');
    expect(elevatedTable).toHaveStyle('box-shadow');
  });
});
