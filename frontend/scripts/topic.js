const API_URL = 'http://localhost:5001/api';
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');
const moduleIndex = urlParams.get('moduleIndex');
const topicIndex = urlParams.get('topicIndex');

async function fetchTopicContent() {
    try {
        const response = await fetch(`${API_URL}/courses/${courseId}`);
        const course = await response.json();
        
        // Update breadcrumb with course title and link
        const courseBreadcrumb = document.getElementById('courseBreadcrumb');
        courseBreadcrumb.textContent = course.title;
        courseBreadcrumb.href = `course-details.html?id=${courseId}`;
        
        // Get module and topic
        const module = course.modules[moduleIndex];
        const topic = module.topics[topicIndex];
        
        // Update topic breadcrumb and content
        document.getElementById('topicBreadcrumb').textContent = topic.title;
        document.getElementById('topicTitle').textContent = topic.title;
        document.getElementById('topicContent').innerHTML = topic.content;
        
        // Update document title
        document.title = `${topic.title} - ${course.title} - Kalvium LiveBooks`;
    } catch (error) {
        console.error('Error fetching topic content:', error);
        document.getElementById('topicContent').innerHTML = 
            '<div class="error-message">Error loading content. Please try again.</div>';
    }
}

document.addEventListener('DOMContentLoaded', fetchTopicContent); 