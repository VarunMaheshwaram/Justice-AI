import React from 'react';
import { Link } from 'react-router-dom';
import { JusticeLogo } from '../common/JusticeLogo';
import { LEGAL_DISCLAIMER_TEXT } from '../../constants';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#E5E9EF] bg-[#0D1929] text-white no-print">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-4">
            <JusticeLogo variant="light" />
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Understand Your Case. Make Informed Decisions. An AI-assisted legal information and
              document analysis workspace built for India.
            </p>
            <p className="text-xs text-slate-400">
              Frontend Demonstration Release · India Legal Technology Initiative
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-white">Platform</h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/find-advocates" className="hover:text-white transition-colors">
                  Find Advocates
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Demo Access
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-white">Legal & Trust</h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">
                  Legal Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 space-y-3">
          <p className="text-xs text-slate-400 leading-relaxed">{LEGAL_DISCLAIMER_TEXT}</p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} JUSTICE AI. All demonstration profiles, documents, and
            sample legal outputs are fictional placeholders.
          </p>
        </div>
      </div>
    </footer>
  );
};
