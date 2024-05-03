import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { ethers } from "ethers";

import Navigation from "./Navigation";
import Info from "./Info";

export default function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const loadlBockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  useEffect(() => {
    loadlBockchainData();
  }, []);

  return (
    <Container>
      <Navigation />
      <hr />
      {account ? <Info account={account} /> : null}
    </Container>
  );
}
