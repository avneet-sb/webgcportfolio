/**
 * to add smooth scroll using locomotive
 * 1. go to locomotive scroll github
 * 2. copy css file from there into loco.css
 * 3. copy into script.js smooth heading js code and chane el(element) to root(#main) elem of website
 * 4. then link script.js to html along with script from locomotive scroll cdn file name should be "locomotive-scroll.min.js"
 * 5. link loco.css 
 * 6. done
 */
var cursor = document.getElementById("mini")
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function circleChaptakaro(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    
    window.addEventListener("mousemove", function (dets) {
        this.clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev)
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev)

        xprev = dets.clientX
        yprev = dets.clientY

        circleMouseFollower(xscale, yscale);

        timeout = this.setTimeout(function(){
            cursor.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1, 1)`;     
        },100)
    })
}



function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove",function(dets){
        cursor.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;        
    })
}

function FirstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y:10,
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut
    }).to(".boundingelem",{
        y:'0',
        duration: 2,
        delay:-1,
        ease: Expo.easeInOut,
        stagger:0.2
    }).from("#herofooter",{
        y:10,
        opacity:0,
        ease: Expo.easeInOut,
        duration:1.5,
        delay:-1
    })
}


circleChaptakaro();
circleMouseFollower();
FirstPageAnim();

document.querySelectorAll(".elem").forEach(function(elem){
    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
        })
    })
})

document.querySelectorAll(".elem").forEach(function(elem){
    var diffrot = 0;
    var rotate = 0;
    elem.addEventListener("mousemove",function(dets){
        //console.log(elem.getBoundingClientRect());
        var difft = dets.clientY - elem.getBoundingClientRect().top;
        var diffl = dets.clientX - elem.getBoundingClientRect().left;
        diffrot = dets.clientX-rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top: difft,
            left:diffl,
            rotate: gsap.utils.clamp(-20,20,diffrot)
        })
    })
})