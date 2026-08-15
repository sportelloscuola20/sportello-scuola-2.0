import { useParams } from 'react-router-dom';
import AIChatContainer from '../components/intelligence/AIChatContainer';

export default function AssistantPage() {
  const { type } = useParams<{ type: string }>();

  const assistantTypeMap: Record<string, string> = {
    docente: 'Docente',
    ata: 'ATA',
    dirigente: 'Dirigente',
  };

  const assistantType = (type && assistantTypeMap[type]) || type || 'Docente';

  return (
    <div className="bg-gray-50" style={{ height: 'calc(100vh - 64px)', marginTop: '64px' }}>
      <AIChatContainer assistantType={assistantType} />
    </div>
  );
}
