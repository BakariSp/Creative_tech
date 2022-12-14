let vertShader = `
	precision highp float;

	attribute vec3 aPosition;

	void main() {
		vec4 positionVec4 = vec4(aPosition, 1.0);
		positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
		gl_Position = positionVec4;
	}
`;

let fragShader = `
	precision highp float;
	
	uniform vec2 	resolution;
	uniform int 	attractorCount;
	uniform vec2 	attractors[${MAX_ATTRACTOR_COUNT}];
	uniform float   attractorMass[${MAX_ATTRACTOR_COUNT}];
	uniform int 	particleCount;
	uniform float 	mult;

	uniform vec3 	particles[${MAX_FLOWPOINT_COUNT}];
	uniform float   particlesInterest[${MAX_FLOWPOINT_COUNT}];
	uniform vec3 	colors[${MAX_FLOWPOINT_COUNT}];

	void main() {
			vec2 st = gl_FragCoord.xy / resolution.xy;  // Warning! This is causing non-uniform scaling.

			float r = 0.0;
			float g = 0.0;
			float b = 0.0;

			for (int i = 0; i < ${MAX_ATTRACTOR_COUNT}; i++) {
				if (i < attractorCount) {
					vec2 attractorPos = attractors[i];
					// attractorPos.y *= (1920/1080);
					float value = attractorMass[i] * float(i) / distance(st, attractorPos.xy) * 0.001;  // Multiplier may need to be adjusted if max attractor count is tweaked.
					//r += value * 0.09;
					g += value * 0.5;
					b += value;
				}
			}

			// float mult = 0.00025;
			
			for (int i = 0; i < ${MAX_FLOWPOINT_COUNT}; i++) {
				if (i < particleCount) {
					vec3 particle = particles[i];
					vec2 pos = particle.xy;
					float mass = particle.z;
					vec3 color = colors[i];

					// r += color.r / distance(st, pos) * mult * particlesInterest[i] * 0.02;
					// g += color.g / distance(st, pos) * mult * particlesInterest[i] * 0.02;
					// b += color.b / distance(st, pos) * mult;

					// r = mult;
					g = mult;
					b = mult;
					
				}
			}

			// r = mult;
				g = mult;
				b = mult;

			gl_FragColor = vec4(r, g, b, 1.0);
	}
`;