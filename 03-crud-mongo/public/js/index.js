const tbody = document.getElementById('tableBody');
const form_persona = document.getElementById("form-persona");


document.addEventListener("DOMContentLoaded",getPersonas);


function getPersonas(){
    tbody.innerHTML="";

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
                <td>
                    <div id="btn-grupo" class="btn-group" role="group" >
                        <button data-idpersona=${el._id} type="button" class="btn-editar btn btn-warning"><i data-idpersona=${el._id} class="fas fa-edit"></i></button>
                        <button data-idpersona=${el._id} type="button" class="btn-borrar btn btn-danger"><i data-idpersona=${el._id} class="fas fa-trash-alt"></i></button>
                    </div>
                
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
        document.getElementById("id").value = json[0]._id;

        form_persona.classList.add('editar');
        form_persona.classList.remove('register');
      
    })
    .catch(error=>console.log(error));
    
}

document.addEventListener("click",e=>{
        

    if(e.target.matches(".btn-editar") || e.target.matches(".fa-edit") ){  
            
        getPersona(e.target.dataset.idpersona);
    }


    if (e.target.matches(".btn-borrar") || e.target.matches(".fa-trash-alt") ){
        console.log(e.target.dataset.idpersona);

        fetch(`http://127.0.0.1:3002/detelePerson`,{
            method: 'DELETE', // or 'PUT'
            body: JSON.stringify({id: e.target.dataset.idpersona}), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res =>{
            console.log(res);
            getPersonas();
        })
    }
});

form_persona.addEventListener("submit",e=>{
    e.preventDefault();
    var data2 = {
        id : document.getElementById('id').value,
        nombre: document.getElementById('nombre').value,
        apellido :document.getElementById('apellido').value,
        edad :document.getElementById('edad').value
    }
    

    

    if(e.target.matches(".register")){
        fetch(`http://127.0.0.1:3002/addPersona`,{
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data2), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }})
        .then((response)=>{
            console.log(response)
            getPersonas();
        })
        .catch((error)=>console.error(error));

        
    }

    if(e.target.matches(".editar")){
        console.log("editar",data2);

        fetch(`http://127.0.0.1:3002/update`,{
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(data2), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res =>{
            console.log(res);
            getPersonas();
        })

    }
})





