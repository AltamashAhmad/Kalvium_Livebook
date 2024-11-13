const API_URL = 'http://localhost:5001/api';
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

let currentCourse = null;

async function fetchCourseDetails() {
    try {
        console.log('Fetching course details for ID:', courseId);
        const response = await fetch(`${API_URL}/courses/${courseId}`);
        const data = await response.json();
        console.log('Received course data:', data);
        currentCourse = data;
        return data;
    } catch (error) {
        console.error('Error fetching course details:', error);
        return null;
    }
}

async function renderCourseDetails() {
    const course = await fetchCourseDetails();
    if (!course) {
        document.querySelector('.course-details').innerHTML = '<h2>Course not found</h2>';
        return;
    }

    console.log('Rendering course:', course);

    // Update course header
    document.querySelector('.course-header').innerHTML = `
        <img src="${course.image}" alt="${course.title}" class="course-image">
        <div class="course-info">
            <h1>${course.title}</h1>
            <p>${course.description}</p>
            <div class="course-meta">
                <span>${course.moduleCount} Modules</span>
                <span>${course.duration}</span>
            </div>
        </div>
    `;

    // Render modules
    const modulesList = document.querySelector('.modules-list');
    modulesList.innerHTML = '';

    if (course.modules && course.modules.length > 0) {
        console.log('Rendering modules:', course.modules);
        
        course.modules.forEach((module, moduleIndex) => {
            console.log('Rendering module:', module);
            
            const moduleElement = document.createElement('div');
            moduleElement.className = 'module';
            moduleElement.innerHTML = `
                <div class="module-header">
                    <h3>${module.title}</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="module-content">
                    <ul>
                        ${module.topics.map((topic, topicIndex) => `
                            <li>
                                <label class="topic-label" data-module="${moduleIndex}" data-topic="${topicIndex}">
                                    <span class="topic-text">${topic.title}</span>
                                </label>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;

            modulesList.appendChild(moduleElement);
        });

        // Add click handlers
        document.querySelectorAll('.module-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('i');
                content.classList.toggle('active');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            });
        });

        document.querySelectorAll('.topic-label').forEach(label => {
            label.addEventListener('click', () => {
                // Remove previous selection
                document.querySelectorAll('.topic-label').forEach(l => 
                    l.classList.remove('topic-selected'));
                
                // Add selection to clicked topic
                label.classList.add('topic-selected');
                
                const moduleIndex = label.dataset.module;
                const topicIndex = label.dataset.topic;
                const topic = course.modules[moduleIndex].topics[topicIndex];
                displayTopicContent(topic.content, topic.title);
            });
        });
    } else {
        console.log('No modules found in course data');
        modulesList.innerHTML = '<p>No modules available for this course.</p>';
    }
}

function displayTopicContent(content, topicTitle) {
    const contentArea = document.querySelector('.topic-content-display');
    contentArea.innerHTML = `
        <h2>${topicTitle}</h2>
        <div class="content-area">${content}</div>
    `;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', renderCourseDetails);