import React from 'react';
import Wavesurfer from '../../src/react-wavesurfer';
import Timeline from '../../src/plugins/timeline';

const dataFile = [
  {
    wfm:
      'http://audio.muzhifm.com/muzhiyunzhizuo/soundFile/3f411db6-d87c-4ed0-a789-4d2fdc2e3784.mp3.wfm',
    file:
      'https://audio.muzhifm.com/Audios/studio-cloud/materials/4316EAAA-548C-4FEF-89DE-76C74C35D3BD.aac'
  },
  {
    wfm:
      'https://audio.muzhifm.com/muzhiyunzhizuo/soundFile/06fc181e-bcd3-4cd6-b310-37afe180cee7.mp3.wfm',
    file:
      'https://audio.muzhifm.com/muzhiyunzhizuo/soundFile/06fc181e-bcd3-4cd6-b310-37afe180cee7.mp3'
  },
  {
    wfm:
      'http://audio.muzhifm.com/muzhiyunzhizuo/soundFile/3f411db6-d87c-4ed0-a789-4d2fdc2e3784.mp3.wfm',
    file:
      'http://audio.muzhifm.com/muzhiyunzhizuo/soundFile/3f411db6-d87c-4ed0-a789-4d2fdc2e3784.mp3'
  }
];
class TimelineExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioFile:
        'https://audio.muzhifm.com/muzhiyunzhizuo/soundFile/06fc181e-bcd3-4cd6-b310-37afe180cee7.mp3',
      peacks: {},
      playing: false
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }

  nextMusic(index) {
    const file = dataFile[index];
    window.fetch(file.wfm)
      .then(response => response.arrayBuffer())
      .then(data => {
        this.setState({
          peacks: new Int16Array(data, 568)
        });
      });
    this.setState({ audioFile: file.file });
  }

  render() {
    const timelineOptions = {
      height: 30,
      primaryFontColor: '#00f',
      primaryColor: '#00f'
    };
    let peaksProp = {};
    if (this.state.peacks.length > 0) {
      peaksProp = {
        audioPeaks: this.state.peacks
      };
    }
    let audioFileProp = {};
    if (this.state.audioFile) {
      audioFileProp = {
        audioFile: this.state.audioFile
      };
    }
    return (
      <div className="example col-xs-12">
        <h3 onClick={this.handleTogglePlay}>Timeline</h3>
        {dataFile.map((f, index) => (
          <button key={index} onClick={() => this.nextMusic(index)}>
              切歌 {index}
          </button>
          ))}
        <Wavesurfer
          {...audioFileProp}
          {...peaksProp}
          playing={this.state.playing}
          options={{
            backend: 'MediaElement'
          }}
        >
          <Timeline options={timelineOptions} />
        </Wavesurfer>
      </div>
    );
  }
}

module.exports = TimelineExample;
