import * as React from 'react'
import { render } from 'react-dom'
import { useEffect, useState } from 'react';
import { COPY_TITLE_CMD } from '../constants/commands';

// import "../styles/popup.css"

const Hello = () => {
  const [err, setErr] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    chrome.runtime.sendMessage({ cmd: COPY_TITLE_CMD },
      (response) => {
        if (response && response.error) {
          setErr(response.error);
        }

        if (response && response.title) {
          setTitle(response.title);
        }
      });
  }, []);

  if (err) {
    return <h1 style={{ color: 'red' }}>{err}</h1>;
  }

  if (title) {
    return <h1 style={{ color: 'green' }}>{title}</h1>;
  }

  return (
    <div className="popup-padded">
      <h1>Running...</h1>
    </div>
  )
}

render(
  <Hello/>,
  document.getElementById('root')
)
