


const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message1')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('form submitted!')
    const searchAddress = searchInput.value
    fetch('/weather?address='+searchAddress).then((response) => {
        response.json().then((data) => {
            console.log(data)
            messageOne.textContent = JSON.stringify(data)
        })
    })
})