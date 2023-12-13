import Ffmpeg, { FfprobeFormat } from "fluent-ffmpeg";
import path from "path";

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

function convertAndSaveFile(filename: string, saveTo: string) {
  return new Promise<boolean>((res, rej) => {
    try {
      Ffmpeg(filename)
        .addOptions([
          "-profile:v baseline",
          "-level 3.0",
          "-start_number 0",
          "-hls_time 10",
          "-hls_list_size 0",
          "-f hls",
        ])
        .output(saveTo)
        .on("end", () => {
          res(true);
        })
        .run();
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
      const { name } = path.parse(filename);
      let timemark = Math.floor((2 / 10) * duration);
      timemark = timemark ? 1 : timemark;

      Ffmpeg(filename).takeScreenshots(
        {
          filename: `${name}.jpg`,
          timemarks: [timemark],
        },
        saveTo
      );
      res(true);
    } catch (err) {
      rej(err);
    }
  });
}

export default { probe, convertAndSaveFile, takeScreenShot };
