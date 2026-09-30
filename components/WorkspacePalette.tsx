"use client";

import React, { useState } from "react";
import {
  Folder,
  ChevronDown,
  Plus,
  MoreHorizontal,
  Star,
  Link2,
  Copy,
  Pencil,
  Trash2,
  ExternalLink,
  AppWindow,
  PanelRight,
  FileText,
  X,
} from "lucide-react";

interface WorkspaceFolder {
  id: string;
  name: string;
  isFavorite: boolean;
  docCount: number;
  files: string[];
}

export default function WorkspacePalette({ className = "" }: { className?: string } = {}) {
  const [folder, setFolder] = useState<WorkspaceFolder>({
    id: "f-1",
    name: "Productivity",
    isFavorite: false,
    docCount: 8,
    files: ["Q3 Strategy & OKRs.md", "Design Tokens System.json", "Telemetry Metrics.log", "Sprint 42 Backlog.md"],
  });

  const [hoveredAction, setHoveredAction] = useState<string>("duplicate");
  const [isSidePeekOpen, setIsSidePeekOpen] = useState<boolean>(false);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>("Productivity");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 1800);
  };

  const handleToggleFavorite = () => {
    const nextFav = !folder.isFavorite;
    setFolder({ ...folder, isFavorite: nextFav });
    triggerToast(nextFav ? "★ Added to Favourites" : "Removed from Favourites");
  };

  const handleCopyLink = () => {
    setIsCopied(true);
    triggerToast("✓ Link copied to clipboard (Cmd+L)");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDuplicate = () => {
    triggerToast(`✓ Duplicated "${folder.name} (Copy)"`);
  };

  const handleSaveRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setFolder({ ...folder, name: tempName.trim() });
      setIsRenaming(false);
      triggerToast(`✓ Renamed to "${tempName.trim()}"`);
    }
  };

  const handleMoveTrash = () => {
    triggerToast(`🗑️ Moved "${folder.name}" to Trash`);
  };

  const handleToggleSidePeek = () => {
    setIsSidePeekOpen(!isSidePeekOpen);
    triggerToast(!isSidePeekOpen ? "Opened in Side Peek" : "Closed Side Peek");
  };

  return (
    <div className={`relative w-full flex flex-col items-center justify-center py-4 px-2 font-sans select-none ${className}`}>
      {/* Main Card Container */}
      <div className="relative w-76 sm:w-80 rounded-[26px] p-3 border shadow-[0_16px_50px_rgba(0,0,0,0.08)] transition-all duration-300 bg-white dark:bg-[#181a20] border-neutral-200/90 dark:border-white/10 text-neutral-900 dark:text-white overflow-hidden">
        {/* 1. TOP WORKSPACE BREADCRUMB BAR */}
        <div className="flex items-center justify-between px-2 py-1 text-neutral-400 dark:text-neutral-500">
          <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase cursor-pointer hover:text-black dark:hover:text-white transition-colors">
            <ChevronDown className="w-3.5 h-3.5" />
            <span>WORKSPACE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast("+ Created new workspace item")}
              className="hover:text-black dark:hover:text-white cursor-pointer"
              title="Add New"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => triggerToast("Workspace options")}
              className="hover:text-black dark:hover:text-white cursor-pointer"
              title="Options"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. ACTIVE FOLDER CAPSULE PILL */}
        <div className="my-1">
          <div className="w-full rounded-[16px] p-2.5 flex items-center justify-between border-2 border-blue-500 bg-white dark:bg-[#1f222a] shadow-xs">
            <div className="flex items-center gap-2 min-w-0">
              <Folder className="w-4 h-4 text-blue-500 fill-blue-500/10 shrink-0" />
              <span className="text-xs sm:text-sm font-bold truncate">{folder.name}</span>
            </div>

            <button
              onClick={() => triggerToast("Folder options")}
              className="text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. MENU ACTIONS LIST */}
        <div className="rounded-[18px] p-1 border mt-1.5 space-y-0.5 bg-white dark:bg-[#14151a] border-neutral-100 dark:border-white/5">
          {/* ROW 1: Add to Favourite */}
          <button
            onClick={handleToggleFavorite}
            onMouseEnter={() => setHoveredAction("fav")}
            className={`w-full px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              hoveredAction === "fav"
                ? "bg-[#f0f1f4] dark:bg-white/10"
                : "hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <Star
              className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                folder.isFavorite ? "text-amber-500 fill-amber-500" : "opacity-70"
              }`}
            />
            <span>{folder.isFavorite ? "Remove from Favourite" : "Add to Favourite"}</span>
          </button>

          {/* ROW 2: Copy Link */}
          <button
            onClick={handleCopyLink}
            onMouseEnter={() => setHoveredAction("copy")}
            className={`w-full px-2.5 py-1.5 rounded-xl flex items-center justify-between text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              hoveredAction === "copy"
                ? "bg-[#f0f1f4] dark:bg-white/10"
                : "hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Link2 className="w-3.5 h-3.5 opacity-70 shrink-0" />
              <span>Copy Link</span>
            </div>
            <span className="text-[10px] font-mono opacity-40">Cmd+L</span>
          </button>

          {/* ROW 3: Duplicate */}
          <button
            onClick={handleDuplicate}
            onMouseEnter={() => setHoveredAction("duplicate")}
            className={`w-full px-2.5 py-1.5 rounded-xl flex items-center justify-between text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              hoveredAction === "duplicate"
                ? "bg-[#f0f1f4] dark:bg-white/10 font-bold"
                : "hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Copy className="w-3.5 h-3.5 opacity-80 shrink-0" />
              <span>Duplicate</span>
            </div>
            <span className="px-1.5 py-0.2 rounded border text-[10px] font-mono font-bold shadow-xs bg-white dark:bg-white/15 border-neutral-200 dark:border-white/20 text-neutral-800 dark:text-white">
              ⌘ D
            </span>
          </button>

          {/* ROW 4: Rename */}
          <button
            onClick={() => setIsRenaming(true)}
            onMouseEnter={() => setHoveredAction("rename")}
            className={`w-full px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              hoveredAction === "rename"
                ? "bg-[#f0f1f4] dark:bg-white/10"
                : "hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <Pencil className="w-3.5 h-3.5 opacity-70 shrink-0" />
            <span>Rename</span>
          </button>

          {/* ROW 5: Move to Trash */}
          <button
            onClick={handleMoveTrash}
            onMouseEnter={() => setHoveredAction("trash")}
            className={`w-full px-2.5 py-1.5 rounded-xl flex items-center justify-between text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              hoveredAction === "trash"
                ? "bg-[#f0f1f4] dark:bg-white/10"
                : "hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Trash2 className="w-3.5 h-3.5 opacity-70 shrink-0" />
              <span>Move to Trash</span>
            </div>
            <span className="text-[10px] font-mono opacity-40">Delete</span>
          </button>

          {/* Hairline Divider */}
          <div className="w-full h-[1px] my-1 bg-neutral-100 dark:bg-white/10" />

          {/* ROW 6: Open in New Tab */}
          <button
            onClick={() => triggerToast("↗ Opening in new tab")}
            onMouseEnter={() => setHoveredAction("newtab")}
            className={`w-full px-2.5 py-1.5 rounded-xl flex items-center justify-between text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              hoveredAction === "newtab"
                ? "bg-[#f0f1f4] dark:bg-white/10"
                : "hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-3.5 h-3.5 opacity-70 shrink-0" />
              <span>Open in New Tab</span>
            </div>
            <span className="text-[10px] font-mono opacity-40">Shift+D</span>
          </button>

          {/* ROW 7: Open in New Window */}
          <button
            onClick={() => triggerToast("🪟 Opening in new window")}
            onMouseEnter={() => setHoveredAction("newwin")}
            className={`w-full px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              hoveredAction === "newwin"
                ? "bg-[#f0f1f4] dark:bg-white/10"
                : "hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <AppWindow className="w-3.5 h-3.5 opacity-70 shrink-0" />
            <span>Open in New Window</span>
          </button>

          {/* ROW 8: Open in Side Peek */}
          <button
            onClick={handleToggleSidePeek}
            onMouseEnter={() => setHoveredAction("sidepeek")}
            className={`w-full px-2.5 py-1.5 rounded-xl flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
              hoveredAction === "sidepeek"
                ? "bg-[#f0f1f4] dark:bg-white/10"
                : "hover:bg-black/3 dark:hover:bg-white/5"
            }`}
          >
            <PanelRight className="w-3.5 h-3.5 opacity-70 shrink-0" />
            <span>Open in Side Peek</span>
          </button>
        </div>

        {/* SIDE PEEK OVERLAY PANEL (Over Component Card) */}
        {isSidePeekOpen && (
          <div className="absolute inset-0 z-30 bg-white dark:bg-[#181a20] rounded-[26px] p-4 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-150">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200 dark:border-white/10">
                <div className="flex items-center gap-2 min-w-0">
                  <PanelRight className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="text-xs font-bold font-mono truncate">SIDE PEEK // {folder.name}</span>
                </div>
                <button
                  onClick={() => setIsSidePeekOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] font-mono opacity-50 uppercase tracking-wider">Documents in Folder:</div>
                {folder.files.map((file, idx) => (
                  <div
                    key={idx}
                    onClick={() => triggerToast(`Opened ${file}`)}
                    className="p-2 rounded-xl border border-neutral-100 dark:border-white/5 flex items-center gap-2 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-500 opacity-80 shrink-0" />
                    <span className="truncate">{file}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsSidePeekOpen(false)}
              className="w-full py-2 rounded-xl bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/15 text-xs font-bold text-neutral-800 dark:text-white transition-colors cursor-pointer"
            >
              Close Side Peek
            </button>
          </div>
        )}

        {/* RENAME POPUP OVERLAY (Over Component Card) */}
        {isRenaming && (
          <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 rounded-[26px] animate-in fade-in duration-150">
            <form
              onSubmit={handleSaveRename}
              className="bg-white dark:bg-[#181a20] text-neutral-900 dark:text-white rounded-[22px] p-4 w-full shadow-2xl border border-neutral-200 dark:border-white/15 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold">Rename Folder</h3>
                <button
                  type="button"
                  onClick={() => setIsRenaming(false)}
                  className="text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                autoFocus
                className="w-full px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-white/20 bg-neutral-50 dark:bg-black/20 text-xs sm:text-sm font-semibold outline-none focus:border-blue-500"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsRenaming(false)}
                  className="flex-1 py-1.5 rounded-xl border border-neutral-300 dark:border-white/15 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer shadow-md transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TOAST BAR (Inside Card Container) */}
        {toastMessage && (
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 px-3 py-1 rounded-xl bg-black/90 dark:bg-white text-white dark:text-black text-[10px] font-mono font-bold shadow-xl animate-in fade-in duration-150 whitespace-nowrap">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}
