const express = require ('express');
const app = express();

app.use(express.json());


    const usuarios =[
        { id: 1, nombre: 'Juan', apellido: 'Perez', email:'juanperez@gmail.com' },
        { id: 2, nombre: 'maria', apellido: 'Perez', email:'mariaperez@gmail.com' },
    ];
   
app.get('/usuarios',((req, res)=>{
res.send({usuarios})
     

}))

app.get('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    if(isNaN(id))
    {
        res.status(400).send('El id debe ser un número');
        return;
    }

    const usuario = usuarios.find (u => u.id === +id);
    if (!usuario)
    {
        res.status(404).send('Usuario no encontrado');
        return;
    }
    res.send(usuario);
});

app.post('/usuarios',(req, res) =>{
    const {nombre, apellido, email} = req.body;

    if (!nombre || !apellido || !email){
        res.status(400).send('Todos los campos son obligatorios');
    return;
    }

    if(usuarios.find((usuario) => usuario.email === email)){
        res.status(400).send('Ya existe un usuario con ese email');
        return;

    }

    usuarios.push({
        id:usuarios.length + 1,
        nombre, 
        apellido, 
        email
    });

    res.send ('Usuario creados');
});

app.listen(3000, () =>{
    console.log('Servidor corriendo desdse el servidor 3000');
});