(function() {
    function boxMove(Class) {
        this.Class = Class;
        this.init = function() {
            var _this = this;
            //鼠标落下事件
            $("." + this.Class).mousedown(function(e) {
                //计算鼠标在撞击盒子里按下时距离盒子左边框的距离
                $(this).css("cursor", "move");
                var x = e.pageX - $(this).offset().left;
                var y = e.pageY - $(this).offset().top;
                //盒子不能超出当前屏幕
                if (x < 0) {
                    x = 0;
                } else if (x > document.body.offsetWidth) {
                    x = document.body.offsetWidth;
                }
                _this.move(x, y);
            });
            //鼠标松开事件
            $("." + this.Class).mouseup(function() {
                $(this).css("cursor", "default");
                $(document).off("mousemove");
            })
        }
        boxMove.prototype.move = function(x, y) {
            var _this = this;
            $(document).mousemove(function(e) {
                var left = e.pageX - x;
                var top = e.pageY - y;
                $("." + _this.Class).css({
                    left: left + "px",
                    top: top + "px"
                });
                _this.knock(left, top);
            });
        }
        boxMove.prototype.knock = function(left, top) {
            var Left = $("." + this.Class).next().offset().left;
            var Top = $("." + this.Class).next().offset().top;
            var lefttop_left = Left - $("." + this.Class).outerWidth();
            var lefttop_top = Top - $("." + this.Class).outerWidth();
            var righttop_left = Left + $("." + this.Class).outerWidth();
            var righttop_top = Top - $("." + this.Class).outerWidth();
            var leftbottom_left = Left - $("." + this.Class).outerWidth();
            var leftbottom_top = Top + $("." + this.Class).outerWidth();
            var rightbottom_left = Left + $("." + this.Class).outerWidth();
            var rightbottom_top = Top + $("." + this.Class).outerWidth();
            //左上顶点撞击
            if ((left > lefttop_left && left < lefttop_left + 20) && (top > lefttop_top && top < lefttop_top + 20)) {
                $("." + this.Class).next().stop().animate({
                    left: Left + 150 + "px",
                    top: Top + 150 + "px"
                }, 600);
                //右上顶点撞击
            } else if ((left > righttop_left - 20 && left < righttop_left) && (top < righttop_top + 20 && top > righttop_top)) {
                $("." + this.Class).next().stop().animate({
                    left: Left - 150 + "px",
                    top: Top + 150 + "px"
                }, 600);
                //左下顶点撞击
            } else if ((left > leftbottom_left && left < leftbottom_left + 20) && (top > leftbottom_top - 20 && top < leftbottom_top)) {
                $("." + this.Class).next().stop().animate({
                    left: Left + 150 + "px",
                    top: Top - 150 + "px"
                }, 600);
                //右下顶点撞击
            } else if ((left > rightbottom_left - 20 && left < rightbottom_left) && (top > rightbottom_top - 20 && top < rightbottom_top)) {
                $("." + this.Class).next().stop().animate({
                    left: Left - 150 + "px",
                    top: Top - 150 + "px"
                }, 600);
                //左边撞击
            } else if ((left > lefttop_left && left < lefttop_left + 20) && (top > lefttop_top + 20 && top < lefttop_top + 180)) {
                $("." + this.Class).next().stop().animate({
                    left: Left + 150 + "px",
                }, 600);
                //右边撞击
            } else if ((left > righttop_left - 20 && left < righttop_left) && (top > lefttop_top + 20 && top < lefttop_top + 180)) {
                $("." + this.Class).next().stop().animate({
                    left: Left - 150 + "px",
                }, 600);
                //上边撞击
            } else if ((top > lefttop_top && top < lefttop_top + 20) && (
                    left > lefttop_left + 20 && left < lefttop_left + 180
                )) {
                $("." + this.Class).next().stop().animate({
                    top: Top + 150 + "px"
                }, 600);
                //下边撞击
            } else if ((top > leftbottom_top - 20 && top < leftbottom_top) && (
                    left > lefttop_left + 20 && left < lefttop_left + 180
                )) {
                $("." + this.Class).next().stop().animate({
                    top: Top - 150 + "px"
                }, 600);
            }
        }
    };
    window.boxMove = boxMove;
})(window)