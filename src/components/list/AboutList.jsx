import about from "../../mocks/data/about-us.json";

export default function AboutList() {
  return (
    <div className="breadcrumbs text-xs sm:text-sm">
      <ul>
        {about.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>
    </div>
  );
}
