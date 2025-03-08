// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentSplitter {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function splitPayment(address payable[] memory recipients, uint256[] memory percentages) external payable {
        require(recipients.length == percentages.length, "Mismatched inputs");

        uint256 totalAmount = msg.value;
        uint256 totalPercent = 0;

        for (uint256 i = 0; i < percentages.length; i++) {
            totalPercent += percentages[i];
        }

        require(totalPercent == 100, "Total percentage must be 100");

        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 payment = (totalAmount * percentages[i]) / 100;
            recipients[i].transfer(payment);
        }
    }
}
