 import "./logo.css"
 export type ILogoProps={
   height?:string|number,
   wdith?:string|number,
   classes?:string,
 }
 export const Logo = (props:ILogoProps) => {
   const {classes}=props;
    return (
      <div className={`logo ${classes}`}>
        <div className="glitch">
          <span aria-hidden={true}>JASM</span>
          JASM
          <span aria-hidden={true}>JASM</span>
        </div>
      </div>
    );
  };
  