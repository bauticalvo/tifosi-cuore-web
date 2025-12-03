// components/SelectFaq.tsx
import { useState } from 'react';
import { BiChevronDown, BiSearch } from 'react-icons/bi';

interface SelectFaqProps {
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

export const SelectFaq = ({ faqs }: SelectFaqProps) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [search, setSearch] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  const selectedFaq = faqs.find(faq => faq.id === selectedId);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Selector de FAQ */}
      <div className="mb-6">
        <div className="relative mb-4">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar pregunta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div className="relative">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg py-3 pl-4 pr-10 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          >
            <option value="">Selecciona una pregunta frecuente</option>
            {filteredFaqs.map(faq => (
              <option key={faq.id} value={faq.id}>
                {faq.question}
              </option>
            ))}
          </select>
          <BiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Respuesta */}
      {selectedFaq && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start space-x-4 mb-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">?</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedFaq.question}
              </h3>
              <div className="prose prose-gray">
                <p className="text-gray-700 leading-relaxed">
                  {selectedFaq.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de todas las FAQs */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Todas las preguntas
        </h4>
        <div className="space-y-2">
          {faqs.map(faq => (
            <button
              key={faq.id}
              onClick={() => setSelectedId(faq.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedId === faq.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {faq.question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};