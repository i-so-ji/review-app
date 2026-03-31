// ====================================================
// Google Apps Script - アンケート記録用
// ====================================================
// 【セットアップ手順】
// 1. https://docs.google.com/spreadsheets/ で新しいスプレッドシートを作成
// 2. 1行目に以下のヘッダーを入力：
//    A1: 日時 / B1: 星評価 / C1: サービス / D1: 初回・リピート
//    E1: きっかけ / F1: きっかけ（その他） / G1: アンケート（はい）
//    H1: アンケート（いいえ） / I1: 自由記載
// 3. メニューの「拡張機能」→「Apps Script」を開く
// 4. 既存のコードを全て削除し、以下のコードを貼り付けて保存
// 5. 「デプロイ」→「新しいデプロイ」→ 種類「ウェブアプリ」を選択
//    - 実行ユーザー：「自分」
//    - アクセスできるユーザー：「全員」
//    → 「デプロイ」をクリック
// 6. 表示されたURLをコピーし、アンケートアプリの設定画面に貼り付け
// ====================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
      data.starRating,
      data.services,
      data.visitType === 'first' ? '初めて利用' : '2回目以上',
      data.concerns,
      data.concernOtherText || '',
      data.yesAnswers,
      data.noAnswers,
      data.questionOtherText || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('アンケート記録APIが稼働中です')
    .setMimeType(ContentService.MimeType.TEXT);
}
