import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { UploadedImage, AppState, GeneratedResult } from './types';
import { generateJerseySwapImage } from './services/geminiService';
import { Loader2, Wand2, Download, RefreshCcw, AlertCircle, LayoutGrid } from 'lucide-react';

const STYLES = [
  { id: 'day', name: 'Old Trafford (Day)', prompt: 'Background is Old Trafford stadium pitch side during a sunny afternoon. Bright, realistic natural lighting.' },
  { id: 'night', name: 'Old Trafford (Night)', prompt: 'Background is Old Trafford stadium at night with intense floodlights and atmosphere. Dramatic shadows.' },
  { id: 'locker', name: 'Locker Room', prompt: 'Sitting or standing inside the Manchester United locker room. Warm artificial lighting, kits hanging in background.' },
  { id: 'tunnel', name: 'Tunnel Cam', prompt: 'Walking through the players tunnel before a match. Concrete textures, focused intensity.' },
  { id: 'studio', name: 'Studio Photoshoot', prompt: 'Clean grey professional studio background. High-fashion photography lighting, sharp focus.' },
  { id: 'vintage', name: '90s Retro', prompt: 'Vintage 1990s film photography aesthetic. Grainy texture, slightly muted colors, retro vibe.' },
  { id: 'neon', name: 'Red Neon', prompt: 'Dark background with intense red neon rim lighting highlighting the player. Cyberpunk/Modern aesthetic.' },
  { id: 'rain', name: 'Rainy Match', prompt: 'Heavy rain during a match. Wet jersey texture, water droplets, dramatic determination.' },
  { id: 'press', name: 'Press Conference', prompt: 'Standing in front of a Manchester United media backdrop/sponsor wall with camera flashes.' },
  { id: 'epic', name: 'Epic Poster', prompt: 'Highly stylized sports poster art. Smoke effects, dynamic particles, heroic lighting.' },
];

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<UploadedImage | null>(null);
  const [jerseyImage, setJerseyImage] = useState<UploadedImage | null>(null);
  
  // Changed from single result to array of results
  const [results, setResults] = useState<GeneratedResult[]>([]);
  
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [globalError, setGlobalError] = useState<string>("");


  const handleGenerate = async () => {
    if (!userImage || !jerseyImage) return;

    const apiKey =
      import.meta.env.VITE_GEMINI_API_KEY ||
      process.env.API_KEY ||
      process.env.GEMINI_API_KEY;

    if (!apiKey) {
      setGlobalError("API 키 인증이 필요합니다.");
      return;
    }

    setAppState(AppState.GENERATING);
    setGlobalError("");
    
    // Initialize placeholders
    const initialResults: GeneratedResult[] = STYLES.map(style => ({
      id: style.id,
      styleName: style.name,
      url: null,
      status: 'loading'
    }));
    setResults(initialResults);

    // Trigger all requests in parallel
    // Note: We don't await Promise.all here because we want to update the UI as each one finishes independently
    STYLES.forEach(async (style) => {
      try {
        const url = await generateJerseySwapImage(userImage, jerseyImage, style.prompt);
        
        setResults(prev => prev.map(item => 
          item.id === style.id 
            ? { ...item, url, status: 'success' } 
            : item
        ));
      } catch (error: any) {
        console.error(`Generation failed for style ${style.id}:`, error);
        
        setResults(prev => prev.map(item => 
          item.id === style.id 
            ? { ...item, status: 'error', error: "생성 실패" } 
            : item
        ));

        if (error.message === "API_KEY_MISSING") {
             setGlobalError("API 키 인증이 필요합니다.");
        }
      }
    });
  };

  // Monitor overall completion
  useEffect(() => {
    if (appState === AppState.GENERATING) {
      const allFinished = results.length > 0 && results.every(r => r.status === 'success' || r.status === 'error');
      if (allFinished) {
        setAppState(AppState.SUCCESS);
      }
    }
  }, [results, appState]);

  const downloadImage = (url: string, styleName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `maeng-ai-${styleName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAll = () => {
    setUserImage(null);
    setJerseyImage(null);
    setResults([]);
    setAppState(AppState.IDLE);
    setGlobalError("");
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-red-900 selection:text-white">
      <Header />

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
        
        {/* Intro Section */}
        <section className="text-center py-6 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">10가지 스타일</span>로 변신하세요
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            한 번의 클릭으로 맨유 유니폼을 입은 당신의 모습을<br/>
            경기장, 라커룸, 스튜디오 등 10가지 다른 테마로 생성합니다.
          </p>
        </section>

        {/* Input Zone - Collapses when results are shown */}
        <div className={`transition-all duration-500 ease-in-out ${results.length > 0 ? 'bg-gray-900/30 p-6 rounded-2xl border border-gray-800' : ''}`}>
           <div className={`grid grid-cols-1 ${results.length > 0 ? 'lg:grid-cols-4 items-end' : 'lg:grid-cols-2'} gap-8 transition-opacity duration-500 opacity-100`}>
            
             <div className={`${results.length > 0 ? 'col-span-1' : 'space-y-4'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">1. 사진 업로드</h3>
                </div>
                <FileUpload 
                    id="user-upload"
                    label="나의 사진"
                    image={userImage}
                    onImageSelect={setUserImage}
                    onRemove={() => setUserImage(null)}
                />
             </div>

             <div className={`${results.length > 0 ? 'col-span-1' : 'space-y-4'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">2. 유니폼 업로드</h3>
                </div>
                <FileUpload 
                    id="jersey-upload"
                    label="맨유 유니폼"
                    image={jerseyImage}
                    onImageSelect={setJerseyImage}
                    onRemove={() => setJerseyImage(null)}
                />
             </div>

             <div className={`${results.length > 0 ? 'col-span-2' : 'col-span-2 flex justify-center pt-4'}`}>
                <button
                    onClick={handleGenerate}
                    disabled={!userImage || !jerseyImage || appState === AppState.GENERATING}
                    className={`
                      ${results.length > 0 ? 'w-full h-[52px]' : 'w-full max-w-md py-4 text-lg'} 
                      rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all
                      ${(!userImage || !jerseyImage) 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:shadow-red-900/40 hover:-translate-y-1 active:translate-y-0'
                      }`}
                >
                    {appState === AppState.GENERATING ? (
                    <>
                        <Loader2 className="animate-spin" />
                        10장 동시 생성 중...
                    </>
                    ) : (
                    <>
                        {results.length > 0 ? <RefreshCcw size={20} /> : <Wand2 size={24} />}
                        {results.length > 0 ? '다시 생성하기' : '10가지 스타일 생성 시작'}
                    </>
                    )}
                </button>
             </div>
           </div>
        </div>

        {globalError && (
            <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-900/50 justify-center">
                <AlertCircle size={20} />
                <span>{globalError}</span>
            </div>
        )}

        {/* Results Grid */}
        {results.length > 0 && (
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <LayoutGrid className="text-red-500" />
                    <h3 className="text-2xl font-bold text-white">생성 결과 ({results.filter(r => r.status === 'success').length}/{results.length})</h3>
                </div>
                <button onClick={resetAll} className="text-sm text-gray-400 hover:text-white underline">
                    초기화
                </button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {results.map((result) => (
                    <div key={result.id} className="group relative aspect-square rounded-xl bg-gray-900 border border-gray-800 overflow-hidden">
                        {/* Status Layers */}
                        {result.status === 'loading' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                <Loader2 className="w-8 h-8 text-red-600 animate-spin mb-3" />
                                <span className="text-xs text-gray-500 font-medium animate-pulse">{result.styleName}</span>
                            </div>
                        )}
                        
                        {result.status === 'error' && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-red-900/10">
                                <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                                <span className="text-xs text-red-400">{result.error || '생성 실패'}</span>
                                <span className="text-[10px] text-gray-500 mt-1">{result.styleName}</span>
                            </div>
                        )}

                        {result.status === 'success' && result.url && (
                            <>
                                <img 
                                    src={result.url} 
                                    alt={result.styleName} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <p className="text-white font-bold text-sm mb-2">{result.styleName}</p>
                                    <button 
                                        onClick={() => downloadImage(result.url!, result.styleName)}
                                        className="w-full py-2 bg-white text-black text-xs font-bold rounded hover:bg-gray-200 flex items-center justify-center gap-1"
                                    >
                                        <Download size={12} /> 저장
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Style Label Badge (Visible when loading or success) */}
                        {result.status !== 'error' && (
                             <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] text-white font-medium border border-white/10">
                                {result.styleName}
                             </div>
                        )}
                    </div>
                ))}
             </div>
          </div>
        )}
      </main>
      
      <footer className="w-full py-8 text-center text-gray-600 text-sm border-t border-gray-900 mt-12">
        <p>© 2026 맹맹맹.AI | Powered by Google Gemini 3.0 Pro</p>
      </footer>
    </div>
  );
};

export default App;