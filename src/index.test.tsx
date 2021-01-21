import React from 'react';
import { shallow } from 'enzyme';

import { OpenNPSIFrame, messageHandler, useEffectFunction } from '.'
import IFrame from 'react-iframe';

describe('OpenNPSIFrame', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('Component', () => {
    it('should render properly with defaults', () => {
      const fakeProps = { url: 'foo', surveyId: 'bar' };
      const wrap = shallow(<OpenNPSIFrame {...fakeProps} />)
      const iframe = wrap.find(IFrame);
      expect(iframe).toHaveProp('url', `${fakeProps.url}/survey/${fakeProps.surveyId}?iframe=${window.location.href}`)
    });

    it('should render properly with custom prefix', () => {
      const fakeProps = { url: 'foo', surveyId: 'bar', prefix: '/fizz' };
      const wrap = shallow(<OpenNPSIFrame {...fakeProps} />)
      const iframe = wrap.find(IFrame);
      expect(iframe).toHaveProp('url', `${fakeProps.url}${fakeProps.prefix}/${fakeProps.surveyId}?iframe=${window.location.href}`)
    });
  });

  describe('useEffectFunction', () => {
    it('should dispatch correct listener', () => {
      jest.spyOn(window, 'addEventListener').mockReturnValue({});

      useEffectFunction({})();
      expect(window.addEventListener).toHaveBeenCalledTimes(1);
      expect(window.addEventListener).toHaveBeenCalledWith('message', expect.any(Function), false);
    });
  });

  describe('messageHandler', () => {
    beforeEach(() => {
      jest.spyOn(console, 'log').mockReturnValue(null);
    });

    it('should process event message right', () => {
      const event = { title: 'foo', data: 'bar', isOpenNps: true };
      const events = { [event.title]: jest.fn() };

      messageHandler(events)({ data: JSON.stringify(event) });
      expect(events[event.title]).toHaveBeenCalledTimes(1);
      expect(events[event.title]).toHaveBeenCalledWith(event.data);
      expect(console.log).not.toHaveBeenCalledTimes(1);
    });


    it('should process event message right but not call', () => {
      const event = { title: 'foo', data: 'bar', isOpenNps: false };
      const events = { [event.title]: jest.fn() };

      messageHandler(events)({ data: JSON.stringify(event) });
      expect(events[event.title]).not.toHaveBeenCalledTimes(1);
      expect(events[event.title]).not.toHaveBeenCalledWith(event.data);
      expect(console.log).not.toHaveBeenCalledTimes(1);
    });

    it('should break message handler', () => {
      messageHandler({})({ data: "aaa {}" });
      expect(console.log).toHaveBeenCalledTimes(1)
    })
  });
});
