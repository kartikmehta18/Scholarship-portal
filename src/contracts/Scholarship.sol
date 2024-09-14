// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract Scholarship {
//     address public student;
//     address public governmentUser;
//     address public financer;
//     bool public isVerified;
//     bool public isFundReleased;
//     uint public scholarshipAmount;

//     constructor(address _student, address _governmentUser, address _financer, uint _scholarshipAmount) {
//         student = _student;
//         governmentUser = _governmentUser;
//         financer = _financer;
//         scholarshipAmount = _scholarshipAmount;
//         isVerified = false;
//         isFundReleased = false;
//     }

//     // Government verifies the student
//     function verifyDocument() public {
//         require(msg.sender == governmentUser, "Only government user can verify");
//         isVerified = true;
//     }

//     // Financer releases the fund after verification
//     function releaseFund() public payable {
//         require(msg.sender == financer, "Only financer can release funds");
//         require(isVerified == true, "Document must be verified first");
//         require(isFundReleased == false, "Funds already released");

//         payable(student).transfer(scholarshipAmount);
//         isFundReleased = true;
//     }

//     // Function to receive funds from financer
//     receive() external payable {}
// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Scholarship {
    
    struct Request {
        address student;
        string document;
        bool isVerified;
        bool isFundReleased;
    }

    address public governmentOfficer;
    address public financer;
    uint public fundAmount = 0.1 ether;

    Request[] public requests;

    constructor(address _governmentOfficer, address _financer) {
        governmentOfficer = _governmentOfficer;
        financer = _financer;
    }

    // Modifier to restrict access to the government officer
    modifier onlyGovernmentOfficer() {
        require(msg.sender == governmentOfficer, "Only government officer can perform this action");
        _;
    }

    // Modifier to restrict access to the financer
    modifier onlyFinancer() {
        require(msg.sender == financer, "Only financer can release funds");
        _;
    }

    // Student submits a document for verification
    function submitRequest(string memory documentLink) public {
        Request memory newRequest = Request({
            student: msg.sender,
            document: documentLink,
            isVerified: false,
            isFundReleased: false
        });
        requests.push(newRequest);
    }

    // Government officer verifies the document
    function verifyRequest(uint requestId) public onlyGovernmentOfficer {
        Request storage request = requests[requestId];
        require(!request.isVerified, "Request already verified");
        request.isVerified = true;
    }

    // Financer releases funds to the student after verification
    function releaseFunds(uint requestId) public payable onlyFinancer {
        Request storage request = requests[requestId];
        require(request.isVerified, "Request not verified");
        require(!request.isFundReleased, "Funds already released");
        require(address(this).balance >= fundAmount, "Insufficient contract balance");

        // Transfer the funds
        payable(request.student).transfer(fundAmount);
        request.isFundReleased = true;
    }

    // Function to deposit funds into the contract
    function depositFunds() public payable {}

    // Get the list of all requests
    function getRequests() public view returns (Request[] memory) {
        return requests;
    }

    // Receive function to handle ether sent directly to the contract
    receive() external payable {}
}
