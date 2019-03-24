import React, { Component } from 'react';
import WaveformData from 'waveform-data';
import Waveform from 'react-audio-waveform';
import PropTypes from 'prop-types';

class AudioUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            waveform: null
        };

        //  Bind class methods
        this.fetchAudioFile = this.fetchAudioFile.bind(this);
    }

    componentDidMount() {
        this.fetchAudioFile();
    }

    //  Fetch audio media, calculate the waveform data and load the data into state
    fetchAudioFile() {
        const { audioUrl } = this.props;

        fetch(audioUrl)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const waveform = WaveformData.create(buffer);
                this.setState({ waveform });
                console.log('Waveform Array Data:', waveform.max);
            });
    }

    render() {
        const { waveform } = this.state;
        const { max = [] } = waveform || {};
        const { currentTime, duration, handleWaveClick } = this.props;
        const left = `calc(${currentTime / duration * 100}% - 10px)`;
        return (
            <div style={{ position: 'relative' }}>
                <Waveform
                    barWidth={1.5}
                    peaks={max}
                    height={40}
                    pos={currentTime}
                    duration={duration}
                    onClick={handleWaveClick}
                    color="#bbc"
                    progressColor="#fff"
                />
                <div className="range-bar">
                    <span className="range-bob" style={{ left }} draggable={true} />
                </div>
            </div>
        );
    }
}

AudioUI.propTypes = {
    audioUrl: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    handleWaveClick: PropTypes.func.isRequired
};

export default AudioUI;