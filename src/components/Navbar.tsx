import "../assets/components/navbar.css";
import { useState } from "react";
import Category from "./Category";
import { categoryButton } from "../constants/index";
import { appStates } from "../hooks/index";

const buttons: Array<any> = categoryButton;

function Navbar() {
  const [buttonSelected, setButtonSelected] = useState(
    new Array(buttons.length).fill(false).fill(true, 0, 1)
  );

  const [_, dispatch] = appStates.useContextStates();

  function handleStyleCategory(idx: number): void {
    const tempArray: Array<boolean> = new Array(buttonSelected.length).fill(
      false
    );
    tempArray[idx] = !tempArray[idx];
    setButtonSelected(tempArray);
  }

  return (
    <nav>
      <div id="nav__upper">
        <div id="nav__upper__yt_logo">
          <button>
            <svg viewBox="0 0 380.9 85.1">
              <path
                id="rectangle"
                fill="#ff0000"
                d="M 60.699219 0.30078125 C 60.699219 0.30078125 22.699219 0.30078125 13.199219 2.8007812 C 7.9992187 4.2007813 3.9 8.3 2.5 13.5 C 0 23 0 42.699219 0 42.699219 C 0 42.699219 0 62.500391 2.5 71.900391 C 3.9 77.100391 7.9992188 81.199609 13.199219 82.599609 C 22.699219 85.099609 60.699219 85.099609 60.699219 85.099609 C 60.699219 85.099609 98.699219 85.099609 108.19922 82.599609 C 113.39922 81.199609 117.50039 77.100391 118.90039 71.900391 C 121.40039 62.400391 121.40039 42.699219 121.40039 42.699219 C 121.40039 42.699219 121.40039 23 118.90039 13.5 C 117.50039 8.3 113.39922 4.2007812 108.19922 2.8007812 C 98.699219 0.30078125 60.699219 0.30078125 60.699219 0.30078125 z M 48.5 24.5 L 80.099609 42.800781 L 48.5 61 L 48.5 24.5 z "
              ></path>
              <path
                id="triangle"
                fill="#ffffff"
                d="M 48.5,61 80.1,42.8 48.5,24.5 Z"
              ></path>
              <path d="M147.1 55.5L133.5 6.2h11.9l4.8 22.3c1.2 5.5 2.1 10.2 2.7 14.1h.3c.4-2.8 1.3-7.4 2.7-14l5-22.4h11.9L159 55.5v23.7h-11.8l-.1-23.7zm29.2 22.1c-2.4-1.6-4.1-4.1-5.1-7.6-1-3.4-1.5-8-1.5-13.6v-7.7c0-5.7.6-10.3 1.7-13.8 1.2-3.5 3-6 5.4-7.6 2.5-1.6 5.7-2.4 9.7-2.4 3.9 0 7.1.8 9.5 2.4s4.1 4.2 5.2 7.6 1.7 8 1.7 13.8v7.7c0 5.7-.5 10.2-1.6 13.7-1.1 3.4-2.8 6-5.2 7.6-2.4 1.6-5.7 2.4-9.8 2.4-4.3-.1-7.6-.9-10-2.5zm13.5-8.3c.7-1.7 1-4.6 1-8.5V44.2c0-3.8-.3-6.6-1-8.4s-1.8-2.6-3.5-2.6c-1.6 0-2.8.9-3.4 2.6-.7 1.8-1 4.6-1 8.4v16.6c0 3.9.3 6.8 1 8.5.6 1.7 1.8 2.6 3.5 2.6 1.5 0 2.7-.9 3.4-2.6zm51.7-43.4v53.3h-9.4l-1-6.5h-.3c-2.5 4.9-6.4 7.4-11.5 7.4-3.5 0-6.1-1.2-7.8-3.5-1.7-2.3-2.5-5.9-2.5-10.9V25.9h12V65c0 2.4.3 4.1.8 5.1s1.4 1.5 2.6 1.5c1 0 2-.3 3-1 1-.6 1.7-1.4 2.1-2.4V25.9h12z"></path>
              <path d="M274.1 15.9h-11.9v63.3h-11.7V16h-11.9V6.4h35.5v9.5z"></path>
              <path d="M303 25.9v53.3h-9.4l-1-6.5h-.3c-2.5 4.9-6.4 7.4-11.5 7.4-3.5 0-6.1-1.2-7.8-3.5-1.7-2.3-2.5-5.9-2.5-10.9V25.9h12V65c0 2.4.3 4.1.8 5.1s1.4 1.5 2.6 1.5c1 0 2-.3 3-1 1-.6 1.7-1.4 2.1-2.4V25.9h12zm39.7 8.5c-.7-3.4-1.9-5.8-3.5-7.3s-3.9-2.3-6.7-2.3c-2.2 0-4.3.6-6.2 1.9-1.9 1.2-3.4 2.9-4.4 4.9h-.1V3.5h-11.6v75.7h9.9l1.2-5h.3c.9 1.8 2.3 3.2 4.2 4.3 1.9 1 3.9 1.6 6.2 1.6 4.1 0 7-1.9 8.9-5.6 1.9-3.7 2.9-9.6 2.9-17.5v-8.4c0-6.2-.4-10.8-1.1-14.2zm-11 21.7c0 3.9-.2 6.9-.5 9.1-.3 2.2-.9 3.8-1.6 4.7-.8.9-1.8 1.4-3 1.4-1 0-1.9-.2-2.7-.7-.8-.5-1.5-1.2-2-2.1V38.3c.4-1.4 1.1-2.6 2.1-3.6 1-.9 2.1-1.4 3.2-1.4 1.2 0 2.2.5 2.8 1.4.7 1 1.1 2.6 1.4 4.8.3 2.3.4 5.5.4 9.6l-.1 7zm29.1.4v2.7c0 3.4.1 6 .3 7.7.2 1.7.6 3 1.3 3.7.6.8 1.6 1.2 3 1.2 1.8 0 3-.7 3.7-2.1.7-1.4 1-3.7 1.1-7l10.3.6c.1.5.1 1.1.1 1.9 0 4.9-1.3 8.6-4 11s-6.5 3.6-11.4 3.6c-5.9 0-10-1.9-12.4-5.6-2.4-3.7-3.6-9.4-3.6-17.2v-9.3c0-8 1.2-13.8 3.7-17.5s6.7-5.5 12.6-5.5c4.1 0 7.3.8 9.5 2.3s3.7 3.9 4.6 7c.9 3.2 1.3 7.6 1.3 13.2v9.1h-20.1v.2zm1.5-22.4c-.6.8-1 2-1.2 3.7s-.3 4.3-.3 7.8v3.8h8.8v-3.8c0-3.4-.1-6-.3-7.8-.2-1.8-.7-3-1.3-3.7-.6-.7-1.6-1.1-2.8-1.1-1.3 0-2.3.4-2.9 1.1z"></path>
            </svg>
          </button>
        </div>
        <div id="nav__upper__search_account">
          <button id="nav__upper__search_account__search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
            </svg>
          </button>
          <button
            id="nav__upper__search_account__account"
            onClick={() => dispatch({ type: "togglePopUpAccount" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M12,2C6.48,2,2,6.48,2,12c0,1.82,0.5,3.53,1.35,5l0,0c0.21,0.36,0.44,0.71,0.7,1.04c0.01,0.02,0.02,0.03,0.03,0.05 c0.51,0.66,1.1,1.26,1.76,1.78c0.03,0.03,0.07,0.05,0.1,0.07c0.29,0.22,0.59,0.42,0.9,0.61c0.06,0.04,0.12,0.07,0.18,0.11 c0.69,0.4,1.43,0.72,2.21,0.94c0.1,0.03,0.2,0.05,0.3,0.08c0.3,0.08,0.6,0.14,0.9,0.19c0.11,0.02,0.23,0.04,0.34,0.05 C11.17,21.97,11.58,22,12,22s0.83-0.03,1.23-0.08c0.12-0.01,0.23-0.03,0.34-0.05c0.31-0.05,0.61-0.11,0.9-0.19 c0.1-0.03,0.2-0.05,0.3-0.08c0.78-0.23,1.52-0.54,2.21-0.94c0.06-0.03,0.12-0.07,0.18-0.11c0.31-0.19,0.61-0.39,0.9-0.61 c0.03-0.03,0.07-0.05,0.1-0.07c0.66-0.52,1.25-1.11,1.76-1.78c0.01-0.01,0.02-0.03,0.03-0.05c0.25-0.33,0.49-0.68,0.7-1.04l0,0 C21.5,15.53,22,13.82,22,12C22,6.48,17.52,2,12,2z M18.81,17.86c-0.02,0.02-0.04,0.04-0.05,0.06c-0.22,0.25-0.45,0.48-0.69,0.7 c-0.03,0.03-0.06,0.06-0.09,0.09c-0.8,0.71-1.71,1.28-2.71,1.67c-0.03,0.01-0.06,0.02-0.09,0.03c-0.29,0.11-0.58,0.2-0.88,0.28 c-0.07,0.02-0.14,0.04-0.21,0.05c-0.27,0.07-0.54,0.11-0.82,0.16c-0.08,0.01-0.16,0.03-0.24,0.04C12.7,20.98,12.35,21,12,21 s-0.7-0.02-1.04-0.07c-0.08-0.01-0.16-0.02-0.24-0.04c-0.28-0.04-0.55-0.09-0.82-0.16c-0.07-0.02-0.14-0.04-0.21-0.05 c-0.3-0.08-0.59-0.17-0.88-0.28c-0.03-0.01-0.06-0.02-0.09-0.03c-0.99-0.39-1.91-0.95-2.71-1.67c-0.03-0.03-0.06-0.06-0.1-0.09 c-0.24-0.22-0.47-0.45-0.68-0.7c-0.02-0.02-0.04-0.04-0.05-0.06C4.95,17.59,4.73,17.3,4.53,17C6.19,14.52,9,13,12,13 s5.81,1.52,7.47,4C19.27,17.3,19.05,17.59,18.81,17.86z M12,11.06c-1.65,0-2.98-1.34-2.98-2.98c0-1.64,1.34-2.98,2.98-2.98 c1.65,0,2.98,1.34,2.98,2.98C14.98,9.72,13.64,11.06,12,11.06z M20.02,16.06c-1.76-2.37-4.54-3.93-7.69-4.04 c2.04-0.17,3.65-1.86,3.65-3.94c0-2.19-1.78-3.97-3.98-3.97c-2.2,0-3.98,1.78-3.98,3.97c0,2.08,1.61,3.77,3.65,3.94 c-3.15,0.1-5.93,1.67-7.69,4.04C3.36,14.84,3,13.46,3,12c0-4.96,4.04-9,9-9s9,4.04,9,9C21,13.46,20.64,14.84,20.02,16.06z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div id="nav__lower">
        <div id="nav__lower__sidebar">
          <button>
            <svg
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              // style cannot use svgStyle.ts not sure why
              style={{
                pointerEvents: "none",
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              <path d="m9.8 9.8-3.83 8.23 8.23-3.83 3.83-8.23L9.8 9.8zm3.28 2.97c-.21.29-.51.48-.86.54-.07.01-.15.02-.22.02-.28 0-.54-.08-.77-.25-.29-.21-.48-.51-.54-.86-.06-.35.02-.71.23-.99.21-.29.51-.48.86-.54.35-.06.7.02.99.23.29.21.48.51.54.86.06.35-.02.7-.23.99zM12 3c4.96 0 9 4.04 9 9s-4.04 9-9 9-9-4.04-9-9 4.04-9 9-9m0-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
            </svg>
          </button>
        </div>
        <div id="nav__lower__category">
          {buttons.map((val, idx) => {
            return (
              <Category
                href={val.href}
                isSelected={buttonSelected[idx]}
                key={idx}
                index={idx}
                value={val.value}
                handleStyleCategory={handleStyleCategory}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
