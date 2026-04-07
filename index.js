
const courses=document.getElementById("lessons");
const coursesBtn=document.getElementById("drop-down-web");
const p1=document.getElementById("html1");
const coursesMainPage=document.getElementById("courses");

//joining channel


async function loadData() {
    try{
        const response=await fetch(`./lessons.json`);

        const data=await response.json();
        
    }catch(error){
        console.error("coul not load json data:",error);
    }
    
    
}
  

loadData();