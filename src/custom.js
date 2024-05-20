const http = new XMLHttpRequest()
let result = document.getElementById('result')
let city = document.getElementById('city')
let country = document.getElementById('country')
let region = document.getElementById('region')

var t1Hours = document.getElementById('t1Hours')
var t1Minutes = document.getElementById('t1Minutes')
var t1Seconds = document.getElementById('t1Seconds')

var t2Hours = document.getElementById('t2Hours')
var t2Minutes = document.getElementById('t2Minutes')
var t2Seconds = document.getElementById('t2Seconds')

document.querySelector("#share").addEventListener
    ("click", () => {
        findMyCoordinates()
    }
    )

function findMyCoordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition
            ((position) => {
                const bdcAPI = `https://api.bigdatacloud.net/data/reverse-geocode-client?
                latitude=${position.coords.latitude}&
                longitude=${position.coords.longitude}&`
                getAPI(bdcAPI)
            },
                (error) => {
                    alert(error.message)
                }

            )

    } else {
        alert("Geolocation is not supported by this browser.")
    }
}

function getAPI(bdcAPI) {
    http.open("GET", bdcAPI)
    http.send()
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            console.log(data)

            city.innerHTML = data.city
            country.innerHTML = data.countryName
            region.innerHTML = data.principalSubdivision
            //result.innerHTML = this.responseText
        }
    }



}

let time = 9000
function timer() {
    
    let interval = setInterval(() => {
        time--
        let hours = Math.trunc(time / 3600)
        let minutes = Math.trunc((time % 3600) / 60)
        let seconds = time % 60 

        t1Hours.innerHTML = hours
        t1Minutes.innerHTML = minutes
        t1Seconds.innerHTML = seconds

        t2Hours.innerHTML = hours
        t2Minutes.innerHTML = minutes
        t2Seconds.innerHTML = seconds

        if (time == 0) {
            clearInterval(interval)
            
        }
    }, 1000)
}
window.onload = findMyCoordinates()
window.onload = timer()

