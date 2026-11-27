import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { DisclaimerBanner } from '../../components/common/DisclaimerBanner';

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4">
        <p className="text-xs font-semibold text-[#D9874D]">About JUSTICE AI</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#14243A]">
          Bridging the gap between complex legal documents and everyday understanding in India.
        </h1>
        <p className="text-base text-[#697586] leading-relaxed">
          JUSTICE AI is an AI-assisted legal case intelligence platform designed to help citizens,
          families, and small enterprises make sense of legal records, organise case chronologies,
          identify potential inconsistencies, and discover qualified advocates.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            title: 'Neutral & Balanced',
            text: 'We surface both supporting facts and counter-arguments rather than telling users only what they want to hear.',
          },
          {
            title: 'Advocate-Complementary',
            text: 'JUSTICE AI prepares informed clients for productive legal consultations; it never claims to replace advocates or courts.',
          },
          {
            title: 'Built for India',
            text: 'Structured around Indian court stages, statutory categories, state bar directories, and multi-language consultation preferences.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-2">
            <h2 className="text-base font-semibold text-[#14243A]">{item.title}</h2>
            <p className="text-sm text-[#697586] leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-[#E5E9EF] bg-white p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold text-[#14243A]">Planned Technical Architecture</h2>
        <p className="text-sm text-[#697586] leading-relaxed">
          This release represents the complete interactive frontend application built with React,
          TypeScript, Tailwind CSS, and typed service abstractions. It is engineered to connect
          cleanly to a future Python FastAPI backend, PostgreSQL with pgvector RAG retrieval,
          PyMuPDF + Tesseract OCR document pipelines, private object storage, and audited LLM APIs.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/login">Explore Demo Workspaces</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Contact Team</Link>
          </Button>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
