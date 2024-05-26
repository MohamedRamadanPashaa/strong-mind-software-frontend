import CompetitionPaginationData from "@/PaginationData/CompetitionData";
import PaginationMenu from "@/components/PaginationMenu/PaginationMenu";

export default function layout({ children }) {
  return (
    <div className="layout">
      <PaginationMenu paginationData={CompetitionPaginationData} />

      {children}
    </div>
  );
}
