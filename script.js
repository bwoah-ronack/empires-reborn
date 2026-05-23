const player = {
    money: 20000,
    influence: 10,
    heat: 0,
    businesses: 0,
    territories: 1,
    day: 1,
    stockLevel: 0,
    intelligence: 0
};

const city = {
    corruption: 30,
    police: 40,
    economy: 50,
    unrest: 10
};

function updateUI() {

    document.getElementById("stats").innerHTML = `
        <h2>Empire Status</h2>
        <p>Day: ${player.day}</p>
        <p>Money: $${player.money}</p>
        <p>Influence: ${player.influence}</p>
        <p>Heat: ${player.heat}</p>
        <p>Businesses: ${player.businesses}</p>
        <p>Territories: ${player.territories}</p>
        <p>Stock Investments: ${player.stockLevel}</p>
        <p>Intelligence Network: ${player.intelligence}</p>
    `;

    document.getElementById("cityInfo").innerHTML = `
        <p>Corruption Level: ${city.corruption}</p>
        <p>Police Strength: ${city.police}</p>
        <p>Economy: ${city.economy}</p>
        <p>Public Unrest: ${city.unrest}</p>
    `;
}

function log(message) {

    const logBox = document.getElementById("log");

    logBox.innerHTML += `<p>> ${message}</p>`;

    logBox.scrollTop = logBox.scrollHeight;
}

function buyBusiness() {

    if (player.money < 5000) {
        log("Insufficient funds.");
        return;
    }

    player.money -= 5000;
    player.businesses += 1;
    player.influence += 2;
    player.heat += 3;

    log("You acquired a new underground business.");

    updateUI();
}

function bribePolice() {

    if (player.money < 3000) {
        log("Not enough money to bribe officials.");
        return;
    }

    player.money -= 3000;
    player.heat -= 8;
    city.corruption += 5;
    city.police -= 3;

    if (player.heat < 0) {
        player.heat = 0;
    }

    log("Police officials have been bribed.");

    updateUI();
}

function launchPropaganda() {

    if (player.money < 4000) {
        log("Insufficient funds for propaganda campaign.");
        return;
    }

    player.money -= 4000;
    player.influence += 6;
    city.unrest += 4;

    log("Media propaganda campaign launched.");

    updateUI();
}

function expandTerritory() {

    if (player.money < 10000) {
        log("You need more capital to expand.");
        return;
    }

    player.money -= 10000;
    player.territories += 1;
    player.influence += 10;
    player.heat += 10;

    log("Your empire expanded into a new district.");

    updateUI();
}

function investStocks() {

    const investment = Math.floor(Math.random() * 10000);
    const outcome = Math.random();

    if (outcome > 0.5) {
        player.money += investment;
        log(`Stock investment succeeded. Profit: $${investment}`);
    } else {
        player.money -= investment;
        log(`Stock market crashed. Loss: $${investment}`);
    }

    player.stockLevel += 1;

    updateUI();
}

function viewIntel() {

    player.intelligence += 1;

    const intel = [
        "Rival gangs are moving into downtown.",
        "Police budget cuts incoming.",
        "A politician may support your expansion.",
        "Stock market volatility expected.",
        "Citizens are becoming suspicious.",
        "A media company is secretly for sale."
    ];

    const randomIntel = intel[Math.floor(Math.random() * intel.length)];

    log(`INTEL REPORT: ${randomIntel}`);

    updateUI();
}

function randomEvent() {

    const roll = Math.random();

    if (roll < 0.15) {
        log("Police raid launched against your businesses.");
        player.money -= 6000;
        player.heat += 15;
    }

    else if (roll < 0.30) {
        log("Economic boom increased your profits.");
        player.money += 8000;
        city.economy += 5;
    }

    else if (roll < 0.45) {
        log("A rival organization attacked your territory.");
        player.influence -= 5;
    }

    else if (roll < 0.60) {
        log("Citizens support your hidden operations.");
        player.influence += 4;
    }

    else if (roll < 0.75) {
        log("Corruption spreads deeper into the city.");
        city.corruption += 7;
    }

    else {
        log("Quiet week. Your empire grows silently.");
    }
}

function passiveIncome() {

    const income = (player.businesses * 2500) + (player.territories * 1500);

    player.money += income;

    log(`Your empire generated $${income} this turn.`);
}

function checkGameOver() {

    if (player.money <= -30000) {
        alert("BANKRUPTCY. Your empire collapsed.");
        location.reload();
    }

    if (player.heat >= 200) {
        alert("FEDERAL CRACKDOWN. You were arrested.");
        location.reload();
    }

    if (player.influence >= 500) {
        alert("GLOBAL DOMINATION ACHIEVED. YOU WIN.");
        location.reload();
    }
}

function endTurn() {

    player.day += 1;

    passiveIncome();

    randomEvent();

    player.heat += player.businesses;

    city.unrest += Math.floor(Math.random() * 3);

    city.economy += Math.floor(Math.random() * 5) - 2;

    if (city.economy < 0) {
        city.economy = 0;
    }

    updateUI();

    checkGameOver();
}

updateUI();

log("Welcome to Empires Reborn.");
log("Build your empire carefully. Power attracts enemies.");
// =========================
// INTRODUCTION + TUTORIAL
// =========================
updateUI();
log("========== GAME GUIDE ==========");
log("GAME MECHANICS");
log("BUY BUSINESS");
log("- increases income");
log("- increases influence");
log("- slightly increases heat");
log("BRIBE POLICE");
log("- lowers heat");
log("- increases corruption");
log("PROPAGANDA");
log("- increases influence");
log("- increases unrest");
log("EXPAND TERRITORY");
log("- captures districts");
log("- increases influence heavily");
log("- increases heat heavily");
log("PUBLIC WELFARE");
log("- reduces heat");
log("- reduces unrest");
log("- increases influence");
log("========== ADVANCED SYSTEMS ==========");
log("INVESTMENTS");
log("- 2 out of 3 chance for profit");
log("- can generate massive returns");
log("- failed investments increase heat");
log("INTELLIGENCE NETWORK");
log("- provides strategic reports");
log("- helps future expansion");
log("HIGH HEAT + HIGH UNREST + HIGH CORRUPTION");
log("- can disrupt businesses");
log("- can reduce empire profits");
log("========== WIN CONDITIONS ==========");
log("YOU WIN IF:");
log("- Influence reaches 500");
log("YOU LOSE IF:");
log("- Heat reaches 200");
log("- Money falls below -30000");
log("Every action changes the city.");
log("=====================================");
