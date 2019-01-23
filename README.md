# Bug Fix
The left bug has been fixed and the game no longer crashes. The skier gets up and is facing to the left

# New Features
- Your Name
    - When the game first loads, you will be requested to enter your name. Please do so, you don't want to miss the league table.
  
-  Game Status: 
    - Start: This status shows up when the game first loads. It indicates your readiness to start the game.
    - Playing: Press an arrow key to start playing the game. This changes the status of the game from **Start** to **Playing**. 
    - Pause/Resume: You can pause the game by pressing the **space bar**. When the game is paused, you can press the space bar again to resume the game.
    - Crashed: The status of the game shows **Crashed** when you hit an obstacle.
  
-  Game Score
    - The score is calculated based on total the distance covered. The distance covered is how far ski went on the Y axis.
    
-  Game Level
    - There are 5 levels in this game. Each level requires that you cover a certain distance. When you move from one level to the other, the distance to be covered for the new level is recalculated bearing in mind your speed since it also increases. You win the game when you finish the 5th level. You get an alert when you transition from one level to the other.
    
-  Game Speed
    - The speed of the game increases when you move from one level to the other. The new speed is 50% more of the old speed and it's cumulative.
    
-  Total Collisions
    - A counter is maintained to track how many times you hit an obstacle. The game ends after the 5th collision. You get an alert telling it's **Game Over**.
    
-  Game Controls
    - Use the **left, right, up and down** arrow keys as your controls. There are 3 buttons to the top right of the game window. The first is the leader board button. Next is the Game rules button. The last button is to reset the game.
    - The leader board keeps track of all the users who played the game. It keeps track of the user who played the game, his/her speed, level and score. Toggle this button to view the league table.
    - The game rules button basically informs you on how to use the game.
    - The reset button restarts the game so another user can also play.
    
-  Jumping
    - Use the **up** arrow to make the skier jump over an obstacle. When the skier is in motion and you press the **up** arrow on the keyboard, the skier jumps and continues moving in the direction before the jump.

-  Feeding the Rhino
    - At some point in the game, that is, when you have almost played half the game level, a rhino shows up. The rhino starts to chase the skier in every direction. When the skier moves to a certain direction, the rhino also moves in the same direction until it gets to the skier. The hungry rhino feeds on the skier until there's no part of it left, then game over.

-  Play the game on this link: http://skigame.aceappsltd.com


# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

We understand that everyone has varying levels of free time, so take a look through the requirements below and let us 
know when you will have something for us to look at (we also get to see how well you estimate and manage your time!). 
If anything is unclear, don't hesitate to reach out.

Requirements:
* The base game that we've sent you is not what we would consider production ready code. In fact, it's pretty far from
  it. As part of our development cycle, all code must go through a review. We would like you to perform a review
  on the base code and fix/refactor it until you believe it would be ready for production. Feel free to update the
  code/architecture as you see fit. If you feel that something should be done a better way, by all means do it! What 
  design patterns could we use? Is the codebase maintainable, unit-testable, and scalable? How hard would it be to add 
  a feature? Show us!
* There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
* The game's a bit boring as it is. Add a new feature to the game to make it more enjoyable. Some ideas are:
  * Implement jumps. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included
      some jump trick assets if you wanted to get really fancy!
  * Add a score. How will you know that you're the best Ceros Skier if there's no score? Maybe store that score
      somewhere so that it is persisted across browser refreshes.
  * Feed the hungry Rhino. In the original Ski Free game, if you skied for too long, a yeti would chase you
      down and eat you. In Ceros Ski, we've provided assets for a Rhino to catch the skier.
* Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
* Provide a way for us to view the completed code and run it, either locally or through a cloud provider
* Be original. Don’t copy someone else’s game implementation!

Bonus:
* Provide a way to reset the game once the game is over
* Provide a way to pause and resume the game
* Skier should get faster as the game progresses
* Deploy the game to a server so that we can play it without setting something up ourselves. We've included a 
  package.json and web.js file that will enable this to run on Heroku. Feel free to use those or use your own code to 
  deploy to a cloud service if you want.
* Write unit tests for your code

And don't think you have to stop there. If you're having fun with this and have the time, feel free to add anything else
you want and show us what you can do! 

We are looking forward to see what you come up with!

