"use client";

import React, { useEffect, useRef, useState, useCallback, useReducer, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import debounce from 'lodash/debounce';
import { createHash } from 'crypto';

interface PerformanceMetrics {
  FCP?: number;
  LCP?: number;
  CLS?: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

// Performance monitoring
const usePerfMetrics = () => {
  useEffect(() => {
    const metrics: PerformanceMetrics = {};
    
    // Track FCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        metrics.FCP = fcpEntry.startTime;
        console.log('FCP:', metrics.FCP);
      }
    }).observe({ entryTypes: ['paint'] });

    // Track LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        metrics.LCP = entries[entries.length - 1].startTime;
        console.log('LCP:', metrics.LCP);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Track CLS
    new PerformanceObserver((list) => {
      let clsValue = 0;
      list.getEntries().forEach((entry) => {
        const layoutShift = entry as LayoutShiftEntry;
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
        }
      });
      metrics.CLS = clsValue;
      console.log('CLS:', metrics.CLS);
    }).observe({ entryTypes: ['layout-shift'] });

    return () => {
      // Clean up observers
    };
  }, []);
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Error boundary for graceful degradation
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('UI Error:', error, errorInfo);
    // Log to analytics
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-lg">
          <h2 className="text-red-600 dark:text-red-400 font-medium">Something went wrong</h2>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 text-sm text-red-500 hover:text-red-600 dark:text-red-400"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const DEFAULT_INPUT = "Elegant minimalist workspace with soft natural lighting, muted colors";

const RealTimeToggle = ({ enabled, onToggle, isGenerating }: { enabled: boolean; onToggle: () => void; isGenerating: boolean }) => {
  const springConfig = { type: "spring", stiffness: 700, damping: 30 };
  
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      disabled={isGenerating}
      className={`
        relative p-3 rounded-xl
        transition-all duration-300
        ${enabled 
          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20' 
          : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        group text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={springConfig}
    >
      <motion.div
        className={`
          absolute inset-0 rounded-xl
          ${enabled ? 'bg-blue-500/5 dark:bg-blue-400/5' : 'bg-gray-500/5 dark:bg-gray-400/5'}
        `}
        initial={false}
        animate={enabled ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 0 }}
        transition={{ duration: 0.5, repeat: enabled ? Infinity : 0 }}
      />
      <span className="relative z-10" aria-label={enabled ? "Real-time mode" : "Manual mode"}>
        {enabled ? '⚡' : '🎯'}
      </span>
      {enabled && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-2 -right-2 text-xs bg-blue-500 text-white dark:text-blue-100 rounded-full w-4 h-4 flex items-center justify-center"
        >
          2
        </motion.div>
      )}
    </motion.button>
  );
};

const GenerateButton = ({ isGenerating, disabled, hasError }: { isGenerating: boolean; disabled: boolean; hasError: boolean }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError] = useState(hasError);

  useEffect(() => {
    if (!isGenerating && !showError) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, showError]);

  return (
    <motion.button
      type="submit"
      disabled={disabled}
      className={`
        relative p-3 rounded-xl transition-all duration-300
        ${hasError 
          ? 'bg-red-500/10 text-red-600' 
          : showSuccess 
            ? 'bg-green-500/10 text-green-600'
            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isGenerating ? "Generating image" : "Generate image"}
    >
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <motion.div
            key="generating"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.div>
            <span className="opacity-0">🪄</span>
          </motion.div>
        ) : hasError ? (
          <motion.span
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            ⚠️
          </motion.span>
        ) : showSuccess ? (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            ✓
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            🪄
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const ImageDisplay = React.memo(({ url, alt, loading, error, onRetry }: {
  url: string | null;
  alt: string;
  loading: boolean;
  error: Error | null;
  onRetry: () => void;
}) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <motion.div 
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-4xl aspect-square rounded-3xl overflow-hidden shadow-2xl"
    >
      {url ? (
        <Image
          src={url}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
      )}
      
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full"
          />
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 backdrop-blur-sm bg-black/20 flex flex-col items-center justify-center"
        >
          <p className="text-white mb-4">⚠️ {error.message}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      )}
    </motion.div>
  );
});

ImageDisplay.displayName = 'ImageDisplay';

interface ImageState {
  url: string | null;
  loading: boolean;
  error: Error | null;
  timestamp: number;
}

type ImageAction = 
  | { type: 'START_LOADING'; prompt: string }
  | { type: 'LOAD_SUCCESS'; url: string; prompt: string }
  | { type: 'LOAD_ERROR'; error: Error }
  | { type: 'RESET' };

// Reducers
const imageReducer = (state: ImageState, action: ImageAction): ImageState => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
        timestamp: Date.now()
      };
    case 'LOAD_SUCCESS':
      return {
        url: action.url,
        loading: false,
        error: null,
        timestamp: Date.now()
      };
    case 'LOAD_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
        timestamp: Date.now()
      };
    case 'RESET':
      return {
        url: null,
        loading: false,
        error: null,
        timestamp: Date.now()
      };
    default:
      return state;
  }
};

// Custom hooks
const useImageCache = () => {
  const cache = useRef<Map<string, { url: string; timestamp: number }>>(new Map());
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  const set = useCallback((hash: string, url: string) => {
    cache.current.set(hash, { url, timestamp: Date.now() });
    // Persist to localStorage
    try {
      localStorage.setItem('imageCache', JSON.stringify(Array.from(cache.current.entries())));
    } catch (error) {
      console.warn('Failed to persist cache:', error);
    }
  }, []);

  const get = useCallback((hash: string) => {
    const entry = cache.current.get(hash);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      cache.current.delete(hash);
      return null;
    }
    return entry.url;
  }, []);

  // Load cache from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('imageCache');
      if (saved) {
        cache.current = new Map(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('Failed to load cache:', error);
    }
  }, []);

  return { get, set };
};

const useRequestQueue = () => {
  const queue = useRef<Array<() => Promise<void>>>([]);
  const isProcessing = useRef(false);

  const processQueue = useCallback(async () => {
    if (isProcessing.current || queue.current.length === 0) return;
    isProcessing.current = true;

    try {
      const request = queue.current[0];
      await request();
      queue.current.shift();
    } catch (error) {
      console.error('Queue processing error:', error);
    } finally {
      isProcessing.current = false;
      if (queue.current.length > 0) {
        processQueue();
      }
    }
  }, []);

  const enqueue = useCallback((request: () => Promise<void>) => {
    queue.current.push(request);
    processQueue();
  }, [processQueue]);

  return { enqueue };
};

// Add new interfaces for history
interface HistoryEntry {
  id: string;
  prompt: string;
  imageUrl: string;
  hash: string;
  timestamp: number;
  metadata: {
    generationTime: number;
    fromCache: boolean;
    seed: string;
  }
}

interface HistoryState {
  entries: HistoryEntry[];
  selectedId: string | null;
  error: Error | null;
  isLoading: boolean;
}

type HistoryAction =
  | { type: 'ADD_ENTRY'; entry: HistoryEntry }
  | { type: 'REMOVE_ENTRY'; id: string }
  | { type: 'SELECT_ENTRY'; id: string }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_ERROR'; error: Error }
  | { type: 'CLEAR_ERROR' }
  | { type: 'START_LOADING' }
  | { type: 'STOP_LOADING' };

// History reducer with improved error handling
const historyReducer = (state: HistoryState, action: HistoryAction): HistoryState => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [action.entry, ...state.entries.filter(e => e.hash !== action.entry.hash)],
        error: null
      };
    case 'REMOVE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter(e => e.id !== action.id),
        selectedId: state.selectedId === action.id ? null : state.selectedId
      };
    case 'SELECT_ENTRY':
      return {
        ...state,
        selectedId: action.id,
        error: null
      };
    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedId: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// New history components with improved interactions
const HistoryToggle = ({ isVisible, onToggle, hasNewItems }: { 
  isVisible: boolean; 
  onToggle: () => void;
  hasNewItems: boolean;
}) => (
  <motion.button
    onClick={onToggle}
    className={`
      relative p-3 rounded-xl transition-colors
      ${isVisible 
        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20' 
        : 'bg-gray-100/50 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
      }
      focus:outline-none focus:ring-2 focus:ring-blue-500/30
    `}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label={isVisible ? "Close history" : "Open history"}
  >
    <span className="text-lg">{isVisible ? '📚' : '📖'}</span>
    {hasNewItems && !isVisible && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
      />
    )}
  </motion.button>
);

const HistoryItem = ({ 
  entry,
  isSelected,
  onSelect,
  onRemove,
  onRegenerate 
}: { 
  entry: HistoryEntry;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onRegenerate: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        relative rounded-xl overflow-hidden
        ${isSelected 
          ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
          : 'hover:ring-1 hover:ring-gray-200 dark:hover:ring-gray-700'
        }
        bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all
      `}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative aspect-square"
        onClick={onSelect}
      >
        <Image
          src={entry.imageUrl}
          alt={entry.prompt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={isSelected}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 p-4 flex flex-col justify-end"
            >
              <p className="text-sm text-white line-clamp-2">{entry.prompt}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRegenerate();
                  }}
                  className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Regenerate image"
                >
                  ↺
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                  }}
                  className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Remove from history"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {entry.metadata.fromCache && (
          <div className="absolute top-2 right-2 p-1 bg-blue-500 rounded-md">
            <span className="text-xs text-white">⚡</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const HistoryPanel = ({
  isVisible,
  entries,
  selectedId,
  onClose,
  onSelect,
  onRemove,
  onRegenerate,
  error
}: {
  isVisible: boolean;
  entries: HistoryEntry[];
  selectedId: string | null;
  onClose: () => void;
  onSelect: (entry: HistoryEntry) => void;
  onRemove: (id: string) => void;
  onRegenerate: (entry: HistoryEntry) => void;
  error: Error | null;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState({ isDragging: false, startY: 0, translateY: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragState({
      isDragging: true,
      startY: e.touches[0].clientY,
      translateY: 0
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragState.isDragging) return;
    const deltaY = e.touches[0].clientY - dragState.startY;
    if (deltaY > 0) {
      setDragState(prev => ({ ...prev, translateY: deltaY }));
    }
  };

  const handleTouchEnd = () => {
    if (dragState.translateY > 100) {
      onClose();
    }
    setDragState({ isDragging: false, startY: 0, translateY: 0 });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: '100%' }}
          animate={{ 
            opacity: 1, 
            y: dragState.translateY || 0,
            transition: { type: "spring", damping: 30, stiffness: 300 }
          }}
          exit={{ opacity: 0, y: '100%' }}
          className="fixed bottom-20 inset-x-0 h-[70vh] bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl rounded-t-3xl overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full my-3" />
          
          <div className="h-full pt-8 pb-6 px-6 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-medium text-gray-900 dark:text-white">History</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {entries.length} {entries.length === 1 ? 'image' : 'images'} generated
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg transition-colors"
                aria-label="Close history"
              >
                ×
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg"
              >
                ⚠️ {error.message}
              </motion.div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {entries.map((entry) => (
                  <HistoryItem
                    key={entry.id}
                    entry={entry}
                    isSelected={entry.id === selectedId}
                    onSelect={() => onSelect(entry)}
                    onRemove={() => onRemove(entry.id)}
                    onRegenerate={() => onRegenerate(entry)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {entries.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 dark:text-gray-400">No images generated yet</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main component
export default function Home() {
  usePerfMetrics();
  const [imageState, dispatchImage] = useReducer(imageReducer, {
    url: null,
    loading: false,
    error: null,
    timestamp: 0
  });

  const [currentPrompt, setCurrentPrompt] = useState(DEFAULT_INPUT);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false);

  // Remove history-related state and handlers
  const abortController = useRef<AbortController | null>(null);
  const { get: getCachedImage, set: setCachedImage } = useImageCache();
  const { enqueue } = useRequestQueue();

  // Memoized hash function
  const generateHash = useMemo(() => (text: string) => {
    return createHash('sha256').update(text).digest('hex').substring(0, 8);
  }, []);

  // Update generateImage to use new history
  const generateImage = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;

    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();

    const hash = generateHash(prompt);
    const cachedUrl = getCachedImage(hash);
    const startTime = Date.now();

    if (cachedUrl) {
      dispatchImage({ type: 'LOAD_SUCCESS', url: cachedUrl, prompt });
      dispatchHistory({
        type: 'ADD_ENTRY',
        entry: {
          id: hash,
          prompt,
          imageUrl: cachedUrl,
          hash,
          timestamp: Date.now(),
          metadata: {
            generationTime: 0,
            fromCache: true,
            seed: hash
          }
        }
      });
      return;
    }

    dispatchImage({ type: 'START_LOADING', prompt });
    dispatchHistory({ type: 'START_LOADING' });

    try {
      const imageUrl = `/api/generate-image?text=${encodeURIComponent(prompt)}&seed=${hash}`;
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (abortController.current?.signal.aborted) return;

      dispatchImage({ type: 'LOAD_SUCCESS', url: imageUrl, prompt });
      setCachedImage(hash, imageUrl);
      
      dispatchHistory({
        type: 'ADD_ENTRY',
        entry: {
          id: hash,
          prompt,
          imageUrl,
          hash,
          timestamp: Date.now(),
          metadata: {
            generationTime: Date.now() - startTime,
            fromCache: false,
            seed: hash
          }
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatchImage({ type: 'LOAD_ERROR', error });
        dispatchHistory({ type: 'SET_ERROR', error });
      }
    } finally {
      dispatchHistory({ type: 'STOP_LOADING' });
    }
  }, [generateHash, getCachedImage, setCachedImage]);

  // Debounced generation for real-time mode
  const debouncedGenerate = useMemo(
    () => debounce((prompt: string) => {
      enqueue(() => generateImage(prompt));
    }, 2000),
    [generateImage, enqueue]
  );

  // Event handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrompt = e.target.value;
    setCurrentPrompt(newPrompt);
    
    if (isRealTimeEnabled) {
      debouncedGenerate(newPrompt);
    }
  }, [isRealTimeEnabled, debouncedGenerate]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!isRealTimeEnabled) {
      enqueue(() => generateImage(currentPrompt));
    }
  }, [isRealTimeEnabled, currentPrompt, generateImage, enqueue]);

  const handleRetry = useCallback(() => {
    enqueue(() => generateImage(currentPrompt));
  }, [currentPrompt, generateImage, enqueue]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  const [historyState, dispatchHistory] = useReducer(historyReducer, {
    entries: [],
    selectedId: null,
    error: null,
    isLoading: false
  });
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const hasNewItems = useMemo(() => {
    if (isHistoryVisible) return false;
    return historyState.entries.some(entry => 
      Date.now() - entry.timestamp < 5000
    );
  }, [historyState.entries, isHistoryVisible]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <main className="relative min-h-[calc(100vh-4rem)]">
          {/* Image Display */}
          <div className="absolute inset-0 flex items-center justify-center p-8 pb-24">
            <ImageDisplay
              url={imageState.url}
              alt={currentPrompt}
              loading={imageState.loading}
              error={imageState.error}
              onRetry={handleRetry}
            />
          </div>

          {/* Controls */}
          <nav className="fixed bottom-0 inset-x-0 z-50">
            <motion.div 
              className="glass-effect mx-auto px-4 sm:px-6 lg:px-8 pb-safe"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <form onSubmit={handleSubmit} className="flex items-center h-16 gap-4">
                <div className="flex items-center gap-2">
                  <RealTimeToggle 
                    enabled={isRealTimeEnabled}
                    onToggle={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                    isGenerating={imageState.loading}
                  />
                  <GenerateButton 
                    isGenerating={imageState.loading}
                    disabled={imageState.loading || isRealTimeEnabled}
                    hasError={!!imageState.error}
                  />
                </div>
                <div className="relative flex-1">
        <input
          type="text"
                    value={currentPrompt}
                    onChange={handleInputChange}
                    placeholder="Describe your vision..."
                    className="w-full px-4 py-2 text-base text-gray-900 dark:text-white bg-gray-100/50 dark:bg-gray-800/50 rounded-xl border-0 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
                  />
                  {currentPrompt !== DEFAULT_INPUT && (
                    <button
                      type="button"
                      onClick={() => setCurrentPrompt(DEFAULT_INPUT)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    >
                      ×
                    </button>
                  )}
                </div>
                <HistoryToggle
                  isVisible={isHistoryVisible}
                  onToggle={() => setIsHistoryVisible(!isHistoryVisible)}
                  hasNewItems={hasNewItems}
                />
              </form>
            </motion.div>
          </nav>

          {/* History Panel */}
          <HistoryPanel
            isVisible={isHistoryVisible}
            entries={historyState.entries}
            selectedId={historyState.selectedId}
            error={historyState.error}
            onClose={() => {
              setIsHistoryVisible(false);
              dispatchHistory({ type: 'CLEAR_SELECTION' });
            }}
            onSelect={(entry) => {
              dispatchHistory({ type: 'SELECT_ENTRY', id: entry.id });
              setCurrentPrompt(entry.prompt);
              if (!isRealTimeEnabled) {
                enqueue(() => generateImage(entry.prompt));
              }
            }}
            onRemove={(id) => dispatchHistory({ type: 'REMOVE_ENTRY', id })}
            onRegenerate={(entry) => {
              setCurrentPrompt(entry.prompt);
              enqueue(() => generateImage(entry.prompt));
            }}
          />
      </main>
    </div>
    </ErrorBoundary>
  );
}
