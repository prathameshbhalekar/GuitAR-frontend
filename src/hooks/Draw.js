import FindIntersection from "../Utils/FindIntersection";
import SplitLine from "../Utils/SplitLine";
import Map from "../Utils/Map";
const AR = require("js-aruco").AR;

const draw = (canvas, video, ptr, list, textColor, strokeColor) => {
  var ctx = canvas.getContext("2d", { alpha: false });

  canvas.width = video.video.videoWidth;

  canvas.height = video.video.videoHeight;

  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video.video, 0, 0, canvas.width, canvas.height);
  ctx.scale(-1, 1);
  ctx.translate(-canvas.width, 0);
  ctx.lineWidth = 5;
  const detector = new AR.Detector();
  var markers = detector.detect(ctx.getImageData(0, 0, 1280, 720));

  if (markers.length > 0) {
    const corners = markers[0].corners;
    let pt1, pt2, pt3, pt4;
    pt1 = Map(
      corners[1].x,
      corners[1].y,
      corners[0].x,
      corners[0].y,
      ptr.m_ratio1,
      ptr.n_ratio1
    );
    pt2 = Map(
      corners[1].x,
      corners[1].y,
      corners[0].x,
      corners[0].y,
      ptr.m_ratio2,
      ptr.n_ratio2
    );
    pt3 = Map(
      corners[1].x,
      corners[1].y,
      corners[0].x,
      corners[0].y,
      ptr.m_ratio3,
      ptr.n_ratio3
    );
    pt4 = Map(
      corners[1].x,
      corners[1].y,
      corners[0].x,
      corners[0].y,
      ptr.m_ratio4,
      ptr.n_ratio4
    );

    ctx.strokeStyle = `#${strokeColor}`;

    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.lineTo(pt3.x, pt3.y);
    ctx.lineTo(pt4.x, pt4.y);
    ctx.lineTo(pt1.x, pt1.y);
    ctx.stroke();

    var top = SplitLine(pt1, pt2, 6);
    var bottom = SplitLine(pt4, pt3, 6);

    var i;

    for (i = 0; i < top.length; i++) {
      ctx.beginPath();
      ctx.moveTo(top[i].x, top[i].y);
      ctx.lineTo(bottom[i].x, bottom[i].y);
      ctx.stroke();
    }

    var right = SplitLine(pt3, pt2, 6);
    var left = SplitLine(pt4, pt1, 6);
    right.reverse();
    left.reverse();

    for (i = 0; i < right.length; i++) {
      ctx.beginPath();
      ctx.moveTo(right[i].x, right[i].y);
      ctx.lineTo(left[i].x, left[i].y);
      ctx.stroke();
    }

    if (list) {
      for (var pos = 0; pos < list.length; pos++) {
        ctx.font = "30px Arial";
        ctx.fillStyle = `#${textColor}`;
        var res = FindIntersection(
          top[list[pos].x - 1],
          bottom[list[pos].x - 1],
          {
            x: (left[list[pos].y - 1].x + left[list[pos].y].x) / 2,
            y: (left[list[pos].y - 1].y + left[list[pos].y].y) / 2,
          },
          {
            x: (right[list[pos].y - 1].x + right[list[pos].y].x) / 2,
            y: (right[list[pos].y - 1].y + right[list[pos].y].y) / 2,
          }
        );
        ctx.fillText(`${list[pos].fing}`, res.x, res.y + 5);
      }
    } else {
      console.error("Tab Not Found");
    }
  }

  ctx.stroke();
};

export default draw;
