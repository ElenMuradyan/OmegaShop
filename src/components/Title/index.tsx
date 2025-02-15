import { title } from "../../typescript/interfaces/title";

const Title = ({text1, text2}: title) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="w-8 sm:w-12 h-[1px] sm:h-2px bg-gray-700"></p>
      <p className="text-gray-300">{text1} <span className="text-gray-700 font-medium">{text2}</span></p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-2px bg-gray-700"></p>
    </div>
  )
}

export default Title;
