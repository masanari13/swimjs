var fishes = [
    {
        img:"./icon.png",
        size:{
            height:100,
            width:100
        }
    }
];
var aquarium = 
{
    size:{//水槽のサイズ
        hight: 300,
        width: 1000
    },
    disposition:{//水槽の配置場所
        top: 0,
        left:0
    }
}

var fish = document.createElement(
    "img",
);
fish.setAttribute("src",fishes[0].img);
fish.setAttribute("height",fishes[0].size.height);
fish.setAttribute("width",fishes[0].size.width);
fish.style.position="fixed";
fish.style.top="100";
fish.style.left="300";
fish.style.transform="rotate(0deg)";
fish.style.transition="all 3000ms 0s ease";

var elementbox = document.getElementById("aquarium");
elementbox.append(fish);

var swim_chace = function (pointa){
    console.log(pointa);
    var mX = pointa.pageX;  //X座標
    var mY = pointa.pageY;  //Y座標
    var fish_pointa=fish.getBoundingClientRect();

    //角度計算
    var radian = Math.atan2(mY - (fish_pointa.top + (fish.clientHeight/2)), mX - (fish_pointa.left + (fish.clientWidth/2)));
    console.log("radian:"+radian);
    var degree = radian* ( 180 / Math.PI );
    console.log("degree:"+degree);

    //口の位置を計算
    var mouthpoint ={
        x: 0,
        y: 50
    };
    var mouthpoint_inversion={
        x: mouthpoint.x + fish.clientWidth,
        y: mouthpoint.y
    }

    //座標を表示する
    //横移動
    var transform_value = ""
    if(fish_pointa.left + (fish.clientWidth/2) < mX ){
        transform_value="scale(-1,1)";
        transform_value += "rotate("+ -degree +"deg)";
        fish.style.left= pointa.pageX - fish.clientWidth - 10;
    }else{
        transform_value="scale(1,1)";
        transform_value += "rotate("+ (degree + 180) +"deg)";
        fish.style.left=pointa.pageX+10;
    }
    //縦移動
    if(fish_pointa.top < mY ){
        fish.style.top= pointa.pageY - fish.clientHeight - 10;
    }else{
        fish.style.top=pointa.pageY+10;
    }


    fish.style.transform = transform_value;
    document.getElementById("zahyouX").value = mX;
    document.getElementById("zahyouY").value = mY;
    //fish.style.transform="rotate(45deg)";
}

document.body.addEventListener("mousemove", function(pointa){mousemove_fanc(swim_chace,1000,pointa)});

function mousemove_fanc(job,tmo, pointa){
    //タイムアウト登録されているならキャンセル
    if(job in mousemove_fanc.TID) {
        window.clearTimeout(mousemove_fanc.TID[job]);
    }
    //タイムアウト登録する
    mousemove_fanc.TID[job] = window.setTimeout(
        function() {
            //実行前にタイマーIDをクリア
            delete mousemove_fanc.TID[job];
            //登録処理を実行
            try {
                job.call(this,pointa);
            } catch(e) {
                console.log("EXCEPTION CAUGHT : " + job);
            }
    }, tmo);
}

//処理からタイマーIDへのハッシュ
mousemove_fanc.TID = {};