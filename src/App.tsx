import React, { useState } from 'react'
import DemoPanel from './components/DemoPanel/DemoPanel'
import './App.css'

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<'CardList' | 'ProgressBar' | 'Notification' | 'DataTable' | 'Chart'>('CardList')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Демонстрация компонентов</h1>
        <nav className="component-nav">
          <button
            className={selectedComponent === 'CardList' ? 'active' : ''}
            onClick={() => setSelectedComponent('CardList')}
          >
            CardList
          </button>
          <button
            className={selectedComponent === 'ProgressBar' ? 'active' : ''}
            onClick={() => setSelectedComponent('ProgressBar')}
          >
            ProgressBar
          </button>
          <button
            className={selectedComponent === 'Notification' ? 'active' : ''}
            onClick={() => setSelectedComponent('Notification')}
          >
            Notification
          </button>
          <button
            className={selectedComponent === 'DataTable' ? 'active' : ''}
            onClick={() => setSelectedComponent('DataTable')}
          >
            DataTable
          </button>
          <button
            className={selectedComponent === 'Chart' ? 'active' : ''}
            onClick={() => setSelectedComponent('Chart')}
          >
            Chart
          </button>
        </nav>
      </header>
      <main className="app-main">
        <DemoPanel componentType={selectedComponent} />
      </main>
    </div>
  )
}

export default App
