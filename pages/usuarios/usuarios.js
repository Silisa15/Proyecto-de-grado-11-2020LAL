window.crearBaseDatos();
$(document).ready(
    function () {
        $('#conten-crear').hide();
        $('#conten-editar').hide();
        toastr.success('sdfvsdf');

        $('table').on('click', '.eliminar', function () {

            const resp = confirm('Está segur@ de querer eliminar el usuario?')
            if (resp) {
                const fila = $(this).closest('tr');
                const codi = fila.data('id');


                sql = 'DELETE FROM users WHERE rowid=?';

                window.query(sql, [codi]).then(function (result) {
                    fila.remove();
                    console.log('Eliminado correctamente');
                }, function (error) {
                    console.log('Lo sentimos, ha ocurrido un error', error);
                })

            }

        });


        sql = 'SELECT *, rowid FROM users';
        window.query(sql).then(function (result) {
            var items = result;
            for (let i = 0; i < items.length; i++) {
                const u = items[i];

                $('table tbody').append(
                    "<tr id='fila-"+ u['rowid'] + "'data-id='" + u['rowid'] + "'>\
                    <th>"+ u['rowid'] + "</th>\
                    <td class='td-nombre'>"+ u['nombres'] + "</td>\
                    <td class='td-sexo'>"+ u['sexo'] + "</td>\
                    <td class='td-usuario'>"+ u['usuario'] + "</td>\
                    <td class='td-tipo'>"+ u['tipo'] + "</td>\
                    <td>\<div class='btn-group'>\
                    <a href='#' class='btn btn-danger btn-sm eliminar'>\
                    <i class='fa fa-times'></i>\
                    </a>\
                    <a href='#' class='btn btn-info btn-sm editar'>\
                    <i class='fa fa-pen'></i>\</a>\</div>\</td>\<tr>"
                );

            }
        }, function (error) {
            console.log('Dato ingresado', error);
        })

        var fila_editantdo = null;
        $('table').on('click','.editar',function () {
            var tr = $(this).closest('tr');
            fila_editantdo = tr;
            const id= tr.data('id');

            const nombre = tr.find('.td-nombre').text();
            const sexo = tr.find('.td-sexo').text();
            const usuario = tr.find('.td-usuario').text();
            const tipo = tr.find('.td-tipo').text();

            $('#inputnombreEdit').val(nombre);
            document.getElementById('EditSexoFem').checked ? 'femenino' : 'masculino'; 
            $('#inputusuarioEdit').val(usuario);
            $('#inputtipoedit').val(tipo);

            $('#conten-editar').show('fast');
        })
        
        $('#formEditar').submit(function () {
            a = $('#inputnombreEdit').val();
            b = document.getElementById('EditSexoFem').checked ? 'femenino' : 'masculino'; 
            c = $('#inputusuarioEdit').val();
            d = $('#inputtipoEdit').val();
            

            

            sql = 'UPDATE users SET nombres=?,sexo=?,usuario=? WHERE rowid=? ';

            window.query(sql, [a, b, c,fila_editantdo.data('id')]).then(function (result) {

                fila_editantdo.find('.td-nombre').text(a);
                fila_editantdo.find('.td-sexo').text(b);
                fila_editantdo.find('.td-usuario').text(c);
                fila_editantdo.find('.td-tipo').text(d);


                $('#conten-editar').hide();
                
            }, function (error) {
                console.log('Dato ingresado', error);
            })


            event.preventDefault();
        }) 

        $('#btncancelEdit').click(
            function () {
                $('#conten-editar').hide();
            }
        )

        $('#btncrear').click(
            function () {
                $('#conten-crear').show('fast');
            }
        )
        $('#btncancel').click(
            function () {
                $('#conten-crear').hide();
                $('#btncrear').show();
            }
        )
        $('#formcrear').submit(function () {
            a = $('#inputnombre').val();
            b = $('#SexoFem').is(':checked') ? 'F' : 'M';
            c = $('#inputusuario').val();
            d = $('#inputtipo').val();


            sql = 'INSERT INTO users(nombres,sexo,usuario,tipo)VALUES(?,?,?,?)';

            window.query(sql, [a, b, c, d]).then(function (result) {
                alert('Usuario creado con éxito')
                console.log('Dato ingresado', result);

                $('table tbody').append(
                    "<tr id='fila-" + result.insertId + "'data-id='" + result.insertId + "'>\
                        <th>"+ result.insertId + "</th>\
                        <td class='td-nombre'>"+ a + "</td>\
                        <td class='td-sexo'>"+ b + "</td>\
                        <td class='td-usuario'>"+ c + "</td>\
                        <td class='td-usuario'>"+ d + "</td>\
                        <td>\
                            <div class='btn-group'>\
                                <a href='#' class='btn btn-danger btn-sm eliminar'>\
                                    <i class='fa fa-times'></i>\
                                </a>\
                                <a href='#' class='btn btn-info btn-sm editar'>\
                                    <i class='fa fa-pen'></i>\
                                </a>\
                            </div>\
                        </td>\
                    <tr>"
                );
                $('#conten-crear').hide();
            }, function (error) {
                console.log('Dato no ingresado', error);
            })


            event.preventDefault();
        })

    })