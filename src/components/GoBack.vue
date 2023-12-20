<template>
    <router-link :to="route">
        <div class="hd-heading">
            <img src="../../public/images/ic_back_grey@3x.png">
            <p>{{showString}}</p>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'GoBack',
    props: ['route', 'showString'], 
}
</script>