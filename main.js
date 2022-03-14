song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0; 
rightWristX = 0;
righttWristY = 0;
scoreLeftWrist = 0;
song1_status = "";
song2_status = "";


function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("PoseNet Is Initialized");
}
function draw() {
    image(video, 0, 0, 600, 500);

    song1_status = song.isPlaying();
    song2_status = song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY,20);
    song.stop();
    if(song1_status == false) {
        song2.play();
        document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
    }
    }
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX+" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX+" rightWristY = "+ rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);    
    }
}