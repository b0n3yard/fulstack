const hi = $('.this')

function show(e){
    e.preventDefault()

    if (e.target.innerText === 'submit'){
        const emils = $('#email')
        const pswrd = document.querySelector('#password')
        console.log(emils.innerText)
        const nwpass = {
            email: emils.innerText,
            pass: pswrd.value
        }
        fetch('/register',{
            method: 'POST',
            headers:{
                'content-type':'aplication.json'
            },
            body:JSON.stringify()
        })
    }
 console.log(e.target.innerHtml)
}
hi.on('click',show)