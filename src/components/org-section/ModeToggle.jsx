import React, { useContext, useEffect, useRef } from "react";
import { ShopContext } from "../../context/ShopContext";
import { ImSun } from "react-icons/im";
import { PiMoonStarsFill } from "react-icons/pi";
import { UserContext } from "../../context/Authentication";

const ModeToggle = () => {
  const { modeToggle } = useContext(ShopContext);
  const { user } = useContext(UserContext);

  return (
    <>
      {user === null ? (
        <div id="mode-toggle" className="mode-toggle" onClick={modeToggle}>
          <i id="sun-icon" style={{ display: "none" }}>
            <ImSun />
          </i>
          <i id="moon-icon">
            <PiMoonStarsFill />
          </i>
        </div>
      ) : (
        <div id="mode-toggle" className="mode-toggle-p" onClick={modeToggle}>
          <i id="sun-icon" style={{ display: "none" }}>
            <ImSun />
          </i>
          <i id="moon-icon">
            <PiMoonStarsFill />
          </i>
        </div>
      )}
    </>
  );
};

export default ModeToggle;
