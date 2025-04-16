import { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const ReleaseCarousel = ({ releases }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % releases.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, releases.length]);

  // Pause autoplay when user interacts with carousel
  const handleManualNavigation = (index) => {
    setAutoplay(false);
    setActiveIndex(index);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  const handlePrevious = () => {
    const newIndex = activeIndex === 0 ? releases.length - 1 : activeIndex - 1;
    handleManualNavigation(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % releases.length;
    handleManualNavigation(newIndex);
  };

  // Gradient backgrounds for carousel items
  const gradients = [
    'radial-gradient(99.25% 287.53% at 0.75% 6.5%, #FFEBDC 0%, #ECF6FF 46%, #FFEAEA 100%)',
    'radial-gradient(100.4% 291.04% at 0.28% 40.18%, #E3F2FD 0%, #FFF3CD 100%)',
    'radial-gradient(99.25% 287.53% at 0.75% 6.5%, #FFEBDC 0%, #ECF6FF 46%, #FFEAEA 100%)'
  ];

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Carousel Content */}
      <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        {releases.map((release, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === activeIndex ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              display: 'flex',
              flexDirection: 'column',
              padding: '40px',
              gap: '32px',
              background: gradients[index % gradients.length],
              border: '1px solid #F8F8F9',
              borderRadius: '16px',
              visibility: index === activeIndex ? 'visible' : 'hidden',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '32px',
                  lineHeight: '39px',
                  color: '#434F64',
                }}
              >
                {release.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '140%',
                  color: '#5F697B',
                }}
              >
                {release.description}
              </Typography>
            </Box>
            {release.image && (
              <Box
                component="img"
                src={release.image}
                alt={release.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '60%',
                  objectFit: 'contain',
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
        }}
      >
        <KeyboardArrowRight />
      </IconButton>

      {/* Pagination Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center',
          gap: '3px',
        }}
      >
        {releases.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleManualNavigation(index)}
            sx={{
              width: index === activeIndex ? '36px' : '8px',
              height: '8px',
              backgroundColor: index === activeIndex ? '#434F64' : '#CED1D7',
              borderRadius: '100px',
              cursor: 'pointer',
              transition: 'width 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ReleaseCarousel;
