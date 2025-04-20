import React, { useState } from 'react';
import {
  // Typography components
  Typography, Text, Title, Subtitle, Label,
  
  // Layout components
  Grid, GridItem, Stack, Container, Card, Section,
  
  // Data Display components
  Table, List, Timeline, Badge,
  
  // Input components
  TextField, Select, DatePicker, SearchBar,
  
  // Feedback components
  Alert, Toast, Modal, Loader
} from '../components/core';

import { Box, Button, Divider, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

/**
 * Demo page for the core component library.
 */
const CoreComponentLibraryDemo = () => {
  // State for interactive components
  const [textValue, setTextValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [dateValue, setDateValue] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Sample data for components
  const tableColumns = [
    { id: 'id', label: 'ID', width: 100 },
    { id: 'name', label: 'Name' },
    { id: 'status', label: 'Status', 
      render: (value) => (
        <Badge 
          label={value} 
          color={value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'error'} 
        />
      )
    },
    { id: 'date', label: 'Date' },
  ];
  
  const tableData = [
    { id: 1, name: 'Order #12345', status: 'Active', date: '2023-01-15' },
    { id: 2, name: 'Order #12346', status: 'Pending', date: '2023-01-16' },
    { id: 3, name: 'Order #12347', status: 'Cancelled', date: '2023-01-17' },
  ];
  
  const listItems = [
    { id: 1, primary: 'Item 1', secondary: 'Description for item 1', button: true },
    { id: 2, primary: 'Item 2', secondary: 'Description for item 2', button: true },
    { id: 3, primary: 'Item 3', secondary: 'Description for item 3', button: true },
  ];
  
  const timelineEvents = [
    { 
      id: 1, 
      title: 'Order Created', 
      content: 'Order was created and is awaiting processing', 
      date: '2023-01-15 09:00', 
      icon: <InfoIcon />, 
      color: 'info' 
    },
    { 
      id: 2, 
      title: 'Order Processed', 
      content: 'Order has been processed and is ready for shipping', 
      date: '2023-01-16 14:30', 
      icon: <CheckCircleIcon />, 
      color: 'success' 
    },
    { 
      id: 3, 
      title: 'Order Shipped', 
      content: 'Order has been shipped and is on its way', 
      date: '2023-01-17 11:15', 
      icon: <LocalShippingIcon />, 
      color: 'primary' 
    },
  ];
  
  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  
  const searchSuggestions = [
    { id: 1, label: 'Order #12345', description: 'Active - 2023-01-15' },
    { id: 2, label: 'Order #12346', description: 'Pending - 2023-01-16' },
    { id: 3, label: 'Order #12347', description: 'Cancelled - 2023-01-17' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Title level={1} gutterBottom>Core Component Library</Title>
      <Text>This page demonstrates the core components available in the library.</Text>
      
      {/* Typography Components */}
      <Section title="Typography Components">
        <Grid columns={2} spacing={3}>
          <GridItem span={1}>
            <Card title="Typography Variants">
              <Stack spacing={2}>
                <Typography variant="h1">Heading 1</Typography>
                <Typography variant="h2">Heading 2</Typography>
                <Typography variant="h3">Heading 3</Typography>
                <Typography variant="h4">Heading 4</Typography>
                <Typography variant="h5">Heading 5</Typography>
                <Typography variant="h6">Heading 6</Typography>
                <Typography variant="subtitle1">Subtitle 1</Typography>
                <Typography variant="subtitle2">Subtitle 2</Typography>
                <Typography variant="body1">Body 1</Typography>
                <Typography variant="body2">Body 2</Typography>
                <Typography variant="caption">Caption</Typography>
                <Typography variant="button">Button</Typography>
                <Typography variant="overline">Overline</Typography>
              </Stack>
            </Card>
          </GridItem>
          
          <GridItem span={1}>
            <Card title="Specialized Typography Components">
              <Stack spacing={2}>
                <Title level={1}>Title Level 1</Title>
                <Title level={2}>Title Level 2</Title>
                <Title level={3}>Title Level 3</Title>
                <Subtitle size={1}>Subtitle Size 1</Subtitle>
                <Subtitle size={2}>Subtitle Size 2</Subtitle>
                <Text>Default Text</Text>
                <Text size="small">Small Text</Text>
                <Text size="large">Large Text</Text>
                <Text weight="bold">Bold Text</Text>
                <Label>Form Label</Label>
                <Label required>Required Label</Label>
              </Stack>
            </Card>
          </GridItem>
        </Grid>
      </Section>
      
      {/* Layout Components */}
      <Section title="Layout Components">
        <Stack spacing={3}>
          <Card title="Grid System">
            <Grid spacing={2}>
              <GridItem span={12}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                  <Text>span=12</Text>
                </Paper>
              </GridItem>
              <GridItem span={6}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                  <Text>span=6</Text>
                </Paper>
              </GridItem>
              <GridItem span={6}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                  <Text>span=6</Text>
                </Paper>
              </GridItem>
              <GridItem span={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                  <Text>span=4</Text>
                </Paper>
              </GridItem>
              <GridItem span={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                  <Text>span=4</Text>
                </Paper>
              </GridItem>
              <GridItem span={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light' }}>
                  <Text>span=4</Text>
                </Paper>
              </GridItem>
            </Grid>
          </Card>
          
          <Card title="Stack">
            <Stack spacing={2}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
                <Text>Item 1</Text>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
                <Text>Item 2</Text>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
                <Text>Item 3</Text>
              </Paper>
            </Stack>
            
            <Divider sx={{ my: 3 }} />
            
            <Stack direction="row" spacing={2}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
                <Text>Item 1</Text>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
                <Text>Item 2</Text>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light' }}>
                <Text>Item 3</Text>
              </Paper>
            </Stack>
          </Card>
          
          <Card title="Card Component" subtitle="With title, subtitle, and footer">
            <Text>This is the content of the card.</Text>
            <footer>
              <Button variant="contained">Action</Button>
            </footer>
          </Card>
        </Stack>
      </Section>
      
      {/* Data Display Components */}
      <Section title="Data Display Components">
        <Stack spacing={3}>
          <Card title="Table">
            <Table
              columns={tableColumns}
              data={tableData}
              defaultSortColumn="id"
              onRowClick={(row) => console.log('Row clicked:', row)}
            />
          </Card>
          
          <Grid columns={2} spacing={3}>
            <GridItem span={1}>
              <Card title="List">
                <List items={listItems} dividers />
              </Card>
            </GridItem>
            
            <GridItem span={1}>
              <Card title="Timeline">
                <Timeline events={timelineEvents} />
              </Card>
            </GridItem>
          </Grid>
          
          <Card title="Badges">
            <Stack direction="row" spacing={2}>
              <Badge label="Default" />
              <Badge label="Primary" color="primary" />
              <Badge label="Secondary" color="secondary" />
              <Badge label="Success" color="success" />
              <Badge label="Warning" color="warning" />
              <Badge label="Error" color="error" />
              <Badge label="Info" color="info" />
            </Stack>
            
            <Divider sx={{ my: 2 }} />
            
            <Stack direction="row" spacing={2}>
              <Badge label="Outlined" variant="outlined" />
              <Badge label="Primary" variant="outlined" color="primary" />
              <Badge label="Secondary" variant="outlined" color="secondary" />
              <Badge label="Success" variant="outlined" color="success" />
              <Badge label="Warning" variant="outlined" color="warning" />
              <Badge label="Error" variant="outlined" color="error" />
              <Badge label="Info" variant="outlined" color="info" />
            </Stack>
            
            <Divider sx={{ my: 2 }} />
            
            <Stack direction="row" spacing={2}>
              <Badge label="Small" size="small" color="primary" />
              <Badge label="Medium" size="medium" color="primary" />
              <Badge label="Large" size="large" color="primary" />
              <Badge label="With Icon" color="success" icon={<CheckCircleIcon />} />
            </Stack>
          </Card>
        </Stack>
      </Section>
      
      {/* Input Components */}
      <Section title="Input Components">
        <Grid columns={2} spacing={3}>
          <GridItem span={1}>
            <Card title="Text Field">
              <Stack spacing={2}>
                <TextField
                  label="Standard Text Field"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="Enter text..."
                />
                
                <TextField
                  label="With Helper Text"
                  helperText="This is helper text"
                />
                
                <TextField
                  label="With Error"
                  error="This field is required"
                  helperText="This field is required"
                />
                
                <TextField
                  label="With Start Adornment"
                  startAdornment="$"
                />
                
                <TextField
                  label="With End Adornment"
                  endAdornment="kg"
                />
                
                <TextField
                  label="Multiline"
                  multiline
                  rows={3}
                />
              </Stack>
            </Card>
          </GridItem>
          
          <GridItem span={1}>
            <Card title="Select">
              <Stack spacing={2}>
                <Select
                  label="Standard Select"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  options={selectOptions}
                  placeholder="Select an option..."
                />
                
                <Select
                  label="With Helper Text"
                  options={selectOptions}
                  helperText="This is helper text"
                />
                
                <Select
                  label="With Error"
                  options={selectOptions}
                  error="This field is required"
                  helperText="This field is required"
                />
                
                <Select
                  label="Multiple Select"
                  options={selectOptions}
                  multiple
                  value={[]}
                />
              </Stack>
            </Card>
          </GridItem>
          
          <GridItem span={1}>
            <Card title="Date Picker">
              <DatePicker
                label="Standard Date Picker"
                value={dateValue}
                onChange={setDateValue}
              />
            </Card>
          </GridItem>
          
          <GridItem span={1}>
            <Card title="Search Bar">
              <SearchBar
                placeholder="Search orders..."
                value={searchValue}
                onChange={setSearchValue}
                onSearch={(value) => console.log('Search:', value)}
                suggestions={searchSuggestions}
              />
            </Card>
          </GridItem>
        </Grid>
      </Section>
      
      {/* Feedback Components */}
      <Section title="Feedback Components">
        <Grid columns={2} spacing={3}>
          <GridItem span={1}>
            <Card title="Alerts">
              <Stack spacing={2}>
                <Alert severity="info">This is an info alert.</Alert>
                <Alert severity="success">This is a success alert.</Alert>
                <Alert severity="warning">This is a warning alert.</Alert>
                <Alert severity="error">This is an error alert.</Alert>
                <Alert severity="info" title="With Title">
                  This is an alert with a title.
                </Alert>
                <Alert severity="info" variant="filled">
                  This is a filled alert.
                </Alert>
                <Alert severity="info" variant="outlined">
                  This is an outlined alert.
                </Alert>
              </Stack>
            </Card>
          </GridItem>
          
          <GridItem span={1}>
            <Card title="Toast & Modal">
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => setToastOpen(true)}
                >
                  Show Toast
                </Button>
                
                <Button
                  variant="contained"
                  onClick={() => setModalOpen(true)}
                >
                  Show Modal
                </Button>
                
                <Toast
                  open={toastOpen}
                  onClose={() => setToastOpen(false)}
                  message="This is a toast message."
                  severity="success"
                  title="Success"
                />
                
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Modal Title"
                  actions={
                    <>
                      <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                      <Button variant="contained" onClick={() => setModalOpen(false)}>
                        Confirm
                      </Button>
                    </>
                  }
                >
                  <Text>This is the content of the modal.</Text>
                </Modal>
              </Stack>
            </Card>
          </GridItem>
          
          <GridItem span={2}>
            <Card title="Loaders">
              <Stack direction="row" spacing={4} alignItems="center" justifyContent="center">
                <Loader size="small" />
                <Loader size="medium" />
                <Loader size="large" />
                <Loader size="medium" message="Loading..." />
              </Stack>
            </Card>
          </GridItem>
        </Grid>
      </Section>
    </Container>
  );
};

export default CoreComponentLibraryDemo;
