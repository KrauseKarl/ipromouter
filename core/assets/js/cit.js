let arr = ["Москва", "Санкт-Петербург", "Омск и Омская область", "Новосибирск и Новосибирская область", "Тюмень и Тюменская область", "Екатеринбург и Свердовская область", "Самара и Самарская область", "Казань и Татарстан", "Нижний Новгород и Нижегородская область",]

const updateResult = query=>{
    let resultList = document.querySelector(".result");
    resultList.innerHTML = "";

    arr.map(algo=>{
        query.split(" ").map(word=>{
            if (algo.toLowerCase().indexOf(word.toLowerCase()) != -1) {
                resultList.innerHTML += `<li class="list-group-item">${algo}</li>`;
            }
        }
        )
    }
    )
}

updateResult("")