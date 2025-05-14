import DocumentItem from "../DocumentItem/DocumentItem";
import "./DocumentItemList.css";

const DocumentItemList = ({  documents }) => {
  // const filteredDocs = activeTab
  //   ? documents.filter((document) => document.Type === activeTab)
  //   : documents;

  if (documents.length === 0) {
    return <p>Документы не найдены</p>;
  }

  return (
    <div className="document-list">
      {documents.map((document) => (
        <DocumentItem document={document} />
      ))}
    </div>
  );
};

export default DocumentItemList;