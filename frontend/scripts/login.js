const API_URL = 'http://localhost:5001/auth/login'; // Update to your login endpoint

document.getElementById('loginForm').addEventListener('submit', async (event) => {
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
            notification.innerText = 'Login successful!';
            notification.style.display = 'block'; // Show notification
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to the main page after 2 seconds
            }, 2000);
        } else {
            notification.className = 'notification error'; // Set error class
            notification.innerText = data.message || 'Login failed. Please try again.';
            notification.style.display = 'block'; // Show notification
        }
    } catch (error) {
        console.error('Error during login:', error);
        notification.className = 'notification error'; // Set error class
        notification.innerText = 'An error occurred. Please try again later.';
        notification.style.display = 'block'; // Show notification
    }
}); 