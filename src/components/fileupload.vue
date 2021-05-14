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
      <button v-on:click="ToggleData">{{ DataToggleText }}</button>
    <form ref="fileform" id = "dropzone" v-if="showFiles==true">
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
document.title = "TeilAuto";
export default {
      name:"fileupload",
      components:{
          testchart
      },
      data(){
          return{
            DataToggleText:"Dateien Verstecken",
            entries:[],
            colorways:[{backgroundColor: [
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
            ],},{  backgroundColor: [
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
            ],}],
            data:{
            labels:["1","2","3","4","5","6","7","8"],
            datasets:[],
            // datasets:[{
            //     label:"Red",
            //     data:[1,3,4,4,0,5,6,7],
            //     fill:false,
            //     backgroundColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192,1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)'
            // ],
            //     borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)'
            // ],
            // },{
            //     label:"Blue",
            //     data:[8,4,5,6,2,4,6,7],
            //     fill:false,
            //     backgroundColor: [
            //     'rgba(130, 91, 255, 1)',
            //     'rgba(130, 91, 255, 1)',
            //     'rgba(130, 91, 255, 1)',
            //     'rgba(130, 91, 255, 1)',
            //     'rgba(130, 91, 255, 1)',
            // ],
            //     borderColor: [
            //     'rgba(130, 91, 255, 1)',
            //     'rgba(130, 91, 255, 1)',
            //     'rgba(130, 91, 255, 1)',
            //     'rgba(130, 91, 255, 1)',
            //     'rgba(130, 91, 255, 1)'
            // ],
            // }],
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
              showFiles:false,
              FileObjects:[],
              notification:{
                  headline:"Upload finished",
                  body:"",
              }
              
          }
      },

      methods:{
          ToggleData(){
              this.DataToggleText="Dateien verstecken";
              this.showFiles=!this.showFiles;
          },
          MakePrice(priceString){
                var pricefloat = parseFloat(priceString.replaceAll(",","."));
                return pricefloat;
          },
          MonthConstructor(dateString,price){
              dateString = dateString.split("-");
              var year = parseFloat(dateString[0]);
              var month = parseFloat(dateString[1]); 
              return {month:month,year:year,val:(month/100)+year,price:price};
          },
          GetIndexInMonth(val,months){
              for(let i = 0; i<months.length;i++){
                  if(val===months[i].val){
                      return i;
                  }
              }
              return false;
          },
          InsertInMonthLabels(newm,monthlabels){// eslint-disable-line no-unused-vars
              if (monthlabels.length == 0){
                  monthlabels.push(newm.month+"-"+newm.year);
                  return [monthlabels,0];
              }
              for(let index = 0; index <monthlabels.length;index++){
                  let item = monthlabels[index];
                  if(newm.val==(parseFloat(item.split("-")[0])/100)+parseFloat(item.split("-")[1])){
                      return [monthlabels,index];
                  }
                  if(index == monthlabels.length-1){
                      console.log("the end is the place");
                      monthlabels.push(newm.month+"-"+newm.year);
                      return [monthlabels,index]
                  }
                  if(newm.val>(parseFloat(item.split("-")[0])/100)+parseFloat(item.split("-")[1])&&newm.val<(parseFloat(monthlabels[index+1].split("-")[0])/100)+parseFloat(item.split("-")[1])){
                        console.log("this is the place");
                        return [monthlabels,index]
                  }
                //   console.log(item+" "+index);
              }
          },
          CreateChartData(persons){
              var monthlabels = []
              persons.forEach((person)=>{
                  person.months.forEach((month)=>{
                      monthlabels = this.InsertInMonthLabels(month,monthlabels)[0];
                  })
              })
              this.data.datasets = []
              persons.forEach((person,i)=>{
                  person.data = [];
                  var personind = 0;
                  monthlabels.forEach((monthlabel)=>{
                          if(personind<person.months.length){
                            if(monthlabel == person.months[personind].month+"-"+person.months[personind].year){
                                person.data.push(parseFloat(person.months[personind].price));
                                personind ++;
                            }
                            else{
                                person.data.push(0);
                      }}
                  })
                //   console.log(person.name);
                //   console.log(person.data);
                try{
                  this.data.datasets.push({
                label:person.name,
                data:person.data,
                fill:false,
                backgroundColor:this.colorways[i].backgroundColor,
                borderColor:this.colorways[i].borderColor,
            })}catch{
                this.data.datasets.push({
                label:person.name,
                data:person.data,
                fill:false,
                backgroundColor:this.colorways[0].backgroundColor,
                borderColor:this.colorways[0].borderColor,
                })
            }
              })
              console.log(persons[2].name);
              console.log(persons[2].months);
              console.log(persons[2].data);
              
              
              this.data.labels = monthlabels;
              var testcharti = Vue.extend(testchart);// eslint-disable-line no-unused-vars
              var component = new testcharti({
                  propsData:{
                      data:this.data
                  }
              }).$mount();
              console.log(document.getElementById("chartwrapper").lastChild.remove())
              document.getElementById("chartwrapper").appendChild(component.$el);
              

              console.log(monthlabels);
          },
          GetkmPerMonthChart(){
              var persons =[];
              for(let i = 0; i<this.entries.length;i++){
                  let ind = this.GetIndexInPersons(this.entries[i].key[1],persons);
                  if(ind===false){
                      persons.push({name:this.entries[i].key[1],months:[this.MonthConstructor(this.entries[i].key[6],this.MakePrice(this.entries[i].key[11]))]});
                  }
                  else{
                    let indinmonth = this.GetIndexInMonth(this.MonthConstructor(this.entries[i].key[6],this.MakePrice(this.entries[i].key[11])).val,persons[ind].months);
                      if(indinmonth===false){
                          if (ind == 2){
                              console.log(this.entries[i].key[6]);
                              console.log(this.MonthConstructor(this.entries[i].key[6],this.MakePrice(this.entries[i].key[11])));
                              console.log("saliiiim");
                          }
                          persons[ind].months.push(this.MonthConstructor(this.entries[i].key[6],this.MakePrice(this.entries[i].key[11])));
                      }else{
                          persons[ind].months[indinmonth].price += this.MakePrice(this.entries[i].key[11]);
                          persons[ind].months[indinmonth].price= parseFloat(persons[ind].months[indinmonth].price).toFixed(2);
                      }
                  }
              }
              this.CreateChartData(persons);
          },
          GetIndexInPersons(name,persons){
              for(let i = 0; i<persons.length;i++){
                  if(name===persons[i].name){
                      return i;
                  }
              }
              return false;
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
            this.entries = [];
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
                        this.entries.push({
                                key:key,
                                name:value["fromFile"],
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
                      }.bind(this);
                      reader.readAsBinaryString(file);
                  }
                  else{
                      this.newfiles = [];
                        this.PositiveNotification("Dateien Hochgeladen");
                        this.GetEntries();
                        setTimeout(()=>{
                            this.$refs.topProgress.done();
                            this.loaded=true;
                            this.showFiles=false;
                            this.DataToggleText = "Dateien Anzeigen";
                            this.GetkmPerMonthChart();
                        },1000)
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
          this.GetEntries();
          this.$refs.topProgress.start();
          
          this.dragAndDropCapable = this.determineDragAndDropCapable();
          if (this.dragAndDropCapable){
                
                document.addEventListener('dragover',function(){
                    let form = document.getElementById("dropzone");
                    form.classList.add("over");
                });
                ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) { 
                  document.addEventListener(evt, function(e){
                      e.preventDefault();
                      e.stopPropagation();
                  }.bind(this),false);
              }.bind(this));
              document.addEventListener("drop",function(e){
                  let form = document.getElementById("dropzone");
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
            //   console.log(this.files.length);
              if(this.files.length>0){
                  this.showFiles=false;
                  this.DataToggleText="Dateien anzeigen";
                  this.PositiveNotification("Daten aus Speicher geladen");
                  this.GetkmPerMonthChart();
              }
              else{ 
                this.showFiles = true;
                this.DataToggleText="Dateien anzeigen";
              }
              this.$refs.topProgress.done();
          }, (1000));
      }
  }
</script>