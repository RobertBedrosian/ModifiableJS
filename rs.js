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
            box.style.cursor = "nwse-resize"
            document.onmousedown = resize;
        }
        else if(event.offsetX >= parseInt(boxStyle.width)
        && event.offsetY <=0){
            box.style.cursor = "nesw-resize"
            document.onmousedown = resize;
        }
        else if(event.offsetX <= 0 && event.offsetY >= parseInt(boxStyle.height)){
            box.style.cursor = "nesw-resize"
            document.onmousedown = resize;
        }
        else if(event.offsetX <= parseInt(boxStyle.width)
        && event.offsetY >= parseInt(boxStyle.height)){
            box.style.cursor = "nwse-resize"
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
        else if(event.offsetX <= parseInt(boxStyle.width)
        && event.offsetY >= parseInt(boxStyle.height)){
            document.onmousemove = resizeBr;
        }
        document.onmouseup = stopResize;
    }
    function resizeTl(event){
        event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        document.documentElement.style.cursor = "nwse-resize";
        newX = event.clientX - origX;
        newY = event.clientY - origY;
        origX = event.clientX;
        origY = event.clientY;
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minHeight) == parseInt(boxStyle.height))){
            prevTop = parseInt(boxStyle.top);
            if(newY <= 0 && event.clientY < parseInt(boxStyle.top)){
                box.style.top = event.clientY + "px";
                box.style.height = 
                (parseInt(window.getComputedStyle(box).height) - newY) + "px";
            }
        }
        else{
            console.log('henlo')
            box.style.top = event.clientY + "px";
            box.style.height = (parseInt(boxStyle.height) - newY) + "px";
        }
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minWidth) == parseInt(boxStyle.width))){
            if(newX <= 0 && event.clientX < parseInt(boxStyle.left)){
                box.style.left = event.clientX + "px";
                box.style.width = (parseInt(boxStyle.width) - newX) + "px"
            }
        }
        else{
            box.style.left = event.clientX + "px";
            box.style.width = (parseInt(boxStyle.width) - newX) + "px"
        }
    }
    function resizeTr(event){
        event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        document.documentElement.style.cursor = "nesw-resize";
        newX = event.clientX - origX;
        newY = event.clientY - origY;
        origX = event.clientX;
        origY = event.clientY;
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minHeight) == parseInt(boxStyle.height))){
            prevTop = parseInt(boxStyle.top);
            if(newY <= 0 && event.clientY < parseInt(boxStyle.top)){
                box.style.top = event.clientY + "px";
                box.style.height = 
                (parseInt(window.getComputedStyle(box).height) - newY) + "px";
            }
        }
        else{
            console.log('henlo')
            box.style.top = event.clientY + "px";
            box.style.height = (parseInt(boxStyle.height) - newY) + "px";
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
        document.documentElement.style.cursor = "nesw-resize";
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
            console.log('henlo')
            box.style.height = (parseInt(boxStyle.height) + newY) + "px";
        }
        //edge case, if box is at minimum specs, we want a certain behaviour
        if((parseInt(boxStyle.minWidth) == parseInt(boxStyle.width))){
            if(newX <= 0 && event.clientX < parseInt(boxStyle.left)){
                box.style.left = event.clientX + "px";
                box.style.width = (parseInt(boxStyle.width) - newX) + "px"
            }
        }
        else{
            box.style.left = event.clientX + "px";
            box.style.width = (parseInt(boxStyle.width) - newX) + "px"
        }
    }
    function resizeBr(event){
        event = event || window.event;
        event.preventDefault();
        event.stopPropagation();
        document.documentElement.style.cursor = "nesw-resize";
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
    function stopResize(event){
        document.onmousemove = null;
        document.onmouseup = null;
        document.documentElement.style.cursor = "";
    }
}
