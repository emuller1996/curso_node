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
        form_persona.setAttribute("action","http://127.0.0.1:3002/update")
        form_persona.setAttribute("method","get")
      
    })
    .catch(error=>console.log(error));
    
}

document.addEventListener("click",e=>{
    if(e.target.matches(".btn-editar")){        
        getPersona(e.target.dataset.idpersona);
    }
});





