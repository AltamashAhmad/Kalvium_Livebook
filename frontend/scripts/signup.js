const API_URL = 'http://localhost:5001/auth/register'; // Update to your signup endpoint

document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const notification = document.getElementById('notification');

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            notification.className = 'notification success'; // Set success class
            notification.innerText = 'Signup successful! You can now log in.';
            notification.style.display = 'block'; // Show notification
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login page after 2 seconds
            }, 2000);
        } else {
            notification.className = 'notification error'; // Set error class
            notification.innerText = data.message || 'Signup failed. Please try again.';
            notification.style.display = 'block'; // Show notification
        }
    } catch (error) {
        console.error('Error during signup:', error);
        notification.className = 'notification error'; // Set error class
        notification.innerText = 'An error occurred. Please try again later.';
        notification.style.display = 'block'; // Show notification
    }
}); 