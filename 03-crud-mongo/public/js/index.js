const tbody = document.getElementById('tableBody');
const form_persona = document.getElementById("form-persona");


document.addEventListener("DOMContentLoaded",getPersonas)

function getPersonas(){
    fetch(`http://127.0.0.1:3002/getPersonas`)
    .then(res => res.json())
    .then(json=>{
        console.log(json);
        json.forEach(el=>{
            tbody.innerHTML += `
            <tr >
                <th scope="row">${el.nombre}</th>
                <td>${el.apellido}</td>
                <td>${el.edad}</td>
                <td><button data-idpersona=${el._id}  type="button" class="btn-editar btn btn-primary btn-sm">Editar</button></td>
            </tr>`;
        });
    });
}
//getPersonas();

function getPersona(id){
    fetch(`http://127.0.0.1:3002/persona/${id}`)
    .then(res => res.json())
    .then(json => {
        var titulo = document.getElementsByClassName("titulo-form");
        titulo[0].textContent = "Editar Persona";
        document.getElementById("nombre").value = json[0].nombre;
        document.getElementById("apellido").value = json[0].apellido;
        document.getElementById("edad").value = json[0].edad;
        form_persona.classList.add('editar');
        form_persona.classList.remove('register');
      
    })
    .catch(error=>console.log(error));
    
}

document.addEventListener("click",e=>{
    if(e.target.matches(".btn-editar")){        
        getPersona(e.target.dataset.idpersona);
    }
});

form_persona.addEventListener("submit",e=>{
    e.preventDefault();
    var data2 = {
        nombre: document.getElementById('nombre').value,
        apellido :document.getElementById('apellido').value,
        edad :document.getElementById('edad').value
    }
    console.log(data2)
    

    

    if(e.target.matches(".register")){
        fetch(`http://127.0.0.1:3002/addPersona`,{
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data2), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }})
        .then((response)=>console.log(response))
        .catch((error)=>console.error(error));
    }

    if(e.target.matches(".editar")){
        console.log("editar");
    }
})





