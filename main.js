
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

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else {
        console.log(results);
        objects = results
    }
}
var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('input');
var voiceSelect = document.querySelector('select');

function populateVoiceList() {
  voices = synth.getVoices();

  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

inputForm.onsubmit = function(event) {
  event.preventDefault();

  var utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute('status');
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  synth.speak(utterThis);
  inputTxt.blur();
}

function draw(){
    image(video, 380, 380)
    if(status != ""){
        objectDetector.detect(gotResult)
       for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status - Object Mentioned Found";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects - " + objects.length;

        fill('#FF0000');
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%"  ,objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke('#FF0000')
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
    }
    else{
        var utterThis = new SpeechSynthesisUtterance("Object Mentioned Not Found");
        synth.speak(utterThis);
    }
}

