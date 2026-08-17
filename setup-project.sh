#!/usr/bin/env bash
echo "🚀 Setting up Online Job Portal MERN Stack Project..."
node build-project.js
echo "📦 Installing root dependencies..."
npm install
echo "📦 Installing backend dependencies..."
cd backend && npm install
echo "📦 Installing frontend dependencies..."
cd ../frontend && npm install
cd ..
echo "✅ Setup complete! Run 'npm run dev' to start the application."
