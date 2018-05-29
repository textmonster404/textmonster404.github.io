<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Page</title>
    </head>
    <body>
        <form method="post">
           <textarea id="textarea"></textarea>
           <input type="text" name="name" id="name"><br>
           <input type="submit" value="Submit">
        </form>
        <script>
            var data = new FormData();
            data.append("data" , document.getElementById("textarea").value);
            var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
            xhr.open( 'post', '/path/to/php', true );
            xhr.send(data);
        </script>
        <?php
        $nameoffile = new 
        
        if(!empty($_POST['data'])){
        $data = $_POST['data'];
        $fname = $_POST['name'] . ".html";
        $file = fopen("upload/" .$fname, 'w');
fwrite($file, $data);
fclose($file);
}
        ?>
    </body>
</html>
