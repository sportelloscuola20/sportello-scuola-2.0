import { useParams } from 'react-router-dom';
import AIChatContainer from '../components/intelligence/AIChatContainer';

export default function AssistantPage() {
  const { type } = useParams<{ type: string }>();

  // Map the type from the URL to the assistant type for display
  const assistantTypeMap: Record<string, string> = {
    docente: 'Docente',
    ata: 'ATA',
    dirigente: 'Dirigente',
    sindacale: 'Sindacale',
  };

  const assistantType = assistantTypeMap[type] || type;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <AIChatContainer assistantType={assistantType} />
      </div>
    </div>
  );
}