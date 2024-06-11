import ViewMatch from "@/components/ViewMatch/ViewMatch";

export default function ViewMatchPage({ params }) {
  const { disciplineId } = params;

  return <ViewMatch disciplineId={disciplineId} />;
}
