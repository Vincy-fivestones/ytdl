import { Injectable } from '@nestjs/common';
import got from 'got';
import * as fs from 'fs';
import * as ytdl from 'ytdl-core';

@Injectable()
export class AppService {
  getHello(): string {
    this.convertFile();
    return 'Hello World!';
  }

  async convertFile() {
    const url =
      'https://mewallpaper.com/thumbnail/nature/7413-snow-mountains-panorama-ice-view-download-hd-wallpaper.jpg';
    const writeStream = fs.createWriteStream('forest.mp4');

    const url2 =
      'https://cdn.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_06B_Bali_1080p_013_preview.mp4';

    const stream = got.stream(url2);
    stream.on('data', (chunk) => {
      //console.log(`chunk`, chunk);
      writeStream.write(chunk);
    });

    // stream.on('downloadProgress', ({ transferred, total, percent }) => {
    //   const percentage = Math.round(percent * 100);
    //   console.log('test ', transferred, '/', total, '-', percentage);
    // });
    const youtubeLink = 'https://www.youtube.com/watch?v=AwRAfxBub9M';
    await this.getVideoInfo();
    console.log(ytdl);
    console.log('end');
    const youtubeStream = ytdl(youtubeLink, {
      quality: '18',
    });
    youtubeStream.on('data', (chunk) => {
      writeStream.write(chunk);
    });

    youtubeStream.on('progress', (a, b, c) => {
      console.log(a, b, c);
    });
  }
  async getVideoInfo() {
    const youtubeLink = 'https://www.youtube.com/watch?v=AwRAfxBub9M';
    ytdl
      .getInfo(youtubeLink)
      .then((response) => {
        console.log(`response`, response);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
