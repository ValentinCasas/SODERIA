const { Producto, Usuario } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const fs = require('fs');



exports.viewProductos = async (req, res, next) => {

    const productos = await Producto.findAll();
    res.render('productos', { Productos: productos });
}

exports.viewAgregarProductos = async (req, res, next) => {

    const productos = await Producto.findAll();
    res.render('actualizar-productos', { Productos: productos });
}

exports.eliminarProducto = async (req, res, next) => {
    try {
        const { idProducto } = req.params;

        const producto = await Producto.findAll({ where: { id: idProducto } });
        let rutaImagen = `./public/imagen-producto/${producto[0].imagenUrl}`;

        await Producto.destroy({ where: { id: idProducto } })
            .then((response) => {
                if (producto[0].imagenUrl != "producto-x.png") {

                    fs.unlinkSync(rutaImagen, (err) => {
                        if (err) throw err;
                    });
                }
            });


        res.json({ success: true, message: "El producto ha sido eliminado exitosamente" });
    } catch (error) {
        next(error);
    }
}


exports.actualizarProductos = async (req, res, next) => {
    try {
        const productos = await Producto.findAll();
        const productosActualizados = [];
        const productosNoActualizados = [];

        for (const producto of productos) {
            const cantidad = parseInt(req.body[`cantidad-${producto.id}`]);
            const cantidadActual = producto.cantidad;

            if (cantidad > 0) {
                productosActualizados.push(producto);
                producto.cantidad = cantidadActual + cantidad;
            } else if (cantidad < 0 && Math.abs(cantidad) <= cantidadActual) {
                productosActualizados.push(producto);
                producto.cantidad = cantidadActual - Math.abs(cantidad);
            } else if (cantidad < 0 && Math.abs(cantidad) > cantidadActual) {
                productosNoActualizados.push(producto);
            }

            const nombre = req.body[`nombre-${producto.id}`];
            const descripcion = req.body[`descripcion-${producto.id}`];
            const precioCompra = parseFloat(req.body[`precioCompra-${producto.id}`]);
            const precioVenta = parseFloat(req.body[`precioVenta-${producto.id}`]);

            if (nombre) {
                producto.nombre = nombre;
            }
            if (descripcion) {
                producto.descripcion = descripcion;
            }
            if (!isNaN(precioCompra)) {
                producto.precioCompra = precioCompra;
            }
            if (!isNaN(precioVenta)) {
                producto.precioVenta = precioVenta;
            }

            let rutaImagen = "";
            let imagenProducto;

            if (req.files && req.files[`imagen-${producto.id}`]) {
                imagenProducto = req.files[`imagen-${producto.id}`];
                rutaImagen = uuid.v1() + imagenProducto.name;

                // Eliminar archivo de imagen anterior
                if (producto.imagenUrl !== "producto-x.png") {
                    const rutaImagenAnterior = `./public/imagen-producto/${producto.imagenUrl}`;
                    fs.unlinkSync(rutaImagenAnterior);
                }

                // Subir nuevo archivo de imagen
                await imagenProducto.mv(`./public/imagen-producto/${rutaImagen}`);
                producto.imagenUrl = rutaImagen;
            }

            await producto.save();
        }

        let message = '';

        if (productosActualizados.length > 0) {
            message = `Se actualizaron ${productosActualizados.length} producto(s).`;

            if (productosNoActualizados.length > 0) {
                message += ` Algunos productos no se pudieron actualizar.`;
            }
        } else {
            message = 'No se pudo actualizar ningún producto.';
        }

        res.json({ success: true, message: message, productosNoActualizados });
    } catch (error) {
        next(error);
    }
};



exports.agregarProducto = async (req, res, next) => {
    try {
        const { nombre, descripcion, precioCompra, precioVenta } = req.body;

        let rutaImagen = "";
        let imagenProducto;

        if (req.files === null) {
            rutaImagen = "producto-x.png";
        } else {
            imagenProducto = req.files.imagenUrl;
            rutaImagen = uuid.v1() + imagenProducto.name;
        }

        const producto = await Producto.create({
            nombre,
            descripcion,
            precioCompra,
            precioVenta,
            imagenUrl: rutaImagen,
        });

        if (imagenProducto) {
            await imagenProducto.mv("./public/imagen-producto/" + rutaImagen);
        }

        res.json({ success: true, producto });
    } catch (error) {
        next(error);
    }
};

