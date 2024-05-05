import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import * as ethers from "ethers";

import Navigation from "./Navigation";
import Info from "./Info";
import Loading from "./Loading";
import Progress from "./Progress";

import TOKEN_ABI from "../abis/Token.json";
import CROWDSALE_ABI from "../abis/Crowdsale.json";

import config from "../config.json";

export default function App() {
  const [provider, setProvider] = useState(null);
  const [crowdsale, setCrowdsale] = useState(null);

  const [account, setAccount] = useState(null);
  const [accountBalance, setAccountBalance] = useState(0);

  const [price, setPrice] = useState(0);
  const [maxTokens, setMaxTokens] = useState(0);
  const [tokensSold, setTokensSold] = useState(0);

  const [loading, setLoading] = useState(true);

  const loadlBockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const { chainId } = await provider.getNetwork();

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
    const accountBalance = ethers.utils.formatUnits(
      await token.balanceOf(account),
      18
    );
    setAccountBalance(accountBalance);

    const price = ethers.utils.formatUnits(await crowdsale.price());
    setPrice(price);
    const maxTokens = ethers.utils.formatUnits(await crowdsale.maxTokens());
    setMaxTokens(maxTokens);
    const tokenSold = ethers.utils.formatUnits(await crowdsale.tokensSold());
    setTokensSold(tokenSold);

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
      {loading ? (
        <Loading />
      ) : (
        <>
          <p className="text-center">
            <strong>Current Price: </strong>
            {price} ETH
          </p>
          <Progress maxTokens={maxTokens} tokensSold={tokensSold} />
          <hr />

          {account ? (
            <Info account={account} accountBalance={accountBalance} />
          ) : null}
        </>
      )}
    </Container>
  );
}
