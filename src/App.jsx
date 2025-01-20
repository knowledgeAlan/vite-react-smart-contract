import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ethers } from 'ethers';
import dotenv from 'dotenv';
function App() {
   
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const abi=`[{"inputs":[],"name":"data","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_data","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]`;

  useEffect(   () =>{
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    const initialEthereum = async  () =>{
      const provider = new ethers.BrowserProvider(window.ethereum);
      let singer =  await provider.getSigner();
      // Connect to the deployed contract using its address and ABI
      const contract = new ethers.Contract(
         // Replace with the deployed contract's address
         process.env.privateKey,
        abi,
        singer
    );

   

    setContract(contract);
    console.log("contract===",contract)
    setProvider(provider);
    }
    initialEthereum();
  },[])

  const callSmartContract =async ()=>{
    console.log("callSmartContract====")
    if (contract) {
      const tx = await contract.get();
      console.log("tx===",tx);
    //  let res= await provider.get();

    //  console.log("res===",res);

    const deposit = await contract.deposit({ value: 1 });
    await deposit.wait();
  }
  }
  return (
    <>
       test  
       <button onClick={callSmartContract}>call</button>
    </>
  )
}

export default App
