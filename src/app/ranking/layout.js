import RankingPaginationData from "@/PaginationData/RankingPagination";
import PaginationMenu from "@/components/PaginationMenu/PaginationMenu";

export default function RankingLayout({ children }) {
  return (
    <div className="layout">
      <PaginationMenu paginationData={RankingPaginationData} />
      {children}
    </div>
  );
}
