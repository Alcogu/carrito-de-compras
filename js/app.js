//Variables

const carrito = document.querySelector('#carrito');
//Donde se van a colocar los elementos
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
//Vacia carrito/Elimina los elementos
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listarCursos = document.querySelector('#lista-cursos');
//Carrito de compras
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listarCursos.addEventListener('click', agregarCurso);
}

// ---------------------------- Funciones ----------------------------

function agregarCurso(e){
    //Previene la accion por defecto de dirigir la pagina para arriba
    e.preventDefault();
    //Condicion para que se ejecute la funcion solo cuando se le da click a un elemento con la clase
    //agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        //Toma todo el card, va a la clase padre 2 veces
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    } 
}

//Lee el contenido del HTML al que se le da click y extrae la información
//toma un curso
function leerDatosCurso(curso){

    //Crear objeto con contenido del curso actual llenando los datos
    const infoCurso ={
        //se agrega lo que se va a mostrar
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        //busca en la clase precio la etiqueta span
        precio: curso.querySelector('.precio span').textContent,
        //Se va a la etiqueta a para posteriormente traer el valor de data-id
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    //Antes de agregar un elemento al carrito se valida si ya existe y de ser así se aumenta la cantidad
    //.some permite iterar sobre un arreglo de objetos y verificar si un objeto existe en el
    //se itera sobre cada curso si es igual al objeto que se esta creando
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizar la cantidad
        //.map crea un nuevo arreglo
        const cursos = articulosCarrito.map(curso => {
            //cuando el curso actual del carrito es igual al que tratamos de agregar
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso; //retorna objetos que no son duplicados
            }
        });
        //express operator copia arreglo anterior para no ir perdiendo articulos
        articulosCarrito = [...cursos];
    }else{
        //Agregar nuevo articulo
        //Se toma una copia del carrito ya que va a estar vacio y se van agregando articulos
        //se copia arreglo anterior para no ir perdiendo articulos
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    //Se llama la función después de leer los datos del curso
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //Limpiar HTML para posteriormente iterar
    limpiarHTML();

    //se itera cada curso, recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso=>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //Agrega HTML del carrito en el tbody
        //appendChild = Agrega lementos al final del tbody sin limpiar
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta
    //con el inner se accede al HTML y se limpia poniendo el string vacio
    //contenedorCarrito.innerHTML='';

    //Forma recomendada
    //Si el contenedorCarrito tiene al menos un elemento adentro el codigo se sigue ejecutando
    //una vez limpiado el contenedor ya no se ejecuta
    while(contenedorCarrito.firstChild){
        //con removeChild se borra por referencia del padre al hijo
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}