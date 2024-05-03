import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { ethers } from "ethers";

import Navigation from "./Navigation";

export default function App() {

    const loadlBockchainData = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log(provider)
    }

    useEffect(() => {
        loadlBockchainData()
    })

    return (
        <Container>
            <Navigation />
        </Container>
    )
}