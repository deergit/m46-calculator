import { Textfit } from "react-textfit";
import "./Screen.css";

const Screen = ({ value1, value2 }) => {
  return (
    <Textfit className="screen" mode="multi" max={70}>
      <p id="line1">{value1}</p>
      <p id="line2">{value2}</p>
    </Textfit>
  );
};

export default Screen;
