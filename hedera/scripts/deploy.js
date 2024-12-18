const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

const DEPLOYMENT_FILE = 'deployment_addresses.json';

async function readDeploymentAddresses() {
  if (fs.existsSync(DEPLOYMENT_FILE)) {
    const data = fs.readFileSync(DEPLOYMENT_FILE, 'utf8');
    return JSON.parse(data);
  }
  return {};
}

async function writeDeploymentAddresses(addresses) {
  fs.writeFileSync(DEPLOYMENT_FILE, JSON.stringify(addresses, null, 2));
}

async function deployWithCheck(name, factory, ...args) {
  const addresses = await readDeploymentAddresses();
  
  if (addresses[name]) {
    console.log(`${name} already deployed at ${addresses[name]}`);
    return await hre.ethers.getContractAt(name, addresses[name]);
  }

  console.log(`Deploying ${name}...`);
  const contract = await factory.deploy(...args);
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log(`${name} deployed to:`, address);

  addresses[name] = address;
  await writeDeploymentAddresses(addresses);

  return contract;
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy DelhiMetroGreen
  const DelhiMetroGreen = await hre.ethers.getContractFactory("DelhiMetroGreen");
  const delhiMetroGreen = await deployWithCheck("DelhiMetroGreen", DelhiMetroGreen);

  console.log("Contract deployed successfully!");
  
  // Log the deployment details
  console.log("\nDeployment Summary:");
  console.log("===================");
  console.log("DelhiMetroGreen:", await delhiMetroGreen.getAddress());
  console.log("\nAdd this contract ID to your .env file as NEXT_PUBLIC_CONTRACT_ID");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});