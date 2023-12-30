const ethereum = window.ethereum;

let web3;
let contract;
let accounts;

const contractAddress = "0x1647e0DFED8f1483c1c8374bad56c592313Ac6e4";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rewardPerSecond",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_startTimestamp",
        "type": "uint256"
      },
      { "internalType": "uint256", "name": "_endTimestamp", "type": "uint256" },
      { "internalType": "address", "name": "_admin", "type": "address" },
      { "internalType": "uint256", "name": "_dailyAPY", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Claim",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Compound",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "EmergencyWithdraw",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rewardPerSecond",
        "type": "uint256"
      }
    ],
    "name": "NewRewardPerSecond",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "startTimestamp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "endTimestamp",
        "type": "uint256"
      }
    ],
    "name": "NewStartAndEndTimestamp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      }
    ],
    "name": "RewardsStop",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TokenRecovery",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isProfileRequested",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "thresholdPoints",
        "type": "uint256"
      }
    ],
    "name": "UpdateProfileAndThresholdPointsRequirement",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "PRECISION_FACTOR",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "accTokenPerShare",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "compoundRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createReferralCode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "dailyAPY",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "referral", "type": "string" }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "devAddress",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endTimestamp",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_user", "type": "address" }
    ],
    "name": "getPendingRewards",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastRewardTimestamp",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "referalCode",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "name": "referer",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rewardPerSecond",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bool", "name": "_vaultOpen", "type": "bool" }
    ],
    "name": "setVaultOpen",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startTimestamp",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalReferrer",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rewardPerSecond",
        "type": "uint256"
      }
    ],
    "name": "updateRewardPerSecond",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_startTimestamp",
        "type": "uint256"
      },
      { "internalType": "uint256", "name": "_endTimestamp", "type": "uint256" }
    ],
    "name": "updateStartAndEndTimestamp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "userInfo",
    "outputs": [
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" },
      { "internalType": "uint256", "name": "place", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "vaultOpen",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }
];


async function connectWallet() {
  if (!ethereum) {
    console.log("Metamask is not installed");
    return;
  }

  try {
    const chainId = await ethereum.request({ method: "eth_chainId" });
    const avalancheMainnetChainId = "0xA86A"; // Chain ID for Avalanche Mainnet C-Chain
    if (chainId !== avalancheMainnetChainId) {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: avalancheMainnetChainId }],
      });
    }

    // Connect the wallet
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    const shortenedAccount =
      account.substring(0, 6) + "..." + account.substring(account.length - 4);

    // Update button text
    document.getElementById("connect-btn").innerText = shortenedAccount;


    
    if (accounts.length > 0) {
      web3 = new Web3(ethereum);
      contract = new web3.eth.Contract(contractABI, contractAddress);
  
      // Fetch and display the referral code

      fetchAndDisplayReferralCode(accounts[0]);
    }

    await updateUserETHInfo(account);
    await updateUserRewards(account);

    updateTVL();

    
  } catch (error) {
    console.error("An error occurred: ", error);
  }
}

async function updateTVL() {
  if (!ethereum) {
      console.log("Metamask is not installed");
      return;
  }

  try {
      // Initialize Web3 with the Ethereum provider
      web3 = new Web3(ethereum);

      // Fetch the balance of the contract
      const balanceInWei = await web3.eth.getBalance(contractAddress);
      const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');

      // Round the balance to 3 decimal places
      const roundedBalanceInEth = parseFloat(balanceInEth).toFixed(4);

      // Update the TVL display
      document.getElementById('tvl').textContent = `${roundedBalanceInEth} AVAX`;
  } catch (error) {
      console.error("Error fetching TVL:", error);
  }
}


// Call this function on page load, or after connecting to the wallet, as needed



async function updateUserETHInfo(userAccount) {
  const userETHInfoElement = document.getElementById('balance');

  try {
      const userInfo = await contract.methods.userInfo(userAccount).call();
      const amountInETH = web3.utils.fromWei(userInfo.amount, 'ether');
      const roundedAmount = parseFloat(amountInETH).toFixed(4);
      userETHInfoElement.textContent = `${roundedAmount} AVAX`;
      console.log("yeah");
  } catch (error) {
      console.error("Error fetching user AVAX info:", error);
  }
}

async function updateUserRewards(userAccount) {
  if (!ethereum || !contract) {
      console.log("Ethereum wallet is not connected or contract is not initialized");
      return;
  }

  try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
          console.log("No account is connected");
          return;
      }
      const userInfo = await contract.methods.userInfo(userAccount).call();

      // Convert the rewardDebt from Wei to ETH
      const rewardDebtInETH = web3.utils.fromWei(userInfo.rewardDebt, 'ether');
      const roundedRewardDebt = parseFloat(rewardDebtInETH).toFixed(9); // Rounded to 3 decimal places

      // Update the rewards display
      document.querySelector('.rewards h3:nth-child(2)').textContent = `${roundedRewardDebt} AVAX`;
  } catch (error) {
      console.error("Error fetching user rewards:", error);
  }
}


async function fetchAndDisplayReferralCode(account) {
  try {
    const referralCode = await contract.methods.referalCode(account).call();
    document.querySelector('.input-ref input').value = "omniminer.xyz/avalanche?ref="+referralCode || 'No referral code';
  } catch (error) {
    console.error("Error fetching referral code:", error);
  }
}

document.getElementById("connect-btn").addEventListener("click", connectWallet);

document.addEventListener("DOMContentLoaded", () => {
  const createReferralButton = document.querySelector(".button-ref button");

  createReferralButton.addEventListener("click", async () => {
    if (typeof window.ethereum !== "undefined") {
      web3 = new Web3(window.ethereum);
      try {
        accounts = await ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(contractABI, contractAddress);

        createReferralCode();
      } catch (error) {
        console.error("Could not get accounts:", error);
      }
    } else {
      console.log("MetaMask is not installed!");
    }
  });

  async function createReferralCode() {
    try {
      // Call the createReferralCode function of the contract
      await contract.methods.createReferralCode().send({ from: accounts[0] });
      console.log("Referral code created.");
    } catch (error) {
      console.error("Error creating referral code:", error);
    }
  }

});


document.getElementById('referralInput').addEventListener('paste', (event) => {
  event.preventDefault();
});

// Assuming web3 and contract are already initialized

document.addEventListener('DOMContentLoaded', () => {
  const contributeButton = document.getElementById('contribute'); 
  let accounts;

  contributeButton.addEventListener('click', async () => {
      try {
          accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          const userAccount = accounts[0];
          const amountInput = document.querySelector('.input input[type=number]');
          const referralInput = document.querySelector('.input input[type=text]');
          
          const amount = amountInput.value; // Get the amount from input
          const referral = referralInput.value; // Get the referral from input

          // Convert the amount to Wei (or the appropriate unit for your contract)
          const amountInWei = web3.utils.toWei(amount, 'ether');

          // Call the deposit function of the contract
          await contract.methods.deposit(referral).send({ from: userAccount, value: amountInWei });
          console.log('Deposit successful');
      } catch (error) {
          console.error("Error on deposit:", error);
      }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const compoundButton = document.getElementById('compound');

  if (compoundButton) {
      compoundButton.addEventListener('click', async () => {
          if (!ethereum || !contract) {
              console.log("Ethereum wallet is not connected or contract is not initialized");
              return;
          }

          try {
              const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
              if (accounts.length === 0) {
                  console.log("No account is connected");
                  return;
              }

              const userAccount = accounts[0];

              // Call the compoundRewards function of the contract
              await contract.methods.compoundRewards().send({ from: userAccount });
              console.log('Compound successful');

              // Optionally, update user info after compounding
              updateUserRewards(); 
          } catch (error) {
              console.error("Error during compounding:", error);
          }
      });
  } else {
      console.log('Compound button not found');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const claimButton = document.getElementById('claim');

  if (claimButton) {
      claimButton.addEventListener('click', async () => {
          if (!ethereum || !contract) {
              console.log("Ethereum wallet is not connected or contract is not initialized");
              return;
          }

          try {
              const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
              if (accounts.length === 0) {
                  console.log("No account is connected");
                  return;
              }

              const userAccount = accounts[0];

              // Call the claim function of the contract
              await contract.methods.claim().send({ from: userAccount });
              console.log('Claim successful');
          } catch (error) {
              console.error("Error during claiming:", error);
          }
      });
  } else {
      console.log('Claim button not found');
  }
});
