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

          // simulatsioon laeb kasutan
          window.setTimeout(function(){
            document.querySelector('.loading').innerHTML = 'laetud!';
          }, 3000);
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

        if(!window.location.hash){
          window.location.hash = 'home-view';
        }else{
                  this.routeChange();
        }

        //Kui refreshime lehte, ütleb mis lehel parasjagu oleme

        // Kuulame hiirekliki nupul
        this.bindMouseEvents();



      },

      bindMouseEvents: function(){
        document.querySelector('.add-new-jar').addEventListener('click', this.addNewClick.bind(this));
      },

      addNewClick: function(event){
        //salvestame purgi
        //console.log(event);

        var title = document.querySelector('.title').value;
        var ingredients = document.querySelector('.ingredients').value;

        //console.log(title + ' ' + ingredients);
        // 1) tekitan uue purgi
        if (title === "" && ingredients === ""){
          console.log("Not inserting anything >:c");
          window.alert("Tühjasi väljasi ei või jätta");
        }else{
        var new_jar = new Jar(title, ingredients);
        // 2) lisan selle htmli listi juurde
        var li = new_jar.createHtmlElement();
        document.querySelector('.list-of-jars').appendChild(li);
        }

      },

      routeChange: function(event){
        //Kirjutan muutujasse lehe nime, võtan maha #
        this.currentRoute = location.hash.slice(1);
        console.log(this.currentRoute);

        if(this.routes[this.currentRoute]){

          // muudan menüü lingi aktiivseks
          this.updateMenu();

          this.routes[this.currentRoute].render();

        }else{
          // 404 page not found
        }

        // Muudan menüü lingi aktiivseks
        this.updateMenu();

      },

      updateMenu: function() {
        // Võtan maha aktiivse menüülingi kui on
        document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu',' ');

        //Lisan uuele juurde
        document.querySelector('.'+this.currentRoute).className += ' active-menu';
      }

    }; // MOOSIPURGI LÕPP

    var Jar = function(title, ingredients){
      this.title = title;
      this.ingredients = ingredients;
      console.log('created new jar');
    };

    Jar.prototype = {
      createHtmlElement: function(){

        // võttes title ja ingredients ->


        var li = document.createElement('li');

        var span = document.createElement('span');
        span.className = 'letter';
        var letter = document.createTextNode(this.title.charAt(0));
        span.appendChild(letter);

        li.appendChild(span);

        var span = document.createElement('span');
        span.className = 'content';
        var content = document.createTextNode(this.title + ' | '+ this.ingredients);
        span.appendChild(content);

        li.appendChild(span);

        return li;

      }
    };

    // Kui leht laetud, käivitan Moosipurgi rakenduse
    window.onload = function(){
      var app = new Moosipurk();
    };



})();
