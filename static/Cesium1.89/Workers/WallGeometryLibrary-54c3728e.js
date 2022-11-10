define(["exports","./arrayRemoveDuplicates-18786327","./Matrix2-a3269947","./when-4bbc8319","./ComponentDatatype-93750d1a","./PolylinePipeline-572b1866"],(function(e,i,t,r,n,a){"use strict";var o={};function l(e,i){return n.CesiumMath.equalsEpsilon(e.latitude,i.latitude,n.CesiumMath.EPSILON10)&&n.CesiumMath.equalsEpsilon(e.longitude,i.longitude,n.CesiumMath.EPSILON10)}var s=new t.Cartographic,h=new t.Cartographic;var g=new Array(2),p=new Array(2),u={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};o.computePositions=function(e,o,c,y,d,v){var m=function(e,n,a,o){var g=(n=i.arrayRemoveDuplicates(n,t.Cartesian3.equalsEpsilon)).length;if(!(g<2)){var p=r.defined(o),u=r.defined(a),c=new Array(g),y=new Array(g),d=new Array(g),v=n[0];c[0]=v;var m=e.cartesianToCartographic(v,s);u&&(m.height=a[0]),y[0]=m.height,d[0]=p?o[0]:0;for(var P=y[0]===d[0],f=1,A=1;A<g;++A){var C=n[A],w=e.cartesianToCartographic(C,h);u&&(w.height=a[A]),P=P&&0===w.height,l(m,w)?m.height<w.height&&(y[f-1]=w.height):(c[f]=C,y[f]=w.height,d[f]=p?o[A]:0,P=P&&y[f]===d[f],t.Cartographic.clone(w,m),++f)}if(!(P||f<2))return c.length=f,y.length=f,d.length=f,{positions:c,topHeights:y,bottomHeights:d}}}(e,o,c,y);if(r.defined(m)){o=m.positions,c=m.topHeights,y=m.bottomHeights;var P,f,A=o.length,C=A-2,w=n.CesiumMath.chordLength(d,e.maximumRadius),b=u;if(b.minDistance=w,b.ellipsoid=e,v){var M,E=0;for(M=0;M<A-1;M++)E+=a.PolylinePipeline.numberOfPoints(o[M],o[M+1],w)+1;P=new Float64Array(3*E),f=new Float64Array(3*E);var D=g,F=p;b.positions=D,b.height=F;var H=0;for(M=0;M<A-1;M++){D[0]=o[M],D[1]=o[M+1],F[0]=c[M],F[1]=c[M+1];var L=a.PolylinePipeline.generateArc(b);P.set(L,H),F[0]=y[M],F[1]=y[M+1],f.set(a.PolylinePipeline.generateArc(b),H),H+=L.length}}else b.positions=o,b.height=c,P=new Float64Array(a.PolylinePipeline.generateArc(b)),b.height=y,f=new Float64Array(a.PolylinePipeline.generateArc(b));return{bottomPositions:f,topPositions:P,numCorners:C}}},e.WallGeometryLibrary=o}));
