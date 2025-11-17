import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import Layout from './components/Layout'
import BusinessForm from './components/BusinessForm'
import Results from './components/Results'

function App() {
  const [data, setData] = useState(null)

  return (
    <Layout>
      <Hero />
      <section id="form" className="relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-white/80 backdrop-blur shadow-xl p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900">Tell us about your business</h2>
            <p className="text-gray-600 mb-4">One form builds your entire AI-powered operations hub.</p>
            <BusinessForm onGenerated={setData} />
          </motion.div>
        </div>
      </section>

      <section id="results" className="mt-8">
        <div className="max-w-7xl mx-auto px-6">
          {data ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Results data={data} />
            </motion.div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-600 bg-white/60">
              Generated results will appear here after you submit the form.
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default App
