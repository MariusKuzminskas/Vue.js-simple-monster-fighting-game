new Vue({
    el: '#app',
    data: {
      gameIsRunning: false,
      playerHealth: 100,
      monsterHealth: 100,
      turns: []

        
    },
    methods: {
      startTheGame: function() {
        this.gameIsRunning = true;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.turns = []
        
      },
      //combat
      attack: function() {
        var damage = this.calculateDamage(2, 10)
        this.monsterHealth -= damage
        this.turns.unshift({
          isPlayer: true,
          text: 'You hit the Monster for '+ damage
        })
        if (this.checkWin()){ 
          console.log("chekwin true")
          return 
        }
        
        // this.playerHealth -= this.calculateDamage(5, 14)
        // this.checkWin();
        this.monsterAttacks();
      },
      specialAttack: function() {
        var damage = this.calculateDamage(10, 20)
        this.monsterHealth -= damage
        this.turns.unshift({
          isPlayer: true,
          text: 'You hit the Monster HARD for '+ damage
        })
        if (this.checkWin()){ return }
        
        this.monsterAttacks();
        
      },
      heal: function() {
        if (this.playerHealth < 90) {
          this.playerHealth += 10;
        } else {this.playerHealth = 100}
        this.turns.unshift({
          isPlayer: true,
          text: 'You heal for 10'
        })
        this.monsterAttacks();
      },
      giveUp: function() {
        this.gameIsRunning = false;
      },
      monsterAttacks: function() {
        var damage = this.calculateDamage(5, 14)
        this.playerHealth -= damage
        this.turns.unshift({
          isPlayer: false,
          text: 'Monster hit You dealing '+ damage
        })
        this.checkWin();
      },
      calculateDamage: function(min, max) {
        return Math.max(Math.floor(Math.random() * max) + 1, min)
      },
      checkWin: function() {
        if (this.monsterHealth <= 0) {
          if (confirm("You won. New game?")) {
            this.startTheGame();
          } else {
            this.gameIsRunning = false;
          }
          return true
        } else if (this.playerHealth <= 0){
          if (confirm("Monster win. New game?")) {
            this.startTheGame();
          } else {
            this.gameIsRunning = false;
          }
          return true
        }
        return false
      }
    },
    computed: {
      
    }
    
  });
  