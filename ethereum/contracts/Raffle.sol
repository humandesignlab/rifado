pragma solidity ^0.4.24;
import "./oraclizeAPI_0.5.sol";

contract LottoCoinFactory {
  address[] public deployedRaffles;

  function createRaffle(uint _ticketBlockSize, uint _timeTillDraw) public {
    address newRaffle = new LottoCoin(msg.sender, _ticketBlockSize, _timeTillDraw);
    deployedRaffles.push(newRaffle);
  }

  function getDeployedRaffles() public view returns (address[]) {
    return deployedRaffles;
  }
}

contract LottoCoin is usingOraclize {
    event newRandomNumber_bytes(bytes);
    event newRandomNumber_uint(uint);

    address house = 0xdbAD7A44a0C62DD47B7F747C0Af60b9AD83E9650;
    address public manager;
    uint public ticketsBlock;
    uint[] public soldTicketsNumbers;
    uint public soldTickets;
    uint public remainingNumberOfTickets;
    uint public drawDate;


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

  function LottoCoin(address creator, uint tickets, uint secondsToDraw) public {
    manager = creator;
    createTicketBlock(tickets);
    oraclize_setProof(proofType_Ledger); // sets the Ledger authenticity proof in the constructor
    callWinnerNumber(tickets, secondsToDraw);
    drawDate = now + secondsToDraw;
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

    function __callback(bytes32 _queryId, string _result, bytes _proof) {
        if (msg.sender != oraclize_cbAddress()) throw;

            newRandomNumber_bytes(bytes(_result)); // this is the resulting random number (bytes)

            // for simplicity of use, let's also convert the random bytes to uint if we need
            uint randomNumber = parseInt(_result); // this is an efficient way to get the uint out in the [0, maxRange] range

            newRandomNumber_uint(randomNumber); // this is the resulting random number (uint)
            getWinner(randomNumber);
            /* selfdestruct(house); */
    }

  function callWinnerNumber(uint _maxNumber, uint _secondsToDraw) payable {

    string memory string1 = "[URL] ['json(https://api.random.org/json-rpc/1/invoke).result.random.data.0', '\\n{\"jsonrpc\":\"2.0\",\"method\":\"generateIntegers\",\"params\":{\"apiKey\":\"${[decrypt] BGykTJKvMgwZnt5I1XXeiitWXMRsen505Fp5NlgS9SD8cPtCqtAP9qCGE7fv0YNgthHP15OCfEyePYr6STJ53ienL9q5W8rSR7gnnNXvf95BuG0sbNELzppn19VfNQKIjTQt7RDlY/yW0tkMK3u/chANbLOe}\",\"n\":1,\"min\":1,\"max\":";

    string memory string2 = uint2str(_maxNumber);

    string memory string3 = ",\"replacement\":true,\"base\":10${[identity] \"}\"},\"id\":1${[identity] \"}\"}']";

    string memory query = strConcat(string1, string2, string3);

    bytes32 queryId = oraclize_query(_secondsToDraw, "nested", query);
  }

  function getWinner(uint _number) public returns (address, uint, uint, uint) {
    for (uint i = 0; i <= ticketOwnersList.length; i++) {
      if (ticketOwnersList[i].pickedNumber == _number) {
        assert(ticketOwnersList[i].pickedNumber == _number);
        ticketOwnersList[i].ticketBuyer.transfer(address(this).balance * 90/100);
        manager.transfer(address(this).balance);
        return (
          ticketOwnersList[i].ticketBuyer,
          ticketOwnersList[i].pickedNumber,
          ticketOwnersList[i].id,
          ticketOwnersList[i].timeStamp
        );
      } //TODO: else refund money if no player has the winner number
    }
  }

  function getPlayersLength() public view returns (uint) {
    return ticketOwnersList.length;
  }

  function getSoldTicketsNumbers() public view returns (uint[]) {
      return soldTicketsNumbers;
  }

  function getRaffleSummary() public returns (address, uint, uint, uint, uint, uint[], uint) {
      soldTickets = soldTicketsNumbers.length;
      remainingNumberOfTickets = ticketsBlock - soldTickets;
      return (
          address(this),
          address(this).balance,
          soldTickets,
          remainingNumberOfTickets,
          ticketsBlock,
          soldTicketsNumbers,
          drawDate
          );
  }
}
