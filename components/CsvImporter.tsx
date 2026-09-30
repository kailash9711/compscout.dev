"use client";

import React, { useState, useRef } from "react";
import {
  ChevronLeft,
  X,
  CloudDownload,
  Check,
  Trash2,
  FileText,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ready" | "invited";
}

const SAMPLE_MEMBERS: TeamMember[] = [
  { id: "m-1", name: "Elena Rostova", email: "elena@frontier.ai", role: "AI Research Lead", status: "ready" },
  { id: "m-2", name: "David Chen", email: "david@frontier.ai", role: "Silicon Architect", status: "ready" },
  { id: "m-3", name: "Aria Thorne", email: "aria@frontier.ai", role: "Design Systems", status: "ready" },
  { id: "m-4", name: "Marcus Vance", email: "marcus@frontier.ai", role: "Staff DevOps", status: "ready" },
];

export default function CsvImporter({ className = "" }: { className?: string } = {}) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1 = Upload (matching image), 2 = Preview Table, 3 = Complete
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [teamList, setTeamList] = useState<TeamMember[]>(SAMPLE_MEMBERS);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // TOAST
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 1800);
  };

  // HANDLE FILE SELECTION / DROP
  const handleSelectFile = (name: string) => {
    setUploadedFileName(name);
    triggerToast(`✓ Attached "${name}" (4 entries detected)`);
  };

  // DOWNLOAD TEMPLATE
  const handleDownloadTemplate = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerToast("⬇ CSV Template downloaded (team_template.csv)");
  };

  // PROCEED TO PREVIEW
  const handlePreview = () => {
    if (!uploadedFileName) {
      // Auto-attach sample if not chosen
      setUploadedFileName("team_roster_2026.csv");
    }
    setStep(2);
  };

  // SEND INVITES
  const handleSendInvites = () => {
    setStep(3);
    triggerToast("🚀 Sent 4 team invites!");
  };

  // REMOVE MEMBER IN TABLE
  const handleRemoveMember = (id: string) => {
    setTeamList(teamList.filter((m) => m.id !== id));
  };

  // RESET
  const handleReset = () => {
    setStep(1);
    setUploadedFileName(null);
    setTeamList(SAMPLE_MEMBERS);
  };

  return (
    <div className={`relative w-full flex flex-col items-center justify-center py-6 px-2 font-sans select-none ${className}`}>
      {/* The Modal Container */}
      <div
        className="w-full max-w-sm rounded-[28px] p-5 sm:p-6 border shadow-[0_16px_45px_rgba(0,0,0,0.08)] transition-all duration-300 bg-white dark:bg-[#181a20] border-neutral-200/90 dark:border-white/10 text-neutral-900 dark:text-white"
      >
        {/* ===================================================================== */}
        {/* 1. MODAL HEADER (Back Button + Title: Add People + Close Button)       */}
        {/* ===================================================================== */}
        <div className="flex items-center justify-between pb-4">
          {/* Left Back Arrow Circle */}
          <button
            onClick={() => {
              if (step > 1) setStep((s) => (s - 1) as 1 | 2);
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-700 dark:text-white"
            title="Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Title: "Add People" */}
          <h2 className="text-sm sm:text-base font-bold tracking-tight">Add People</h2>

          {/* Right Close Circle [ ✕ ] */}
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-700 dark:text-white"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ===================================================================== */}
        {/* STEP 1: DROPZONE UPLOAD                                               */}
        {/* ===================================================================== */}
        {step === 1 && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            {/* Dashed Drop Area Box */}
            <div
              onClick={() => {
                fileInputRef.current?.click();
                handleSelectFile("team_roster_2026.csv");
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleSelectFile("team_roster_2026.csv");
              }}
              className={`w-full rounded-[20px] border-2 border-dashed p-6 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer ${
                isDragging
                  ? "border-black dark:border-white bg-black/5 dark:bg-white/10 scale-102"
                  : uploadedFileName
                  ? "border-emerald-500 bg-emerald-500/5"
                  : "border-neutral-200 dark:border-white/15 bg-neutral-50/50 dark:bg-white/3 hover:border-neutral-300 dark:hover:border-white/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={() => handleSelectFile("team_roster_2026.csv")}
              />

              {/* CSV File Document Badge */}
              <div className="relative mb-3">
                <div
                  className="w-11 h-13 rounded-lg border flex flex-col items-center justify-center shadow-xs bg-white dark:bg-[#252830] border-neutral-200 dark:border-white/15 text-neutral-800 dark:text-white"
                >
                  <FileText className="w-5 h-5 opacity-40 mb-1" />
                  <span className="px-1.5 py-0.2 rounded bg-black dark:bg-white text-white dark:text-black font-mono font-bold text-[8px]">
                    CSV
                  </span>
                </div>
              </div>

              {/* Heading */}
              <div className="text-xs sm:text-sm font-semibold mb-0.5">
                {uploadedFileName ? uploadedFileName : "Import CSV File"}
              </div>

              {/* Subtext */}
              <div className="text-xs text-neutral-400 dark:text-neutral-500 max-w-[200px] leading-relaxed">
                {uploadedFileName
                  ? "File ready for column verification"
                  : "Drop file or click here to choose file."}
              </div>
            </div>

            {/* Download CSV Template Link */}
            <div className="pt-0.5 text-center">
              <button
                onClick={handleDownloadTemplate}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                <CloudDownload className="w-3.5 h-3.5 opacity-70" />
                <span>Download CSV Template</span>
              </button>
            </div>

            {/* Bottom Primary Button [ Preview ] */}
            <button
              onClick={handlePreview}
              className="w-full py-3 rounded-[14px] bg-[#222428] dark:bg-white text-white dark:text-black font-semibold text-xs sm:text-sm shadow-md hover:bg-black dark:hover:bg-neutral-200 active:scale-98 transition-all cursor-pointer"
            >
              Preview
            </button>
          </div>
        )}

        {/* ===================================================================== */}
        {/* STEP 2: LIVE PARSED ROSTER TABLE                                      */}
        {/* ===================================================================== */}
        {step === 2 && (
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between text-xs font-mono opacity-60 pb-1 border-b border-current/10">
              <span>PARSED: {teamList.length} MEMBERS</span>
              <span className="text-emerald-500 font-bold">✓ FORMAT OK</span>
            </div>

            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {teamList.map((m) => (
                <div
                  key={m.id}
                  className="p-2 rounded-xl border border-current/10 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold">{m.name}</div>
                    <div className="text-[10px] font-mono opacity-50">{m.email} • {m.role}</div>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(m.id)}
                    className="p-1 rounded-md opacity-40 hover:opacity-100 hover:text-rose-500 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleSendInvites}
              className="w-full py-3 rounded-[14px] bg-black dark:bg-white text-white dark:text-black font-bold text-xs sm:text-sm shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              Send {teamList.length} Invites ➔
            </button>
          </div>
        )}

        {/* ===================================================================== */}
        {/* STEP 3: DISPATCH COMPLETE                                             */}
        {/* ===================================================================== */}
        {step === 3 && (
          <div className="space-y-3.5 text-center py-3 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold">Team Invites Dispatched</h3>
            <p className="text-xs opacity-60 max-w-[220px] mx-auto leading-relaxed">
              4 invitation emails have been sent with secure single-sign-on onboarding links.
            </p>
            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-[14px] bg-neutral-100 dark:bg-white/10 text-xs font-bold font-mono cursor-pointer hover:bg-neutral-200"
            >
              Upload Another CSV
            </button>
          </div>
        )}
      </div>

      {/* TOAST BAR */}
      {toastMessage && (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 rounded-xl bg-black dark:bg-zinc-900 text-white text-[11px] font-mono font-bold shadow-xl border border-white/10 animate-in fade-in duration-150 whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
