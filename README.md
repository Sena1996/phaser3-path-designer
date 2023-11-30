# phaser3-path-designer
This is a beta project. Used technology Phaser3. Design the path following system. Future scope of these tool we can draw path in phaser3 scene and implement into the phaser, Unity and unreal-Engine.


![image](https://github.com/Sena1996/CustomPathDesigner/assets/32616992/36fb35c3-03f4-48e6-a7b9-dc41e307cd7a)# CustomPathDesigner

How To Use

To clone and run this template, you'll need Git and Node.js (which comes with npm) installed on your computer. From your command line:

# Clone this repository (yes, npx not npm)
$ npx gitget Sena1996/CustomPathDesigner

# Go into the repository
$ cd phaser-template

# Install dependencies
$ npm install

# Start the local development server (on port 8080)
$ npm start

# Ready for production?
# Build the production ready code to the /dist folder
$ npm run build

# Play your production ready game in the browser
$ npm run serve

**Information ::**


**Version :**
phaser : 3.52.0
spine : 3.8.99

**Problem Statement :**
     Firefly flying on screen. Drag the firefly into the drop-zone where net is present. Along with the firefly there are another insect like battle, they are not draggable. 
  
These is an game scenario. We have to implement in the phaser3 with spine animation tool.

when we animate the Bee in to the Spine tool we give animation to bees wings, gives some direction and fly into the our device resolution like 1080x1920. 

After the animating bee we observe that, The bounds of the bee its stays at the initiate position. It wont animate with the bee.


Due to we enable to interact with bee. For the interaction not satisfied the condition.
 
**Problem 1:**
      - As per the screen resolution 1080*1920 we animate all the insects asset into the spine.
      - After importing into the scene we observed animation is fine but there is issue with bounds of assets.
      - Bounds of the assets it keep fixed at position where they are add into the scene.
**Problem 2:**
      - Game Object interaction not working as per requirement.
      - Interaction is working on game object by clicking at the position where they are add into the scene.
     [Wrong behavior.]


Here, We come with the Solution :

In phaser there is concept called as Path. We take advantage of it and evaluate current scenario solution.
Understanding the requirement and the resource that we have. We build an small tool.
With the help of phaser path system and  Tween , JSON file.

       Interact with the flying object.
       Animate the bee with the ideal fly animation.
       Animation includes wings and eyes blinking motion.
       [Here is Bee animate at the place with ideal fly animation.]


We build an scene as shown in follow pic. Which contain control panel to adjust the speed and loop of the tween.

	- Added spine animated battle, some controller(Duration) save path and move the object along the path.
![image](https://github.com/Sena1996/CustomPathDesigner/assets/32616992/fe21abe1-09fe-4316-a6b1-cea5818e0d56)


Working Principle ::
- Add point on the screen which will reflect while adding by simply mouse click .
- After completing the path which also visible on scene. You click to play button game Object start follow the path.
- if you want to make any change do as per your requirement.
- After satisfied with the path just save that path into the JSON file.


**How To Use Tool :**
Get JSON file which are export by the above tool.
load the file using preload function. 

For the better understand here is the snapshot of the code so you can fetch the JSON data from file and using tween follow the path by object (insect).


    We write an logic based on our resource 
      - animated bee.
      - Path exported in JSON.

   Take a JSON file read the path from the file. And transform the animated bee on path (use above code snippet).

it gives the visualization bee is flying on the screen. And due to the path follower method we transform whole bee to the point->to->point. So there is no disturbances to interact with the object.

Finally we solve the problem. 


Here is an small demo to how use custom design path.
![image](https://github.com/Sena1996/CustomPathDesigner/assets/32616992/e2d29abf-79db-49f0-a635-a5536cc1cc48)


This is a beta project. Used technology Phaser3. Design the path following system. 
Feuture score of these tool we can draw path here and implement into the phaser, Unity and unreal-Engine.

