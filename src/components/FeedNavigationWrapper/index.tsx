import { ReactNode } from "react"
import "./style.css"

type IFeedNavigationWrapperProps = {
    handleOnNextClick: () => void,
    handleOnPreviousClick: () => void,
    children: ReactNode
}

export const FeedNavigationWrapper = (props: IFeedNavigationWrapperProps) => {
    const { children, handleOnNextClick, handleOnPreviousClick } = props;
    return <>
        <div className="next-hover">
            <div className="nav-button next"
                onClick={handleOnNextClick}
            >
                {/* {loading ? <Spinner /> : `>`} */}
                &gt;
            </div>
        </div>
        {children}
        <div className=" previous-hover">
            <div className="nav-button previous"
                onClick={handleOnPreviousClick}
            >
                &lt;
            </div>
        </div>
    </>
}