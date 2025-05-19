import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { RiRobot2Fill } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface AnimatedDivProps extends MotionProps {
  className?: string;
  children?: React.ReactNode;
}

interface AnimatedButtonProps extends MotionProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const MotionDiv = motion.div as React.FC<AnimatedDivProps>;
const MotionButton = motion.button as React.FC<AnimatedButtonProps>;

const TypingIndicator: React.FC = () => (
  <div className="flex space-x-2 p-3 bg-[#2A2A2A] rounded-lg max-w-[100px]">
    <MotionDiv
      className="w-2 h-2 bg-[#FF3366] rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    />
    <MotionDiv
      className="w-2 h-2 bg-[#FF3366] rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
    />
    <MotionDiv
      className="w-2 h-2 bg-[#FF3366] rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 0.5, delay: 0.4, repeat: Infinity, repeatType: "reverse" }}
    />
  </div>
);

const RobotCompanion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const personalInfo = {
    name: "Hein Htet Soe",
    role: "Creative Developer & UI/UX Designer",
    introduction: "Hi! I'm a digital assistant representing Hein Htet Soe, a passionate Creative Developer and UI/UX Designer. He combines technical expertise with creative design thinking to build beautiful, functional web experiences.",
    skills: ["Next.js", "TypeScript", "React", "Node.js", "UI/UX Design", "Mobile Development"],
    contact: {
      email: "heinhtetsoe1821@gmail.com",
      phone: "+66 818805001",
      line: "callmeero81",
      message: "You can reach Hein through any of these channels:\n• Email: heinhtetsoe1821@gmail.com\n• Phone: +66 818805001\n• LINE ID: callmeero81\n\nHe's always excited to discuss new projects and collaborations! 📫"
    },
    projects: {
      "hotel booking": {
        description: "A modern hotel booking platform with an emphasis on user experience. The system features real-time room availability, dynamic pricing, and a streamlined booking process.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
        features: [
          "JWT-based authentication system",
          "Real-time room availability updates",
          "Dynamic pricing based on seasons and demand",
          "Integrated payment processing",
          "Member rewards program"
        ]
      },
      "university library": {
        description: "The Rangsit University Library website with multilingual support and an integrated chatbot for student assistance.",
        technologies: ["React", "Node.js", "MongoDB", "i18next"],
        features: [
          "Multi-language support (Thai/English)",
          "Digital catalog search system",
          "Student authentication integration",
          "Real-time book availability",
          "Online reservation system"
        ]
      },
      "task manager": {
        description: "A clean, minimalist task management application with user authentication and productivity features.",
        technologies: ["React", "Firebase", "Material-UI", "Redux"],
        features: [
          "Task categorization and priority setting",
          "Deadline reminders and notifications",
          "Team collaboration features",
          "Progress tracking and analytics",
          "Mobile-responsive design"
        ]
      }
    },
    journey: "Hein started his programming journey in 2021, diving deep into web development fundamentals. By 2022, he was building full-stack web applications and exploring modern frameworks. In 2023, he expanded into mobile development and UI/UX design. Now in 2024, he's a versatile full-stack developer with expertise in AI integration and modern web technologies.",
    personality: "Hein is known for his creative approach to problem-solving and attention to detail. He's passionate about creating intuitive user experiences and stays up-to-date with the latest tech trends. In his free time, he contributes to open-source projects and mentors aspiring developers."
  };

  const generateResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    // Introduction and personal questions
    if (q.includes("who") || q.includes("tell me about hein") || q.includes("introduce")) {
      return personalInfo.introduction;
    }

    // Contact information
    if (q.includes("contact") || q.includes("reach") || q.includes("email") || q.includes("phone") || q.includes("line") || q.includes("connect")) {
      return personalInfo.contact.message;
    }

    // Project related questions with technology focus
    if (q.includes("what did he use") || q.includes("how did he create") || q.includes("tech stack") || q.includes("built with") || q.includes("technology") || q.includes("tools used")) {
      if (q.includes("hotel") || q.includes("booking")) {
        const project = personalInfo.projects["hotel booking"];
        return `For the Hotel Booking System, Hein used ${project.technologies.join(", ")} as the main technologies. The system was built with:\n\n• Next.js and TypeScript for a robust frontend with type safety\n• Tailwind CSS for modern, responsive styling\n• Node.js for a scalable backend API\n• PostgreSQL for reliable data storage\n\nThis tech stack ensures high performance, real-time updates, and a seamless user experience. 🛠️`;
      }
      if (q.includes("library") || q.includes("university")) {
        const project = personalInfo.projects["university library"];
        return `The University Library website was built with a powerful stack:\n\n• React for building a dynamic user interface\n• Node.js for handling backend operations\n• MongoDB for flexible document storage\n• i18next for seamless Thai/English language switching\n\nThis combination allows for efficient catalog management and real-time updates. 🏛️`;
      }
      if (q.includes("task") || q.includes("manager")) {
        const project = personalInfo.projects["task manager"];
        return `The Task Manager application leverages modern technologies:\n\n• React for the interactive frontend\n• Firebase for real-time database and authentication\n• Material-UI for polished, consistent UI components\n• Redux for centralized state management\n\nThis stack enables real-time collaboration and smooth task management. 📋`;
      }
      return "I'd be happy to tell you about the technologies used in any of Hein's projects! Which one would you like to know about - the Hotel Booking System, University Library Website, or Task Manager? 🚀";
    }

    // General project descriptions
    if (q.includes("project") || q.includes("work") || q.includes("portfolio")) {
      if (q.includes("hotel") || q.includes("booking")) {
        const project = personalInfo.projects["hotel booking"];
        return `The Hotel Booking System is one of Hein's flagship projects. ${project.description}\n\nTechnologies used:\n• ${project.technologies.join("\n• ")}\n\nKey features:\n• ${project.features.join("\n• ")} 🏨`;
      }
      if (q.includes("library") || q.includes("university")) {
        const project = personalInfo.projects["university library"];
        return `The University Library project is a comprehensive digital solution. ${project.description}\n\nTechnologies used:\n• ${project.technologies.join("\n• ")}\n\nKey features:\n• ${project.features.join("\n• ")} 📚`;
      }
      if (q.includes("task") || q.includes("manager")) {
        const project = personalInfo.projects["task manager"];
        return `The Task Manager is a sleek productivity tool. ${project.description}\n\nTechnologies used:\n• ${project.technologies.join("\n• ")}\n\nKey features:\n• ${project.features.join("\n• ")} ✅`;
      }
      return "I'd love to tell you about Hein's projects! He's worked on:\n\n1. 🏨 Hotel Booking System\n2. 📚 University Library Website\n3. ✅ Task Manager Application\n\nWhich one would you like to know more about? 😊";
    }

    // Skills and technical questions
    if (q.includes("skill") || q.includes("tech") || q.includes("language") || q.includes("framework")) {
      return `Hein is proficient in ${personalInfo.skills.join(", ")}. He specializes in modern web technologies and UI/UX design. Is there a specific technology you'd like to know more about? 🚀`;
    }

    // Journey and experience
    if (q.includes("journey") || q.includes("experience") || q.includes("background")) {
      return `${personalInfo.journey} Would you like to know more about any specific period of his journey? 📈`;
    }

    // Personal questions
    if (q.includes("personality") || q.includes("interests") || q.includes("hobbies")) {
      return `${personalInfo.personality} Want to know more about his current projects? 💡`;
    }

    // Default response for unrelated questions
    if (!q.includes("hein") && !q.includes("portfolio") && !q.includes("project") && !q.includes("work")) {
      return "I'm Hein's digital assistant, and I'd be happy to tell you about his work, skills, and experience! While I can't help with unrelated topics, I'd love to share more about his journey in tech. What would you like to know? 🤖";
    }

    return "Hi there! 👋 I'm here to tell you all about Hein Htet Soe. You can ask me about his projects, skills, journey, or how to get in touch with him. What would you like to know? 😊";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = { 
      type: 'user', 
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: response,
        timestamp: new Date()
      }]);
      setIsThinking(false);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen ? (
          <MotionDiv
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[340px] md:w-[400px] bg-[#111111] rounded-2xl shadow-2xl overflow-hidden border border-[#2A2A2A]"
          >
            {/* Chat Header */}
            <div className="bg-[#1A1A1A] p-4 flex items-center justify-between border-b border-[#2A2A2A]">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <RiRobot2Fill className="w-8 h-8 text-[#FF3366]" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1A1A1A]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Portfolio Assistant</h3>
                  <p className="text-xs text-gray-400">Always here to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-[#111111]">
              {messages.map((msg, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col space-y-1 max-w-[80%]">
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        msg.type === 'user'
                          ? 'bg-[#FF3366] text-white rounded-br-none'
                          : 'bg-[#1A1A1A] text-gray-200 rounded-bl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className={`text-xs text-gray-500 ${
                      msg.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </MotionDiv>
              ))}
              {isThinking && (
                <MotionDiv
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <TypingIndicator />
                </MotionDiv>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-[#1A1A1A] border-t border-[#2A2A2A]">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about my projects, skills, or experience..."
                  className="flex-1 bg-[#2A2A2A] text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF3366] text-sm"
                />
                <button
                  type="submit"
                  className="bg-[#FF3366] text-white p-2 rounded-full hover:bg-[#FF4D7D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF3366] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
                  disabled={!inputValue.trim()}
                >
                  <FiSend className="w-5 h-5" />
                </button>
              </div>
            </form>
          </MotionDiv>
        ) : null}
      </AnimatePresence>

      <MotionButton
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1A1A1A] w-14 h-14 rounded-full flex items-center justify-center hover:bg-[#2A2A2A] transition-colors shadow-lg border border-[#2A2A2A] relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <RiRobot2Fill className="w-7 h-7 text-[#FF3366]" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1A1A1A]" />
        </div>
      </MotionButton>
    </div>
  );
};

export default RobotCompanion; 