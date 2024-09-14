// import { TezosToolkit } from '@taquito/taquito';
// import { BeaconWallet } from '@taquito/beacon-wallet';

// const Tezos = new TezosToolkit('https://mainnet-tezos.giganode.io');
// const wallet = new BeaconWallet({
//     name: "Scholarship DApp",
//     preferredNetwork: 'mainnet'
// });

// Tezos.setWalletProvider(wallet);

// export async function connectWallet() {
//     await wallet.requestPermissions();
//     const activeAccount = await wallet.client.getActiveAccount();
//     if (activeAccount) {
//         console.log("Wallet connected:", activeAccount);
//     }
// }


import { BeaconWallet } from '@taquito/beacon-wallet';

export const wallet = new BeaconWallet({
    name: 'Scholarship DApp',
    preferredNetwork: 'mainnet',
});

export async function connectBeaconWallet() {
    await wallet.requestPermissions();
}
