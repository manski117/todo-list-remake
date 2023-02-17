

function updateResponsiveHeight(){

    function reportSidebarHeight(){
        const element: any = document.getElementById('current-project');
        const height: number = element.getBoundingClientRect().height;
        console.log(height);
        return height;
      }
    
    function setHeightVariable(num: number) {
    let total = Math.max(400, num);
    document.documentElement.style.setProperty('--min-main-height', `${total}px`);
    console.log(total);
    }
    
    
    let currentH: number = reportSidebarHeight();
    setHeightVariable(currentH);
    
}

export default updateResponsiveHeight;

  

  