searchLocation = (location) => {
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.getElementById('message-1').textContent = data.error;
            } else {
                document.getElementById('message-1').textContent = data.location
                document.getElementById('message-2').textContent = data.forecast 
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
}
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value
    searchLocation(location)
})