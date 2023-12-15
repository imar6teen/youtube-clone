import Ffmpeg, { FfprobeFormat } from "fluent-ffmpeg";
import path from "path";
import { exec } from "child_process";

/**
 * Find metadata of a file
 */
function probe(filename: string) {
  return new Promise<Ffmpeg.FfprobeData>((res, rej) => {
    Ffmpeg.ffprobe(filename, (err, data) => {
      if (err) return rej(err);
      res(data);
    });
  });
}

// function convertAndSaveFile(filename: string, saveTo: string) {
//   return new Promise<boolean>((res, rej) => {
//     try {
//       const { name } = path.parse(saveTo);
//       Ffmpeg()
//         .input(filename)
//         // .addOptions([
//         //   "-profile:v baseline",
//         //   "-level 3.0",
//         //   "-start_number 0",
//         //   "-hls_time 10",
//         //   "-hls_list_size 0",
//         //   "-f hls",
//         // ])
//         // .complexFilter
//         .complexFilter([
//           {
//             inputs: "[0:v]",
//             filter: "split",
//             options: "2",
//             outputs: ["[v2]", "[v3]"],
//           },
//           {
//             inputs: "[v2]",
//             filter: "scale",
//             options: "w=1280:h=720",
//             outputs: "[v2out]",
//           },
//           {
//             inputs: "[v3]",
//             filter: "scale",
//             options: "w=640:h=360",
//             outputs: "[v3out]",
//           },
//         ])
//         .addOptions([
//           // `-filter_complex "[0:v]split=2[v2][v3]; [v2]scale=w=1280:h=720[v2out]; [v3]scale=w=640:h=360[v3out]"`,
//           `-map "[v2out]?"`,
//           `-c:v:0 libx264`,
//           `-x264-params "nal-hrd=cbr:force-cfr=1"`,
//           `-b:v:0 3M`,
//           `-maxrate:v:0 3M`,
//           `-minrate:v:0 3M`,
//           `-bufsize:v:0 3M`,
//           `-preset slow`,
//           `-g 48`,
//           `-sc_threshold 0`,
//           `-keyint_min 48`,
//           `-map "[v3out]?"`,
//           `-c:v:1 libx264`,
//           `-x264-params "nal-hrd=cbr:force-cfr=1"`,
//           `-b:v:1 1M`,
//           `-maxrate:v:1 1M`,
//           `-minrate:v:1 1M`,
//           `-bufsize:v:1 1M`,
//           `-preset slow`,
//           `-g 48`,
//           `-sc_threshold 0`,
//           `-keyint_min 48`,
//           `-map a:0`,
//           `-c:a:0 aac`,
//           `-b:a:0 96K`,
//           `-ac 2`,
//           `-map a:1?`,
//           `-c:a:1 aac`,
//           `-b:a:1 48K`,
//           `-ac 2`,
//           `-f hls`,
//           `-hls_time 10`,
//           `-hls_playlist_type "vod"`,
//           `-hls_flags "independent_segments"`,
//           `-hls_segment_type "mpets"`,
//         ])
//         .outputOptions(`-var_stream_map`, `"v:0,a:0 v:1,a:1" ${name}%v.m3u8`)
//         .output(saveTo)
//         .on("end", () => {
//           res(true);
//         })
//         .run();
//     } catch (err) {
//       rej(err);
//     }
//   });
// }

function convertAndSaveFile(filename: string, saveTo: string) {
  return new Promise<boolean>((res, rej) => {
    try {
      const { name, dir } = path.parse(saveTo);
      const transProcess = exec(
        `ffmpeg -i ${filename} -filter_complex "[0:v]split=3[v2][v3][v1]; [v1]scale=w=256:h=144[v1out]; [v2]scale=w=1280:h=720[v2out]; [v3]scale=w=640:h=360[v3out]" -map "[v2out]" -c:v:0 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 3M -maxrate:v:0 3M -minrate:v:0 3M -bufsize:v:0 3M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 -map "[v3out]" -c:v:1 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:1 1M -maxrate:v:1 1M -minrate:v:1 1M -bufsize:v:1 1M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 -map "[v1out]" -c:v:2 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:2 1M -maxrate:v:2 1M -minrate:v:2 1M -bufsize:v:2 1M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 -map a:0 -c:a:0 aac -b:a:0 96k -ac 2 -map a:0 -c:a:1 aac -b:a:1 48k -ac 2 -map a:0 -c:a:2 aac -b:a:2 48k -ac 2 -profile:v baseline -level 3.0 -f hls -hls_time 10 -hls_playlist_type vod -hls_flags independent_segments -hls_segment_type mpegts -master_pl_name master.m3u8 -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" ${path.join(
          dir,
          name
        )}%v.m3u8`
      );

      transProcess.on("error", (err) => rej(err));
      transProcess.on("exit", () => {
        res(true);
      });
    } catch (err) {
      rej(err);
    }
  });
}

/**
 * Extract image from video
 */
function takeScreenShot(
  filename: string,
  saveTo: string,
  format: FfprobeFormat
) {
  return new Promise<boolean>((res, rej) => {
    try {
      const duration = format.duration as number;
      const { name, dir } = path.parse(filename);
      let timemark = Math.floor((2 / 10) * duration);
      timemark = timemark ? 1 : timemark;

      Ffmpeg(`${path.join(dir, "master.m3u8")}`)
        .takeScreenshots(
          {
            filename: `${name}.jpg`,
            timemarks: [timemark],
          },
          saveTo
        )
        .on("end", () => {
          res(true);
        });
    } catch (err) {
      rej(err);
    }
  });
}

export default { probe, convertAndSaveFile, takeScreenShot };
