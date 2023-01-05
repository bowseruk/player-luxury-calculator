// This global variable tracks the active number of players in the form
var numberOfPlayers = 3;
// This function removes the input for a player
function removePlayer() {
    // There is required to always be at least one player
    if (numberOfPlayers > 1) {
        // Select all elements 
        const listItem = document.getElementById(('player' + (numberOfPlayers) + 'List'));
        // Remove the element
        listItem.remove();
        // Changes the global variable to reflect one less player
        numberOfPlayers--;
        getValues()
    };
};
// This function adds input for a player
function addPlayer() {
    // This finds the form the fieldset will be inserted into, and the fieldset it will be inserted before
    const parentElement = document.getElementById('playerList');
    const endElement = document.getElementById('playerButtonList');
    // The number of players is incremented to reflect an added player
    numberOfPlayers++;
    // A new list is created
    const newList = document.createElement('li');
    newList.setAttribute('id', 'player' + (numberOfPlayers) + 'List');
    newList.setAttribute('class', 'list-group-item');
    // A new fieldset is added and the properties added
    const newFieldset = document.createElement('fieldset');
    newFieldset.setAttribute('class', 'input-group mb-3');
    newList.appendChild(newFieldset);
    // Prefix span
    const newPrefix = document.createElement('span');
    newPrefix.setAttribute('class', 'input-group-text');
    const newPrefixText = document.createTextNode('£');
    newPrefix.appendChild(newPrefixText);
    newFieldset.appendChild(newPrefix);
    // Create new form-floating div
    const newFloatDiv = document.createElement('div');
    newFloatDiv.setAttribute('class', 'form-floating');
    newFieldset.appendChild(newFloatDiv);
    // A new input is created and attributes set
    const newInput = document.createElement('input');
    newInput.setAttribute('id', 'player' + (numberOfPlayers));
    newInput.setAttribute('class', 'form-control');
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min', '0');
    newInput.setAttribute('max', '9999999999');
    newInput.setAttribute('placeholder', 'Cost of Player ' + (numberOfPlayers));
    newInput.setAttribute('oninput', 'getValues()');
    // The input is appended to the fieldset
    newFloatDiv.appendChild(newInput);
    // Create Label
    const newInputLabel = document.createElement('label');
    newInputLabel.setAttribute('for', 'player' + (numberOfPlayers));
    const newInputLabelText = document.createTextNode('Cost of Player ' + (numberOfPlayers));
    // The text is appended to the input label
    newInputLabel.appendChild(newInputLabelText);
    newFloatDiv.appendChild(newInputLabel);
    // Suffix span
    const newSuffix = document.createElement('span');
    newSuffix.setAttribute('class', 'input-group-text');
    const newSuffixText = document.createTextNode('.00');
    newSuffix.appendChild(newSuffixText);
    newFieldset.appendChild(newSuffix);
    // The List is added to the list
    parentElement.insertBefore(newList, endElement);
    getValues()
};

function getValues() {
    // Array is filled with player salaries
    var players = [];
    // Number of players to expect from the site, can be any positive numeric value

    // loops through all the elements and fills reads it into the array
    for (let i = 0; i < numberOfPlayers; i++) {
        players[i] = parseInt(document.getElementById(("player" + (i + 1))).value);
    }
    // Puts the array into a cost function
    var playerTotal = calcTotalCost(players);
    document.getElementById("playerTotal").value = playerTotal;
    var taxFloor = parseInt(document.getElementById("taxFloor").value);
    var taxRate = parseInt(document.getElementById("taxRate").value) / 100;
    var taxCost = calcTaxCost(playerTotal, taxFloor, taxRate);
    document.getElementById("taxCost").value = taxCost;
};
// Calculates the cost of all the players
function calcTotalCost(players) {
    // Starts with a 0 valued variable
    var playerTotal = 0;
    // For loop over all the players
    for (let i = 0; i < players.length; i++) {
        // Check the array element is a number above 0, else does not count it 
        if (typeof players[i] == "number" && players[i] > 0) {
            // If it is valid, add it to the running total
            playerTotal += players[i];
            document.getElementById("player" + (i + 1) + 'List').setAttribute('class', 'list-group-item')
        } else {
            document.getElementById("player" + (i + 1) + 'List').setAttribute('class', 'list-group-item list-group-item-danger')
        };
    };
    // return the running total
    return playerTotal;
};

function calcTaxCost(playerTotal, taxFloor, taxRate) {
    // Check the values are all numbers
    if (typeof playerTotal !== "number" && typeof taxFloor !== "number" && typeof taxRate !== "number") {
        // Return 0 if they are not all numbers
        return 0;
    };
    // Check the tax is above the floor
    if (taxFloor > playerTotal) {
        // Return 0 if the value is below the tax
        return 0;
    };
    // Return the value - the floor multiplied by the tax rate
    return Math.ceil((playerTotal - taxFloor) * taxRate);
};