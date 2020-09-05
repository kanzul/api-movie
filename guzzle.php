<?php 
require 'vendor/autoload.php';

use GuzzleHttp\Client;

    $client = new Client();

    $respon = $client->request('GET', 'http://omdbapi.com/', [
        'query' => [
            
            'apikey' => '429d23aa',
            's' => 'jason bourne'
        ]
    ]);

    $result = json_decode($respon->getBody()->getContents(), true); //ubah dari bentuk (json)/object menjadi array dengan ditambah 'true' diakhir

 ?>

 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Movie</title>
 </head>
 <body>
     
    <?php foreach($result['Search'] as $movie) : ?>

    <ul>
        <li> title : <?= $movie['Title']; ?></li>
        <li> Year : <?= $movie['Year']; ?></li>
        <li> 
            <img src="<?= $movie['Poster']; ?>" width="110">
        </li>
    </ul>
    <?php endforeach; ?>
 </body>
 </html>
 