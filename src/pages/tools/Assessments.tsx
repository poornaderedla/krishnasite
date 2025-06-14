import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const assessments = [
  {
    name: "Entrepreneurial Potential Assessment",
    description: "Evaluate your entrepreneurial mindset, risk tolerance, and innovation capacity to identify your startup strengths.",
    slug: "entrepreneurial-potential"
  },
  {
    name: "Productivity Style Quiz",
    description: "Discover your unique productivity archetype and learn how to optimize your workflow for maximum output.",
    slug: "productivity-style"
  },
  {
    name: "Emotional Intelligence (EQ) Evaluator",
    description: "Assess your self-awareness, empathy, and emotional regulation skills for better leadership and collaboration.",
    slug: "emotional-intelligence"
  },
  {
    name: "Resilience Score Analyzer",
    description: "Measure your ability to adapt, recover, and thrive under pressure in demanding environments.",
    slug: "resilience-score"
  },
  {
    name: "Leadership Archetype Assessment",
    description: "Uncover your core leadership style and learn how to leverage your strengths to inspire and guide others.",
    slug: "leadership-archetype"
  },
  {
    name: "Burnout Risk Assessment",
    description: "Identify early warning signs of burnout and receive personalized strategies for sustainable high performance.",
    slug: "burnout-risk"
  },
  {
    name: "Mental Fitness Index",
    description: "Gauge your cognitive stamina, focus endurance, and mental agility to unlock your peak performance.",
    slug: "mental-fitness-index"
  }
];

const Assessments = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBegin = (assessmentSlug: string) => {
    setCurrentAssessment(assessmentSlug);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save user data to localStorage
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userAge', formData.age);
      localStorage.setItem('userGender', formData.gender);

      setShowModal(false);
      
      // Navigate to assessment after form submission
      switch (currentAssessment) {
        case 'leadership-archetype':
          navigate('/assessment/leadership');
          break;
        case 'resilience-score':
          navigate('/assessment/resiliencescoreanalyzer');
          break;
        case 'burnout-risk':
          navigate('/assessment/burnoutriskassessment');
          break;
        case 'productivity-style':
          navigate('/assessment/productivity-style-quiz');
          break;
        case 'entrepreneurial-potential':
          navigate('/assessment/entrepreneurial-potential');
          break;
        case 'emotional-intelligence':
          navigate('/assessment/emotionalintelligenceevaluator');
          break;
        case 'mental-fitness-index':
          navigate('/assessment/mental-fitness-index');
          break;
        default:
          console.error('Unknown assessment type:', currentAssessment);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to start assessment. Please try again.');
    }
  };

  return (
    <div>
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair">Assessments</h1>
            <p className="text-xl text-gray-700 mb-6">
              Actionable self-assessments designed to help you understand your strengths, identify growth opportunities, and accelerate your journey to high performance.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
              <li>Gain clarity on your unique performance drivers and blind spots</li>
              <li>Receive tailored recommendations for personal and professional growth</li>
              <li>Track your progress and measure improvement over time</li>
              <li>Confidential, research-backed, and instantly actionable</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section pt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assessment) => (
              <div
                key={assessment.slug}
                className="bg-white p-8 flex flex-col justify-between min-h-[240px] cursor-pointer border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-2xl hover:border-black hover:scale-[1.03]"
                onClick={() => handleBegin(assessment.slug)}
              >
                <div className="flex-1">
                  <h2 className="font-playfair text-xl mb-3 text-black">{assessment.name}</h2>
                  <p className="text-gray-700 text-base mb-4">{assessment.description}</p>
                </div>
                <button
                  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition font-semibold text-sm tracking-wide"
                  onClick={e => {
                    e.stopPropagation();
                    handleBegin(assessment.slug);
                  }}
                >
                  Begin Assessment
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Modal for user information */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold mb-4">Let me Know About You</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-2xl"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Age</label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-2xl"
                  required
                >
                  <option value="">Select Age</option>
                  <option value="11 to 17">11 to 17</option>
                  <option value="18 to 24">18 to 24</option>
                  <option value="25 to 34">25 to 34</option>
                  <option value="35 to 44">35 to 44</option>
                  <option value="45 to 54">45 to 54</option>
                  <option value="55 to 64">55 to 64</option>
                  <option value="65+">65+</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-2xl"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-2xl hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-2xl hover:bg-gray-800 transition"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessments;