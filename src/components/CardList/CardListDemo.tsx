import React from 'react';
import CardList from './CardList';
import { Card } from './CardList';
import { Balance } from './Balance';
import { Icon } from './Icon';
import './CardList.css';

const demoCards = [
  { id: '1', balance: 1000, icon: '💰' },
  { id: '2', balance: 2000, icon: '💳' },
  { id: '3', balance: 3000, icon: '🏦' },
];

interface CardListDemoProps {
  detailLevel?: 0 | 1 | 2 | 3 | 4;
}

export const CardListDemo: React.FC<CardListDemoProps> = ({ detailLevel = 0 }) => {
  return (
    <div className="card-list-demo">
      <h2>Демонстрация CardList (Уровень {detailLevel})</h2>
      
      <div className="card-list-demo__example">
        <h3>Пример кода:</h3>
        <pre>
          {detailLevel === 0 && '<CardList id="card-list" />'}
          {detailLevel === 1 && '<CardList cardItems={[...]} />'}
          {detailLevel === 2 && (
            '<CardList>\n' +
            '  <Card id="1" />\n' +
            '  <Card id="2" />\n' +
            '</CardList>'
          )}
          {detailLevel === 3 && (
            '<CardList>\n' +
            '  <Card balance={1000} icon="💰" />\n' +
            '  <Card balance={2000} icon="💳" />\n' +
            '</CardList>'
          )}
          {detailLevel === 4 && (
            '<CardList>\n' +
            '  <Card>\n' +
            '    <Balance value={1000} />\n' +
            '    <Icon name="💰" />\n' +
            '  </Card>\n' +
            '  <Card>\n' +
            '    <Balance value={2000} />\n' +
            '    <Icon name="💳" />\n' +
            '  </Card>\n' +
            '</CardList>'
          )}
        </pre>
      </div>

      <div className="card-list-demo__result">
        <h3>Результат:</h3>
        {detailLevel === 0 && <CardList id="card-list" level={0} />}
        {detailLevel === 1 && <CardList cardItems={demoCards} level={1} />}
        {detailLevel === 2 && (
          <CardList level={2}>
            <Card id="1" />
            <Card id="2" />
            <Card id="3" />
          </CardList>
        )}
        {detailLevel === 3 && (
          <CardList level={3}>
            <Card balance={1000} icon="💰" />
            <Card balance={2000} icon="💳" />
            <Card balance={3000} icon="🏦" />
          </CardList>
        )}
        {detailLevel === 4 && (
          <CardList level={4}>
            <Card>
              <Balance value={1000} />
              <Icon name="💰" />
            </Card>
            <Card>
              <Balance value={2000} />
              <Icon name="💳" />
            </Card>
            <Card>
              <Balance value={3000} />
              <Icon name="🏦" />
            </Card>
          </CardList>
        )}
      </div>
    </div>
  );
}; 