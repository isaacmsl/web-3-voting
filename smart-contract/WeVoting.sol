// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

struct Candidate {
    uint number;
    string photoUri;
    string name;
    uint votes;
    uint date;
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
    mapping(uint => mapping(uint => Candidate)) public votingCandidates;
    mapping(uint => mapping(address => Vote)) public votes;

    constructor() {
        owner = msg.sender;
    }

    function requireCandidateVoting(uint number) private view {
        require(votingCandidates[currentVoting][number].date > 0, "No candidate with that number");
        require(currentMaxDate > block.timestamp, "No open votings");
    }

    function getCandidateByNumber(uint number) public view returns(Candidate memory) {
        requireCandidateVoting(number);
        return votingCandidates[currentVoting][number];
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
        newCandidate.date = block.timestamp;

        votingCandidates[currentVoting][newCandidate.number] = newCandidate;
    }

    function toVote(uint number) public {
        requireCandidateVoting(number);
        require(votes[currentVoting][msg.sender].date == 0, "You already voted");
        
        Vote memory vote;
        vote.number = number;
        vote.date = block.timestamp;
        votes[currentVoting][msg.sender] = vote;
        ++votingCandidates[currentVoting][number].votes;
    }
}