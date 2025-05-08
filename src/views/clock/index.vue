<template>
    <div class="clock">
        <h2>时钟</h2>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(()=>{
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;

    canvas.style.border = '1px solid #000';
    // canvas.style.position = 'relative'
    // canvas.style.left = '50%';
    // canvas.style.top= '50%';
    // canvas.style.translate = 'translate(-50%, -50%)'

    document.querySelector('.clock').appendChild(canvas);

    const ctx = canvas.getContext('2d');

    ctx.translate(200, 200);

    ctx.save()
    ctx.beginPath();
    ctx.arc(0, 0, 200,0, Math.PI *2)
    ctx.stroke()
    ctx.restore();

    // 绘制时针刻度
    ctx.save();
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#efg'
    for(let i=0;i <12; i++) {
        ctx.beginPath();
        ctx.moveTo(0, -200);
        ctx.lineTo(0, -180);
        ctx.stroke();
        ctx.rotate(Math.PI * 2/ 12)
    }
    ctx.restore();

    // 绘制分针，秒针刻度线
    ctx.save();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#0f0';
    for (let i=0; i<60; i++) {
        if (i%5  !==0){
            ctx.beginPath();
            ctx.moveTo(0, -200);
            ctx.lineTo(0, -170);
            ctx.stroke();
        }
        ctx.rotate(Math.PI *2/ 60)
    }

    ctx.restore();
})
</script>

<style lang="css" scoped>

</style>