const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const Company = require('./models/Company');
const Job = require('./models/Job');
const Application = require('./models/Application');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedData = async () => {
  try {
    console.log('🧹 Clearing existing collections...');
    await User.deleteMany();
    await Company.deleteMany();
    await Job.deleteMany();
    await Application.deleteMany();

    console.log('👤 Creating demo users...');
    // Create Users (Pre-save hook will hash passwords)
    const admin = await User.create({
      name: 'System Administrator',
      email: 'admin@jobportal.com',
      password: 'admin123',
      role: 'Admin',
      phone: '+1 (800) 555-0199',
    });

    const employer1 = await User.create({
      name: 'Alex Morgan',
      email: 'employer@techcorp.com',
      password: 'employer123',
      role: 'Employer',
      phone: '+1 (415) 555-2671',
    });

    const employer2 = await User.create({
      name: 'Sarah Jenkins',
      email: 'sarah@cloudscale.io',
      password: 'employer123',
      role: 'Employer',
      phone: '+1 (650) 555-9012',
    });

    const seeker1 = await User.create({
      name: 'John Doe',
      email: 'seeker@dev.com',
      password: 'seeker123',
      role: 'Job Seeker',
      phone: '+1 (408) 555-7890',
    });

    const seeker2 = await User.create({
      name: 'Emily Watson',
      email: 'emily@designpro.com',
      password: 'seeker123',
      role: 'Job Seeker',
      phone: '+1 (206) 555-4321',
    });

    console.log('🏢 Creating companies...');
    const company1 = await Company.create({
      companyName: 'TechCorp Innovations',
      description: 'Pioneering intelligent full-stack solutions and next-generation cloud architectures.',
      website: 'https://techcorp.example.com',
      location: 'San Francisco, CA',
      owner: employer1._id,
    });

    const company2 = await Company.create({
      companyName: 'CloudScale Systems',
      description: 'Enterprise cloud infrastructure, container orchestration, and high-throughput microservices.',
      website: 'https://cloudscale.example.com',
      location: 'Seattle, WA',
      owner: employer2._id,
    });

    console.log('💼 Creating sample job postings...');
    const futureDate = (days) => {
      const d = new Date();
      d.setDate(d.getDate() + days);
      return d;
    };

    const jobs = await Job.create([
      {
        title: 'Senior Full-Stack MERN Developer',
        company: company1._id,
        companyName: company1.companyName,
        location: 'San Francisco, CA (Remote)',
        salary: '$130,000 - $160,000 / yr',
        experience: 'Senior Level',
        jobType: 'Full-time',
        skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Docker'],
        description: 'TechCorp is looking for an experienced Senior Full-Stack MERN Engineer to lead core feature development, architect highly scalable REST APIs, and craft ultra-responsive React interfaces. Experience with modern state management, microservices, and automated testing is highly desired.',
        deadline: futureDate(30),
        postedBy: employer1._id,
      },
      {
        title: 'React Frontend Engineer',
        company: company1._id,
        companyName: company1.companyName,
        location: 'New York, NY (Hybrid)',
        salary: '$105,000 - $135,000 / yr',
        experience: 'Mid Level',
        jobType: 'Full-time',
        skills: ['React', 'JavaScript', 'CSS3', 'Redux Toolkit', 'Vite', 'REST APIs'],
        description: 'We are seeking a talented React Frontend Engineer passionate about clean design systems, responsive UI animations, and seamless user experiences. You will collaborate closely with UI/UX designers and backend developers.',
        deadline: futureDate(25),
        postedBy: employer1._id,
      },
      {
        title: 'Backend Node.js & Microservices Architect',
        company: company1._id,
        companyName: company1.companyName,
        location: 'Austin, TX (Remote)',
        salary: '$145,000 - $180,000 / yr',
        experience: 'Lead / Executive',
        jobType: 'Full-time',
        skills: ['Node.js', 'Express', 'MongoDB', 'Redis', 'AWS', 'Microservices'],
        description: 'Architect and scale high-performance backend microservices. You will oversee database schema design, caching strategies, JWT security architectures, and message queue implementations.',
        deadline: futureDate(45),
        postedBy: employer1._id,
      },
      {
        title: 'DevOps & Cloud Infrastructure Engineer',
        company: company2._id,
        companyName: company2.companyName,
        location: 'Seattle, WA (Remote)',
        salary: '$125,000 - $155,000 / yr',
        experience: 'Senior Level',
        jobType: 'Full-time',
        skills: ['AWS', 'Kubernetes', 'Docker', 'CI/CD', 'Terraform', 'Linux'],
        description: 'CloudScale Systems is hiring a DevOps Engineer to maintain automated CI/CD deployment pipelines, manage Kubernetes clusters, monitor system health, and ensure 99.99% uptime.',
        deadline: futureDate(20),
        postedBy: employer2._id,
      },
      {
        title: 'UI/UX Product Designer',
        company: company2._id,
        companyName: company2.companyName,
        location: 'Remote (Anywhere)',
        salary: '$95,000 - $125,000 / yr',
        experience: 'Mid Level',
        jobType: 'Remote',
        skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'User Research'],
        description: 'Design intuitive, world-class user interfaces and design systems for enterprise SaaS applications. Strong portfolio demonstrating web and mobile workflows required.',
        deadline: futureDate(15),
        postedBy: employer2._id,
      },
      {
        title: 'Junior Frontend Developer (Internship)',
        company: company1._id,
        companyName: company1.companyName,
        location: 'San Jose, CA (Onsite)',
        salary: '$50,000 - $65,000 / yr',
        experience: 'Entry Level',
        jobType: 'Internship',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React Basics', 'Git'],
        description: 'Exciting internship opportunity for aspiring web developers! Work under senior mentors, contribute to real production React components, and accelerate your engineering career.',
        deadline: futureDate(14),
        postedBy: employer1._id,
      },
    ]);

    console.log('📝 Creating sample applications...');
    await Application.create([
      {
        jobId: jobs[0]._id, // Senior Full-Stack Developer
        applicantId: seeker1._id, // John Doe
        resume: '/uploads/sample_resume_john_doe.pdf',
        coverLetter: 'I have over 5 years of experience architecting MERN applications, building performant React frontends and scalable Express APIs. I would love to contribute to TechCorp!',
        status: 'Pending',
      },
      {
        jobId: jobs[4]._id, // UI/UX Product Designer
        applicantId: seeker2._id, // Emily Watson
        resume: '/uploads/sample_resume_emily_watson.pdf',
        coverLetter: 'Experienced product designer with a passion for sleek micro-interactions and accessible component libraries. Looking forward to connecting!',
        status: 'Accepted',
      },
    ]);

    console.log('🎉 Database seeding completed successfully!');
    console.log('--------------------------------------------------');
    console.log('🔑 Demo Login Accounts:');
    console.log('   Admin:      admin@jobportal.com       / admin123');
    console.log('   Employer:   employer@techcorp.com     / employer123');
    console.log('   Job Seeker: seeker@dev.com            / seeker123');
    console.log('--------------------------------------------------');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
};

// If run directly from terminal
if (require.main === module) {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/job_portal_db';
  mongoose
    .connect(uri)
    .then(async () => {
      console.log(`✅ Connected to MongoDB: ${uri}`);
      await seedData();
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB');
      process.exit(0);
    })
    .catch(async (err) => {
      console.warn(`⚠️ Could not connect to local MongoDB (${err.message}). Trying memory server for standalone seed verification...`);
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const memoryServer = await MongoMemoryServer.create();
        const memUri = memoryServer.getUri();
        await mongoose.connect(memUri);
        await seedData();
        await mongoose.disconnect();
        await memoryServer.stop();
        console.log('✅ Seed verification passed via in-memory server.');
        process.exit(0);
      } catch (memErr) {
        console.error('❌ Seeder error:', memErr);
        process.exit(1);
      }
    });
}

module.exports = { seedData };
