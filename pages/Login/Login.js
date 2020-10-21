window.crearBaseDatos();

$(function () {

    // Verificamos que existan usuarios, sino creamos uno:
    sql = 'SELECT * FROM users';

    window.query(sql).then(function (result) {

        if (result.length == 0) {
            sql = 'INSERT INTO users (nombres, sexo, usuario, password) VALUES("ADMINISTRADOR", "M", "admin", "123")';
            
            window.query(sql).then(function (result) {
                toastr.info("Creado usuario admin con contraseña 123");
            }, function (error) {
                console.log('Lo sentimos, ha ocurrido un error', error);
            })
        }
    }, function (error) {
        console.log('Lo sentimos, ha ocurrido un error. ERROR!', error);
    });


    $('#frmLogin').submit(function (e) {
        //console.log("hola");
        e.preventDefault();
        const pass = $("#PassInput").val();
        const user = $("#UsuarioInput").val();


        sql = 'SELECT rowid, * FROM users WHERE password=? and usuario=?';

        window.query(sql, [pass, user]).then(function (result) {
            if (result.length > 0) {
                window.location.href = "../../index.html"
                
            }else{
                toastr.warning('Datos no válidos');
            }
        }, function (error) {
            console.log('Lo sentimos, ha ocurrido un error', error);
        })
        
    })



})
