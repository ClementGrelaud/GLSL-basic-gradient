// example import asset
// import imgPath from './assets/img.jpg';

// TODO : add Dat.GUI
// TODO : add Stats

import vertexShader from './shader.vert';
import fragmentShader from './shader.frag';

export default class App {

    constructor() {

        this.container = document.querySelector( '#main' );
    	document.body.appendChild( this.container );

        this.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 10 );
        this.camera.position.z = 10;

    	this.scene = new THREE.Scene();

        // let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        // var geometry = new THREE.Geometry();
        // geometry.vertices.push(
        //     new THREE.Vector3( -0.5,  0, 0 ), // 0
        //     new THREE.Vector3( 0.5, 0, 0 ), // 1
        //     new THREE.Vector3(  0, 1, 0 ),  //2

        //     new THREE.Vector3( -1,  -1, 0 ), // 3
        //     new THREE.Vector3( 0, -1, 0 ), // 4
        //     new THREE.Vector3(  1, -1, 0 )  //5
           
        //     );
        //     geometry.faces.push( new THREE.Face3( 0, 1, 2 ), new THREE.Face3( 3, 4, 0 ), new THREE.Face3( 4, 5, 1 ) );

        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array( [
            -0.5,  0, 0,
            0.5, 0, 0,
            0, 1, 0,
            -1, -1, 0,
            0, -1, 0,
            1, -1, 0,
        ] );
        geometry.addAttribute('position', new THREE.BufferAttribute( vertices, 3 ) );
        var indices = new Uint32Array( [
            0, 1, 2, 3, 4, 0, 4, 5, 1
        ] );
         
        let material = new THREE.ShaderMaterial({
            uniforms:{
                vColor: { value: new THREE.Color(0x00ffff) },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
 
        let colors = new Float32Array([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
 
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
 
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ]);
 
        geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
 
        this.mesh = new THREE.Mesh( geometry, material );
        this.scene.add( this.mesh );

         geometry.setIndex(  new THREE.BufferAttribute( indices, 1 ) );

        //     var material = new THREE.ShaderMaterial( {
        //         vertexShader: vertexShader,
        //         fragmentShader: fragmentShader
        //     } );

        // this.mesh = new THREE.Mesh(geometry, material)
    	// this.scene.add( this.mesh );

    	this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    	this.renderer.setPixelRatio( window.devicePixelRatio );
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
    	this.container.appendChild( this.renderer.domElement );

    	window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();

        this.renderer.animate( this.render.bind(this) );
    }

    render() {

        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.02;

    	this.renderer.render( this.scene, this.camera );
    }

    onWindowResize() {

    	this.camera.aspect = window.innerWidth / window.innerHeight;
    	this.camera.updateProjectionMatrix();
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}
