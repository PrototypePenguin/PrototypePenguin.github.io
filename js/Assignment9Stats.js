var jsonRosterData;
var nhlJsonData;

function loadDoc() {
  nhlJsonData = [];
  $.ajax({
    url: "http://statsapi.web.nhl.com/api/v1/teams/52/roster/", 
    method:"GET"
  }).done(function(responseText){
      nhlJsonData = responseText;
      jsonRosterData = [];
      getPlayers(0);
    });
}

function getPlayers(id)
{
  if(id == nhlJsonData.roster.length) {
    createTable(nhlJsonData, jsonRosterData);
  }
  else {
    $.ajax({
      url: "http://statsapi.web.nhl.com/api/v1/people/".concat(nhlJsonData.roster[id].person.id).concat("/stats?stats=gameLog&season=20172018"),
      method: "GET"
    }).done(function(playerDataReturnedFromTheAjaxCall) {
      jsonRosterData[id] = playerDataReturnedFromTheAjaxCall;
      getPlayers(id+1);
    });
  }

}

function createTable(jsonText, jsonText2)
{
  var skaterPlace = 1;
  var goaliePlace = 2;
  for(var i = 0; i < jsonText.roster.length; i++)
  {
    if(jsonText2[i].stats[0].splits[0].stat.goals == null)
    {
      skaterPlace--;

      var gameGoalsAgainst = 0;
      var gameShotsAgainst = 0;

      var goalieTable = document.getElementById("goalies");
      var newTR = document.createElement("tr");

      goalieTable.appendChild(newTR);

      var newTdPlayer = document.createElement("td");
      var newPlayer = jsonText.roster[i].person.fullName;
      
      var newTdGamesPlayed = document.createElement("td");
      var newGamesPlayed = jsonText2[i].stats[0].splits.length;
      var newTdWinLoss = document.createElement("td");
      var newWinLoss = 0;
      var newTdGoalsAgainst = document.createElement("td");
      var newGoalsAgainst = 0;
      var newTdShotsAgainst = document.createElement("td");
      var newShotsAgainst = 0;
      var newTdSavePercentage = document.createElement("td");

      for(var k = 0; k < jsonText2[i].stats[0].splits.length; k++)
      {
        if(jsonText2[i].stats[0].splits[k].stat.decision == 'W')
        {
          newWinLoss++;
        }
        gameGoalsAgainst = jsonText2[i].stats[0].splits[k].stat.goalsAgainst;
        newGoalsAgainst += gameGoalsAgainst;
        gameShotsAgainst = jsonText2[i].stats[0].splits[k].stat.shotsAgainst;
        newShotsAgainst += gameShotsAgainst;
      }

      newTdPlayer.innerHTML = newPlayer;
      newTdGamesPlayed.innerHTML = newGamesPlayed;
      newTdWinLoss.innerHTML = newWinLoss;
      newTdGoalsAgainst.innerHTML = newGoalsAgainst;
      newTdShotsAgainst.innerHTML = newShotsAgainst;
      newTdSavePercentage.innerHTML = ((newShotsAgainst - newGoalsAgainst) / newShotsAgainst).toFixed(3);

      target = document.getElementsByTagName("tr")

      target[i+goaliePlace].appendChild(newTdPlayer);
      target[i+goaliePlace].appendChild(newTdGamesPlayed);
      target[i+goaliePlace].appendChild(newTdWinLoss);
      target[i+goaliePlace].appendChild(newTdGoalsAgainst);
      target[i+goaliePlace].appendChild(newTdShotsAgainst);
      target[i+goaliePlace].appendChild(newTdSavePercentage);
    }
    else
    {
      var gameGoals = 0;
      var gameAssists = 0;
      var gamePoints = 0;
      var gamePlusMinus = 0;

      var skaterTable = document.getElementById("skaters");
      var newTR = document.createElement("tr");

      skaterTable.appendChild(newTR);

      var newTdPlayer = document.createElement("td");
      var newPlayer = jsonText.roster[i].person.fullName;
      
      var newTdGamesPlayed = document.createElement("td");
      var newGamesPlayed = jsonText2[i].stats[0].splits.length;
      var newTdGoals = document.createElement("td");
      var newGoals = 0;
      var newTdAssists = document.createElement("td");
      var newAssists = 0;
      var newTdPoints = document.createElement("td");
      var newTdPlusMinus = document.createElement("td");
      var newPlusMinus = 0;

      for(var k = 0; k < jsonText2[i].stats[0].splits.length; k++)
      {
        gameGoals = jsonText2[i].stats[0].splits[k].stat.goals;
        newGoals += gameGoals;
        gameAssists = jsonText2[i].stats[0].splits[k].stat.assists;
        newAssists += gameAssists;
        gamePlusMinus = jsonText2[i].stats[0].splits[k].stat.plusMinus;
        newPlusMinus += gamePlusMinus;
      }

      newPoints = newGoals + newAssists;

      newTdPlayer.innerHTML = newPlayer;
      newTdGamesPlayed.innerHTML = newGamesPlayed;
      newTdGoals.innerHTML = newGoals;
      newTdAssists.innerHTML = newAssists;
      newTdPoints.innerHTML = newPoints;
      newTdPlusMinus.innerHTML = newPlusMinus;

      target = document.getElementsByTagName("tr")

      target[i+skaterPlace].appendChild(newTdPlayer);
      target[i+skaterPlace].appendChild(newTdGamesPlayed);
      target[i+skaterPlace].appendChild(newTdGoals);
      target[i+skaterPlace].appendChild(newTdAssists);
      target[i+skaterPlace].appendChild(newTdPoints);
      target[i+skaterPlace].appendChild(newTdPlusMinus);
    }
  }
}

document.addEventListener("DOMContentLoaded",loadDoc,false);