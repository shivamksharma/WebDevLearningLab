class Experience {
  constructor( container, width, height ) {
    console.clear()
    
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(0, 0);
    this._pos = {
      x: 0
    };

    this.camera = new THREE.PerspectiveCamera(70, width / height, 1, 3000);
    this.camera.position.z = 200;
    
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xffffff, 0.0);
    this.renderer.setPixelRatio(1.6);
    container.appendChild( this.renderer.domElement )
    
    const fps = 120
    this.fpsInterval = 1000 / fps
    this.then = Date.now()
    
    this.scene = new THREE.Scene()
    
    this.resize()
    this.bind()
    this.loop()
    
    this._addLights()
    this._addMeshes()
  }
  
  _addLights() {
    var light = new THREE.AmbientLight(0x0);
    this.scene.add(light);

    var spotLight = new THREE.SpotLight(0xf2056f, 0.68, 0);
    spotLight.position.set(150, 150, 0);
    this.scene.add(spotLight);

    var hemlight = new THREE.HemisphereLight(0xd8c7f3, 0x61dafb, 1);
    this.scene.add(hemlight);
  }
  
  _addMeshes(){
    var _prefix = 'https://robindelaporte.fr/codepen/play/'
    var urls = [
      _prefix + "nx.jpg",
      _prefix + "ny.jpg",
      _prefix + "nz.jpg",
      _prefix + "px.jpg",
      _prefix + "py.jpg",
      _prefix + "pz.jpg"
    ];

    var cubemap = THREE.ImageUtils.loadTextureCube(urls);
    cubemap.format = THREE.RGBFormat;

    var geometry = new THREE.SphereGeometry(24, 32, 32);
    var material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      reflectivity: 0.56,
      envMap: cubemap
    });

    this._sphere = new THREE.Mesh(geometry, material);
    this._sphere.position.y = -30;
    this._sphere.position.x = -25;
    this.scene.add(this._sphere);

    var geometryTorus = new THREE.TorusBufferGeometry(16, 8, 16, 100);
    this._torus = new THREE.Mesh(geometryTorus, material);
    this._torus.position.y = 30;
    this._torus.position.x = 30;
    this._torus.rotation.x = 2.3;
    this._torus.rotation.y = 0.3;
    this.scene.add(this._torus);

    var geometryCone = new THREE.ConeBufferGeometry(8, 16, 32);
    this._cone = new THREE.Mesh(geometryCone, material);
    this._cone.position.y = 12;
    this._cone.position.x = -50;
    this._cone.position.z = 3;
    this._cone.rotation.x = -0.3;
    this._cone.rotation.z = 0.7;
    this.scene.add(this._cone);

    this._torus.material.opacity = 0;
  }
  
  animateIn() {
    TweenMax.to(this._torus.material, 0.6, { opacity: 1 });

    TweenMax.fromTo(
      this._torus.scale,
      0.6,
      { x: 0.8, y: 0.8, z: 0.8 },
      { x: 1.35, y: 1.35, z: 1.35 }
    );
    TweenMax.fromTo(
      this._torus.position,
      0.6,
      { x: 10, y: 20 },
      { x: 30, y: 40 }
    );

    TweenMax.fromTo(
      this._torus.rotation,
      0.6,
      { x: 2.0, y: -0.3 },
      { x: 2.3, y: 0.3 }
    );

    TweenMax.fromTo(
      this._sphere.scale,
      0.6,
      { x: 0.8, y: 0.8, z: 0.8 },
      { x: 1.15, y: 1.15, z: 1.15 }
    );
    TweenMax.fromTo(
      this._sphere.position,
      0.6,
      { x: -10, y: -10 },
      { x: -30, y: -40 }
    );

    TweenMax.fromTo(
      this._cone.scale,
      0.6,
      { x: 0.8, y: 0.8, z: 0.8 },
      { x: 1.35, y: 1.35, z: 1.35 }
    );
    TweenMax.fromTo(
      this._cone.position,
      0.6,
      { x: -30, y: 2, z: 3 },
      { x: -70, y: 12, z: 3 }
    );

    TweenMax.fromTo(
      this._cone.rotation,
      0.6,
      { x: -0.2, z: 0.0 },
      { x: -0.3, z: 0.7 }
    );
  }

  animateOut() {
    TweenMax.to(this._torus.material, 0.6, { opacity: 0 });

    TweenMax.to(this._torus.scale, 0.6, { x: 0.8, y: 0.8, z: 0.8 });
    TweenMax.to(this._torus.position, 0.6, { x: 10, y: 20 });
    TweenMax.to(this._torus.rotation, 0.6, { x: 2.0, y: -0.3 });

    TweenMax.to(this._sphere.scale, 0.6, { x: 0.8, y: 0.8, z: 0.8 });
    TweenMax.to(this._sphere.position, 0.6, { x: -10, y: -10 });

    TweenMax.to(this._cone.scale, 0.6, { x: 0.8, y: 0.8, z: 0.8 });
    TweenMax.to(this._cone.position, 0.6, { x: -30, y: 2, z: 3 });
    TweenMax.to(this._cone.rotation, 0.6, { x: -0.2, z: 0.0 });
  }
  
  bind() {
    window.addEventListener( 'resize', this.resize.bind( this ), false )
    document.body.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    
    document.querySelector("a").addEventListener("mouseenter", () => {
      TweenMax.to(".ok", 0.6, { scale: 1.35 });
      this.animateIn();
    });

    document.querySelector("a").addEventListener("mouseleave", () => {
      TweenMax.to(".ok", 0.6, { scale: 1.0 });
      this.animateOut();
    });
    
  }
  
  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  
  loop() {
    this.raf = window.requestAnimationFrame( this.loop.bind( this ) )

    const now = Date.now()
    const delta = now - this.then

    if( delta > this.fpsInterval ) {
      // this.scene.update()
      this.camera.position.x += this.mouse.x *(window.innerWidth * 0.02) - this.camera.position.x * 0.03;
    this.camera.position.y +=
      -(this.mouse.y * (window.innerHeight * 0.02)) - this.camera.position.y * 0.03;
    this.camera.lookAt(this.scene.position);
      
      this.renderer.render( this.scene, this.camera )
      this.then = now
    }
  }
  
  resize() {
//     this.innerWidth = window.innerWidth
//     this.innerHeight = window.innerHeight

//     this.camera.aspect = this.innerWidth / this.innerHeight
//     this.camera.updateProjectionMatrix()

//     this.renderer.setSize( this.innerWidth, this.innerHeight )
  }
}

const container = document.querySelector( '.home' )
let experience = new Experience( container, 400, 300 )