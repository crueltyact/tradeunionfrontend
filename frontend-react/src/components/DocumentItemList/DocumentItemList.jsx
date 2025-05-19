import DocumentItem from "../DocumentItem/DocumentItem";
import "./DocumentItemList.css";

const DocumentItemList = ({ activeTab, documents }) => {
  const filteredDocs = activeTab
    ? documents.filter((document) => document.Type === activeTab)
    : documents;

  if (!filteredDocs || filteredDocs.length === 0) {
    return <p>Документы не найдены</p>;
  }

  return (
    <div className="document-list">
      {filteredDocs.map((document) => (
        <DocumentItem key={document.ID} document={document} />
      ))}
    </div>
  );
};

export default DocumentItemList;