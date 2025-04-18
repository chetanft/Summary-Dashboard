/**
 * Figma Tokens Utilities
 * 
 * Utilities for processing and transforming Figma design tokens
 * into a format that can be used in our application.
 */

/**
 * Process color tokens from Figma
 * 
 * @param {Object} colorTokens - Color tokens from Figma
 * @returns {Object} - Processed color tokens ready for use in the theme
 */
export const processColorTokens = (colorTokens) => {
  const processedTokens = {
    primary: {},
    secondary: {},
    error: {},
    warning: {},
    success: {},
    info: {},
    grey: {},
    background: {},
    text: {},
  };
  
  // Process each token based on naming convention
  Object.entries(colorTokens).forEach(([name, data]) => {
    const nameParts = name.split('/');
    
    // Handle primary colors
    if (name.includes('primary')) {
      if (name.includes('light')) {
        processedTokens.primary.light = data.value;
      } else if (name.includes('dark')) {
        processedTokens.primary.dark = data.value;
      } else if (name.includes('main')) {
        processedTokens.primary.main = data.value;
      } else if (name.includes('contrast')) {
        processedTokens.primary.contrastText = data.value;
      } else {
        processedTokens.primary.main = data.value;
      }
    }
    
    // Handle secondary colors
    else if (name.includes('secondary')) {
      if (name.includes('light')) {
        processedTokens.secondary.light = data.value;
      } else if (name.includes('dark')) {
        processedTokens.secondary.dark = data.value;
      } else if (name.includes('main')) {
        processedTokens.secondary.main = data.value;
      } else if (name.includes('contrast')) {
        processedTokens.secondary.contrastText = data.value;
      } else {
        processedTokens.secondary.main = data.value;
      }
    }
    
    // Handle error colors
    else if (name.includes('error')) {
      if (name.includes('light')) {
        processedTokens.error.light = data.value;
      } else if (name.includes('dark')) {
        processedTokens.error.dark = data.value;
      } else if (name.includes('main')) {
        processedTokens.error.main = data.value;
      } else if (name.includes('contrast')) {
        processedTokens.error.contrastText = data.value;
      } else {
        processedTokens.error.main = data.value;
      }
    }
    
    // Handle warning colors
    else if (name.includes('warning')) {
      if (name.includes('light')) {
        processedTokens.warning.light = data.value;
      } else if (name.includes('dark')) {
        processedTokens.warning.dark = data.value;
      } else if (name.includes('main')) {
        processedTokens.warning.main = data.value;
      } else if (name.includes('contrast')) {
        processedTokens.warning.contrastText = data.value;
      } else {
        processedTokens.warning.main = data.value;
      }
    }
    
    // Handle success colors
    else if (name.includes('success')) {
      if (name.includes('light')) {
        processedTokens.success.light = data.value;
      } else if (name.includes('dark')) {
        processedTokens.success.dark = data.value;
      } else if (name.includes('main')) {
        processedTokens.success.main = data.value;
      } else if (name.includes('contrast')) {
        processedTokens.success.contrastText = data.value;
      } else {
        processedTokens.success.main = data.value;
      }
    }
    
    // Handle info colors
    else if (name.includes('info')) {
      if (name.includes('light')) {
        processedTokens.info.light = data.value;
      } else if (name.includes('dark')) {
        processedTokens.info.dark = data.value;
      } else if (name.includes('main')) {
        processedTokens.info.main = data.value;
      } else if (name.includes('contrast')) {
        processedTokens.info.contrastText = data.value;
      } else {
        processedTokens.info.main = data.value;
      }
    }
    
    // Handle grey colors
    else if (name.includes('grey')) {
      const shade = name.match(/\d+/);
      if (shade) {
        processedTokens.grey[shade[0]] = data.value;
      }
    }
    
    // Handle background colors
    else if (name.includes('background')) {
      if (name.includes('default')) {
        processedTokens.background.default = data.value;
      } else if (name.includes('paper')) {
        processedTokens.background.paper = data.value;
      }
    }
    
    // Handle text colors
    else if (name.includes('text')) {
      if (name.includes('primary')) {
        processedTokens.text.primary = data.value;
      } else if (name.includes('secondary')) {
        processedTokens.text.secondary = data.value;
      } else if (name.includes('disabled')) {
        processedTokens.text.disabled = data.value;
      }
    }
  });
  
  return processedTokens;
};

/**
 * Process typography tokens from Figma
 * 
 * @param {Object} typographyTokens - Typography tokens from Figma
 * @returns {Object} - Processed typography tokens ready for use in the theme
 */
export const processTypographyTokens = (typographyTokens) => {
  const processedTokens = {
    fontFamily: '',
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    button: {},
    caption: {},
    overline: {},
  };
  
  // Process each token based on naming convention
  Object.entries(typographyTokens).forEach(([name, data]) => {
    // Handle font family
    if (name.includes('fontFamily')) {
      processedTokens.fontFamily = data.value;
    }
    
    // Handle heading styles
    else if (name.includes('h1')) {
      processedTokens.h1 = {
        fontWeight: data.fontWeight || 700,
        fontSize: data.fontSize || '2.5rem',
        lineHeight: data.lineHeight || 1.2,
      };
    }
    else if (name.includes('h2')) {
      processedTokens.h2 = {
        fontWeight: data.fontWeight || 700,
        fontSize: data.fontSize || '2rem',
        lineHeight: data.lineHeight || 1.2,
      };
    }
    else if (name.includes('h3')) {
      processedTokens.h3 = {
        fontWeight: data.fontWeight || 600,
        fontSize: data.fontSize || '1.75rem',
        lineHeight: data.lineHeight || 1.2,
      };
    }
    else if (name.includes('h4')) {
      processedTokens.h4 = {
        fontWeight: data.fontWeight || 600,
        fontSize: data.fontSize || '1.5rem',
        lineHeight: data.lineHeight || 1.2,
      };
    }
    else if (name.includes('h5')) {
      processedTokens.h5 = {
        fontWeight: data.fontWeight || 600,
        fontSize: data.fontSize || '1.25rem',
        lineHeight: data.lineHeight || 1.2,
      };
    }
    else if (name.includes('h6')) {
      processedTokens.h6 = {
        fontWeight: data.fontWeight || 600,
        fontSize: data.fontSize || '1rem',
        lineHeight: data.lineHeight || 1.2,
      };
    }
    
    // Handle body styles
    else if (name.includes('body1')) {
      processedTokens.body1 = {
        fontWeight: data.fontWeight || 400,
        fontSize: data.fontSize || '1rem',
        lineHeight: data.lineHeight || 1.5,
      };
    }
    else if (name.includes('body2')) {
      processedTokens.body2 = {
        fontWeight: data.fontWeight || 400,
        fontSize: data.fontSize || '0.875rem',
        lineHeight: data.lineHeight || 1.5,
      };
    }
    
    // Handle other typography styles
    else if (name.includes('subtitle1')) {
      processedTokens.subtitle1 = {
        fontWeight: data.fontWeight || 500,
        fontSize: data.fontSize || '1rem',
        lineHeight: data.lineHeight || 1.5,
      };
    }
    else if (name.includes('subtitle2')) {
      processedTokens.subtitle2 = {
        fontWeight: data.fontWeight || 500,
        fontSize: data.fontSize || '0.875rem',
        lineHeight: data.lineHeight || 1.5,
      };
    }
    else if (name.includes('button')) {
      processedTokens.button = {
        fontWeight: data.fontWeight || 500,
        fontSize: data.fontSize || '0.875rem',
        lineHeight: data.lineHeight || 1.5,
        textTransform: 'none',
      };
    }
    else if (name.includes('caption')) {
      processedTokens.caption = {
        fontWeight: data.fontWeight || 400,
        fontSize: data.fontSize || '0.75rem',
        lineHeight: data.lineHeight || 1.5,
      };
    }
    else if (name.includes('overline')) {
      processedTokens.overline = {
        fontWeight: data.fontWeight || 400,
        fontSize: data.fontSize || '0.75rem',
        lineHeight: data.lineHeight || 1.5,
        textTransform: 'uppercase',
      };
    }
  });
  
  return processedTokens;
};

/**
 * Process spacing tokens from Figma
 * 
 * @param {Object} spacingTokens - Spacing tokens from Figma
 * @returns {number} - Base spacing unit
 */
export const processSpacingTokens = (spacingTokens) => {
  // Default spacing unit
  let baseSpacing = 8;
  
  // Look for base spacing token
  Object.entries(spacingTokens).forEach(([name, data]) => {
    if (name.includes('baseSpacing') || name.includes('spacing/base')) {
      baseSpacing = parseInt(data.value, 10);
    }
  });
  
  return baseSpacing;
};

/**
 * Process shape tokens from Figma
 * 
 * @param {Object} shapeTokens - Shape tokens from Figma
 * @returns {Object} - Processed shape tokens ready for use in the theme
 */
export const processShapeTokens = (shapeTokens) => {
  const processedTokens = {
    borderRadius: 8,
  };
  
  // Look for border radius tokens
  Object.entries(shapeTokens).forEach(([name, data]) => {
    if (name.includes('borderRadius') || name.includes('radius')) {
      processedTokens.borderRadius = parseInt(data.value, 10);
    }
  });
  
  return processedTokens;
};

export default {
  processColorTokens,
  processTypographyTokens,
  processSpacingTokens,
  processShapeTokens,
};
