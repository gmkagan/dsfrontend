angular.module('dsApp')
       .factory('gameFactory', function ($http) {
           return {
               newGame: function (siteUrl, numberOfPlayers, playerName, callback, errorcallback) {
                   $http({
                       method: 'GET',
					   url: siteUrl + 'game?action=new&numPlayers=' + numberOfPlayers + '&name=' + playerName,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
			   completeEventDealQuest: function (siteUrl, gameKey, playerId, eventId, callback, errorcallback) {
                   $http({
                       method: 'GET',
					   url: siteUrl + 'game?action=completeEventDealQuest&gameKey=' + gameKey + '&eventId=' + eventId + '&playerId=' + playerId,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               completeEvent:  function (siteUrl, gameKey, playerId, eventId, gold, items, what1, where1, what2, where2, dest1, callback, errorcallback) {
                   $http({
                       method: 'GET',
					   url: siteUrl + 'game?action=completeEvent&gameKey=' + gameKey + '&eventId=' + eventId + '&playerId=' + playerId + '&gold=' + gold + '&items=' + items + '&what1=' + what1 + '&where1=' + where1 + '&what2=' + what2 + '&where2=' + where2 + '&dest1=' + dest1,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               joinGame:  function (siteUrl, gameKey, playerName, callback, errorcallback) {
                   $http({
                       method: 'GET',
                       url: siteUrl + 'game?action=join&gameKey=' + gameKey  + '&name=' + playerName,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               listGames:  function (siteUrl, callback, errorcallback) {
                   $http({
                       method: 'GET',
                       url: siteUrl + 'game?action=listGames',
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               discard:  function (siteUrl, gameKey, playerId, actionCost, what, where, callback, errorcallback) {
                   $http({
                       method: 'GET',
                       url: siteUrl + 'game?action=discard&gameKey=' + gameKey + '&what=' + what + '&where=' + where + '&actionCost=' + actionCost + '&playerId=' + playerId,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               move:  function (siteUrl, gameKey, playerId, actionCost, what, src, dst, callback, errorcallback) {
                   $http({
                       method: 'GET',
                       url: siteUrl + 'game?action=move&gameKey=' + gameKey + '&what=' + what + '&src=' + src + '&dst=' + dst + '&actionCost=' + actionCost + '&playerId=' + playerId,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               completeQuest:  function (siteUrl, gameKey, playerId, what, where, callback, errorcallback) {
                   $http({
                       method: 'GET',
                       url: siteUrl + 'game?action=completeQuest&gameKey=' + gameKey + '&what=' + what + '&where=' + where + '&playerId=' + playerId,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               buyCart:  function (siteUrl, gameKey, playerId, actionCost, cart, goldFlag, items, callback, errorcallback) {
                   $http({
                       method: 'GET',
                       url: siteUrl + 'game?action=buyCart&gameKey=' + gameKey + '&withGold=' + goldFlag + '&items=' + items + '&cart=' + cart + '&actionCost=' + actionCost + '&playerId=' + playerId,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               pass:  function (siteUrl, gameKey, playerId, discard, callback, errorcallback) {
                   $http({
                       method: 'GET',
                       url: siteUrl + 'game?action=pass&gameKey=' + gameKey + '&items=' + discard + '&playerId=' + playerId,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               refresh:  function (siteUrl, gameKey, playerId, callback, errorcallback) {
                   $http({
                       method: 'GET',
                       url: siteUrl + 'game?action=refresh&gameKey=' + gameKey + '&playerId=' + playerId,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               marketTrade:  function (siteUrl, gameKey, playerId, actionCost, handItems, marketItems, callback, errorcallback) {
                   $http({
                       method: 'GET',
                       url: siteUrl + 'game?action=marketTrade&gameKey=' + gameKey + '&handItems=' + handItems + '&marketItems=' + marketItems + '&actionCost=' + actionCost + '&playerId=' + playerId,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               buyAction:  function (siteUrl, gameKey, playerId, callback, errorcallback) {
                   $http({
                       method: 'GET',
                       url: siteUrl + 'game?action=buyAction&gameKey=' + gameKey + '&playerId=' + playerId,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               },
               fish:  function (siteUrl, gameKey, playerId, actionCost, what, where, callback, errorcallback) {
                   $http({
                       method: 'GET',
                       url: siteUrl + 'game?action=fish&gameKey=' + gameKey + '&what=' + what + '&where=' + where + '&actionCost=' + actionCost + '&playerId=' + playerId,
                       cache: false
                   }).success(callback)
                     .error(errorcallback);
               }

           }
       });


