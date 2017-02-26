# Virtual Meeting Secretary

## Installation

### Prerequisites
To install and run this project, you'll need to have [Node.js with npm](https://nodejs.org/en/) and [Git](https://git-scm.com/downloads) installed on your machine.

### Windows

```
:: Clone the files from the GitHub repository
git clone https://github.com/JorisPalings/vms.git

:: Enter the project folder
cd vms

:: Install the project's dependencies
npm install

:: Enter the client folder
cd client

:: Install the client's dependencies
npm install

:: Compile TypeScript files
tsc

:: Compile Sass files
gulp sass

:: Return to the project folder
cd ..

:: Start the server in the background
START "" node server.js

:: Open the client in the browser
START http://localhost:3000/
```

### Linux/OSX

```
# Clone the files from the GitHub repository
git clone https://github.com/JorisPalings/vms.git

# Enter the project folder
cd vms

# Install the project's dependencies
npm install

# Enter the client folder
cd client

# Install the client's dependencies
npm install

# Compile TypeScript files
tsc

# Compile Sass files
gulp sass

# Return to the project folder
cd ..

# Start the server in the background
node server.js &

# Open the client in the browser
open http://localhost:3000/
```
