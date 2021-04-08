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
      vertical-align: middle;
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
  .notification{
    font-family: Helvetica; 
    text-align: left;
    font-size:1em;
    position:fixed;
    background-color:white;
    z-index:15;
    bottom:0;
    padding-bottom:0%;
    padding-top:0%;
    padding-left:10%;
    padding-right:10%;
    left:50%;
    transform: translate(-50%,0);
    border-radius:10px;
    transition-duration:0.5s;
    margin-bottom:1%;  
  }
  .positive{
    color:green;
    border:2px solid green;
  }
  .negative{
    color:red;
    border:2px solid red;
  }
.notshown {
    bottom:-25%;
    transition-duration:0.8s;
  }
  #head{
    font-size:1.2em;
    /* background-color:red; */
    top:50%;
    transform:translateY(-50%);
  }
  #body{
      font-size:1em;
  }
  #chartwrapper{
      max-width:50%;
      margin:auto;
  }
</style>

<template>
  <div id="file-drag-drop">
      <vue-topprogress ref="topProgress"></vue-topprogress>
    <form ref="fileform" id = "dropzone" v-if="loaded==false||showFiles==true">
        <span class="drop-files">CSV Dateien in dieses Feld ziehen</span>
        <div id = "filelist">
            <table id = "filetable">
                <tr class = "files" v-bind:key="index.name" v-for="index in files"><td><a>{{index.name}}</a></td><td><img :id="index.name" v-on:click="delfile" class = "x-button" src= "../assets/icons8-xbox-x-100.png"></td></tr>
            </table>    
        </div>
        <button class = "raise" v-if="newfiles.length >0" v-on:click="FileHandler">Bestätigen</button>
        <button class = "noraise" v-if="newfiles.length ==0">Bestätigen</button>
    </form>
    <br>
    <a id = "file-drop-error"></a>
  <div  class = "notshown notification"><a id = "head">{{notification.headline}}</a></div>
  <div id = "chartwrapper">
    <testchart v-if="loaded===true" :data='data'/>
  </div>
  </div>
  
</template>


<script>
import testchart from './testchart.vue' 
import vueTopprogress from 'vue-top-progress'
import Vue from 'vue';
Vue.use(vueTopprogress);
// import func from 'vue-editor-bridge';

export default {
      name:"fileupload",
      components:{
          testchart
      },
      data(){
          return{
            data:{
            labels:["1","2","3","4","5","6","7","8"],
            datasets:[{
                label:"Hello",
                data:[1,3,4,4,5,5,6,7],
                fill:false,
                backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192,1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            },{
                label:"Hello",
                data:[8,4,5,6,2,4,6,7],
                fill:false,
                backgroundColor: [
                'rgba(130, 91, 255, 1)',
                'rgba(130, 91, 255, 1)',
                'rgba(130, 91, 255, 1)',
                'rgba(130, 91, 255, 1)',
                'rgba(130, 91, 255, 1)',
            ],
                borderColor: [
                'rgba(130, 91, 255, 1)',
                'rgba(130, 91, 255, 1)',
                'rgba(130, 91, 255, 1)',
                'rgba(130, 91, 255, 1)',
                'rgba(130, 91, 255, 1)'
            ],
            }],
        options:{
            scales:{
                yAxes:[{
                    ticks:{
                        beginAtZero:true
                    },
                    gridLines:{
                        display:true
                    }
                }],
                xAxes:[{
                    gridLines:{
                        display:true
                    }
                }]
            },
            responsive:true,
            maintainAspectRatio:true,
        }
        },
        files:[],
        newfiles:[],
              database:{
                  InsertEntry:function(entry,filename){ // eslint-disable-line no-unused-vars
                      let openRequest = indexedDB.open("data",1);
                      openRequest.onupgradeneeded = function(event){ // eslint-disable-line no-unused-vars
                          let db = openRequest.result;
                          if(!db.objectStoreNames.contains('Entries')){
                              db.createObjectStore('Entries',{keypath:'array'});
                          }
                      }
                      openRequest.onsuccess = function(){
                          let db = openRequest.result;
                          let transaction = db.transaction("Entries","readwrite");
                          let Entries = transaction.objectStore("Entries");
                          let request = Entries.add({fromFile:filename},entry); // eslint-disable-line no-unused-vars
                          db.close();
                          
                      }.bind(this);
                  },},
              months: [],
              dragAndDropCapable:false,
              errorfiles:[],
              loaded:false,
              showFiles:true,
              FileObjects:[],
              chartData:{
                  type:"bar",
                  series:[{values:[1,2,4,5,6]}],
                  "scale-x":{
                      values:[1,2,3,4,5,]
                  }
              },
              notification:{
                  headline:"Upload finished",
                  body:"",
              }
              
          }
      },

      methods:{
          GetMonthOfArray(fileName){
              console.log(fileName);
          },
          GetkmPerMonthChart(){
              for(let i = 0; i< this.files.length;i++){
                  this.GetMonthOfArray(this.files[i].key);
              }
          },
          DeleteEntrie:function(file){
            let openRequest = indexedDB.open("data",1);
            openRequest.onupgradeneeded = function(event){ // eslint-disable-line no-unused-vars
                let db = openRequest.result;
                if(!db.objectStoreNames.contains('Entries')){
                    db.createObjectStore('Entries',{keypath:'array'});
                }}
            openRequest.onsuccess=function(){
                let db = openRequest.result;
                 let transaction = db.transaction("Entries","readonly");
                    let Entries = transaction.objectStore("Entries");
                    let request = Entries.openCursor();
                    request.onsuccess=function(event){
                        let cursor = event.target.result;
                        
                        if(cursor){
                            let value = cursor.value["fromFile"];
                            if (value==file.name){                                
                                let trans2 = db.transaction("Entries","readwrite");
                                let Entries = trans2.objectStore("Entries");
                                let request = Entries.delete(cursor.key);// eslint-disable-line no-unused-vars
                            }
                            cursor.continue();
                        }
                    }.bind(this);
            }
          },
          GetEntries:function(){
            let openRequest = indexedDB.open("data",1);
            openRequest.onupgradeneeded = function(event){ // eslint-disable-line no-unused-vars
                let db = openRequest.result;
                if(!db.objectStoreNames.contains('Entries')){
                    db.createObjectStore('Entries',{keypath:'array'});
                }
                }
                openRequest.onsuccess = function(){
                let db = openRequest.result;
                let transaction = db.transaction("Entries","readwrite");
                let Entries = transaction.objectStore("Entries");
                let request = Entries.openCursor();
                request.onsuccess=function(event){
                    let cursor = event.target.result;
                    if(cursor){
                        let key = cursor.primaryKey;
                        let value = cursor.value;
                        var indi = true;
                        this.files.forEach((item)=>{
                            if (item.name==value["fromFile"]){
                                indi = false;
                            }
                        })
                        if (indi){
                            this.files.push({
                                key:key,
                                name:value["fromFile"],
                            })
                        }
                        cursor.continue();
                    }
                    }.bind(this);
                    db.close();
                }.bind(this);
            },
          NegativeNotification(message){
            this.notification.headline = message;
            document.getElementsByClassName("notification")[0].classList.remove("notshown"); 
            document.getElementsByClassName("notification")[0].classList.add("negative"); 
            document.getElementsByClassName("notification")[0].classList.remove("positive"); 
            setTimeout(()=>{
                    document.getElementsByClassName("notification")[0].classList.add("notshown"); 
                    document.getElementsByClassName("notification")[0].classList.remove("negative"); 
            },3000)
          },
          PositiveNotification(message){
            this.notification.headline = message;
            document.getElementsByClassName("notification")[0].classList.remove("notshown"); 
            document.getElementsByClassName("notification")[0].classList.add("positive"); 
            document.getElementsByClassName("notification")[0].classList.remove("negative"); 
            setTimeout(()=>{
                    document.getElementsByClassName("notification")[0].classList.remove("positive"); 
                    document.getElementsByClassName("notification")[0].classList.add("notshown"); 
            },3000)
          },
          ReadFiles(files){
              this.$refs.topProgress.start();
              var reader = new FileReader();
              var ReadFile = function(index,entries){
                  if (index<files.length){
                      var file = files[index];
                      reader.onload =function(el){
                            // console.log(el.target.result);
                            try{
                                var localentries = el.target.result.split("\n").slice(1,-1);
                                localentries.forEach(function(entry,index){
                                    entry = entry.replaceAll("\"","");
                                    localentries[index] = entry.split(";");
                                    this.database.InsertEntry(localentries[index],file.name);
                                }.bind(this));
                                entries = entries.concat(localentries);
                            }catch(error){
                                console.error(error);
                            }
                            ReadFile(index+1,entries);
                            if (index == files.length-1){
                                this.PositiveNotification("Dateien Hochgeladen");
                                setTimeout(()=>{
                                    this.$refs.topProgress.done();
                                    this.loaded=true;
                                    this.showFiles=false;
                                },1000)
                                
                                
                          }
                      }.bind(this);
                      reader.readAsBinaryString(file);
                  }
                  else{
                      return;
                  }
              }.bind(this);
              ReadFile(0,new Array());
          },
          async FileHandler(element){
              element.preventDefault();
              await this.ReadFiles(this.newfiles);
          },

          FindIndexInFiles(fileName){
              for(let i = 0; i < this.files.length;i++){
                  if (fileName == this.files[i].name){
                    console.log(this.files[i].name);
                    console.log(fileName);
                    console.log(i);
                    return i;
                  }
              }
              console.log("No index found");
              return false;
          },  
          delfile(e){
              var el = this.FindIndexInFiles(e.target.id);
              this.DeleteEntrie(this.files[el]); 
              this.files.splice(el,1);
              var table = document.getElementById("filetable");
              table.children[el].remove();
          },
            determineDragAndDropCapable(){
              var div = document.createElement('div');
              return ( ( 'draggable' in div )
                    || ( ' ondragstart' in div && 'ondrop' in div) )
                    && 'FormData' in window
                    && 'FileReader' in window;
          }
      },
      mounted(){
          this.$refs.topProgress.start();
          this.GetEntries();
          this.dragAndDropCapable = this.determineDragAndDropCapable();
          if (this.dragAndDropCapable){
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
                      if (e.dataTransfer.files[i].name.split(".").slice(-1) == "csv"&&this.FindIndexInFiles(e.dataTransfer.files[i].name)===false){
                        this.files.push(e.dataTransfer.files[i]);
                        this.newfiles.push(e.dataTransfer.files[i]);
                      }
                      else{
                          this.errorfiles.push(e.dataTransfer.files[i].name);
                      }
                  }
                  if (this.errorfiles.length >0){
                      this.NegativeNotification("doppelte bzw. Dateien im falschen Format werden ignoriert")
                  }
                  form.classList.remove("over"); 
                  form.classList.add("dropped"); 
              }.bind(this));
          }
          setTimeout(() => {
              this.$refs.topProgress.done();
          }, (300));
      }
  }
</script>