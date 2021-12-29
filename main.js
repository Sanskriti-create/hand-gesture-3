prediction = "" ;

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnap()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src="+data_uri+">";
    });
};
console.log("ml5 version : ", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Sibb_Ufd6/model.json', modelLoaded);

function modelLoaded()
{
    console.log("Model is Loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "The Prediction is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_img');
    classifier.classify(img, got_result);
}

function got_result(error, results)
{
    if (error)
    {
        console.error(error);
    }

    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();

        if(results[0].label = "amazing")
        {
            document.getElementById("update_emoji").innerHTML = "👌🏼";
        }
        if(results[0].label = "best")
        {
            document.getElementById("update_emoji").innerHTML = "👍🏼";
        }
        if(results[0].label = "victory")
        {
            document.getElementById("update_emoji").innerHTML = "✌🏼";
        }
        if(results[0].label = "bad idea")
        {
            document.getElementById("update_emoji").innerHTML = "👎🏼";
        }
        if(results[0].label = "call me")
        {
            document.getElementById("update_emoji").innerHTML = "🤙🏼";
        }
        if(results[0].label = "rock")
        {
            document.getElementById("update_emoji").innerHTML = "🤟🏼";
        }
        if(results[0].label = "gun")
        {
            document.getElementById("update_emoji").innerHTML = "👉🏼";
        }
    }
}