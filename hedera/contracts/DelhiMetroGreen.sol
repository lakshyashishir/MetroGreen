// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DelhiMetroGreen {
    struct Station {
        bool isActive;
        uint256 totalCarbonSaved;
        uint256 totalTokensMinted;
    }
    
    struct Merchant {
        string name;
        string stationId;
        bool isActive;
        uint256 totalRedemptions;
    }

    address public delhiMetroAdmin;
    mapping(string => Station) public stations;
    mapping(address => Merchant) public merchants;
    mapping(address => uint256) public userCarbonSavings;

    event TicketVerified(
        string stationId,
        address user,
        uint256 carbonSaved,
        uint256 timestamp
    );

    event TokensRedeemed(
        address user,
        address merchant,
        uint256 amount,
        string stationId
    );

    constructor() {
        delhiMetroAdmin = msg.sender;
    }

    function addStation(string memory stationId) external {
        require(msg.sender == delhiMetroAdmin, "Only Delhi Metro can add stations");
        stations[stationId].isActive = true;
    }

    function addMerchant(
        address merchantAddress,
        string memory name,
        string memory stationId
    ) external {
        require(msg.sender == delhiMetroAdmin, "Only Delhi Metro can add merchants");
        require(stations[stationId].isActive, "Invalid station");
        
        merchants[merchantAddress] = Merchant({
            name: name,
            stationId: stationId,
            isActive: true,
            totalRedemptions: 0
        });
    }

    function verifyTicket(
        string memory stationId,
        address user,
        uint256 carbonSaved
    ) external {
        require(msg.sender == delhiMetroAdmin, "Only Delhi Metro can verify tickets");
        require(stations[stationId].isActive, "Invalid station");

        stations[stationId].totalCarbonSaved += carbonSaved;
        userCarbonSavings[user] += carbonSaved;

        emit TicketVerified(stationId, user, carbonSaved, block.timestamp);
    }

    function redeemTokens(
        address merchant,
        uint256 amount
    ) external {
        require(merchants[merchant].isActive, "Invalid merchant");
        require(userCarbonSavings[msg.sender] >= amount * 10, "Insufficient carbon savings");

        merchants[merchant].totalRedemptions += amount;
        userCarbonSavings[msg.sender] -= amount * 10;

        emit TokensRedeemed(msg.sender, merchant, amount, merchants[merchant].stationId);
    }
}