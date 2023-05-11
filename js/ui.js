var viewport = document.getElementById("viewport");
var diorama = document.getElementById("diorama");
var coach = document.getElementsByClassName("coach")[0];
var coachChain = document.getElementsByClassName("coach-chain")[0];
var counter = document.getElementsByClassName("counterweight")[0];
var counterChain = document.getElementsByClassName("counterweight-chain")[0];

var heaterWheel = document.getElementsByClassName("heater-wheel")[0];
var coachWheel = document.getElementsByClassName("coach-wheel")[0];
var coachSmallWheel = document.getElementsByClassName("coach-small-wheel")[0];
var chain1 = document.getElementById("elevator").getElementsByClassName("chain-1")[0];
var chain2 = document.getElementById("elevator").getElementsByClassName("chain-2")[0];
var steamRod = document.getElementById("elevator").getElementsByClassName("heater-steam-rod")[0];

var coachY = 220;
var floor = -1;
var moving = false;

var counterY = 926;

export default {
  
  init() {

    window.addEventListener('resize', this.resizeViewport);

    document.getElementById('floor-0').addEventListener('click', this.requestFloor.bind(this));
    document.getElementById('floor-E').addEventListener('click', this.requestFloor.bind(this));
    document.getElementById('floor-1').addEventListener('click', this.requestFloor.bind(this));
    document.getElementById('floor-2').addEventListener('click', this.requestFloor.bind(this));

    this.steamElevator();
    this.steamPump();

  },
  
  resizeViewport() {

    viewport.style.transform = 'scale(' + (window.innerHeight / 1080) + ') translateX(-50%)';

  },

  steamElevator: function() {
    window.setTimeout(() => {
      let steam = document.getElementById("elevator").getElementsByClassName("steam")[0];
      steam.style.animation = 'none';
      steam.offsetHeight; /* trigger reflow */
      steam.style.animation = null; 
      this.steamElevator();
    }, Math.floor(Math.random()*3000));
  },

  steamPump: function() {
    window.setTimeout(() => {
      let steam = document.getElementById("pump").getElementsByClassName("steam")[0];
      steam.style.animation = 'none';
      steam.offsetHeight; /* trigger reflow */
      steam.style.animation = null; 
      this.steamPump();
    }, Math.floor(Math.random()*3000));
  },

  addWalkingMiners() {

    let waitFactor = 2;
    let man = document.getElementsByClassName('man')[0];
    let waitCounter = 0;

    for (var i = 0; i < 100; i += 1) {

      waitCounter += Math.floor(Math.random() * 1500 * waitFactor) + 500 * waitFactor;

      window.setTimeout(() => {
        let manClone = man.cloneNode(true);
        diorama.appendChild(manClone);
        manClone.firstChild.style.height = (70 + Math.floor(Math.random() * 30)) + "px";
      }, waitCounter);
    }
  },

  requestFloor(e) {

    e.preventDefault();

    var requestedFloor = parseInt(e.target.closest('a').dataset.floor);
    
    if (!this.moving && requestedFloor !== floor) {
      this.go(requestedFloor);
    }

  },

  go(requestedFloor) {

    let targetY, tD;

    floor = requestedFloor;

    if (requestedFloor === -1) targetY = 220;
    if (requestedFloor === 0) targetY = 438;
    if (requestedFloor === 1) targetY = 684;
    if (requestedFloor === 2) targetY = 900;

    tD = (Math.abs(targetY - coachY) / 680) * 8000;

    counterY = counterY - (targetY - coachY);

    coach.style.transitionDuration = tD + 'ms';
    coach.style.top = targetY + 'px';

    coachChain.style.transitionDuration = tD + 'ms';
    coachChain.style.top = (targetY - 997) + 'px';
    
    counter.style.transitionDuration = tD + 'ms';
    counter.style.top = counterY + 'px';

    counterChain.style.transitionDuration = tD + 'ms';
    counterChain.style.top = (counterY - 770) + 'px';

    this.moving = true;

    if (targetY < coachY) {
      heaterWheel.style.animationDirection = 'reverse';
      coachWheel.style.animationDirection = 'reverse';
      coachSmallWheel.style.animationDirection = 'reverse';
      steamRod.style.animationDirection = 'reverse';
    } else {
      heaterWheel.style.animationDirection = 'normal';
      coachWheel.style.animationDirection = 'normal';
      coachSmallWheel.style.animationDirection = 'normal';
      steamRod.style.animationDirection = 'normal';
    }

    coachY = targetY;

    heaterWheel.style.animationPlayState = 'running';
    coachWheel.style.animationPlayState = 'running';
    coachSmallWheel.style.animationPlayState = 'running';
    chain1.style.animationPlayState = 'running';
    chain2.style.animationPlayState = 'running';
    steamRod.style.animationPlayState = 'running';

    window.setTimeout(() => {
      heaterWheel.style.animationPlayState = 'paused';
      coachWheel.style.animationPlayState = 'paused';
      coachSmallWheel.style.animationPlayState = 'paused';
      chain1.style.animationPlayState = 'paused';
      chain2.style.animationPlayState = 'paused';  
      steamRod.style.animationPlayState = 'paused';
      this.moving = false;
    }, tD);

  }
}

