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

      // Hakkan hoidma kõiki purke siin
      this.jars = [];

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

        //Saan kätte purgid localstorage kui on
        if(localStorage.jars){
          //Võtan stringi ja teen tagasi objektideks
          //this.jars = JSON.parse(localStorage.jars);
          //console.log('laadisin localStorageist massiivi' + this.jars.length);
          this.createListFromArray(JSON.parse(localStorage.jars));
          console.log('laadisin localStorageist');

        }else{
          // ei olnud olemas, teen päringu serverisse

          var xhttp = new XMLHttpRequest();
          // vahetub siis kui toimub muutus ühenduses
          xhttp.onreadystatechange = function() {

            console.log(xhttp.readyState);

            //fail jõudis tervenisti kohale, edukalt
            if (xhttp.readyState == 4 && xhttp.status == 200) {

              var result = JSON.parse(xhttp.responseText);
              console.log(result);

              // NB saab viidata moosipurgile ka moosipurk.instance

              Moosipurk.instance.createListFromArray(result);
              console.log('laadisin serverist');

            }
          };
          // päringu tegemine
          xhttp.open("GET", "saveData.php", true);
          xhttp.send();

        }

        //Kui refreshime lehte, ütleb mis lehel parasjagu oleme


      },

      createListFromArray: function(arrayOfObjects){
          this.jars = arrayOfObjects;

          //tekitan loendi html'i
          this.jars.forEach(function(jar){

            var new_jar = new Jar(jar.title, jar.ingredients);

            var li = new_jar.createHtmlElement();
            document.querySelector('.list-of-jars').appendChild(li);

          });

          // Kuulame hiirekliki nupul
          this.bindEvents();

      },

      bindEvents: function(){
        document.querySelector('.add-new-jar').addEventListener('click', this.addNewClick.bind(this));

        //kuulan trükkimist otsikastis
        document.querySelector('#search').addEventListener('keyup', this.search.bind(this));
      },

      search: function(event){
          //otsikasti väärtus
          var needle = document.querySelector('#search').value.toLowerCase();
          console.log(needle);

          var list = document.querySelectorAll('ul.list-of-jars li');
          console.log(list);

          for(var i = 0; i < list.length; i++){
            var li = list[i];

            // ühe listitemi sisu tekst
            var stack = li.querySelector('.content').innerHTML.toLowerCase();

            //kas otsisusõna on sisus olemas
            if(stack.indexOf(needle) !== -1){
              // olemas
              li.style.display = 'list-item';
            }else{
              // ei ole, index on -1
              li.style.display = 'none';
            }

          }
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

        // lisan massiivi purgi
        this.jars.push(new_jar);
        console.log(JSON.stringify(this.jars));
        //JSON'i stringina salvestan localStorage'isse
        localStorage.setItem('jars',JSON.stringify(this.jars));

        //salvestan serverisse
        var xhttp = new XMLHttpRequest();
        xhttp.onreadyatstatechange = function(){
          if (xhttp.readyState == 4 && xhttp.status == 200) {

          console.log('laadisin serverist');

        }
      };
        // päringu tegemine
          xhttp.open("GET", "saveData.php?title="+title+"&ingredients=" +ingredients, true);
          xhttp.send();

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
        span.classtitle = 'letter';
        var letter = document.createTextNode(this.title.charAt(0));
        span.appendChild(letter);

        li.appendChild(span);

        var span = document.createElement('span');
        span.classtitle = 'content';
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
