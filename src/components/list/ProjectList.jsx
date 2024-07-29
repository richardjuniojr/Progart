import useFetchData from "../../hooks/useFetchData";
import ProjectCard from "../cards/ProjectCard";
import Loader from "../ui/Loader";

export default function ProjectList() {
  const { data, loading, error } = useFetchData("projects");

  if (loading) return <Loader />;
  if (error) return <p className="text-error">{error}</p>;
  if (data.length === 0) return <p>No projects available</p>;
  
  return (
    <div>
      {data.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
