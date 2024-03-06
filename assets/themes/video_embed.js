document.addEventListener("DOMContentLoaded", function () {
  //Light YouTube Embeds
  let ytDiv, ytN;
  const ytV = document.getElementsByClassName("youtube-player");
  for (ytN = 0; ytN < ytV.length; ytN++) {
    ytDiv = document.createElement("div");
    ytDiv.setAttribute("data-id", ytV[ytN].dataset.id);
    ytDiv.innerHTML = labnolThumb(ytV[ytN].dataset.id);
    ytDiv.onclick = labnolIframe;
    ytV[ytN].appendChild(ytDiv);
  }

  //Light Vimeo Embeds
  let vimeoDiv, vimeoN;
  const vimeov = document.getElementsByClassName("vimeo-player-inner");
  for (vimeoN = 0; vimeoN < vimeov.length; vimeoN++) {
    vimeoDiv = document.createElement("div");
    vimeoDiv.setAttribute("data-id", vimeov[vimeoN].dataset.id);
    const vimeoJSON =
      "https://vimeo.com/api/v2/video/" + vimeov[vimeoN].dataset.id + ".json";
    $.getJSON(vimeoJSON, function (data) {
      const imgSrc = data[0].thumbnail_large;
      const videoTitle = data[0].title;
      vimeoDiv.innerHTML = labnolThumbVimeo(imgSrc, videoTitle);
    });
    vimeoDiv.onclick = labnolIframeVimeo;
    vimeov[vimeoN].appendChild(vimeoDiv);
  }
});

function labnolThumb(id) {
  const thumb =
    '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg" class="yt" loading="lazy">';
  const play = '<div class="play-wrapper"><div class="play"></div></div>';
  return thumb.replace("ID", id) + play;
}

function labnolIframe() {
  //console.log(this);
  const iframe = document.createElement("iframe");
  const embed = "https://www.youtube.com/embed/ID?autoplay=1";
  iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "1");
  this.parentNode.replaceChild(iframe, this);
}

function labnolThumbVimeo(imgSrc, videoTitle) {
  const thumb =
    '<img src="' +
    imgSrc +
    '" class="vimeo" width="640" height="360" loading="lazy">';
  const play = '<div class="play-wrapper"><div class="play"></div></div>';
  const title = '<div class="title">' + videoTitle + "</div>";
  return thumb + play + title;
}

function labnolIframeVimeo() {
  const iframe = document.createElement("iframe");
  const embed =
    "https://player.vimeo.com/video/ID?color=3284FA&byline=0&portrait=0&autoplay=1";
  iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "1");
  this.parentNode.replaceChild(iframe, this);
}
