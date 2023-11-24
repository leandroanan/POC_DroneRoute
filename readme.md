# Fastest delivery drone route

## Overview
Its a new system responsible for calculating the fastest delivery drone system and print
the last 10 trips searched, you just have to input the coordinates origin, collection and destination.

## Author
Leandro Eduardo Rodrigues

## License
This project is free to use.

## Installation and Running with Docker

## Windows

1. Go to Docker Desktop for Windows [download page](https://www.docker.com/products/docker-desktop).
2. Download the installer for Docker Desktop.
3. Double-click `Docker Desktop Installer.exe` to run the installer.
4. Follow the on-screen instructions to accept the license, authorize the installer, and proceed with the install.
5. When prompted, ensure the “Enable Hyper-V Windows Features” option is selected on the Configuration page.
6. Click "Finish" on the setup complete dialog and launch Docker Desktop.

## Linux

1. Update your package index: 
   ```bash
   sudo apt-get update
   ```
2. Install packages to allow `apt` to use a repository over HTTPS:
```bash
   sudo apt-get install
   apt-transport-https
   ca-certificates
   curl
   gnupg
   lsb-release
```
3. Add Docker’s official GPG key:
```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
4. Set up the stable repository:
    ```bash
    echo
   deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu
   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```
5. Update your package index: 
    ```bash
    sudo apt-get update
    ```
6. Install the latest version of Docker Engine and containerd:
   ```bash
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

## Mac

1. Go to Docker Desktop for Mac [download page](https://www.docker.com/products/docker-desktop).
2. Download the Docker .dmg for Mac.
3. Double-click the .dmg file you downloaded and drag the Docker icon to the Applications folder.
4. Double-click Docker.app in the Applications folder to start Docker.


### Prerequisites
- Docker installed on your machine (Linux, Windows, or Mac).

### Creating docker image

1. Download the project: 
    ```bash
    git clone https://github.com/leandroanan/POC_DroneRoute.git
    ```
2. Navigate to your selected project directory: `cd/`.
3. Build the Docker image: 
    ```bash
    docker build -t drone-route-img .
    ```
4. Run the container: 
    ```bash
    docker run -d -p 80:80 drone-route-img
    ```

### Additional Information
## Starting the system locally

To get this project up and running on your local machine without Docker, follow the instructions below:

## Prerequisites

Before you begin, you need to have Node.js and npm installed on your machine. If you don't have them installed, download and install them from the official [Node.js website](https://nodejs.org/).

## Cloning the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/leandroanan/POC_DroneRoute.git
cd POC_DroneRoute (your directory could be any one)
```

## Installing Dependencies

After cloning the repository, navigate to the project folder and install the project dependencies:

```bash
npm install
```

This command will download all the necessary dependencies for running the project listed in the package.json file.

## Running the Project

```bash
npm start
```

This command will start the development server and typically open the project in your default web browser. If it does not open automatically, you can manually access it by visiting http://localhost:3000 in your web browser

```bash
npm run build  # Builds the app for production to the `build` folder.
npm test       # Launches the test runner.
```

Explore these scripts as needed for development, testing, and preparing for production.