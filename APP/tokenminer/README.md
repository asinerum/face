# F.A.C.E Token Mining Tool on Android and iOS devices
  
A simple hybrid app made with Apache Cordova for F.A.C.E ecosystem
  
## Features
  
This mobile app is a clone of the web app living at  
[Token Miner](https://asinerum.github.io/face/dig)  
  
## Building
  
 1. Create new project using Cordova CLI tool;
 2. Add platforms (android/ios) to the new project as planned;
 3. Download entire folder */source* to overwrite Cordova project folder;
 4. Generate new app`s keystore and save it to the file named *app.keystore*;
 5. Edit building configuration files *build.json* and *config.xml* as needed;
 6. Build the app with or without building configurations
 ```ruby
 cordova build --release --buildConfig  
 cordova build --release  
 ```
  
(C)2021 ASINERUM PROJECT TEAM
