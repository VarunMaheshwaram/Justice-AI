import React, { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  Eye,
  Trash2,
  Search,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { DOCUMENT_CATEGORIES, DOCUMENT_STATUSES } from '../../constants';
import { useAppData } from '../../hooks/useAppData';
import { CaseDocument } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusText } from '../../components/common/StatCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/ui/button';
import { Input, Label, Select } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { formatDate, formatFileSize } from '../../utils/formatters';

const ALLOWED_EXTENSIONS = ['PDF', 'DOCX', 'JPG', 'JPEG', 'PNG'] as const;
const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20 MB

export const DocumentsPage: React.FC = () => {
  const { cases, documents, addDocument, updateDocumentStatus, deleteDocument } = useAppData();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedCaseId, setSelectedCaseId] = useState(
    searchParams.get('caseId') || cases[0]?.id || ''
  );
  const [uploadCategory, setUploadCategory] = useState<string>('Legal Notice');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const [search, setSearch] = useState('');
  const [filterCase, setFilterCase] = useState(searchParams.get('caseId') || 'All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [previewDoc, setPreviewDoc] = useState<CaseDocument | null>(null);

  const filteredDocuments = useMemo(() => {
    const q = search.trim().toLowerCase();
    return documents.filter((doc) => {
      if (filterCase !== 'All' && doc.caseId !== filterCase) return false;
      if (filterCategory !== 'All' && doc.category !== filterCategory) return false;
      if (filterStatus !== 'All' && doc.status !== filterStatus) return false;
      if (
        q &&
        !doc.fileName.toLowerCase().includes(q) &&
        !doc.caseTitle.toLowerCase().includes(q) &&
        !doc.category.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [documents, filterCase, filterCategory, filterStatus, search]);

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    const targetCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
    if (!targetCase) {
      toast.error('Please create a case before uploading documents.');
      return;
    }

    const validFiles: File[] = [];
    for (const file of fileArray) {
      const ext = file.name.split('.').pop()?.toUpperCase() || '';
      if (!ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])) {
        toast.error(
          `Unsupported format "${file.name}". Allowed: PDF, DOCX, JPG, JPEG, PNG.`
        );
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        toast.error(`"${file.name}" exceeds the 20 MB demonstration size limit.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setUploadProgress(15);
    let progress = 15;
    const interval = window.setInterval(() => {
      progress += 28;
      if (progress >= 100) {
        window.clearInterval(interval);
        setUploadProgress(100);
        validFiles.forEach((file) => {
          const ext = (file.name.split('.').pop()?.toUpperCase() || 'PDF') as CaseDocument['fileType'];
          const created = addDocument({
            caseId: targetCase.id,
            caseTitle: targetCase.title,
            fileName: file.name,
            fileType: ext,
            fileSizeBytes: file.size || 245000,
            category: uploadCategory,
            status: 'Processing',
            pageCount: ext === 'PDF' || ext === 'DOCX' ? Math.max(2, Math.floor(Math.random() * 14) + 2) : 1,
            extractedPreview: `[SIMULATED EXTRACTION] Sample preview generated locally for "${file.name}" under category "${uploadCategory}". No file bytes were transmitted to any external server.`,
          });
          window.setTimeout(() => {
            updateDocumentStatus(created.id, 'Ready for Analysis');
          }, 1600);
        });
        toast.success(
          `${validFiles.length} document(s) uploaded in simulated mode. Processing will complete shortly.`
        );
        window.setTimeout(() => setUploadProgress(null), 700);
      } else {
        setUploadProgress(progress);
      }
    }, 180);
  };

  const handleAddSampleFile = () => {
    const targetCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
    if (!targetCase) return;
    const created = addDocument({
      caseId: targetCase.id,
      caseTitle: targetCase.title,
      fileName: `Sample_${uploadCategory.replace(/\s+/g, '_')}_${Math.floor(Math.random() * 900 + 100)}.pdf`,
      fileType: 'PDF',
      fileSizeBytes: 512800,
      category: uploadCategory,
      status: 'Ready for Analysis',
      pageCount: 5,
      extractedPreview: `[SIMULATED SAMPLE EXTRACT] Demonstration placeholder document created for "${targetCase.title}".`,
    });
    toast.success(`Added simulated document "${created.fileName}".`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Document Workspace · Simulated Local Processing"
        title="Documents"
        description="Upload, categorise, preview, and organise legal filings by case. All uploads and OCR processing in this phase are simulated locally."
        actions={
          <Button variant="outline" onClick={handleAddSampleFile}>
            Add Sample Demo File
          </Button>
        }
      />

      {/* Upload Area */}
      <section className="rounded-lg border border-[#E5E9EF] bg-white p-6 space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="upload-case">Associate with Case</Label>
            <Select
              id="upload-case"
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.caseNumber})
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="upload-category">Document Category</Label>
            <Select
              id="upload-category"
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
            >
              {DOCUMENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragging
              ? 'border-[#D9874D] bg-[#F5E4D6]/25'
              : 'border-[#E5E9EF] bg-[#F7F8FA] hover:border-[#14243A]/40'
          }`}
        >
          <UploadCloud className="mx-auto h-9 w-9 text-[#14243A]" />
          <p className="mt-3 text-sm font-semibold text-[#14243A]">
            Drag and drop case documents here, or browse from your device
          </p>
          <p className="mt-1 text-xs text-[#697586]">
            Supported formats: PDF, DOCX, JPG, JPEG, PNG · Max 20 MB per file · Simulated processing
            only (do not upload confidential records)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) processFiles(e.target.files);
              e.target.value = '';
            }}
          />
          <div className="mt-4 flex justify-center">
            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              Browse Files
            </Button>
          </div>

          {uploadProgress !== null && (
            <div className="mx-auto mt-5 max-w-md space-y-1.5 text-left">
              <div className="flex justify-between text-xs font-medium text-[#14243A] tabular-nums">
                <span>Simulating upload & validation...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#E5E9EF] overflow-hidden">
                <div
                  className="h-full bg-[#D9874D] transition-all duration-150"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <div className="rounded-lg border border-[#E5E9EF] bg-white p-4 grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="md:col-span-4 relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#697586]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search file name or case..."
            className="pl-9"
          />
        </div>
        <div className="md:col-span-3">
          <Select value={filterCase} onChange={(e) => setFilterCase(e.target.value)}>
            <option value="All">All Cases</option>
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </Select>
        </div>
        <div className="md:col-span-3">
          <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {DOCUMENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </div>
        <div className="md:col-span-2">
          <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All States</option>
            {DOCUMENT_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Document Table */}
      {filteredDocuments.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No documents match your filters"
          description="Upload a sample document above or clear active filters to view demonstration records."
        />
      ) : (
        <div className="rounded-lg border border-[#E5E9EF] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E9EF] bg-[#F7F8FA] text-xs font-medium text-[#697586]">
                  <th className="px-5 py-3">File Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Case</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Upload Date</th>
                  <th className="px-4 py-3">Status (Simulated)</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E9EF] text-sm">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#F7F8FA]">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-[#14243A] max-w-[240px] truncate">
                        {doc.fileName}
                      </p>
                      <p className="text-xs text-[#697586] tabular-nums">
                        {formatFileSize(doc.fileSizeBytes)} · {doc.pageCount} page(s)
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#202936] whitespace-nowrap">
                      {doc.category}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#697586] max-w-[200px] truncate">
                      {doc.caseTitle}
                    </td>
                    <td className="px-4 py-3.5 text-xs font-mono text-[#14243A]">{doc.fileType}</td>
                    <td className="px-4 py-3.5 text-xs text-[#697586] whitespace-nowrap tabular-nums">
                      {formatDate(doc.uploadDate)}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusText status={doc.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        {doc.status === 'Failed' && (
                          <button
                            type="button"
                            onClick={() => {
                              updateDocumentStatus(doc.id, 'Ready for Analysis');
                              toast.success('Simulated retry completed.');
                            }}
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#D9874D] hover:underline cursor-pointer"
                            title="Retry simulated OCR"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                            Retry
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setPreviewDoc(doc)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#14243A] hover:text-[#D9874D] cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Preview
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteDocument(doc.id);
                            toast.success(`Removed "${doc.fileName}".`);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#C94D4D] hover:underline cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <Dialog open={Boolean(previewDoc)} onOpenChange={(o) => !o && setPreviewDoc(null)}>
        <DialogContent className="max-w-2xl">
          {previewDoc && (
            <>
              <DialogHeader>
                <DialogTitle>{previewDoc.fileName}</DialogTitle>
                <DialogDescription>
                  {previewDoc.category} · {previewDoc.caseTitle} · Simulated Document Preview
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-md bg-[#F7F8FA] border border-[#E5E9EF] p-3.5 text-xs">
                  <div>
                    <p className="text-[#697586]">Format</p>
                    <p className="font-mono font-semibold text-[#14243A]">{previewDoc.fileType}</p>
                  </div>
                  <div>
                    <p className="text-[#697586]">Size</p>
                    <p className="font-mono font-semibold text-[#14243A] tabular-nums">
                      {formatFileSize(previewDoc.fileSizeBytes)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#697586]">Pages</p>
                    <p className="font-mono font-semibold text-[#14243A] tabular-nums">
                      {previewDoc.pageCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#697586]">Simulated State</p>
                    <StatusText status={previewDoc.status} />
                  </div>
                </div>
                <div className="rounded-md border border-[#E5E9EF] bg-white p-5 space-y-2">
                  <p className="text-xs font-semibold text-[#D9874D]">
                    Extracted Text Preview (Demonstration Only)
                  </p>
                  <p className="text-sm text-[#202936] leading-relaxed whitespace-pre-wrap">
                    {previewDoc.extractedPreview}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
