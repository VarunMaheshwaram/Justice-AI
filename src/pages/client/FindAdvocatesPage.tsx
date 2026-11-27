import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useAppData } from '../../hooks/useAppData';
import { PageHeader } from '../../components/common/PageHeader';
import { AdvocateDirectoryView } from '../../components/advocates/AdvocateDirectoryView';
import { Button } from '../../components/ui/button';

export const FindAdvocatesPage: React.FC = () => {
  const { savedAdvocateIds } = useAppData();

  return (
    <div className="space-y-6">
      <PageHeader
        meta="Advocate Discovery · Fictional Demo Profiles"
        title="Find Advocates"
        description="Search and filter advocates across India by location, specialization, experience, languages, and indicative consultation fee. Case documents are never shared automatically."
        actions={
          <Button asChild variant="outline">
            <Link to="/client/saved-advocates">
              <Bookmark className="h-4 w-4" />
              Saved Advocates ({savedAdvocateIds.length})
            </Link>
          </Button>
        }
      />

      <AdvocateDirectoryView basePath="/client/advocates" allowSave />
    </div>
  );
};
