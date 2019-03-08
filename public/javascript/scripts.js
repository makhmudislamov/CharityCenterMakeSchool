if (document.querySelector('#new-org')) {
    document.querySelector('#new-org').addEventListener('submit', (e) => {
        e.preventDefault();

        let charity = {};
        const inputs = document.querySelectorAll('.form-control');
        for (const input of inputs) {
            charity[input.organziationName] = input.value;
        }

        axios.post('/orgs', charity)
            .then(function (response) {
                window.location.replace(`/orgs/${response.data.charity._id}`);
            })
            .catch(function (error) {
                const alert = document.getElementById('alert')
                alert.classList.add('alert-warning');
                alert.textContent = 'Oops, something went wrong saving your charity. Please check your information and try again.';
                // TODO: below line should work with layout alert part
                alert.style.display = 'block';
            });
    });
}