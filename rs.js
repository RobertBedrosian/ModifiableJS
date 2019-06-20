window.addEventListener("load", onLoad, false);

function onLoad(){
    Draggable(document.getElementById('box'));
    Resizeable(document.getElementById('box'));
}

function Draggable(box){
    var origX, origY, newX, newY = 0;
    box.addEventListener("mousedown", (event)=>{
        event = event || window.event;
        event.preventDefault();
        origX = event.clientX;
        origY = event.clientY;
        document.onmousemove = boxMove;
        document.onmouseup = stopBoxMove;
    });
    function boxMove(event){
        event = event || window.event;
        event.preventDefault();
        newX = event.clientX - origX;
        newY = event.clientY - origY;
        origX = event.clientX;
        origY = event.clientY;
        box.style.top = (box.offsetTop + newY) + "px";
        box.style.left = (box.offsetLeft + newX) + "px";
    }
    function stopBoxMove(){
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function Resizeable(box){
    box.addEventListener("mousemove", mousemove);
    var boxStyle = window.getComputedStyle(box);
    var origX, origY, newX, newY = 0;
    function mousemove(event){
        if (event.offsetX <= 0 && event.offsetY <= 0){
            box.style.cursor = "nwse-resize";
            document.onmousedown = resize;
        }
        else if(event.offsetX >= parseInt(boxStyle.width)
        && event.offsetY <=0){
            box.style.cursor = "nesw-resize";
            document.onmousedown = resize;
        }
        else if(event.offsetX <= 0 && event.offsetY >= parseInt(boxStyle.height)){
            box.style.cursor = "nesw-resize";
            document.onmousedown = resize;
        }
        else if(event.offsetX >= parseInt(boxStyle.width)
        && event.offsetY >= parseInt(boxStyle.height)){
            box.style.cursor = "nwse-resize";
            document.onmousedown = resize;
        }
        else if(event.offsetX <= 0){
            box.style.cursor = "e-resize";
            document.onmousedown = resize;
        }
        else if(event.offsetX >= parseInt(boxStyle.width)){
            box.style.cursor ="e-resize";
            document.onmousedown = resize;
        }
        else if(event.offsetY <= 0){
            box.style.cursor ="n-resize";
            document.onmousedown = resize;
        }
        else if(event.offsetY >= parseInt(boxStyle.height)){
            box.style.cursor ="n-resize";
            document.onmousedown = resize;
        }
        else if(!document.onmousemove){
            box.style.cursor = "move";
            document.onmousedown = null;
        }
    }
    function resize(event){
        event = event || window.event;
        event.preventDefault();
        origX = event.clientX;
        origY = event.clientY;
        if (event.offsetX <= 0 && event.offsetY <= 0){
            document.onmousemove = resizeTl;
        }
        else if(event.offsetX >= parseInt(boxStyle.width)
        && event.offsetY <=0){
            document.onmousemove = resizeTr;
        }
        else if(event.offsetX <= 0 && event.offsetY >= parseInt(boxStyle.height)){
            document.onmousemove = resizeBl;
        }
        else if(event.offsetX >= parseInt(boxStyle.width)
        && event.offsetY >= parseInt(boxStyle.height)){
            document.onmousemove = resizeBr;
        }
        else if(event.offsetX <= 0){
            document.onmousemove = resizeLeft;
        }
        else if(event.offsetY <= 0){
            document.onmousemove = resizeTop;
        }
        else if(event.offsetX >= parseInt(boxStyle.width)){
            document.onmousemove = resizeRight;
        }
        else if(event.offsetY >= parseInt(boxStyle.height)){
            document.onmousemove = resizeBottom;
        }
        document.onmouseup = stopResize;
    }
    function resizeTl(event){
        event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        newX = event.clientX - origX;
        newY = event.clientY - origY;
        origX = event.clientX;
        origY = event.clientY;
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minHeight) == parseInt(boxStyle.height))){
            prevTop = parseInt(boxStyle.top);
            if(newY <= 0 && event.clientY < parseInt(boxStyle.top)){
                box.style.top = parseInt(boxStyle.top) + newY + "px";
                box.style.height = (parseInt(boxStyle.height) - newY) + "px"
            }
        }
        else{
            if((parseInt(boxStyle.height) - newY) < parseInt(boxStyle.minHeight)){
                box.style.top = (parseInt(boxStyle.top) + (parseInt(boxStyle.height) - parseInt(boxStyle.minHeight))) + "px";
                box.style.height = parseInt(boxStyle.minHeight) + "px"            
            }
            else{
                box.style.top = parseInt(boxStyle.top) + newY + "px";
                box.style.height = (parseInt(boxStyle.height) - newY) + "px"
            }
        }
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minWidth) == parseInt(boxStyle.width))){
            if(newX <= 0 && event.clientX < parseInt(boxStyle.left)){
                box.style.left = parseInt(boxStyle.left) + newX + "px";
                box.style.width = (parseInt(boxStyle.width) - newX) + "px"
            }
        }
        else{
            console.log(parseInt(boxStyle.width) + " " + newX + " " + boxStyle.minWidth)
            if((parseInt(boxStyle.width) - newX) < parseInt(boxStyle.minWidth)){
                box.style.left = (parseInt(boxStyle.left) + (parseInt(boxStyle.width) - parseInt(boxStyle.minWidth))) + "px";
                box.style.width = parseInt(boxStyle.minWidth) + "px"            
            }
            else{
                box.style.left = parseInt(boxStyle.left) + newX + "px";
                box.style.width = (parseInt(boxStyle.width) - newX) + "px"
            }
        }
    }
    function resizeTr(event){
        event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        newX = event.clientX - origX;
        newY = event.clientY - origY;
        origX = event.clientX;
        origY = event.clientY;
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minHeight) == parseInt(boxStyle.height))){
            prevTop = parseInt(boxStyle.top);
            if(newY <= 0 && event.clientY < parseInt(boxStyle.top)){
                box.style.top = parseInt(boxStyle.top) + newY + "px";
                box.style.height = (parseInt(boxStyle.height) - newY) + "px"
            }
        }
        else{
            if((parseInt(boxStyle.height) - newY) < parseInt(boxStyle.minHeight)){
                box.style.top = (parseInt(boxStyle.top) + (parseInt(boxStyle.height) - parseInt(boxStyle.minHeight))) + "px";
                box.style.height = parseInt(boxStyle.minHeight) + "px"            
            }
            else{
                box.style.top = parseInt(boxStyle.top) + newY + "px";
                box.style.height = (parseInt(boxStyle.height) - newY) + "px"
            }
        }
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minWidth) == parseInt(boxStyle.width))){
            if(newX >= 0 && event.clientX > parseInt(boxStyle.left) 
            + parseInt(boxStyle.width)){
                box.style.width = (parseInt(boxStyle.width) + newX) + "px"
            }
        }
        else{
            box.style.width = (parseInt(boxStyle.width) + newX) + "px"
        }
    }
    function resizeBl(event){
        event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        newX = event.clientX - origX;
        newY = event.clientY - origY;
        origX = event.clientX;
        origY = event.clientY;
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minHeight) == parseInt(boxStyle.height))){
            prevTop = parseInt(boxStyle.top);
            if(newY >= 0 && event.clientY > parseInt(boxStyle.top) + 
            parseInt(boxStyle.height)){
                box.style.height = 
                (parseInt(window.getComputedStyle(box).height) + newY) + "px";
            }
        }
        else{
            box.style.height = (parseInt(boxStyle.height) + newY) + "px";
        }
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minWidth) == parseInt(boxStyle.width))){
            if(newX <= 0 && event.clientX < parseInt(boxStyle.left)){
                box.style.left = parseInt(boxStyle.left) + newX + "px";
                box.style.width = (parseInt(boxStyle.width) - newX) + "px"
            }
        }
        else{
            console.log(parseInt(boxStyle.width) + " " + newX + " " + boxStyle.minWidth)
            if((parseInt(boxStyle.width) - newX) < parseInt(boxStyle.minWidth)){
                box.style.left = (parseInt(boxStyle.left) + (parseInt(boxStyle.width) - parseInt(boxStyle.minWidth))) + "px";
                box.style.width = parseInt(boxStyle.minWidth) + "px"            
            }
            else{
                box.style.left = parseInt(boxStyle.left) + newX + "px";
                box.style.width = (parseInt(boxStyle.width) - newX) + "px"
            }
        }
    }
    function resizeBr(event){
        event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        newX = event.clientX - origX;
        newY = event.clientY - origY;
        origX = event.clientX;
        origY = event.clientY;
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minHeight) == parseInt(boxStyle.height))){
            prevTop = parseInt(boxStyle.top);
            if(newY >= 0 && event.clientY > parseInt(boxStyle.top) +
            parseInt(boxStyle.height)){
                box.style.height = 
                (parseInt(window.getComputedStyle(box).height) + newY) + "px";
            }
        }
        else{
            box.style.height = (parseInt(boxStyle.height) + newY) + "px";
        }
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minWidth) == parseInt(boxStyle.width))){
            if(newX >= 0 && event.clientX > parseInt(boxStyle.left) +
            parseInt(boxStyle.width)){
                box.style.width = (parseInt(boxStyle.width) + newX) + "px"
            }
        }
        else{
            box.style.width = (parseInt(boxStyle.width) + newX) + "px"
        }
    }
    function resizeLeft(event){
        event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        newX = event.clientX - origX;
        origX = event.clientX;
        console.log("This is left " + boxStyle.left + " and this is width " + parseInt(boxStyle.width) + "and this is " + newX )
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minWidth) == parseInt(boxStyle.width))){
            if(newX <= 0 && event.clientX < parseInt(boxStyle.left)){
                box.style.left = parseInt(boxStyle.left) + newX + "px";
                box.style.width = (parseInt(boxStyle.width) - newX) + "px"
            }
        }
        else{
            console.log(parseInt(boxStyle.width) + " " + newX + " " + boxStyle.minWidth)
            if((parseInt(boxStyle.width) - newX) < parseInt(boxStyle.minWidth)){
                box.style.left = (parseInt(boxStyle.left) + (parseInt(boxStyle.width) - parseInt(boxStyle.minWidth))) + "px";
                box.style.width = parseInt(boxStyle.minWidth) + "px"            
            }
            else{
                box.style.left = parseInt(boxStyle.left) + newX + "px";
                box.style.width = (parseInt(boxStyle.width) - newX) + "px"
            }
        }

    }
    function resizeTop(event){
        event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        newY = event.clientY - origY;
        origY = event.clientY;
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minHeight) == parseInt(boxStyle.height))){
            prevTop = parseInt(boxStyle.top);
            if(newY <= 0 && event.clientY < parseInt(boxStyle.top)){
                box.style.top = parseInt(boxStyle.top) + newY + "px";
                box.style.height = (parseInt(boxStyle.height) - newY) + "px"
            }
        }
        else{
            if((parseInt(boxStyle.height) - newY) < parseInt(boxStyle.minHeight)){
                box.style.top = (parseInt(boxStyle.top) + (parseInt(boxStyle.height) - parseInt(boxStyle.minHeight))) + "px";
                box.style.height = parseInt(boxStyle.minHeight) + "px"            
            }
            else{
                box.style.top = parseInt(boxStyle.top) + newY + "px";
                box.style.height = (parseInt(boxStyle.height) - newY) + "px"
            }
        }
    }
    function resizeRight(event){
        event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        newX = event.clientX - origX;
        origX = event.clientX;
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minWidth) == parseInt(boxStyle.width))){
            if(newX >= 0 && event.clientX > parseInt(boxStyle.left) +
            parseInt(boxStyle.width)){
                box.style.width = (parseInt(boxStyle.width) + newX) + "px"
            }
        }
        else{
            box.style.width = (parseInt(boxStyle.width) + newX) + "px"
        }

    }
    function resizeBottom(event){
        event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        newY = event.clientY - origY;
        origY = event.clientY;
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minHeight) == parseInt(boxStyle.height))){
            prevTop = parseInt(boxStyle.top);
            if(newY >= 0 && event.clientY > parseInt(boxStyle.top) +
            parseInt(boxStyle.height)){
                box.style.height = 
                (parseInt(window.getComputedStyle(box).height) + newY) + "px";
            }
        }
        else{
            box.style.height = (parseInt(boxStyle.height) + newY) + "px";
        }
    }
    function stopResize(event){
        document.onmousemove = null;
        document.onmouseup = null;
        document.documentElement.style.cursor = "";
    }
}
