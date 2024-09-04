
//グーグルマップを開く
function gmap() {
if (document.getElementById("POLNO").value>0){} else {alert('マーカーを選択してから押すと、グーグルマップで現在地からの経路が表示されます。');return;}
var glat = document.getElementById("LAT").value;
  var glng = document.getElementById("LNG").value;

window.open("https://www.google.com/maps?q=" + glat + "," + glng);
}

var db;
   var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;
      if (indexedDB) {
      // データベースを削除したい場合はコメントを外します。
      //indexedDB.deleteDatabase("mydb");
      var openRequest = indexedDB.open("mydb", 1.0);
       openRequest.onupgradeneeded = function(event) {
// データベースのバージョンに変更があった場合(初めての場合もここを通ります。)
        db = event.target.result;
           var store = db.createObjectStore("mystore", { keyPath: "mykey"});
              store.createIndex("myvalueIndex", "myvalue");

      }
          openRequest.onsuccess = function(event) {


//マーカークリックイベント
         db = event.target.result;
        }
      } else {
        window.alert("このブラウザではIndexed DataBase API は使えません。");
              }

function markerClick(e){
  ck();
  //マーカーから値をもらう
  POLNO.value = e.sourceTarget.options.customID;            
  LAT.value = e.latlng.lat;
  LNG.value = e.latlng.lng;
  ima();
  map.setView([e.latlng.lat, e.latlng.lng]);

  //現在地取得
  GPS();

  //接地抵抗クリア 
  deleteAll();



  //接地抵抗に移動
  document.getElementById('setti1').focus()
  //DBから値をもらう
  getValue(event); 

}

// 接地抵抗が入力済みなら取得する
 function getValue(event) {
  var key = document.getElementById("POLNO").value;
  //var result = document.getElementById("result");             
  var transaction = db.transaction(["mystore"], "readwrite");
  var store = transaction.objectStore("mystore");                  
  var request = store.get(key);
  var element = document.getElementById( "tutibox" ) ;
  var radioNodeList = element.tuti ;

  request.onsuccess = function (event) {  

      //絶対もらう
      Kno.value = event.target.result.myKno
      MOKU.value = event.target.result.myMOKU
      biko.value = event.target.result.mybiko
      etc.value = event.target.result.myetc
	radioNodeList[event.target.result.mytuti].checked = true 
	  
    if (event.target.result === undefined) {} else {
      //値あり
      var aaa = Number(event.target.result.myvalue)
      //0だったらヌル数字だったら数字
      if(aaa===0){setti1.value ="";} else {

      setti1.value = aaa;
      IV.value = event.target.result.myIV
      BRK.value = event.target.result.myBRK
      TIK2.value = event.target.result.myTIK2
      TIK3.value = event.target.result.myTIK3
      SUTE.value = event.target.result.mySUTE
      BSY.value = event.target.result.myBSY


      DBA.value = event.target.result.myDBA
      DBB.value = event.target.result.myDBB
      DBC.value = event.target.result.myDBC
      DBD.value = event.target.result.myDBD
      DBE.value = event.target.result.myDBE
      JB9.value = event.target.result.myJB9
      JB1.value = event.target.result.myJB1
      AM.value = event.target.result.myAM
      YB1.value = event.target.result.myYB1
      YB2.value = event.target.result.myYB2

      ;
      }
    }
    Bsyu();  //単独の時B種を表示する
  }
}

//登録  
function setValue(event) {

  var key = document.getElementById("POLNO").value;
  var value = Number(document.getElementById("setti1").value);
  var LAT = Number(document.getElementById("LAT").value);
  var LNG = Number(document.getElementById("LNG").value);
  var GLAT = Number(document.getElementById("GLAT").value);
  var GLNG = Number(document.getElementById("GLNG").value);
  var now = document.getElementById("noww").value;
  var etc = document.getElementById("etc").value;
  var BSY = Number(document.getElementById("BSY").value);
  var IV = document.getElementById("IV").value;
  var BRK = document.getElementById("BRK").value;
  var TIK2 = document.getElementById("TIK2").value;
  var TIK3 = document.getElementById("TIK3").value;
  var SUTE = document.getElementById("SUTE").value;
  var MOKU = document.getElementById("MOKU").value;
  var DBA = document.getElementById("DBA").value;
  var DBB = document.getElementById("DBB").value;
  var DBC = document.getElementById("DBC").value;
  var DBD = document.getElementById("DBD").value;
  var DBE = document.getElementById("DBE").value;
  var JB9 = document.getElementById("JB9").value;
  var JB1 = document.getElementById("JB1").value;
  var AM = document.getElementById("AM").value;
  var YB1 = document.getElementById("YB1").value;
  var YB2 = document.getElementById("YB2").value;
  var Kno = document.getElementById("Kno").value;



  //チェック
  if (key >0){} else {alert('マーカーをクリックしてから登録してください!!');return;}
  if (value == 0){
    alert('接地抵抗が未入力です');document.getElementById('setti1').focus();return;
  } 
  if (etc >= 4 && BSY == 0 ) {
    alert('単独接地の時は、A種とB種必須入力です。単独だけど1極しかない時は、単独接地を選択せずにそのまま入力してください。');document.getElementById('BSY').focus();return;
  } 
   
  // form要素を取得 
  var element = document.getElementById( "tutibox" ) ;
  // form要素内のラジオボタングループ(name="tuti")を取得
  var radioNodeList = element.tuti ;
  // 選択状態の値(value)を取得 (Bが選択状態なら"b"が返る)
  var tuti = radioNodeList.value ;
  var biko = document.getElementById("biko").value;
  //                  
  var transaction = db.transaction(["mystore"], "readwrite");
  var store = transaction.objectStore("mystore")
  var request = store.put({
	mykey: key, myvalue:value, myBSY: BSY, myLAT: LAT, myLNG: LNG,
	mytuti: tuti, mybiko: biko, myGLAT: GLAT, myGLNG: GLNG, mynow: now ,
	myetc:etc, myIV:IV, myBRK:BRK, myTIK2:TIK2, myTIK3:TIK3, mySUTE:SUTE,
	myKno:Kno,myMOKU:MOKU,
	myDBA:DBA,myDBB:DBB,myDBC:DBC,myDBD:DBD,myDBE:DBE,
	myJB9:JB9,myJB1:JB1,myAM:AM,myYB1:YB1,myYB2:YB2,
});
  
  
  MAK();

  //入力欄リセット
	deleteAll();


  ck0();
  currentWatchReset();
   request.onsuccess = function (event) {

   }
}

// LDBからマーカ
function MAKall(event) {
  return new Promise(function(resolve) {
    var result = document.getElementById("result");                   
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
    var request = store.openCursor();

    //マーカーレイヤー削除
    MI.clearLayers();
    KAN.clearLayers();
    moji.clearLayers();

    request.onsuccess = function (event) {
      //リストがなかったら終了  
      if(event.target.result == null) {
      resolve()   
      return;
      }

      var cursor = event.target.result;
      var data = cursor.value;
      var divIcon3 = L.divIcon({html: data.mykey.slice( -4 ),className: 'divicon2', iconSize: [0,0], iconAnchor: [0,28] });
  

//検索BOXに値が入っていてかつ一致したら書く
  var kno =document.getElementById("PullDownList").value 

if(kno > 0){
	if(data.myKno == kno){
	//一致だけ書く
		if(data.myvalue>0){
	 KAN.addLayer( L.circleMarker([data.myLAT, data.myLNG],{color: '#fdfdfd',weight: 1,opacity: 1, fillColor: '#534f4f', fillOpacity: 1, radius: 10, customID: data.mykey }).on('click', function(e) { markerClick(e);}));   
	 } else {
	 MI.addLayer( L.circleMarker([data.myLAT, data.myLNG],{color: '#fdfdfd',weight: 1,opacity: 1,fillColor: '#fa04b0',fillOpacity: 1,radius: 10, customID: data.mykey}).on('click', function(e) { markerClick(e);}));
	 }
	moji.addLayer(L.marker([data.myLAT, data.myLNG], {icon: divIcon3,customID: data.mykey}).on('click', function(e) { markerClick(e);}));
	} else {}

} else {
//全部書く

        //値が入ってたら完了（グレー）、未入力ピンク
	if(data.myvalue>0){
	 KAN.addLayer( L.circleMarker([data.myLAT, data.myLNG],{color: '#fdfdfd',weight: 1,opacity: 1, fillColor: '#534f4f', fillOpacity: 1, radius: 10, customID: data.mykey }).on('click', function(e) { markerClick(e);}));   
	 } else {
	 MI.addLayer( L.circleMarker([data.myLAT, data.myLNG],{color: '#fdfdfd',weight: 1,opacity: 1,fillColor: '#fa04b0',fillOpacity: 1,radius: 10, customID: data.mykey}).on('click', function(e) { markerClick(e);}));
	 }
	moji.addLayer(L.marker([data.myLAT, data.myLNG], {icon: divIcon3,customID: data.mykey}).on('click', function(e) { markerClick(e);}));
}
	cursor.continue();
    }
  })
}

// LDBからマーカ
function MAK() {
  var key = document.getElementById("POLNO").value;
  var value = Number(document.getElementById("setti1").value);
  var LAT = Number(document.getElementById("LAT").value);
  var LNG = Number(document.getElementById("LNG").value);

KAN.eachLayer((layer)=> {if (key === layer.options.customID) {KAN.removeLayer(layer);}});
MI.eachLayer((layer)=> {if (key === layer.options.customID) {MI.removeLayer(layer);}});

  if (value >0) {
    KAN.addLayer(L.circleMarker([LAT, LNG],{
    color: '#fdfdfd',weight: 2,opacity: 1,fillColor: '#534f4f',fillOpacity: 1,radius: 10,customID: key })
    .on('click', function(e) { markerClick(e);})
    );
  }else{
    MI.addLayer(L.circleMarker([LAT, LNG],{
    color: '#fdfdfd',weight: 2,opacity: 1,fillColor: '#fa04b0',fillOpacity: 1,radius: 10,customID: key})
    .on('click', function(e) { markerClick(e);})
    );
  }
}

//マーカーが全部入るイメージ
function zenb(){
map.fitBounds(MI.getBounds());   
};



function ck(){
let element = document.getElementById('pop-up');
element.checked = true;
}
function ck0(){
let element = document.getElementById('pop-up');
element.checked = false;
}

//現在地
function GPS() {
	function success(pos) {
		GLAT.value = pos.coords.latitude;
		GLNG.value = pos.coords.longitude;

	}
  function error(err) {
		alert('位置情報を取得できませんでした。');
	}
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	  if (watch_id == 0) {
		watch_id = navigator.geolocation.watchPosition(success, error, options); // 現在地情報を定期的に
  	}
}

//現在地
function currentWatch() {
	function success(pos) {
		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;
		map.setView([ lat,lng ]);
		// 現在地に表示するマーカー
		if (curMarker) {
			map.removeLayer(curMarker);
		}
		curMarker = L.marker([lat, lng],{icon:myIcon3}).addTo(map);
	}
	function error(err) {
		alert('位置情報を取得できませんでした。');
	}
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	if (watch_id == 0) {
		watch_id = navigator.geolocation.watchPosition(success, error, options); // 現在地情報を定期的に
	}
}

function currentWatchReset() {
	if (watch_id > 0) {
		navigator.geolocation.clearWatch(watch_id);
		watch_id = 0;
	}
	if (curMarker) {
		map.removeLayer(curMarker);
		curMarker = null;
	}
}


//待つタイプ
async function mikan(){
await MAKall();
await map.fitBounds(MI.getBounds());   
};
async function kanryo(){
await MAKall();
await map.fitBounds(KAN.getBounds());   
};


//入力欄をリセット
function deleteAll() {
var arr = ['IV','BRK','TIK2','TIK3','SUTE','BSY','Kno','MOKU','DBA','DBB','DBC','DBD','DBE','JB9','JB1','AM','YB1','YB2'];
	for (var i = 0; i < arr.length; i++){
		document.getElementById(arr[i]).value = "";
	}
	document.getElementById("etc").selectedIndex = 0;
}
	
//現在時刻
function ima() {
  const D = new Date();
  const year = D.getFullYear();
  const month = D.getMonth() + 1;
  const date = D.getDate();
  const hour = D.getHours();
  const minute = D.getMinutes();
  const second = D.getSeconds();
  noww.value =  year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second;
}

function Bsyu(){
const etc = document.getElementById("etc").value
const st = document.getElementById("setti1").value
if (etc == '7'){
document.getElementById('BSY').style.visibility = 'visible';
document.getElementById('asyu').style.visibility = 'visible';
document.getElementById('bsyu').style.visibility = 'visible';
document.getElementById('asyu').value = 'D種';
document.getElementById('bsyu').value = 'A種';
    }else{
if (etc >= '4'){
document.getElementById('BSY').style.visibility = 'visible';
document.getElementById('asyu').style.visibility = 'visible';
document.getElementById('bsyu').style.visibility = 'visible';
document.getElementById('asyu').value = 'A種';
document.getElementById('bsyu').value = 'B種';
    }else{
    document.getElementById('BSY').style.visibility = 'hidden';
document.getElementById('asyu').value = '';
document.getElementById('bsyu').value = '';
    document.getElementById('asyu').style.visibility = 'hidden';
    document.getElementById('bsyu').style.visibility = 'hidden';
  }}

if (etc === '1' && st !== '999'){
  document.getElementById('setti1').value = '999';
  }
  if (etc != '1' && st == "999"){
    document.getElementById('setti1').value = null;
    }
}



//管理NOリストBOXに格納　重複あり

function KANRINOa(event) {

  return new Promise(function(resolve) {
    var result = document.getElementById("result");                   
    var transaction = db.transaction(["mystore"], "readwrite");
    var store = transaction.objectStore("mystore");
    var request = store.openCursor();
    let array =[];
  
    request.onsuccess = function (event) {

      //リストがなくなったら終了  
      if(event.target.result == null) {
      resolve()
	//重複削除
	let res = new Set(array)  
	
	res.forEach((element)=>{
    
    	// option要素を生成
    	let option = document.createElement('option');
    
    	option.text = element;
   	 option.value = element;
    
   	 // 生成したoption要素をselect要素に追加
  	  document.getElementById("PullDownList").add(option);
		document.getElementById("PullDownList").value = "";
	});


      return;
    }

      var cursor = event.target.result;
      var data = cursor.value;

	array.unshift( data.myKno);
	
  cursor.continue();


    }

  })



}


//フィーダを選択
function inputChange(){
MAKall();

}
