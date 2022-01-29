var PLAY = 1
var INTRO = 2
var END = 0
var gameState = INTRO

var score;

var boy, boyImg
var tornado, tornadoImg, tornado_end, tornado_endImg
var obstaclesGroup, obstacles, obstacle1, obstacle2, obstacle3
var invisible_ground

var neighborhood, neighborhoodImg

var restart,restartImg
var gameover, game_overImg



function preload() {
    boyImg = loadImage("boy.png")
    tornadoImg = loadImage("tornado.png")
    tornado_endImg = loadImage("tornado_end.png")

    obstacle1 = loadImage("obstacle1.png")

    neighborhoodImg = loadImage("neighborhood.png")

    restartImg = loadImage("restart.png")
    game_overImg = loadImage("gameover.png")
}

   

function setup() {
    createCanvas(1000, 600)

    neighborhood = createSprite(windowWidth, windowHeight)
    neighborhood.addImage("neighborhood", neighborhoodImg)

    boy = createSprite(500,560,30,50)
    boy.addImage("boy", boyImg)
    boy.scale = 0.4
    boy.visible = false 

    tornado = createSprite(100,380,100,400)
    tornado.addImage("tornado", tornadoImg)
    tornado.scale = 0.6
    tornado.visible = false

    tornado_end = createSprite(150,400,100,400)
    tornado_end.addImage("tornado_end", tornado_endImg)
    tornado_end.scale = 0.8
    

    invisible_ground = createSprite(500,590,1000,10) 
    invisible_ground.visible = false

    restart = createSprite(500,400,50,50)
    restart.addImage("restart",restartImg)
    restart.scale = 0.05
    

    gameover = createSprite(500,300,50,50)
    gameover.addImage("gameover",game_overImg)
    gameover.scale = 0.3
    gameover.visible = false

    score = 0

    tornado.setCollider("rectangle",0,0,290,600)
    boy.setCollider("rectangle",0,0,100,100)

    obstaclesGroup = createGroup()
    
    obstaclesGroup.debug = true
}

function draw() {
    background(neighborhoodImg)

    gameover.visible = false
    restart.visible = false
    tornado_end.visible = false

    if(gameState === INTRO) {
        background("black")
        
        text("A tornado is running rampage in your neighborhood. You must go find safe shelter and dodge obstacles on the way. ", 200,300)
        text("Press the space bar to begin", 425,350)
        text("Use the arrow keys to move the character", 390,400)

        if(keyDown("space")) {
            gameState = PLAY;
        }
        
    }

    if(gameState === PLAY) {
        text("Score: " + score, 900,100)
        score = score + Math.round(getFrameRate()/60);
        

        gameover.visible = false
        restart.visible = false
        tornado_end.visible = false
        tornado.visible = true
        boy.visible = true

        boy.velocityX = -3
        neighborhood.velocityX = - 3
        
        if(keyDown("up")&& boy.y == 565) {
            boy.velocityY = -15
        }

        if(keyDown("right")) {
            boy.velocityX = 4
        }
        if(boy.isTouching(tornado)) {
            gameState = END;
        }
        if(obstaclesGroup.isTouching(boy)) {
            gameState = END
        }

        
        spawnObstacles();
    }
    else if(gameState === END) {
        boy.destroy()
        tornado.visible = false
        restart.visible = true
        gameover.visible = true
        tornado_end.visible = true
        if(mousePressedOver(restart)) {
            reset()   
        }
        
        obstaclesGroup.destroyEach()
    }
    boy.velocityY = boy.velocityY + 0.8
    boy.collide(invisible_ground)

    
    
    console.log(boy.y)
    drawSprites()
}

function spawnObstacles() {
    if(frameCount%80 === 0) {
         obstacles = createSprite(990,570,30,40)
         obstacles.addImage("obstacle1",obstacle1)
         obstacles.velocityX = -(4)
        
         
         obstacles.scale = 0.1
 
         obstacles.lifetime = 200
         obstaclesGroup.add(obstacles)
    }
    
 }

 function reset() {
    gameState = PLAY
    boy = createSprite(500,560,30,50)
    boy.addImage("boy", boyImg)
    boy.scale = 0.4
    obstaclesGroup.destroyEach()
    score = 0
 }