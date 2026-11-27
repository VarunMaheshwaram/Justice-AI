import React, { useMemo, useState } from 'react';
import { Search, BookOpen, Clock } from 'lucide-react';
import { LEGAL_KNOWLEDGE_CATEGORIES } from '../../constants';
import { useAppData } from '../../hooks/useAppData';
import { LegalKnowledgeItem } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { Input, Select } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { formatDate } from '../../utils/formatters';

const CONTENT_TYPES = [
  'All',
  'Act & Legislation',
  'Legal Section',
  'Court Judgment',
  'Legal Definition',
] as const;

export const LegalKnowledgePage: React.FC = () => {
  const { legalSources, recentlyViewedLegalIds, markLegalSourceViewed } = useAppData();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [contentType, setContentType] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<LegalKnowledgeItem | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return legalSources.filter((item) => {
      if (category !== 'All' && item.category !== category) return false;
      if (contentType !== 'All' && item.type !== contentType) return false;
      if (
        q &&
        !item.title.toLowerCase().includes(q) &&
        !item.description.toLowerCase().includes(q) &&
        !item.category.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [category, contentType, legalSources, search]);

  const popularTopics = useMemo(
    () => legalSources.filter((item) => item.isPopular).slice(0, 4),
    [legalSources]
  );

  const recentlyViewed = useMemo(
    () =>
      recentlyViewedLegalIds
        .map((id) => legalSources.find((item) => item.id === id))
        .filter((x): x is LegalKnowledgeItem => Boolean(x)),
    [legalSources, recentlyViewedLegalIds]
  );

  const openItem = (item: LegalKnowledgeItem) => {
    markLegalSourceViewed(item.id);
    setActiveItem(item);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Educational Demonstration Records · Non-Authoritative Summary"
        title="Indian Legal Knowledge"
        description="Search plain-language explanations of Indian legislation, statutory sections, procedural definitions, and illustrative legal concepts."
      />

      {/* Search & Filters */}
      <div className="rounded-lg border border-[#E5E9EF] bg-white p-4 space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-6 relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#697586]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Acts, sections, definitions, or legal concepts..."
              className="pl-9"
            />
          </div>
          <div className="md:col-span-3">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by legal category"
            >
              <option value="All">All Legal Categories</option>
              {LEGAL_KNOWLEDGE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </div>
          <div className="md:col-span-3">
            <Select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              aria-label="Filter by record type"
            >
              {CONTENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Record Types' : t}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Interactive Filter Tabs for Content Types */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-[#E5E9EF] pt-3">
          {CONTENT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setContentType(t)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                contentType === t
                  ? 'bg-[#14243A] text-white'
                  : 'bg-[#F7F8FA] text-[#697586] hover:text-[#14243A]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid + Sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-4">
          {filtered.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No legal knowledge records found"
              description="Try a different keyword or switch back to All Categories."
            />
          ) : (
            filtered.map((item) => (
              <article
                key={item.id}
                onClick={() => openItem(item)}
                className="rounded-lg border border-[#E5E9EF] bg-white p-5 space-y-2.5 hover:border-[#14243A]/40 transition-colors cursor-pointer"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#697586]">
                  <span>
                    <strong className="font-semibold text-[#D9874D]">{item.type}</strong> ·{' '}
                    {item.category} · {item.jurisdiction}
                  </span>
                  <span className="tabular-nums">Updated {formatDate(item.lastUpdated)}</span>
                </div>
                <h2 className="text-base font-semibold text-[#14243A]">{item.title}</h2>
                <p className="text-sm text-[#697586] leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E5E9EF] text-xs text-[#697586]">
                  <span>{item.source}</span>
                  <span className="font-semibold text-[#14243A]">Read summary →</span>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="lg:col-span-4 space-y-5">
          <div className="rounded-lg border border-[#E5E9EF] bg-white p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#14243A]">Popular Topics</h3>
            <div className="divide-y divide-[#E5E9EF]">
              {popularTopics.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openItem(item)}
                  className="w-full py-2.5 text-left hover:text-[#D9874D] transition-colors cursor-pointer"
                >
                  <p className="text-xs font-medium text-[#14243A] line-clamp-2">{item.title}</p>
                  <p className="text-[11px] text-[#697586] mt-0.5">{item.category}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#E5E9EF] bg-white p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#14243A] flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#D9874D]" />
              Recently Viewed
            </h3>
            <div className="divide-y divide-[#E5E9EF]">
              {recentlyViewed.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openItem(item)}
                  className="w-full py-2.5 text-left cursor-pointer"
                >
                  <p className="text-xs font-medium text-[#14243A] hover:text-[#D9874D] line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-[#697586] mt-0.5">
                    {item.type} · {item.category}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Reader Modal */}
      <Dialog open={Boolean(activeItem)} onOpenChange={(o) => !o && setActiveItem(null)}>
        <DialogContent className="max-w-2xl">
          {activeItem && (
            <>
              <DialogHeader>
                <DialogTitle>{activeItem.title}</DialogTitle>
                <DialogDescription>
                  {activeItem.type} · {activeItem.category} · {activeItem.jurisdiction}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm text-[#202936]">
                <p className="leading-relaxed">{activeItem.description}</p>
                <div className="rounded-md border border-[#E5E9EF] bg-[#F7F8FA] p-4 space-y-2">
                  <p className="text-xs font-semibold text-[#14243A]">
                    Plain-Language Reference Notes (Demo Record)
                  </p>
                  <p className="text-sm leading-relaxed text-[#202936]">
                    {activeItem.detailedNotes}
                  </p>
                </div>
                <div className="flex flex-wrap justify-between gap-2 text-xs text-[#697586] border-t border-[#E5E9EF] pt-3">
                  <span>Source: {activeItem.source}</span>
                  <span className="tabular-nums">
                    Enacted / Dated: {formatDate(activeItem.date)} · Updated:{' '}
                    {formatDate(activeItem.lastUpdated)}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
