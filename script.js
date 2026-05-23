let playerName = "";

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

const territories = [

    { name: "Downtown", owner: "player" },

    { name: "Harbor", owner: "rival" },

    { name: "Industrial Zone", owner: "neutral" },

    { name: "Old City", owner: "player" },

    { name: "Financial District", owner: "rival" },

    { name: "West End", owner: "neutral" }
];

function startIntroduction() {

    playerName = prompt("Enter your empire name or leader name:");

    if (!playerName || playerName.trim() === "") {
        playerName = "Commander";
    }

    alert(`Welcome ${playerName} to EMPIRES REBORN.`);

    alert(
`HOW THE GAME WORKS

Build the most powerful empire possible.

Earn money through:
- businesses
- territories
- investments

But expansion creates risk.`
    );

    alert(
`GAME MECHANICS

BUY BUSINESS
- increases income
- increases heat

PUBLIC WELFARE
- reduces heat
- reduces unrest
- increases influence

EXPAND TERRITORY
- captures districts
- increases influence
- increases heat`
    );
}

function renderMap() {

    let mapHTML = "";

    territories.forEach(area => {

        let color = "gray";

        if (area.owner === "player") {
            color = "#00ff66";
        }

        else if (area.owner === "rival") {
            color = "red";
        }

        mapHTML += `
        <div style="
            border:1px solid ${color};
            color:${color};
            padding:10px;
        ">
            <strong>${area.name}</strong><br>
            ${area.owner.toUpperCase()}
        </div>
        `;
    });

    document.getElementById("territoryMap").innerHTML = mapHTML;
}

function updateUI() {

    document.getElementById("stats").innerHTML = `
        <h2>Empire Status</h2>

        <p><strong>Leader:</strong> ${playerName}</p>

        <p><strong>Day:</strong> ${player.day}</p>

        <p>Money: $${player.money}</p>

        <p>Influence: ${player.influence}</p>

        <p>Heat: ${player.heat}</p>

        <p>Businesses: ${player.businesses}</p>

        <p>Territories: ${player.territories}</p>

        <p>Stock Investments: ${player.stockLevel}</p>

        <p>Intelligence Network: ${player.intelligence}</p>
    `;

    renderMap();

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

function publicWelfare() {

    if (player.money < 6000) {

        log("Insufficient funds for welfare program.");

        return;
    }

    player.money -= 6000;

    player.influence += 8;

    player.heat -= 10;

    city.unrest -= 12;

    if (player.heat < 0) {
        player.heat = 0;
    }

    if (city.unrest < 0) {
        city.unrest = 0;
    }

    log("Public welfare programs improved your reputation and stabilized the city.");

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

    const neutralTerritory = territories.find(
        t => t.owner === "neutral"
    );

    if (neutralTerritory) {

        neutralTerritory.owner = "player";

        log(`You captured ${neutralTerritory.name}.`);
    }

    log("Your empire expanded into a new district.");

    updateUI();
}

function investStocks() {

    const investment =
        Math.floor(Math.random() * 10000) + 1000;

    const outcome =
        Math.floor(Math.random() * 3);

    // 2 out of 3 success rate
    if (outcome !== 0) {

        const profit =
            Math.floor(investment * 1.5);

        player.money += profit;

        player.influence += 1;

        log(`Stock investment succeeded. Profit: $${profit}`);
    }

    else {

        player.money -= investment;

        player.heat += 2;

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

    const randomIntel =
        intel[Math.floor(Math.random() * intel.length)];

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

    let income =
        (player.businesses * 2500) +
        (player.territories * 1500);

    // disruption system
    if (
        player.heat > 60 ||
        city.corruption > 75 ||
        city.unrest > 70
    ) {

        const disruptionChance = Math.random();

        if (disruptionChance > 0.5) {

            const loss = Math.floor(income * 0.5);

            income -= loss;

            player.influence -= 3;

            log(
`BUSINESS DISRUPTION:
Raids and instability reduced profits by $${loss}`
            );
        }
    }

    player.money += income;

    log(`Your empire generated $${income} this turn.`);
}

function calculateScore() {

    let score = 0;

    score += player.money / 1000;

    score += player.influence * 5;

    score += player.businesses * 15;

    score += player.territories * 25;

    score += player.stockLevel * 5;

    score += player.intelligence * 10;

    score += player.day * 2;

    score -= player.heat * 2;

    score -= city.unrest;

    return Math.floor(score);
}

function showScoreboard(reason) {

    const finalScore = calculateScore();

    alert(
`GAME OVER

${reason}

FINAL SCORE: ${finalScore}

Days Survived: ${player.day}
Money: $${player.money}
Influence: ${player.influence}
Businesses Owned: ${player.businesses}
Territories Controlled: ${player.territories}
Stock Investments: ${player.stockLevel}
Intelligence Network: ${player.intelligence}`
    );

    location.reload();
}

function checkGameOver() {

    if (player.money <= -20000) {

        showScoreboard(
            "BANKRUPTCY. Your empire collapsed."
        );
    }

    if (player.heat >= 100) {

        showScoreboard(
            "FEDERAL CRACKDOWN. You were arrested."
        );
    }

    if (player.influence >= 200) {

        showScoreboard(
            "GLOBAL DOMINATION ACHIEVED. YOU WIN."
        );
    }
}

function endTurn() {

    player.day += 1;

    passiveIncome();

    randomEvent();

    player.heat += player.businesses;

    city.unrest += Math.floor(Math.random() * 3);

    city.economy +=
        Math.floor(Math.random() * 5) - 2;

    if (city.economy < 0) {
        city.economy = 0;
    }

    updateUI();

    checkGameOver();
}

updateUI();

startIntroduction();

log(`Welcome ${playerName} to Empires Reborn.`);

log("Build your empire carefully. Power attracts enemies.");
