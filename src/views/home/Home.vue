<script setup>
import Test from '@/components/BaseForm/index.jsx'
</script>

<template>
  <main>
    home
    <BaseInput/>

    <BaseSelect :options="[{label:1,value:1,},{label:2,value:2}]"/>

    <BaseForm></BaseForm>

    <hr/>
    <Test/>
  </main>
</template>
