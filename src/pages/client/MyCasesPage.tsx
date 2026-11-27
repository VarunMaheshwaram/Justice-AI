import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Archive,
  Trash2,
  Briefcase,
  ArrowUpRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../hooks/useAppData';
import { CASE_CATEGORIES } from '../../constants';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/ui/button';
import { Input, Select } from '../../components/ui/input';
import { formatDate } from '../../utils/formatters';

export const MyCasesPage: React.FC = () => {
  const { cases, archiveCase, deleteCase } = useAppData();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'updated' | 'title' | 'filing'>('updated');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCases = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cases
      .filter((c) => {
        if (category !== 'All' && c.category !== category) return false;
        if (statusFilter !== 'All' && c.status !== statusFilter) return false;
        if (
          q &&
          !c.title.toLowerCase().includes(q) &&
          !c.caseNumber.toLowerCase().includes(q) &&
          !c.opposingParty.toLowerCase().includes(q) &&
          !c.courtName.toLowerCase().includes(q)
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'filing') return b.filingDate.localeCompare(a.filingDate);
        return b.lastUpdated.localeCompare(a.lastUpdated);
      });
  }, [cases, category, search, sortBy, statusFilter]);

  const handleArchive = (id: string, title: string, currentStatus: string) => {
    archiveCase(id);
    toast.success(
      currentStatus === 'Archived'
        ? `Restored "${title}" to active cases.`
        : `Archived "${title}".`
    );
  };

  const handleDelete = (id: string, title: string) => {
    deleteCase(id);
    toast.success(`Deleted "${title}" from local demo workspace.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Case Management · Demo Records"
        title="My Cases"
        description="Organise active and archived legal matters, track stages, and access case-specific documents and AI insights."
        actions={
          <Button asChild>
            <Link to="/client/cases/new">
              <Plus className="h-4 w-4" />
              Create Case
            </Link>
          </Button>
        }
      />

      {/* Search, Filters, Sorting, View Switcher */}
      <div className="rounded-lg border border-[#E5E9EF] bg-white p-4 grid grid-cols-1 gap-3 md:grid-cols-12 items-center">
        <div className="md:col-span-4 relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#697586]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, number, court, or party..."
            className="pl-9"
          />
        </div>
        <div className="md:col-span-3">
          <Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
            <option value="All">All Categories</option>
            {CASE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </div>
        <div className="md:col-span-2">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="In Review">In Review</option>
            <option value="Pending Hearing">Pending Hearing</option>
            <option value="Archived">Archived</option>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'updated' | 'title' | 'filing')}
            aria-label="Sort cases"
          >
            <option value="updated">Sort: Recently Updated</option>
            <option value="filing">Sort: Filing Date</option>
            <option value="title">Sort: Alphabetical</option>
          </Select>
        </div>
        <div className="md:col-span-1 flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`h-10 w-10 inline-flex items-center justify-center rounded-md border transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'border-[#14243A] bg-[#14243A] text-white'
                : 'border-[#E5E9EF] bg-white text-[#697586] hover:text-[#14243A]'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`h-10 w-10 inline-flex items-center justify-center rounded-md border transition-colors cursor-pointer ${
              viewMode === 'list'
                ? 'border-[#14243A] bg-[#14243A] text-white'
                : 'border-[#E5E9EF] bg-white text-[#697586] hover:text-[#14243A]'
            }`}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {filteredCases.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No matching cases found"
          description="Try adjusting your search or filter criteria, or create a new legal case workspace."
          action={
            <Button asChild>
              <Link to="/client/cases/new">Create New Case</Link>
            </Button>
          }
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredCases.map((item) => (
            <article
              key={item.id}
              className="rounded-lg border border-[#E5E9EF] bg-white p-6 flex flex-col justify-between gap-4 hover:border-[#cfd7e3] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs text-[#697586]">
                  <span>
                    {item.category} · <span className="font-mono tabular-nums">{item.caseNumber}</span>
                  </span>
                  <StatusText status={item.status} />
                </div>

                <div>
                  <Link
                    to={`/client/cases/${item.id}`}
                    className="text-base font-semibold text-[#14243A] hover:text-[#D9874D] transition-colors"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1.5 text-sm text-[#697586] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-[#E5E9EF] pt-3 text-xs">
                  <div>
                    <p className="text-[#697586]">Your Role</p>
                    <p className="font-medium text-[#202936] mt-0.5">{item.userRole}</p>
                  </div>
                  <div>
                    <p className="text-[#697586]">Court Location</p>
                    <p className="font-medium text-[#202936] mt-0.5 truncate">{item.courtLocation}</p>
                  </div>
                  <div>
                    <p className="text-[#697586]">Current Stage</p>
                    <p className="font-medium text-[#202936] mt-0.5 truncate">{item.currentStage}</p>
                  </div>
                  <div>
                    <p className="text-[#697586]">Documents · Updated</p>
                    <p className="font-medium text-[#202936] mt-0.5 tabular-nums">
                      {item.documentCount} files · {formatDate(item.lastUpdated)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-[#E5E9EF] pt-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleArchive(item.id, item.title, item.status)}
                  >
                    <Archive className="h-3.5 w-3.5" />
                    {item.status === 'Archived' ? 'Restore' : 'Archive'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#C94D4D] hover:text-[#C94D4D]"
                    onClick={() => handleDelete(item.id, item.title)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link to={`/client/cases/${item.id}`}>
                    Open Case
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-[#E5E9EF] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E9EF] bg-[#F7F8FA] text-xs font-medium text-[#697586]">
                  <th className="px-5 py-3">Case</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Docs</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E9EF] text-sm">
                {filteredCases.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F7F8FA]">
                    <td className="px-5 py-3.5">
                      <Link
                        to={`/client/cases/${item.id}`}
                        className="font-medium text-[#14243A] hover:text-[#D9874D]"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs font-mono text-[#697586] tabular-nums">
                        {item.caseNumber}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#202936] whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#697586] whitespace-nowrap">
                      {item.userRole}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#202936] max-w-[200px] truncate">
                      {item.currentStage}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusText status={item.status} />
                    </td>
                    <td className="px-4 py-3.5 text-right text-xs font-mono tabular-nums">
                      {item.documentCount}
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-2">
                      <Link
                        to={`/client/cases/${item.id}`}
                        className="text-xs font-semibold text-[#14243A] hover:text-[#D9874D]"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleArchive(item.id, item.title, item.status)}
                        className="text-xs font-medium text-[#697586] hover:text-[#14243A] cursor-pointer"
                      >
                        {item.status === 'Archived' ? 'Restore' : 'Archive'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.title)}
                        className="text-xs font-medium text-[#C94D4D] hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
