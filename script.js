		/* set the global variables so we can use them wihin functions */
			var game_active = false; 
			var active_player = 0; // the # of the active player is 1 or 2. 
			var gameboard = []; // define the gameboard as an array.  We will later set it up as a multi-dimensional array, to represent the col/row value for the game board
			var player_color = []; //define player_color as an array
			player_color[1] = "green"; //set the player_color for player 1 to "green" 
			player_color[2] = "blue"; // set the player_color for player 2 to "blue"
			
          
			function beginGame() {
				if (game_active == true) 
                    return false;
				game_active = true;  //We're starting the game, so make game_active = true
				/* Reset the gameboard to be all 0.  We are going to use a multi-dimensional array - so every
				section of the board will be represented by a point on the grid - X and Y (col and row).  Top left will be 
				0,0 and as it moves to the right, that will be +x and down will be +y.
				For example, the values of the board will be: 
				| 0,0 | 0,1 | 0,2 | 0,3 | 0,4 | 0,5 | 0,6 |
				| 1,0 | 1,1 | 1,2 | 1,3 | 1,4 | 1,5 | 1,6 |
				| 2,0 | 2,1 | 2,2 | 2,3 | 2,4 | 2,5 | 2,6 |
				| 3,0 | 3,1 | 3,2 | 3,3 | 3,4 | 3,5 | 3,6 |
				| 4,0 | 4,1 | 4,2 | 4,3 | 4,4 | 4,5 | 4,6 |
				| 5,0 | 5,1 | 5,2 | 5,3 | 5,4 | 5,5 | 5,6 |
				
				*/
				for (row=0; row<=5; row++) {
					gameboard[row] = [];
					for (col=0; col<=6; col++) {
						gameboard[row][col] = 0;
					}	
				}		
				
				drawBoard(); // call the function to draw the board.				
				active_player = 1; //set the first player as their turn
				setUpTurn(); //get ready for the player's turn
			}
			
			/* drawBoard will draw the board - it will update each item to make sure it is the appropriate value */
			function drawBoard() {
                		checkForWin(); //check to see if any player has won.
				for (col = 0; col<=6; col++) {
					for (row=0; row<=5; row++) {
						//Set the inner HTML of the square (a td) to be a span with the class of 'piece' and 'player' + the value of that 
						//gameboard piece.  Using CSS, you can style player0, player1 and player2 so that the square will appear correctly.
						document.getElementById('square_'+row+'_'+col).innerHTML ="<span class='piece player"+gameboard[row][col]+"'> </span>";
					}	
				}
                
			}
			
			function checkForWin() {
				//check left-to-right
				//check for player 1 and 2
				for (i=1; i<=2; i++) {
					//since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
					for (col = 0; col <=3; col++) {
						for (row = 0; row <=5; row++) {
							//check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
							if (gameboard[row][col] == i) {
								if ((gameboard[row][col+1] == i) && (gameboard[row][col+2] == i) && (gameboard[row][col+3] == i)) {
									endGame(i);//a match has been made, so run EndGame with the player that had the win
									return true; //stop checking for a win - the game is over.
								}
							}
						}
					}
				}
				
				//check top-to-bottom
				for (i=1; i<=2; i++) {
					//since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
					for (col = 0; col <=6; col++) {
						for (row = 0; row <=2; row++) {
							//check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
							if (gameboard[row][col] == i) {
								if ((gameboard[row+1][col] == i) && (gameboard[row+2][col] == i) && (gameboard[row+3][col] == i)) {
									endGame(i); //a match has been made - run endGame for the player who had the match.
									return true; //stop checking for a win 
								}
							}
						}
					}
				}
				
				//check diagonal down
				for (i=1; i<=2; i++) {
					//since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
					for (col = 0; col <=3; col++) {
						for (row = 0; row <=2; row++) {
							//check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
							if (gameboard[row][col] == i) {
								if ((gameboard[row+1][col+1] == i) && (gameboard[row+2][col+2] == i) && (gameboard[row+3][col+3] == i)) {
									endGame(i);
									return true;
								}
							}
						}
					}
				}
								
				//check diagonol up
				for (i=1; i<=2; i++) {
					//since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
					for (col = 0; col <=3; col++) {
						//we also only need to check the bottom most columns - as the win must be upwards
						for (row = 3; row <=5; row++) {
							//check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
							if (gameboard[row][col] == i) {
								if ((gameboard[row-1][col+1] == i) && (gameboard[row-2][col+2] == i) && (gameboard[row-3][col+3] == i)) {
									endGame(i);
									return true;
								}
							}
						}
					}
				}
			}
			
			/* endGame will end the game - any additional functions or things you want to happen when the game is over can go here */
			function endGame(winningPlayer) {
				game_active = false; //set the "game_active" to false, so that it can be started again.
				document.getElementById('game_info').innerHTML = "Winner: " + winningPlayer; //set the "game_info" to the winner and the winning player #
			}
			
			/* setUpTurn will display who is the active player */
			function setUpTurn() {
				if (game_active) { //only run this is the game is active.
					//display the current player, and create a <span> with the class of the player# so that it will show the color.
					document.getElementById('game_info').innerHTML = "Current Player: Player " + active_player + " <span class='player"+active_player+"'>(" + player_color[active_player] + ")</span>";
				}
			}			
			
			/* drop will add a piece to the lowest available column */
			function drop(col) {
					/* Look for the lowest point in this row that is open */
					for (row=5; row>=0; row--) { 
						if (gameboard[row][col] == 0 && game_active===true) {
							gameboard[row][col] = active_player;
							drawBoard(); // draw the board.
							if (active_player == 1) {//change the active players turn
								active_player = 2;
							} else {
								active_player = 1;
							}
							
							
							setUpTurn(); //display who is the active player
							return true;
						}
					}
			}
