<?php

  $file_title = "data.txt";

  //faili sisu
  $entries_from_file = file_get_contents($file_title);
  //echo $entries_from_file;

  //string objektideks
  $entries = json_decode($entries_from_file);
  //var_dump($entries);

  if(isset($_GET["title"]) && isset($_GET["ingredients"])){
    //ei ole tühjad
    if(!empty($_GET["title"]) && isset($_GET["ingredients"])){

      //lihtne objekt
      $object = new StdClass();
      $object->title = $_GET["title"];
      $object->ingredients = $_GET["ingredients"];

      array_push($entries, $object);

      //salvestan faili üle, salvestan massiivi stringi kujul
      file_put_contents($file_title, json_encode($entries));

  }
}
// trükin välja stringi kuju massiivi
echo(json_encode($entries));

?>
