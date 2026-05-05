'use client';

import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Silhouette from '@/components/Silhouette';
import { Lang, t } from '@/i18n/translations';
import { VAULT_SPECIMENS, TOTAL_SPECIMENS, VaultSpecimen, GrainKind } from '@/data/specimens';

function pad2(n: number) { return String(n).padStart(2, '0'); }
function pad3(n: number) { return String(n).padStart(3, '0'); }
function grainDensity(g: GrainKind) {
  return ({ FINE: 7.4, MEDIUM: 6.9, COARSE: 6.2, RAW: 5.8, MIXED: 6.5 }[g] ?? 6.8).toFixed(1);
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Styled Components ────────────────────────────────────────
const ModalBackdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(61,31,15,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 180ms ease;

  @media (prefers-reduced-motion: reduce) { transition: none; }
`;

const Modal = styled.div`
  background: var(--tan);
  border: 0.5px solid var(--hair-strong);
  width: 100%;
  max-width: 900px;
  max-height: 95vh;
  overflow-y: auto;
  animation: ${fadeIn} 180ms ease;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 700px) { grid-template-columns: 1fr; }
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const ModalLeft = styled.div`
  border-right: 0.5px solid var(--hair-strong);
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) { border-right: 0; border-bottom: 0.5px solid var(--hair-strong); }
`;

const ModalTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  border-bottom: 0.5px solid var(--hair-strong);
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mid);
  min-height: 44px;

  button {
    color: var(--choc);
    background: none;
    border: 0;
    font-family: var(--mono);
    font-size: 22px;
    cursor: none;
    line-height: 1;
    padding: 4px 8px;
    min-width: 36px;
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover { opacity: 0.6; }
    @media (pointer: coarse) {
      cursor: pointer;
      min-width: 44px;
      min-height: 44px;
    }
  }
`;

const ModalGallery = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 240px;

  .primary {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px;
    svg { width: 70%; height: 100%; max-height: 240px; }
  }

  @media (max-width: 700px) {
    min-height: 200px;
    .primary { padding: 20px; }
  }
`;

const ModalThumbs = styled.div`
  display: flex;
  gap: 0;
  border-top: 0.5px solid var(--hair-strong);
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }

  button {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-right: 0.5px solid var(--hair-strong);
    border-top: 0;
    border-bottom: 0;
    border-left: 0;
    background: var(--bone);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: none;
    transition: background 120ms;

    &.active { background: var(--choc); svg path, svg rect, svg circle, svg line { stroke: var(--bone); } }
    &:hover { background: var(--bone); opacity: 0.8; }
    svg { width: 40px; height: 40px; }
    @media (pointer: coarse) {
      cursor: pointer;
      width: 64px;
      height: 64px;
      svg { width: 44px; height: 44px; }
    }
  }
`;

const ModalCaption = styled.div`
  padding: 8px 18px;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--mid);
  letter-spacing: 0.1em;
  border-top: 0.5px solid var(--hair-strong);
  display: flex;
  justify-content: space-between;
`;

const ModalNav = styled.div`
  display: flex;
  gap: 0;
  padding: 8px 18px;
  border-top: 0.5px solid var(--hair-strong);

  button {
    flex: 1;
    padding: 10px;
    min-height: 44px;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--mid);
    background: none;
    border: 0.5px solid var(--hair-strong);
    cursor: none;
    text-transform: uppercase;

    &:hover { color: var(--choc); background: var(--bone); }
    &:last-child { border-left: 0; }
    @media (pointer: coarse) { cursor: pointer; }
  }

  @media (max-width: 700px) {
    padding: 0;
    button { padding: 14px; min-height: 52px; font-size: 12px; }
  }
`;

const ModalRight = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ModalBody = styled.div`
  padding: 22px 22px 0;
  flex: 1;

  .bc {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--mid);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 14px;
    .sep { opacity: 0.5; margin: 0 6px; }
    .cur { color: var(--choc); }
  }

  .idx {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--mid);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  h2 {
    font-family: var(--display);
    font-size: clamp(20px, 2.5vw, 32px);
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: var(--choc);
    margin: 0 0 10px;
    line-height: 1;

    .slash { font-family: var(--mono); font-weight: 400; font-size: 0.55em; color: var(--mid); padding: 0 0.2em; vertical-align: 0.2em; }
  }

  .tagline {
    font-family: var(--script);
    font-size: 18px;
    color: var(--choc);
    margin-bottom: 14px;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    padding: 16px 16px 0;
  }
`;

const SpecTable = styled.div`
  border-top: 0.5px solid var(--hair-strong);
  margin: 0 -22px;
  padding: 0 22px;

  .row {
    display: grid;
    grid-template-columns: 9ch 1fr;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 0.5px solid var(--hair-strong);
    font-family: var(--mono);
    font-size: 11px;
    color: var(--choc);
    min-height: 36px;

    .k { color: var(--mid); text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px; }
  }

  @media (max-width: 480px) {
    margin: 0 -16px;
    padding: 0 16px;
  }
`;

const ModalEditorial = styled.p`
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.65;
  color: var(--choc);
  margin: 14px 0 0;
`;

const ModalFoot = styled.div`
  padding: 14px 22px;
  border-top: 0.5px solid var(--hair-strong);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 14px;

  .price {
    font-family: var(--display);
    font-size: 28px;
    letter-spacing: -0.02em;
    color: var(--choc);
  }

  .actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    button {
      padding: 10px 16px;
      min-height: 44px;
      font-family: var(--mono);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: none;
      border: 0.5px solid var(--hair-strong);
      background: none;
      color: var(--choc);
      transition: all 120ms;

      &.primary { background: var(--choc); color: var(--bone); border-color: var(--choc); }
      &:hover { background: var(--choc); color: var(--bone); border-color: var(--choc); }
      @media (pointer: coarse) { cursor: pointer; }
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 16px;
    .actions { width: 100%; button { flex: 1; text-align: center; } }
  }
`;

// ─── Props ───────────────────────────────────────────────────
interface SpecimenModalProps {
  lang: Lang;
  modalId: number | null;
  modalGalleryIdx: number;
  filtered: VaultSpecimen[];
  selected: number[];
  onClose: () => void;
  onToggleSelect: (id: number) => void;
  onGalleryChange: (idx: number) => void;
  onNav: (dir: number) => void;
}

const GALLERY_VIEWS = [0, 1, 2, 3];

// ─── Component ───────────────────────────────────────────────
export default function SpecimenModal({
  lang, modalId, modalGalleryIdx, filtered, selected,
  onClose, onToggleSelect, onGalleryChange, onNav
}: SpecimenModalProps) {
  const modalSpec = modalId != null ? VAULT_SPECIMENS.find(s => s.i === modalId) : null;

  useEffect(() => {
    document.body.style.overflow = modalId != null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalId]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (modalId == null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNav(-1);
      if (e.key === 'ArrowRight') onNav(1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <ModalBackdrop $open={modalId != null} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      {modalSpec && (
        <Modal onClick={e => e.stopPropagation()}>
          <ModalLeft>
            <ModalTopBar>
              <span>SPECIMEN {pad2(modalSpec.i)} / {pad3(TOTAL_SPECIMENS)}</span>
              <button onClick={onClose} aria-label="close">×</button>
            </ModalTopBar>
            <ModalGallery>
              <div className="primary">
                <Silhouette kind={modalSpec.sil} />
              </div>
              <ModalThumbs>
                {GALLERY_VIEWS.map(gi => (
                  <button key={gi} className={gi === modalGalleryIdx ? 'active' : ''}
                    onClick={() => onGalleryChange(gi)}>
                    <Silhouette kind={modalSpec.sil} />
                  </button>
                ))}
              </ModalThumbs>
              <ModalCaption>
                <span>{modalSpec.sn}</span>
                <span>IMG {pad2(modalGalleryIdx + 1)} / 04</span>
              </ModalCaption>
            </ModalGallery>
            <ModalNav>
              <button onClick={() => onNav(-1)}>{t(lang, 'modal.prev')}</button>
              <button onClick={() => onNav(1)}>{t(lang, 'modal.next')}</button>
            </ModalNav>
          </ModalLeft>
          <ModalRight>
            <ModalBody>
              <div className="bc">
                <span>{t(lang, 'modal.bc.vault')}</span>
                <span className="sep">//</span>
                <span>{t(lang, 'modal.bc.all')}</span>
                <span className="sep">//</span>
                <span className="cur">{modalSpec.name.replace(' // ', '_')}</span>
              </div>
              <div className="idx">SPECIMEN {pad2(modalSpec.i)} / {pad3(TOTAL_SPECIMENS)}</div>
              <h2>
                {modalSpec.name.includes(' // ')
                  ? <>{modalSpec.name.split(' // ')[0]}<br /><span className="slash">//</span>{modalSpec.name.split(' // ')[1]}</>
                  : modalSpec.name
                }
              </h2>
              {modalSpec.quote && <div className="tagline">{modalSpec.quote}</div>}
              <SpecTable>
                {[
                  [t(lang, 'ms.tannage'), 'Vegetable · mimosa'],
                  [t(lang, 'ms.hours'), `${pad3(modalSpec.tan)} hrs`],
                  [t(lang, 'ms.grain'), `${grainDensity(modalSpec.grain)} fibers/mm² · ${t(lang, `grain.${modalSpec.grain.toLowerCase()}` as Parameters<typeof t>[1])}`],
                  [t(lang, 'ms.origin'), t(lang, `origin.${modalSpec.origin.toLowerCase()}` as Parameters<typeof t>[1])],
                  [t(lang, 'ms.weight'), `${modalSpec.weight} g ± 6`],
                  [t(lang, 'ms.coord'), modalSpec.coord],
                  [t(lang, 'ms.batch'), modalSpec.sn],
                  [t(lang, 'ms.finish'), modalSpec.finish],
                  [t(lang, 'ms.entry'), modalSpec.entry],
                ].map(([k, v]) => (
                  <div key={k} className="row">
                    <span className="k">{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </SpecTable>
              <ModalEditorial>{modalSpec.editorial}</ModalEditorial>
            </ModalBody>
            <ModalFoot>
              <span className="price">€{modalSpec.price}</span>
              <div className="actions">
                <button onClick={() => onToggleSelect(modalSpec.i)}>
                  {selected.includes(modalSpec.i)
                    ? t(lang, 'modal.compare').replace('[+]', '[×]')
                    : t(lang, 'modal.compare')}
                </button>
                <button className="primary">{t(lang, 'modal.request')}</button>
              </div>
            </ModalFoot>
          </ModalRight>
        </Modal>
      )}
    </ModalBackdrop>
  );
}
