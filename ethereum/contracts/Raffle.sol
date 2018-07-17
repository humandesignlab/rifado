pragma solidity ^0.4.24;

contract LottoCoinFactory {
  address[] public deployedRaffles;

  function createRaffle(uint _ticketBlockSize) public {
    address newRaffle = new LottoCoin(msg.sender, _ticketBlockSize);
    deployedRaffles.push(newRaffle);
  }

  function getDeployedRaffles() public view returns (address[]) {
    return deployedRaffles;
  }
}

contract LottoCoin {
  address house = 0xdbAD7A44a0C62DD47B7F747C0Af60b9AD83E9650;
  address public manager;
  uint public ticketsBlock;
  uint[] public soldTicketsNumbers;
  uint public soldTickets;
  uint public remainingNumberOfTickets;

  struct Ticket {
    uint id;
    address ticketBuyer;
    uint pickedNumber;
    bool entered;
    uint timeStamp;
  }
  Ticket public thisTicketOwner;

  mapping(address => Ticket)  ticketOwner;
  mapping(uint => bool)  boughtTicket;
  Ticket[] public ticketOwnersList;

  function LottoCoin(address creator, uint tickets) public {
    manager = creator;
    createTicketBlock(tickets);
  }

  function createTicketBlock(uint _ticketAmount) public returns(uint) {
    return ticketsBlock = _ticketAmount;
  }

  function getTicketBlockLength() public view returns (uint) {
    return ticketsBlock;
  }

  function buyTicket(uint _pickedNumber) public payable {
    require(ticketsBlock > 0, 'Please create a ticket block first');
    require(_pickedNumber <= ticketsBlock, 'Number higher than the limit of tickets.');
    require(boughtTicket[_pickedNumber] == false, 'This ticket number is already taken.');
    require(msg.value > .01 ether, 'Payment of 0.01 ether is required.');
    thisTicketOwner = ticketOwner[msg.sender];
    thisTicketOwner.id = ticketOwnersList.length;
    thisTicketOwner.ticketBuyer = msg.sender;
    thisTicketOwner.pickedNumber = _pickedNumber;
    thisTicketOwner.entered = true;
    thisTicketOwner.timeStamp = now;
    boughtTicket[_pickedNumber] = true;
    ticketOwnersList.push(thisTicketOwner);
    soldTicketsNumbers.push(_pickedNumber);
    house.transfer(0.001 ether);

  }


  function getFirstBoughtTicket(uint _index) public view returns (bool) {
    return ticketOwnersList[_index].entered;
  }

  function getWinner(uint _number) public returns (address, uint, uint, uint) {
    for (uint i = 0; i <= ticketOwnersList.length; i++) {
      if (ticketOwnersList[i].pickedNumber == _number) {
        assert(ticketOwnersList[i].pickedNumber == _number);
        ticketOwnersList[i].ticketBuyer.transfer(address(this).balance * 90/100);
        manager.transfer(address(this).balance * 10/100);
        return (
          ticketOwnersList[i].ticketBuyer,
          ticketOwnersList[i].pickedNumber,
          ticketOwnersList[i].id,
          ticketOwnersList[i].timeStamp
        );
      }
    }
  }

  function getPlayersLength() public view returns (uint) {
    return ticketOwnersList.length;
  }

  function getSoldTicketsNumbers() public view returns (uint[]) {
      return soldTicketsNumbers;
  }

  function getRaffleSummary() public returns (address, uint, uint, uint, uint, uint[]) {
      soldTickets = soldTicketsNumbers.length;
      remainingNumberOfTickets = ticketsBlock - soldTickets;
      return (
          address(this),
          address(this).balance,
          soldTickets,
          remainingNumberOfTickets,
          ticketsBlock,
          soldTicketsNumbers
          );
  }
}
