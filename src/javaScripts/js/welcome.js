/**
 * Created by Administrator on 2015/4/20.
 */
var Hongru={};
function H$(id){return document.getElementById(id)}
function H$$(c,p){return p.getElementsByTagName(c)}
Hongru.shutter = function(){
    function init(anchor,options){this.anchor=anchor; this.init(options);}
    init.prototype = {
        init:function(options){ //options参数：id（必选）：图片列表父标签id；auto（可选）：自动运行时间；index（可选）：开始的运行的图片序号
            var wp = H$(options.id), // 获取图片列表父元素
                ul = H$$('ul',wp)[0], // 获取
                li = this.li = H$$('li',ul);
            this.a = options.auto?options.auto:4; //自动运行间隔
            this.index = options.position?options.position:0; //开始运行的图片序号（从0开始）
            this.l = li.length;
            this.cur = 0; //当前显示的图片序号&&z-index变量
            this.stN = options.shutterNum?options.shutterNum:5;
            this.dir = options.shutterDir?options.shutterDir:'H';
            this.W = wp.offsetWidth;
            this.H = wp.offsetHeight;
            this.aw = 0;
            this.mask = [];
            this.nav = [];
            ul.style.display = 'none';
            var container = this.container = document.createElement('div'),
                con_a = this._a = document.createElement('a');
            con_a.target = '_blank';
            container.style.cssText = con_a.style.cssText = 'position:absolute;width:'+this.W+'px;height:'+this.H+'px;left:0;top:0';
            container.appendChild(con_a);
            for (var x=0; x<this.stN; x++) {
                var mask = document.createElement('span');
                mask.style.cssText = this.dir == 'H'?'position:absolute;width:'+this.W/this.stN+'px;height:'+this.H+'px;left:'+x*this.W/this.stN+'px;top:0' : 'position:absolute;width:'+this.W+'px;height:'+this.H/this.stN+'px;left:0px;top:'+x*this.H/this.stN+'px';
                this.mask.push(mask);
                con_a.appendChild(mask);
            }
            wp.appendChild(container);
            this.nav_wp = document.createElement('div'); //先建一个div作为控制器父标签，你也可以用<ul>或<ol>来做，语义可能会更好，这里我就不改了
            this.nav_wp.style.cssText = 'position:absolute;right:0;bottom:0;padding:8px 0;'; //为它设置样式
            for(var i=0;i<this.l;i++){
                /* == 绘制控制器 == */
                var nav = document.createElement('a'); //这里我就直接用a标签来做控制器，考虑语义的话你也可以用li
                nav.className = options.navClass?options.navClass:'shutter-nav'; //控制器class，默认为'shutter-nav'
                this.nav.push[nav];
                nav.innerHTML = i+1;
                nav.onclick = new Function(this.anchor+'.pos('+i+')'); //绑定onclick事件，直接调用之前写好的pos()函数
                this.nav_wp.appendChild(nav);
            }
            wp.appendChild(this.nav_wp);
            this.curC = options.curNavClass?options.curNavClass:'shutter-cur-nav';
            this.pos(this.index); //变换函数
        },
        auto:function(){
            this.li.a = setInterval(new Function(this.anchor+'.move(1)'),this.a*1000);
        },
        move:function(i){//参数i有两种选择，1和-1,1代表运行到下一张，-1代表运行到上一张
            var n = this.cur+i;
            var m = i==1?n==this.l?0:n:n<0?this.l-1:n; //下一张或上一张的序号（注意三元选择符的运用）
            this.pos(m); //变换到上一张或下一张
        },
        pos:function(i){
            clearInterval(this.li.a);
            clearInterval(this.li[i].a);
            this.aw = this.dir == 'H'?this.H : this.W;
            var src = H$$('img',this.li[i])[0].src;
            var _n = i+1>=this.l?0:i+1;
            var src_n = H$$('img',this.li[_n])[0].src;
            this.container.style.backgroundImage = 'url('+src_n+')';
            for(var n=0;n<this.stN;n++){
                this.mask[n].style.cssText = this.dir == 'H'?'position:absolute;width:'+this.W/this.stN+'px;height:'+this.H+'px;left:'+n*this.W/this.stN+'px;top:0' : 'position:absolute;width:'+this.W+'px;height:'+this.H/this.stN+'px;left:0px;top:'+n*this.H/this.stN+'px';
                this.mask[n].style.background = this.dir == 'H' ? 'url('+src+') no-repeat -'+n*this.W/this.stN+'px 0' : 'url('+src+') no-repeat 0 -'+n*this.H/this.stN+'px';
            }
            this.cur = i; //绑定当前显示图片的正确序号
            this.li.a = false;
            for(var x=0;x<this.l;x++){
                H$$('a',this.nav_wp)[x].className = x==i?this.curC:'shutter-nav'; //绑定当前控制器样式
            }
            this._a.href = H$$('a',this.li[i])[0].href;
            //this.auto(); //自动运行
            this.li[i].a = setInterval(new Function(this.anchor+'.anim('+i+')'), 6*this.stN);
        },
        anim: function (i) {
            var tt = this.dir == 'H' ? Math.abs(parseInt(this.mask[this.stN-1].style.top)) : Math.abs(parseInt(this.mask[this.stN-1].style.left));
            if(this.aw-tt<=5){
                clearInterval(this.li[i].a);
                for(var n=0;n<this.stN;n++){
                    var d = n%2 == 0 ? 1 : -1;
                    this.dir == 'H' ? this.mask[n].style.top = this.aw*d + 'px' : this.mask[n].style.left = this.aw*d + 'px';
                }
                if(!this.li.a) {this.auto()}
            }else {
                for(var n=0;n<this.stN;n++){
                    var d = n%2 == 0 ? 1 : -1;
                    var ts = (this.aw-Math.ceil(Math.abs(this.aw-tt)*.75))*d;
                    this.dir == 'H' ? this.mask[n].style.top = ts + 'px' : this.mask[n].style.left = ts +'px';
                }
            }
        }
    }
    return {init:init}
}();