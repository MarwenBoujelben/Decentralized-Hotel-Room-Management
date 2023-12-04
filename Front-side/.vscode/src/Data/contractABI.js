const CONTRACT={
    "address":"0x69F0D872dFb3D225dbA8990E8Fe4D131f8B1b831",//put address after deployment
    "ABI":[
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "roomId",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "price",
					"type": "uint256"
				}
			],
			"name": "addRoom",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "roomId",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "duration",
					"type": "uint256"
				}
			],
			"name": "extendRental",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "roomId",
					"type": "string"
				}
			],
			"name": "openCloseDoor",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "string",
					"name": "roomId",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "timeLeft",
					"type": "uint256"
				}
			],
			"name": "paid",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "roomId",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "duration",
					"type": "uint256"
				}
			],
			"name": "rentRoom",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "string",
					"name": "roomId",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "newState",
					"type": "bool"
				}
			],
			"name": "statusChange",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "getAllRooms",
			"outputs": [
				{
					"components": [
						{
							"internalType": "string",
							"name": "roomId",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "timeLeft",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "price",
							"type": "uint256"
						}
					],
					"internalType": "struct Hotel.RoomDetails[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "client",
					"type": "address"
				}
			],
			"name": "getClientRooms",
			"outputs": [
				{
					"components": [
						{
							"internalType": "string",
							"name": "roomId",
							"type": "string"
						},
						{
							"internalType": "uint256",
							"name": "timeLeft",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "price",
							"type": "uint256"
						}
					],
					"internalType": "struct Hotel.RoomDetails[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "roomId",
					"type": "string"
				}
			],
			"name": "getDoorStatus",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "roomIds",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"name": "rooms",
			"outputs": [
				{
					"internalType": "address",
					"name": "client",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "startDate",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "duration",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "price",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "status",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
};
export default CONTRACT;