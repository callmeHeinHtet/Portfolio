'use client'

import { useRef } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Image from 'next/image'

const skills = [
  { name: 'Next.js', level: 90, color: '#000000' },
  { name: 'React', level: 85, color: '#61DAFB' },
  { name: 'TypeScript', level: 80, color: '#3178C6' },
  { name: 'Node.js', level: 75, color: '#339933' },
  { name: 'UI/UX Design', level: 85, color: '#FF3366' },
  { name: 'Mobile Development', level: 70, color: '#FF9500' },
]

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useScrollAnimation(containerRef, {
    from: { y: 100, opacity: 0 },
    start: 'top center+=100',
    end: 'center center',
  })

  return (
    <section id="about" className="py-20 bg-[#111111]">
      <div className="container">
        <div ref={containerRef} className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-display mb-16 text-accent text-center">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bio */}
            <div className="space-y-6">
              <p className="text-lg text-secondary/80 leading-relaxed">
                I'm a passionate Creative Developer and UI/UX Designer with a strong focus on creating beautiful, functional web experiences. My journey in tech started in 2021, and I've been constantly learning and growing ever since.
              </p>
              <p className="text-lg text-secondary/80 leading-relaxed">
                Currently studying at Rangsit University, I combine academic knowledge with practical experience to build modern web applications. I specialize in full-stack development with Next.js, React, and TypeScript, while maintaining a keen eye for design and user experience.
              </p>
              <div className="flex gap-4">
                <a
                  href="/resume.pdf"
                  download
                  className="btn-primary"
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="btn-outline"
                >
                  Let's Talk
                </a>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h3 className="text-2xl font-display text-white mb-6">Skills</h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">{skill.name}</span>
                      <span className="text-accent">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 