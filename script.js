const player = {
        `Days Survived: ${player.day}
` +
        `Money: $${player.money}
` +
        `Influence: ${player.influence}
` +
        `Businesses Owned: ${player.businesses}
` +
        `Territories Controlled: ${player.territories}
` +
        `Stock Investments: ${player.stockLevel}
` +
        `Intelligence Network: ${player.intelligence}`
    );

    location.reload();
}

function checkGameOver() {

    if (player.money <= -20000) {
        showScoreboard("BANKRUPTCY. Your empire collapsed.");
    }

    if (player.heat >= 100) {
        showScoreboard("FEDERAL CRACKDOWN. You were arrested.");
    }

    if (player.influence >= 200) {
        showScoreboard("GLOBAL DOMINATION ACHIEVED. YOU WIN.");
    }
}

    if (player.heat >= 100) {
        alert("FEDERAL CRACKDOWN. You were arrested.");
        location.reload();
    }

    if (player.influence >= 200) {
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

log("Welcome to Empire of Shadows.");
log("Build your empire carefully. Power attracts enemies.");
