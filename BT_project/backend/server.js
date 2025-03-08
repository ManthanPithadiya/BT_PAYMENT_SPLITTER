require("dotenv").config();
const { Client, ContractExecuteTransaction, Hbar } = require("@hashgraph/sdk");

const client = Client.forTestnet();
client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);

async function splitPayment(recipients, percentages, amount) {
    const contractId = process.env.CONTRACT_ID;
    const txn = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(1000000)
        .setFunction("splitPayment", {
            recipients,
            percentages,
        })
        .setPayableAmount(new Hbar(amount));

    const response = await txn.execute(client);
    const receipt = await response.getReceipt(client);
    console.log("Transaction Status:", receipt.status.toString());
}

// Example call (replace with real addresses)
splitPayment(["0.0.AAAA", "0.0.BBBB"], [50, 50], 10);
