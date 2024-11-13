const API_URL = 'http://localhost:5001/api';

// Store all courses globally so we can filter them
let allCourses = [];

async function fetchCourses() {
    try {
        const response = await fetch(`${API_URL}/courses`);
        const data = await response.json();
        allCourses = data; // Store all courses
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <img src="${course.image}" alt="${course.title}" class="course-image">
        <div class="course-info">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="course-meta">
                <span>${course.moduleCount} Modules</span>
                <span>${course.duration}</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        window.location.href = `course-details.html?id=${course._id}`;
    });

    return card;
}

// Add search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filteredCourses = allCourses.filter(course => {
            return (
                course.title.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm)
            );
        });
        
        renderFilteredCourses(filteredCourses);
    });
}

// Function to render filtered courses
function renderFilteredCourses(courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    
    if (courses.length === 0) {
        coursesGrid.innerHTML = `
            <div class="no-results">
                <h3>No courses found</h3>
                <p>Try different search terms</p>
            </div>
        `;
        return;
    }

    coursesGrid.innerHTML = '';
    courses.forEach(course => {
        const card = createCourseCard(course);
        coursesGrid.appendChild(card);
    });
}

async function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    
    // Show loading spinner
    coursesGrid.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
        </div>
    `;

    try {
        const courses = await fetchCourses();
        
        // Clear loading spinner
        coursesGrid.innerHTML = '';
        
        if (courses.length === 0) {
            coursesGrid.innerHTML = `
                <div class="no-results">
                    <h3>No courses available</h3>
                    <p>Please check back later</p>
                </div>
            `;
            return;
        }

        courses.forEach(course => {
            const card = createCourseCard(course);
            coursesGrid.appendChild(card);
        });
    } catch (error) {
        coursesGrid.innerHTML = `
            <div class="error-message">
                <h3>Oops! Something went wrong</h3>
                <p>Please try again later</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
    setupSearch();
}); 