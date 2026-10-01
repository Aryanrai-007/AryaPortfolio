import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, Play, Pause } from "lucide-react";

export function KyotoMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isLoopingRef = useRef<boolean>(false);

  // Web Audio API Shamisen & Taiko Synthesizer
  const startAudioEngine = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      isLoopingRef.current = true;

      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.25;
      masterGain.connect(ctx.destination);

      // Traditional Japanese Hirajoshi / Insen scale notes in Hz
      const notes = [
        146.83, // D3
        164.81, // E3
        174.61, // F3
        220.00, // A3
        233.08, // Bb3
        293.66, // D4
        329.63, // E4
        349.23, // F4
        440.00, // A4
        466.16  // Bb4
      ];

      // Shamisen pluck synthesis
      const playShamisenNote = (freq: number, time: number, duration: number = 0.6) => {
        if (!isLoopingRef.current) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, time);

        // Shamisen characteristic snappy body filter envelope
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2800, time);
        filter.frequency.exponentialRampToValueAtTime(300, time + duration);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(0.35, time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start(time);
        osc.stop(time + duration + 0.1);
      };

      // Taiko drum synthesis
      const playTaiko = (time: number, isSub: boolean = false) => {
        if (!isLoopingRef.current) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        const startFreq = isSub ? 120 : 180;
        osc.frequency.setValueAtTime(startFreq, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.35);

        gain.gain.setValueAtTime(0.6, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(time);
        osc.stop(time + 0.45);
      };

      // High-hat / shaker
      const playHiHat = (time: number) => {
        if (!isLoopingRef.current) return;
        const bufferSize = ctx.sampleRate * 0.05;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 7000;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        noise.start(time);
      };

      // Sequencer Loop (132 BPM Energetic Kyoto Trap Beat)
      const bpm = 132;
      const stepTime = 60 / bpm / 2; // 8th note duration
      let currentStep = 0;

      const schedulePattern = () => {
        if (!isLoopingRef.current || !audioCtxRef.current) return;
        const now = ctx.currentTime;

        // Schedule next 16 steps
        for (let i = 0; i < 16; i++) {
          const t = now + i * stepTime;
          const step = (currentStep + i) % 16;

          // Taiko Pattern
          if (step === 0 || step === 6 || step === 10 || step === 14) {
            playTaiko(t, step === 0);
          }

          // HiHat
          if (step % 2 === 0) {
            playHiHat(t);
          }

          // Shamisen Melody
          if (step === 0) playShamisenNote(notes[0], t, 0.4);
          if (step === 2) playShamisenNote(notes[2], t, 0.4);
          if (step === 3) playShamisenNote(notes[3], t, 0.3);
          if (step === 6) playShamisenNote(notes[5], t, 0.5);
          if (step === 8) playShamisenNote(notes[7], t, 0.4);
          if (step === 10) playShamisenNote(notes[8], t, 0.3);
          if (step === 12) playShamisenNote(notes[5], t, 0.4);
          if (step === 14) playShamisenNote(notes[3], t, 0.3);
        }

        currentStep = (currentStep + 16) % 16;
        setTimeout(schedulePattern, stepTime * 16 * 1000 - 50);
      };

      schedulePattern();
    } catch (e) {
      console.warn("Audio Context init error:", e);
    }
  };

  const togglePlay = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        startAudioEngine();
      } else {
        audioCtxRef.current.resume();
        isLoopingRef.current = true;
      }
      setIsPlaying(true);
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
        isLoopingRef.current = false;
      }
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioCtxRef.current) {
      // Toggle gain
    }
  };

  useEffect(() => {
    return () => {
      isLoopingRef.current = false;
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0a0e12]/80 border border-white/10 rounded-full text-xs font-mono backdrop-blur-md shadow-lg">
      <button
        onClick={togglePlay}
        className="flex items-center gap-1.5 px-2.5 py-1 bg-[#e0231c] hover:bg-[#ff5a3c] text-white rounded-full transition-all duration-200 cursor-pointer"
        title={isPlaying ? "Pause Kyoto Beat" : "Play Kyoto Shamisen Beat"}
      >
        {isPlaying ? <Pause size={12} /> : <Play size={12} />}
        <span>{isPlaying ? "PAUSE" : "SOUNDTRACK"}</span>
      </button>

      {/* Equalizer Bars Animation when Playing */}
      {isPlaying && (
        <div className="flex items-end gap-0.5 h-3 px-1">
          <span className="w-0.5 bg-[#e0231c] animate-bounce h-full rounded-full" style={{ animationDelay: "0ms" }}></span>
          <span className="w-0.5 bg-[#e0231c] animate-bounce h-2/3 rounded-full" style={{ animationDelay: "150ms" }}></span>
          <span className="w-0.5 bg-[#e0231c] animate-bounce h-full rounded-full" style={{ animationDelay: "300ms" }}></span>
          <span className="w-0.5 bg-[#e0231c] animate-bounce h-1/2 rounded-full" style={{ animationDelay: "450ms" }}></span>
        </div>
      )}

      <span className="text-[10px] text-gray-400 hidden sm:inline tracking-wider uppercase">KYOTO BEAT</span>
    </div>
  );
}
