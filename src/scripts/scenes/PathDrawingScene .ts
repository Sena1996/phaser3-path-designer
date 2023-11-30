import Phaser from 'phaser';

export default class PathDrawingScene extends Phaser.Scene {
    constructor() {
        super(
            {
                key: 'PathDrawingScene'
            })
    }

    preload() {
        this.load.spine(
            'firefly',
            './assets/samplesceneassets/Firefly/firefly.json',
            './assets/samplesceneassets/Firefly/firefly.atlas',
          );    
        this.load.spine(
            'beetle',
            './assets/samplesceneassets/beetle/beetle-updated.json',
            './assets/samplesceneassets/beetle/beetle-updated.atlas',
           );    
        
        this.load.spine(
            'mouth',
            './assets/samplesceneassets/moth/moth.json',
            './assets/samplesceneassets/moth/moth.atlas',
          );

        this.load.image(
            'ball',
            './assets/samplesceneassets/shinyball.png'
        );

        this.load.image(
            'backbutton',
            './assets/samplesceneassets/backbutton.png'
        );

        this.load.spritesheet(
            'dragcircle',
            './assets/samplesceneassets/dragcircle.png',
            { frameWidth: 16 }
        );

        this.load.image(
            'saveIcon',
            './assets/samplesceneassets/saveButton.png'
        );
 
 
 
        this.load.image(
            'BackgroundImage1',
            './assets/samplesceneassets/Background.png'
        );

        this.load.image(
            'dragArea',
            './assets/samplesceneassets/dragendArea.png'
        );

        this.load.image(
            'backButton',
            './assets/samplesceneassets/backbutton.png'
        );      
        
        this.load.image(
            'refreshPath',
            './assets/samplesceneassets/playbutton.png'
        );

        // this.load.atlas('ui', 'assets/tests/scenes/ui.png', 'assets/tests/scenes/ui.json');

    }

    private parts: any = 8;
    private path: any;
    private samplePath: any;
    private curve: any;
    private handles: any;
    private graphics: any;
    private graphics1: any;
    private ball: any;
    private bounds:any;
    private duration: any = 500;
    private setDuration:any;
    private ballContainer: any;
    private ball1: any;
    private stopMovement: boolean = false;
    private savePathButton: any;
    private pathTween: any;
    private line: any;
    private backbutton: any;


    private backgroundImage: any;
    private dragEndArea: any;

    private fireFlyPathToSave: any = {
        points: [],
        angles: []
    };

    private jsonData: any = {};

    create() {
        
        //: Controller UI

        const slider = this.add.container(this.sys.canvas.width-600, 130).setDepth(20);
        const bar = this.add.rectangle(0, 10, 500, 10, 0x9d9d9d).setOrigin(0,.5);
        const control = this.add.circle(0, 10, 16, 0xff00ff)

        slider.add([ bar, control ]);

        control.setInteractive({ draggable: true });

        control.on('drag', function (pointer, dragX, dragY) {

            control.x = Phaser.Math.Clamp(dragX, 0, 500);
             self.duration = control.x;
            console.log(control.x)

        });

        slider.setSize(400, 32);
 

    this.setDuration= this.add.text(this.sys.canvas.width-400,100,"Duration :").setDepth(90);
       
        
         
        var playPath = this.add.image(this.sys.canvas.width / 2+300, this.sys.canvas.height / 2, 'refreshPath').setDepth(3);
        playPath.setScale(0.1,0.1);
        playPath.setInteractive();

        playPath.on('pointerdown', ()=>{
            tween.stop();

            self.path.t = 0;

            tween = self.tweens.add({
                targets: [self.path],
                t: 1,
                ease: 'Linear',
                duration: self.duration * (self.curve.points.length + 1),
                repeat: 0,
                onUpdate() {
                     console.log("My Length = "+self.curve.points.length);
                    self.curve.getPoint(self.path.t, self.path.vec);
                    let currentAngle = self.ball.angle;
                    let angle = Phaser.Math.Angle.Between(self.ball.x, self.ball.y, self.path.vec.x, self.path.vec.y);
                    let differenceInAngle = (angle * (180 / Math.PI)) - currentAngle;
                    if (differenceInAngle < -180) {
                        differenceInAngle += 360;
                    }
                    else if (differenceInAngle > 180) {
                        differenceInAngle -= 360
                    }
                    let angleToRotate = (currentAngle + differenceInAngle) / (180 / Math.PI);
                    self.ball.setPosition(self.path.vec.x, self.path.vec.y);
                    self.ball.setRotation(angleToRotate);
                },
                // onComplete() {
                //     let currentAngle = self.ball.angle;
                //     let angle = Phaser.Math.Angle.Between(self.ball.x, self.ball.y, self.curve.points[0].x, self.curve.points[0].y);
                //     let differenceInAngle = (angle * (180 / Math.PI)) - currentAngle;
                //     console.log("Angle is :: ", angle, "difference : ", differenceInAngle, "current angle :: ", currentAngle);
                //     if (differenceInAngle < -180) {
                //         differenceInAngle += 360;
                //     }
                //     else if (differenceInAngle > 180) {
                //         differenceInAngle -= 360
                //     }
                //     self.tweens.add({
                //         targets: [self.ball],
                //         x: self.curve.points[0].x,
                //         y: self.curve.points[0].y,
                //         angle: currentAngle + differenceInAngle,
                //         duration: 3000,
                //         onComplete(){
                //             tween.restart();
                //         }
                //     })
                // }
            });
        })
        
      

 
        this.ball = this.add.spine(this.sys.canvas.width / 2, 300, 'firefly').setDepth(10).setInteractive({ draggable: true }).setScale(0.35);
        this.ball.play('animation2', true);
        this.ball.setAngle(90);
        let originalX = 0;
        let originalY = 0;
        this.graphics1 = this.add.graphics().setDepth(11);

        this.bounds = this.ball.getBounds();
        
        // this.ball.drawDebug = true;
        this.input.enableDebug(this.ball, 0xff00ff);

    

        this.backgroundImage = this.add.sprite(0, 0, 'BackgroundImage1').setOrigin(0, 0);

        this.backgroundImage.displayWidth = this.sys.canvas.width;
        this.backgroundImage.displayHeight = this.sys.canvas.height;

        this.dragEndArea = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'dragArea').setDepth(1);
        this.dragEndArea.scaleX = 1.75;
        this.dragEndArea.scaleY = 1.5;


     
        this.line = new Phaser.Geom.Line(900, 400, 700, 300);

 

        this.savePathButton = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'saveIcon').setDepth(2.5);
        this.savePathButton.setInteractive();
        this.savePathButton.setScale(0.1);
        var tweens;
        this.savePathButton.on('pointerdown', function () {
            console.log("Save Button Was Clicked");
            console.log(tween);
            self.pathTween = { t: 0, vec: new Phaser.Math.Vector2() };
            self.pathTween.t = 0;
            let initialX = self.curve.points[0].x;
            let initialY = self.curve.points[0].y;

            var tweenSave = self.tweens.add({
                targets: [self.pathTween],
                t: 1,
                onUpdate() {
                    self.curve.getPoint(self.pathTween.t, self.pathTween.vec);
                    console.log("The point is :: ", self.pathTween.vec);
                    var angle = Phaser.Math.Angle.Between(initialX, initialY, self.pathTween.vec.x, self.pathTween.vec.y);
                    console.log("Angle is :: ", angle);
                    self.fireFlyPathToSave.points.push({ x: self.pathTween.vec.x, y: self.pathTween.vec.y });
                    self.fireFlyPathToSave.angles.push(angle * (180.0 / Math.PI));
                    initialX = self.pathTween.vec.x;
                    initialY = self.pathTween.vec.y;
                    self.jsonData = JSON.stringify(self.fireFlyPathToSave);

                    console.log("Json data : ", self.jsonData);
                },
                onComplete() {
                    // TODO :: Saving Logic, write data to the json file and read the data from the json file and apply movement
                    // to the firefly.
                    // TOCheck :: Drag and Drop functionality in the firefly which is being rotated at the movement.
                    // TOCheck :: Pause the timeline of the firefly on drag.

                    var data = JSON.parse(self.jsonData);
                    let currentAngle = (data.angles.length > 0) ? data.angles[0] : 0;

                    // var tweenTimeline = self.tweens.createTimeline();

                    for (let i = 0; i < data.points.length; i++) {
                        let differenceInAngle = data.angles[i] - currentAngle;

                        if (differenceInAngle < -180) {
                            differenceInAngle += 360;
                        }
                        else if (differenceInAngle > 180) {
                            differenceInAngle -= 360
                        }

                        const blob = new Blob([self.jsonData], { type: 'application/json' });

                        // Create a download link
                        const downloadLink = document.createElement('a');
                        downloadLink.href = URL.createObjectURL(blob);
                        downloadLink.download = 'pathExporter.json';

                        // Append the link to the body
                        document.body.appendChild(downloadLink);

                        // Trigger a click on the link to start the download
                        downloadLink.click();

                        // Remove the link from the DOM
                        document.body.removeChild(downloadLink);

                        // tweenTimeline.add({
                        //     targets: self.ball,
                        //     x: data.points[i].x,
                        //     y: data.points[i].y,
                        //     angle: currentAngle + differenceInAngle,
                        //     duration: 100,

                        // });
                        currentAngle = data.angles[i];
                    }
                    // tweenTimeline.play();
                    // console.log("cache size ::"+ Phaser.Cache.CacheManager);

                }
            });
        });

        this.savePathButton.on('pointerup', () => {
            console.log("Pointer Up");
            console.log(this.cache)

        });

        var self = this;
 

        this.handles = this.add.group();


        this.path = { t: 0, vec: new Phaser.Math.Vector2(this.sys.canvas.width / 2, 300) };

        this.curve = new Phaser.Curves.Spline([new Phaser.Math.Vector2(this.sys.canvas.width / 2, 300)]);
        //this.curve.addPoint();

        var tween = this.tweens.add({
            targets: this.path,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 10000,
            repeat: -1
        });

        var createPointHandle = function (point: { x: any; y: any; }) {
            var handle = self.handles.create(point.x, point.y, 'dragcircle', 0).setInteractive();
            handle.setData('vector', point);
            self.input.setDraggable(handle);
        };

        createPointHandle(this.curve.points[0]);

        this.input.on('pointerdown', function (pointer: { x: any; y: any; }, gameObjects: string | any[]) {

            //  Check we didn't click an existing handle
            if (gameObjects.length > 0) {
                return;
            }

            var vec = self.curve.addPoint(pointer.x, pointer.y);

            createPointHandle(vec);

            self.parts += 8;
             

        });


 


        self.graphics = this.add.graphics();
    }

    handler(x: number, y: number) {
        this.add.image(x, y, 'ball');
    }

    loadScene(sceneKey: any) {
        this.scene.start(sceneKey)
    }


    update() {

         
        this.setDuration.setText("Duration ::"+ this.duration);
        // Phaser.Geom.Line.Rotate(this.line, 0.02);

        this.graphics.clear();
        // this.graphics.strokeLineShape(this.line);

        this.graphics.lineStyle(2, 0xffffff, 1);

        this.curve.draw(this.graphics, this.parts);
        
 
        this.graphics1.lineStyle(1, 0xff0000);
        this.graphics1.strokeRectShape(this.bounds);        
 
    }
}
/*

            var currentPointIndex = 0;
            var ball = this.ball;
             tweens = this.tweens.add({
                targets: ball,
                x: data.points[currentPointIndex].x,
                y: data.points[currentPointIndex].y,
                rotation: data.angles[currentPointIndex],
                ease: 'Linear',
                duration: 20000, // adjust this value to control animation speed
                onComplete: function() {
                    currentPointIndex++;
                    if (currentPointIndex >= data.points.length) {
                        currentPointIndex = 0;
                    }
            
                    tweens.updateTo({
                        x: data.points[currentPointIndex].x,
                        y: data.points[currentPointIndex].y,
                        rotation: data.angles[currentPointIndex]
                    });
                    tweens.restart();
                }
            });
*/