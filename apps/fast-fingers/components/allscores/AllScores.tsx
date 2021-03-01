import {Panel, PanelType} from '@fluentui/react';
import React, {useState} from 'react';
import MountedScore from "./MountedScore";

export default function AllScores() {
  const [panel, setPanel] = useState(false)

  return (
    <React.Fragment>
      <button className='text-white font-bold' onClick={() => setPanel(true)}>All Scores</button>
      <Panel
        isOpen={panel}
        onDismiss={() => setPanel(false)}
        type={PanelType.large}
        closeButtonAriaLabel="Close"
        headerText='My Scores'
      >
        <MountedScore/>
      </Panel>
    </React.Fragment>
  )
}
