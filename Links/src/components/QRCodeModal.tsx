import { X, Download, Share2, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { getAssetUrl } from '../utils/assets';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
  }
}

/**
 * Generates a high-resolution, cyber-brutalist branded poster for the QR code:
 * - Ambient background glow (#0C0C0C base)
 * - Corner HUD brackets & sleek border styling
 * - High-contrast QR code with High Error Correction (ecc=H)
 * - OAC Logo centered in the QR code with dual-ring badge
 * - Prominent "Odisha Anime Community" title & community badge below the QR code
 */
async function generateBrandedQRCodeBlob(
  url: string,
  qrImageUrl: string,
  logoUrl: string
): Promise<Blob> {
  const [qrImg, logoImg] = await Promise.all([
    loadImage(qrImageUrl),
    loadImage(logoUrl).catch(() => null),
  ]);

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1020;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas 2d context');

  // 1. Dark Base Background
  ctx.fillStyle = '#0C0C0C';
  ctx.fillRect(0, 0, 800, 1020);

  // 2. Ambient Cyber-Glows
  const redGlow = ctx.createRadialGradient(180, 180, 10, 180, 180, 320);
  redGlow.addColorStop(0, 'rgba(217, 21, 21, 0.24)');
  redGlow.addColorStop(1, 'rgba(217, 21, 21, 0)');
  ctx.fillStyle = redGlow;
  ctx.fillRect(0, 0, 800, 1020);

  const goldGlow = ctx.createRadialGradient(620, 820, 10, 620, 820, 320);
  goldGlow.addColorStop(0, 'rgba(243, 179, 52, 0.20)');
  goldGlow.addColorStop(1, 'rgba(243, 179, 52, 0)');
  ctx.fillStyle = goldGlow;
  ctx.fillRect(0, 0, 800, 1020);

  // 3. Outer Card Container with Rounded Border
  const cardX = 26;
  const cardY = 26;
  const cardW = 748;
  const cardH = 968;
  const cardR = 28;

  ctx.beginPath();
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, cardR);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 4. Cyberpunk Corner L-Brackets
  const bracketLen = 30;
  const bracketOffset = 38;
  ctx.lineWidth = 3.5;

  // Top-Left (Gold)
  ctx.strokeStyle = '#F3B334';
  ctx.beginPath();
  ctx.moveTo(bracketOffset, bracketOffset + bracketLen);
  ctx.lineTo(bracketOffset, bracketOffset);
  ctx.lineTo(bracketOffset + bracketLen, bracketOffset);
  ctx.stroke();

  // Top-Right (Gold)
  ctx.beginPath();
  ctx.moveTo(800 - bracketOffset - bracketLen, bracketOffset);
  ctx.lineTo(800 - bracketOffset, bracketOffset);
  ctx.lineTo(800 - bracketOffset, bracketOffset + bracketLen);
  ctx.stroke();

  // Bottom-Left (Crimson)
  ctx.strokeStyle = '#D91515';
  ctx.beginPath();
  ctx.moveTo(bracketOffset, 1020 - bracketOffset - bracketLen);
  ctx.lineTo(bracketOffset, 1020 - bracketOffset);
  ctx.lineTo(bracketOffset + bracketLen, 1020 - bracketOffset);
  ctx.stroke();

  // Bottom-Right (Crimson)
  ctx.beginPath();
  ctx.moveTo(800 - bracketOffset - bracketLen, 1020 - bracketOffset);
  ctx.lineTo(800 - bracketOffset, 1020 - bracketOffset);
  ctx.lineTo(800 - bracketOffset, 1020 - bracketOffset - bracketLen);
  ctx.stroke();

  // 5. Header Pill Badge: "OFFICIAL QR CODE"
  const pillW = 230;
  const pillH = 34;
  const pillX = (800 - pillW) / 2;
  const pillY = 54;
  ctx.beginPath();
  drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 17);
  ctx.fillStyle = 'rgba(217, 21, 21, 0.15)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(217, 21, 21, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = '700 13px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#F3B334';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🎌 OFFICIAL COMMUNITY QR', 400, pillY + pillH / 2);

  // 6. QR Code Frame Container (Nice Borders around QR Code)
  const qrBoxSize = 530;
  const qrBoxX = (800 - qrBoxSize) / 2;
  const qrBoxY = 110;
  const qrBoxR = 24;

  // Frame Background
  ctx.beginPath();
  drawRoundedRect(ctx, qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, qrBoxR);
  ctx.fillStyle = '#080808';
  ctx.fill();
  ctx.strokeStyle = 'rgba(243, 179, 52, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Inner Frame Accent
  ctx.beginPath();
  drawRoundedRect(ctx, qrBoxX + 8, qrBoxY + 8, qrBoxSize - 16, qrBoxSize - 16, qrBoxR - 6);
  ctx.strokeStyle = 'rgba(217, 21, 21, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // QR Frame Corner Accents
  const cornerMark = 22;
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#F3B334';
  // Top-Left
  ctx.beginPath();
  ctx.moveTo(qrBoxX + 16, qrBoxY + 16 + cornerMark);
  ctx.lineTo(qrBoxX + 16, qrBoxY + 16);
  ctx.lineTo(qrBoxX + 16 + cornerMark, qrBoxY + 16);
  ctx.stroke();
  // Top-Right
  ctx.beginPath();
  ctx.moveTo(qrBoxX + qrBoxSize - 16 - cornerMark, qrBoxY + 16);
  ctx.lineTo(qrBoxX + qrBoxSize - 16, qrBoxY + 16);
  ctx.lineTo(qrBoxX + qrBoxSize - 16, qrBoxY + 16 + cornerMark);
  ctx.stroke();
  // Bottom-Left
  ctx.strokeStyle = '#D91515';
  ctx.beginPath();
  ctx.moveTo(qrBoxX + 16, qrBoxY + qrBoxSize - 16 - cornerMark);
  ctx.lineTo(qrBoxX + 16, qrBoxY + qrBoxSize - 16);
  ctx.lineTo(qrBoxX + 16 + cornerMark, qrBoxY + qrBoxSize - 16);
  ctx.stroke();
  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(qrBoxX + qrBoxSize - 16 - cornerMark, qrBoxY + qrBoxSize - 16);
  ctx.lineTo(qrBoxX + qrBoxSize - 16, qrBoxY + qrBoxSize - 16);
  ctx.lineTo(qrBoxX + qrBoxSize - 16, qrBoxY + qrBoxSize - 16 - cornerMark);
  ctx.stroke();

  // 7. Draw the QR Image Inside
  const qrImgSize = 470;
  const qrImgX = (800 - qrImgSize) / 2;
  const qrImgY = qrBoxY + (qrBoxSize - qrImgSize) / 2;
  ctx.drawImage(qrImg, qrImgX, qrImgY, qrImgSize, qrImgSize);

  // 8. Draw Image Logo in Center of QR Code
  if (logoImg) {
    const centerBadgeX = 400;
    const centerBadgeY = qrBoxY + qrBoxSize / 2;
    const badgeRadius = 48;

    // Solid dark circular backdrop
    ctx.beginPath();
    ctx.arc(centerBadgeX, centerBadgeY, badgeRadius + 4, 0, Math.PI * 2);
    ctx.fillStyle = '#0C0C0C';
    ctx.fill();

    // Dual Gold & Crimson Rings
    ctx.beginPath();
    ctx.arc(centerBadgeX, centerBadgeY, badgeRadius + 2, 0, Math.PI * 2);
    ctx.strokeStyle = '#F3B334';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerBadgeX, centerBadgeY, badgeRadius - 2, 0, Math.PI * 2);
    ctx.strokeStyle = '#D91515';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Clip & draw logo with strictly preserved natural aspect ratio (object-fit: contain)
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerBadgeX, centerBadgeY, badgeRadius - 4, 0, Math.PI * 2);
    ctx.clip();

    const imgW = logoImg.naturalWidth || logoImg.width || 1;
    const imgH = logoImg.naturalHeight || logoImg.height || 1;
    const maxBound = (badgeRadius - 6) * 2; // 88px maximum bounding dimension
    const scale = Math.min(maxBound / imgW, maxBound / imgH);
    const drawW = Math.round(imgW * scale);
    const drawH = Math.round(imgH * scale);

    ctx.drawImage(
      logoImg,
      centerBadgeX - drawW / 2,
      centerBadgeY - drawH / 2,
      drawW,
      drawH
    );
    ctx.restore();
  }

  // 9. Mandatory Text Below QR Code: "Odisha Anime Community"
  const titleY = 672;
  ctx.font = '800 34px system-ui, -apple-system, sans-serif';
  const textPart1 = 'ODISHA ANIME ';
  const textPart2 = 'COMMUNITY';
  const w1 = ctx.measureText(textPart1).width;
  const w2 = ctx.measureText(textPart2).width;
  const startX = (800 - (w1 + w2)) / 2;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(textPart1, startX, titleY);
  ctx.fillStyle = '#F3B334';
  ctx.fillText(textPart2, startX + w1, titleY);

  // Subtitle: Odisha's Largest Anime Family
  ctx.font = '600 15px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#9CA3AF';
  ctx.textAlign = 'center';
  ctx.fillText("Odisha's Largest Anime Family • Est. Feb 13, 2020", 400, titleY + 46);

  // 10. URL Pill Tag
  const urlPillW = 390;
  const urlPillH = 40;
  const urlPillX = (800 - urlPillW) / 2;
  const urlPillY = titleY + 84;
  ctx.beginPath();
  drawRoundedRect(ctx, urlPillX, urlPillY, urlPillW, urlPillH, 20);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.font = '600 14px monospace';
  ctx.fillStyle = '#F3B334';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🔗 ' + url, 400, urlPillY + urlPillH / 2);

  // 11. Footer Branding
  ctx.font = '500 12px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Scan to explore official passes, registrations & community links', 400, 896);
  ctx.fillText('Made with ❤️ and ☕ by Odisha Anime Community and Crystal Studio Labs', 400, 922);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Canvas toBlob failed'));
    }, 'image/png');
  });
}

export default function QRCodeModal({ isOpen, onClose, url }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  // Use High Error Correction (ecc=H) so logo center overlay never impedes scanning
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(
    url
  )}&bgcolor=0C0C0C&color=F3B334&margin=16&ecc=H`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const logoUrl = getAssetUrl('/images/oac-logo-transparent.png');
      const blob = await generateBrandedQRCodeBlob(url, qrImageUrl, logoUrl);
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Odisha-Anime-Community-QR.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Branded QR generation error, falling back to raw download:', err);
      try {
        const response = await fetch(qrImageUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'Odisha-Anime-Community-QR.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch {
        window.open(qrImageUrl, '_blank');
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Scan or Share QR Code"
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[92vw] sm:max-w-sm rounded-3xl bg-[#121212] border border-white/10 p-4 xs:p-5 sm:p-6 shadow-2xl overflow-hidden animate-scale-in max-h-[92dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top glow ambient effect */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-[#D91515]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-[#F3B334]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 xs:top-4 xs:right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mt-2 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D91515]/10 border border-[#D91515]/30 text-[#F3B334] text-[11px] xs:text-xs font-semibold mb-2 xs:mb-3">
            <span>OFFICIAL QR CODE</span>
          </div>
          <h3 className="font-display text-xl xs:text-2xl text-white tracking-wide">
            SCAN TO CONNECT
          </h3>
          <p className="text-[11px] xs:text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            Scan at anime conventions, meetups, or screen share to open our official community hub
          </p>
        </div>

        {/* QR Code Container with Cyber-HUD Corners and Nice Borders */}
        <div className="mt-4 xs:mt-5 p-3.5 xs:p-4 rounded-2xl bg-[#080808] border border-[#F3B334]/30 flex flex-col items-center justify-center shadow-inner relative group">
          {/* Cyber HUD Corner Accents */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#F3B334]" />
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#F3B334]" />
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D91515]" />
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D91515]" />

          <div className="relative w-44 h-44 xs:w-52 xs:h-52 sm:w-56 sm:h-56 rounded-xl overflow-hidden bg-[#0C0C0C] flex items-center justify-center aspect-square border border-white/5">
            <img
              src={qrImageUrl}
              alt="Odisha Anime Community Official QR Code"
              className="w-full h-full object-contain"
              loading="eager"
            />
            {/* Center Logo watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-[#0C0C0C] border-2 border-[#F3B334] p-1 shadow-lg ring-1 ring-[#D91515]/60 flex items-center justify-center">
                <img
                  src={getAssetUrl('/images/oac-logo-transparent.png')}
                  alt="OAC"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Branded Label below QR code */}
          <div className="mt-3 text-center">
            <p className="font-display text-xs xs:text-sm font-bold text-white tracking-wide">
              ODISHA ANIME <span className="text-[#F3B334]">COMMUNITY</span>
            </p>
            <p className="text-[10px] xs:text-[11px] font-mono text-gray-400 mt-0.5 truncate max-w-[220px] xs:max-w-[240px]">
              {url}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 xs:gap-3 mt-4 xs:mt-5">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 xs:gap-2 py-2.5 px-3 xs:px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors active:scale-95 min-h-[42px]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Copied URL!' : 'Copy Link'}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center justify-center gap-1.5 xs:gap-2 py-2.5 px-3 xs:px-4 rounded-xl bg-[#D91515] hover:bg-[#F3B334] text-white hover:text-[#0C0C0C] text-xs font-semibold transition-all shadow-glow-red active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed min-h-[42px]"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download QR</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
