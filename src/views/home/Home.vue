<script setup>
import Test from '@/components/BaseForm/index.jsx'


import { Com1, Com2 } from '../testjsx/index'


</script>

<template>
  <main>

    <BaseInput/>

    <BaseSelect :options="[{label:1,value:1,},{label:2,value:2}]"/>

    <BaseForm></BaseForm>

    <hr/>
    <Test/>

    <hr/>
    <Com1 :a="111"/>
    <Com2>111

      <template v-slot:header="header">123</template>
    </Com2>
  </main>
</template>
