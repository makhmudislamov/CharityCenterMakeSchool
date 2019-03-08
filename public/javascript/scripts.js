if (document.querySelector('#new-org')) {
    document.querySelector('#new-org').addEventListener('submit', (e) => {
        e.preventDefault();

        let charity = {};
        const inputs = document.querySelectorAll('.form-control');
        for (const input of inputs) {
            pet[input.name] = input.value;
        }

        axios.post('/orgs', charity)
            .then(function (response) {
                window.location.replace(`/orgs/${response.data.pet._id}`);
            })
            .catch(function (error) {
                const alert = document.getElementById('alert')
                alert.classList.add('alert-warning');
                alert.textContent = 'Oops, something went wrong saving your charity. Please check your information and try again.';
                alert.style.display = 'block';
            });
    });
}