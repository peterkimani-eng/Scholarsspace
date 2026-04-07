

let info="";
let idOfClickedButton="";
let I=0;
//localStorage.clear();
// background-color: rgba(28, 28, 122, 0.925);
//courses page elements
const coursesContainer=document.getElementById("courses1");
const courseParagraph1=document.getElementById("cpgh1");
const courseParagraph2=document.getElementById("c-pgh2");
const courseParagraph3=document.getElementById("c-pgh3");
const courseParagraph4=document.getElementById("c-pgh4");
const courseParagraph5=document.getElementById("c-pgh5");
const courseParagraph6=document.getElementById("c-pgh6");
const courseParagraph7=document.getElementById("c-pgh7");


//joining channel
const bc=new BroadcastChannel("course-updates");

//coursesmain page

const sideMenu=document.getElementById("side-menu");

sideMenu.addEventListener("click",()=>{
  let insideContent=event.target.textContent;
  window.alert(`${insideContent}Feature coming soon`);
});


coursesContainer.addEventListener("click",(event)=>{
   let valueOfP=event.target.id;
   let found="";
   let i=0;
   I=0;
     const storageKey = `clickedStatus_${valueOfP}`;

   idOfClickedButton=valueOfP;
   if((localStorage.getItem(storageKey)!='true')){
      localStorage.setItem(storageKey,true)
        for ( i=0;i<info.topics.length;i++){
          if(found!=true){
            if(idOfClickedButton==(info.topics[I][0].mainSubject)){
              console.log("succesfly found");
              innerHtml();
               window.alert("Course added to home page");
              found=true;
            }else{
              console.log("error trying again");
              I++;
           }
         }
       } 
   }else{
     window.alert("Course already added to home page");
   }
       
 }
);


function innerHtml(event){
  let htmlContent=[];
 
 htmlContent.push(`<h3 id="headerparagraph">${info.topics[I][0].mainSubject}</h3>
              <div id="webDev">
                 <p  id="${info.topics[I][1].subject}">${info.topics[I][1].subject}</p>
                 <button  id="${info.topics[I][1].subject}b">⬇️</button>
                 <div id="content-${info.topics[I][1].subject}b" class="coursesS">
                    <ol>
                       
                     ${info.topics[I][1].lessons.map(mod => `<li class="lesson-item" >${mod}</li>`).join('')}
                        
                    </ol>
                 </div>
               </div> 
               <div id="sql">
                 <p id="${info.topics[I][2].subject}" >${info.topics[I][2].subject}</p>
                 <button id="${info.topics[I][2].subject}b">⬇️</button>
                  <div id="content-${info.topics[I][2].subject}b" class="coursesS">
                    <ol>
                       
                     ${info.topics[I][2].lessons.map(mod => `<li class="lesson-item" >${mod}</li>`).join('')}
                        
                    </ol>
                 </div>
               </div>
               <div id="javascript">
                 <p  id="${info.topics[I][3].subject}" >${info.topics[I][3].subject}</p>
                 <button id="${info.topics[I][3].subject}b">⬇️</button>
                  <div id="content-${info.topics[I][3].subject}b" class="coursesS">
                    <ol>
                       
                     ${info.topics[I][3].lessons.map(mod => `<li class="lesson-item" >${mod}</li>`).join('')}
                        
                    </ol>
                 </div>
               </div>`);
               //broadcasting the message
           bc.postMessage({html:htmlContent}); 
           
  // Retrieve existing stored content
  let existing = localStorage.getItem("savedCourseHTML");
  if (existing) {
    // If already stored, append new content
    existing += htmlContent.join('');
    localStorage.setItem("savedCourseHTML", existing);
  } else {
    // If nothing stored yet, just save new content
    localStorage.setItem("savedCourseHTML", htmlContent.join(''));
  } 
               console.log(htmlContent);
               console.log("succsess");
};


async function loadInfo() {
    try{
        const response=await fetch(`./courses.json`);

         info=await response.json();
        console.log("info retrived from json file succsesfly");
        return(info);
    }catch(error){
        console.error("coul not load json data:",error);
    }
    
    
}
  

loadInfo();
