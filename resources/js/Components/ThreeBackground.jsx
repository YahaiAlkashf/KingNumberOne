import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// بديل لـ SimplexNoise يعمل مع الإصدارات الحديثة
class SimpleNoise {
    constructor() {
        this.grad3 = [
            [1,1,0], [-1,1,0], [1,-1,0], [-1,-1,0],
            [1,0,1], [-1,0,1], [1,0,-1], [-1,0,-1],
            [0,1,1], [0,-1,1], [0,1,-1], [0,-1,-1]
        ];
        this.p = [];
        for (let i = 0; i < 256; i++) {
            this.p[i] = Math.floor(Math.random() * 256);
        }
        this.perm = new Array(512);
        for (let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
        }
    }

    dot(g, x, y, z) {
        return g[0]*x + g[1]*y + g[2]*z;
    }

    mix(a, b, t) {
        return (1.0-t)*a + t*b;
    }

    fade(t) {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
    }

    noise3D(xin, yin, zin) {
        let n0, n1, n2, n3;
        const F3 = 1.0/3.0;
        const G3 = 1.0/6.0;

        let s = (xin+yin+zin)*F3;
        let i = Math.floor(xin+s);
        let j = Math.floor(yin+s);
        let k = Math.floor(zin+s);
        let t = (i+j+k)*G3;
        let X0 = i-t;
        let Y0 = j-t;
        let Z0 = k-t;
        let x0 = xin-X0;
        let y0 = yin-Y0;
        let z0 = zin-Z0;

        let i1, j1, k1;
        let i2, j2, k2;

        if(x0>=y0) {
            if(y0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
            else if(x0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
            else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
        } else {
            if(y0<z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
            else if(x0<z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
            else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
        }

        let x1 = x0 - i1 + G3;
        let y1 = y0 - j1 + G3;
        let z1 = z0 - k1 + G3;
        let x2 = x0 - i2 + 2.0*G3;
        let y2 = y0 - j2 + 2.0*G3;
        let z2 = z0 - k2 + 2.0*G3;
        let x3 = x0 - 1.0 + 3.0*G3;
        let y3 = y0 - 1.0 + 3.0*G3;
        let z3 = z0 - 1.0 + 3.0*G3;

        let ii = i & 255;
        let jj = j & 255;
        let kk = k & 255;

        let gi0 = this.perm[ii+this.perm[jj+this.perm[kk]]] % 12;
        let gi1 = this.perm[ii+i1+this.perm[jj+j1+this.perm[kk+k1]]] % 12;
        let gi2 = this.perm[ii+i2+this.perm[jj+j2+this.perm[kk+k2]]] % 12;
        let gi3 = this.perm[ii+1+this.perm[jj+1+this.perm[kk+1]]] % 12;

        let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
        if(t0<0) n0 = 0.0;
        else {
            t0 *= t0;
            n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0);
        }

        let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
        if(t1<0) n1 = 0.0;
        else {
            t1 *= t1;
            n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1);
        }

        let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
        if(t2<0) n2 = 0.0;
        else {
            t2 *= t2;
            n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2);
        }

        let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
        if(t3<0) n3 = 0.0;
        else {
            t3 *= t3;
            n3 = t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3);
        }

        return 32.0*(n0+n1+n2+n3);
    }
}

const ThreeBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        let renderer,
            scene,
            camera,
            sphereBg,
            nucleus,
            stars,
            controls,
            timeout_Debounce,
            noise = new SimpleNoise(), // استخدام البديل
            cameraSpeed = 0,
            blobScale = 3;

        // المتغيرات للنجوم المتحركة
        let starsVelocities, starsStarts;

        const init = () => {
            // إنشاء container
            const container = document.createElement('div');
            container.id = 'canvas_container';
            container.style.width = '100%';
            container.style.height = '100%';
            mountRef.current.appendChild(container);

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.01, 1000);
            camera.position.set(0, 0, 230);

            const directionalLight = new THREE.DirectionalLight('#fff', 2);
            directionalLight.position.set(0, 50, -20);
            scene.add(directionalLight);

            let ambientLight = new THREE.AmbientLight("#ffffff", 1);
            ambientLight.position.set(0, 20, 20);
            scene.add(ambientLight);

            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // Orbit Controls
            controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true;
            controls.autoRotateSpeed = 4;
            controls.maxDistance = 350;
            controls.minDistance = 150;
            controls.enablePan = false;

            const loader = new THREE.TextureLoader();

            // استخدام الصور من المجلد public
            const textureSphereBg = loader.load('/images/back.jpg');
            const texturenucleus = loader.load('/images/1.jpg');
            const textureStar = loader.load('/images/2.png');
            const texture1 = loader.load('/images/3.png');
            const texture2 = loader.load('/images/4.png');
            const texture3 = loader.load('/images/5.png');

            /* Nucleus */
            texturenucleus.anisotropy = 16;
            let icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
            let phongMaterial = new THREE.MeshPhongMaterial({
                map: texturenucleus
            });
            nucleus = new THREE.Mesh(icosahedronGeometry, phongMaterial);
            scene.add(nucleus);

            /* Sphere background */
            textureSphereBg.anisotropy = 16;
            let geometrySphereBg = new THREE.SphereGeometry(150, 40, 40);
            let materialSphereBg = new THREE.MeshBasicMaterial({
                side: THREE.BackSide,
                map: textureSphereBg
            });
            sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
            scene.add(sphereBg);

            /* moving stars */
            let starsGeometry = new THREE.BufferGeometry();
            const starCount = 50;
            const positions = new Float32Array(starCount * 3);
            starsVelocities = new Float32Array(starCount);
            starsStarts = new Float32Array(starCount * 3);

            for (let i = 0; i < starCount; i++) {
                const particleStar = randomPointSphere(150);
                positions[i * 3] = particleStar.x;
                positions[i * 3 + 1] = particleStar.y;
                positions[i * 3 + 2] = particleStar.z;

                starsVelocities[i] = THREE.MathUtils.randInt(50, 200);

                starsStarts[i * 3] = particleStar.x;
                starsStarts[i * 3 + 1] = particleStar.y;
                starsStarts[i * 3 + 2] = particleStar.z;
            }

            starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            let starsMaterial = new THREE.PointsMaterial({
                size: 5,
                color: '#ffffff',
                transparent: true,
                opacity: 0.8,
                map: textureStar,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            stars = new THREE.Points(starsGeometry, starsMaterial);
            scene.add(stars);

            // Fixed Stars
            function createStars(texture, size, total) {
                const geometry = new THREE.BufferGeometry();
                const positions = new Float32Array(total * 3);

                for (let i = 0; i < total; i++) {
                    const radius = THREE.MathUtils.randInt(70, 149);
                    const particle = randomPointSphere(radius);
                    positions[i * 3] = particle.x;
                    positions[i * 3 + 1] = particle.y;
                    positions[i * 3 + 2] = particle.z;
                }

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

                const material = new THREE.PointsMaterial({
                    size: size,
                    map: texture,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                });

                return new THREE.Points(geometry, material);
            }

            scene.add(createStars(texture1, 15, 20));
            scene.add(createStars(texture2, 5, 5));
            scene.add(createStars(texture3, 7, 5));

            function randomPointSphere(radius) {
                const theta = 2 * Math.PI * Math.random();
                const phi = Math.acos(2 * Math.random() - 1);
                const dx = 0 + (radius * Math.sin(phi) * Math.cos(theta));
                const dy = 0 + (radius * Math.sin(phi) * Math.sin(theta));
                const dz = 0 + (radius * Math.cos(phi));
                return new THREE.Vector3(dx, dy, dz);
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);

            // Stars animation
            if (stars && stars.geometry.attributes.position) {
                const positions = stars.geometry.attributes.position.array;

                for (let i = 0; i < positions.length / 3; i++) {
                    const idx = i * 3;
                    let vx = positions[idx];
                    let vy = positions[idx + 1];
                    let vz = positions[idx + 2];

                    vx += (0 - vx) / starsVelocities[i];
                    vy += (0 - vy) / starsVelocities[i];
                    vz += (0 - vz) / starsVelocities[i];

                    starsVelocities[i] -= 0.3;

                    if (Math.abs(vx) <= 5 && Math.abs(vz) <= 5) {
                        vx = starsStarts[idx];
                        vy = starsStarts[idx + 1];
                        vz = starsStarts[idx + 2];
                        starsVelocities[i] = THREE.MathUtils.randInt(50, 300);
                    }

                    positions[idx] = vx;
                    positions[idx + 1] = vy;
                    positions[idx + 2] = vz;
                }

                stars.geometry.attributes.position.needsUpdate = true;
            }

            // Nucleus Animation - تأثير الـ blob الأصلي
            if (nucleus) {
                const time = Date.now();
                const positionAttribute = nucleus.geometry.getAttribute('position');

                // تخزين المواقع الأصلية
                if (!nucleus.userData.originalPositions) {
                    const originalPositions = [];
                    for (let i = 0; i < positionAttribute.count; i++) {
                        const vertex = new THREE.Vector3();
                        vertex.fromBufferAttribute(positionAttribute, i);
                        originalPositions.push(vertex.clone());
                    }
                    nucleus.userData.originalPositions = originalPositions;
                }

                for (let i = 0; i < positionAttribute.count; i++) {
                    const original = nucleus.userData.originalPositions[i];
                    const v = original.clone();
                    v.normalize();

                    let distance = 30 + noise.noise3D(
                        v.x + time * 0.0005,
                        v.y + time * 0.0003,
                        v.z + time * 0.0008
                    ) * blobScale;

                    v.multiplyScalar(distance);
                    positionAttribute.setXYZ(i, v.x, v.y, v.z);
                }

                positionAttribute.needsUpdate = true;
                nucleus.geometry.computeVertexNormals();
                nucleus.rotation.y += 0.002;
            }

            /* Sphere background Animation */
            if (sphereBg) {
                sphereBg.rotation.x += 0.002;
                sphereBg.rotation.y += 0.002;
                sphereBg.rotation.z += 0.002;
            }

            controls.update();
            renderer.render(scene, camera);
        };

        const onWindowResize = () => {
            const container = mountRef.current.querySelector('#canvas_container');
            if (container && camera && renderer) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        };

        const handleResize = () => {
            clearTimeout(timeout_Debounce);
            timeout_Debounce = setTimeout(onWindowResize, 80);
        };

        init();
        animate();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeout_Debounce);

            if (mountRef.current) {
                mountRef.current.innerHTML = '';
            }

            if (renderer) {
                renderer.dispose();
            }
        };
    }, []);

    return (
        <>
        <div className="background-fixed"></div>
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}
        />
        </>
    );
};

export default ThreeBackground;
