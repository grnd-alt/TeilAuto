<style scoped>
.Project{
    background-color: blue;
}


/* from here on permanent */
.Project:hover{
    cursor:pointer;
}
.Project.left{
    display:flex;
    direction: ltr;
    width:38%;
    border-radius:1vw;
}

.left.textdiv{
    border-radius: 1vw 0 0 1vw;
    /* background-color: red; */
    font-size:1.5em;
    max-width:35%;
    position:absolute;
    padding-left:2.5%;
    height:inherit;
    color: #d0d0d0;
    background-color:rgb(50,50,50,0.5);
}

.left.imgdiv{
    
    float:left;
    text-align:right;
    width:60%;
    margin-left:40% ;
    
}

.img.left{
    border-radius: 0 1vw 1vw 0;
    vertical-align: bottom;
}
.hidden{
    visibility: hidden;
}
</style>
<template>
    <div>
        <h1>
            Every Significant Project
        </h1>
        <div class = "Project left" id = "TeilAuto" v-on:click="HandleProjectRedirect('TeilAuto')">
            <div class = "left textdiv">
                <h2 class = "left text">TeilAuto Analysis</h2>
                <a class = "left text"> Spicy jalapeno bacon ipsum dolor amet tenderloin bresaola occaecat pastrami eu shank turkey andouille spare ribs beef ribs enim. Do short loin ground round mollit dolor irure fatback bacon. Chicken adipisicing dolore beef ribs incididunt aliquip biltong id fatback andouille shoulder capicola rump. Fatback aliquip ham dolore enim shoulder.</a>
            </div>
            <div class = "left imgdiv" >
                <img class = "img left" src="@/assets/Carsharing.jpg"/>
            </div>
            
            
        </div>
    </div>
</template>
<script>
import $ from 'jquery'

export default{
    methods:{
        HandleProjectRedirect:function(routeto){
            this.$router.push("/Projects/"+routeto)
        }
    },
    mounted(){
        
        $('document').ready(function(){
            console.log($('.left.Project').height());
            $('.left.textdiv').height($('.left.Project').height());
        })
        window.onresize = function(){
            if($('a.left.text').height()+$('h2.left.text').height()>=313){
                if($('a.left.text').css("font-size").split("p")[0]>0){
                    $('a.left.text').css("font-size",($('a.left.text').css("font-size").split("p")[0]-1)+"px");
                    console.log($('a.left.text').css("font-size")+"down");

                }
                // while($('a.left.text').height()+$('h2.left.text').height()>=343 && count <= 2){
                //     console.log($('a.left.text').css("font-size",($('a.left.text').css("font-size").split("p")[0]-1)+"px"));
                //     count++;
                // }
            }else{
                
                // count=0;
                if($('a.left.text').css("font-size").split("p")[0]>1){
                    $('a.left.text').css("font-size",(parseInt($('a.left.text').css("font-size").split("p")[0])+1)+"px");
                    console.log($('a.left.text').css("font-size")+"up");
                }
                // while($('a.left.text').height()+$('h2.left.text').height()<=343 && count <= 2){
                //     console.log($('a.left.text').css("font-size",($('a.left.text').css("font-size").split("p")[0]+1)+"px"));
                //     count++;
                //     }
            }
            
            console.log($('a.left.text').height()+$('h2.left.text').height());
        };
        // alert(document.getElementsByClassName("left textdiv").height)
    }
}
</script>
