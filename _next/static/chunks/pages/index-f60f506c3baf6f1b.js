(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(5718)}])},5718:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return d}});var l=a(5893),n=a(7294);let c=()=>{let[e,t]=(0,n.useState)(9),a=e=>{let t=[];for(let a=0;a<e;a++){let a=[];for(let t=0;t<e;t++)a.push(0);t.push(a)}return t},[l,c]=(0,n.useState)(a(e));(0,n.useEffect)(()=>{c(a(e))},[e]);let o=e=>{e%2==0&&e++,t(e)},s=JSON.parse(JSON.stringify(l)),r=e=>{for(let t=0;t<9;t++)for(let a=0;a<9;a++)e(t,a)};return{maze:l,setMaze:c,directions:[[-1,0],[0,1],[1,0],[0,-1]],newMaze:s,iterateBoard:r,handleMazeSizeChange:o,mazeSize:e}},o=0,s=0,r=()=>{let{maze:e,setMaze:t,directions:a,newMaze:l,iterateBoard:r}=c(),i=(t,n)=>{if(t%2==1&&n%2==1){let c=a[Math.floor(Math.random()*a.length)];void 0!==e[t+c[0]]&&void 0!==e[n+c[1]]&&(l[t+c[0]][n+c[1]]=2,l[t][n]=1)}},u=(e,a)=>{2===l[e][a]&&(l[e][a]=1,t(l))},_=(e,a)=>{l[e][a]=0,t(l)},d=()=>{r(_),r(i),l[0][0]=3,l[8][8]=6,r(u),b(1),o=0,s=0},[h,b]=(0,n.useState)(0),[k,x]=(0,n.useState)(!1),[f,p]=(0,n.useState)(0),v=a[h%4],C=a[(h+1)%4],g=(0,n.useCallback)((t,a)=>void 0!==e[t+v[0]]&&void 0!==e[a+v[1]],[e,v]),N=(0,n.useCallback)((t,a)=>g(t,a)&&(0===e[t+v[0]][a+v[1]]||6===e[t+v[0]][a+v[1]]),[g,e,v]),m=(0,n.useCallback)((e,a)=>{l[e][a]=4,l[e+v[0]][a+v[1]]=3,t(l),p(1)},[l,v,t]),j=(0,n.useCallback)((e,a)=>{l[e][a]=5,l[e+v[0]][a+v[1]]=3,t(l),p(1)},[l,v,t]),w=(0,n.useCallback)(()=>{3===h?b(0):b(h+1)},[h]),E=(0,n.useCallback)((t,a)=>void 0===e[t+C[0]][a+C[1]]||1===e[t+C[0]][a+C[1]]||4===e[t+C[0]][a+C[1]]||5===e[t+C[0]][a+C[1]],[e,C]),S=0,J=(0,n.useCallback)((e,t)=>{0===S&&(N(e,t)&&E(e,t)?m(e,t):w())},[S,N,E,m,w]),O=(0,n.useCallback)((t,a)=>void 0===e[t+C[0]][a+C[1]]||4===e[t+C[0]][a+C[1]]||5===e[t+C[0]][a+C[1]]||1===e[t+C[0]][a+C[1]],[e,C]),y=(0,n.useCallback)((t,a)=>{g(t,a)&&4===e[t+v[0]][a+v[1]]&&O(t,a)&&(j(t,a),S++)},[S,g,e,v,j,O]),X=(0,n.useCallback)((t,a)=>{N(t,a)?m(t,a):1===e[t+v[0]][a+v[1]]||void 0===e[t+v[0]][a+v[1]]?w():j(t,a)},[N,e,v,m,j,w]),D=(0,n.useCallback)((e,t)=>{h%4==1?X(e,t):(y(e,t),J(e,t))},[h,y,J,X]),I=(0,n.useCallback)((t,a)=>{0===f&&3===e[t][a]&&(8!==t?(y(t,a),J(t,a)):8===t&&D(t,a))},[e,y,J,D,f]),L=(0,n.useCallback)(()=>{0===o&&3===e[8][8]&&o++},[e]),M=()=>{x(!k),s=1};return{maze:e,onClick:d,onSearchClickkey:M,autoClick:k,goal:o,humanMove:I,Goal:L,setSearchCount:p,start:s,newMaze:l,setMaze:t,human:h}};var i=a(2729),u=a.n(i);let _=()=>{let{maze:e,onClick:t,onSearchClickkey:a,autoClick:o,goal:s,humanMove:i,Goal:_,setSearchCount:d,start:h,newMaze:b,setMaze:k,human:x}=r(),{iterateBoard:f,handleMazeSizeChange:p,mazeSize:v}=c();(0,n.useEffect)(()=>{if(o){let e=()=>{0===s&&1===h&&(f(i),d(0),f(_))},t=setInterval(()=>{e()},180);return()=>clearInterval(t)}},[o,i,_,s,f,d,h]);let[C,g]=(0,n.useState)(0);console.log("goal",s),console.log("start",h);let N=()=>{0===s&&(f(i),d(0),f(_))};3===e[8][8]&&(b[8][8]=7,k(b));let m=e=>"rotate".concat((e-1)*90);console.log(C);let j=()=>{for(let e=0;e<C;e++)N()};return console.table(e),(0,l.jsxs)("div",{className:u().container,children:[(0,l.jsx)("div",{className:u().board,children:e.map((e,t)=>e.map((e,a)=>{let n=1===e?u()["cell-black"]:6===e?u().goal:3===e?"".concat(u().pikachu," ").concat(u()[m(x)]):7===e?u().satoshipikachu:u()["cell-white"];return(0,l.jsx)("div",{className:n},"cell-".concat(t,"-").concat(a))}))}),(0,l.jsxs)("label",{children:["迷路のサイズ（奇数）:",(0,l.jsx)("input",{type:"number",value:v,onChange:e=>p(parseInt(e.target.value,10))})]}),(0,l.jsx)("button",{className:u().generation,onClick:t,children:"生成"}),(0,l.jsx)("button",{className:u().search,onClick:a,children:"探索"}),(0,l.jsx)("button",{className:u().select,onClick:j,children:"入力した〇手目を表示"}),(0,l.jsx)("input",{type:"number",value:C,onChange:e=>g(Number(e.target.value))})]})};var d=_},2729:function(e){e.exports={container:"index_container__gnN1f",board:"index_board__2d6xe","cell-white":"index_cell-white__uENqL","cell-black":"index_cell-black__d0AqM",goal:"index_goal__JD3y_",satoshipikachu:"index_satoshipikachu__E8fxD",pikachu:"index_pikachu__XK_Hx",generation:"index_generation__J_0HX",search:"index_search__DO3fa",select:"index_select__SNxK0",rotate0:"index_rotate0__a7G_l",rotate90:"index_rotate90__TJl8A",rotate180:"index_rotate180__uvL1U","rotate-90":"index_rotate-90__jo42L"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);