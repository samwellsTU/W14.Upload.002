const ctx = new AudioContext();
const gain = ctx.createGain();
let audiobuffer = null;

gain.connect(ctx.destination);

document
  .getElementById("fileUpload")
  .addEventListener("change", async (event) => {
    let file = event.target.files[0];
    let arraybuf = await file.arrayBuffer();
    audiobuffer = await ctx.decodeAudioData(arraybuf);
    let x = audiobuffer.getChannelData(0);
    x.reverse();
    audiobuffer.copyToChannel(x, 0);
  });

document.getElementById("play").addEventListener("click", () => {
  if (audiobuffer) {
    let sourceNode = ctx.createBufferSource();
    sourceNode.buffer = audiobuffer;
    sourceNode.connect(gain);
    sourceNode.start();
  }
});
