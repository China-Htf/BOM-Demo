window.addEventListener('load', function() {
	var arrow_r = document.querySelector('.arrow-r');
	var arrow_l = document.querySelector('.arrow-l');
	var flous = document.querySelector('.flous');
	//获取图片的宽度
	var frousWidh = flous.offsetWidth;
	console.log(frousWidh);

	flous.addEventListener('mouseenter', function() {
		arrow_r.style.display = 'block';
		arrow_l.style.display = 'block';
		clearInterval(timer);
		timer = null;
	})
	flous.addEventListener('mouseleave', function() {
		arrow_r.style.display = 'none';
		arrow_l.style.display = 'none';
		timer = setInterval(function() {
			//手动调用点击事件
			arrow_r.click();
		}, 2000)
	})

	//轮播图动的效果
	function animate(obj, target) {
		//每次点击，首先清除上次遗留的效果
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			//需要移动的距离减去现在的距离，除以一定数字，实现慢慢减速的效果
			var slow = (target - obj.offsetLeft) / 10;
			//需要移动的距离大于0，则向上取数，反着取下
			slow = slow > 0 ? Math.ceil(slow) : Math.floor(slow);
			//当前的距离和需要移动的距离一致，取消移动效果
			if (obj.offsetLeft == target) {
				clearInterval(obj.timer);
			} else {
				obj.style.left = obj.offsetLeft + slow + 'px';
			}
		}, 15);
	}

	var ul = flous.querySelector('ul');
	var ol = flous.querySelector('.circle');
	for (var i = 0; i < ul.children.length; i++) {
		//添加一个li对象
		var li = document.createElement('li');
		//给li添加索引号
		li.setAttribute('index', i);
		//把li添加到ol的最后一行
		ol.appendChild(li);

		li.addEventListener('click', function() {
			for (i = 0; i < ol.children.length; i++) {
				//取消所有小圆圈的类名
				ol.children[i].className = '';
			}
			//查看当前点击的索引号
			var index = this.getAttribute('index');
			console.log(index);
			num = cirst = index;
			//当前点击的小圆圈，添加current类
			this.className = 'current';
			animate(ul, -index * frousWidh);
		})
	}
	ol.children[0].className = 'current';
	//克隆第一张图片
	var first = ul.children[0].cloneNode(true);
	//放在最后面
	ul.appendChild(first);
	//点击方向，图片进行滚动
	var num = 0;
	var cirst = 0;
	arrow_r.addEventListener('click', function() {
		if (num == ul.children.length - 1) {
			ul.style.left = 0;
			num = 0;
		}
		num++;
		cirst++;
		animate(ul, -num * frousWidh);
		if (cirst == ol.children.length) {
			cirst = 0;
		}
		cirstChang();
	})

	arrow_l.addEventListener('click', function() {
		if (num == 0) {
			num = ul.children.length - 1;
			ul.style.left = -num * frousWidh + 'px';
		}
		num--;
		cirst--;
		animate(ul, -num * frousWidh);
		if (cirst < 0) {
			cirst = ol.children.length - 1;
		}
		cirstChang();
	})

	function cirstChang() {
		for (var i = 0; i < ol.children.length; i++) {
			ol.children[i].className = '';
		}
		ol.children[cirst].className = 'current';
	}

	//自动轮播
	var timer = setInterval(function() {
		//手动调用点击事件
		arrow_r.click();
	}, 2000)
})
