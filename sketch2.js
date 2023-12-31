let currentTime = 0;

  function setup() {
    noCanvas();
    fillGlass();
    setInterval(moveFish, 100); // Move fish every 100 milliseconds
    setInterval(updateFish, 3600000); // Update fish count every hour
  }

  function fillGlass() {
    const glass = select('#glass');
    const water = select('#water');

    createFish(); // Create fish 
    createPebbles(); // Create pebbles 

    function updateWaterHeight() {
      const increment = window.innerHeight / 60; // Changed to 60 for 60 seconds in a minute
      currentTime = second(); // Use second() for seconds

      const newHeight = currentTime * increment;
      water.style('height', `${newHeight}px`);

      if (currentTime === 60) {
        setTimeout(() => {
          water.style('height', '0');
          setTimeout(() => {
            createFish(); // Create fish when water is empty
            createPebbles(); // Create pebbles when water is empty
            fillGlass();
          }, 1000);
        }, 1000);
      } else {
        setTimeout(updateWaterHeight, 1000);
      }
    }

    updateWaterHeight();
  }

  function createFish() {
    const glass = select('#glass');
    const currentHour = hour();

    // Remove existing fish
    selectAll('.fish').forEach(fish => fish.remove());

    // Create new fish based on the current hour
    for (let i = 0; i < currentHour; i++) {
      const fish = createDiv('');
      fish.class('fish');

      const fishBody = createDiv(''); //creates the fish body
      fishBody.class('fish-body');
      fish.child(fishBody);

      const fishTail = createDiv(''); //creates the fish tail
      fishTail.class('fish-tail');
      fish.child(fishTail);

      const fishEye = createDiv(''); //creates the fish eye
      fishEye.class('fish-eye');
      fishBody.child(fishEye);

      fish.position(random(10, window.innerWidth - 30), random(30, window.innerHeight - 30));
      glass.child(fish);
    }
  }

  function updateFish() {
    // Update fish count based on the current hour
    createFish();
  }

  function createPebbles() { 
    const glass = select('#glass');
    const currentMinutes = minute();

    // Remove existing pebbles
    selectAll('.pebble').forEach(pebble => pebble.remove());

    // Create new pebbles based on the current minutes
    for (let i = 0; i < currentMinutes; i++) {
      const pebble = createDiv('');
      pebble.class('pebble');

      pebble.position(random(10, window.innerWidth - 10), random(window.innerHeight - 20, window.innerHeight - 10));
      glass.child(pebble);
    }
  }

  function moveFish() {
    // Move fish around slowly
    selectAll('.fish').forEach(fish => {
      const currentX = parseFloat(fish.style('left'));
      const currentY = parseFloat(fish.style('top'));

      const deltaX = random(-1, 1);
      const deltaY = random(-1, 1);

      const newX = constrain(currentX + deltaX, 10, window.innerWidth - 30);
      const newY = constrain(currentY + deltaY, 30, window.innerHeight - 30);

      fish.style('left', `${newX}px`);
      fish.style('top', `${newY}px`);
    });
  }