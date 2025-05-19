'use client'

import { useState, useRef } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { fadeIn, scaleIn } from '@/utils/animations'

interface Question {
  id: number
  text: string
  options: {
    text: string
    type: 'creative' | 'technical' | 'balanced'
  }[]
}

interface Result {
  type: 'creative' | 'technical' | 'balanced'
  title: string
  description: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "When starting a new project, what's your first focus?",
    options: [
      { text: 'Visual design and user experience', type: 'creative' },
      { text: 'Technical architecture and performance', type: 'technical' },
      { text: 'Finding the right balance of both', type: 'balanced' },
    ],
  },
  {
    id: 2,
    text: 'How do you prefer to solve problems?',
    options: [
      { text: 'Through intuition and experimentation', type: 'creative' },
      { text: 'With logic and systematic analysis', type: 'technical' },
      { text: 'Using a mix of both approaches', type: 'balanced' },
    ],
  },
  {
    id: 3,
    text: 'What excites you most about development?',
    options: [
      { text: 'Creating beautiful, engaging experiences', type: 'creative' },
      { text: 'Building efficient, scalable systems', type: 'technical' },
      { text: 'Delivering complete, well-rounded solutions', type: 'balanced' },
    ],
  },
]

const results: Record<'creative' | 'technical' | 'balanced', Result> = {
  creative: {
    type: 'creative',
    title: 'The Creative Innovator',
    description:
      'You have a strong eye for design and user experience. Your strength lies in creating engaging, intuitive interfaces that delight users.',
  },
  technical: {
    type: 'technical',
    title: 'The Technical Architect',
    description:
      'You excel at building robust, efficient systems. Your analytical mindset helps you create scalable solutions.',
  },
  balanced: {
    type: 'balanced',
    title: 'The Full-Stack Artist',
    description:
      'You bring the best of both worlds, combining technical expertise with creative flair to build comprehensive solutions.',
  },
}

export default function PersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useScrollAnimation(containerRef, {
    from: { y: 100, opacity: 0 },
    start: 'top center+=100',
    end: 'center center',
  })

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate result
      const counts = newAnswers.reduce(
        (acc, type) => {
          acc[type as keyof typeof acc]++
          return acc
        },
        { creative: 0, technical: 0, balanced: 0 }
      )

      const resultType = (Object.entries(counts).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0] as 'creative' | 'technical' | 'balanced')

      setResult(results[resultType])
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
  }

  return (
    <section ref={containerRef} className="py-20 bg-primary">
      <div className="container max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-display mb-12 text-gradient text-center">
          What kind of developer are you?
        </h2>

        <div className="bg-white/5 rounded-2xl p-8">
          {!result ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <h3 className="text-2xl mb-6">
                {questions[currentQuestion].text}
              </h3>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option.text}
                    onClick={() => handleAnswer(option.type)}
                    className="w-full p-4 text-left bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-300"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-3xl font-display mb-4">{result.title}</h3>
              <p className="text-secondary/70 mb-8">{result.description}</p>
              <button
                onClick={resetQuiz}
                className="px-8 py-3 bg-accent hover:bg-accent-dark transition-colors rounded-full font-medium"
              >
                Take Quiz Again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 