import { NationalPagination } from "@/PaginationData/DisciplinePagination";
import PaginationSubMenu from "@/components/PaginationMenu/PaginationSubMenue";

export default function NationalRankingLayout({ children }) {
  return (
    <div className="layout">
      <PaginationSubMenu paginationData={NationalPagination} />
      {children}
    </div>
  );
}
