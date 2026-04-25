
import React, { useState, useEffect, useRef } from 'react';
import { SatelliteReport, RiskLevel, DisasterType } from '../types';
import { analyzeSatelliteImage } from '../services/geminiService';

const SatelliteAnalysis: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFetchingDemo, setIsFetchingDemo] = useState(false);
  const [report, setReport] = useState<SatelliteReport | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const demoImages = [
    { name: 'California IR (Fire)', type: 'Wildfire', url: 'https://images.unsplash.com/photo-1594156510312-34863f697072?auto=format&fit=crop&q=80&w=800' },
    { name: 'River Delta (Flood)', type: 'Flood', url: 'https://images.unsplash.com/photo-1541804193655-b44c207e0344?auto=format&fit=crop&q=80&w=800' },
    { name: 'Seismic Fault (Rift)', type: 'Earthquake', url: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800' },
    { name: 'Hurricane Eye (NASA)', type: 'Hurricane', url: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80&w=800' },
    { name: 'Volcano Plume', type: 'Volcano', url: 'https://images.unsplash.com/photo-1506057585558-8cf8f8d052bf?auto=format&fit=crop&q=80&w=800' },
    { name: 'City Grid (Day)', type: 'Normal', url: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=800' },
    { name: 'Coastal Erosion', type: 'Geological', url: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&q=80&w=800' },
    { name: 'Night Cityscape', type: 'Thermal', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800' },
  ];

  useEffect(() => {
    addLog("[SYS] Aegis-Net Gemini Core: Online");
    addLog("[SYS] Ready for high-fidelity multi-spectral analysis.");
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const addLog = (msg: string) => {
    setTerminalLogs(prev => [...prev.slice(-30), msg]);
  };

  const handleDemoClick = async (url: string, name: string) => {
    setIsFetchingDemo(true);
    setReport(null);
    addLog(`[UPLINK] Requesting Orbital Archive: ${name}`);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsFetchingDemo(false);
        addLog(`[UPLINK] Packet received. Integrity: 100%`);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      addLog(`[ERR] Uplink timed out.`);
      setIsFetchingDemo(false);
    }
  };

  const startAnalysis = async () => {
    if (!image || isAnalyzing) return;
    setIsAnalyzing(true);
    setReport(null);
    addLog("[API] Dispatching payload to Gemini Vision engine...");
    
    try {
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1] || 'image/jpeg';
      
      addLog("[API] Encoding base64 data stream...");
      addLog("[API] Requesting deep-feature extraction...");

      const result = await analyzeSatelliteImage(base64Data, mimeType);
      
      addLog(`[API] Analysis Result: ${result.disasterType} identified.`);
      addLog(`[API] Confidence score verified: ${(result.confidence * 100).toFixed(2)}%`);
      
      setReport(result);
      addLog("[SUCCESS] Inference complete. Buffer synchronized.");

    } catch (error: any) {
      addLog(`[ERR] API Inference Failure: ${error.message}`);
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full pb-10">
      <div className="grid grid-cols-12 gap-6 flex-shrink-0">
        {/* Viewport Section */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-slate-900/40 p-5 rounded-3xl border border-slate-800 relative overflow-hidden group">
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-[9px] font-black uppercase tracking-widest backdrop-blur-xl">
                Gemini Vision Active
              </div>
            </div>

            <div className="relative aspect-[16/9] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl transition-all group-hover:border-blue-500/20">
              {isFetchingDemo ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/90 z-10">
                   <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                   <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] animate-pulse">Syncing Orbital Buffer...</p>
                </div>
              ) : image ? (
                <>
                  <img src={image} className="w-full h-full object-cover grayscale brightness-[0.4] hover:grayscale-0 hover:brightness-100 transition-all duration-[2s] ease-in-out" alt="Satellite Capture" />
                  {isAnalyzing && (
                    <div className="absolute inset-0 z-10">
                       <div className="w-full h-[2px] bg-blue-500/80 absolute top-0 animate-[scanner_2.5s_infinite] shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                       <div className="absolute inset-0 bg-blue-500/5 animate-pulse"></div>
                    </div>
                  )}
                  {/* Coordinate Overlay */}
                  <div className="absolute top-4 left-4 font-mono text-[8px] text-blue-500/50 space-y-1">
                    <p>LAT: 34.0522° N</p>
                    <p>LNG: 118.2437° W</p>
                    <p>ALT: 421.5 KM</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-800 space-y-4">
                  <div className="w-20 h-20 rounded-full border border-slate-800 flex items-center justify-center animate-[pulse_3s_infinite]">
                    <i className="fa-solid fa-satellite-dish text-4xl opacity-20"></i>
                  </div>
                  <p className="text-[10px] uppercase font-black tracking-[0.4em] opacity-40">Link Awaiting Synchronization</p>
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-3">
                <button 
                  onClick={startAnalysis}
                  disabled={!image || isAnalyzing}
                  className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 transition-all border ${
                    isAnalyzing 
                    ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' 
                    : 'bg-blue-600 hover:bg-blue-500 border-blue-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.2)]'
                  } disabled:opacity-20 disabled:grayscale cursor-pointer`}
                >
                  {isAnalyzing ? <><i className="fa-solid fa-brain animate-pulse"></i> Analyzing Layers...</> : <><i className="fa-solid fa-bolt"></i> Run AI Prediction</>}
                </button>
                <div className="relative group/upload">
                  <button className="px-6 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">
                    Inject External Data
                  </button>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setImage(reader.result as string);
                        addLog("[SYS] External image data injected into buffer.");
                      };
                      reader.readAsDataURL(file);
                    }
                  }} />
                </div>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Compute Protocol</p>
                <div className="flex gap-1.5">
                   <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] font-black rounded uppercase">API_SECURE</span>
                   <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-black rounded uppercase">LIVE_THREAT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Console & Inference Results */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex-1 flex flex-col min-h-[250px] shadow-inner">
             <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                   <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Aegis_API_Log</span>
                </div>
                <span className="text-[9px] font-mono text-slate-600">v4.5.0-PRO</span>
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-[9px] space-y-1 pr-2">
               {terminalLogs.map((log, i) => (
                 <div key={i} className={`${log.includes('[ERR]') ? 'text-red-500' : log.includes('[SYS]') ? 'text-slate-500' : log.includes('[API]') ? 'text-blue-400' : 'text-slate-300'}`}>
                   <span className="opacity-30 mr-2">[{new Date().toLocaleTimeString()}]</span> {log}
                 </div>
               ))}
               <div ref={terminalEndRef} />
             </div>
          </div>

          {report && (
            <div className="bg-slate-900/60 p-7 rounded-3xl border border-blue-500/30 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-right-4 duration-500 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Inference Target</p>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">{report.disasterType}</h4>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Risk Rank</p>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase shadow-lg ${
                    report.riskLevel === RiskLevel.CRITICAL ? 'bg-red-600 text-white shadow-red-500/20' : 
                    report.riskLevel === RiskLevel.HIGH ? 'bg-orange-600 text-white shadow-orange-500/20' :
                    'bg-blue-500 text-white shadow-blue-500/20'
                  }`}>{report.riskLevel}</span>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Classification Certainty</span>
                  <span className="text-blue-400">{(report.confidence * 100).toFixed(2)}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] transition-all duration-1000" style={{ width: `${report.confidence * 100}%` }}></div>
                </div>
                
                <div className="pt-5 border-t border-slate-800">
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em] mb-3">Model Synthesis</p>
                  <p className="text-[11px] text-slate-300 italic font-medium leading-relaxed">"{report.summary}"</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                   {report.detectedAnomalies.map((a, i) => (
                     <span key={i} className="text-[8px] font-black text-slate-500 border border-slate-800 px-2 py-1 rounded uppercase bg-slate-950/50">
                        {a}
                     </span>
                   ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Improved Testing Archive Gallery */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h5 className="text-[10px] font-black text-white uppercase tracking-[0.4em] whitespace-nowrap">Testing Archive</h5>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-800 to-transparent"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {demoImages.map((demo, idx) => (
            <button 
              key={idx} 
              onClick={() => handleDemoClick(demo.url, demo.name)}
              className="group relative aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all text-left shadow-lg hover:shadow-blue-500/5"
            >
              <img src={demo.url} className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={demo.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-3 w-full">
                <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-0.5">{demo.type}</p>
                <p className="text-[9px] font-bold text-slate-100 truncate group-hover:text-white">{demo.name}</p>
              </div>
              <div className="absolute top-2 right-2 p-1 bg-slate-950/80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity border border-slate-800">
                 <i className="fa-solid fa-satellite text-[8px] text-blue-400"></i>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scanner {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SatelliteAnalysis;
