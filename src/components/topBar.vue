
<style scoped>
#FieldWrapper{
    margin-bottom:1em;
    background-color: #333;
    width:auto;
    /* padding-left:5%; */
    overflow:hidden;
}
.field{
    font-size:1.25em;
    color:#f2f2f2;
    padding:0.5em;
    transition-duration: 0.5s;
}
.field:hover{
    background-color:#ddd;
    color:black;
    cursor:pointer;
    transition-duration:0.25s;
}
.active{
    background-color:#ddd;
    color:black;
}
</style>
<template>
    <div id = "tobBarMain"> 
        <div id = "FieldWrapper"> 
            <a class = "field" v-on:click="navClick" v-for="item in navs" :key="item">
                {{ item }}
            </a>
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
            this.$emit("navChange",event.target.innerHTML);
        }
    }
}

</script>
