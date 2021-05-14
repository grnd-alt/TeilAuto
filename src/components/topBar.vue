
<style scoped>
#FieldWrapper{
    display: inline-block;
    text-align: center;
    margin-bottom:1em;
    background-color: #333;
    /* padding-left:5%; */
    overflow:hidden;
}
.field{
    font-size:1.25em;
    color:#f2f2f2;
    padding:0.8em;
    transition-duration: 0.5s;
}
.field:hover{
    background-color:#ddd;
    color:black;
    cursor:pointer;
    transition-duration:0.25s;
}
.router-link-exact-active{
    background-color:#ddd;
    color:black;
}
</style>
<template>
    <div id = "tobBarMain"> 
        <div id = "FieldWrapper"> 
            <div style="display:inline-block;" v-for="item in navs" :key="item">
            <router-link class = "field" :style="{width:navs.length/100+'%'}" v-on:click="navClick"  :to ="{name:item}">
                {{ item }}
            </router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        navs:Array,
        active:Number,
    },
    methods:{
        navClick:function(event){
            var active = document.getElementsByClassName("active");
            if(active.length >= 1){
                for (let i = 0; i < active.length;i++){
                    active[i].classList.remove("active");
                }
            }
            event.target.classList.add("active");
        }
    }
}

</script>
