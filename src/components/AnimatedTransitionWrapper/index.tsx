import { ReactNode } from "react";
import { Switch, useLocation } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { Logo } from "../Logo";
import "./style.css";

export const AnimatedTransitionWrapper = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    return (
        <div className="h-screen text-white flex flex-col items-center justify-center lg:p-20">
            <Logo />
            <div className="p-1 h-full w-full bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500">
                <div className="h-full w-full bg-black flex flex-col items-center justify-center">
                    <TransitionGroup
                        className="h-full w-full"
                    >
                        <CSSTransition
                            key={location.key}
                            classNames="fade"
                            timeout={300}
                        >
                            <Switch location={location}>
                                {children}
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
        </div>
    )
}