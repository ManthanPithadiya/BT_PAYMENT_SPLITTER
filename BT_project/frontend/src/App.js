import React, { useState } from "react";
import { HashConnect } from "hashconnect";

const App = () => {
    const [wallet, setWallet] = useState(null);

    async function connectWallet() {
        const hashconnect = new HashConnect();
        await hashconnect.init("Testnet", "MyDApp", true);
        hashconnect.connectToLocalWallet();
        hashconnect.pairingEvent.once((data) => setWallet(data.accountIds[0]));
    }

    return (
        <div>
            <h1>Decentralized Payment Splitter</h1>
            <button onClick={connectWallet}>Connect HashPack</button>
            {wallet && <p>Connected Wallet: {wallet}</p>}
        </div>
    );
};

export default App;
