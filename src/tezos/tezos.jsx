// import { TezosToolkit } from '@taquito/taquito';
// import { BeaconWallet } from '@taquito/beacon-wallet';

// const Tezos = new TezosToolkit('https://mainnet-tezos.giganode.io');
// const wallet = new BeaconWallet({
//     name: "Scholarship DApp",
//     preferredNetwork: 'mainnet'
// });

// Tezos.setWalletProvider(wallet);

// export async function connectWallet() {
//     console.log('Requesting wallet permissions');  // Debugging statement
//     await wallet.requestPermissions();
//     const activeAccount = await wallet.client.getActiveAccount();
//     if (activeAccount) {
//         console.log("Wallet connected:", activeAccount);
//     } else {
//         console.log("No active account found");  // Error handling
//     }
// }

// export async function interactWithContract(contractAddress, studentAddress) {
//     console.log("Connecting to contract at address:", contractAddress);  // Debugging statement
//     const contract = await Tezos.wallet.at(contractAddress);
//     console.log("Contract instance:", contract);  // Debugging statement
//     const operation = await contract.methods.verifyDocument().send();
//     await operation.confirmation();
//     console.log("Document verified for:", studentAddress);  // Debugging statement
// }


import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

const Tezos = new TezosToolkit('https://mainnet-tezos.giganode.io');
const wallet = new BeaconWallet({
    name: "Scholarship DApp",
    preferredNetwork: 'mainnet'
});

Tezos.setWalletProvider(wallet);

export async function connectWallet() {
    await wallet.requestPermissions();
}

export async function getConnectedAddress() {
    const account = await wallet.client.getActiveAccount();
    return account ? account.address : '';
}

// Student submits a request for verification
export async function submitRequest(docHash) {
    const contract = await Tezos.wallet.at('YOUR_CONTRACT_ADDRESS');
    const operation = await contract.methods.submitRequest(docHash).send();
    await operation.confirmation();
    console.log("Request submitted.");
}

// Government Officer fetches pending requests
export async function fetchPendingRequests() {
    const contract = await Tezos.wallet.at('YOUR_CONTRACT_ADDRESS');
    // Fetch requests (Assuming contract has a view to get pending requests)
    const requests = await contract.views.getPendingRequests().read();
    return requests;
}

// Government Officer verifies a student's document
export async function verifyDocument(studentAddress) {
    const contract = await Tezos.wallet.at('YOUR_CONTRACT_ADDRESS');
    const operation = await contract.methods.verifyRequest(studentAddress).send();
    await operation.confirmation();
    console.log("Document verified.");
}

// Financer fetches verified requests
export async function fetchVerifiedRequests() {
    const contract = await Tezos.wallet.at('YOUR_CONTRACT_ADDRESS');
    const requests = await contract.views.getVerifiedRequests().read();
    return requests;
}

// Financer releases funds to the student
export async function releaseFunds(studentAddress, amount) {
    const contract = await Tezos.wallet.at('YOUR_CONTRACT_ADDRESS');
    const operation = await contract.methods.releaseFunds(studentAddress, amount).send();
    await operation.confirmation();
    console.log("Funds released.");
}
