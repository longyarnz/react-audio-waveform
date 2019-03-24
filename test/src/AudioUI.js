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
        const DEFAULT_MP3 = "https://parse-server-ff.s3.amazonaws.com/ae5992f0f5bb1f259bafa41b3771e3bb_call12565815456dwwwwww795896232www-01b59bd3.mp3";
        fetch(DEFAULT_MP3)
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
