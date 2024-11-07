const wrapper = document.querySelector('.wrapper2')
const registerLink = document.querySelector('.register-link')
const loginLink = document.querySelector('.login-link')
const SecondSignup = document.querySelector('.Second-SignUp')
registerLink.onclick = () => wrapper.classList.add('active');
loginLink.onclick = () => wrapper.classList.toggle('active', false);


// making the lable field dissapper ...while using input field
const inputBoxes = document.querySelectorAll('.input-box');

inputBoxes.forEach(inputBox => {
    const input = inputBox.querySelector('input');
    const label = inputBox.querySelector('label');

    input.addEventListener('input', () => {
        if (input.value !== '') {
            label.style.display = 'none';
        } else {
            label.style.display = 'block';
        }
    });
});
