#luck2.js 1.1(yuga.js TT Custom customized plugin)

通称、らくらくjsです。(\*´ω｀\*)
もっとhtmlに手を加えず簡単にWebサイトが作れないか。  
というのをコンセプトに制作させていただきました。  

このプラグインは**[yuga.js TT Custom](http://etc.dounokouno.com/yuga.js-TT-Custom/)**の改変にあたります。  
そのため主な機能説明は差分のみとさせて頂きます。  
基本的な使い方は変わっておりませんので、製作者様の  
マニュアルも参考にしていただくようお願いします。  

**yuga.js TT Custom - yuga.jsの個人的なカスタマイズ**  
<http://etc.dounokouno.com/yuga.js-TT-Custom/>


##Change Log
####2014/12/21 ver 1.1
初期設定がカスタマイズ加えた状態になっている箇所があったので、デフォルトに変更。
Readmeに少しだけ加筆。

####2014/11/24 ver 1.0
公開版リリース  
**.placeholder**の追加  
**.fixHeight**を最新版のver2.1に変更 - STARRYWORKS様 最新版のご提供ありがとうございました  
**.toggleBox**の機能を増やしすぎたのでシンプルに

####2014/05/29 ver 0.7  
動作の高速化、コードの軽量化  
**.popup**を削除

####2014/03/25 ver 0.6  
**.child**の``.andSelf``を使った記述を``.addBack``に変更  
**.tab**でリンクの末尾に?[tabのID名]を付けてクエリを設定した場合、  
ページ表示時に該当タブがクリックされた状態になるように変更  
**.fixHeight**をjQuery1.9.1でも動作するように修正  
**.autoCurrent**のオプション``rootDir``の仕様変更（ドメイン以降の/判定になったのでわかりやすく）

####2014/02/25 ver 0.5  
**.scroll**を``name``属性に対応した際にie6で動作しなかった不具合を修正  
こちらの記事を参考にブラウザ判定のコードを追加させて頂きました  
<https://w3g.jp/blog/tools/js_browser_sniffing>

####2014/02/20 ver 0.4
**.icon**をie7以下で複数行表示した場合に対応。word関連ファイルのアイコン表示に拡張子.rtfを追加

####2014/01/27 ver 0.3
**.scroll**を``name``属性に対応  
**.child**の``odd``を単体表示時にも振られるように修正

####2013/12/20 ver 0.2
**.child**の``odd``,``even``,``nth-child``で稀にclassが振られなくなる不具合を修正

####2013/08/06 ver 0.1
**.autoCurrent**のオプション（``rootDir``,``gNavCurrentType``）を追加  
**.externalLink**,**.icon**の動作をURLのスキームを省略して、リンクを//から始めた場合に対応

####2013/05/11 ver 0.0 β版リリース


##License
**MIT License**  
<http://www.opensource.org/licenses/mit-license.php>

プラグインに組み込んでいる**yuga.js TT Custom**,**fixHeight.js**  
についてもすべて**[MIT License](http://www.opensource.org/licenses/mit-license.php)**となっています。


##Operation Check
####jQuery
* ver 1.8.2  
* ver 1.9.1

####検証ブラウザ
**Windows**  
* IE 6(IE Tester, Vatual PC XP)  
* IE 7(IE Tester, Vatual PC XP)  
* IE 8(IE Tester, Vatual PC XP)  
* IE 9(IE Tester)  
* IE 10  
* IE 11  
* Firefox 25  
* Safari 5.1  
* Chrome 33  
* Opera 11.6

**iPhone**
* ios7

**iPad**
* ios7


##Description of Change
以下は**yuga.js TT Custom**からの主な変更点になります。


####共通の変更点
classなどの記述をキャメルケースに変更。  
完全に好みの問題じゃないか。(´・ω・`)


####機能別の変更点
* .rollover（そのまま）  
* .externalLink（変更）  
* .category（削除） → .autoCurrent（追加）  
* .scroll（変更）  
* .tab（変更）  
* .child（変更）  
* .icon（変更）  
* .heightLine（削除） → .fixHeight（追加）  
* .toggleBox（変更）  
* .placeholder（追加）  
* .popup（削除）


##Howto
**jquery.js**,**lack2.js**を以下の順に読み込んでください。  
利用しない機能については、個別にコメントアウトまたは削除してください。  
```ruby
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/luck2.js"></script>
```
*1 html,xhtmlの場合の記述例です。

**.autoCurrent**,**.child**,**.icon**などの機能は、
レンダリング及びサイトパフォーマンスに影響してきますので、
利用しない場合は積極的にコメントアウトしてください。

**.icon**,**.child**については対象ブラウザがIE9以上の場合はCSSのみで完全対応が
可能なため該当する場合は切ってしまっていいと思います。
（**.icon**に関しては、``.icoNone``による除外設定が不要で、ファイル名の後方一致と、
テキストの後ろ側にアイコンを配置する必要性がなければ、CSSのみでIE7から対応可）

**.placeholder**については対象ブラウザがIE10以上かつhtml5の場合は、
通常の``placeholder``属性で対応が可能です。

###.externalLink
URLのスキームを省略して、リンクを//から始めた場合に対応しました。

###.scroll
id属性以外に、name属性によるスクロールも対応しました。（主に旧CMSのwysiwygエディタで設定されるアンカーリンク対策）  
また、スマートフォンでのスムーススクロールに対応しました。

###.autoCurrent
グローバルナビゲーションとサブナビゲーションに自動的なカレント表示（現在地表示）を行います。  
（URL判定による完全自動カレント、またはCSSシグネチャによるページ制作時に、  
bodyタグに指定するidを利用してカレントを行う方法の2種類から撰択出来ます。）


####基本設定
```ruby
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
```

```ruby
currentClass: 'active',
```
自動カレント表示時にナビゲーションにかかるclass名を指定できます。

```ruby
currentImagePostfix: '_on',
```
ナビゲーション画像に付加するポストフィクスを指定できます。


####グローバルナビゲーションのカレント表示
画像とCSSロールオーバー、両方に対応しています。

使い始める前に動作タイプの設定を行ってください。  
後述の``gNavCurrentType: 'signature'``を設定の場合は、グローバルナビゲーションで使用する  
セレクタの指定と、グローバルナビゲーションのカテゴリで``body``タグに指定する``id``を配列に入力してください。

```ruby
gNavCurrentType: 'signature',
```
**auto**　URL判定による完全自動カレント表示。  
**signature**　CSSシグネチャを利用して、カレント表示を行う。（ナビゲーションにトップページ以外の  
ルート直下のページが含まれるとき、サイトルートとトップページが異なるがナビゲーションに  
トップページへのリンクを含めたいなど、通常と違うサイト構造で運用される可能性がある場合はこちらの設定を推奨。  
どんなサイト構造になっても確実に動作させたい場合や、CSSシグネチャを普段から利用している場合にオススメ。）

```ruby
gNavSelector: '#gNav',
```
グローバルナビゲーションのセレクタを記述してください。複数のセレクタを選択することも可能です。

```ruby
gNavList: ['top','about','works','service','contact'],
```
``gNavCurrentType: 'signature',``を選択した場合のみ、  
カテゴリで``body``タグに指定する``id``をグローバルナビゲーションの順番  
（htmlのソースコード順）に記述してください。


####サブナビゲーションのカレント表示
CSSロールオーバーのみの対応となりますので、画像を使いたい場合は背景画像指定の  
ロールオーバーを利用してください。

``a``タグの``href``と、現在開いているファイルパスで判定します。  
リンクはすべてトップページからの相対パスか絶対パス、ルートパスで指定してください。

```ruby
sNavSelector: '.snavList',
```
サブナビゲーションのセレクタを記述してください。

```ruby
sNavNestElement: 'ul'
```
ネストさせるときに使用するタグ、セレクタ等を記述してください。  
プラグインによって非表示になりますが、js読み込みまでの時間差があるため、  
CSSで``display:none;``を設定しておくことを推奨します。

```ruby
<ul class="snavList">
<li><a href="../product/index.html">ほげ01</a></li>
<li><a href="../product/hoge02.html">ほげ02</a>
	<ul>
	<li><a href="../product/hoge02/index.html">こげこげ01</a></li>
	<li><a href="../product/hoge02/kogekoge02.html">こげこげ02</a></li>
	<li><a href="../product/hoge02/kogekoge03.html">こげこげ03</a></li>
	<li><a href="../product/hoge02/kogekoge04.html">こげこげ04</a></li>
	<ul>
</li>
<li><a href="../product/hoge03.html">ほげ03</a></li>
<li><a href="../product/hoge04.html">ほげ04</a></li>
<li><a href="../product/hoge05.html">ほげ05</a>
	<ul>
	<li><a href="../product/hoge05/index.html">とげとげ01</a></li>
	<li><a href="../product/hoge05/togetoge02.html">とげとげ02</a>
		<ul>
		<li><a href="../product/hoge05/togetoge02/index.html">なげなげ01</a></li>
		<li><a href="../product/hoge05/togetoge02/nagenage02.html">なげなげ02</a></li>
		<ul>
	</li>
	<li><a href="../product/hoge05/togetoge03.html">とげとげ03</a>
		<ul>
		<li><a href="../product/hoge05/togetoge03/index.html">しょげしょげ01</a></li>
		<li><a href="../product/hoge05/togetoge03/syogesyoge02.html">しょげしょげ02</a></li>
		<li><a href="../product/hoge05/togetoge03/syogesyoge03.html">しょげしょげ03</a></li>
		<ul>
	</li>
	<ul>
</li>
<li><a href="../product/hoge06.html">ほげ06</a></li>
</ul>
```

サブナビゲーションは上記のようにコーディングします。*2  
リンクはトップページを基準にした相対パスで記述するか、  
絶対パス、ルートパスで記述してください。  
また現在いるページに属さないネストされたナビゲーション等は、  
自動的に非表示になります。

おなじカテゴリ内で同階層のページは、すべて同じソースコードにしてください。  
階層が変わってもパスだけ書き換えれば、ソースコードを使いまわせます。  
``body id``などの設定を含め、ここまで正しくコーディングが出来ていたら、  
現在いるページのサブナビゲーションが自動的にカレント表示になります。*3

*2 ソースコードは第2階層目の例です。プラグイン読み込み時は、  
``a``タグに自動でカレント表示の``class``が付加されます。


###.tab
リンクの末尾に?[tabのID名]を付けてクエリを設定した場合、
ページ表示時に該当タブがクリックされた状態になるように変更


###.child
yuga.jsのcss3classライクに``first-child``,``last-child``を子孫全てに指定、
またはTT customと同様に範囲を指定した子要素などに導入することが可能です。
デフォルトでは``first-child``,``last-child``はセレクタの子孫全てに、
``odd``,``even``,``nth-child``はセレクタ、タグの子要素で限定しています。

```ruby
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
```

```ruby
selector: '#wrap',
```
自動でクラスを付加させたい基本範囲を指定します。

```ruby
oeParentClass: '.oeParent,ul,ol,dl,table,tbody,tr',
```
``odd``,``even``のclassを適用させたいセレクタを指定してください。
``first-child``,``last-child``の表示方法をこちらにすることも可能です。
その場合は、以下のソースの``$(this)``の部分を``$(c.oeParentClass)``に
変更してください。

```ruby
//:first-child,:last-childをクラスとして追加
$(this).find(':first-child').addClass(c.firstChildClass);
$(this).find(':last-child').addClass(c.lastChildClass);
```

```ruby
nthParentClass: '.nthParent',
```
``nth-child``の``class``を適用させたいセレクタを指定してください。


またfirebugなどでソースを確認した際に、追加された``class``が
確認しやすいように、``first-child``,``last-child``を一番最後に
指定させていただきました。

付加されたclassは
``odd``,``even`` < ``nth-child()`` < ``nth-child(n)`` < ``first-child``,``last-child``
の順番で表示されます。

![luck2js .child firebug](http://imgur.com/bL6gccl.png)  

###.icon
URLのスキームを省略して、リンクを//から始めた場合に対応しました。
word関連ファイルのアイコン表示に拡張子``.rtf``を追加しました。

またIE7以下で複数行に渡る文章中にアイコン表示させた場合、通常はブラウザのバグで
意図したレンダリングと異なる表示になりますが、アイコン表示用の``span``タグを自動挿入することで
クロスブラウザ対応が出来るようになっています。

####Sassによるアイコン表示の記述例（IE7以下複数行対応）
以下の例ではデフォルトはアイコン後方配置です。
``.icoFront``を指定することで、前方配置に切り替えるコードも記述しています。

```ruby
a.icoPdf {
	padding-right: 24px !important;
	background: url(../images/i_pdf.png) 100% 0.1em no-repeat;
	& > .bgFixFront {
		display: none;
	}
	& > .bgFixBack {
		margin-left:-0.3em;
		@extend a.icoPdf;
	}
	&.icoFront {
		background: url(../images/i_pdf.png) 0 0.1em no-repeat;
		padding-right: 0 !important;
		padding-left: 24px !important;
		& > .bgFixFront {
			margin-left:-0.3em;
			display: inline;
			@extend a.icoPdf.icoFront;
		}
		& > .bgFixBack {
			display: none;
		}
	}
}
a.icoWord {
	padding-right: 24px !important;
	background: url(../images/i_word.png) 100% 0.1em no-repeat;
	& > .bgFixFront {
		display: none;
	}
	& > .bgFixBack {
		@extend a.icoWord;
	}
	&.icoFront {
		background: url(../images/i_word.png) 0 0.1em no-repeat;
		padding-right: 0 !important;
		padding-left: 24px !important;
		& > .bgFixFront {
			display: inline;
			@extend a.icoWord.icoFront;
		}
		& > .bgFixBack {
			display: none;
		}
	}
}
a.icoExcel {
	padding-right: 24px !important;
	background: url(../images/i_excel.png) 100% 0.1em no-repeat;
	& > .bgFixFront {
		display: none;
	}
	& > .bgFixBack {
		@extend a.icoExcel;
	}
	&.icoFront {
		background: url(../images/i_excel.png) 0 0.1em no-repeat;
		padding-right: 0 !important;
		padding-left: 24px !important;
		& > .bgFixFront {
			@extend a.icoExcel.icoFront;
			display: inline;
		}
		& > .bgFixBack {
			display: none;
		}
	}
}
```

###.fixHeight
heightLine.jsの代替としてプラグインに同梱させていただきました。  
このプラグインの特徴は親要素に特定のクラスを指定することで、  
ボックスの高さを列ごとに自動で揃えてくれます。  
グループごとに高さを揃えることも、子要素の指定も可能です。  
また文字サイズやウィンドウサイズの変更にも対応しています。  
詳しい使い方は、こちらをご覧ください。

**複数のブロック要素の高さを揃えてくれる「fixHeight.js」をアップデートしました | BLOG | STARRYWORKS inc.**  
<http://www.starryworks.co.jp/blog/tips/fixheightjs.html>


###.toggleBox
初期の表示非表示、アクティブ時のclass名、  
トグルが動作する要素が指定可能です。  
またトグルの各種機能は、ネストした状態でも動作します。

```ruby
selector: '.toggle dt',
displayType: 'show',//hide,show
toggleClass: 'active',
toggleType: 'slide',//fade,slide
speed: 'normal'
```

```ruby
selector: '.toggle dt',
```
クリックでトグルさせたい要素を指定してください。

```ruby
displayType: 'show',//hide,show
```
表示非表示を指定できます。

```ruby
toggleClass: 'active',
```
アクティブ時のclass名を指定できます。

```ruby
toggleType: 'slide',//fade,slide
```
トグルが動作する際の挙動を指定できます。  
``slide``,``fade``から選ぶことができます。

```ruby
speed: 'normal'
```
動作スピードを指定できます。


###.placeholder
html5の``placeholder``属性を擬似的に再現できる機能です。

```ruby
selector: '.placeholder'
```
プレースホルダーを実装したい要素を指定します。

```ruby
hintClass: 'active'
```
アクティブ時のclass名を指定できます。


##Special thanks
**W3G,LLC.**  
<https://w3g.jp/>

**yuga.js :: Kyosuke.jp**  
<http://www.kyosuke.jp/yugajs/>

**どうのこうの**  
<http://dounokouno.com/>

**STARRYWORKS inc.**  
<http://www.starryworks.co.jp/blog/>



##Remarks
どういうわけか、制作に着手したときjQueryの知識はほとんどありませんでした。  
ガチでjQueryプラグインを書いたのが、はじめてなので不具合等があるかもしれません。  
バグ等を発見された方は、お手数ですがご連絡いただけますと幸いです。

リリースするのが遅すぎて、現在では過剰なくらいレガシィブラウザ対策成分が  
高めになっていますが、不要な場合はカスタマイズしてご利用頂ければと思います。

「こう書いたほうがコードがシンプルになるよ！もっと高速で軽くなるよ！」  
などのアドバイスや技術情報もお待ちしてます。(｀・ω・´)

<to&#109;&#111;ki.s&#97;&#119;a&#109;&#117;&#114;&#97;&#48;&#49;1&#56;&#64;&#103;&#109;ai&#108;.c&#111;m>
