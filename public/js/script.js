const hi = $('.this')

function show(e){
    e.preventDefault()

    if (e.target.innerText === 'submit'){
        const emils = $('#email')
        const pswrd = $('#password')
        const nwpass = {
            email: emils.val(),
            password: pswrd.val()
        }
        console.log(nwpass)
        fetch('/register',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(nwpass)
        }).then(res =>{
            console.log(res)
            window.location = '/'
        })
    }
 console.log(e.target.textarea)
}
hi.on('click',show)