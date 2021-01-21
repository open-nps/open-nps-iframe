import React from 'react'

import { OpenNPSIFrame, OpenNPSIFrameOnLoad, OpenNPSIFrameOnChangeNote, OpenNPSIFrameOnChangeComment, OpenNPSIFrameOnSubmit, OpenNPSIFrameOnSuccess } from '@open-nps/react-component'
import '@open-nps/react-component/dist/index.css'

const App = () => {
  const onLoad: OpenNPSIFrameOnLoad = (surveyId) => console.log(surveyId);
  const onChangeNote: OpenNPSIFrameOnChangeNote = (note) => console.log(note);
  const onChangeComment: OpenNPSIFrameOnChangeComment = (note) => console.log(note);
  const onSubmit: OpenNPSIFrameOnSubmit = (note) => console.log('onSubmit', note);
  const onSuccess: OpenNPSIFrameOnSuccess = (note) => console.log('onSuccess', note);

  return (
    <div style={{height: '380px', width: '760px', background: '#FFF', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden', margin: '20px auto' }}>
      <OpenNPSIFrame
        url="http://localhost:3005"
        surveyId="600867ecaeb3c581de637ffd"
        onLoad={onLoad}
        onChangeNote={onChangeNote}
        onChangeComment={onChangeComment}
        onSubmit={onSubmit}
        onSuccess={onSuccess}
      />
    </div>
  )
}

export default App
