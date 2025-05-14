import "./DocumentItem.css"
const DocumentItem = (props) => {
    return (
      <a className="document-item" href={props.document.URL} target="_blank" rel="noopener noreferrer">
        <div className="document-item__preview">
          <img src="/pdf.svg" alt="PDF" />
        </div>
        <h3 className="document-item__title">{props.document.Title}</h3>
      </a>
    );
  };
  
  export default DocumentItem;