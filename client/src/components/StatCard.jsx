export const StatCard = ({ stat }) => {
  return (
    <div className="card p-3 ">
      <span>{stat.label}</span>
      <h3>{stat.value}</h3>
    </div>
  );
};
