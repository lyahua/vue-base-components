<template>
  <div class="clock">
    <!-- <h2>时钟</h2> -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;

  // canvas.style.border = "1px solid #000";
  // canvas.style.position = 'relative'
  // canvas.style.left = '50%';
  // canvas.style.top= '50%';
  // canvas.style.translate = 'translate(-50%, -50%)'

  document.querySelector(".clock").appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.translate(200, 200);

  (function drar() {
    ctx.clearRect(-200, -200, canvas.width, canvas.height)
    const now = new Date();
    const hour = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, 200, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 绘制时针刻度
    ctx.save();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#efg";
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(0, -200);
      ctx.lineTo(0, -180);
      ctx.stroke();
      ctx.rotate((Math.PI * 2) / 12);

      // ctx.beginPath();
      // ctx.moveTo(0,-175);
      // ctx.font = "20px serif";
      // ctx.fillText(i+1,0, -160)
    }
    ctx.restore();

    // 绘制分针，秒针刻度线
    ctx.save();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#0f0";
    for (let i = 0; i < 60; i++) {
      if (i % 5 !== 0) {
        ctx.beginPath();
        ctx.moveTo(0, -200);
        ctx.lineTo(0, -170);
        ctx.stroke();
      }
      ctx.rotate((Math.PI * 2) / 60);
    }
    ctx.restore();

    // 绘制数字
    ctx.save();
    const singleAngle = (Math.PI * 2) / 12;
    const radius = 160;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      const x = radius * Math.sin(singleAngle * i);
      const y = -radius * Math.cos(singleAngle * i);
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(i === 0 ? 12 : i, x, y);
    }
    ctx.restore();

    // 绘制时针
    ctx.save();
    ctx.rotate(
      ((hour * 3600 + minutes * 60 + seconds) * Math.PI * 2) / (60 * 60 * 12)
    );
    ctx.beginPath();
    ctx.moveTo(-5, 10);
    ctx.lineTo(-5, -100);
    ctx.lineTo(-15, -100);
    ctx.lineTo(0, -120);
    ctx.lineTo(15, -100);
    ctx.lineTo(5, -100);
    ctx.lineTo(5, 10);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // 绘制分针
    ctx.save();
    ctx.rotate(((minutes * 60 + seconds) * Math.PI * 2) / 3600);
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.moveTo(0, 20);
    ctx.lineTo(0, -150);
    ctx.stroke();
    ctx.restore();

    // 绘制秒针
    ctx.save();
    ctx.rotate(((Math.PI * 2) / 60) * seconds);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#f00";
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(0, -160);
    ctx.stroke();
    ctx.restore();

    // 绘制圆点
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    setTimeout(drar, 1000);
  })();
});
</script>

<style lang="css" scoped></style>
