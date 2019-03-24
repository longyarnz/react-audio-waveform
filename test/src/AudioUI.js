import React, { Component } from 'react';
import WaveformData from 'waveform-data';
import Waveform from 'react-audio-waveform';

export default class AudioUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            waveform: null
        };

        this.fetchAudioFile = this.fetchAudioFile.bind(this);
    }

    componentDidMount() {
        this.fetchAudioFile();
    }

    fetchAudioFile() {
        const { audioUrl } = this.props;

        fetch(audioUrl)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const waveform = WaveformData.create(buffer);
                this.setState({ waveform });
            });
    }

    render() {
        const { waveform } = this.state;
        const { max = [] } = waveform || {};
        return max.length === 0 ? (
            <div>Loading...</div>
        )
            : (
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
