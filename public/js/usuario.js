$(document).ready(function(){
    $( "#formname" ).submit(function() {
        var formData = $(this).serializeArray();
        $.ajax({
           type: "POST",
           url: "/user",
           //dataType: "json",
           dataType: "html",
           data: formData,
           success: function(data){
              var msg="Hola, bienvenido ";
              var nombre=document.getElementById('nombre').value;
              $( "#contentDiv" ).html(msg+nombre);
           }
        });
        return false;
    });
});