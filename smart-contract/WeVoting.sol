// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

struct Candidate {
    uint number;
    string photoUri;
    string name;
}

struct Vote {
    uint number;
    uint date;
}

contract WeVoting {
    address owner;
    uint public currentVoting;
    uint public lastCandidateNumber;
    uint public currentMaxDate;
    mapping(uint => Candidate[]) public votings;
    mapping(uint => mapping(address => Vote)) public votes;

    constructor() {
        owner = msg.sender;
    }

    function getCurrentCandidates() public view returns(Candidate[] memory) {
        return votings[currentVoting];
    }

    function addVoting(uint timeToVote) public {
        require(msg.sender == owner, "Invalid sender");

        if(currentVoting > 0) ++currentVoting;
        
        currentMaxDate = timeToVote + block.timestamp;
        lastCandidateNumber = 1;
    }

    function addCandidate(string calldata name, string calldata photoUri) public {
        Candidate memory newCandidate;
        newCandidate.number = lastCandidateNumber++;
        newCandidate.name = name;
        newCandidate.photoUri = photoUri;

        votings[currentVoting].push(newCandidate);
    }

    function toVote(uint number) public {
        require(number >= 1 && number <= votings[currentVoting].length, "No candidate with that number");
        require(currentMaxDate > block.timestamp, "No open votings");
        require(votes[currentVoting][msg.sender].date == 0, "You already voted");
        
        Vote memory vote;
        vote.number = number;
        vote.date = block.timestamp;
        votes[currentVoting][msg.sender] = vote;
    }
}