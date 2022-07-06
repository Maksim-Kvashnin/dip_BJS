'use strict'

const logBtn = new LogoutButton();

logBtn.action = () => {
  ApiConnector.logout(response => {
    response.success ? location.reload() : console.error("Error: something went wrong");
//    console.log(response);
  });
}

ApiConnector.current(response => {
  response.success ? ProfileWidget.showProfile(response.data) : console.error("Error: something went wrong");
//  console.log(response);
});

const ratesBoard = new RatesBoard();

function exchangeRateRequest() {
  ApiConnector.getStocks(response => {
    if (response) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

setInterval(exchangeRateRequest, 60000);

const monyeManager = new MoneyManager();

monyeManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    response.success ? ProfileWidget.showProfile(response.data) : monyeManager.setMessage(!response.success, response.data);
//    console.log(response);
  })
}

monyeManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    response.success ? ProfileWidget.showProfile(response.data) : monyeManager.setMessage(!response.success, response.data);
//    console.log(response);
  })
}

monyeManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    response.success ? ProfileWidget.showProfile(response.data) : monyeManager.setMessage(!response.success, response.data);
//    console.log(response);
  })
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    monyeManager.updateUsersList(response.data);
//    console.log(response);
  }
});

favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      monyeManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success);
      response.data = "You successfully added new favorites user";
      favoritesWidget.setMessage(response.success, response.data);
//      console.log(response);
//      console.log(data);
    }
    favoritesWidget.setMessage(!response.success, response.data);
//    console.log(response);
//    console.log(data);
  })
}

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      monyeManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success);
      response.data = "You successfully deleted a user";
      favoritesWidget.setMessage(response.success, response.data);
//      console.log(response);
//      console.log(data);
    }
    favoritesWidget.setMessage(!response.success, response.data);
//    console.log(response);
//    console.log(data);
  })
}
