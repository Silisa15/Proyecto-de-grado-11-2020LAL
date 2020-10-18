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
        console.log('Lo sentimos, ha ocurrido un error', error);
    })


    $('#frmLogin').submit(function (e) {
        const pass = ("#PassInput").val();
        const user = ("#UsuarioInput").val();

        console.log(pass, user);

        sql = 'SELECT * FROM users WHERE password=? and username=?';

        window.query(sql, [pass, user]).then(function (result) {
            fila.remove();
            console.log(result);
            //window.location.href = "../../"
        }, function (error) {
            console.log('Lo sentimos, ha ocurrido un error', error);
        })
        e.preventDefault()
    })



})
