// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

interface INftToken {
    function balanceOf(address owner) external view returns (uint256);

    function tokenOfOwnerByIndex(address owner, uint256 index)
          external
          view
          returns (uint256);
}

contract CustomDAO is Ownable {

    uint public counter = 0;

    struct Proposal {
        bool toAdd;
        uint256 deadline;
        uint256 yesVotes;
        uint256 noVotes;
        bool executed;
        mapping(uint256 => bool) voters;
    }

    // Create a mapping of ID to Proposal
    mapping(uint256 => Proposal) public proposals;
    // Number of proposals that have been created
    uint256 public numProposals;

    INftToken nftToken;

    constructor(address _NftToken) payable {
        nftToken = INftToken(_NftToken);
    }

    modifier nftHolderOnly() {
      require(nftToken.balanceOf(msg.sender) > 0, "NOT_A_DAO_MEMBER");
      _;
    }

    function createProposal(bool _toAdd)
      external
      nftHolderOnly
      returns (uint256){
        Proposal storage proposal = proposals[numProposals];
        proposal.toAdd = _toAdd;
        // Set the proposal's voting deadline to be (current time + 5 minutes)
        proposal.deadline = block.timestamp + 5 minutes;

        numProposals++;

        return numProposals - 1;
    }

    // Create a modifier which only allows a function to be
    // called if the given proposal's deadline has not been exceeded yet
    modifier activeProposalOnly(uint256 proposalIndex) {
        require(
            proposals[proposalIndex].deadline > block.timestamp,
            "DEADLINE_EXCEEDED"
        );
        _;
    }

    enum Vote {
      YES,
      NO
    }

    function voteOnProposal(uint256 proposalIndex, Vote vote)
      external
      nftHolderOnly
      activeProposalOnly(proposalIndex){

      Proposal storage proposal = proposals[proposalIndex];

      uint256 voterNFTBalance = nftToken.balanceOf(msg.sender);
      uint256 numVotes = 0;

      // Calculate how many NFTs are owned by the voter
      // that haven't already been used for voting on this proposal
      for (uint256 i = 0; i < voterNFTBalance; i++) {
          uint256 tokenId = nftToken.tokenOfOwnerByIndex(msg.sender, i);
          if (proposal.voters[tokenId] == false) {
              numVotes++;
              proposal.voters[tokenId] = true;
          }
      }
      require(numVotes > 0, "ALREADY_VOTED");

      if (vote == Vote.YES) {
          proposal.yesVotes += numVotes;
      } else {
          proposal.noVotes += numVotes;
      }
    }

    modifier inactiveProposalOnly(uint256 proposalIndex) {
      require(
          proposals[proposalIndex].deadline <= block.timestamp,
          "DEADLINE_NOT_EXCEEDED"
      );
      require(
          proposals[proposalIndex].executed == false,
          "PROPOSAL_ALREADY_EXECUTED"
      );
      _;
    }

    function executeProposal(uint256 proposalIndex)
      external
      nftHolderOnly
      inactiveProposalOnly(proposalIndex){
        Proposal storage proposal = proposals[proposalIndex];

        // If the proposal has more YAY votes than NAY votes
        // purchase the NFT from the FakeNFTMarketplace
        if (proposal.yesVotes > proposal.noVotes) {
            if (proposal.toAdd){
                 counter ++;
            } else {
                counter --;
            }
        }
        proposal.executed = true;
    }
}