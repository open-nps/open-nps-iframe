import * as React from 'react'
import styles from './styles.module.css'

import IFrame from 'react-iframe';

interface OpenNpsSurveyMessage {
  surveyId?: string;
  note?: string;
  comment?: string;
}

export type OpenNPSIFrameOnLoad = (surveyId: string) => void;
export type OpenNPSIFrameOnChangeComment = (comment: string) => void;
export type OpenNPSIFrameOnChangeNote = (note: number) => void;
export type OpenNPSIFrameOnSubmit = (survey: OpenNpsSurveyMessage) => void;
export type OpenNPSIFrameOnSuccess = (survey: OpenNpsSurveyMessage) => void;

interface Props {
  url: string;
  prefix?: string;
  surveyId: string;
  onLoad?: OpenNPSIFrameOnLoad;
  onChangeNote?: OpenNPSIFrameOnChangeNote;
  onChangeComment?: OpenNPSIFrameOnChangeComment;
  onSubmit?: OpenNPSIFrameOnSubmit;
  onSuccess?: OpenNPSIFrameOnSuccess;
}

interface OpenNpsEvents {
  OpenNpsLoad: Props['onLoad'];
  OpenNpsChangeNote: Props['onChangeNote'];
  OpenNpsChangeComment: Props['onChangeComment'];
  OpenNpsSubmit: Props['onSubmit'];
  OpenNpsSuccess: Props['onSuccess'];
}

export const messageHandler = (events: OpenNpsEvents) => (evt: MessageEvent) => {
  try {
    const message = JSON.parse(evt.data);
    if (message.isOpenNps) {
      events[message.title] && events[message.title](message.data)
    }
  } catch(e) {
    console.log(e);
  }
}

export const useEffectFunction = (events: OpenNpsEvents) => () => {
  window.addEventListener('message', messageHandler(events), false);
}

export const OpenNPSIFrame: React.FC<Props> = ({
  url, surveyId,
  prefix = '/survey',
  onLoad,
  onChangeNote,
  onChangeComment,
  onSubmit,
  onSuccess,
}) => {
  const events = {
    OpenNpsLoad: onLoad,
    OpenNpsChangeNote: onChangeNote,
    OpenNpsChangeComment: onChangeComment,
    OpenNpsSubmit: onSubmit,
    OpenNpsSuccess: onSuccess,
  };

  React.useEffect(useEffectFunction(events));

  return (
    <IFrame
      className={styles.iframe}
      url={`${url}${prefix}/${surveyId}?iframe=${window.location.href}`}
      frameBorder={0}
      width="100%"
      height="100%"
    />
  )
}
