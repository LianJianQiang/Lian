import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

let render = () => {
    return (
        <DockMonitor toggleVisibilityKey='ctrl-l'
                     changePositionKey='ctrl-w'>
            <LogMonitor/>
        </DockMonitor>
    );
};

export default createDevTools(render());
