import { getRandomColor } from "../../utils/helpers"
import "./ProfileGrid.css"
type IProfileGridProps = {
    columns: string[][]
}

export const ProfileGrid = (props: IProfileGridProps) => {
    const { columns } = props
    return <div className="flex flex-wrap m-3">
        {columns.map((column, i) => {
            return <div
                className="px-2"
                style={{
                    flex: `${100 / columns.length}%`,
                }}
                key={i}
            >
                {column.map((image, i) => {
                    return <div className={`bg-${getRandomColor()}-500 rounded-md`}
                        key={i}
                    >
                        <img src={image} alt={`post-${i}`}
                            loading="lazy"
                            className="w-full rounded-md cursor-pointer transition duration-500 ease-linear transform hover:-translate-y-2 hover:translate-x-2 images"
                        />
                    </div>
                })}
            </div>
        })}
    </div>
}