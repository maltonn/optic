#これはなに
LTイベント@クックパッド OthloEvent#44 で行ったLTのソースコードです

#アクセス
##/display
スライドの画面です。
html/display.htmlの内容が表示されます
なお、パスワードでロックがかかっています。（イベントが終わり次第パスワードを公開します）

##/client
参加者の投票用画面です。
html/client.htmlが表示されます

##/comments
今までに送られてきたコメントが表示される・・はずです

#スライド
html/display.hrmlで編集できます。
##<section id="egg">..</section>
1つのsectionタグで一つのスライドです
sectinにはidを必ずつけてください。
##クラス
各sectionおよび、コンテンツに着けられるクラスは以下の通りです。
###.nonflex
デフォルトのdisplay:flexを解除します。中央構えでなくなります
###.horizonal
コンテンツを横並びにします
###.action
クリックで出現するコンテンツにつけます
###.half
画像につけることで、横幅が50%になります
###.one_third
画像につけることで、横幅が33%になります
###.quarter
画像につけることで、横幅が25%になります
###.align_left
左構えになります
###.above
上から降ってくるタイプのコンテンツです
javascriptで制御します
