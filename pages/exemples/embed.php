<!DOCTYPE html>
<html lang="fr" dir="ltr">
    <head>
        <meta charset="utf-8">

        <?php
            $localurl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

            $dir =  $_GET['example'];
            $readme = $dir . DIRECTORY_SEPARATOR . 'info.txt';
            $thumb = $dir . DIRECTORY_SEPARATOR . 'thumb.png';

            if (file_exists($readme)) {
                parse_str( file_get_contents($readme) );

                if( isset($title) ){
                    $title_line = trim($title);
                    echo "<title>ÉSAD Pyrénées – Ateliers web – exemples</title>\n\n";
                    echo "        <meta property='og:title' content='ÉSAD Pyrénées – Ateliers web'>\n";
                    echo "        <meta property='og:description' content='$title_line'>\n";
                    echo "        <meta property='og:url' content='$localurl'>\n";
                    echo "        <meta property='og:type' content='website'>\n";
                    echo "        <meta property='og:site_name' content='ÉSAD Pyrénées – Ateliers web'>\n";
                    echo "        <meta property='og:locale' content='fr'>\n";
                }
                if( isset($tags) ){
                    $tags_line = trim($tags);
                    echo "        <meta name='keywords' content='$tags_line'>\n";
                }
            }
            if (file_exists($thumb)) {
                $thumb = $localurl."thumb.png";
                echo "        <meta property='og:image' content='$thumb'>\n";
            }

        ?>
        <script>document.getElementsByTagName('html')[0].className = 'js'</script>
        <style media="screen">
            html,body{height:100%}body{display:flex;margin:0;flex-direction:column}#embednav{font-family:'Ecole',sans-serif;background:#000;display:flex;justify-content:space-between}#embednav a{color:#fff;font-size:.85em;text-transform:uppercase;text-decoration:none;border:none;padding:.6em .5em .25em;display:block}#embednav a span{display:none}#embednav a:hover span{display:inline}iframe{border:0}
        </style>
    </head>
    <body>

        <nav id="embednav">
            <a href="../">↩ <span>retour</span></a><a class='download' download href='../backup.php?dir=<?php echo $dir ?>'> <span>télécharger</span> ☻</a>
        </nav>

        <!-- Le code source de l’exemple est situé dans cette iframe : -->
        <iframe src="../<?php echo $dir ?>/?embed=1" width="100%" height="100%"></iframe>

    </body>
</html>