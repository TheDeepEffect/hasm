type IChunkProps = {
    arr: string[],
    size: number
}
export const chunk = ({ arr, size }: IChunkProps): string[][] => {
    const maxSizeOfSubArray = Math.ceil(arr.length / size);
    return Array.from({ length: size }, (v, i) => {
        return arr.slice(i * maxSizeOfSubArray, i * maxSizeOfSubArray + maxSizeOfSubArray)
    }
    );
}

export const getRandomColor = (): string => {
    const colors = ["red", "yellow", "green", "blue", "indigo", "purple", "pink"];
    const randomNumber = Math.floor(Math.random() * 7);
    return colors[randomNumber]
}