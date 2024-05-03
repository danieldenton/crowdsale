import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { ethers } from "ethers";

import Navigation from "./Navigation";
import Info from "./Info";

import TOKEN_ABI from "../abis/Token.json";
import CROWDSALE_ABI from "../abis/Crowdsale.json";

export default function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadlBockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const token = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      TOKEN_ABI,
      provider
    );
    console.log(token.address)
    const crowdsale = new ethers.Contract(
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      CROWDSALE_ABI,
      provider
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
    setLoading(false)
  };

  useEffect(() => {
    if (loading) {
      loadlBockchainData();
    }
  }, [loading]);

  return (
    <Container>
      <Navigation />
      <hr />
      {account ? <Info account={account} /> : null}
    </Container>
  );
}
