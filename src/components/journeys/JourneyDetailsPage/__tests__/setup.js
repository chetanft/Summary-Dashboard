// This file sets up the test environment for the JourneyDetailsPage tests

// Mock TextEncoder and TextDecoder which are required by react-router-dom
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
