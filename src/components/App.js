import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import * as ethers from "ethers";

import Navigation from "./Navigation";
import Info from "./Info";

import TOKEN_ABI from "../abis/Token.json";
import CROWDSALE_ABI from "../abis/Crowdsale.json";

import config from "../config.json";

export default function App() {
  const [provider, setProvider] = useState(null);
  const [crowdsale, setCrowdsale] = useState(null);
  const [account, setAccount] = useState(null);
  const [accountBalance, setAccountBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadlBockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const { chainId } = await provider.getNetwork()

    const token = new ethers.Contract(
      config[chainId].token.address,
      TOKEN_ABI,
      provider
    );
    const crowdsale = new ethers.Contract(
      config[chainId].crowdsale.address,
      CROWDSALE_ABI,
      provider
    );
    setCrowdsale(crowdsale);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
    const accountBalance = ethers.utils.formatUnits(await token.balanceOf(crowdsale.address), 18)
    setAccountBalance(accountBalance)

    setLoading(false);
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
      {account ? <Info account={account} accountBalance={accountBalance} /> : null}
    </Container>
  );
}
