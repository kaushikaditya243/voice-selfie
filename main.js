var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start_camera() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event) {

    console.log(event);

    var content = event.results[0][0].transcript;
    console.log(content);

    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie") {
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    //speakdata = document.getElementById("textbox").value;
    speakdata = "taking your selfie";
    var utterThis = new SpeechSynthesisUtterance(speakdata);
    synth.speak(utterThis);
    Webcam.attach(camera);

    setTimeout(function() {
        takeSnapShot();
        save();
    }, 3000);

}

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

function takeSnapShot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='selfie_img' src='" + data_uri + "'>";
    });
}

function save() {
    link = document.getElementById("link");
    img = document.getElementById("selfie_img").src;
    link.href = img;
    link.click();
}