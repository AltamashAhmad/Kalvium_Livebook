require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const Module = require('./models/Module');

const initialData = {
    courses: [
        {
            title: "Elements of AI",
            description: "Learn the fundamentals of Artificial Intelligence and its applications",
            image: "http://localhost:5001/assets/images/Elements_of_AI.png",
            moduleCount: 4,
            duration: "10 weeks",
            modules: [
                {
                    title: "Introduction to AI",
                    topics: [
                        {
                            title: "What is Artificial Intelligence?",
                            content: `
                                Artificial Intelligence (AI) is the simulation of human intelligence by machines. 
                                
                                Key Concepts:
                                • Intelligence: The ability to acquire and apply knowledge
                                • Artificial: Human-made, simulated behavior
                                • Machine Learning: Systems that can learn from experience
                                
                                Types of AI:
                                1. Narrow AI (Weak AI)
                                   - Designed for specific tasks
                                   - Examples: Siri, Chess computers
                                
                                2. General AI (Strong AI)
                                   - Matches human intelligence
                                   - Still theoretical
                                
                                3. Super AI
                                   - Surpasses human intelligence
                                   - Currently hypothetical
                                
                                Why Study AI?
                                • Growing field with numerous applications
                                • Shapes future technology
                                • High demand for AI professionals
                                • Impacts various industries
                            `
                        },
                        {
                            title: "History of AI Development",
                            content: `
                                The Evolution of Artificial Intelligence

                                1. Early Beginnings (1940s-1950s)
                                   • 1943: McCulloch-Pitts artificial neuron
                                   • 1950: Turing Test proposed
                                   • 1956: Dartmouth Conference coins "Artificial Intelligence"

                                2. The Golden Years (1956-1974)
                                   • Natural Language Processing development
                                   • Early expert systems
                                   • Pattern recognition advances
                                   • First chatbots (ELIZA)

                                3. First AI Winter (1974-1980)
                                   • Funding cuts
                                   • Limited computing power
                                   • Complexity of real-world problems

                                4. Expert Systems Era (1980-1987)
                                   • Rule-based programming
                                   • Commercial applications
                                   • Industry adoption

                                5. Second AI Winter (1987-1993)
                                   • Hardware limitations
                                   • Expensive maintenance
                                   • Limited scope

                                6. Modern AI Era (1993-Present)
                                   • Deep Learning revolution
                                   • Big Data availability
                                   • Improved computing power
                                   • Major breakthroughs (AlphaGo, GPT, etc.)
                            `
                        },
                        {
                            title: "Types of AI Systems",
                            content: `
                                Classification of AI Systems

                                1. Based on Capabilities
                                   
                                   Narrow AI (ANI)
                                   • Task-specific intelligence
                                   • Examples: 
                                     - Virtual assistants
                                     - Image recognition
                                     - Recommendation systems
                                   
                                   General AI (AGI)
                                   • Human-level intelligence
                                   • Characteristics:
                                     - Self-awareness
                                     - Problem-solving
                                     - Learning ability
                                   
                                   Super AI (ASI)
                                   • Surpasses human intelligence
                                   • Theoretical capabilities:
                                     - Self-improvement
                                     - Innovation
                                     - Complex decision-making

                                2. Based on Functionality
                                   
                                   Reactive Machines
                                   • No memory/past experience
                                   • Responds to current situations
                                   • Example: Deep Blue (Chess)
                                   
                                   Limited Memory
                                   • Uses historical data
                                   • Temporary memory
                                   • Example: Self-driving cars
                                   
                                   Theory of Mind
                                   • Understands emotions
                                   • Social interaction
                                   • Future development
                                   
                                   Self-Aware
                                   • Conscious systems
                                   • Human-like consciousness
                                   • Currently theoretical
                            `
                        },
                        {
                            title: "Real-world AI Applications",
                            content: `
                                Current Applications of AI in Various Industries

                                1. Healthcare
                                   • Disease Diagnosis
                                   • Drug Discovery
                                   • Patient Care
                                   • Medical Imaging
                                   • Predictive Analytics

                                2. Finance
                                   • Fraud Detection
                                   • Algorithmic Trading
                                   • Risk Assessment
                                   • Customer Service
                                   • Personal Banking

                                3. Transportation
                                   • Autonomous Vehicles
                                   • Traffic Management
                                   • Route Optimization
                                   • Predictive Maintenance
                                   • Safety Systems

                                4. Education
                                   • Personalized Learning
                                   • Automated Grading
                                   • Student Assessment
                                   • Administrative Tasks
                                   • Learning Analytics

                                5. Entertainment
                                   • Content Recommendations
                                   • Game AI
                                   • Virtual Reality
                                   • Content Creation
                                   • User Experience

                                6. Business
                                   • Customer Service
                                   • Process Automation
                                   • Market Analysis
                                   • Supply Chain
                                   • Decision Support

                                Impact and Future Trends:
                                • Increasing Automation
                                • Job Market Changes
                                • Ethical Considerations
                                • Privacy Concerns
                                • Regulatory Challenges
                            `
                        }
                    ]
                },
                {
                    title: "Problem Solving",
                    topics: [
                        { title: "Search Algorithms", content: "Search content" },
                        { title: "Heuristic Methods", content: "Heuristics content" },
                        { title: "Game Theory", content: "Game Theory content" },
                        { title: "Optimization Techniques", content: "Optimization content" }
                    ]
                },
                {
                    title: "Machine Learning",
                    topics: [
                        { title: "Supervised Learning", content: "Supervised content" },
                        { title: "Unsupervised Learning", content: "Unsupervised content" },
                        { title: "Reinforcement Learning", content: "Reinforcement content" },
                        { title: "Model Evaluation", content: "Evaluation content" }
                    ]
                },
                {
                    title: "Neural Networks",
                    topics: [
                        { title: "Basic Neural Network Architecture", content: "Architecture content" },
                        { title: "Deep Learning Fundamentals", content: "Deep Learning content" },
                        { title: "Training Neural Networks", content: "Training content" },
                        { title: "Model Evaluation", content: "Evaluation content" }
                    ]
                }
            ]
        }
    ]
};

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