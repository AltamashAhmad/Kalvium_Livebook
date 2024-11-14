require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const Module = require('./models/Module');
const fs = require('fs').promises;
const path = require('path');

// Replace the initialData object with a function to read course files
async function loadCourseData() {
    const coursesDir = path.join(__dirname, 'courses');
    const files = await fs.readdir(coursesDir);
    const courses = [];

    for (const file of files) {
        if (file.endsWith('.json')) {
            const filePath = path.join(coursesDir, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            courses.push(JSON.parse(fileContent));
        }
    }

    return { courses };
}

async function seedDatabase() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect("mongodb://127.0.0.1:27017/kalvium-livebooks");
        console.log('Connected to MongoDB');

        // Clear existing data
        console.log('Clearing existing data...');
        await Course.deleteMany({});
        await Module.deleteMany({});

        // Load course data from files
        const initialData = await loadCourseData();

        // Create courses and modules
        for (const courseData of initialData.courses) {
            console.log(`Creating course: ${courseData.title}`);
            
            // Create course without modules first
            const course = new Course({
                title: courseData.title,
                description: courseData.description,
                image: courseData.image,
                moduleCount: courseData.moduleCount,
                duration: courseData.duration,
                modules: [] // Initialize empty modules array
            });
            
            await course.save();
            console.log('Course created successfully');

            // Create and link modules
            const moduleIds = [];
            for (const moduleData of courseData.modules) {
                console.log(`Creating module: ${moduleData.title}`);
                
                const module = new Module({
                    title: moduleData.title,
                    courseId: course._id,
                    topics: moduleData.topics
                });
                
                await module.save();
                moduleIds.push(module._id);
                console.log('Module created successfully');
            }

            // Update course with module references
            course.modules = moduleIds;
            await course.save();
            console.log('Course updated with modules');
        }

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase(); 