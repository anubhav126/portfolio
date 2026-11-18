'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal, FileCode2 } from 'lucide-react';

const blueprints = [
  {
    id: 'kafka',
    filename: 'EventConsumerService.java',
    tabLabel: 'Kafka Stream',
    language: 'Java 17',
    tag: 'Distributed Systems',
    status: 'Spring Boot 3.2 • Kafka 3.6 • 15–25% Speedup',
    code: `package com.anubhav.eventstream.consumer;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventConsumerService {

  private final EventRepository eventRepository;
  private final MeterRegistry meterRegistry;

  @KafkaListener(
    topics = {"telemetry.events", "transactions.v1"},
    groupId = "ingestion-pipeline-group",
    containerFactory = "kafkaListenerContainerFactory"
  )
  @Transactional
  public void consumeEventRecord(
    @Payload TelemetryPayload payload,
    @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
    @Header(KafkaHeaders.OFFSET) long offset
  ) {
    // Validate schema & idempotent deduplication
    if (eventRepository.existsByEventId(payload.getEventId())) {
      log.debug("Duplicate event dropped: {}", payload.getEventId());
      return;
    }

    eventRepository.save(EventRecord.fromPayload(payload));
    meterRegistry.counter("pipeline.ingested.records").increment();
    log.info("Persisted event {} from topic:{} [15-25% gain]", 
             payload.getEventId(), topic);
  }
}`,
    explanation: 'High-throughput Kafka consumer handling 3–5 topics with schema validation, deduplication, and transactional SQL persistence.',
  },
  {
    id: 'rag',
    filename: 'spec_retriever.py',
    tabLabel: 'Python RAG',
    language: 'Python 3.11',
    tag: 'GenAI & LangChain',
    status: 'LangChain • Vector DB • Semantic Search',
    code: `from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate

class EngineeringSpecRetriever:
    """RAG assistant for semantic search across engineering specs."""

    def __init__(self, vectorstore_dir: str):
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        self.db = Chroma(
            persist_directory=vectorstore_dir,
            embedding_function=self.embeddings
        )
        self.retriever = self.db.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={"k": 4, "score_threshold": 0.78}
        )

    def query_specifications(self, natural_query: str) -> dict:
        docs = self.retriever.invoke(natural_query)
        return {
            "query": natural_query,
            "relevant_chunks": [d.page_content for d in docs],
            "sources": [d.metadata.get("source") for d in docs]
        }
`,
    explanation: 'RAG retrieval pipeline with embedding similarity thresholds for sub-second technical specification lookup.',
  },
  {
    id: 'ieee',
    filename: 'ckd_ensemble_model.py',
    tabLabel: 'IEEE Model',
    language: 'Python / ML',
    tag: 'Published Research',
    status: 'IEEE Xplore • Scikit-Learn • 97.5% Accuracy',
    code: `import numpy as np
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier
from sklearn.feature_selection import SelectKBest, f_classif

# IEEE 2024: Optimized CKD Prediction via 5-Feature Ensemble
def train_ckd_ensemble(X_train, y_train):
    # 5 optimal biomarkers selected from 24 clinical features
    selector = SelectKBest(score_func=f_classif, k=5)
    X_reduced = selector.fit_transform(X_train, y_train)

    rf_clf = RandomForestClassifier(n_estimators=150, max_depth=8, random_state=42)
    et_clf = ExtraTreesClassifier(n_estimators=150, random_state=42)
    
    rf_clf.fit(X_reduced, y_train)
    et_clf.fit(X_reduced, y_train)
    
    # Ensemble voting achieves 97.5% classification accuracy
    return {"selector": selector, "models": [rf_clf, et_clf], "accuracy": 0.975}
`,
    explanation: 'Dimensionality reduction selecting 5 optimal biomarkers to achieve 97.5% prediction accuracy on IEEE Xplore.',
  },
];

// Simple token highlight renderer
const renderHighlightedLine = (line) => {
  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
    return <span className="text-neutral-500 italic">{line}</span>;
  }
  if (trimmed.startsWith('"""') || trimmed.endsWith('"""')) {
    return <span className="text-emerald-400/90 italic">{line}</span>;
  }

  // Split tokens by preserving separators
  const parts = line.split(/("(?:[^"\\]|\\.)*"|@\w+|[a-zA-Z_]\w*|\s+|[^\s\w"]+)/g).filter(Boolean);

  const keywords = new Set([
    'package', 'import', 'from', 'public', 'class', 'private', 'final', 'void',
    'return', 'if', 'else', 'def', 'self', 'dict', 'str', 'int', 'float', 'boolean',
  ]);
  const types = new Set([
    'EventRepository', 'MeterRegistry', 'TelemetryPayload', 'String', 'KafkaHeaders',
    'EventRecord', 'Chroma', 'OpenAIEmbeddings', 'SelectKBest', 'RandomForestClassifier',
    'ExtraTreesClassifier', 'EngineeringSpecRetriever',
  ]);

  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('"') && part.endsWith('"')) {
          return <span key={i} className="text-emerald-400">{part}</span>;
        }
        if (part.startsWith('@')) {
          return <span key={i} className="text-purple-400 font-semibold">{part}</span>;
        }
        if (keywords.has(part)) {
          return <span key={i} className="text-primary-400 font-semibold">{part}</span>;
        }
        if (types.has(part)) {
          return <span key={i} className="text-sky-300">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const ArchitectureTerminal = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeBlueprint = blueprints[activeTab];

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(activeBlueprint.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#0D1117] border border-neutral-800 shadow-2xl overflow-hidden font-mono text-xs text-neutral-300">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-[#161B22] border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>
          <span className="ml-2 text-[11px] text-neutral-400 font-sans font-medium flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-primary-400" />
            anubhav@workstation: ~/architecture
          </span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#21262D] hover:bg-[#30363D] text-neutral-300 text-[11px] font-sans transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-neutral-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Blueprint Tabs */}
      <div className="flex items-center border-b border-neutral-800 bg-[#090D14] px-2 overflow-x-auto no-scrollbar">
        {blueprints.map((bp, index) => {
          const isActive = index === activeTab;
          return (
            <button
              key={bp.id}
              onClick={() => setActiveTab(index)}
              type="button"
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-sans font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-primary-500 text-white bg-[#0D1117]'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-[#161B22]/50'
              }`}
            >
              <FileCode2 className={`w-3.5 h-3.5 ${isActive ? 'text-primary-400' : 'text-neutral-500'}`} />
              <span>{bp.tabLabel}</span>
              <span className="text-[10px] text-neutral-500 hidden sm:inline">
                ({bp.filename.split('.').pop()})
              </span>
            </button>
          );
        })}
      </div>

      {/* Code Viewer Body */}
      <div className="p-3.5 sm:p-5 overflow-x-auto min-h-[300px] max-h-[360px] text-[11px] sm:text-xs leading-relaxed bg-[#0D1117] selection:bg-primary-950 selection:text-primary-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBlueprint.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <pre className="font-mono text-neutral-300 whitespace-pre">
              <code>
                {activeBlueprint.code.split('\n').map((line, idx) => (
                  <div key={idx} className="table-row">
                    <span className="table-cell select-none pr-3 sm:pr-4 text-neutral-600 text-right text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="table-cell">
                      {renderHighlightedLine(line)}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Architectural Context & Status Footer */}
      <div className="px-3.5 sm:px-4 py-2.5 bg-[#161B22] border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-neutral-400 font-sans">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
          <span className="truncate text-neutral-300">{activeBlueprint.explanation}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 text-neutral-500 font-mono text-[10px]">
          <span>{activeBlueprint.status}</span>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureTerminal;
