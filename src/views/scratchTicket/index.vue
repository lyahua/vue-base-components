<template>
  <div class="scratch_ticket">
    <!-- <h2>刮刮乐</h2> -->
    <div class="text">受命于天, 既受永昌</div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  (() => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.border = "1px solid #ccc";
    canvas.style.position = "absolute";

    document.querySelector(".scratch_ticket").appendChild(canvas);

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "#edf";
    ctx.rect(0, 0, 400, 400);
    ctx.fill();

    canvas.onmousedown = function(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        ctx.beginPath();
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = '12';
        ctx.strokeStyle = '#fff'
        ctx.moveTo(x,y);
        
        canvas.onmousemove = function(e2) {
            ctx.lineTo(e2.offsetX, e2.offsetY)
            ctx.stroke()

            canvas.onmouseup = function(){
                canvas.onmousemove = null;
            }
            canvas.onmouseleave = function(){
                canvas.onmousemove = canvas.onmouseup = null;
            }
        }

    }
    // ctx.globalCompositeOperation = "destination-out";
    // ctx.fillStyle = "#fff";
    // ctx.arc(150, 150, 120, 0, Math.PI * 2);
    // ctx.fill();
  })();

//   (() => {
//     const canvas = document.createElement("canvas");
//     canvas.width = 400;
//     canvas.height = 400;
//     canvas.style.border = "1px solid #ccc";
//     canvas.style.position = "absolute";

//     document.querySelector(".scratch_ticket").appendChild(canvas);

//     const ctx = canvas.getContext("2d");
//     ctx.beginPath();
//     ctx.fillStyle = "#edf";
//     ctx.rect(0, 0, 400, 400);
//     ctx.fill();

//     ctx.beginPath();
//     ctx.globalCompositeOperation = "destination-out";
//     ctx.fillStyle = "#fff";
//     ctx.arc(150, 150, 120, 0, Math.PI * 2);
//     ctx.fill();
//   })();
});
</script>

<style lang="css" scoped>
canvas {
  position: absolute;
  /* z-index: -2; */
}
.text {
  width: 400px;
  height: 400px;
  font-size: 70px;
  text-align: center;
  background: #abc;
  display: flex;
  align-items: center;
  position: absolute;
}
</style>
