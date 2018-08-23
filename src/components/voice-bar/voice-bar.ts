import { Component, Input,ApplicationRef,OnChanges,SimpleChanges } from '@angular/core';


import { NativeService } from '../../providers/native-service';
import { GlobalData } from '../../providers/global-data';
@Component({
	selector: 'voice-bar',
	templateUrl: 'voice-bar.html'
})
export class VoiceBarComponent implements OnChanges {
	@Input() data: any = {};
	Media:any;
	playing:boolean = false;
	played:boolean = false;
	constructor(
        private applicationRef: ApplicationRef,
        private nativeService: NativeService,
        public globalData:GlobalData
	) {}
	ngOnChanges(changes: SimpleChanges){
		let dataChange = changes.data.currentValue;
		if(dataChange){
			this.nativeService.preloadAudio(dataChange.audioUrl).subscribe(e => {
				this.Media = e;
				this.Media.addEventListener('ended', () => {
                    this.playing = false;
                    this.globalData.MediaPlaying = false;
					this.applicationRef.tick();
					console.log('播放完成');
				});
			});
		}
	}
	barWidth() {
		let width: string = 'auto';
		if (this.data.audioUrl) {
			if(this.data.duration>=60){
				width = '100%';
			}else{
				width = `${Math.round((this.data.duration / 60) * 1000) / 10}%`;
			}
		}
		return width;
	}
	barClick(e){
		e.stopPropagation();
		e.preventDefault();
        this.played = true;
        if(this.globalData.MediaPlaying){
            this.globalData.playingMedia.pause();
            this.globalData.playingMedia = null;
        };
		if(this.Media){
            this.globalData.playingMedia = this.Media;
            this.globalData.MediaPlaying = true;
			this.playing = true;
	        this.Media.play();
		}
	}
}
