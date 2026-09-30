"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  Search,
  X,
  ChevronRight,
  ChevronLeft,
  Sliders,
  Check,
  Building2,
  Briefcase,
  Phone,
  Mail,
  UserCheck,
  FileText,
  Sparkles,
} from "lucide-react";

interface AttributeOption {
  id: string;
  label: string;
  icon: string;
  badgeCount?: number;
  subOptions: { id: string; name: string; count: number; checked: boolean }[];
}

const INITIAL_ATTRIBUTES: AttributeOption[] = [
  {
    id: "name",
    label: "Name",
    icon: "name",
    subOptions: [
      { id: "n-1", name: "Starts with A-M", count: 412, checked: false },
      { id: "n-2", name: "Starts with N-Z", count: 320, checked: false },
    ],
  },
  {
    id: "email",
    label: "Email addresses",
    icon: "email",
    badgeCount: 2, // matching image
    subOptions: [
      { id: "e-1", name: "Verified Corporate (@frontier.ai)", count: 280, checked: true },
      { id: "e-2", name: "Secondary Backup Linked", count: 140, checked: true },
      { id: "e-3", name: "Unconfirmed", count: 12, checked: false },
    ],
  },
  {
    id: "status",
    label: "Status", // hovered matching image!
    icon: "status",
    badgeCount: 1,
    subOptions: [
      { id: "st-1", name: "Active Members", count: 520, checked: true },
      { id: "st-2", name: "Pending Onboarding", count: 34, checked: false },
      { id: "st-3", name: "Suspended / Idle", count: 18, checked: false },
    ],
  },
  {
    id: "description",
    label: "Description",
    icon: "description",
    subOptions: [
      { id: "d-1", name: "Has Bio", count: 490, checked: false },
      { id: "d-2", name: "Empty Bio", count: 64, checked: false },
    ],
  },
  {
    id: "company",
    label: "Company",
    icon: "company",
    badgeCount: 3, // matching image
    subOptions: [
      { id: "c-1", name: "Frontier Labs", count: 180, checked: true },
      { id: "c-2", name: "Anthropic Ecosystem", count: 95, checked: true },
      { id: "c-3", name: "DeepMind Alumni", count: 64, checked: true },
      { id: "c-4", name: "Autonomous Systems Inc", count: 42, checked: false },
    ],
  },
  {
    id: "job",
    label: "Job title",
    icon: "job",
    badgeCount: 5, // matching image
    subOptions: [
      { id: "j-1", name: "AI Research Scientist", count: 72, checked: true },
      { id: "j-2", name: "Principal Creative Technologist", count: 48, checked: true },
      { id: "j-3", name: "Silicon Architect", count: 36, checked: true },
      { id: "j-4", name: "Design Systems Lead", count: 28, checked: true },
      { id: "j-5", name: "Staff RL Engineer", count: 22, checked: true },
    ],
  },
  {
    id: "phone",
    label: "Phone numbers",
    icon: "phone",
    subOptions: [
      { id: "p-1", name: "Has Mobile (+1)", count: 340, checked: false },
      { id: "p-2", name: "International (+44 / +91)", count: 180, checked: false },
    ],
  },
];

export default function FilterFlyout({ className = "" }: { className?: string } = {}) {
  const [isOpen, setIsOpen] = useState<boolean>(true); // default open matching image!
  const [activeDrillDown, setActiveDrillDown] = useState<AttributeOption | null>(null);
  const [attributes, setAttributes] = useState<AttributeOption[]>(INITIAL_ATTRIBUTES);
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [hoveredId, setHoveredId] = useState<string>("status"); // default status hovered matching image!
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // TOAST
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 1800);
  };

  // FILTERED ATTRIBUTES
  const filteredAttributes = attributes.filter((a) =>
    a.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // TOGGLE SUB-OPTION
  const handleToggleSubOption = (attrId: string, subId: string) => {
    setAttributes((prev) =>
      prev.map((attr) => {
        if (attr.id !== attrId) return attr;
        const updatedSubs = attr.subOptions.map((s) =>
          s.id === subId ? { ...s, checked: !s.checked } : s
        );
        const newBadgeCount = updatedSubs.filter((s) => s.checked).length;
        return {
          ...attr,
          subOptions: updatedSubs,
          badgeCount: newBadgeCount > 0 ? newBadgeCount : undefined,
        };
      })
    );
  };

  // DRILL DOWN
  const handleDrillDown = (attr: AttributeOption) => {
    setActiveDrillDown(attr);
  };

  // BACK TO ATTRIBUTES
  const handleBack = () => {
    setActiveDrillDown(null);
  };

  // RESET
  const handleReset = () => {
    setAttributes(INITIAL_ATTRIBUTES);
    setActiveDrillDown(null);
    setSearchQuery("");
    setIsOpen(true);
    setHoveredId("status");
  };

  // RENDER ATTRIBUTE ICON
  const renderAttrIcon = (type: string) => {
    switch (type) {
      case "name":
        return <UserCheck className="w-4.5 h-4.5 opacity-80" />;
      case "email":
        return <Mail className="w-4.5 h-4.5 opacity-80" />;
      case "status":
        return <Sparkles className="w-4.5 h-4.5 opacity-80" />;
      case "description":
        return <FileText className="w-4.5 h-4.5 opacity-80" />;
      case "company":
        return <Building2 className="w-4.5 h-4.5 opacity-80" />;
      case "job":
        return <Briefcase className="w-4.5 h-4.5 opacity-80" />;
      case "phone":
        return <Phone className="w-4.5 h-4.5 opacity-80" />;
      default:
        return <Sliders className="w-4.5 h-4.5 opacity-80" />;
    }
  };

  // TOTAL ACTIVE FILTERS
  const totalActiveFilters = attributes.reduce(
    (acc, a) => acc + (a.badgeCount || 0),
    0
  );

  return (
    <div className={`relative w-full flex flex-col items-center justify-center py-6 px-2 font-sans select-none ${className}`}>
      {/* ======================================================================= */}
      {/* 1. TOP TRIGGER BAR [ ≡ Filters ] & AVATAR                               */}
      {/* ======================================================================= */}
      <div className="flex items-center gap-3 mb-3.5 self-center">
        {/* Filters Pill Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-3.5 py-1.5 rounded-2xl border shadow-xs flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            isOpen
              ? "bg-white dark:bg-white text-neutral-900 dark:text-black border-neutral-300 dark:border-transparent font-bold shadow-md scale-102"
              : "bg-[#ebecef] dark:bg-[#181a20] border-neutral-200/80 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:bg-[#e0e2e7] dark:hover:bg-[#20232a]"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
          {totalActiveFilters > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-mono font-bold">
              {totalActiveFilters}
            </span>
          )}
        </button>

        {/* Profile Avatar Badge */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-400 via-rose-400 to-indigo-500 shadow-sm shrink-0">
          <div className="w-full h-full rounded-full bg-[#eeebe7] dark:bg-[#252830] flex items-center justify-center font-bold text-xs">
            👨🏻‍💻
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 2. THE ATTRIBUTE FILTER POPOVER CARD                                    */}
      {/* ======================================================================= */}
      {isOpen && (
        <div
          className="w-72 sm:w-80 rounded-[26px] p-4 sm:p-4.5 border shadow-[0_16px_50px_rgba(0,0,0,0.08)] transition-all duration-300 bg-white dark:bg-[#181a20] border-neutral-200/90 dark:border-white/10 text-neutral-900 dark:text-white"
        >
          {/* VIEW A: PRIMARY ATTRIBUTES LIST */}
          {!activeDrillDown && (
            <div className="space-y-2.5 animate-in fade-in duration-150">
              {/* Header (Filters + Close ✕) */}
              <div className="flex items-center justify-between pb-1">
                <h2 className="text-sm sm:text-base font-bold tracking-tight">Filters</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 opacity-60 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search Box */}
              <div
                className="w-full rounded-xl px-2.5 py-1.5 border flex items-center gap-2 text-xs transition-all bg-[#fbfbfd] dark:bg-white/5 border-neutral-200/80 dark:border-white/10 focus-within:border-neutral-400"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search attributes..."
                  className="w-full bg-transparent outline-none placeholder:opacity-40 text-xs font-medium"
                />
                <Search className="w-3.5 h-3.5 opacity-40 shrink-0" />
              </div>

              {/* Section Title */}
              <div className="text-[10px] font-medium opacity-40 px-1 pt-0.5">
                User attributes
              </div>

              {/* Attributes Rows */}
              <div className="space-y-1">
                {filteredAttributes.map((attr) => {
                  const isHovered = hoveredId === attr.id;

                  return (
                    <button
                      key={attr.id}
                      onClick={() => handleDrillDown(attr)}
                      onMouseEnter={() => setHoveredId(attr.id)}
                      className={`w-full px-2.5 py-1.5 rounded-xl flex items-center justify-between text-xs sm:text-[13px] font-semibold transition-all duration-150 cursor-pointer ${
                        isHovered
                          ? "bg-[#f0f1f4] dark:bg-white/10"
                          : "hover:bg-black/3 dark:hover:bg-white/5"
                      }`}
                    >
                      {/* Left Icon + Label */}
                      <div className="flex items-center gap-2">
                        {renderAttrIcon(attr.icon)}
                        <span>{attr.label}</span>
                      </div>

                      {/* Right Badge Count + Chevron Right */}
                      <div className="flex items-center gap-1.5">
                        {attr.badgeCount && attr.badgeCount > 0 && (
                          <span
                            className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-[#e5e7eb] dark:bg-white/15 text-neutral-700 dark:text-neutral-200"
                          >
                            {attr.badgeCount}
                          </span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW B: DRILL-DOWN SUB-FILTER CRITERIA */}
          {activeDrillDown && (
            <div className="space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
              {/* Back Header */}
              <div className="flex items-center justify-between pb-2 border-b border-current/10">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 text-xs font-bold opacity-75 hover:opacity-100 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <span className="text-xs font-bold">{activeDrillDown.label}</span>
              </div>

              {/* Sub-Options Checkboxes */}
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {attributes
                  .find((a) => a.id === activeDrillDown.id)
                  ?.subOptions.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => handleToggleSubOption(activeDrillDown.id, sub.id)}
                      className={`p-2 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                        sub.checked
                          ? "bg-black dark:bg-white/15 text-white font-bold border-black dark:border-white/30"
                          : "border-current/10 hover:bg-black/3 dark:hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                            sub.checked
                              ? "bg-white text-black border-white"
                              : "border-current/30"
                          }`}
                        >
                          {sub.checked && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span>{sub.name}</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-50">
                        {sub.count}
                      </span>
                    </div>
                  ))}
              </div>

              <button
                onClick={handleBack}
                className="w-full py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs cursor-pointer shadow-xs"
              >
                Apply Filter ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* TOAST BAR */}
      {toastMessage && (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 rounded-xl bg-black dark:bg-zinc-900 text-white text-[11px] font-mono font-bold shadow-xl border border-white/10 animate-in fade-in duration-150 whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
