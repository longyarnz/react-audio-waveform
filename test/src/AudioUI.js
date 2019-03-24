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
        return (
            <Waveform
                barWidth={1}
                peaks={max}
                height={40}
                pos={this.props.currentTime}
                duration={this.props.duration}
                onClick={this.props.handleWaveClick}
                color="#bbc"
                progressColor="#fff"
            />
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