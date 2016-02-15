(function(){
    "use strict";

    var Moosipurk = function(){

      // See on singleton pattern
      if(Moosipurk.instance){
        return Moosipurk.instance;
      }

      //this viitab Moosipurk funktsioonile
      Moosipurk.instance = this;

      console.log('moosipurgi sees');

      // Kõik muutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
      this.click_count = 0;
      console.log(this);

      // Kui tahan moosipurgile referenci siis kasutan THIS = MOOSIPURGI RAKENDUS ISE
      this.init();
    };

    window.Moosipurk = Moosipurk; // Paneme muutuja külge

    // Kõik funktsioonid lähevad moosipurgi külge
    Moosipurk.prototype = {
      init: function(){
        console.log('Rakendus läks tööle');

        // Kuulame hiirekliki nupul
        this.bindMouseEvents();



      },

      bindMouseEvents: function(){
        document.querySelector('.add-new-jar').addEventListener('click', this.addNewClick.bind(this));
      },

      addNewClick: function(event){
        console.log(event);
        this.click_count++;
        console.log(this.click_count);
      }

    };

    // Kui leht laetud, käivitan Moosipurgi rakenduse
    window.onload = function(){
      var app = new Moosipurk();
    };



})();
