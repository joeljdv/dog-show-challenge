document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
     document.querySelector("#dog-form").addEventListener("submit",submitDog)
})

const dogsURL =  'http://localhost:3000/dogs'

function fetchDogs() {
    const table = document.getElementById("table-body")
    table.innerHTML=""
    fetch(dogsURL)
    .then(res => res.json()
    .then((data)=> {
        console.log(data)
        data.forEach(dog =>{
            table.innerHTML +=`
                <tr><td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td><button id=${dog.id}>Edit</button></td></tr>`
        })
       addEditDog()
    }))
}

function addEditDog(){
    const btn = document.querySelectorAll("button")
    btn.forEach(butn =>butn.addEventListener("click",editDog ))
}

function editDog(e) {
    const inputs = document.getElementById("dog-form")
    fetch(dogsURL+`/${e.target.id}`)
    .then(res => res.json())
    .then(dogs => {            
        console.log(dogs)
        inputs[0].value = `${dogs.name}`
        inputs[1].value = `${dogs.breed}`
        inputs[2].value = `${dogs.sex}` 
        inputs[0].setAttribute("id",`${dogs.id}`)
    })

}

function submitDog(e) { 
    e.preventDefault()
    const inputs = document.getElementById("dog-form")
    fetch(dogsURL+`/${inputs[0].id}`,{
        method:"PATCH",
        body: JSON.stringify({
            "name":inputs[0].value,
            "breed":inputs[1].value,
            "sex":inputs[2].value
        }),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"   
        }
    }) 
    .then(res => res.json())
    .then(dog => { 
        console.log(dog)
        inputs[0].value=""
        inputs[1].value=""
        inputs[2].value=""
        fetchDogs()
    })
}

