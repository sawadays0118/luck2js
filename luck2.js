/*
* luck2.js 1.0 (yuga.js TT Custom customized jQuery plugin)
*
* Copyright (c) 2014 Tomoki Sawamura
* tomoki.sawamura0118@gmail.com
*/
/*
* yuga.js 0.7.2
* Copyright (c) 2009 Kyosuke Nakamura (kyosuke.jp)
*/
/*
* yuga.js TT Custom
* Copyright (c) 2011 TAGAWA takao (dounokouno@gmail.com)
*/
/*
* fixHeight 2.1
* http://www.starryworks.co.jp/blog/tips/fixheightjs.html
*
* Author Koji Kimura @ STARRYWORKS inc.
* http://www.starryworks.co.jp/
*/
/*
* !! Above mentioned all plugins !!
*
* Licensed under the MIT License:
* http://www.opensource.org/licenses/mit-license.php
*/

var uaSet = (function() {
	return {
	ltIE6:typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
	ltIE7:typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
	ltIE8:typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
	ltIE9:document.uniqueID && !window.matchMedia,
	gtIE10:document.uniqueID && document.documentMode >= 10,
	Trident:document.uniqueID,
	Gecko:'MozAppearance' in document.documentElement.style,
	Presto:window.opera,
	Blink:window.chrome,
	Webkit:!window.chrome && 'WebkitAppearance' in document.documentElement.style,
	Touch:typeof document.ontouchstart != "undefined",
	Mobile:typeof window.orientation != "undefined",
	Pointer:window.navigator.pointerEnabled,
	MSPoniter:window.navigator.msPointerEnabled
	}
})();

(function($) {
	$(function() {
		$.luck2.rollover();
		$.luck2.externalLink();
		$.luck2.scroll();
		$.luck2.autoCurrent();
		$.luck2.tab();
		$.luck2.child();
		$.luck2.icon();
		$.luck2.fixHeight();
		$.luck2.placeholder();
		$.luck2.toggleBox();
	});

	$.luck2 = {
		//URIを解析したオブジェクトを返すfunction
		Uri: function(path) {
			var self = this;
			this.originalPath = path;
			//絶対パスを取得
			this.absolutePath = (function() {
				var e = document.createElement('a');
				e.href = path;
				return e.href;
			})();
			//絶対パスを分解
			var fields = {'schema' : 2, 'username' : 5, 'password' : 6, 'host' : 7, 'path' : 9, 'query' : 10, 'fragment' : 11};
			var r = /^((\w+):)?(\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(this.absolutePath);
			for (var field in fields) {
				this[field] = r[fields[field]];
			}
			this.querys = {};
			if (this.query) {
				$.each(self.query.split('&'), function() {
					var a = this.split('=');
					if (a.length == 2) self.querys[a[0]] = a[1];
				});
			}
		},
		//ユニークな配列を取得
		uniqueArray: function(array) {
			var storage = new Object;
			var uniqueArray = new Array();
			var i, value;
			for (var i=0;i<array.length;i++) {
				value = array[i];
				if (!(value in storage)) {
					storage[value] = true;
					uniqueArray.push(value);
				}
			}
			return uniqueArray;
		},
		//ロールオーバー
		rollover: function(options) {
			var c = $.extend({
				hoverSelector: '.imgOver, .imgOvers img',
				groupSelector: '.imgGroup',
				postfix: '_on'
			}, options);
			//ロールオーバーするノードの初期化
			var rolloverImgs = $(c.hoverSelector).filter(isNotCurrent);
			rolloverImgs.each(function() {
				this.originalSrc = $(this).attr('src');
				this.rolloverSrc = this.originalSrc.replace(new RegExp('('+c.postfix+')?(\.gif|\.jpg|\.png)$'), c.postfix+"$2");
				this.rolloverImg = new Image;
				this.rolloverImg.src = this.rolloverSrc;
			});
			//グループ内のimg要素を指定するセレクタ生成
			var groupingImgs = $(c.groupSelector).find('img').filter(isRolloverImg);
			//通常ロールオーバー
			rolloverImgs.not(groupingImgs).hover(function() {
				$(this).attr('src',this.rolloverSrc);
			},function() {
				$(this).attr('src',this.originalSrc);
			});
			//グループ化されたロールオーバー
			$(c.groupSelector).hover(function() {
				$(this).find('img').filter(isRolloverImg).each(function() {
					$(this).attr('src',this.rolloverSrc);
				});
			},function() {
				$(this).find('img').filter(isRolloverImg).each(function() {
					$(this).attr('src',this.originalSrc);
				});
			});
			//フィルタ用function
			function isNotCurrent(i) {
				return Boolean(!this.currentSrc);
			}
			function isRolloverImg(i) {
				return Boolean(this.rolloverSrc);
			}
		},
		//外部リンクは別ウインドウを設定
		externalLink: function(options) {
			var c = $.extend({
				windowOpen: true
			}, options);
			var uri = new $.luck2.Uri(location.href);
			var e = $('a[href^="http://"],a[href^="https://"],a[href^="//"]').not('a[href^="' + uri.schema + '://' + uri.host + '/' + '"],a[href^="//' + uri.host + '/' + '"]');
			if (c.windowOpen) {
				e.click(function() {
					window.open(this.href, '_blank');
					return false;
				});
			}
			e.addClass(c.externalClass);
		},
		//ページ内リンクはするするスクロール
		scroll: function(options) {
			var c = $.extend({
				duration: 500
			}, options);
			var $anchors = $('a[href^="#"], area[href^="#"]');
			if (uaSet.Blink || uaSet.Webkit) {
				rootSelector = 'html,body';
			} else if (uaSet.ltIE6) {
				rootSelector = 'html,body';
			} else {
				rootSelector = 'html';
			}
			var $doc = $(rootSelector);
			$anchors.each(function() {
				var $target = $(this.hash);
				$target = $target.length && $target || $('[name='+ this.hash.slice(1) +']');
				$(this).click(function(e) {
					if ($target.length === 0) {
						e.preventDefault();
						return;
					}
					var targetPositionTop = $target.offset().top;
					$doc.stop().animate({
						scrollTop: targetPositionTop
					},{
						duration: c.duration,
						complete: function () {
						}
					});
					e.preventDefault();
					return false;
				});
			});
		},
		//グローバルナビ、サブナビのカレント表示
		autoCurrent: function(options) {
			var c = $.extend({
				rootDir: 1,
				currentClass: 'active',
				currentPostfix: '_on',
				gNavSelector: '#gNav',
				gNavCurrentType: 'signature',//auto,signature
				gNavList: ['top','about','works','service','contact'],//gNavCurrentType: 'signature' bodyId設定
				sNavSelector: '',
				sNavNestElement: 'ul'//CSSでdisplay:none;設定を推奨
			}, options);
			//表示ページのパスを取得
			$.getDirFileName = function(fileUrl) {
				if (fileUrl.match(new RegExp('#'))) {//アンカーを除外
					fileUrl = fileUrl.substring(0,fileUrl.indexOf("#"));
				}
				if (fileUrl.match(new RegExp('/$'))) {//スラッシュ時のファイル名補填
					fileUrl	= fileUrl + 'index.';
				}
				fileUrl = fileUrl.substring(fileUrl.lastIndexOf('/') && fileUrl.indexOf(currentDir), fileUrl.length);
				fileUrl = fileUrl.substring(0,fileUrl.indexOf(".")+1);//拡張子を除外
				return fileUrl;
			}
			var currentDir = "/" + new $.luck2.Uri(location.href).path.split("/")[c.rootDir],
				dirFileName = $.getDirFileName(location.href),
				bodyId = $('body').attr('id'),
				gNavNum;
			//グローバルナビゲーション
			$(c.gNavSelector).find('a').each(function() {
				var originalSrc = $(c.gNavSelector).find('a[href*="'+currentDir+'"]').find('img').attr('src'),
					rolloverMethod;
				if (c.gNavCurrentType == 'auto') {
					if (currentDir != "//" && currentDir != "/" && dirFileName != "/index.") {
						rolloverMethod = $(c.gNavSelector).find('a[href*="'+currentDir+'"]');
					} else if (currentDir.match(new RegExp('.')) && dirFileName === "/index.") {
						rolloverMethod = $(c.gNavSelector).find('a[href^="'+currentDir+'"],a[href^="'+dirFileName+'"]');
					}
				} else if (c.gNavCurrentType == 'signature') {
					if ($.inArray(bodyId, c.gNavList)!=-1) {
						gNavNum = $.inArray(bodyId, c.gNavList);
						rolloverMethod = $(c.gNavSelector).find('a').eq(gNavNum);
					}
				}
				$(rolloverMethod).addClass(c.currentClass);
				if (typeof originalSrc == 'undefined') return;
				var rolloverSrc = originalSrc.replace(new RegExp('('+c.currentPostfix+')?(\.gif|\.jpg|\.png)$'), c.currentPostfix+"$2");
				$(rolloverMethod).find('img').attr('src', rolloverSrc);
				$(c.gNavSelector).find('a').hover(function() {
				}, function() {
					$(rolloverMethod).find('img').attr('src', rolloverSrc);
				});
				return false;
			});
			//サブナビゲーション
			$(c.sNavSelector).find(c.sNavNestElement).hide();
			if (currentDir != "//" && currentDir != "/" && dirFileName != "/index.") {
				$(c.sNavSelector).find('a').each(function() {
					//スラッシュ時のファイル名補填
					if ($(this).attr('href').match(new RegExp('/$'))) {
						$(this).attr('href',$(this).attr('href') + 'index.html');
					}
					//aタグのhrefにカテゴリ名～ファイル名が一致するファイルパスがある場合はカレント表示
					if($(this).attr('href').lastIndexOf(dirFileName)!=-1 && dirFileName != "/index.") {
						$(this).addClass(c.currentClass);
						//ページ内リンクはカレント表示から除外
						if($(this).attr('href').match(new RegExp('#'))) {
							$(this).removeClass(c.currentClass);
						}
						//2階層目以降の表示設定
						if($(this).parents(c.sNavSelector).find(c.sNavNestElement)) {
							$(this).parents(c.sNavNestElement).show().prev().addClass(c.currentClass);
							$(this).next(c.sNavNestElement).show();
						}
					}
				});
			}
		},
		//タブ機能
		tab: function(options) {
			var c = $.extend({
				tabNavSelector: '.tabNav',
				activeTabClass: 'active'
			}, options);
			$(c.tabNavSelector).each(function() {
				var tabNavList = $(this).find('a[href^=#], area[href^=#]');
				var tabBodyList;
				var lhash = location.search.replace('?','#');
				tabNavList.each(function() {
					this.hrefdata = new $.luck2.Uri(this.getAttribute('href'));
					var selecter = '#'+this.hrefdata.fragment;
					if (tabBodyList) {
						tabBodyList = tabBodyList.add(selecter);
					} else {
						tabBodyList = $(selecter);
					}
					$(this).unbind('click');
					$(this).click(function() {
						tabNavList.removeClass(c.activeTabClass);
						$(this).addClass(c.activeTabClass);
						tabBodyList.hide();
						$(selecter).show();
						return false;
					});
				});
				tabBodyList.hide()
				tabNavList.filter(':first').trigger('click');
				if (lhash) {
					$(this).find('a[href$='+lhash+'], area[href$='+lhash+']').click();
				}
			});
		},
		//odd,even,first-child,last-child,nth-childクラスを追加
		child: function(options) {
			var c = $.extend({
				selector: '#wrap',
				oeParentClass: '.oeParent,ul,ol,dl,table,tbody,tr',
				nthParentClass: '.nthParent',
				oddClass: 'odd',
				evenClass: 'even',
				nthChildClass: 'nthChild',
				firstChildClass: 'firstChild',
				lastChildClass: 'lastChild'
			}, options);
			$(c.selector).each(function() {
				var n=0;
				$(c.oeParentClass).children().each(function() {
				//:odd,:evenをクラスとして追加
				$(this).siblings(':nth-child(2n+1)').addBack(':only-child').addClass(c.oddClass);
				$(this).siblings(':nth-child(2n)').addClass(c.evenClass);
				});
				//:nth-childをクラスとして追加
				$(c.nthParentClass).children().each(function() {
					n++;
					for (var i=2;i<=n;i++) {
						if ((n%i) == 0) {
							//:nth-child(i)
							$(this).siblings(':nth-child('+i+')').addBack(':nth-child('+i+')').addClass(c.nthChildClass+i);
							//:nth-child(in)
							$(this).siblings(':nth-child('+i+'n)').addBack(':nth-child('+i+'n)').addClass(c.nthChildClass+i+'n');
						}
					}
				});
				//:first-child,:last-childをクラスとして追加
				$(this).find(':first-child').addClass(c.firstChildClass);
				$(this).find(':last-child').addClass(c.lastChildClass);
			});
		},
		//href属性の内容に合わせてクラスを追加
		icon: function(options) {
			var c = $.extend({
				ignoreClass: '.icoNone'
			}, options);
			//IE7以下で複数行に対応 バグフィクス用タグ挿入
			$.fn.extend({
				inlineBgFix: function() {
				if (uaSet.ltIE7) {
					$(this).css("cssText","background-image: none !important; padding-right: 0 !important; padding-left: 0 !important;")
					.prepend($.parseHTML('<span class="bgFixFront">&nbsp;</span>'))
					.append($.parseHTML('<span class="bgFixBack">&nbsp;</span>'));
					}
				}
			});
			//別ウィンドウクラス
			var uri = new $.luck2.Uri(location.href);
			var e = $('a[href^="http://"],a[href^="https://"],a[href^="//"]').not('a[href^="' + uri.schema + '://' + uri.host + '/' + '"],a[href^="//' + uri.host + '/' + '"]').not(c.ignoreClass);
			e.addClass('icoBlank');
			//その他クラス
			$('a[href^="mailto"]').not(c.ignoreClass).addClass('icoMail').inlineBgFix();
			$('a[href$=".pdf"]').not(c.ignoreClass).addClass('icoPdf').inlineBgFix();
			$('a[href$=".doc"], a[href$=".docx"], a[href$=".rtf"]').not(c.ignoreClass).addClass('icoWord').inlineBgFix();
			$('a[href$=".xls"], a[href$=".xlsx"]').not(c.ignoreClass).addClass('icoExcel').inlineBgFix();
			$('a[href$=".ppt"], a[href$=".pptx"]').not(c.ignoreClass).addClass('icoPwp').inlineBgFix();
			$('a[href$=".zip"]').not(c.ignoreClass).addClass('icoZip').inlineBgFix();
		},
		//ボックスの高さを揃える
		fixHeight: function(options) {
			var parents = [];
			var isInitialized = false;
			var textHeight = 0;
			var $fontSizeDiv;
			$.fn.fixHeight = function( i_force ) {
				init();
				this.each(function(){
					var childrenGroups = getChildren( this );
					var children = childrenGroups.shift() || [];
					var rows = [[]];
					var top = 0;
					var c=0;
					var $c;
					for ( c=0; c<children.length; c++ ) {
						$c = $(children[c]);
						var i;
						if ( top != $c.offset().top ) {
							for ( i=0; i<rows.length; i++ ) if ( !$(rows[i]).hasClass("fixedHeight") || i_force ) $(rows[i]).sameHeight().addClass("fixedHeight");
							rows = [[]];
							top = $c.offset().top;
							for ( i=0; i<childrenGroups.length; i++ ) rows.push([]);
						}
						rows[0].push(children[c]);
						for ( i=0; i<childrenGroups.length; i++ ) {
							rows[i+1].push(childrenGroups[i][c]);
						}
					}
					if ( rows[0] && rows[0].length ) for ( i=0; i<rows.length; i++ ) $(rows[i]).sameHeight();
					_addParent( this );
				});
				return this;
			};
			function _addParent( i_parent ) {
				for ( var i=0, len=parents.length; i<len; i++ ) {
					if ( parents[i] == i_parent ) return;
				}
				parents.push(i_parent);
			}
			$.fn.sameHeight = function() {
				var maxHeight = 0;
				this.css("height","auto");
				this.each(function(){
					if ( $(this).height() > maxHeight ) maxHeight = $(this).height();
				});
				return this.height(maxHeight);
			};
			$.checkFixHeight = function( i_force ) {
				if ( $fontSizeDiv.height() == textHeight && i_force !== true ) return;
				textHeight = $fontSizeDiv.height();
				if ( parents.length ) $(parents).fixHeight( i_force );
			}
			function init() {
				if ( isInitialized ) return;
				isInitialized = true;
				$fontSizeDiv = $('body').append($.parseHTML('<div style="position:absolute; top:-3em; left:0; padding-top:1em; height:0; line-height:2; overflow:hidden;">s</div>'));
				setInterval($.checkFixHeight,1000);
				$.checkFixHeight();
				$(window).on("resize",$.checkFixHeight);
				$(window).on("load",$.checkFixHeight);
			}
			function getChildren( i_parent ) {
				var $parent = $( i_parent );
				var childrenGroups = [];
				var $children = $parent.find(".fixHeightChild");
				if ( $children.length ) childrenGroups.push( $children );
				var $groupedChildren = $parent.find("*[class*='fixHeightChild']:not(.fixHeightChild)");
				if ( $groupedChildren.length ) {
					var classNames = {};
					$groupedChildren.each(function(){
						var a = $(this).attr("class").split(" ");
						var i;
						var l = a.length;
						var c;
						for ( i=0; i<l; i++ ) {
							c = a[i].match(/fixHeightChild[a-z0-9_-]+/i);
							if ( !c ) continue;
							c = c.toString();
							if ( c ) classNames[c] = c;
						}
					});
					for ( var c in classNames ) childrenGroups.push( $parent.find("."+c) );
				}
				if ( !childrenGroups.length ) {
					$children = $parent.children();
					if ( $children.length ) childrenGroups.push( $children );
				}
				return childrenGroups;
			}
			$(document).ready(function(){
				$(".fixHeight").fixHeight();
			});
		},
		//プレースホルダー
		placeholder: function(options) {
			var c = $.extend({
				selector: '.placeholder',
				hintClass: 'active'
			}, options);
			$(c.selector).each(function() {
				var _this = this;
				if ($(this).attr('title')) {
					$(this).focus(function() {
						if ($(this).val() == $(this).attr('title')) {
							$(this).val('').removeClass(c.hintClass);
						}
					}).blur(function() {
						if (!$(this).val()) {
							$(this).addClass(c.hintClass).val($(this).attr('title'));
						}
					}).closest('form').submit(function() {
						if ($(_this).val() == $(this).attr('title')) {
							$(_this).val('');
						}
					});
					if (!$(this).val()) {
						$(this).addClass(c.hintClass).val($(this).attr('title'));
					}
				}
			});
		},
		//トグル表示
		toggleBox: function(options) {
			var c = $.extend({
				selector: '.toggle dt',
				displayType: 'show',//hide,show
				toggleClass: 'active',
				toggleType: 'slide',//fade,slide
				speed: 'normal'
			}, options);
			//要素を非表示
			$(c.selector).each(function() {
				if (c.displayType == 'hide') {
					$(this).next().hide();
				} else if (c.displayType == 'show') {
					$(this).addClass(c.toggleClass).next().show();
				}
			});
			$(c.selector).on("click", function() {
				$(this).toggleClass(c.toggleClass);
				if (c.toggleType == 'fade') {
					$(this).next().fadeToggle(c.speed);
				} else if (c.toggleType == 'slide') {
					$(this).next().slideToggle(c.speed);
				}
			});
		}
	};
})(jQuery);
