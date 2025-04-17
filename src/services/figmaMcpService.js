// src/services/figmaMcpService.js
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

/**
 * Figma MCP Server Service
 * This service manages the Figma MCP server process for the TMS Dashboard
 */

let figmaMcpProcess = null;
const figmaMcpServerPath = path.resolve(process.cwd(), '../figma-mcp-server/dist/index.js');

/**
 * Start the Figma MCP server
 * @param {string} figmaToken - Figma API token
 * @param {number} port - Port to run the server on
 * @returns {Promise<Object>} - The server process
 */
export const startFigmaMcpServer = async (figmaToken, port = 3001) => {
  if (figmaMcpProcess) {
    console.log('Figma MCP server is already running');
    return figmaMcpProcess;
  }

  if (!fs.existsSync(figmaMcpServerPath)) {
    throw new Error(`Figma MCP server not found at ${figmaMcpServerPath}`);
  }

  return new Promise((resolve, reject) => {
    try {
      console.log('Starting Figma MCP server...');
      
      // Set environment variables for the server
      const env = {
        ...process.env,
        FIGMA_ACCESS_TOKEN: figmaToken,
        MCP_SERVER_PORT: port.toString(),
        DEBUG: 'figma-mcp:*'
      };

      // Start the server process
      figmaMcpProcess = spawn('node', [figmaMcpServerPath], { 
        env,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      // Handle server output
      figmaMcpProcess.stdout.on('data', (data) => {
        console.log(`Figma MCP server: ${data.toString()}`);
      });

      figmaMcpProcess.stderr.on('data', (data) => {
        console.error(`Figma MCP server error: ${data.toString()}`);
      });

      // Handle server exit
      figmaMcpProcess.on('close', (code) => {
        console.log(`Figma MCP server exited with code ${code}`);
        figmaMcpProcess = null;
      });

      // Wait for server to start
      setTimeout(() => {
        console.log('Figma MCP server started');
        resolve(figmaMcpProcess);
      }, 2000);
    } catch (error) {
      console.error('Failed to start Figma MCP server:', error);
      reject(error);
    }
  });
};

/**
 * Stop the Figma MCP server
 * @returns {Promise<void>}
 */
export const stopFigmaMcpServer = async () => {
  if (!figmaMcpProcess) {
    console.log('Figma MCP server is not running');
    return;
  }

  return new Promise((resolve) => {
    figmaMcpProcess.on('close', () => {
      figmaMcpProcess = null;
      console.log('Figma MCP server stopped');
      resolve();
    });

    figmaMcpProcess.kill();
  });
};

/**
 * Check if the Figma MCP server is running
 * @returns {boolean}
 */
export const isFigmaMcpServerRunning = () => {
  return figmaMcpProcess !== null;
};

/**
 * Get the Figma MCP server URL
 * @param {number} port - Port the server is running on
 * @returns {string}
 */
export const getFigmaMcpServerUrl = (port = 3001) => {
  return `http://localhost:${port}`;
};

export default {
  startFigmaMcpServer,
  stopFigmaMcpServer,
  isFigmaMcpServerRunning,
  getFigmaMcpServerUrl
};
