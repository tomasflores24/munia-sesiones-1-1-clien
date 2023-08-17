import { DocumentationCard } from "../../components/DocumentationCard/DocumentationCard";

const useCreateCardsDocumentation = (cardDataArray) => {
  const DocumentationCards = ()=>{
    return (
      <>
        {cardDataArray.map((cardData, index) => (
          <DocumentationCard key={index} title={cardData.title} />
        ))}
      </>
    );
  }
  return { DocumentationCards}
   
  };
export default useCreateCardsDocumentation;
