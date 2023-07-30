import Skeleton from "./Skeleton"

const SurveySkeleton = () => {
  return (
    <div className="flex flex-col py-4 px-6 bg-gray-400 rounded-lg h-[470px]">
      <Skeleton classes=" w-full h-48" />
      <Skeleton classes="title width-100" />
      <Skeleton classes="title width-100" />
      <Skeleton classes="text width-50 mt-10" />
      <Skeleton classes="text width-50" />
    </div>
  )
}

export default SurveySkeleton