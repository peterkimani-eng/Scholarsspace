//ALL LESSONS CONTAINER ELEMENTS
//localStorage.clear();

const xpholder=document.getElementById("xps");

const mainContainer=document.getElementById("mainContainer");
const lessonsCtn =document.getElementById("lessonscontainer");
const progressBar =document.getElementById("progress-bar-2");
const marker =document.getElementById("progress-bar-3");
const headCtn =document.getElementById("headingscontainer");                  
const h2s=document.getElementById("h2"); 
const h3s=document.getElementById("h3");
const paragraphsCtn=document.getElementById("paragraphsctn"); 
const p1s =document.getElementById("p1"); 
const p2s =document.getElementById("p2"); 
const p3s =document.getElementById("p3"); 
const imgsCtn=document.getElementById("imgsctn"); 
const img1=document.getElementById("img1"); 
const img2=document.getElementById("img2"); 
const ansBtn=document.getElementById("ansbtns"); 
const q1s =document.getElementById("question");
const bt1=document.getElementById("btn1"); 
const btn2=document.getElementById("btn2"); 
const btn3=document.getElementById("btn3"); 
const btn4=document.getElementById("btn4"); 
const ctrlBtns=document.getElementById("ctrlbtns"); 
const btn5=document.getElementById("btn5"); 
const btn6=document.getElementById("btn6"); 
const btn7=document.getElementById("btn7"); 
const btn01=document.getElementById("classtogle");
const ansbtns=document.getElementsByClassName("ansbtns");
const resultsCtn=document.getElementById("resultscontainer");
const popUp=document.getElementById("popup");
const popUpBtn=document.getElementById("popupbtn");



//COURSES CONTAINER ELEMENTS
const coursesPage=document.getElementById("courses")
const p=document.getElementById("html1");

//body elements
const header = document.getElementById("top-container");
const sideMenu = document.getElementById("side-menu");
//loading saved state
function loadSavedContent() {
    const savedData = localStorage.getItem("savedCourseHTML");
    if (savedData) {
         coursesPage.innerHTML =savedData;
        console.log("Loaded course from storage!");
    }
    return(savedData);
   
}
savedData=loadSavedContent();
console.log(savedData);

// 1. Run immediately when the user opens the Home page
loadSavedContent();
if (savedData==null){
  popUp.classList.remove("popup");
}

 popUpBtn.addEventListener("click", ()=>{
  popUp.classList.add("popup");})
//joining channel
const bc=new BroadcastChannel("course-updates");
bc.onmessage=(event)=>{
    if(event.data.html){
        coursesPage.innerHTML+=event.data.html;
        console.log("succesfuly updated via broadcastchannel");
    }else{
      console.log("error!")
    }
}






// Helper function to handle the showing/hiding




//this JS FILE VARIABLES

let data;
let index=0;
let constantIndex=1;
let width=0;
let constantWidth=width;
let choice1=false;
let choice2=false;
let choice3=false;
let answerd=false;
let answer=0;
let correctAnswer="";
let xp=0;
let constantXp=0;
let xpchanged=false;
let marks=0;
let marksInLesson=0;
let clickedElement="";
let theElement="html";
let theElementCliked="";

constantXp=localStorage.getItem("savedxp",constantXp);

xpholder.textContent=`Xp: ${constantXp}`
 
 
sideMenu.addEventListener("click",()=>{
  let insideContent=event.target.textContent;
  window.alert(`${insideContent}Feature coming soon`);
});
coursesPage.addEventListener("click", (event) => {
    const btnId = event.target.id;
    const clickedButton=`${btnId}b`
    let button = document.getElementById(clickedButton);
    clickedElement=event.target;
    theElementCliked=clickedElement.textContent;
    console.log(theElementCliked); 
    // Target the DIV by adding the prefix
    let html = document.getElementById("content-" + btnId+"b");
     
  if(btnId===theElementCliked){
        if (html) { 
         if (html.style.display === "none" || html.style.display === "") {
            html.style.display = "block";
            button.textContent = "⬆️";
            console.log(clickedElement.classList);
         } else {
            html.style.display = "none";
            button.textContent = "⬇️";
            
         }
       }else{
         console.log(clickedElement.classList.value);
      }
  }else
    if((theElementCliked=="⬇️")||(theElementCliked=="⬆️")){
           html = document.getElementById("content-" + btnId);
           button = document.getElementById(btnId);
        if (html) { 
         if (html.style.display === "none" || html.style.display === "") {
            html.style.display = "block";
            button.textContent = "⬆️";
            console.log(clickedElement.classList);
         } else {
            html.style.display = "none";
            button.textContent = "⬇️";
            
         }
       }else{
         console.log(clickedElement.classList.value);
      }
  }


    if (clickedElement.classList.value==="lesson-item") {
        console.log("You clicked lesson:", clickedElement.textContent);
       index=0;
 constantIndex=1;
 width=0;
 constantWidth=width;
 choice1=false;
 choice2=false;
 choice3=false;
 answerd=false;
 answer=0;
 correctAnswer="";
 xp=0;
 xpchanged=false;
 marks=0;
 marksInLesson=0;
        
       displayingLesson();
       lessoncontrol();
    }
});



btn01.addEventListener("click",()=>{
  displayingCoursesHome();
   
})

btn5.addEventListener("click",()=>{
    if(index>0
    ){
    index=index-1;
    lessoncontrol(index);
    }
    
});
btn7.addEventListener("click",()=>{
  if(index<(constantIndex-1))
   proceed();
    
});
 bt1.addEventListener("click",()=>{
    if(choice1===false){
      bt1.classList.add("correctAns");
      choice1=true;
    }else{
      choice1=false;
      bt1.classList.remove("correctAns");
    }
 });


 btn2.addEventListener("click",()=>{
     if(choice2===false){
      btn2.classList.add("correctAns");
      choice2=true;
    }else{
      choice2=false;
      btn2.classList.remove("correctAns");
    }
  }); 


 btn3.addEventListener("click",()=>{
     if(choice3===false){
      btn3.classList.add("correctAns");
      choice3=true;
    }else{
      choice3=false;
      btn3.classList.remove("correctAns");
    }
  }); 
   let click=0;
  btn6.addEventListener("click",()=>{
    
   if(click===0){
     if(choice1===true&&correctAnswer!=1||choice2===true&&correctAnswer!=2||choice3===true&&correctAnswer!=3){
      btn6.textContent="Not quit 😏 proceed";
      const btns=[bt1,btn2,btn3];
      const choice=[choice1,choice2,choice3];
      btns[correctAnswer-1].classList.add("correctAns");
      for(i=0;i<choice.length;i++){
        choice[i]===true?btns[i].classList.add("wrongAns"):btns[i].classList.add("normalbtn");
      }
      click++;
     }else
      if(choice1===true&&correctAnswer===1||choice2===true&&correctAnswer===2||choice3===true&&correctAnswer===3){
        btn6.textContent="You Got It proceed ✅";
        click++;
        marksAwward();
       
      }else{
        btn6.textContent="choose one of the above to proceed";
      }
   }else{
   btn6.textContent="Submit";
    click=0;
      resetAnsBtns();
      proceed();
      xpincrement();
   }
  });
  
  
function lessoncontrol(){
    let h3=data[clickedElement.textContent][index].h3;
    let p1=data[clickedElement.textContent][index].content1;
    let p2=data[clickedElement.textContent][index].content2;
    let q1=data[clickedElement.textContent][index].question;
    let a1=data[clickedElement.textContent][index].choice1;
    let a2=data[clickedElement.textContent][index].choice2;
    let a3=data[clickedElement.textContent][index].choice3;
    correctAnswer=data[clickedElement.textContent][index].sign; // sign==correctans 

    h3s.textContent=h3;
    p1s.textContent=p1;
    p2s.textContent=p2;
    q1s.textContent=q1
    bt1.textContent=a1;
    btn2.textContent=a2;
    btn3.textContent=a3;
    btn4.textContent="";
      

  async function checkElements() {
    const elements = [bt1, btn2, btn3, btn4]; 
    let k=0;
    for(i=0;i<elements.length;i++){
    
      if(elements[k].textContent==""){
        elements[k].style.display="none";
      }else{
        elements[k].style.display="block";
     }
      k++;
    
    }

    //width and progress visuals controll
    // Add a check to ensure the data exists before getting the length
 let lessonCount = data[theElementCliked] ? data[theElementCliked].length : 0;
 let width2 = lessonCount > 0 ? `${100 / lessonCount}%` : "100%";
 console.log(width2);

   // let width2=`${100/(data[theElementCliked].length)}%`;

   // Add a check to ensure the data exists before calculating progress
 let totalLessons = data[theElementCliked] ? data[theElementCliked].length : 0;
 console.log(data[theElementCliked])
 // Calculate width3 (Progress Bar) based on the current index
 let width3 = totalLessons > 0 ? `${((index) * 100 / totalLessons)}%` : "0%";
 console.log(width3);
  // let width3=`${((index)*100/(data[theElementCliked].length))}%`;
   
   width=lessonCount>0?`${((constantIndex)*100/(data[theElementCliked].length))}%`:"100%";
   console.log(width);
    progressBar.style.width=(width);
    marker.style.width=(width2);
    marker.style.marginLeft=(width3)
   
}


checkElements();




    
}
function proceed(){
   if(index<(data[theElementCliked].length-1)){
    index=index+1;
    console.log(index);
     if(index>=constantIndex){
      constantIndex++;
      console.log(constantIndex);
    } 
    lessoncontrol(index);
   }
   else 
    if(width=="100%"){
      displayResultsPage();
    }
}


function xpincrement(){
   if((xpchanged===false)&&(parseInt(width)===100)&&(marksInLesson>=0.5)){
          xp=xp+10;
         constantXp= parseint(constantXp)+10;
          localStorage.setItem("savedxp",constantXp);
          console.log(xp);
          xpchanged=true;
        }else{
          xp=xp;
        }
}
function marksAwward(){
  if((index+1==constantIndex)&&(width!="100%")){
    marks++;
    console.log(marks);
    console.log(index);
    console.log(constantIndex);
    console.log(data[theElementCliked].length);
    marksInLesson=`${marks/data[theElementCliked].length}`;
    console.log(marksInLesson);
  }
}
function resetAnsBtns(){
    const btns=[bt1,btn2,btn3];
    for(i=0;i<3;i++){
      btns[i].classList.remove("correctAns");
      btns[i].classList.remove("wrongAns");
      btns[i].classList.add("normalbtn");
    }
    choice1=false;
    choice2=false;
    choice3=false;
}
function toggleDisplay(element, button) {
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
        button.textContent = "⬆️";
    } else {
        element.style.display = "none";
        button.textContent = "⬇️";
    }
}


let  resultsctn=document.getElementById("resultscontainer");
function displayResultsPage(){
  if (width=="100%"){
  resultsCtn.innerHTML=`<div id=resultsctn > <div id="progress-bar" class="nodisplay">
                <div id="progress-bar-2"></div>
                <div id="progress-bar-3"></div>
            </div>
            <button id="classtogle1" onclick=displayingCoursesHome();>❌</button>
            <div id="headingscontainer1" >
               <h3 id="h31">Congratilations🎉 lesson completed✔️</h3>
            </div>
            <div id="paragraphsctn">
               <p id="p11">🎆</p>
               <p id="p21">Marks earned:<span>${marks} 🌟</span></p>
               <p id="p31">xp earned:<span>${xp} 🏅</span></p>
            </div>
            
            <div id="ansbtns1">
                <h3 id="question1">Hope to see you again after completeing another lesson 🧑‍🎓champ!</h3>
            </div>    
                
                    
                
             
            </div>
            <div  id="ctrlbtns1" >
                <button id="btn51" class="nodisplay">🔙</button>
                <button id="btn61" onclick=displayingCoursesHome();>Home🏠</button>
                <button id="btn7" class="nodisplay">🔜</button>
            </div> 
        </div>  
            `
            
           displayingResults();
}else{
  console.log("results page didnt execute")
}
}

function displayingLesson(){
   lessonsCtn.classList.remove("coursesS");
   coursesPage.classList.add("coursesS");
   header.classList.add("coursesS");
   sideMenu.classList.add("coursesS");
   resultsCtn.classList.add("coursesS");
   resultsCtn.classList.remove("resultsPage");
}
function displayingResults(){
   lessonsCtn.classList.add("coursesS");
   resultsCtn.classList.add("resultsPage");
   resultsCtn.classList.remove("coursesS");

   console.log("cssapplied")
}
function displayingCoursesHome(){
   lessonsCtn.classList.add("coursesS");
   coursesPage.classList.remove("coursesS");
   header.classList.remove("coursesS");
   sideMenu.classList.remove("coursesS");
   resultsCtn.classList.add("coursesS");
   resultsCtn.classList.remove("resultsPage"); 
}

async function loadData() {
    try{
        const response=await fetch(`./lessons.json`);

         data=await response.json();

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         console.log(data);
         return data;
         

          
        
    }catch(error){
        console.error("coul not load json data:",error);
    }
    
    
}


loadData();
 console.log("End");
