import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0xcf384A3052F98f78f8b54A449752A879c4aB8509";

function getContract() {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) throw new Error("Unauthorized.");

    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(
        ABI,
        CONTRACT_ADDRESS,
        { from: wallet }
    );
}

export async function loginWeb3() {
    if (!window.ethereum) throw new Error("No MetaMask found.");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error("Wallet not found/allowed.");

    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];
}

export async function getCurrentMaxDate() : Promise<number> {
    const contract = getContract();
    return contract.methods.currentMaxDate().call();
}

export async function getCandidateByNumber(candidateNumber : number) : Promise<Candidate> {
    const contract = getContract();
    return new Promise<Candidate>(async (resolve, reject) => {
        try {
            const response = await contract.methods.getCandidateByNumber(candidateNumber).call();
            resolve(response);
        } catch(err) {
            reject(err);
        }
    });
}

export async function getLastCandidateNumber() : Promise<number> {
    const contract = getContract();
    return contract.methods.lastCandidateNumber().call();
}

export async function toVote(candidateNumber : number) {
    const contract = getContract();
    return contract.methods.toVote(candidateNumber).send();
}
