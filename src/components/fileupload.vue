<style>
  form{
    padding-top:190px;
    display: block;
    height: 210px;
    width: 400px;
    margin: auto;
    margin-top: 40px;
    text-align: center;
    border: 3px dashed rgb(226, 211, 211);
    border-radius: 4px;
    color: #ccc;
    transition-duration:0.5s;
  }

  .over{
      border:3px dashed black;
      color:black;
      transition-duration:0.5s;
  }
  .dropped{
      border:3px dashed black;
      color:black;
      transition-duration:0.5s;
  }
  .dropped span{
      color:gray;
  }
  .x-button{
      margin-top:auto;
      margin-bottom:auto;
      margin-left:0.5em;
      max-height: 100%;
      max-width: 100%;
      height:auto;

  }
  .x-button:hover{
      cursor:pointer;
  }
  .files{
      text-align: left;
      font-size: 1em;
      height: 1em;
      padding:0;
      left:50%;
  }
  #filelist{
      height:60%;
      overflow:hidden;
      overflow-y:auto;
  }
  table{
      margin-right:auto;
      margin-left:auto;
      border-spacing: 0 0.6em;
  }
  tr{
      height:1em;
      padding:0;
  }
  td{
      height:1em;
      padding:0;
      margin-top:0.5em;
  }
  .raise{
      color:#94e458;
      transition-duration: 0.25s;
      border:solid 3px;
      border-color:#94e458;
      background:none;
      width: 80%;
      height:20%;
  }
  .raise:hover{
      cursor:grab;
    box-shadow: inset 0 -3.25em 0 0 #94e458;
    border-color:#94e458;
    color:white;
    transition-duration: 0.3s;
  }
    .noraise{
      color:gray;
      transition-duration: 0.25s;
      border-color:gray;
      background:none;
      width: 80%;
      height:20%;
      
  }
  .noraise:hover,
  .noraise:focus{
      cursor:grab;
    box-shadow: inset 0 -3.25em 0 0 gray;
    border-color:gray;
    color:white;
    transition-duration: 0.3s;
  }

</style>

<template>
  <div id="file-drag-drop">
    <form ref="fileform" id = "dropzone">
        <span class="drop-files">CSV Dateien in dieses Feld ziehen</span>
        <div id = "filelist">
            <table id = "filetable">
                <tr class = "files" v-bind:key="index" v-for="index in files"><td><a>{{index.name}}</a></td><td><img :id="index.name" v-on:click="delfile" class = "x-button" src= "../assets/icons8-xbox-x-100.png"></td></tr>
            </table>    
        </div>
        <button class = "raise" v-if="files.length >0" v-on:click="filehandler">Bestätigen</button>
        <button class = "noraise" v-if="files.length ==0">Bestätigen</button>
    </form>
    <br>
    <a id = "file-drop-error"></a>
  <zingchart ref = "main" id = "mainchart"  v-if="loaded" :data = "chartData"></zingchart>  
  </div>
  
</template>


<script>

import 'zingchart/es6';
import zingchartVue from 'zingchart-vue';
  export default {
      name:"fileupload",
      components:{zingchart:zingchartVue},
      data(){
          return{
              months: [],
              dragAndDropCapable:false,
              files:[],
              errorfiles:[],
              loaded:true,
              FileObjects:[],
              chartData:{
                  type:"bar",
                  series:[{values:[1,2,4,5,6]}],
                  "scale-x":{
                      values:[1,2,3,4,5,]
                  }
              },
              
          }
      },

      methods:{
          addmonth(month){
              for(let i =0; i < this.months.length;i++){
                  var ListMonth = this.months[i];
                  if (month["month"] == ListMonth["month"] && month["year"] == ListMonth["year"]){
                      this.months[i]["price"] = Number(Number(this.months[i]["price"]) +Number(month["price"])).toFixed(2);
                      return false;
                  }
              }
              for(let i = 0; i<this.months.length-1;i++){
                  try{
                        if(this.months[i]["val"] < month["val"]&&this.months[i+1]["val"]>month["val"]){
                            this.months.splice(i,0,month);
                        }
                  }catch{
                      console.log("errorr::  "+i)
                  }
              }
              if (this.months.length == 0){
                  this.months.push(month);
                  return;
              }
                else if(this.months[0]["val"]>month["val"]){
                    this.months.unshift(month);
                }
                else if (this.months.slice(-1)["val"]<month["val"]){
                    this.months.push(month);
                }
                else{
                    this.months.push(month);
                }
              return true;
          },
          
          filehandler(e){
                var readfile = function(file){
                    return new Promise((resolve,reject)=>{
                    let reader = new FileReader();
                    reader.readAsBinaryString(file);
                    reader.onload = function(el){    
                        var dataFile= el.target.result.split("\n").slice(1);
                        for(let i = 0;i<dataFile.length;i++){
                                var element = dataFile[i];
                                try{
                                    var Objekt=Array();
                                    Objekt["month"] = parseInt(element.split(";")[6].split("-")[1]);
                                    Objekt["year"] = parseInt(element.split(";")[6].split("-")[0]);
                                    Objekt["price"] = Number(element.split(";")[11].replace(",",".").replace('"','').replace('"',''));
                                    Objekt["val"] =(Objekt["month"]/13)+Objekt["year"];
                                    this.FileObjects.push(Objekt);
                                    this.addmonth(Objekt);
                                }catch(error){
                                    continue;
                                }
                        }
                        console.log(this.months);
                    }.bind(this);
                    var a = 1;
                    if (a==1){
                        resolve("hello"); 
                    }else{
                        reject("hello not");
                    }
                    // reject();
                    
                });}
                readfile("file").then(function(me){
                    alert(me);
                },function(me){
                    alert(me);
                },);
                e.preventDefault();
                // this.$refs.main.removescalevalue({scale:"scale-x",nodeindex:1})
                // this.$refs.main.removenode({nodeindex:1});
                // this.$refs.main.addscalevalue({scale:"scale-x",value:"Januar"});
                // this.$refs.main.appendseriesvalues({values:[[5]]});
                // this.$refs.main.removescalevalue({scale:"scale-x",nodeindex:1})
                this.files.forEach(file=>{
                    let reader = new FileReader();
                    reader.readAsBinaryString(file);
                    reader.onload = function(el){    
                        var dataFile= el.target.result.split("\n").slice(1);
                        for(let i = 0;i<dataFile.length;i++){
                                var element = dataFile[i];
                                try{
                                    var Objekt=Array();
                                    Objekt["month"] = parseInt(element.split(";")[6].split("-")[1]);
                                    Objekt["year"] = parseInt(element.split(";")[6].split("-")[0]);
                                    Objekt["price"] = Number(element.split(";")[11].replace(",",".").replace('"','').replace('"',''));
                                    Objekt["val"] =(Objekt["month"]/13)+Objekt["year"];
                                    this.FileObjects.push(Objekt);
                                    this.addmonth(Objekt);
                                }catch(error){
                                    continue;
                                }
                        }
                        console.log(this.months);
                    }.bind(this);
              });
               
              for(let i = 0; i< this.months.length;i++){
                  this.$refs.main.appendseriesvalues({values:[[this.months[i]["price"]]]});
                  this.$refs.main.addscalevalue({scale:"scale-x",value:this.months[i]["month"].toString() + "."+this.month[i]["year"].toString()});
                  console.log("running through");
              }
          },

          FindIndexInFiles(fileName){
              for(let i = 0; i < this.files.length;i++){
                  if (fileName == this.files[i].name){
                      return i;
                  }
              }
          },          
          determineDragAndDropCapable(){
              var div = document.createElement('div');
              return ( ( 'draggable' in div )
                    || ( ' ondragstart' in div && 'ondrop' in div) )
                    && 'FormData' in window
                    && 'FileReader' in window;
          },
          delfile(e){
              var el = this.FindIndexInFiles(e.target.id);
              this.files.splice(el,1);
              var table = document.getElementById("filetable");
              table.children[el].remove();
          }
      },
      mounted(){
          
          this.dragAndDropCapable = this.determineDragAndDropCapable();
          if (this.dragAndDropCapable){
                console.log("capable");
                var form = document.getElementById("dropzone");
                document.addEventListener('dragover',function(){
                    form.classList.add("over"); 
                });
                ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) { 
                  document.addEventListener(evt, function(e){
                      e.preventDefault();
                      e.stopPropagation();
                  }.bind(this),false);
              }.bind(this));
              document.addEventListener("drop",function(e){
                  for (let i = 0; i < e.dataTransfer.files.length; i ++ ){
                      if (e.dataTransfer.files[i].name.split(".").slice(-1) == "csv"){
                        this.files.push(e.dataTransfer.files[i]);
                      }
                      else{
                          this.errorfiles.push(e.dataTransfer.files[i].name);
                      }
                  }
                  if (this.errorfiles.length >0){
                      document.getElementById("file-drop-error").innerText = "Die Datei(en):";
                      for (let i = 0; i < this.errorfiles.length;i++){
                          document.getElementById("file-drop-error").innerText += " \""+this.errorfiles[i] + "\",";
                      }
                      document.getElementById("file-drop-error").innerText += " sind nicht im richtigen Format (.csv)";
                  }
                  form.classList.remove("over"); 
                  form.classList.add("dropped"); 
              }.bind(this));

          }
      }
  }
</script>