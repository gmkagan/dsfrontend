app.controller('dsCtrl', ['$scope', 'gameFactory', function ($scope, gameFactory) {
	$scope.imagePath = "images/"
	$scope.siteUrl = 'https://dungeonshopper.appspot.com/'
	$scope.runLocalHost = false;
	$scope.activePlayer = null;
	$scope.activeEvent = null;
	$scope.adj = null;
	$scope.isActive = false;
	$scope.clickedCompleteEvent = false;
	$scope.debug = false;
	//gui variable to control item buttons
	$scope.selectedItemsCount = 0;
	//gui variable to control cart buttons
	$scope.selectedCartItemsCount = 0;
	//gui variable to control market buttons
	$scope.sumMarketValueSelected = 0;
	//gui control of the market cards selected
	$scope.selectedMarketTradeCount = 0;
	//used in gui to show items left in deck
	$scope.itemsCountRemaining = 0;
	//used in gui to show quests left in deck
	$scope.questsCountRemaining = 0;
	//used in gui to show discard count
	$scope.discardsCount = 0;
	//used to show the last card discarded in the gui
	$scope.lastDiscard = new playingCard();
	//more gui variables for items
	$scope.selectedCartItems = "";
	$scope.totalCartCardsFound = 0;
	$scope.totalCardsFound = 0;

	//checkboxes, button defaults
	$scope.showLog = false;
	$scope.showLogText = "Show Players Log";
	$scope.blankText = "";
	$scope.showOtherPlayerData = false;
	$scope.showMyCompletedQuests = false;
	$scope.showHideVar = "Show";
	$scope.showHideQuestVar = "Show";
	$scope.playSounds = true;
	$scope.soundPlaying = "";
	$scope.musicPlaying = "";
	$scope.musicText = "Play";
	$scope.playMusic = false;
	$scope.autoSelectHand = true;
	$scope.autoSelectCart = true;
	$scope.autoSelectMarket = true;
	$scope.autoSelectQuest = true;
	$scope.autoPass = true;
	$scope.hideImagesBool = false;
	$scope.showOptions = false;

	//gui variable to control cart buttons
	$scope.prevActiveCartId = -1;
	$scope.activeCartId = -1;

	//card gui variables
	$scope.borderPXselected = 'border: 5px solid lightgreen;';
	$scope.borderPX = "border: 1px solid black;";
	$scope.borderPXorig = "border: 1px solid black;";

	$scope.refresh=false;
	//control which log items to push
	$scope.logItemCount = 0;
	$scope.myLastWhatItems1 = null;
	$scope.myLastFromWhere1 = null;
	$scope.myLastMoveDest = null;
	$scope.gameKey = null;
	$scope.aQuestIsReadyHand = false; 
	$scope.aQuestIsReadyCart = false; 		
	//sets randome number for cart fun text
	setRandomText = function() {
		$scope.w = Math.floor(Math.random()*10+1);
		$scope.x = Math.floor(Math.random()*10+1);
		$scope.y = Math.floor(Math.random()*10+1);
		$scope.z = Math.floor(Math.random()*10+1);
	}
	
	$scope.noGame = function () {
		setupNoGame();
	}

	$scope.debugCheck = function () {
		$scope.debug = !$scope.debug;
	}		

	$scope.soundsCheck = function () {
		$scope.playSounds = !$scope.playSounds;
		pauseSounds();
	}
	
	
	pauseSounds = function() {
		if ($scope.soundPlaying != "") {
			var audio = document.getElementById($scope.soundPlaying);
			if(audio.paused) {
				audio.play();
			}
			else {
				audio.pause($scope.soundPlaying);
				$scope.soundPlaying = "";
			}
		}
	}

	$scope.musicCheck = function () {
		$scope.playMusic = !$scope.playMusic;
		if(!$scope.playMusic) {
			pauseMusic("true");
			$scope.musicText = "Play";
		}
	}	
	
	$scope.playPauseMusicClick = function () {
		if ($scope.playMusic) {
			pauseMusic("true");
		}
		else {
			$scope.playMusic = false;
			$scope.musicCheck();
			pauseMusic("false");
		}
	}	
	
	
	pauseMusic = function(bool) {
		if ($scope.musicPlaying != "") {
			var audio = document.getElementById($scope.musicPlaying);
			if (bool) {
				audio.pause($scope.musicPlaying);
				$scope.musicPlaying = "";
				$scope.musicText = "Play";
				}
			else {
				if(audio.paused) {
					$scope.playMusic = true;
					audio.play();
					$scope.musicText = "Pause";
					document.getElementById("check1").checked = true;
				}

			}
		}
		else {
			if ($scope.playMusic ) {
				$scope.playMusic = true;
				document.getElementById("check1").checked = true;
				playMusic($scope.music[0].name);
				$scope.musicText = "Pause";
			}
		}
	}
	
	$scope.autoSelectCartCheck = function () {
		$scope.autoSelectCart = !$scope.autoSelectCart;
	}	


	$scope.runLocalHostCheck = function () {
		$scope.runLocalHost != $scope.runLocalHost;
		if (!$scope.runLocalHost) {
			$scope.siteUrl = 'https://dungeonshopper.appspot.com/'
			setupNoGame();
		}
		else {
			$scope.siteUrl = '';
			setupNoGame();
		}
	}	

	$scope.showOptionsClick = function () {
		$scope.showOptions = !$scope.showOptions;
	}	
	
	
	$scope.autoSelectMarketCheck = function () {
		$scope.autoSelectMarket = !$scope.autoSelectMarket;
	}	
	$scope.autoSelectHandCheck = function () {
		$scope.autoSelectHand = !$scope.autoSelectHand;
	}	
	
	$scope.autoSelectQuestCheck = function () {
		$scope.autoSelectQuest = !$scope.autoSelectQuest;
	}	

	$scope.autoPassCheck = function () {
		$scope.autoPass = !$scope.autoPass;
	}	


	$scope.hideImagesCheck = function () {
		$scope.hideImagesBool = !$scope.hideImagesBool;
	}	

	//setup splash screen
	setupNoGame = function() {
		$scope.displayMode = "nogame";
		$scope.playerName="P1";
		$scope.sounds = prepSounds();
		$scope.music = prepMusic();
		$scope.game=null;
		hideImages($scope);
		$scope.adj = setAdj();
		listGames();
		playMusic($scope.music[0].name);
	}	

	$scope.joinGame = function(gameKey, playerName) {
		hideImages($scope);
		$scope.game = new Game($scope.blankMarketImageBase, $scope.questImageBase,$scope.cartImageBase);
		joinGame(gameKey, playerName);
		$scope.events = prepEvents();

	    startInterval(2000);
    }
		
	
	$(document).ready(function() {
        setupNoGame();
	});

	
//	$scope.newGame = function (numberOfPlayers, playerName) {
//		$scope.numberOfPlayers = Number(numberOfPlayers);
//		$scope.myId = 0;
//		hideImages($scope);
//		$scope.game = new Game($scope.blankMarketImageBase, $scope.questImageBase,$scope.cartImageBase);
//		newGame(numberOfPlayers, playerName);
//		$scope.events = prepEvents();
//		$scope.sounds = prepSounds();
//		play($scope.sounds[10].name);
//	}

	//refresh data from backend if anything is stuck
	$scope.playerRefresh = function() {
		playerRefresh();
		$scope.loadingData=false;
	}

	//interval method to update game spectators
   	function startInterval(params) {
        $scope.timerId = setInterval(function () { 
			//if($scope.isActive===false) {
				if($scope.refresh === true) {
					playerRefresh();
				}
			//}

		}	, params	)
	}





		//plays audio files
	play = function (soundId) {
		if($scope.playSounds) {
			$scope.soundPlaying = soundId;
			var audio = document.getElementById(soundId);
			audio.play();
		}
	};
	
	//plays music files
	playMusic = function (musicId) {
		if($scope.playMusic) {
			$scope.musicPlaying = musicId;
			var audio = document.getElementById(musicId);
			audio.play();
			if (typeof audio.loop == 'boolean')
			{
				audio.loop = true;
			}
		}
	};
	
	

	var cardColor = function(card) {
		if(card.selected) {
			return $scope.borderPXselected; //red
		}
		else {
			return $scope.borderPXorig; //black
		}
	}



	$scope.showOtherPlayerDataClick = function () {
		$scope.showOtherPlayerData = !$scope.showOtherPlayerData;
		$scope.showHideVar = showHide($scope.showOtherPlayerData);
	}

	$scope.showMyCompletedQuestsClick = function () {
		$scope.showMyCompletedQuests = !$scope.showMyCompletedQuests;
		$scope.showHideQuestVar = showHideQuests($scope.showMyCompletedQuests);
	}
	
	$scope.showLogResults = function() {
		if(!$scope.showLog) {
			$scope.showLogText = "Hide Players Log";
		}else {
			$scope.showLogText = "Show Players Log";
		}
		$scope.showLog = !$scope.showLog;
	}

	$scope.endGame = function() {
		var r =  confirm("Are you sure you want to quit?");
			if(r===true) {
				gameEnd();
			}
			else {
				return;
			}
	}

	$scope.userClickedMarketImage = function(i) {
		if(!$scope.isActive){return;}
		var game = $scope.game;
		var marketCard = game.itemMarketHolders.playingCards[i];
		var tradeCard = game.marketDeckInTrade.playingCards[i];
		//marketCard.selected = !marketCard.selected;
		//tradeCard.selected = !tradeCard.selected;

		//increase/decrease the number above the market/trade card holder
		marketCard.count--;
		tradeCard.count++;
		//card.setCountImage(card.count);
		marketCard.setImage(marketCard.number, marketCard.count);
		tradeCard.setImage(tradeCard.number, tradeCard.count);
		//card.setCardSize("orig");
		//game.marketDeckInTrade.addCardc(card);
		//var len = game.marketDeckInTrade.playingCards.length - 1;
		//game.marketDeckInTrade.playingCards[len].selected = true;
		updateMarketItemPoints(marketCard.number);
		play($scope.sounds[9].name);

	}

	$scope.userClickedMarketTradeImage = function(i) {
		if(!$scope.isActive){return;}	
		var game = $scope.game;
		var tradeCard = game.marketDeckInTrade.playingCards[i];
		var marketCard = game.itemMarketHolders.playingCards[i];
		
		//increase/decrease the number above the market/trade card holder
		marketCard.count++;
		tradeCard.count--;
		//marketCard.setCountImage(marketCard.count);
		
		marketCard.setImage(marketCard.number, marketCard.count);
		tradeCard.setImage(tradeCard.number, tradeCard.count);

		tradeCard.selected = false;
		//marketCard.selected = !marketCard.selected;
		//game.marketDeckInTrade.playingCards[i] = null;
		//game.marketDeckInTrade.truncate();
		updateMarketItemPoints(-tradeCard.number);
		play($scope.sounds[9].name);

	}

	$scope.userClickedQuestImage = function(i) {
		if(!$scope.isActive){return;}
		var game = $scope.game;
		var questClicked = game.questsInPlay.playingCards[i];
		questClicked.selected = !questClicked.selected;
		questClicked.borderColor = cardColor(questClicked);

		
		if(questClicked.selected === false) {
			for (var j = 0; j < game.questsInPlay.playingCards.length; ++j)  {
				var card = game.questsInPlay.playingCards[j];
				card.selected = false;
				card.borderColor = cardColor(card);
				card.setCardSize("orig");
			}
		}
		else {
			for (var j = 0; j < game.questsInPlay.playingCards.length; ++j)  {
				if(j===i){
					if(questClicked.selected){
						questClicked.setCardSize("orig");
					}
					//else {
					//	questClicked.setCardSize("small");
					//}
				}
				else {
					var card = game.questsInPlay.playingCards[j];
					card.selected = false;
					card.borderColor = cardColor(card);
					card.setCardSize("small");
				}
			}
		}
		play($scope.sounds[9].name);

	}

	gameEnd = function() {
		$scope.displayMode = "gameover";
		$scope.displayModeName = "Game Over";
		clearInterval($scope.timerId);
		$scope.loadingData=false;
	}
	
	selectHandCards = function(cardArray) {
		var nextItem = 0;
		for (var a=0; a < cardArray.length; ++a) {
			itemNumber = cardArray[a]*-1;
			for (var d=nextItem;d < $scope.activePlayer.cards.playingCards.length; ++d) {
				nextItem++;
				if(itemNumber === $scope.activePlayer.cards.playingCards[d].number) {
					$scope.userClickedItemImage(d);
					break;
					
				}
			}
		}
	}

	$scope.playerCompleteQuest = function(id) {
		var game = $scope.game;
		var player = $scope.activePlayer;
		var questClicked = game.questsInPlay.playingCards[id];
		var questCanBeCompleted = false;

		if($scope.activeCartId < 0 )	{
			alert("Select a cart with items first.");
			return;
		}

		var cart = player.carts[$scope.activeCartId];

		if($scope.selectedCartItemsCount < 3 || cart.cards.playingCards.length != $scope.selectedCartItemsCount) {
			alert("Select all items in cart/wagon first.");
			return;
			}
			
		var selectedCards = getSelectedCardArrayForQuest(cart.cards);
		//var selectedCards = getSelectedCards(cart.cards, true);
		//var questCards = getSelectedCardArrayForQuest(cart.cards);
		var items =  getSelectedCardArray(new Array(questClicked.item1, questClicked.item2, questClicked.item3, questClicked.item4, questClicked.item5));
		
		var a = parseSelectedCardArrayForQuest(selectedCards);
		var b = parseSelectedCardArrayForQuest(items);
		if (a === b ){
			questCanBeCompleted = true;
		}

		if (questCanBeCompleted === true) {
			var r =  confirm("Confirm purchase from " + cart.name +"?");
			if(r===true) {
				//check if player completed quest and move it to their completed quests
				//game.questsInPlay.setCardSize("orig");
				completeQuest(parseFromArrayToString(selectedCards), 'cart' + cart.id);
				questClicked.selected = false;
				resetAllSelectedCards(player);
			}
			else {
				return;
			}
		}
		else {
			alert(cart.name + " does not contain the necessary items for this quest!")
			return;
		}
		play($scope.sounds[7].name);

	}

	setCartActiveStatus = function(id) {
		if(id != $scope.activeCartId) {
			$scope.prevActiveCartId = $scope.activeCartId;
		}
		//then set active cart id
		$scope.activeCartId = id;
	}

	$scope.userClickedCartItem = function(id, i) {
		if(!$scope.isActive){return;}
		setCartActiveStatus(id);
		var player = $scope.activePlayer;
		var card = player.carts[id].cards.playingCards[i];
		var cart = player.carts[id];
		
		card.selected = !card.selected;
		card.borderColor = cardColor(card);
		cartCardChecked(card);
		resetPlayerCardsSelected(player);
		resetCartCardsSelected(player, id);
		
		cart.cardSumSelected = getSelectedCardSum(cart.cards, true);
		play($scope.sounds[9].name);

	}

	$scope.userClickedItemImage = function(id) {
		if(!$scope.isActive){return;}
		var player = $scope.activePlayer;
		var card = player.cards.playingCards[id];
		resetCartCardsSelected(player, -1);
		card.selected = !card.selected;
		card.borderColor = cardColor(card);	
		playerCardChecked(card);
		player.cardSumSelected = getSelectedCardSum(player.cards, true);
		$scope.selectedItemsCount = getSelectedCardcount(player.cards, true);
		updatePurchaseText(player.cardSumSelected);
		play($scope.sounds[9].name);

	}

	updatePurchaseText = function(playerCardSumSelected){
		var player = $scope.activePlayer;
		
		if(playerCardSumSelected > 0) {
			if(player.nextCartId !=4) {//no more carts to buy!
				player.carts[player.nextCartId].purchaseWith = cardPurchaseWithText(playerCardSumSelected, player.carts[player.nextCartId].itemCost) ;
			}
		}
		if(!player.carts[0].active) {
			player.carts[0].purchaseWith = 'items' ;	
			}
		
	}

	$scope.userClickedCartImage = function(id) {
		if(!$scope.isActive){return;}
		var player = $scope.activePlayer;
		
		//deselect all items in cart if cart selected
		for (var j = 0; j < player.carts[id].cards.playingCards.length; ++j)  {
			$scope.userClickedCartItem(id, j);
		}
	}

	updateMarketItemPoints = function(value) {
		$scope.sumMarketValueSelected += value;
		
		if(value > 0) {
			$scope.selectedMarketTradeCount++;
		}
		else {
			$scope.selectedMarketTradeCount--;
		}
		
	}

	updateDiscardPile = function(game, number) {
		for (var i = 0; i < game.itemHolders.playingCards.length; ++i)  {
			var card = game.itemHolders.playingCards[i];
			card.setCardSize("large");
				if(card.number === number) {
					$scope.lastDiscard = card;				
					break;
			}
		}
	}

	$scope.moveItemsToCart = function(id, actionCost ) {
		if(!$scope.isActive){return false;}
		//check if one to one or many to many
		setCartActiveStatus(id);
		var player = $scope.activePlayer;
		var selectedCards = getSelectedCards(player.cards, true);
		var selectedCardCount = getSelectedCardcount(player.cards, true);
		var cart = player.carts[id];
		if(actionCost > 0) {
			if(player.actionsRemaining === 0)	{
				alert("You have no actions.");
				return false;
			}	
		}
		
		if($scope.prevActiveCartId >= 0) {
			$scope.selectedCartItems = getSelectedCards(player.carts[$scope.prevActiveCartId].cards, true);
		}
		
		//if cart cards are selected, move between carts else its player items to cart
		//these are in the scope variable as the new cart they select is selectedCartCount
		if($scope.selectedCartItemsCount > 0) {
			moveItemsBetweenCarts($scope.prevActiveCartId, id, $scope.selectedCartItems, actionCost );
			return true;
		}

		if(selectedCardCount === 0){
			alert('Select some items to move to cart.');
			return false;
		}
		
		if($scope.selectedCartItemsCount > cart.size - cart.cards.playingCards.length){
			alert('Cannot move that many items into the cart.');
			return false;
		}
		
		//when moved from player to cart
		move(actionCost, selectedCards, 'hand','cart'+id)
			cart.cards.setCardSize("orig");
		//cart.cards.setCardSize("small");
		resetAllSelectedCards(player);
		play($scope.sounds[5].name);

		return true;
	}

	moveItemsBetweenCarts = function(prevId, id, selectedCartItems, actionCost ) {
		var game = $scope.game;
		var player = $scope.activePlayer;
		var cart = player.carts[id];
		if(actionCost>0) {
			if(player.actionsRemaining === 0)	{
				alert("You have no actions.");
				return false;
			}	
		}
		
		if($scope.selectedCartItemsCount === 0){
			alert('Select items to move between cart.');
			return false;
		}	
		
		if($scope.selectedCartItemsCount > cart.size - cart.cards.playingCards.length){
			alert('Cannot move that many items into the cart.');
			return false;
		}
		
		//special event, need to capture these elements
		if($scope.displayMode === "eventVikingParade") {
			$scope.playerCompleteEvent(0,0);
		}
		
		//move cart items to cart
		move(actionCost, selectedCartItems, 'cart'+prevId, 'cart'+id)
		cart.cards.setCardSize("orig");
		//cart.cards.setCardSize("small");
		resetAllSelectedCards(player);
		return true;

	}  

	$scope.playerCartFish = function (id) {
		if(!$scope.isActive){return;}
		var player = $scope.activePlayer;
		var cart = player.carts[id];
		var actionCost = 1;
		
		if(player.actionsRemaining === 0)	{
			alert("You have no actions.");
			return false;
		}	
		
		if($scope.selectedCartItemsCount != 1) {
			alert("You must select one card when fishing for a new one!");
			return false;
		}
		
		//if cart cards are selected, move between carts else its player items to cart
		if($scope.selectedCartItemsCount > 0) {
			
			var card = getSelectedCard(cart.cards);
			
			var r =  confirm("Discard the " + card.name + "? Fish for a new card?");
			if(r===true) {
				fish(actionCost, card.number, 'cart' + cart.id);
			}
			else {
				return false;
			}

			resetCartCardsSelected(player,-1);
			play($scope.sounds[8].name);

			return true;
		}
	}

	$scope.playerFish = function (id) {
		if(!$scope.isActive){return;}
		var player = $scope.activePlayer;
		var selectedCardCount = getSelectedCardcount(player.cards, true);
		var actionCost = 1;

		if(player.actionsRemaining === 0)	{
			alert("You have no actions.")
			return false;
		}	
		
		if(selectedCardCount != 1) {
			alert("You must select one card when fishing for a new one!")
			return false;
		}

		//returns card selected
		var card = getSelectedCard(player.cards);

		var r =  confirm("Discard the " + card.name + "? Fish for a new card?");
		if(r===true) {
			fish(actionCost, card.number, 'hand');
		}
		else {
			return false;
		}

		resetAllSelectedCards(player);
		play($scope.sounds[8].name);

		return true;
	}

	$scope.playerDiscardFromCart = function (id) {
		if(!$scope.isActive){return;}
		var player = $scope.activePlayer;
		var cart = player.carts[id];
		var selectedCards = getSelectedCards(cart.cards, true);
		var actionCost = 1;
		
		if(player.actionsRemaining === 0)	{
			alert("You have no actions.");
			return false;
		}	

		if(getSelectedCardcount(cart.cards, true) === 0) {
			alert('Select some cart items to discard.');
			return false;
		}
		
		//if cart cards are selected, move between carts else its player items to cart
		if($scope.selectedCartItemsCount > 0) {

			var r =  confirm("Are you sure you want discard?");
			if(r===true) {
				discard(actionCost, selectedCards, 'cart'+id)
			}
			else {
				return false;
			}

			resetCartCardsSelected(player,-1);
			play($scope.sounds[1].name);

			return true;
		}
	}

	$scope.playerDiscard = function () {
		if(!$scope.isActive){return;}
		var player = $scope.activePlayer;
		var selectedCardCount = getSelectedCardcount(player.cards, true);
		var selectedCards = getSelectedCards(player.cards, true);
		var actionCost = 1;
		
		//if you have actions, discard selected cards, if not but have too many cards, discard anyway	
		var  cardCount = 0;

		if(player.actionsRemaining === 0)	{
			alert("You have no actions.");
			return;
		}	
		
		if(selectedCardCount === 0) {
			alert('Select some items to discard.');
			return;
		}
		
		var r =  confirm("Are you sure you want discard?");
		if(r===true) {
			discard(actionCost, selectedCards, 'hand');
		}
		else {
			return;
		}

		resetAllSelectedCards(player);
		play($scope.sounds[1].name);

	}
		
	$scope.playerBuyCart	= function(cartId) {
		if(!$scope.isActive){return;}
		var game = $scope.game;
		var player = $scope.activePlayer;
		var total = player.cardSumSelected;
		var selectedCards = getSelectedCards(player.cards, true);
		var cart = player.carts[cartId];
		var actionCost = 1;
		if(player.actionsRemaining === 0)	{
			alert("You have no actions.");
			return;
		}	
			
		if(cart.goldCost===0) {
			if(total < cart.itemCost) {
				alert(cart.name + " must be repurchased with Items totating 5+ points.  Select additional items to trade for cart.");
				return;
			}
		}
		
		if(total < cart.itemCost) {
			if(player.gold < cart.goldCost) {
			alert("Select some items or get some gold!");
			return;
			}	
		}
		
		if(total >= cart.itemCost) {
			var r = confirm("Confirm purchase with items!");
				if (r === true) {
					buyCart(actionCost, 'cart'+cartId, 0, selectedCards);
				}
				else {
					return;
				}

		}
		else
		{
			if(player.gold >= player.carts[cartId].goldCost) {
			var r = confirm("Confirm purchase with gold!");
				if (r == true) {
					buyCart(actionCost, 'cart'+cartId, 1, "");
				}
				else {
					return;
				}

			}
		}			

		resetAllSelectedCards(player);
		playCartSound(cartId, $scope);
	}
		
	$scope.playerBuyAction = function() {
		if(!$scope.isActive){return;}
		var player = $scope.activePlayer;
		if(player.gold >= 2) {
			var r =  confirm("This will cost you 2 gold!  Confirm?");
			if(r===true) {
				buyAction();
			}
			else {
				return;
			}
		}
		else {
			alert("Need more gold!");
			return;
		}
		
			play($scope.sounds[12].name);
	}

	$scope.playerPass = function() {
		if(!$scope.isActive){return;}
			//make sure you discard down to max cards or you can't pass
			var game = $scope.game;
			var player = $scope.activePlayer;
			var discardSelectedCards = getSelectedCards(player.cards, true);
			var selectedCardCount = getSelectedCardcount(player.cards,true);
			var r = false;

			if(player.cards.playingCards.length - selectedCardCount > player.maxHand) {	
				alert("Too many cards, select cards to discard and pass.");
				return;
			}
			
			if(player.actionsRemaining > 0)	{
				var r = confirm("You are trying to pass with remaining actions - Continue?");
				if (r === true) {
					if(player.cards.playingCards.length - selectedCardCount > player.maxHand) {	
						alert("You have no actions remaining.  Only select card(s) to discard to get back to max hand size of " + player.maxHand + ".");
						resetAllSelectedCards(player);
						return;
					}
				}
				else {
					return;
				}
			}
			else if(player.actionsRemaining === 0 && (player.cards.playingCards.length > player.maxHand))	{
				if(player.cards.playingCards.length - selectedCardCount < player.maxHand) {	
					alert("You have no actions remaining.  Only select card(s) to discard to get back to max hand size of " + player.maxHand + ".");
					resetAllSelectedCards(player);
					return;
				}
			}

				
			if((player.cards.playingCards.length <= player.maxHand) && selectedCardCount > 0) {
				discardSelectedCards = "";
			}
		
		pass(discardSelectedCards);

		$scope.selectedMarketTradeCount = 0;
		$scope.sumMarketValueSelected = 0;
		resetAllSelectedCards(player);
		
		//wipe out any potential market trades in progress
		//game.marketDeckInTrade = new cardSet();
		play($scope.sounds[11].name);

	}

	$scope.playerMarketTrade = function() {
		if(!$scope.isActive){return;}
		//check if one to one or many to many
		var game = $scope.game;
		var text = "";
		var player = $scope.activePlayer;
		var selectedItemCards = getSelectedCards(player.cards, true);
		var selectedMarketCards = getCountCards(game.marketDeckInTrade);
		var selectedCardCount = getSelectedCardcount(player.cards, true);
		var actionCost = 1;
		$scope.selectedItemsCount = selectedCardCount;
		
		if(player.actionsRemaining === 0)	{
			alert("You have no actions.");
			return;
		}	
		
		if(selectedCardCount === 0){
			alert('Select items to trade.');
			return;
		}

		if($scope.selectedMarketTradeCount === 0){
			alert('Select market items to trade.');
			return;
		}

		if($scope.selectedItemsCount > 1 && $scope.selectedMarketTradeCount > 1){
			alert('Cannot do many to many trade.  De-select either your items or market items.');
			return;
		}
		
		if($scope.selectedItemsCount === 1 && $scope.selectedMarketTradeCount === 1){
			alert('Cannot do single item trade.  Select more items.');
			return;
		}
		if($scope.sumMarketValueSelected != $scope.activePlayer.cardSumSelected) {
			alert('Sum of items selected must be equal.  Your Items selected: ' + $scope.activePlayer.cardSumSelected + ' Market Items selected: ' + $scope.sumMarketValueSelected);
			return;
		}		

		//move player items to market
			text = "Market trade with " + parseFromArrayIntoNames(parseToArray(selectedItemCards)) + ' for ' + parseFromArrayIntoNames(parseToArray(selectedMarketCards));
		
			var r =  confirm(text + "?");
			if(r===true) {
				marketTrade(actionCost, selectedItemCards, selectedMarketCards);
			}
			else {
				return;
			}

		//move market items to player
		$scope.selectedMarketTradeCount = 0;
		$scope.sumMarketValueSelected = 0;
		

		resetPlayerCardsSelected(player);
		setMarketCounts(game);
		play($scope.sounds[12].name);
	}
	
	prepareEventForPlayer = function(game, questCardinplay) {
		game.activeEvent = questCardinplay.name;
		var player = $scope.activePlayer;
		var cart = player.carts[0];
		var playerCardCount = player.cards.playingCards.length;
		$scope.wheelbarrowCardSum = getSelectedCardSum(cart.cards, false);
		var playerCardsSum = getSelectedCardSum(player.cards, false);
		$scope.playerCardsSumFound = playerCardsSum;
		var cart0CardCount = player.carts[0].cards.playingCards.length;
		var cart1CardCount = player.carts[1].cards.playingCards.length;
		var cart2CardCount = player.carts[2].cards.playingCards.length;
		var cart3CardCount = player.carts[3].cards.playingCards.length;
		var totalCards = playerCardCount+cart0CardCount +cart1CardCount +cart2CardCount +cart3CardCount ;
		var totalCartCards = cart0CardCount +cart1CardCount +cart2CardCount +cart3CardCount ;
		$scope.totalCartCardsFound = totalCartCards;
		$scope.totalCardsFound = totalCards;
		setRandomText();
		
		if(player===null) {
			return;
		}
		
		if(questCardinplay.level===4) {
			questCardinplay.setCardSize("large");
		}

		
		switch (questCardinplay.name)
		{
				case 'eventThrownInTheDungeon':
					$scope.playerHas123InHand = checkIfPlayerHas123InHand(player.cards);
					break;
				default:
					resetDisplayModeName('game');
		}
		
		$scope.displayMode = game.activeEvent;
		resetDisplayModeName(game.activeEvent);
		//deselect all cards
		resetAllSelectedCards($scope.activePlayer);
		$scope.activeEventId = questCardinplay.nameId;
		
	}

	//game, eventPending, eventCompleted
	resetDisplayModeName = function(mode) {
		switch(mode) {
			case "game":
				$scope.displayModeName = " - Your Turn";
				break;
			case "gameSpectator":
				$scope.displayModeName = " - Game Spectating";
				break;
			case "eventCompleted":				
				$scope.displayModeName = " - Event Results";
				break;
			case "gameover":
				$scope.displayModeName = "Game Over";
				break;
			default:
				$scope.displayModeName = mode;
				if($scope.isActive) {
					$scope.displayModeName = " - Your Turn";
				}
				else {
					$scope.displayModeName = " - Game Spectating";
				}
				
		}
	}
		
	checkIfPlayerHas123InHand = function(playerItemCards) {
		for (var i = 0; i < playerItemCards.playingCards.length; ++i)  {
			var card = playerItemCards.playingCards[i];
			if(card.number < 4) {
				return true;
			}
		}
		return false;
	}

	$scope.moveItemsBetweenCartsEvent = function(id) {
		var actionCost = 0;
		var success = $scope.moveItemsToCart(id, actionCost );
	}

	$scope.userClickedCartImageEvent = function(id) {
		var player = $scope.activePlayer;
		
		//deselect all items in cart if cart selected
		for (var j = 0; j < player.carts[id].cards.playingCards.length; ++j)  {
			$scope.userClickedCartItemEvent(id, j);
		}
	}	
	
	$scope.userClickedCartItemEvent = function (cartId, cardIndex) {
		setCartActiveStatus(cartId);
		var player = $scope.activePlayer;
		var card = player.carts[cartId].cards.playingCards[cardIndex];
		var cart = player.carts[cartId];
		card.selected = !card.selected;
		if(card.selected) {
			$scope.selectedCartItemsCount++;
		}
		else {
			$scope.selectedCartItemsCount--;
		}
		card.borderColor = cardColor(card);
		cartCardChecked(card);
		cart.cardSumSelected = getSelectedCardSum(cart.cards, true);
		var playerCardCountSel = getSelectedCardcount(player.cards, true);
		var cart0CardCountSel = getSelectedCardcount(player.carts[0].cards, true);
		var cart1CardCountSel = getSelectedCardcount(player.carts[1].cards, true);
		var cart2CardCountSel = getSelectedCardcount(player.carts[2].cards, true);
		var cart3CardCountSel = getSelectedCardcount(player.carts[3].cards, true);
		var totalCardsSelected = playerCardCountSel+cart0CardCountSel +cart1CardCountSel +cart2CardCountSel +cart3CardCountSel ;
		//$scope.playerPaidWithItems=totalCardsSelected;	
		if($scope.displayMode === "eventVikingParade") {
			resetCartCardsSelected(player, cartId);
		}
		play($scope.sounds[9].name);
	}
	
	$scope.userClickedItemImageEvent = function (cardIndex) {
		var player = $scope.activePlayer;
		var card = player.cards.playingCards[cardIndex];
		card.selected = !card.selected;
		card.borderColor = cardColor(card);	
		playerCardChecked(card);
		player.cardSumSelected = getSelectedCardSum(player.cards, true);
		$scope.selectedItemsCount = getSelectedCardcount(player.cards, true);
		var playerCardCountSel = getSelectedCardcount(player.cards, true);
		var cart0CardCountSel = getSelectedCardcount(player.carts[0].cards, true);
		var cart1CardCountSel = getSelectedCardcount(player.carts[1].cards, true);
		var cart2CardCountSel = getSelectedCardcount(player.carts[2].cards, true);
		var cart3CardCountSel = getSelectedCardcount(player.carts[3].cards, true);
		var totalCardsSelected = playerCardCountSel+cart0CardCountSel +cart1CardCountSel +cart2CardCountSel +cart3CardCountSel ;
		//$scope.playerPaidWithItems=totalCardsSelected;	

		play($scope.sounds[9].name);
	}
	
	//this logs one time when user clicks complete event to the log the player.lastEvent
	$scope.playerCompletedEvent = function() {
		var eventCompletedText = getEventCompletedText($scope.game, $scope.activePlayer, $scope.activePlayer.lastEvent);
		$scope.game.playersLog.push(new PlayersLog($scope.game.playersLog.length, $scope.activePlayer.name, eventCompletedText));
		$scope.clickedCompleteEvent = true;
		completeEventDealQuest($scope.activeEventId);

	}

	
	$scope.playerCompleteEvent = function(index, id) {
		var game = $scope.game;
		var player = $scope.activePlayer;
		var playerCardCount = player.cards.playingCards.length;
		var playerCardsSum = $scope.playerCardsSumFound;
		var playerCardsSumSelected = getSelectedCardSum(player.cards, true);
		var questCardinplay = game.questsInPlay.playingCards[index];
		var eventText = $scope.game.activeEvent;
		var selectedItemCards = getSelectedCards(player.cards, true);
		var playerItemCards = getSelectedCards(player.cards, false);
		$scope.playerHas123InHand = checkIfPlayerHas123InHand(player.cards);
		var cart0CardCount = player.carts[0].cards.playingCards.length;
		var cart1CardCount = player.carts[1].cards.playingCards.length;
		var cart2CardCount = player.carts[2].cards.playingCards.length;
		var cart3CardCount = player.carts[3].cards.playingCards.length;
		var totalCards = playerCardCount+cart0CardCount +cart1CardCount +cart2CardCount +cart3CardCount ;
		var totalCartCards = cart0CardCount +cart1CardCount +cart2CardCount +cart3CardCount ;
		var playerCardCountSel = getSelectedCardcount(player.cards, true);
		var cart0CardCountSel = getSelectedCardcount(player.carts[0].cards, true);
		var cart1CardCountSel = getSelectedCardcount(player.carts[1].cards, true);
		var cart2CardCountSel = getSelectedCardcount(player.carts[2].cards, true);
		var cart3CardCountSel = getSelectedCardcount(player.carts[3].cards, true);
		var totalCardsSelected = playerCardCountSel+cart0CardCountSel +cart1CardCountSel +cart2CardCountSel +cart3CardCountSel ;
		var totalCartCardsSelected = cart0CardCountSel +cart1CardCountSel +cart2CardCountSel +cart3CardCountSel ;
		var gold = 0;
		var eventId = "";
		var what1 = "";
		var where1="";
		var what2 = "";
		var where2="";
		var card="";
		var whatWhereArray = [];
		var found = false;
		var dest1 = "";
		var items = 0;
	//events.push(new Event(6,"BarbarianAttack"));
	//events.push(new Event(7,"BrokenItems"));
	//events.push(new Event(8,"CastleTaxation"));
	//events.push(new Event(9,"GoblinRaid"));
	//events.push(new Event(10,"KingsFeast"));
	//events.push(new Event(11,"MarketShortage"));
	//events.push(new Event(12,"MarketSurplus"));
	//events.push(new Event(13,"OrcsAttack"));
	//events.push(new Event(14,"SandStorm"));
	//events.push(new Event(15,"ThrownInTheDungeon"));
	//events.push(new Event(16,"Treasure"));
	//events.push(new Event(17,"VikingParade"));
	//events.push(new Event(18,"HailStorm"));
	//events.push(new Event(19,"HiddenRoom"));

			switch (eventText) {
				case 'eventBarbarianAttack':
					eventId = 6;
					//market has been destroyed
					break;
				case 'eventBrokenItems':
					eventId = 7;
					//discard with no actions from hand or cart
					if(totalCardsSelected > 2) {
						alert("You may only select none, one or two items to replace.");
						return;
					}
					if(totalCardsSelected ===  0) {
						break;
					}
					if(playerCardCountSel >= 1) {
						whatWhereArray.push(getSelectedCards(player.cards, true));
						whatWhereArray.push('hand');
					}
					for (var i = 0; i < player.carts.length; ++i)  {
						var cart = player.carts[i];
						if(cart.active) {
							var cartCards = getSelectedCardcount(player.carts[i].cards, true);
							if(cartCards > 0) {
								whatWhereArray.push(getSelectedCards(player.carts[i].cards, true));
								whatWhereArray.push('cart' + i);
							}
						}
					}	

					what1=whatWhereArray.shift();
					where1=whatWhereArray.shift();
					what2=whatWhereArray.shift();
					where2=whatWhereArray.shift();
					break;

				case 'eventCastleTaxation':
					 eventId = 8;
					//discard with no actions from hand only
					if(id==="none") {
						if($scope.activePlayer.gold === 0 && totalCards === 0) {
							gold = 0;
							break;
						}
					}
					if(id==="items") {
						gold = 0;
						if(totalCards >= 2 && totalCardsSelected < 2) {
							alert("You must select 2 items.");
							return;
						}
						if(totalCards === 1 && totalCardsSelected===0) {
							alert("You must select your only card item.");
							return;
						}
						if(totalCards >= 1 && (totalCardsSelected===1 || totalCardsSelected===2) ){
							gold = 0;
							if(playerCardCountSel >= 1) {
								whatWhereArray.push(getSelectedCards(player.cards, true));
								whatWhereArray.push('hand');
							}
							for (var i = 0; i < player.carts.length; ++i)  {
								var cart = player.carts[i];
								if(cart.active) {
									var cartCards = getSelectedCardcount(player.carts[i].cards, true);
									if(cartCards > 0) {
										whatWhereArray.push(getSelectedCards(player.carts[i].cards, true));
										whatWhereArray.push('cart' + i);
									}
								}
							}	

							what1=whatWhereArray.shift();
							where1=whatWhereArray.shift();
							what2=whatWhereArray.shift();
							where2=whatWhereArray.shift();
							break;

						}
					}
					if(id==="gold") {
						if(player.gold > 0) {
							gold = 1;	
							break;							
						}
						else{
							alert("You do not have enough gold, you must lose items.");
							return;
						}
					}
						
			
					break;
			

				case 'eventGoblinRaid':	
					eventId = 9;
					//nothing to give up
					if(totalCartCards===0) {
						break;
					}

					if(totalCartCards > 0 && totalCartCardsSelected != 1) {
						alert("Select one cart item to lose.");
						return;
					}
					//can only give up one
					if(totalCartCardsSelected > 1) {
						alert("You may only select one cart item to lose.");
						return;
					}
					
					if(totalCartCardsSelected===1) {
						for (var i = 0; i < player.carts.length; ++i)  {
							if(found) {
								break;
							}
							var cart = player.carts[i];
							if(cart.active) {
								var cartCards = getSelectedCardcount(player.carts[i].cards, true);
								if(cartCards > 0) {
									whatWhereArray.push(getSelectedCards(player.carts[i].cards, true));
									whatWhereArray.push('cart' + i);
									found = true;
									break;
								}
							}
						}
						
		
						what1=whatWhereArray.shift();
						where1=whatWhereArray.shift();
					}					
					break;
				case 'eventKingsFeast':
					eventId = 10;
					break;
				case 'eventMarketShortage':
					eventId = 11;
					break;
				case 'eventMarketSurplus':
					eventId = 12;
					break;
				case 'eventOrcsAttack':
					eventId = 13;
					if(id==='Y') {
						if(playerCardsSumSelected < 5){
								alert("You do not have enough items selected.");
								return;
						}
						if(playerCardsSumSelected >= 5) {
							what1=selectedItemCards;
							where1='hand';
						}
					}
					
					break;
					
				case 'eventSandStorm':
					eventId = 14;
					break;
				case 'eventHailStorm':
					eventId = 18;
					break;
				case 'eventHiddenRoom':
					eventId = 19;
					if(id==='gold') {
						items = 0;
						gold = 1;
					}
					if(id==='items') {
						gold = 0;
						items = 2;
					}
					
					break;
				case 'eventThrownInTheDungeon':
					eventId = 15;
					
					if(!$scope.playerHas123InHand) {
						break
					}
						
					//player does have 1,2 or 3
					if(playerCardCountSel != 1 || playerCardsSumSelected > 3) {
						alert("Select one item - " + getCardName(1) + ", " + getCardName(2) + " or " + getCardName(3) + " to lose.");
						return;
					}
					
					//final recheck
					if($scope.selectedItemsCount === 1 && $scope.playerHas123InHand) {			
						what1 = selectedItemCards;
						where1 = 'hand';
						break;
					}
			
					break;
				case 'eventTreasure':
					//give active player a gold
					eventId = 16;
					break;
				case 'eventVikingParade':
					eventId = 17;
					if(id != "X") {
						where1 = "cart" +$scope.prevActiveCartId;
						dest1 = "cart" + $scope.activeCartId;
						what1 = $scope.selectedCartItems;
					}
					//reset it if there are more than one viking parade in deck
					//$scope.oneFreeMove = true;
					break;
				default:
					resetDisplayModeName('game');
			}
			
			if(what1===undefined) {what1="";}
			if(where1===undefined) {where1="";}
			if(what2===undefined) {what2="";}
			if(where2===undefined) {where2="";}
			if(dest1===undefined) {dest1="";}
			if(gold===undefined) {gold=0;}
			if(items===undefined) {items=0;}
			completeEvent(eventId, gold, items, what1, where1, what2, where2, dest1);
			resetPlayerCardsSelected(player);
		
		}

	resetPlayerCardsSelected =  function(player) {
		for (var i = 0; i < player.cards.playingCards.length; ++i)  {
			var card = player.cards.playingCards[i];
			if(card===undefined) {
				break;
			}
			card.selected = false;
			card.borderColor = cardColor(card);
			card.setCardSize("orig");
		}
		$scope.selectedItemsCount=0;
		player.cardSumSelected = 0;
	}

	resetCartCardsSelected =  function(player, id) {
		game = $scope.game;
		$scope.selectedCartItemsCount=0;

		setCartActiveStatus(id);
		//if id=cartid, reset the counts selected on that cart only
		for (var i = 0; i < player.carts.length; ++i)  {
			cart = player.carts[i];
			cart.selected = false;
			cart.cardSumSelected = 0;
			cart.borderColor = cartColor(cart);
			//dont reset the current cart cards
			if(cart.id === id) {
					for (var j = 0; j < player.carts[i].cards.playingCards.length; ++j)  {
						//$scope.userClickedCartItem(id, j);
						card = player.carts[id].cards.playingCards[j];
						if(card.selected) {
							cart.cardSumSelected+= card.number;
							card.borderColor = cardColor(card);
							$scope.selectedCartItemsCount++;
							card.setCardSize("checked");
						}
						else {
							card.borderColor = cardColor(card);
							card.setCardSize("orig");
							//card.setCardSize("small");
						}
					}
				}  
			else {
				for (var k = 0; k < player.carts[i].cards.playingCards.length; ++k)  {
					card = player.carts[i].cards.playingCards[k];
					card.selected = false;
					card.borderColor = cardColor(card);
					card.setCardSize("orig");
					//card.setCardSize("small");
				}
			}
		}
	}

	resetAllSelectedCards = function(player) {
		resetPlayerCardsSelected(player);
		resetCartCardsSelected(player,-1);
	}

	//sort player cards
	sortPlayerCards = function() {
		$scope.activePlayer.cards.playingCards.sort(function (a,b) {return a.number-b.number});
	}
	
	var processGameStateCallback = function (data) {
		getObjectResults(data);
	};

	var processGameStateErrorCallback = function (returnVal) {
		$scope.loadingData=true;
		alert("Error Occurred: " + returnVal);
	};

	var processListGamesCallback = function (data) {
		getListGamesResults(data);
	};

	var processListGamesErrorCallback = function (returnVal) {
		alert("Error Occurred: " + returnVal);
	};

	
	getEventCompletedText = function(game, player, event){
		var eventCompletedText = null;
		var parr1 = [];
		var arr1 = [];
		var arr2 = [];
		var whatWhereArray = [];
		var text1 = "";
		var text2 = "";
		var prep1 = "";
		var move1 = "";
		var len = 0;
		event.fromWhere1 = convertToName(event.fromWhere1);
		event.fromWhere2 = convertToName(event.fromWhere2);
		event.moveDest = convertToName(event.moveDest);
		event.prepFromWhere1 = convertToName(event.prepFromWhere1);
		event.prepMoveDest = convertToName(event.prepMoveDest);
		var cardGold = game.itemHolders.playingCards[11];
		var card = null;


//	Event(6,"BarbarianAttack"
//	Event(7,"BrokenItems"
//	Event(8,"CastleTaxation"
//	Event(9,"GoblinRaid"
//	Event(10,"KingsFeast"
//	Event(11,"MarketShortage"
//	Event(12,"MarketSurplus"
//	Event(13,"OrcsAttack"
//	Event(14,"SandStorm"
//	Event(15,"ThrownInTheDungeon"
//	Event(16,"Treasure"
//	Event(17,"VikingParade"
//	Event(18,"HailStorm"
//	Event(19,"HiddenRoom"

				if (event.gold === 1) {
						whatWhereArray.push('1 gold');
				}

				//from prep event
				if (event.prepWhatItems1.length > 0) {
					parr1 = parseToArray(event.prepWhatItems1);
					for (var c = 0; c < parr1.length; ++c) {
						prep1 += getCardName(parr1[c]) + " from their " + $scope.adj[$scope.x] + " " + event.prepFromWhere1;
						card = game.itemHolders.playingCards[parr1[c]-1];
						player.lastEvent.images.addCardc(card);						
						if(c+1 < event.prepWhatItems1.length) {
							prep1 += " and ";
						}
					}
					whatWhereArray.push(prep1);
				}
				
				
				if (event.whatItems1.length > 0) {
					arr1 = parseToArray(event.whatItems1);
					for (var c = 0; c < arr1.length; ++c) {
						text1 += getCardName(arr1[c]) + " from their " + $scope.adj[$scope.y] + " " + event.fromWhere1;
						card = game.itemHolders.playingCards[arr1[c]-1];
						player.lastEvent.images.addCardc(card);						
						if(c+1 < event.whatItems1.length) {
							text1 += " and ";
						}
					}
					whatWhereArray.push(text1);
				}
				if (event.whatItems2.length > 0) {
					arr2 = parseToArray(event.whatItems2);
					for (var c = 0; c < arr2.length; ++c) {
						text2 += getCardName(arr2[c]) + " from their " + $scope.adj[$scope.z] + " " +  event.fromWhere2;
						card = game.itemHolders.playingCards[arr2[c]-1];
						player.lastEvent.images.addCardc(card);						
						if(c+1 < event.whatItems2.length) {
							text2 += " and ";
						}
					}
					whatWhereArray.push(text2);
				}			

			switch (event.id) {
				case 6:
				eventCompletedText = player.name + " survived.";
					break;
				case 7:
					if(whatWhereArray.length === 0) {
						eventCompletedText = player.name + " had no broken items to replace!";
					}
					else {
						eventCompletedText = player.name + " replaced ";
						for (var t = 0; t < whatWhereArray.length; ++t) {
							eventCompletedText += whatWhereArray[t];
							if(t+1 < whatWhereArray.length) {
								eventCompletedText += " and ";
							}
						}
						eventCompletedText += "!";
					}
					break;
				case 8:
					if(whatWhereArray.length === 0) {
						eventCompletedText = player.name + " had nothing left to pay for taxes!";
					}
					else {
						eventCompletedText = player.name + " paid taxes with "; 
						for (var t = 0; t < whatWhereArray.length; ++t) {
							eventCompletedText += whatWhereArray[t];
							if(t+1 < whatWhereArray.length) {
								eventCompletedText += " and ";
							}
						}
						eventCompletedText += "!";
					}
					break;
				case 9:
					if(whatWhereArray.length === 0) {
						eventCompletedText = player.name + " had nothing to steal!";
					}
					else {
						eventCompletedText = player.name + " lost "; 
						for (var t = 0; t < whatWhereArray.length; ++t) {
							eventCompletedText += whatWhereArray[t]
							if(t+1 < whatWhereArray.length) {
								eventCompletedText += " and ";
							}
						}
						eventCompletedText += "!"
					}
					break;
				case 10:
					eventCompletedText = player.name + " received 1 new item during the Kings Feast!";
					card = game.itemHolders.playingCards[10];
					player.lastEvent.images.addCardc(card);
					break;
				case 11:
					eventCompletedText = "Market has lost all " +  getCardName(event.prepWhatItems1) + "'s." ;
					break;
				case 12:
					//market surplus
					player.lastEvent.images = new cardSet();
					if (event.prepWhatItems1.length > 0) { 
						arr1 = parseToArray(event.prepWhatItems1);
						for (var c = 0; c < arr1.length; ++c) {
							text1 +=  getCardName(arr1[c]);
							card = game.itemHolders.playingCards[arr1[c]-1];
							player.lastEvent.images.addCardc(card);
							if(c+1 < event.prepWhatItems1.length) {
								text1 += " , ";
							}
						}
					}
					eventCompletedText = "Market has new stuff!  " + " Stuff:  " + text1;
					break;
				case 13:
					if(player.carts[0].cards.playingCards.length > 0) {
						eventCompletedText = player.name + " defeated the Orcs!";
					}
					else {
						eventCompletedText = "Orcs have destroyed " + player.name +  "'s " + $scope.adj[$scope.w] + " wheelbarrow.  ";
						if(event.prepWhatItems1.length > 0) {
							eventCompletedText += player.name + " received " + parseFromArrayIntoNames(parr1) + " from their destroyed cart!  ";
						}
						if(event.whatItems1.length > 0) {
							eventCompletedText += player.name + " bought back the cart by trading item(s) " + parseFromArrayIntoNames(arr1) + ".";
						}
						if(event.whatItems1.length === 0) {
							eventCompletedText += player.name + " did not buy a new wheelbarrow.";
						}
					}
					break;
				case 14:
					eventCompletedText = player.name + " passed their cards to another player." ;
					break;
				case 15:
					if (event.whatItems1.length > 0) {
						eventCompletedText = player.name + " was thrown in the Dungeon.  " + player.name + " lost their " +  getCardName(event.whatItems1) + ".";
					}
					else {
						eventCompletedText = player.name + " fended off the soldiers.";
					}

					break;
				case 16:
					eventCompletedText = player.name + " found 1 gold!";
					card = game.itemHolders.playingCards[11];
					player.lastEvent.images.addCardc(card);
					break;
				case 17:

					if (event.whatItems1.length > 0) {
						arr1 = parseToArray(event.whatItems1.length);
						for (var c = 0; c < arr1.length; ++c) {
							move1 += " " + getCardName(arr1[c]) + " from their " + $scope.adj[$scope.y] + " " + event.fromWhere1;
							if(c+1 < event.whatItems.length) {
								move1 += " and ";
							}
						}
						whatWhereArray.push(move1);
					}
					if (whatWhereArray.length > 0) {
						eventCompletedText = player.name + " moved ";  
						for (var t = 0; t < whatWhereArray.length; ++t) {
							eventCompletedText += whatWhereArray[t];
							if(t+1 < whatWhereArray.length) {
								eventCompletedText += " and ";
							}
						}
						eventCompletedText += " to their " + $scope.adj[$scope.w] + " " + event.moveDest + ".";
					}
					break;
				case 18:
					eventCompletedText = player.name + " passed their cards to another player.";

					break;
				case 19:
					eventCompletedText = player.name + " found "; 
					if(event.itemsCount > 0) {
						eventCompletedText += event.itemsCount + " items ";
						card = game.itemHolders.playingCards[10];
						player.lastEvent.images.addCardc(card);
						card = game.itemHolders.playingCards[10];
						player.lastEvent.images.addCardc(card);
						} 
					else {
						eventCompletedText += event.gold + " gold ";
						card = game.itemHolders.playingCards[11];
						player.lastEvent.images.addCardc(card);

					}
					eventCompletedText += "in the hidden room!";

					break;
				default:
			}

		return eventCompletedText;
	}

	function getListGamesResults(data) {
		
			$scope.gamesAvailable = [];
			$scope.gamesAvailable = data.gamesAvailable;

			//var pattern = "game";
			
			//for (var i = 0; i < data.gamesAvailable.length; ++i) {   
			//	var gameKey = str.substr(index + 2, str.length - index + 2);
			//	var numPlayers = str.substr(index, 1);
			//	var playerId = parseToInt(str.substr(index, 1)) - 1;
			//	$scope.gamesAvailable.push(new GameAvailable(gameKey, numPlayers, playerId));
			//}


	}
	
	function getObjectResults(data) {
		var text = "";
		var game = $scope.game;
		$scope.myId = data.playerId;
		$scope.gameKey = data.gameKey;
		$scope.aQuestIsReadyCart = false;
		$scope.aQuestIsReadyHand = false; 
		var events = prepEvents();
				
		// players = game.players;
		//this controls the buttons to return if you are not active
		//already doing so much in angular js buttons, did not want to add this as well
		$scope.isActive = data.isActive;
		var playerEventStatus = data.curEventStatus;
		$scope.numberOfPlayers = data.numPlayers;
	
		$scope.otherPlayers = [];		
		$scope.game.players = [];
		
		$scope.itemsCountRemaining = data.itemsCountRemaining;
		$scope.questsCountRemaining = data.questsCountRemaining;
		$scope.discardsCount = data.discardsCount;
		
		game.questsInPlay = new cardSet();
		game.marketDeck = new cardSet();
		game.marketDeckInTrade = new cardSet();
		game.marketDeckInTrade.createBlankMarket($scope.blankMarketImageBase);
		//setTradeCounts(game.marketDeckInTrade);
		
		
		data.market.sort(function(a,b){return a - b})
        for (var i = 0; i < data.market.length; ++i) {   
			dealNumberToMarket(game, data.market[i]);	
		}
		setMarketCounts(game);

        for (var i = 0; i < data.questsInPlay.length; ++i) {   
			dealQuestCard(game, data.questsInPlay[i].items, data.questsInPlay[i].level, data.questsInPlay[i].type);
			var card = game.questsInPlay.playingCards[i];
			card.borderColor = cardColor(card);
		}
		game.questsInPlay.setCardSize("orig");

		if (data.lastDiscarded != null) {
			updateDiscardPile(game, data.lastDiscarded);	
		}
		
		//current player
		var p=0;
		game.players.push(new Player(game, $scope.myId, data.name));
		game.players[p].active = data.isActive;
		$scope.activePlayer = game.players[p];
		var player = $scope.activePlayer;
		player.actionsRemaining = data.actionsRemaining;
		player.gold = data.gold;
		player.turns = data.turns;
		player.vp = data.points;
		player.bonus = data.bonus;
		player.maxHand = data.maxHand;

		
		for (var i = 0; i < data.hand.length; ++i) {   
			dealNumberToPlayer(game, player, data.hand[i]);	
		}
	
		//initialize to zero before going through carts
		player.nextCartId=0;
		//populate carts
		for (var c = 0; c < data.carts.length; ++c) {   
			player.carts[c].cards =  new cardSet();
			updatePlayerCarts(game, player, player.carts[c], data.carts[c]);	
		}
		
		for (var q = 0; q < data.questsCompleted.length; ++q) {   
			dealQuestsCompleted(game, player.questsCompleted, data.questsCompleted[q].items);
		}

		player.lastEvent = null;
		//for events only
		if (data.curEvent.length > 0 && data.gameMode != "game") {
			eventFound = data.curEvent.length - 1;
			var eventCopy = events[data.curEvent[eventFound].eventId];
			player.lastEvent = eventCopy;
			player.lastEvent.whatItems1 = data.curEvent[eventFound].whatItems1;
			player.lastEvent.whatItems2 = data.curEvent[eventFound].whatItems2;
			player.lastEvent.fromWhere1 = data.curEvent[eventFound].fromWhere1;
			player.lastEvent.fromWhere2 = data.curEvent[eventFound].fromWhere2;
			player.lastEvent.moveDest = data.curEvent[eventFound].moveDest;
			player.lastEvent.prepWhatItems1 = data.curEvent[eventFound].prepWhatItems1;
			player.lastEvent.prepFromWhere1 = data.curEvent[eventFound].prepFromWhere1;
			player.lastEvent.prepMoveDest = data.curEvent[eventFound].prepMoveDest;
			player.lastEvent.gold = data.curEvent[eventFound].gold;
			player.lastEvent.itemsCount = data.curEvent[eventFound].itemsCount;
			player.lastEvent.eventCompletedText = getEventCompletedText(game, player, player.lastEvent);
		}

		var len=0;
		var o=0;
		for (var z = 0; z < data.otherPlayers.length; ++z) {

			game.players.push(new Player(game, data.otherPlayers[z].playerId, data.otherPlayers[z].name));

			var len = game.players.length - 1;
			var otherPlayer = game.players[len];
			otherPlayer.cards = new cardSet();
			otherPlayer.questsCompleted =  new cardSet();
			otherPlayer.gold = data.otherPlayers[z].gold;
			otherPlayer.bonus = data.otherPlayers[z].bonus;
			otherPlayer.turns = data.otherPlayers[z].turns;
			otherPlayer.vp = data.otherPlayers[z].points;
			otherPlayer.maxHand = data.otherPlayers[z].maxHand;
			
			for (var i = 0; i < data.otherPlayers[z].hand.length; ++i) {   
				//dealNumberToPlayer(game, otherPlayer, data.otherPlayers[z].hand[i]);	
				dealNumberToPlayer(game, otherPlayer, -1);	
			}

			//populate carts
			for (var c = 0; c < data.carts.length; ++c) {   
				otherPlayer.carts[c].cards =  new cardSet();
				updatePlayerCarts(game, otherPlayer, otherPlayer.carts[c], data.otherPlayers[z].carts[c]);	
			}
			
			checkCartsForQuestsInProgress(game, otherPlayer);
			
			for (var q = 0; q < data.otherPlayers[z].questsCompleted.length; ++q) {   
				dealQuestsCompleted(game, otherPlayer.questsCompleted, data.otherPlayers[z].questsCompleted[q].items);
			}
			otherPlayer.questsCompleted.setCardSize("small");
			otherPlayer.lastEvent = null;
			var events = prepEvents();
			if (data.otherPlayers[z].curEvent.length > 0  && data.gameMode != "game") {
				eventFound = data.otherPlayers[z].curEvent.length - 1;
				var eventCopy = events[data.otherPlayers[z].curEvent[eventFound].eventId];
				otherPlayer.lastEvent = eventCopy;
				otherPlayer.lastEvent.whatItems1 = data.otherPlayers[z].curEvent[eventFound].whatItems1;
				otherPlayer.lastEvent.whatItems2 = data.otherPlayers[z].curEvent[eventFound].whatItems2;
				otherPlayer.lastEvent.fromWhere1 = data.otherPlayers[z].curEvent[eventFound].fromWhere1;
				otherPlayer.lastEvent.fromWhere2 = data.otherPlayers[z].curEvent[eventFound].fromWhere2;
				otherPlayer.lastEvent.moveDest = data.otherPlayers[z].curEvent[eventFound].moveDest;
				otherPlayer.lastEvent.prepWhatItems1 = data.otherPlayers[z].curEvent[eventFound].prepWhatItems1;
				otherPlayer.lastEvent.prepFromWhere1 = data.otherPlayers[z].curEvent[eventFound].prepFromWhere1;
				otherPlayer.lastEvent.prepMoveDest = data.otherPlayers[z].curEvent[eventFound].prepMoveDest;
				otherPlayer.lastEvent.gold = data.otherPlayers[z].curEvent[eventFound].gold;
				otherPlayer.lastEvent.itemsCount = data.otherPlayers[z].curEvent[eventFound].itemsCount;
				otherPlayer.lastEvent.eventCompletedText = getEventCompletedText(game, otherPlayer, otherPlayer.lastEvent);
			}
			$scope.otherPlayers[z] = otherPlayer;
		}
	

		
		var log = [];
		log = data.playerLog;
		log.reverse();
		for (var i = 0; i < log.length - $scope.logItemCount; ++i) {   
		//0 is always the active player
			logPlayerAction($scope.isActive, game.playersLog, getPlayerName(game, data.playerLog[i].playerId), data.playerLog[i].event, $scope);
		}

		$scope.logItemCount = data.playerLog.length;

		//data gameModes: game, eventPending, eventCompleted
		if(playerEventStatus === "eventInProgress" && data.gameMode === "eventPending") {
			prepareEventForPlayer(game, game.activeEventCard);
			$scope.clickedCompleteEvent = false;
			$scope.refresh = false;
		}
		else if(playerEventStatus === "eventCompleted" && data.gameMode === "eventPending") {
			$scope.displayMode = playerEventStatus;
			$scope.refresh = true;
		}
		else {		
			if(data.isActive) {
				$scope.displayMode = data.gameMode;
				$scope.refresh = false;
			} 
			else {
				$scope.displayMode = 'gameSpectator';
				$scope.refresh = true;
			}
		}	

		resetDisplayModeName($scope.displayMode);
		
		if(data.gameOver===true)	{
			gameEnd();
			return;
		}

		
		$scope.loadingData=false;
		var questReady = checkIfQuestIsReadyFromCart(game, player);
		if(questReady.index != undefined) {
			if(questReady.cartId >= 0 && $scope.autoSelectCart) {
				$scope.userClickedCartImage(questReady.cartId);
				if($scope.autoSelectQuest) {
					//make sure quest is not selected yet
					var questClicked = game.questsInPlay.playingCards[questReady.index];
					questClicked.selected = false;
					$scope.userClickedQuestImage(questReady.index);
					$scope.aQuestIsReadyCart = true;
                    //always return if a quest is ready.  no autopass no check from hand
					return;
				}
			}
		}
		 
		var questReady = checkIfQuestISReadyFromHand(game, player);
		if(questReady.items != undefined) {
			if(questReady.items.length >=3 && $scope.autoSelectHand) {
				if($scope.displayMode === 'game') {	
					selectHandCards(questReady.items);
					if($scope.autoSelectQuest) {
						//make sure quest is not selected yet
						var questClicked = game.questsInPlay.playingCards[questReady.index];
						questClicked.selected = false;
						$scope.userClickedQuestImage(questReady.index);
						$scope.aQuestIsReadyHand = true;
					}
				
				}
			}
		}
		
		if($scope.autoSelectHand) {
			//this only goes here if there isnt a perfect match from hand already
			if(questReady.items === undefined)  {
				var questItemsFromHandandMarket = checkIfQuestIsReadyFromCartAndHand(game, player);
				if(questItemsFromHandandMarket != undefined) {
					if(questItemsFromHandandMarket.s != undefined) {
						for (var l = 0; l < questItemsFromHandandMarket.s.length; ++l) {
							for (var k = 0; k < questItemsFromHandandMarket.handArr.length; ++k) {
								if(questItemsFromHandandMarket.handArr[k] === questItemsFromHandandMarket.s[l]) {
								   $scope.userClickedItemImage(k);
								}
							}	
						}
					}
					if($scope.autoSelectMarket && questItemsFromHandandMarket.s === undefined) {
						var handItemsFound = findSum(getSelectedCardArrayForQuest(player.cards),questItemsFromHandandMarket.marketSum)
						//must be one to many
						if(handItemsFound != undefined) {
							if(handItemsFound.length > 1) {
								//click the market item first
								$scope.userClickedMarketImage(questItemsFromHandandMarket.marketCardIndex);
								for (var j = 0; j < handItemsFound.length; ++j) {
									for (var h = 0; h < player.cards.playingCards.length; ++h) {
										var card = player.cards.playingCards[h];
										if(card.selected) {
											continue;
										}
										else {
											if( card.number === handItemsFound[j]) {
											   $scope.userClickedItemImage(h);
											   break;
											}
										}	
									}
								}
							}
						}
					}
			   }
			}
		}

		//if cart is one away and market has item and hand can buy item and actions > 0
		//select market item for trade
		//select cards in hand that add up to market
		//only if cart and hand items dont already have a perfect match

		

		//if cart is more than one away and market has items and hand can buy item and actions > 0
		//select market items for trade
		//select one card in hand that add up to market

		
		
		//dont autopass in the middle of an event or if you can complete a quest
		if($scope.displayMode === 'game' ) {
			checkAutoPass(data.actionsRemaining);
		}

		
	}

	function checkAutoPass(actionsRemaining) {
		if($scope.aQuestIsReadyCart) {
			return;
		}
		if($scope.aQuestIsReadyHand) {
			if(actionsRemaining === 0 && $scope.activePlayer.gold >= 2 && $scope.autoPass) {
				return;
			}
		}
		if(actionsRemaining === 0 && $scope.activePlayer.gold < 2 && $scope.autoPass) {
			$scope.playerPass();
		}
	}
	

	function playerRefresh() {
		$scope.loadingData=true;
		gameFactory.refresh($scope.siteUrl, $scope.gameKey, $scope.myId, processGameStateCallback, processGameStateErrorCallback);
	}

	function joinGame(gameKey, playerName) {
		$scope.loadingData=true;
		gameFactory.joinGame($scope.siteUrl, gameKey, playerName, processGameStateCallback, processGameStateErrorCallback);
	}

	function listGames() {
		$scope.loadingData=true;
		gameFactory.listGames($scope.siteUrl, processListGamesCallback, processListGamesErrorCallback);
	}

	function completeEventDealQuest(eventId) {
		$scope.loadingData=true;
		gameFactory.completeEventDealQuest($scope.siteUrl, $scope.gameKey, $scope.myId, eventId, processGameStateCallback, processGameStateErrorCallback);
	}

	function completeEvent(eventId, gold, items, what1, where1, what2, where2, dest1) {
		$scope.loadingData=true;
		gameFactory.completeEvent($scope.siteUrl, $scope.gameKey, $scope.myId, eventId, gold, items, what1, where1, what2, where2, dest1, processGameStateCallback, processGameStateErrorCallback);
	}

	function pass(discard) {
		$scope.loadingData=true;
		gameFactory.pass($scope.siteUrl, $scope.gameKey, $scope.myId, discard, processGameStateCallback, processGameStateErrorCallback);
	}

	function move(actionCost, what, src, dst) {
		$scope.loadingData=true;
		gameFactory.move($scope.siteUrl, $scope.gameKey, $scope.myId, actionCost, what, src, dst, processGameStateCallback, processGameStateErrorCallback);
	}

	function fish(actionCost, what, where) {
		$scope.loadingData=true;
		gameFactory.fish($scope.siteUrl, $scope.gameKey, $scope.myId,  actionCost, what, where, processGameStateCallback, processGameStateErrorCallback);
	}

	function discard(actionCost, what, where) {
		$scope.loadingData=true;
		gameFactory.discard($scope.siteUrl, $scope.gameKey, $scope.myId, actionCost, what, where, processGameStateCallback, processGameStateErrorCallback);
	}

	function buyCart(actionCost, cart, goldFlag, items) {
		$scope.loadingData=true;
		gameFactory.buyCart($scope.siteUrl, $scope.gameKey, $scope.myId, actionCost, cart, goldFlag, items, processGameStateCallback, processGameStateErrorCallback);
	}

	function buyAction() {
		$scope.loadingData=true;
		gameFactory.buyAction($scope.siteUrl, $scope.gameKey, $scope.myId, processGameStateCallback, processGameStateErrorCallback);
	}

	function marketTrade(actionCost, handItems, marketItems) {
		$scope.loadingData=true;
		gameFactory.marketTrade($scope.siteUrl, $scope.gameKey, $scope.myId, actionCost, handItems, marketItems, processGameStateCallback, processGameStateErrorCallback);
	}

	function completeQuest(cartItems, cart) {
		$scope.loadingData=true;
		gameFactory.completeQuest($scope.siteUrl, $scope.gameKey, $scope.myId, cartItems, cart, processGameStateCallback, processGameStateErrorCallback);
	}
	

	

}]).directive('questcard', function () {
    return {
        restrict: 'E',
        scope: {
            card: '=info'
        },
        templateUrl: 'static/questcard.html?2'
    };
}).directive('questcardsmall', function () {
    return {
        restrict: 'E',
        scope: {
            card: '=info'
        },
        templateUrl: 'static/questcardsmall.html?2'
    };
}).directive('eventcardsmall', function () {
    return {
        restrict: 'E',
        scope: {
            card: '=info'
        },
        templateUrl: 'static/eventcardsmall.html?2'
    };
}).directive('eventcard', function () {
    return {
        restrict: 'E',
        scope: {
            card: '=info'
        },
        templateUrl: 'static/eventcard.html?2'
    };
}).directive('eventcardorig', function () {
    return {
        restrict: 'E',
        scope: {
            card: '=info'
        },
        templateUrl: 'static/eventcardorig.html?2'
    };
}).directive('eventquests', function () {
    return {
        restrict: 'E',
        scope: {
            card: '=info'
        },
        templateUrl: 'static/eventquests.html?2'
    };
}).directive('marketcard', function () {
    return {
        restrict: 'E',
        scope: {
            card: '=info'
        },
        templateUrl: 'static/marketcard.html?2'
    };
}).directive('cart', function () {
    return {
        restrict: 'E',
        scope: {
            cart: '=info'
        },
        templateUrl: 'static/cart.html'
    }
});

