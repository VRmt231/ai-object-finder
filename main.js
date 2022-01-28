function setup(){
    canvas.createCanvas(380,380);
    canvas.center()
    video.createCapture(VIDEO)
    video.size(380,380)
    video.hide() 
    objectdetector - ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML("Status: Detecting Objects")
}

function modelLoaded(){
    console.log("CocoSsDjust came into existence for our project!")
    status = true;
}

function draw(){
    image(video, 380, 380)
}
