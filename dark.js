
(function () {
  "use strict";

  const ID = "dark-pro-panel";

  // Tránh tạo nhiều bảng khi chạy lại script
  if (document.getElementById(ID)) return;

  const style = document.createElement("style");
  style.textContent = `
    #${ID} {
      position: fixed;
      top: 80px;
      right: 10px;
      z-index: 2147483647;
      width: 210px;
      color: #f4f4f5;
      background: #111315;
      border: 1px solid #383b40;
      border-radius: 12px;
      overflow: hidden;
      font: 13px system-ui, sans-serif;
      box-shadow: 0 8px 24px #0009;
    }
    #${ID} * { box-sizing: border-box; }
    #${ID} .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      background: #1b1d20;
      font-weight: 800;
      letter-spacing: 1px;
    }
    #${ID} .body { padding: 12px; }
    #${ID} .row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
      color: #a1a1aa;
    }
    #${ID} .value { color: #f4f4f5; }
    #${ID} button {
      color: #fff;
      background: #292c31;
      border: 1px solid #484c54;
      border-radius: 8px;
      padding: 8px 10px;
      font: inherit;
      cursor: pointer;
      touch-action: manipulation;
    }
    #${ID} button:active { background: #454a53; }
    #${ID} .toggle { padding: 2px 9px; }
    #${ID} .kick {
      display: block;
      width: 100%;
      min-height: 48px;
      margin-top: 8px;
      background: #f4f4f5;
      color: #111315;
      border: 0;
      font-weight: 800;
      font-size: 15px;
    }
    #${ID} .note {
      margin-top: 10px;
      color: #a1a1aa;
      font-size: 11px;
      line-height: 1.5;
    }
    #${ID}.collapsed { width: 145px; }
    #${ID}.collapsed .body { display: none; }
  `;
  (document.head || document.documentElement).appendChild(style);

  const panel = document.createElement("section");
  panel.id = ID;
  panel.innerHTML = `
    <div class="head">
      <span>DARK PRO</span>
      <button class="toggle" type="button"
        aria-label="Thu gọn bảng">−</button>
    </div>
    <div class="body">
      <div class="row">
        <span>Script</span>
        <span class="value">Đã khởi tạo</span>
      </div>
      <div class="row">
        <span>Trang</span>
        <span class="value" id="dp-page"></span>
      </div>
      <button class="kick" type="button">⚽ SÚT BÓNG</button>
      <div class="note" role="status" aria-live="polite">
        Nút thử gửi phím Space. Chưa xác minh game nhận thao tác.
      </div>
    </div>
  `;

  (document.body || document.documentElement).appendChild(panel);

  panel.querySelector("#dp-page").textContent =
    location.hostname === "haxball.com" ? "HaxBall" : "Trang khác";

  panel.querySelector(".toggle").addEventListener("click", function () {
    const collapsed = panel.classList.toggle("collapsed");
    this.textContent = collapsed ? "+" : "−";
  });

  const kickButton = panel.querySelector(".kick");
  const note = panel.querySelector(".note");

  // Chỉ thử gửi sự kiện bàn phím thông thường.
  // Trình duyệt có thể không cho game nhận sự kiện tổng hợp này.
  function sendKey(type) {
    const event = new KeyboardEvent(type, {
      key: " ",
      code: "Space",
      bubbles: true,
      cancelable: true
    });

    document.dispatchEvent(event);
    window.dispatchEvent(new KeyboardEvent(type, {
      key: " ",
      code: "Space",
      bubbles: true,
      cancelable: true
    }));
  }

  kickButton.addEventListener("pointerdown", function (event) {
    event.preventDefault();
    sendKey("keydown");
    note.textContent =
      "Đã gửi thử phím Space; chưa xác nhận HaxBall nhận được.";
  });

  function releaseKey() {
    sendKey("keyup");
  }

  kickButton.addEventListener("pointerup", releaseKey);
  kickButton.addEventListener("pointercancel", releaseKey);
  kickButton.addEventListener("lostpointercapture", releaseKey);

  console.log("[Dark Pro] Panel đã khởi tạo.");
})();

