function sendMail()
{

    let form_data = $("#frm-contact").serializeArray();

    if($('#frm-contact').valid()){
        $.ajax({
            url: "./Functions/sendMail.php",
            method: "POST",
            data: form_data
        }).done(function(response) {
            jsonResponse = JSON.parse(response);

            if(jsonResponse.code == 200) {
                swal("Mensaje Enviado!", "Gracias por mostrar interés en nuestros servicios, en brevedad un asesor se pondrá en contacto contigo.!", "success");
            } else {
                swal("Whoops!", "Lo sentimos ha ocurrido un error al procesar tu solicitud, intenta de nuevo el proceso y si el problema persiste puedes contactarnos directamente atrevés de contacto@n6solutions.mx.!", "warning");
            }
        });
    } else {
        return false;
    }
}

function justNumbers(e)
{
    var keynum = window.event ? window.event.keyCode : e.which;

    if ((keynum == 8) || (keynum == 46) || (keynum == 0))
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}
