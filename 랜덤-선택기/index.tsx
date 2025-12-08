/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// A component for the custom SVG icon.
const QuestionBoxIcon = () => (
    <svg className="start-image" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="A question mark coming out of a box">
        <defs>
            <linearGradient id="q-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#ff6b6b'}} />
                <stop offset="100%" style={{stopColor: '#c44545'}} />
            </linearGradient>
            <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="4" result="offsetblur"/>
                <feComponentTransfer>
                <feFuncA type="linear" slope="0.5"/>
                </feComponentTransfer>
                <feMerge> 
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/> 
                </feMerge>
            </filter>
        </defs>

        {/* Question Mark */}
        <g style={{filter: 'url(#drop-shadow)'}}>
            <text
                x="100"
                y="75"
                fontFamily="Verdana, Geneva, sans-serif"
                fontSize="120"
                fontWeight="900"
                fill="url(#q-gradient)"
                textAnchor="middle"
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinejoin="round"
                aria-hidden="true"
            >?</text>
             <text
                x="100"
                y="75"
                fontFamily="Verdana, Geneva, sans-serif"
                fontSize="120"
                fontWeight="900"
                fill="url(#q-gradient)"
                textAnchor="middle"
                aria-hidden="true"
            >?</text>
        </g>

        {/* Box */}
        <g transform="translate(0, 10)">
            {/* Back flap */}
            <path d="M50,110 L80,90 L150,90 L120,110 Z" fill="#bf8f6f" stroke="#7f5f3f" strokeWidth="2"/>
            {/* Front face */}
            <path d="M40,170 L160,170 L160,110 L40,110 Z" fill="#d9a77f" stroke="#7f5f3f" strokeWidth="2"/>
            {/* Left face */}
            <path d="M40,170 L20,150 L20,90 L40,110 Z" fill="#bf8f6f" stroke="#7f5f3f" strokeWidth="2"/>
             {/* Right face */}
            <path d="M160,170 L180,150 L180,90 L160,110 Z" fill="#bf8f6f" stroke="#7f5f3f" strokeWidth="2"/>
            {/* Front flap */}
            <path d="M45,110 L75,130 L155,130 L125,110 Z" fill="#e6bf9f" stroke="#7f5f3f" strokeWidth="2"/>
        </g>
    </svg>
);

const StartScreen = ({ onStart }) => (
    <main className="card" role="main">
        <h1>랜덤 선택기</h1>
        <QuestionBoxIcon />
        <button className="btn" onClick={onStart} aria-label="시작하기">
            시작
        </button>
    </main>
);

const SelectorScreen = ({ options, setOptions, onDraw }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setOptions([...options, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleRemoveItem = (indexToRemove) => {
        setOptions(options.filter((_, index) => index !== indexToRemove));
    };

    return (
        <main className="card" role="main">
            <h1>랜덤 선택기</h1>
            <form onSubmit={handleAddItem} className="input-group">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="선택지 추가..."
                    className="input-field"
                    aria-label="새로운 선택지 입력"
                />
                <button type="submit" className="btn add-btn" aria-label="선택지 추가하기">
                    추가하기
                </button>
            </form>

            <ul className="options-list" aria-live="polite">
                {options.map((option, index) => (
                    <li key={index} className="option-item">
                        <span>{option}</span>
                        <button onClick={() => handleRemoveItem(index)} className="remove-btn" aria-label={`${option} 삭제`}>
                            &times;
                        </button>
                    </li>
                ))}
            </ul>

            <button className="btn" onClick={onDraw} disabled={options.length < 2} aria-label="추첨하기">
                추첨
            </button>
        </main>
    );
};

const ResultScreen = ({ result, onBack }) => (
    <main className="card" role="main">
        <h1>추첨 결과</h1>
        <div className="result-display" aria-live="assertive">
            <span>{result}</span>
        </div>
        <button className="btn" onClick={onBack} aria-label="돌아가기">
            돌아가기
        </button>
    </main>
);


const App = () => {
    const [screen, setScreen] = useState('start');
    const [options, setOptions] = useState(['마라탕', '치킨', '라면', '떡볶이']);
    const [result, setResult] = useState('');

    const handleStart = () => {
        setScreen('selector');
    };

    const handleDraw = () => {
        if (options.length > 0) {
            const randomIndex = Math.floor(Math.random() * options.length);
            setResult(options[randomIndex]);
            setScreen('result');
        }
    };
    
    const handleBack = () => {
        setScreen('selector');
    };

    if (screen === 'selector') {
        return <SelectorScreen options={options} setOptions={setOptions} onDraw={handleDraw} />;
    }
    
    if (screen === 'result') {
        return <ResultScreen result={result} onBack={handleBack} />;
    }

    // Default to the start screen
    return <StartScreen onStart={handleStart} />;
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<React.StrictMode><App /></React.StrictMode>);
}