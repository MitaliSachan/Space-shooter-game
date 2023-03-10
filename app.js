var jet =document.getElementById("jet");

window.addEventListener("keydown", (e) => {
    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if (e.key == "ArrowLeft" && left > 0) {
      jet.style.left = left - 10 + "px";
    }
    else if (e.key == "ArrowRight" && left <= 440) {
        jet.style.left = left + 10 + "px";
      }
    if (e.key =="ArrowUp" || e.keyCode == 32 ) {
        //32 is for space key
        var bullet = document.createElement("div");
        bullet.classList.add("bullets");
        board.appendChild(bullet);

        var movebullet = setInterval(() => {
            var rocks = document.getElementsByClassName("rocks");

            for (var i = 0; i < rocks.length; i++) {
                var rock = rocks[i];
                if (rock != undefined) {
                    var rockbound = rock.getBoundingClientRect();
                    var bulletbound = bullet.getBoundingClientRect();
                    //Condition to check whether the rock/alien and the bullet are at the same position..!
                    //If so,then we have to destroy that rock.
                    if (
                        bulletbound.left >= rockbound.left &&
                        bulletbound.right <= rockbound.right &&
                        bulletbound.top <= rockbound.top &&
                        bulletbound.bottom <= rockbound.bottom
                      ) {
                        rock.parentElement.removeChild(rock); //Just removing that particular rock;
                        document.getElementById("points").innerHTML = parseInt(document.getElementById("points").innerHTML) + 1;
                      }
                }
            }
            var bulletbottom=parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));
            
            //Stops the bullet from moving outside the gamebox
            if (bulletbottom >= 530) {
                clearInterval(movebullet);
            }
            bullet.style.left = left +22+ "px"; //bullet should always be placed at the top of my jet..!
            bullet.style.bottom=bulletbottom+3+"px";
        });
    }
});
    

var generaterocks=setInterval(()=>{
    var rock=document.createElement("div");
    rock.classList.add("rocks");
    //Just getting the left of the rock to place it in random position...
    var rockleft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));
    //generate value between 0 to 460 where 440=>board width
    rock.style.left= Math.floor(Math.random()*440) + "px";
    board.appendChild(rock);
},1500);

var moverocks =setInterval(()=>{
    var rocks=document.getElementsByClassName("rocks");
    if(rocks!=undefined){
        for(var i=0;i<rocks.length;i++){
            //now i have to increase the top of each rock,so that the rock can move downwards...
            var rock=rocks[i];//getting each rock
            var rocktop=parseInt(window.getComputedStyle(rock).getPropertyValue("top"));
            //475=>boardheight-rockheight+25
            if(rocktop>=475){
                alert("GAME OVER");
                clearInterval(moverocks);
                window.location.reload();
            }
            rock.style.top=rocktop+25+"px";
        }
    }
},450);