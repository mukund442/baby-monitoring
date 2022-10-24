function setup(){
    canvas=createCanvas(500, 420);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting"
}

function modelLoaded(){
    console.log("Model Loaded");
}

function gotResult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results);
        object=results;
    }
}

status="";
object=[];
alarm="";

function preload(){
    alarm=loadSound('sweet_home_alabama.mp3');
}

function draw(){
    objectDetector.detect(video, gotResult);
    image(video, 0, 0, 500, 420);
    
    if(object.length<0){
        document.getElementById("status").innerHTML="Status : Baby not detected";
        alarm.play();
    }
    else{
        for(i=0; i<object.length; i++){
            if(object[i]=="person"){
                fill('#FF0000');
                text("Person");
                noFill();
                stroke('FF0000');
                rect(object[i].x, object[i].y, object[i].length, object[i].width);
                alarm.stop();
                document.getElementById("status").innerHTML="Status : Baby Found";
            }
            else{
                document.getElementById("status").innerHTML="Status : Baby not detected";
                alarm.play();
            }
        }
    }
}