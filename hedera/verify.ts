const {
  Client,
  AccountId,
  PrivateKey,
  AccountBalanceQuery
} = require("@hashgraph/sdk");
const dotenv = require("dotenv");

dotenv.config();

async function verifySetup() {
  try {
    const operatorId = process.env.NEXT_PUBLIC_OPERATOR_ID;
    const operatorKey = process.env.NEXT_PUBLIC_OPERATOR_KEY;

    console.log("Checking environment variables...");
    console.log("Account ID present:", !!operatorId);
    console.log("Private key present:", !!operatorKey);

    if (!operatorId || !operatorKey) {
      throw new Error("Missing environment variables");
    }

    console.log("\nInitializing Hedera client...");
    const client = Client.forTestnet();
    const accountId = AccountId.fromString(operatorId);
    const privateKey = PrivateKey.fromString(operatorKey);
    
    client.setOperator(accountId, privateKey);

    console.log("\nChecking account balance...");
    const balance = await new AccountBalanceQuery()
      .setAccountId(accountId)
      .execute(client);

    console.log(`Balance: ${balance.hbars.toString()} HBAR`);
    
    if (balance.hbars.toTinybars() < 2000000000) { // 20 HBAR
      console.warn("\n⚠️  Warning: Account balance is less than 20 HBAR");
      console.warn("You may need more HBAR for contract deployment");
    }

    return true;
  } catch (error) {
    console.error("\nSetup verification failed:", error);
    return false;
  }
}

verifySetup()
  .then((success) => {
    if (success) {
      console.log("\n✅ Setup verification passed!");
      console.log("\nNext steps:");
      console.log("1. Make sure you have enough HBAR (at least 20 HBAR recommended)");
      console.log("2. Run the deployment script: npx ts-node scripts/deployement.ts");
    } else {
      console.log("\n❌ Setup verification failed!");
    }
    process.exit(0);
  });