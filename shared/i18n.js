// Page strings for EN (default) / KO / JA. Elements opt in with data-i18n="key";
// data-i18n-html="key" allows inline markup (kbd, strong) from this dictionary only.
const STRINGS = {
  en: {
    "nav.features": "Features",
    "nav.how": "How it works",
    "nav.faq": "FAQ",
    "nav.download": "Download",
    "hero.eyebrow": "Screen capture for AI workflows",
    "hero.title": "Screenshots your AI can actually read.",
    "hero.sub": "Stillness replaces PrintScreen with a capture tool that resizes, compresses and reads the text in every shot for Claude, ChatGPT and Claude Code. Fewer tokens, clearer answers.",
    "cta.download": "Download for Windows",
    "cta.platform": "Windows 10 / 11 · x64",
    "cta.soon": "macOS and Linux are planned.",
    "cta.releases": "All releases",
    "release.loading": "Checking the latest version…",
    "release.ready": "v{version} · {size} MB",
    "release.error": "Opens the releases page",
    "toast.caption": "The notice you get after every capture",
    "out.title": "What your AI receives",
    "out.sub": "One capture produces a right-sized image and a Markdown file with the text in it.",
    "out.image": "Image",
    "out.sidecar": "Text sidecar (.md)",
    "out.original": "Original",
    "out.sent": "Sent",
    "feat.title": "Built for pasting into AI",
    "feat.tokens.t": "Token-aware sizing",
    "feat.tokens.d": "Shrinks each shot to the model's vision limit (Claude high-res 2576px or standard 1568px) and picks PNG for UI, JPEG for photos. No upscaling, no metadata.",
    "feat.ocr.t": "Text and tables, extracted",
    "feat.ocr.d": "Bundled PP-OCRv5 reads the text in your capture and saves it beside the image as Markdown, keeping the layout and turning tables into Markdown tables. Works offline.",
    "feat.annotate.t": "Annotate in place",
    "feat.annotate.d": "Numbered markers, boxes, arrows, text, redaction and mosaic, right on the frozen screen. Each marker is listed with its nearest line of text so the AI knows what you mean.",
    "feat.replace.t": "Takes over the OS shortcut",
    "feat.replace.d": "PrintScreen and Win+Shift+S open Stillness instead of Snipping Tool. Turn either one off at any time.",
    "feat.profiles.t": "Two output profiles",
    "feat.profiles.d": "Chat apps get the image on the clipboard. Claude Code gets the file path, ready to paste into the terminal.",
    "feat.text.t": "Copy text only",
    "feat.text.d": "Select a region and get only the recognized text on your clipboard. No image, nothing saved.",
    "how.title": "Three steps, no new habits",
    "how.1.t": "Press PrintScreen",
    "how.1.d": "Every monitor freezes at once, so menus and tooltips stay put.",
    "how.2.t": "Drag a region",
    "how.2.d": "A size label and magnifier help you select to the pixel. Hold Shift to annotate first.",
    "how.3.t": "Paste into your AI",
    "how.3.d": "The optimized image is already on your clipboard and saved to Pictures\\Stillness with a .md text file.",
    "keys.title": "Default shortcuts",
    "keys.capture": "Capture a region → clipboard + file",
    "keys.annotate": "Capture, then annotate",
    "keys.annotate.k": "Hold <kbd>Shift</kbd> while finishing the selection",
    "keys.text": "Copy text only (OCR)",
    "keys.cancel": "Cancel",
    "keys.cancel.k": "<kbd>Esc</kbd> or right-click",
    "faq.title": "Questions",
    "faq.smartscreen.q": "Windows SmartScreen warned me. Is it safe?",
    "faq.smartscreen.a": "The installer is not code-signed yet, so SmartScreen may show “Windows protected your PC”. Click <strong>More info → Run anyway</strong>. Automatic updates are signed with a minisign key so they cannot be tampered with.",
    "faq.admin.q": "Do I need administrator rights?",
    "faq.admin.a": "No. The installer runs for your user only, takes a few seconds and starts Stillness when it finishes. Open it from the Start menu after that.",
    "faq.privacy.q": "Are my screenshots uploaded anywhere?",
    "faq.privacy.a": "No. Capture, text recognition and compression all run on your PC.",
    "faq.update.q": "How do updates work?",
    "faq.update.a": "Stillness checks for new versions and shows a notice when one is ready. You can turn this off in Settings.",
    "faq.platform.q": "What about macOS and Linux?",
    "faq.platform.a": "Windows comes first. macOS and Linux support is planned.",
    "final.title": "Make your next screenshot count.",
    "footer.tag": "Stillness — screenshots, tuned for AI.",
    "cta.download.windows": "Download for Windows",
    "cta.download.macos": "Download for macOS",
    "cta.soon.windows": "Windows version coming soon",
    "cta.soon.macos": "macOS version coming soon",
    "cta.platform.windows": "Windows 10 / 11 · x64",
    "cta.platform.macos": "macOS 12+ · Apple silicon",
    "cta.altWindows": "Get the Windows version (v{version})",
    "rel.soon.windows": "The Windows version is on its way.",
    "rel.soon.macos": "The macOS version is on its way.",
    "nav.home": "Home",
    "rel.title": "Releases",
    "rel.sub": "Every version of Stillness, per operating system. Installed copies update themselves, so use this page to reinstall or roll back.",
    "rel.latest": "Latest",
    "rel.download": "Download",
    "rel.loading": "Loading versions…",
    "rel.error": "Couldn't load the version list. Please try again in a moment.",
    "rel.retry": "Try again",
    "rel.noNotes": "No change notes for this version.",
    "rel.feat": "New",
    "rel.fix": "Fix",
    "rel.notesLang": "Change notes are written in Korean.",
    "demo.clipboard": "Clipboard",
    "demo.textToast": "Text copied · {lines} lines · {chars} chars",
    "scene.caption": "PrintScreen → drag → annotate → paste. That is the whole workflow.",
    "theme.toggle": "Toggle dark mode",
    "stat.limit": "Longest edge sent to Claude (high-res)",
    "stat.ocr": "Text recognition, fully on-device",
    "stat.upload": "Screenshots uploaded anywhere",
  },
  ko: {
    "nav.features": "기능",
    "nav.how": "사용 방법",
    "nav.faq": "자주 묻는 질문",
    "nav.download": "다운로드",
    "hero.eyebrow": "AI 작업을 위한 화면 캡처",
    "hero.title": "AI가 제대로 읽는 스크린샷.",
    "hero.sub": "Stillness 는 PrintScreen 을 대신해, Claude · ChatGPT · Claude Code 에 보낼 캡처를 알맞은 크기로 줄이고 압축하고 글자까지 읽어 둡니다. 토큰은 적게, 답은 정확하게.",
    "cta.download": "Windows용 다운로드",
    "cta.platform": "Windows 10 / 11 · x64",
    "cta.soon": "macOS 와 Linux 는 지원 예정입니다.",
    "cta.releases": "전체 릴리스",
    "release.loading": "최신 버전 확인 중…",
    "release.ready": "v{version} · {size} MB",
    "release.error": "릴리스 페이지로 이동합니다",
    "toast.caption": "캡처할 때마다 뜨는 알림",
    "out.title": "AI가 받는 것",
    "out.sub": "한 번 캡처하면 알맞은 크기의 이미지와, 그 속 글자를 담은 마크다운 파일이 함께 생깁니다.",
    "out.image": "이미지",
    "out.sidecar": "텍스트 사이드카 (.md)",
    "out.original": "원본",
    "out.sent": "전송본",
    "feat.title": "AI에 붙여 넣기 위해 만들었습니다",
    "feat.tokens.t": "토큰을 아는 크기 조정",
    "feat.tokens.d": "모델의 비전 한도(Claude 고해상도 2576px / 표준 1568px)에 맞춰 줄이고, UI 는 PNG·사진은 JPEG 를 고릅니다. 확대도, 메타데이터도 없습니다.",
    "feat.ocr.t": "글자와 표까지 추출",
    "feat.ocr.d": "내장 PP-OCRv5 가 캡처 속 글자를 읽어 이미지 옆에 마크다운으로 저장합니다. 레이아웃을 살리고 표는 마크다운 표로. 오프라인에서도 동작합니다.",
    "feat.annotate.t": "그 자리에서 주석",
    "feat.annotate.d": "번호 마커·박스·화살표·텍스트·가리기·모자이크를 멈춘 화면 위에 바로. 마커마다 가장 가까운 글줄을 함께 적어 AI 가 어디를 말하는지 압니다.",
    "feat.replace.t": "OS 단축키를 대신",
    "feat.replace.d": "PrintScreen 과 Win+Shift+S 가 캡처 도구 대신 Stillness 를 엽니다. 각각 언제든 끌 수 있습니다.",
    "feat.profiles.t": "두 가지 출력 프로필",
    "feat.profiles.d": "채팅 앱에는 클립보드 이미지로, Claude Code 에는 터미널에 바로 붙여 넣을 파일 경로로.",
    "feat.text.t": "글자만 복사",
    "feat.text.d": "영역을 고르면 인식한 글자만 클립보드로. 이미지도, 저장 파일도 없습니다.",
    "how.title": "세 단계, 새로 익힐 것 없이",
    "how.1.t": "PrintScreen 누르기",
    "how.1.d": "모든 모니터가 즉시 멈춰서 메뉴와 툴팁도 그대로 남습니다.",
    "how.2.t": "영역 드래그",
    "how.2.d": "크기 라벨과 돋보기로 픽셀 단위까지. Shift 를 누르면 주석부터 답니다.",
    "how.3.t": "AI에 붙여 넣기",
    "how.3.d": "최적화된 이미지가 이미 클립보드에 있고, 사진\\Stillness 에 .md 텍스트 파일과 함께 저장됩니다.",
    "keys.title": "기본 단축키",
    "keys.capture": "영역 캡처 → 클립보드 + 파일",
    "keys.annotate": "캡처 후 주석 달기",
    "keys.annotate.k": "<kbd>Shift</kbd> 를 누른 채 선택 끝내기",
    "keys.text": "글자만 복사 (OCR)",
    "keys.cancel": "취소",
    "keys.cancel.k": "<kbd>Esc</kbd> 또는 우클릭",
    "faq.title": "자주 묻는 질문",
    "faq.smartscreen.q": "SmartScreen 경고가 떠요. 안전한가요?",
    "faq.smartscreen.a": "아직 코드 서명을 하지 않아 “Windows의 PC 보호” 창이 뜰 수 있습니다. <strong>추가 정보 → 실행</strong>을 누르세요. 자동 업데이트 파일은 minisign 키로 서명해 변조를 막습니다.",
    "faq.admin.q": "관리자 권한이 필요한가요?",
    "faq.admin.a": "아니요. 현재 사용자에게만 몇 초 만에 설치되고, 끝나면 Stillness 가 바로 실행됩니다. 이후에는 시작 메뉴에서 여세요.",
    "faq.privacy.q": "스크린샷이 어딘가로 업로드되나요?",
    "faq.privacy.a": "아니요. 캡처·글자 인식·압축은 모두 내 PC 에서 처리됩니다.",
    "faq.update.q": "업데이트는 어떻게 되나요?",
    "faq.update.a": "새 버전이 나오면 Stillness 가 알림을 띄웁니다. 설정에서 끌 수 있습니다.",
    "faq.platform.q": "macOS 와 Linux 는요?",
    "faq.platform.a": "Windows 가 먼저입니다. macOS 와 Linux 는 지원 예정입니다.",
    "final.title": "다음 스크린샷부터 달라집니다.",
    "footer.tag": "Stillness — AI를 위한 스크린샷.",
    "cta.download.windows": "Windows용 다운로드",
    "cta.download.macos": "macOS용 다운로드",
    "cta.soon.windows": "Windows 버전 준비 중",
    "cta.soon.macos": "macOS 버전 준비 중",
    "cta.platform.windows": "Windows 10 / 11 · x64",
    "cta.platform.macos": "macOS 12 이상 · Apple 실리콘",
    "cta.altWindows": "Windows 버전 받기 (v{version})",
    "rel.soon.windows": "Windows 버전을 준비하고 있습니다.",
    "rel.soon.macos": "macOS 버전을 준비하고 있습니다.",
    "nav.home": "홈",
    "rel.title": "릴리스",
    "rel.sub": "운영체제별 Stillness 의 모든 버전입니다. 설치된 앱은 스스로 업데이트되니, 다시 설치하거나 이전 버전으로 돌아갈 때 쓰세요.",
    "rel.latest": "최신",
    "rel.download": "다운로드",
    "rel.loading": "버전 목록을 불러오는 중…",
    "rel.error": "버전 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
    "rel.retry": "다시 시도",
    "rel.noNotes": "이 버전은 변경 사항 기록이 없습니다.",
    "rel.feat": "추가",
    "rel.fix": "수정",
    "rel.notesLang": "",
    "demo.clipboard": "클립보드",
    "demo.textToast": "텍스트 복사됨 · {lines}줄 · {chars}자",
    "scene.caption": "PrintScreen → 드래그 → 주석 → 붙여 넣기. 이게 전부입니다.",
    "theme.toggle": "다크 모드 전환",
    "stat.limit": "Claude 고해상도 기준 긴 변",
    "stat.ocr": "글자 인식, 전부 내 PC 에서",
    "stat.upload": "외부로 업로드되는 스크린샷",
  },
  ja: {
    "nav.features": "機能",
    "nav.how": "使い方",
    "nav.faq": "よくある質問",
    "nav.download": "ダウンロード",
    "hero.eyebrow": "AI ワークフローのための画面キャプチャ",
    "hero.title": "AI がちゃんと読めるスクリーンショット。",
    "hero.sub": "Stillness は PrintScreen の代わりに、Claude・ChatGPT・Claude Code に送るキャプチャを最適なサイズに縮小・圧縮し、文字まで読み取ります。トークンは少なく、答えは的確に。",
    "cta.download": "Windows 版をダウンロード",
    "cta.platform": "Windows 10 / 11 · x64",
    "cta.soon": "macOS と Linux は対応予定です。",
    "cta.releases": "すべてのリリース",
    "release.loading": "最新バージョンを確認中…",
    "release.ready": "v{version} · {size} MB",
    "release.error": "リリースページを開きます",
    "toast.caption": "キャプチャのたびに表示される通知",
    "out.title": "AI が受け取るもの",
    "out.sub": "1 回のキャプチャで、最適なサイズの画像と、その中の文字を収めた Markdown ファイルが作られます。",
    "out.image": "画像",
    "out.sidecar": "テキスト (.md)",
    "out.original": "元画像",
    "out.sent": "送信用",
    "feat.title": "AI に貼り付けるために設計",
    "feat.tokens.t": "トークンを意識したサイズ調整",
    "feat.tokens.d": "モデルの画像上限(Claude 高解像度 2576px / 標準 1568px)に合わせて縮小し、UI は PNG、写真は JPEG を自動で選びます。拡大もメタデータもなし。",
    "feat.ocr.t": "文字も表も抽出",
    "feat.ocr.d": "内蔵の PP-OCRv5 がキャプチャ内の文字を読み取り、レイアウトを保った Markdown として画像の隣に保存。表は Markdown の表に。オフラインで動作します。",
    "feat.annotate.t": "その場で注釈",
    "feat.annotate.d": "番号マーカー・枠・矢印・テキスト・黒塗り・モザイクを、止めた画面の上で直接。各マーカーには最も近い行の文字が添えられ、AI に意図が伝わります。",
    "feat.replace.t": "OS のショートカットを置き換え",
    "feat.replace.d": "PrintScreen と Win+Shift+S で Snipping Tool の代わりに Stillness が開きます。それぞれいつでもオフにできます。",
    "feat.profiles.t": "2 つの出力プロファイル",
    "feat.profiles.d": "チャットアプリには画像をクリップボードへ。Claude Code にはターミナルにそのまま貼れるファイルパスを。",
    "feat.text.t": "文字だけコピー",
    "feat.text.d": "範囲を選ぶと、認識した文字だけをクリップボードへ。画像も保存ファイルもありません。",
    "how.title": "3 ステップ、覚えることなし",
    "how.1.t": "PrintScreen を押す",
    "how.1.d": "すべてのモニターが瞬時に止まるので、メニューやツールチップもそのまま残ります。",
    "how.2.t": "範囲をドラッグ",
    "how.2.d": "サイズ表示と拡大鏡でピクセル単位まで。Shift を押せば先に注釈を付けられます。",
    "how.3.t": "AI に貼り付け",
    "how.3.d": "最適化された画像はもうクリップボードにあり、.md テキストと一緒に ピクチャ\\Stillness に保存されています。",
    "keys.title": "デフォルトのショートカット",
    "keys.capture": "範囲キャプチャ → クリップボード + ファイル",
    "keys.annotate": "キャプチャして注釈",
    "keys.annotate.k": "<kbd>Shift</kbd> を押しながら選択を終える",
    "keys.text": "文字だけコピー (OCR)",
    "keys.cancel": "キャンセル",
    "keys.cancel.k": "<kbd>Esc</kbd> または右クリック",
    "faq.title": "よくある質問",
    "faq.smartscreen.q": "SmartScreen の警告が出ました。安全ですか?",
    "faq.smartscreen.a": "インストーラーはまだコード署名していないため、「Windows によって PC が保護されました」と表示されることがあります。<strong>詳細情報 → 実行</strong> を押してください。自動更新ファイルは minisign 鍵で署名され、改ざんを防ぎます。",
    "faq.admin.q": "管理者権限は必要ですか?",
    "faq.admin.a": "いいえ。現在のユーザーにだけ数秒でインストールされ、終わると Stillness が起動します。その後はスタートメニューから開いてください。",
    "faq.privacy.q": "スクリーンショットはどこかにアップロードされますか?",
    "faq.privacy.a": "いいえ。キャプチャ・文字認識・圧縮はすべてお使いの PC 上で処理されます。",
    "faq.update.q": "アップデートはどうなりますか?",
    "faq.update.a": "新しいバージョンが出ると Stillness が通知します。設定でオフにできます。",
    "faq.platform.q": "macOS と Linux は?",
    "faq.platform.a": "まずは Windows から。macOS と Linux は対応予定です。",
    "final.title": "次のスクリーンショットから変わります。",
    "footer.tag": "Stillness — AI のためのスクリーンショット。",
    "cta.download.windows": "Windows 版をダウンロード",
    "cta.download.macos": "macOS 版をダウンロード",
    "cta.soon.windows": "Windows 版は準備中",
    "cta.soon.macos": "macOS 版は準備中",
    "cta.platform.windows": "Windows 10 / 11 · x64",
    "cta.platform.macos": "macOS 12 以降 · Apple シリコン",
    "cta.altWindows": "Windows 版を入手 (v{version})",
    "rel.soon.windows": "Windows 版は準備中です。",
    "rel.soon.macos": "macOS 版は準備中です。",
    "nav.home": "ホーム",
    "rel.title": "リリース",
    "rel.sub": "OS ごとの Stillness の全バージョンです。インストール済みのアプリは自動で更新されるので、再インストールや以前のバージョンに戻すときに使ってください。",
    "rel.latest": "最新",
    "rel.download": "ダウンロード",
    "rel.loading": "バージョンを読み込み中…",
    "rel.error": "バージョン一覧を読み込めませんでした。しばらくしてからもう一度お試しください。",
    "rel.retry": "再試行",
    "rel.noNotes": "このバージョンには変更履歴がありません。",
    "rel.feat": "新機能",
    "rel.fix": "修正",
    "rel.notesLang": "変更履歴は韓国語で書かれています。",
    "demo.clipboard": "クリップボード",
    "demo.textToast": "テキストをコピー · {lines} 行 · {chars} 文字",
    "scene.caption": "PrintScreen → ドラッグ → 注釈 → 貼り付け。これだけです。",
    "theme.toggle": "ダークモード切り替え",
    "stat.limit": "Claude 高解像度での長辺の上限",
    "stat.ocr": "文字認識はすべて端末内で",
    "stat.upload": "外部にアップロードされるスクリーンショット",
  },
};

// Inline SVG flags: emoji flags render as two letters on Windows.
const FLAGS = {
  en: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#fff"/><g fill="#b22234"><rect width="20" height="1.08"/><rect y="2.15" width="20" height="1.08"/><rect y="4.31" width="20" height="1.08"/><rect y="6.46" width="20" height="1.08"/><rect y="8.62" width="20" height="1.08"/><rect y="10.77" width="20" height="1.08"/><rect y="12.92" width="20" height="1.08"/></g><rect width="8.5" height="7.54" fill="#3c3b6e"/></svg>',
  ko: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#fff"/><g transform="rotate(33.7 10 7)"><path d="M6.6 7a3.4 3.4 0 0 1 6.8 0z" fill="#cd2e3a"/><path d="M6.6 7a3.4 3.4 0 0 0 6.8 0z" fill="#0047a0"/><circle cx="8.3" cy="7" r="1.7" fill="#cd2e3a"/><circle cx="11.7" cy="7" r="1.7" fill="#0047a0"/></g><g fill="#000"><g transform="rotate(-56.3 3.2 2.4)"><rect x="1.7" y="1.5" width="3" height=".5"/><rect x="1.7" y="2.2" width="3" height=".5"/><rect x="1.7" y="2.9" width="3" height=".5"/></g><g transform="rotate(-56.3 16.8 11.6)"><rect x="15.3" y="10.7" width="3" height=".5"/><rect x="15.3" y="11.4" width="3" height=".5"/><rect x="15.3" y="12.1" width="3" height=".5"/></g><g transform="rotate(56.3 16.8 2.4)"><rect x="15.3" y="1.5" width="3" height=".5"/><rect x="15.3" y="2.2" width="3" height=".5"/><rect x="15.3" y="2.9" width="3" height=".5"/></g><g transform="rotate(56.3 3.2 11.6)"><rect x="1.7" y="10.7" width="3" height=".5"/><rect x="1.7" y="11.4" width="3" height=".5"/><rect x="1.7" y="12.1" width="3" height=".5"/></g></g></svg>',
  ja: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#fff"/><circle cx="10" cy="7" r="4.2" fill="#bc002d"/></svg>',
};
const NAMES = { en: "English", ko: "한국어", ja: "日本語" };
const STORE_KEY = "stillness.lang";

let current = "en";

function t(key, vars = {}) {
  const s = STRINGS[current][key] ?? STRINGS.en[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

function apply(code) {
  current = STRINGS[code] ? code : "en";
  document.documentElement.lang = current;
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-html]").forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nLabel));
    el.title = t(el.dataset.i18nLabel);
  });
  document.querySelectorAll("[data-lang-current]").forEach((el) => {
    el.innerHTML = `${FLAGS[current]}<span>${current.toUpperCase()}</span>`;
    el.setAttribute("aria-label", NAMES[current]);
  });
  document.querySelectorAll("[data-lang-option]").forEach((el) => {
    el.setAttribute("aria-checked", String(el.dataset.langOption === current));
  });
  try { localStorage.setItem(STORE_KEY, current); } catch {}
  document.dispatchEvent(new CustomEvent("langchange", { detail: current }));
}

// Builds the flag dropdown inside every [data-lang-switch] container.
function mountSwitchers() {
  document.querySelectorAll("[data-lang-switch]").forEach((root) => {
    root.innerHTML = `
      <button type="button" class="lang-btn" aria-haspopup="menu" aria-expanded="false" data-lang-current></button>
      <div class="lang-menu" role="menu" hidden>
        ${Object.keys(STRINGS).map((code) => `
          <button type="button" role="menuitemradio" data-lang-option="${code}">
            ${FLAGS[code]}<span>${NAMES[code]}</span>
          </button>`).join("")}
      </div>`;
    const btn = root.querySelector(".lang-btn");
    const menu = root.querySelector(".lang-menu");
    const setOpen = (open) => {
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    };
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(menu.hidden);
    });
    menu.addEventListener("click", (e) => {
      const opt = e.target.closest("[data-lang-option]");
      if (!opt) return;
      apply(opt.dataset.langOption);
      setOpen(false);
      btn.focus();
    });
    document.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  });
}

mountSwitchers();
let saved = null;
try { saved = localStorage.getItem(STORE_KEY); } catch {}
// ?lang=ko overrides the saved choice, so a localized link can be shared.
apply(new URLSearchParams(location.search).get("lang") || saved || "en");
