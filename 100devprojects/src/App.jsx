import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectPage from './pages/ProjectPage'
import Header from './components/Header'
import Footer from './components/Footer'
export default function App() {
return (
<BrowserRouter>
<div className="min-h-screen flex flex-col">
<Header />
<main className="flex-1 container mx-auto px-4 py-6">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/projects" element={<Projects />} />
<Route path="/projects/:slug" element={<ProjectPage />} />
</Routes>
</main>
<Footer />
</div>
</BrowserRouter>
)
}