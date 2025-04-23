import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Button } from '@mui/material';
import Icon from '../../common/Icon';

/**
 * Journey Documents component
 * Displays documents related to the journey
 *
 * @param {Object} props - Component props
 * @param {Array} props.documents - Array of documents
 * @returns {JSX.Element}
 */
const JourneyDocuments = ({ documents }) => {
  // Default documents if none provided
  const docs = documents || [
    {
      id: 'doc-1',
      name: 'Driving Permit',
      type: 'permit',
      size: '1.5 MB',
      thumbnail: '/path/to/thumbnail1.jpg'
    },
    {
      id: 'doc-2',
      name: 'Invoice',
      type: 'invoice',
      size: '0.8 MB',
      thumbnail: '/path/to/thumbnail2.jpg'
    },
    {
      id: 'doc-3',
      name: 'Driving Permit',
      type: 'permit',
      size: '2.8 MB',
      thumbnail: '/path/to/thumbnail3.jpg'
    },
    {
      id: 'doc-4',
      name: 'Invoice',
      type: 'invoice',
      size: '0.9 MB',
      thumbnail: '/path/to/thumbnail4.jpg'
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '140%',
            color: '#5F697B'
          }}
        >
          Basic documents
        </Typography>
        <Button
          variant="outlined"
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '140%',
            color: '#434F64',
            textTransform: 'none',
            borderColor: '#CED1D7',
            '&:hover': {
              borderColor: '#434F64'
            }
          }}
        >
          Add Documents
        </Button>
      </Box>

      <Grid container spacing={2}>
        {docs.map((doc) => (
          <Grid item xs={12} sm={6} md={3} key={doc.id}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                background: '#FFFFFF',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '150px',
                  background: '#F0F1F7',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Icon name="Description" size={48} color="#838C9D" useMui={true} />
              </Box>
              <Box
                sx={{
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#434F64',
                    marginBottom: '4px'
                  }}
                >
                  {doc.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '140%',
                    color: '#838C9D'
                  }}
                >
                  {doc.size}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

JourneyDocuments.propTypes = {
  documents: PropTypes.array
};

export default JourneyDocuments;
