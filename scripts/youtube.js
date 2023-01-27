//GET YOUTUBE VIDEO ID
function GetYouTubeVideoID(url) {
  if (url) {
    let videoID, result;
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      videoID = result.pop();
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      videoID = result.pop();
    }
    return videoID;
  }
}

//GET YOUTUBE VIDEO TITLE AND AUTOFILL NAME
async function GetYouTubeVideoTitle(videoID, youtubeAPIKey) {
  const response = await fetch(
    "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
      videoID +
      "&key=" +
      youtubeAPIKey,
    {
      method: "GET",
    }
  ).catch((error) => {
    alert("HTTP-Error: " + response.status) + " Video ID invalid.";
    const message =
      "An error has occurred: ${response.status}. Video ID invalid.";
    throw new Error(message);
  });

  const data = await response.json();
  AutofillYouTubeVideoTitle(data.items[0].snippet.title);
}

function AutofillYouTubeVideoTitle(data) {
  addTodoName.value = data;
}

//GET YOUTUBE THUMBNAIL

//TESTING GET YOUTUBE THUMBNAIL
function getYouTubeThumbnail(videoID, quality) {
  if (videoID) {
    if (typeof quality == "undefined") {
      quality = "high";
    }

    let qualityKey = "maxresdefault"; // Max quality
    if (quality == "low") {
      qualityKey = "sddefault";
    } else if (quality == "medium") {
      qualityKey = "mqdefault";
    } else if (quality == "high") {
      qualityKey = "hqdefault";
    }

    const thumbnail =
      "http://img.youtube.com/vi/" + videoID + "/" + qualityKey + ".jpg";
    return thumbnail;
  }
}
