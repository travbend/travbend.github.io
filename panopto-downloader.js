async function download_video() {
    let videoUrl = "https://d2y36twrtb17ty.cloudfront.net:443/sessions/81a498b9-55f2-49fa-b77b-b1cb0133a245/cca0e7df-04ae-4a66-bcc5-b1cb0133a254-8a0df6b1-10f8-46f1-a3c1-b1cb013b86d3.hls/master.m3u8?InvocationID=4534a3a7-6fbe-ef11-a9f7-0a1a827ad0ec&tid=00000000-0000-0000-0000-000000000000&StreamID=5d2ec785-d06e-45f2-80eb-b1cb0133a314&ServerName=travbend.com";

    const ffmpeg = new FFmpegWASM.FFmpeg();
    
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    let coreURL = await FFmpegUtil.toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
    let wasmURL = await FFmpegUtil.toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');
    
    await ffmpeg.load({
        coreURL: coreURL,
        wasmURL: wasmURL
    });

    await ffmpeg.writeFile('input.m3u8', await FFmpegUtil.fetchFile(videoUrl));

    await ffmpeg.exec(['-i', 'input.m3u8', 'output.mp4']);
    const data = await ffmpeg.readFile('output.mp4');
    
    console.log("Testing 123");
}

download_video();
