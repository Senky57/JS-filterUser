const result = document.querySelector(".user-list");
const input = document.querySelector(".input-filter")
const userList = [];

getData();

//Naslouchávač; to (e) je jako event
input.addEventListener("input", function(e){
    dataFilter(e.target.value);

});
//-------------ŘEŠÍME TU API------
//sync = čeká až se dokončí
//async = jede a jede
async function getData(){
    //počkej, až stáhnu ty data
    const allUsers = await fetch("https://randomuser.me/api?results=50");
    //Uložili jsme to do strojový podoby

    //JSON to vzal a přeložil do nějaký lepší čitelnější podoby, kterou líp chápe jak počítač, tak i my jako lidi
    const data = await allUsers.json();
    console.log(data);

    //Vyčistí seznam uživatelů <ul></ul>
    result.innerHTML = "";

    data.results.forEach(user =>{
        const li = document.createElement("li");

        //Tajty uvozovky je dobrý napsat v EN klávesnici a dát klávesu hned pod ESC -- jsou to takový divný uvozovky do stran, kdo ví proč to tak je
        //Tajty údaje uživatelů najdeš v konzoli právě přes to API
        //Má to syntaxi přes ${}
        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-information">
                <h3>${user.name.first} ${user.name.last}</h3>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
            `
        result.appendChild(li);

        //Pushuj tam další a další <li></li>
        userList.push(li);
    });
}

//Člověk musí myslet i na to, že to má hledat přesně podle zadaných písmen, i to jestli to je malý/velký písmenko
function dataFilter(inputText){
    userList.forEach(oneUser => {
        if(oneUser.innerText.toLowerCase().includes(inputText.toLowerCase())){
            oneUser.classList.remove("hide");
        } else{
            oneUser.classList.add("hide");
        }
    });
}