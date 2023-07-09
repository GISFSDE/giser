define(["./GeometryOffsetAttribute-1772960d","./Transforms-53e3607a","./Matrix2-a3269947","./RuntimeError-346a3079","./ComponentDatatype-93750d1a","./when-4bbc8319","./GeometryAttribute-f4cf259b","./GeometryAttributes-7827a6c2","./combine-83860057","./WebGLConstants-1c8239cc"],(function(e,t,a,n,i,r,u,m,o,s){"use strict";var f=new a.Cartesian3;function c(e){var t=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).minimum,n=e.maximum;this._min=a.Cartesian3.clone(t),this._max=a.Cartesian3.clone(n),this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxOutlineGeometry"}c.fromDimensions=function(e){var t=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).dimensions,n=a.Cartesian3.multiplyByScalar(t,.5,new a.Cartesian3);return new c({minimum:a.Cartesian3.negate(n,new a.Cartesian3),maximum:n,offsetAttribute:e.offsetAttribute})},c.fromAxisAlignedBoundingBox=function(e){return new c({minimum:e.minimum,maximum:e.maximum})},c.packedLength=2*a.Cartesian3.packedLength+1,c.pack=function(e,t,n){return n=r.defaultValue(n,0),a.Cartesian3.pack(e._min,t,n),a.Cartesian3.pack(e._max,t,n+a.Cartesian3.packedLength),t[n+2*a.Cartesian3.packedLength]=r.defaultValue(e._offsetAttribute,-1),t};var p=new a.Cartesian3,y=new a.Cartesian3,d={minimum:p,maximum:y,offsetAttribute:void 0};return c.unpack=function(e,t,n){t=r.defaultValue(t,0);var i=a.Cartesian3.unpack(e,t,p),u=a.Cartesian3.unpack(e,t+a.Cartesian3.packedLength,y),m=e[t+2*a.Cartesian3.packedLength];return r.defined(n)?(n._min=a.Cartesian3.clone(i,n._min),n._max=a.Cartesian3.clone(u,n._max),n._offsetAttribute=-1===m?void 0:m,n):(d.offsetAttribute=-1===m?void 0:m,new c(d))},c.createGeometry=function(n){var o=n._min,s=n._max;if(!a.Cartesian3.equals(o,s)){var c=new m.GeometryAttributes,p=new Uint16Array(24),y=new Float64Array(24);y[0]=o.x,y[1]=o.y,y[2]=o.z,y[3]=s.x,y[4]=o.y,y[5]=o.z,y[6]=s.x,y[7]=s.y,y[8]=o.z,y[9]=o.x,y[10]=s.y,y[11]=o.z,y[12]=o.x,y[13]=o.y,y[14]=s.z,y[15]=s.x,y[16]=o.y,y[17]=s.z,y[18]=s.x,y[19]=s.y,y[20]=s.z,y[21]=o.x,y[22]=s.y,y[23]=s.z,c.position=new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:y}),p[0]=4,p[1]=5,p[2]=5,p[3]=6,p[4]=6,p[5]=7,p[6]=7,p[7]=4,p[8]=0,p[9]=1,p[10]=1,p[11]=2,p[12]=2,p[13]=3,p[14]=3,p[15]=0,p[16]=0,p[17]=4,p[18]=1,p[19]=5,p[20]=2,p[21]=6,p[22]=3,p[23]=7;var d=a.Cartesian3.subtract(s,o,f),l=.5*a.Cartesian3.magnitude(d);if(r.defined(n._offsetAttribute)){var C=y.length,b=new Uint8Array(C/3),A=n._offsetAttribute===e.GeometryOffsetAttribute.NONE?0:1;e.arrayFill(b,A),c.applyOffset=new u.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:b})}return new u.Geometry({attributes:c,indices:p,primitiveType:u.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(a.Cartesian3.ZERO,l),offsetAttribute:n._offsetAttribute})}},function(e,t){return r.defined(t)&&(e=c.unpack(e,t)),c.createGeometry(e)}}));