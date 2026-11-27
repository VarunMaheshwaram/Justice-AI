import React, { useMemo, useState } from 'react';
import {
  Send,
  Plus,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';
import { SUGGESTED_CHAT_QUESTIONS } from '../../constants';
import { useAppData } from '../../hooks/useAppData';
import { ChatConversation, ChatMessage } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/button';
import { Input, Select } from '../../components/ui/input';
import { formatDateTime } from '../../utils/formatters';

function buildDemoAssistantResponse(
  prompt: string,
  caseTitle: string,
  docName: string
): string {
  const lower = prompt.toLowerCase();
  const contextLine = `Context: "${caseTitle}"${docName !== 'All Documents' ? ` · Focus document: ${docName}` : ' · All linked documents'}.`;

  if (lower.includes('simple english') || lower.includes('explain my case')) {
    return `${contextLine}\n\n[ILLUSTRATIVE DEMO RESPONSE]\nIn plain English, this sample matter centres on whether the opposing party met its written contractual commitments within the agreed deadline. Your uploaded sample agreement sets a clear handover date and requires written advance notice for any extension, while the opposing party’s written reply raises external regulatory delays as a defence.\n\nNext step to discuss with an advocate: Verify whether formal written notice was ever issued and confirm your payment reconciliation table.`;
  }

  if (lower.includes('contradiction')) {
    return `${contextLine}\n\n[ILLUSTRATIVE DEMO RESPONSE]\nThree potential inconsistencies appear in the demonstration dataset:\n1. Timeline conflict: A November 2024 CRM email states utility approvals were already in place, whereas the February 2026 reply alleges work halted from June 2024 due to municipal water approvals.\n2. Notice format conflict: Clause 9.2 requires written notice 45 days in advance, while the reply cites verbal site-visit briefings.\n3. Payment figure variance: Rs. 81,00,000 cited in the legal notice vs Rs. 76,50,000 in the opposing ledger (likely GST/club-charge accounting).\n\nPlease independently verify original copies before relying on these points.`;
  }

  if (lower.includes('supports my position') || lower.includes('support')) {
    return `${contextLine}\n\n[ILLUSTRATIVE DEMO RESPONSE]\nKey points supporting your demonstration stance include:\n• Express written handover deadline (31 Dec 2024) and mandatory written notice requirement in Clause 9.2.\n• Contemporaneous November 2024 email contradicting the later force-majeure timeline.\n• Documented payment of 90% of sale consideration across scheduled instalments.`;
  }

  if (lower.includes('weakens') || lower.includes('weak')) {
    return `${contextLine}\n\n[ILLUSTRATIVE DEMO RESPONSE]\nPotential vulnerabilities to address with a qualified advocate:\n• Reconcile the Rs. 4,50,000 difference between your notice ledger and the opposing statement.\n• Confirm electronic evidence certification requirements for the November 2024 email thread.\n• Review whether claiming both statutory interest and parallel rent reimbursement requires additional receipts.`;
  }

  if (lower.includes('date')) {
    return `${contextLine}\n\n[ILLUSTRATIVE DEMO RESPONSE]\nKey chronological milestones extracted from sample documents:\n• 12 Mar 2023 — Builder-Buyer Agreement signed\n• 18 Nov 2024 — Developer CRM email confirming 95% completion\n• 31 Dec 2024 — Contractual handover deadline\n• 22 Jan 2026 — Formal legal notice issued\n• 14 Feb 2026 — Developer reply invoking Force Majeure\n• 10 Dec 2026 — Illustrative evidence affidavit hearing date`;
  }

  if (lower.includes('section') || lower.includes('legal')) {
    return `${contextLine}\n\n[ILLUSTRATIVE DEMO RESPONSE]\nCommon Indian statutory concepts referenced in similar matters (educational summary only):\n• Consumer Protection Act, 2019 (deficiency in service & forum remedies)\n• RERA, 2016 — Section 18 (delay compensation or refund principles)\n• Indian Contract Act, 1872 — Sections 55 & 73 (time of performance & breach damages)\n• Bharatiya Sakshya Adhiniyam, 2023 (electronic record certification)\n\nAlways consult a practising advocate to confirm statutory applicability to your jurisdiction.`;
  }

  if (lower.includes('advocate') || lower.includes('discuss')) {
    return `${contextLine}\n\n[ILLUSTRATIVE DEMO RESPONSE]\nSuggested agenda for your next advocate consultation:\n1. Ask whether to seek discovery of municipal utility approval filing dates.\n2. Confirm the exact certificate required to tender the November 2024 email in evidence.\n3. Align on reconciling GST and base-price receipts in the payment affidavit.\n4. Discuss expected forum timelines versus mediated settlement possibilities.`;
  }

  return `${contextLine}\n\n[ILLUSTRATIVE DEMO RESPONSE]\nBased on the demonstration dataset for "${caseTitle}", the primary arguments revolve around contractual timelines, written notice requirements, and documentary proof of performance. In a live production deployment, JUSTICE AI will query indexed passages from your selected documents via RAG and cite exact page numbers.\n\nReminder: This sample response is illustrative only and does not constitute legal advice.`;
}

export const LegalAssistantPage: React.FC = () => {
  const { cases, documents } = useAppData();

  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id || '');
  const [selectedDocId, setSelectedDocId] = useState('all');
  const [inputText, setInputText] = useState('');

  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: 'conv-initial',
      title: 'Possession Delay Case Review',
      caseId: cases[0]?.id || 'case-001',
      documentId: 'all',
      updatedAt: '2026-11-26T08:30:00Z',
      messages: [
        {
          id: 'msg-welcome',
          sender: 'assistant',
          content:
            'Welcome to Ask Justice AI (Demonstration Mode). Select a case and document context above, or click one of the suggested questions below to explore how JUSTICE AI explains legal documents in plain English.\n\nAll responses in this frontend release are local illustrative samples and do not constitute legal advice.',
          timestamp: '2026-11-26T08:30:00Z',
          isIllustrative: true,
        },
      ],
    },
  ]);

  const [activeConvId, setActiveConvId] = useState('conv-initial');

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConvId) || conversations[0],
    [activeConvId, conversations]
  );

  const caseDocuments = useMemo(
    () => documents.filter((d) => d.caseId === selectedCaseId),
    [documents, selectedCaseId]
  );

  const selectedCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
  const selectedDocName =
    selectedDocId === 'all'
      ? 'All Documents'
      : caseDocuments.find((d) => d.id === selectedDocId)?.fileName || 'All Documents';

  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`;
    const newConv: ChatConversation = {
      id: newId,
      title: `New Consultation · ${selectedCase?.title.slice(0, 22) || 'General'}`,
      caseId: selectedCaseId,
      documentId: selectedDocId,
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          content: `Started a fresh demonstration thread for "${selectedCase?.title || 'your case'}". Ask a question or pick a suggested prompt below.`,
          timestamp: new Date().toISOString(),
          isIllustrative: true,
        },
      ],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newId);
  };

  const handleSendMessage = (textOverride?: string) => {
    const prompt = (textOverride ?? inputText).trim();
    if (!prompt || !activeConversation) return;

    const now = new Date().toISOString();
    const userMsg: ChatMessage = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      content: prompt,
      timestamp: now,
    };
    const replyMsg: ChatMessage = {
      id: `msg-a-${Date.now() + 1}`,
      sender: 'assistant',
      content: buildDemoAssistantResponse(
        prompt,
        selectedCase?.title || 'Selected Case',
        selectedDocName
      ),
      timestamp: new Date().toISOString(),
      isIllustrative: true,
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              title:
                conv.messages.length <= 1 ? prompt.slice(0, 36) : conv.title,
              updatedAt: now,
              messages: [...conv.messages, userMsg, replyMsg],
            }
          : conv
      )
    );
    setInputText('');
  };

  const handleCopy = (content: string) => {
    navigator.clipboard?.writeText(content);
    toast.success('Response copied to clipboard.');
  };

  const handleFeedback = (msgId: string, feedback: 'helpful' | 'not_helpful') => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id !== activeConversation.id
          ? conv
          : {
              ...conv,
              messages: conv.messages.map((m) =>
                m.id === msgId ? { ...m, feedback } : m
              ),
            }
      )
    );
    toast.success('Feedback noted in demo mode.');
  };

  const handleClearConversation = () => {
    if (!activeConversation) return;
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              messages: [
                {
                  id: `msg-clr-${Date.now()}`,
                  sender: 'assistant',
                  content:
                    'Conversation cleared. Ask a new question below to view an illustrative response.',
                  timestamp: new Date().toISOString(),
                  isIllustrative: true,
                },
              ],
            }
          : conv
      )
    );
    toast.info('Conversation cleared.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Illustrative Local Chat · Demonstration Mode"
        title="Ask Justice AI"
        description="Ask plain-language questions about your selected case and documents. Sample responses are illustrative only and do not constitute legal advice."
        actions={
          <Button variant="outline" size="sm" onClick={handleNewConversation}>
            <Plus className="h-4 w-4" />
            New Conversation
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Chat History Sidebar */}
        <aside className="lg:col-span-3 rounded-lg border border-[#E5E9EF] bg-white p-4 space-y-4 self-start">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#14243A]">Conversations</h2>
            <span className="text-xs text-[#697586] tabular-nums">{conversations.length}</span>
          </div>
          <div className="space-y-1.5">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full rounded-md px-3 py-2.5 text-left transition-colors cursor-pointer ${
                  conv.id === activeConversation?.id
                    ? 'bg-[#14243A] text-white'
                    : 'bg-[#F7F8FA] text-[#202936] hover:bg-[#eceff4]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 shrink-0 text-[#D9874D]" />
                  <span className="text-xs font-medium truncate">{conv.title}</span>
                </div>
                <p
                  className={`mt-1 text-[11px] tabular-nums ${
                    conv.id === activeConversation?.id ? 'text-slate-300' : 'text-[#697586]'
                  }`}
                >
                  {conv.messages.length} message(s)
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Chat Panel */}
        <section className="lg:col-span-9 rounded-lg border border-[#E5E9EF] bg-white flex flex-col min-h-[600px]">
          {/* Context Selectors */}
          <div className="border-b border-[#E5E9EF] p-4 grid grid-cols-1 gap-3 sm:grid-cols-12 items-center">
            <div className="sm:col-span-5">
              <Select
                value={selectedCaseId}
                onChange={(e) => {
                  setSelectedCaseId(e.target.value);
                  setSelectedDocId('all');
                }}
                aria-label="Select case context"
              >
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    Case: {c.title}
                  </option>
                ))}
              </Select>
            </div>
            <div className="sm:col-span-5">
              <Select
                value={selectedDocId}
                onChange={(e) => setSelectedDocId(e.target.value)}
                aria-label="Select document context"
              >
                <option value="all">Document Scope: All Case Documents</option>
                {caseDocuments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.fileName}
                  </option>
                ))}
              </Select>
            </div>
            <div className="sm:col-span-2 flex sm:justify-end">
              <Button variant="ghost" size="sm" onClick={handleClearConversation}>
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[440px]">
            {activeConversation?.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-2xl rounded-lg px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#14243A] text-white'
                      : 'border border-[#E5E9EF] bg-[#F7F8FA] text-[#202936]'
                  }`}
                >
                  {msg.isIllustrative && (
                    <p className="mb-1.5 text-[11px] font-semibold text-[#D9874D]">
                      JUSTICE AI · Illustrative Demo Output
                    </p>
                  )}
                  <p>{msg.content}</p>
                </div>

                <div className="mt-1.5 flex items-center gap-3 px-1 text-[11px] text-[#697586]">
                  <span className="tabular-nums">{formatDateTime(msg.timestamp)}</span>
                  {msg.sender === 'assistant' && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.content)}
                        className="inline-flex items-center gap-1 hover:text-[#14243A] cursor-pointer"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFeedback(msg.id, 'helpful')}
                        className={`inline-flex items-center gap-1 cursor-pointer ${
                          msg.feedback === 'helpful' ? 'text-[#24845D] font-semibold' : 'hover:text-[#14243A]'
                        }`}
                        aria-label="Mark response helpful"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        Helpful
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFeedback(msg.id, 'not_helpful')}
                        className={`inline-flex items-center gap-1 cursor-pointer ${
                          msg.feedback === 'not_helpful'
                            ? 'text-[#C94D4D] font-semibold'
                            : 'hover:text-[#14243A]'
                        }`}
                        aria-label="Mark response not helpful"
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          <div className="border-t border-[#E5E9EF] bg-[#F7F8FA] px-4 py-3 space-y-2">
            <p className="text-[11px] font-medium text-[#697586]">Suggested Questions</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_CHAT_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="rounded-md border border-[#E5E9EF] bg-white px-2.5 py-1.5 text-xs text-[#14243A] hover:border-[#14243A] transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-t border-[#E5E9EF] p-4 flex items-center gap-2.5"
          >
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question about your case, clauses, dates, or legal sections..."
              className="flex-1"
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
              Send
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
};
