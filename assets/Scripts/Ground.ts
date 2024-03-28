import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node,
        tooltip: "Ground 1 is here"
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip: "Ground 2 is here"
    })
    public ground2: Node;

    @property({
        type: Node,
        tooltip: "Ground 3 is here"
    })
    public ground3: Node;

    //Create grounds with variables
    public groundWidth1: number;
    public groundWidth2: number;
    public groundWidth3: number;

    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;

    public gameCtrlSpeed = new GameCtrl;
    public gameSpeed: number;

    onLoad(){
        this.startUP();
    }

    startUP(){
        //get ground width
        this.groundWidth1 = this.ground1.getComponent(UITransform).width; 
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        //set temporary starting locations of ground
        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

        //update position to final starting locations
        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }

    update(deltaTime: number) {

        this.gameSpeed = this.gameCtrlSpeed.speed;

        //place real location data into temp locations
        this.tempStartLocation1 = this.ground1.position;
        this.tempStartLocation2 = this.ground2.position;
        this.tempStartLocation3 = this.ground3.position;
        
        //get speed and subtract location on x axis
        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation3.x -= this.gameSpeed * deltaTime;
        
        //get the canvas size prepared
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        //check if ground1 went out of bounds. If so, return to the end of the line.
        if (this.tempStartLocation1.x <= (0 - this.groundWidth1)) {
            this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
        }

        //same with ground2
        if (this.tempStartLocation2.x <= (0 - this.groundWidth2)) {
            this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
        }

        //same with ground3
        if (this.tempStartLocation3.x <= (0 - this.groundWidth3)) {
            this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
        }

        //place new locations back into ground nodes     
        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }
}


