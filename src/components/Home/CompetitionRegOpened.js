import Link from "next/link";
import classes from "./CompetitionRegOpened.module.css";

const CompetitionRegOpened = ({ competitionsRegOpen }) => {
  return (
    <div className={classes["competition-reg-opened"]}>
      <h3>Competitions</h3>

      {competitionsRegOpen.map((comp) => (
        <div key={comp._id}>
          <p>
            Registration Is Now Open In {comp.competitionName} Season{" "}
            {comp.season}
            <Link href={`/competitions/${comp.slug}/${comp.season}/overview`}>
              View More
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CompetitionRegOpened;
