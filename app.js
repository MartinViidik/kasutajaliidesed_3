(function(){
    "use strict";

    var Moosipurk = function(){

      // See on singleton pattern
      if(Moosipurk.instance){
        return Moosipurk.instance;
      }

      //this viitab Moosipurk funktsioonile
      Moosipurk.instance = this;

      this.routes = Moosipurk.routes;

      console.log('moosipurgi sees');

      // Kõik muutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
      this.click_count = 0;
      console.log(this);

      // Kui tahan moosipurgile referenci siis kasutan THIS = MOOSIPURGI RAKENDUS ISE
      this.init();
    };

    window.Moosipurk = Moosipurk; // Paneme muutuja külge

    Moosipurk.routes = {
      'home-view': {
        'render': function(){
          // Käivitame siis kui lehte laeme
          console.log('>>>>avaleht');
        }
      },
      'list-view': {
        'render': function(){
          // Käivitame siis kui lehte laeme
          console.log('>>>>>loend');
        }
      },
      'manage-view': {
        'render': function(){
          // Käivitame siis kui lehte laeme
        }
      }
    };

    // Kõik funktsioonid lähevad moosipurgi külge
    Moosipurk.prototype = {
      init: function(){
        console.log('Rakendus läks tööle');
        //Kuulan aadressirea vahetust
        window.addEventListener('hashchange', this.routeChange.bind(this));

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
      },

      routeChange: function(event){
        console.log(location.hash);

      }

    };

    // Kui leht laetud, käivitan Moosipurgi rakenduse
    window.onload = function(){
      var app = new Moosipurk();
    };



})();
