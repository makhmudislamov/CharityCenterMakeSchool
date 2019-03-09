
if (document.querySelector('#new-org')) {
    document.querySelector('#new-org').addEventListener('submit', (e) => {
        e.preventDefault();
        var form = document.getElementById("orgs-new");
        var charity = new FormData(form);
        
        axios.post('/orgs', charity, {
            headers: {
                'Content-Type': 'multipart/form-data;',
            }
        })
            .then(function (response) {
                window.location.replace(`/orgs/${response.data.charity._id}`);
            })
            .catch(function (error) {
                const alert = document.getElementById('alert')
                alert.classList.add('alert-warning');
                alert.textContent = 'Oops, something went wrong saving your charity. Please check your information and try again.';
                alert.style.display = 'block';
                setTimeout(() => {
                    alert.style.display = 'none';
                    alert.classList.remove('alert-warning');
                }, 3000)
            });
    });
}