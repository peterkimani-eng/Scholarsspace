async function loadData() {
    try{
        const response=await fetch(`./lessons.json`);

        const data=await response.json();
        console.log(data.html);
        let lessonOne=data.html[0].content;
        console.log(lessonOne)
        
    }catch(error){
        console.error("coul not load json data:",error);
    }
    
    
}

loadData();
console.log("end");

const modules = ["HTML Tags", "CSS Basics", "JS Logic"];

coursesMainPage.innerHTML = `
    <ol>
        ${modules.map(mod => `<li>${mod}</li>`).join('')}
    </ol>
`;
/*
To keep your existing dropdown buttons working perfectly while adding new courses, you should use insertAdjacentHTML.
When you use innerHTML +=, the browser destroys and recreates every element in that container, which "kills" any active event listeners. insertAdjacentHTML simply "injects" the new HTML at the end without touching the old elements.
The Implementation
Update your Courses Page (the sender) to use a unique ID or class for each course so they don't conflict, and update your Home Page (the receiver) like this:
On the Home Page (Receiver)

const coursesMainPage = document.getElementById("courses");const bc = new BroadcastChannel("course-updates");

bc.onmessage = (event) => {
    if (event.data.html) {
        // 'beforeend' puts the new HTML right before the </div> closer
        // This keeps all PREVIOUS buttons and listeners alive!
        coursesMainPage.insertAdjacentHTML('beforeend', event.data.html);
        
        console.log("New course injected at the bottom!");
    }
};
// Use the Event Delegation we set up before
coursesMainPage.addEventListener("click", (event) => {
    // This listener is ATTACHED ONCE and works for all 
    // current AND future buttons added via insertAdjacentHTML
    if (event.target.classList.contains("drop-btn")) {
        const parent = event.target.closest('.course-container');
        const list = parent.querySelector('.lessons-list');
        
        list.style.display = list.style.display === "none" ? "block" : "none";
        event.target.textContent = list.style.display === "block" ? "⬆️" : "⬇️";
    }
});

Why insertAdjacentHTML is the winner:

   1. Speed: It doesn't re-parse the entire DOM tree; it only parses the new string.
   2. Stability: If a user already had a "Web Dev" dropdown open, it stays open when you add "SQL" below it.
   3. No "Reset": Text inputs or scroll positions inside the existing courses won't jump or clear.

Pro Tip for your HTML String
Since you are adding multiple courses now, give your buttons a class (like class="drop-btn") instead of just an id. This makes it much easier for your click listener to identify any dropdown button regardless of which course it belongs to.
Do you want to see how to add a "Clear All" button that empties the entire list and clears the localStorage at once?
*/
