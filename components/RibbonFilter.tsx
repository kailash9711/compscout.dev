"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Plus,
} from "lucide-react";

interface FilterTab {
  id: string;
  label: string;
  hasDropdown?: boolean;
  subOptions?: string[];
  hasDividerAfter?: boolean;
}

interface ProductItem {
  id: string;
  title: string;
  category: string;
  status: "Active" | "Draft" | "Archived" | "In stock";
  subStatus?: string;
  price: string;
  sku: string;
}

const INITIAL_TABS: FilterTab[] = [
  { id: "all", label: "All", hasDividerAfter: false },
  {
    id: "active",
    label: "Active",
    hasDropdown: true,
    subOptions: ["Active: All", "Active: In Progress", "Active: High Priority", "Active: Review"],
    hasDividerAfter: false,
  },
  { id: "draft", label: "Draft", hasDividerAfter: true },
  { id: "archived", label: "Archived", hasDividerAfter: true },
  { id: "instock", label: "In stock", hasDividerAfter: true },
];

const SAMPLE_PRODUCTS: ProductItem[] = [
  { id: "prod-1", title: "Anodized Aluminum Lamp", category: "Lighting", status: "Active", subStatus: "Active: High Priority", price: "$185.00", sku: "SKU-9041" },
  { id: "prod-2", title: "Matte Ceramic Pour-Over", category: "Kitchen", status: "Active", subStatus: "Active: In Progress", price: "$42.00", sku: "SKU-3120" },
  { id: "prod-3", title: "Walnut Keyboard Wrist Rest", category: "Accessories", status: "Draft", price: "$58.00", sku: "SKU-8492" },
  { id: "prod-4", title: "Titanium Keycap Matrix", category: "Hardware", status: "In stock", price: "$120.00", sku: "SKU-7721" },
  { id: "prod-5", title: "Vented Wool Felt Desk Mat", category: "Accessories", status: "In stock", price: "$65.00", sku: "SKU-5519" },
  { id: "prod-6", title: "Analog Split-Flap Clock", category: "Timepiece", status: "Archived", price: "$290.00", sku: "SKU-1049" },
];

export default function RibbonFilter({ className = "" }: { className?: string } = {}) {
  const [tabs, setTabs] = useState<FilterTab[]>(INITIAL_TABS);
  const [activeTabId, setActiveTabId] = useState<string>("active");
  const [activeSubFilter, setActiveSubFilter] = useState<string>("Active: All");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);
  const [newTagInput, setNewTagInput] = useState<string>("");

  // HANDLE TAB SELECT
  const handleSelectTab = (tab: FilterTab) => {
    if (tab.id === activeTabId && tab.hasDropdown) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setActiveTabId(tab.id);
      setIsDropdownOpen(false);
    }
  };

  // HANDLE SUB OPTION
  const handleSelectSubOption = (opt: string) => {
    setActiveSubFilter(opt);
    setIsDropdownOpen(false);
  };

  // ADD NEW CUSTOM TAB
  const handleAddCustomTab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;

    const newTab: FilterTab = {
      id: `custom-${Date.now()}`,
      label: newTagInput.trim(),
      hasDividerAfter: true,
    };

    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setNewTagInput("");
    setIsAddingTag(false);
  };

  // FILTERED PRODUCTS
  const filteredProducts = SAMPLE_PRODUCTS.filter((p) => {
    if (activeTabId === "all") return true;
    if (activeTabId === "active") {
      if (activeSubFilter === "Active: All") return p.status === "Active";
      return p.subStatus === activeSubFilter;
    }
    if (activeTabId === "draft") return p.status === "Draft";
    if (activeTabId === "archived") return p.status === "Archived";
    if (activeTabId === "instock") return p.status === "In stock";
    return true;
  });

  return (
    <div className={`relative w-full max-w-full flex flex-col items-center justify-center py-2 px-1 font-sans select-none ${className}`}>
      {/* ======================================================================= */}
      {/* THE HORIZONTAL SEGMENTED RIBBON BAR                                     */}
      {/* ======================================================================= */}
      <div className="relative z-20 w-full flex justify-center">
        <div
          className="relative max-w-full overflow-x-auto scrollbar-none flex items-center gap-1 p-1 rounded-full border shadow-xs transition-all duration-300 bg-[#e8ebf0] dark:bg-[#181a20] border-neutral-200/90 dark:border-white/10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;

            return (
              <React.Fragment key={tab.id}>
                {/* TAB BUTTON */}
                <button
                  type="button"
                  onClick={() => handleSelectTab(tab)}
                  className={`relative shrink-0 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs transition-all duration-200 flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-white dark:bg-[#252830] text-neutral-900 dark:text-white font-bold shadow-xs scale-102 border border-neutral-200/80 dark:border-white/15"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.hasDropdown && (
                    <ChevronDown
                      className={`w-3 h-3 opacity-60 transition-transform ${
                        isDropdownOpen && isActive ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* VERTICAL DIVIDER LINE */}
                {tab.hasDividerAfter && (
                  <div className="w-[1px] h-3.5 bg-neutral-300 dark:bg-white/15 mx-0.5 shrink-0" />
                )}
              </React.Fragment>
            );
          })}

          {/* FAR RIGHT: QUICK ADD [+] BUTTON */}
          <button
            type="button"
            onClick={() => setIsAddingTag(!isAddingTag)}
            className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
            title="Add Custom Filter"
          >
            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* DROPDOWN FLYOUT FOR "Active ⌄" SUB-FILTERS */}
        {isDropdownOpen && (
          <div
            className="absolute top-11 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-12 w-44 sm:w-48 rounded-2xl p-1.5 border shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 bg-white dark:bg-[#181a20] border-neutral-200/90 dark:border-white/15 text-neutral-800 dark:text-white"
          >
            <div className="text-[9px] font-mono font-bold opacity-40 uppercase px-2 py-0.5 mb-0.5">
              Active Sub-Categories
            </div>
            {tabs
              .find((t) => t.id === "active")
              ?.subOptions?.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectSubOption(opt)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-all cursor-pointer truncate ${
                    activeSubFilter === opt
                      ? "bg-black text-white dark:bg-white dark:text-black font-bold"
                      : "hover:bg-neutral-100 dark:hover:bg-white/10"
                  }`}
                >
                  {opt}
                </button>
              ))}
          </div>
        )}

        {/* INLINE ADD TAG FORM */}
        {isAddingTag && (
          <form
            onSubmit={handleAddCustomTab}
            className="absolute -bottom-11 right-2 flex items-center gap-1 p-1 rounded-full border shadow-lg z-40 animate-in fade-in zoom-in-95 bg-white dark:bg-[#181a20] border-neutral-200 dark:border-white/15"
          >
            <input
              type="text"
              placeholder="Tag..."
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              autoFocus
              className="px-2 py-0.5 bg-transparent text-[11px] outline-none w-20 text-neutral-900 dark:text-white"
            />
            <button
              type="submit"
              className="w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] font-bold"
            >
              ✓
            </button>
            <button
              type="button"
              onClick={() => setIsAddingTag(false)}
              className="w-5 h-5 rounded-full text-neutral-400 hover:text-neutral-700 flex items-center justify-center text-[10px]"
            >
              ✕
            </button>
          </form>
        )}
      </div>

      {/* ======================================================================= */}
      {/* MINIMALIST DATA FEED FILTERED BY ACTIVE TAB                             */}
      {/* ======================================================================= */}
      <div className="w-full max-w-sm sm:max-w-md mt-3 flex flex-col gap-1.5">
        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-4 text-center text-xs text-neutral-400 dark:text-neutral-500 font-medium"
            >
              No items in {activeTabId}
            </motion.div>
          ) : (
            filteredProducts.slice(0, 3).map((prod) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="group flex items-center justify-between px-3 py-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/60 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-default select-none shadow-xs"
              >
                {/* Left info */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-2 h-2 rounded-full shrink-0 relative flex items-center justify-center">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        prod.status === "Active"
                          ? "bg-emerald-500"
                          : prod.status === "In stock"
                          ? "bg-blue-500"
                          : "bg-neutral-400"
                      }`}
                    />
                    {prod.status === "Active" && (
                      <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-500/25 animate-ping" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                      {prod.title}
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                      {prod.category} <span className="opacity-40">•</span> {prod.sku}
                    </div>
                  </div>
                </div>

                {/* Right price & status */}
                <div className="text-right shrink-0 pl-2">
                  <div className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    {prod.price}
                  </div>
                  <div className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500">
                    {prod.status}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
