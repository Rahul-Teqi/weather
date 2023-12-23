



const weatherForm = document.querySelector('form');
const AddressElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent =""
    messageTwo.textContent  ="Loading..."
    const Location = AddressElement.value

    if(!Location){
        console.log("Please provide address");
        return 0
    }

    fetch('http://localhost:3000/weather?address="'+Location+'"').then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
                messageOne.innerHTML = data.error
                messageTwo.textContent  =""
            }else{
                console.log(data.location);
                console.log(data.Temp);
                messageTwo.innerHTML = data.location+"<br>"+ data.forecast+". It's currently "+data.Temp+". It feels like "+data.feelslike+" C."
            }
        })
    })

})