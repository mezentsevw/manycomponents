import React, { useState, useEffect } from 'react'
import DemoPanel from './components/DemoPanel/DemoPanel'
import './App.css'

function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    console.log('App компонент смонтирован')
    setMounted(true)
    return () => {
      setMounted(false)
      console.log('App компонент размонтирован')
    }
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Демонстрация компонентов</h1>
        <div className="component-status">
          Статус: {mounted ? '✅ Активен' : '❌ Не активен'}
        </div>
      </header>
      
      <main className="app-content">
        <DemoPanel componentType="CardList" />
      </main>
    </div>
  )
}

export default App
