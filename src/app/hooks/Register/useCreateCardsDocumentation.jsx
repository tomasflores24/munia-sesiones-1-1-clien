import { DocumentationCard } from "../../components/DocumentationCard/DocumentationCard";

const useCreateCardsDocumentation = (cardDataArray, getDocument) => {
  const DocumentationCards = ()=>{
    return (
      <>
        {cardDataArray.map((cardData, index) => (
          <DocumentationCard key={index} title={cardData.title} getDocument={getDocument} />
        ))}
      </>
    );
  }
  return { DocumentationCards}
   
  };
export default useCreateCardsDocumentation;
