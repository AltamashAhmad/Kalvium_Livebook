// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    body.setAttribute('data-theme', newTheme);
    
    // Update icon
    const icon = document.querySelector('#darkModeToggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    // Save preference
    localStorage.setItem('theme', newTheme);
}

// Function to initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    const icon = document.querySelector('#darkModeToggle i');
    if (savedTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Add event listener to toggle button
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', initializeTheme); 