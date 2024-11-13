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
<div class="topic-content">
    <h1 class="topic-title">What is Artificial Intelligence?</h1>
    
    <div class="topic-introduction">
        <p>Artificial Intelligence (AI) is the simulation of human intelligence by machines.</p>
    </div>

    <div class="concept-section">
        <h2>Key Concepts</h2>
        <ul class="concept-list">
            <li><span class="concept-term">Intelligence:</span> The ability to acquire and apply knowledge</li>
            <li><span class="concept-term">Artificial:</span> Human-made, simulated behavior</li>
            <li><span class="concept-term">Machine Learning:</span> Systems that can learn from experience</li>
        </ul>
    </div>

    <div class="types-section">
        <h2>Types of AI</h2>
        
        <div class="ai-type">
            <h3>1. Narrow AI (Weak AI)</h3>
            <ul>
                <li>Designed for specific tasks</li>
                <li>Examples: Siri, Chess computers</li>
            </ul>
        </div>

        <div class="ai-type">
            <h3>2. General AI (Strong AI)</h3>
            <ul>
                <li>Matches human intelligence</li>
                <li>Still theoretical</li>
            </ul>
        </div>

        <div class="ai-type">
            <h3>3. Super AI</h3>
            <ul>
                <li>Surpasses human intelligence</li>
                <li>Currently hypothetical</li>
            </ul>
        </div>
    </div>

    <div class="why-study-section">
        <h2>Why Study AI?</h2>
        <ul class="benefits-list">
            <li>Growing field with numerous applications</li>
            <li>Shapes future technology</li>
            <li>High demand for AI professionals</li>
            <li>Impacts various industries</li>
        </ul>
    </div>
</div>

<style>
.topic-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

.topic-title {
    color: #2c3e50;
    font-size: 2.5em;
    margin-bottom: 20px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
}

.topic-introduction {
    font-size: 1.2em;
    color: #34495e;
    margin: 20px 0;
}

h2 {
    color: #2980b9;
    margin: 30px 0 15px 0;
}

h3 {
    color: #16a085;
    margin: 20px 0 10px 0;
}

.concept-term {
    font-weight: bold;
    color: #e74c3c;
}

ul {
    list-style-type: none;
    padding-left: 20px;
}

ul li {
    margin: 10px 0;
    position: relative;
}

ul li:before {
    content: "•";
    color: #3498db;
    font-weight: bold;
    position: absolute;
    left: -15px;
}

.ai-type {
    background: #f8f9fa;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    border-left: 4px solid #3498db;
}

.benefits-list li {
    background: #f5f6fa;
    padding: 10px 15px;
    margin: 5px 0;
    border-radius: 3px;
    transition: transform 0.2s;
}

.benefits-list li:hover {
    transform: translateX(10px);
    background: #e8f0fe;
}
</style>
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