import { useState, useRef, useEffect } from 'react'
import { aiService } from '../services/aiService'
import './AIChatBox.css'

const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: 'Xin chào! Tôi là trợ lý dinh dưỡng AI của MealMind. Hãy hỏi tôi về món ăn, dinh dưỡng, hoặc kế hoạch ăn uống nhé! 🍽️',
      time: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: input.trim(),
      time: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const reply = await aiService.chat(userMessage.text)
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: reply || 'Xin lỗi, tôi đang quá tải. Thử lại sau 1 phút nhé! 🙏',
        time: new Date()
      }])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMsg = error.response?.status === 401
        ? 'Vui lòng đăng nhập để sử dụng AI chat.'
        : 'Xin lỗi, tôi đang bận. Vui lòng thử lại sau ít phút.'
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: errorMsg,
        time: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question) => {
    setInput(question)
    inputRef.current?.focus()
  }

  const quickQuestions = [
    'Gợi ý bữa sáng healthy?',
    'Cách giảm cân hiệu quả?',
    'Món ăn giàu protein?'
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className={`chat-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Mở chat AI"
      >
        {isOpen ? (
          <span className="material-icons">close</span>
        ) : (
          <span className="material-icons">auto_awesome</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <span>✨</span>
              </div>
              <div>
                <h4>MealMind AI</h4>
                <span className="chat-status">
                  <span className="status-dot"></span>
                  Trực tuyến
                </span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>
              <span className="material-icons">remove</span>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg ${msg.role}`}>
                {msg.role === 'ai' && (
                  <div className="msg-avatar">✨</div>
                )}
                <div className="msg-bubble">
                  <p>{msg.text}</p>
                  <span className="msg-time">
                    {msg.time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-msg ai">
                <div className="msg-avatar">✨</div>
                <div className="msg-bubble typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="chat-quick">
              {quickQuestions.map((q, i) => (
                <button key={i} onClick={() => handleQuickQuestion(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form className="chat-input" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Hỏi về dinh dưỡng, món ăn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="send-btn"
            >
              <span className="material-icons">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default AIChatBox
