/**
 * Figma Service
 * 
 * This service provides methods to interact with the Figma API through the figma-mcp-server.
 * It allows fetching design tokens, components, and other design assets directly from Figma.
 */

// Configuration
const FIGMA_MCP_SERVER_URL = 'http://localhost:3001';

/**
 * Fetch a Figma file by its ID
 * 
 * @param {string} fileId - The Figma file ID
 * @returns {Promise<Object>} - The Figma file data
 */
export const getFigmaFile = async (fileId) => {
  try {
    const response = await fetch(`${FIGMA_MCP_SERVER_URL}/api/files/${fileId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Figma file: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Figma file:', error);
    throw error;
  }
};

/**
 * Fetch design tokens from a Figma file
 * 
 * @param {string} fileId - The Figma file ID
 * @returns {Promise<Object>} - The design tokens
 */
export const getDesignTokens = async (fileId) => {
  try {
    const response = await fetch(`${FIGMA_MCP_SERVER_URL}/api/files/${fileId}/variables`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch design tokens: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching design tokens:', error);
    throw error;
  }
};

/**
 * Fetch components from a Figma file
 * 
 * @param {string} fileId - The Figma file ID
 * @returns {Promise<Object>} - The components data
 */
export const getComponents = async (fileId) => {
  try {
    const response = await fetch(`${FIGMA_MCP_SERVER_URL}/api/files/${fileId}/components`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch components: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching components:', error);
    throw error;
  }
};

/**
 * Fetch a specific node from a Figma file
 * 
 * @param {string} fileId - The Figma file ID
 * @param {string} nodeId - The node ID
 * @returns {Promise<Object>} - The node data
 */
export const getNode = async (fileId, nodeId) => {
  try {
    const response = await fetch(`${FIGMA_MCP_SERVER_URL}/api/files/${fileId}/nodes?ids=${nodeId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch node: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching node:', error);
    throw error;
  }
};

/**
 * Fetch image URLs for nodes in a Figma file
 * 
 * @param {string} fileId - The Figma file ID
 * @param {string[]} nodeIds - Array of node IDs
 * @param {string} format - Image format (png, svg, jpg, pdf)
 * @param {number} scale - Image scale (1, 2, 3, 4)
 * @returns {Promise<Object>} - The image URLs
 */
export const getImages = async (fileId, nodeIds, format = 'png', scale = 1) => {
  try {
    const nodeIdsParam = nodeIds.join(',');
    const response = await fetch(
      `${FIGMA_MCP_SERVER_URL}/api/files/${fileId}/images?ids=${nodeIdsParam}&format=${format}&scale=${scale}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

/**
 * Extract color tokens from Figma variables
 * 
 * @param {Object} variables - The variables object from Figma
 * @returns {Object} - Extracted color tokens
 */
export const extractColorTokens = (variables) => {
  const colorTokens = {};
  
  if (!variables || !variables.variables) {
    return colorTokens;
  }
  
  // Filter for color variables
  const colorVariables = variables.variables.filter(
    variable => variable.resolvedType === 'COLOR'
  );
  
  // Extract color values
  colorVariables.forEach(variable => {
    const name = variable.name;
    const value = variable.valuesByMode[variables.defaultMode];
    
    if (value) {
      // Convert RGBA to hex or rgba string as needed
      const rgba = value;
      const hexValue = rgbaToHex(rgba);
      
      colorTokens[name] = {
        value: hexValue,
        rgba: rgba,
      };
    }
  });
  
  return colorTokens;
};

/**
 * Convert RGBA object to hex string
 * 
 * @param {Object} rgba - RGBA object with r, g, b, a properties
 * @returns {string} - Hex color string
 */
const rgbaToHex = (rgba) => {
  const r = Math.round(rgba.r * 255).toString(16).padStart(2, '0');
  const g = Math.round(rgba.g * 255).toString(16).padStart(2, '0');
  const b = Math.round(rgba.b * 255).toString(16).padStart(2, '0');
  
  return `#${r}${g}${b}`;
};

export default {
  getFigmaFile,
  getDesignTokens,
  getComponents,
  getNode,
  getImages,
  extractColorTokens,
};
