function Wave() {
  this.ctx = null;
  this.waveImage = null;
  this.canvasWidth = null;
  this.canvasHeight = null;
  this.needAnimate = false;
  this.value = 0;
  this.vueCallback = null;
  this.imageType = '';
}
Wave.prototype.constructor = Wave
Wave.prototype.init = function(callback, id, n) {
  var wave = document.getElementById(id);
  var canvas = document.createElement('canvas');
  if (!canvas.getContext) return;
  this.ctx = canvas.getContext('2d');
  this.canvasWidth = wave.offsetWidth;
  this.canvasHeight = wave.offsetHeight;
  this.value = n;
  canvas.setAttribute('width', this.canvasWidth);
  canvas.setAttribute('height', this.canvasHeight);
  wave.appendChild(canvas);
  this.waveImage = new Image();
  var self = this
  this.waveImage.onload = function () {
      self.waveImage.onload = null;
      callback();
  }
  this.waveImage.src = this.imageType ? '/static/wave' + '-' + this.imageType + '.png' : 
    '/static/wave.png';
}
Wave.prototype.animate = function() {
  console.log('AA')
  var waveX = 0;
  var waveY = 0;
  var waveX_min = -203;
  var waveY_max = this.canvasHeight * (this.value || 0.5);
  var self = this;
  var requestAnimationFrame = 
      window.requestAnimationFrame || 
      window.mozRequestAnimationFrame || 
      window.webkitRequestAnimationFrame || 
      window.msRequestAnimationFrame ||
      function (callback) { window.setTimeout(callback, 1000 / 60); };
  function loop () {
      self.ctx.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
      if (!self.needAnimate) return;
      if (waveY < waveY_max) {
          waveY += 1;
          self.vueCallback(waveY)
      }
      if (waveX < waveX_min) waveX = 0; else waveX -= 3;
      
      self.ctx.globalCompositeOperation = 'source-over';
      self.ctx.beginPath();
      self.ctx.arc(self.canvasWidth/2, self.canvasHeight/2, self.canvasHeight/2, 0, Math.PI*2, true);
      self.ctx.closePath();
      self.ctx.fill();

      self.ctx.globalCompositeOperation = 'source-in';
      self.ctx.drawImage(self.waveImage, waveX, self.canvasHeight - waveY);

      
      requestAnimationFrame(loop);
  }
  loop();
}
Wave.prototype.start = function(id, n, imageType, cb) {
  var self = this
  if (!this.vueCallback) this.vueCallback = cb
  if (!this.imageType) this.imageType = imageType
  if (!this.ctx) return self.init(function(){ self.start(id, n) }, id, n);
  this.needAnimate = true;
  setTimeout(function () {
      if (self.needAnimate) self.animate();
  }, 10);
}

export default Wave;