import SurveySkeleton from './SurveySkeleton';

const DashboardSkeleton = () => {
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(3).keys()].map((i) => {
         return <SurveySkeleton key={i} />;
      })}
   </div>
)
}

export default DashboardSkeleton