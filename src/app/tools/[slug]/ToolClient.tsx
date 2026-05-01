"use client";

import { useState, useCallback } from "react";
import type { Tool } from "../../../data/tools";
import ToolLayout from "../../../components/ToolLayout";

function TextAreaIO({
  input,
  setInput,
  output,
  inputLabel = "Input",
  outputLabel = "Output",
  inputPlaceholder = "Paste your text here...",
  onProcess,
  processLabel = "Convert",
}: {
  input: string;
  setInput: (v: string) => void;
  output: string;
  inputLabel?: string;
  outputLabel?: string;
  inputPlaceholder?: string;
  onProcess: () => void;
  processLabel?: string;
}) {
  const copy = () => navigator.clipboard.writeText(output);
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">{inputLabel}</label>
        <textarea rows={8} value={input} onChange={(e) => setInput(e.target.value)} placeholder={inputPlaceholder} className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
      </div>
      <button onClick={onProcess} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">{processLabel}</button>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">{outputLabel}</label>
          <button onClick={copy} className="text-xs text-indigo-600 hover:text-indigo-800">Copy</button>
        </div>
        <textarea rows={8} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm" />
      </div>
    </div>
  );
}

// ===== TOOL IMPLEMENTATIONS =====

function WordCounter() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(Boolean).length : 0;
  const lines = text.trim() ? text.split("\n").length : 0;

  return (
    <div className="space-y-4">
      <textarea rows={10} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type your text here..." className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {[{ l: "Words", v: words }, { l: "Characters", v: chars }, { l: "No Spaces", v: charsNoSpace }, { l: "Sentences", v: sentences }, { l: "Paragraphs", v: paragraphs }, { l: "Lines", v: lines }].map((s) => (
          <div key={s.l} className="rounded-lg border border-gray-200 bg-white p-3 text-center"><p className="text-2xl font-bold text-indigo-600">{s.v}</p><p className="text-xs text-gray-500">{s.l}</p></div>
        ))}
      </div>
    </div>
  );
}

function FindReplace() {
  const [input, setInput] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [output, setOutput] = useState("");

  const process = () => {
    if (!find) return;
    if (useRegex) {
      try { setOutput(input.replace(new RegExp(find, "g"), replace)); } catch { setOutput("Invalid regex"); }
    } else {
      setOutput(input.split(find).join(replace));
    }
  };

  return (
    <div className="space-y-4">
      <textarea rows={6} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..." className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-indigo-500" />
      <div className="flex gap-3">
        <input type="text" placeholder="Find..." value={find} onChange={(e) => setFind(e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" />
        <input type="text" placeholder="Replace with..." value={replace} onChange={(e) => setReplace(e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" />
      </div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} /> Use Regex</label>
      <button onClick={process} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Replace All</button>
      <textarea rows={6} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm" />
    </div>
  );
}

function TextCaseConverter() {
  const [input, setInput] = useState("");
  const convert = (type: string) => {
    switch (type) {
      case "upper": return input.toUpperCase();
      case "lower": return input.toLowerCase();
      case "title": return input.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
      case "sentence": return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
      case "camel": return input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
      case "snake": return input.toLowerCase().replace(/\s+/g, "_");
      case "kebab": return input.toLowerCase().replace(/\s+/g, "-");
      default: return input;
    }
  };
  const [output, setOutput] = useState("");
  return (
    <div className="space-y-4">
      <textarea rows={6} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..." className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-indigo-500" />
      <div className="flex flex-wrap gap-2">
        {[["UPPER CASE", "upper"], ["lower case", "lower"], ["Title Case", "title"], ["Sentence case", "sentence"], ["camelCase", "camel"], ["snake_case", "snake"], ["kebab-case", "kebab"]].map(([label, type]) => (
          <button key={type} onClick={() => setOutput(convert(type))} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600">{label}</button>
        ))}
      </div>
      <div className="flex items-center justify-between"><label className="text-sm font-medium text-gray-700">Result</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-indigo-600">Copy</button></div>
      <textarea rows={6} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm" />
    </div>
  );
}

function SimpleTextTool({ processFunc, placeholder = "Enter text..." }: { processFunc: (input: string) => string; placeholder?: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return <TextAreaIO input={input} setInput={setInput} output={output} inputPlaceholder={placeholder} onProcess={() => setOutput(processFunc(input))} />;
}

function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");
  const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];
  const generate = () => {
    const result: string[] = [];
    for (let p = 0; p < paragraphs; p++) {
      const sentenceCount = 4 + Math.floor(Math.random() * 4);
      const sentences: string[] = [];
      for (let s = 0; s < sentenceCount; s++) {
        const wordCount = 8 + Math.floor(Math.random() * 12);
        const sent = Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(" ");
        sentences.push(sent.charAt(0).toUpperCase() + sent.slice(1) + ".");
      }
      result.push(sentences.join(" "));
    }
    setOutput(result.join("\n\n"));
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Paragraphs:</label>
        <input type="number" min={1} max={50} value={paragraphs} onChange={(e) => setParagraphs(Number(e.target.value))} className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate</button>
      </div>
      <textarea rows={12} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm" />
    </div>
  );
}

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState(2);
  const format = () => { try { setOutput(JSON.stringify(JSON.parse(input), null, indent)); } catch (e) { setOutput("Error: Invalid JSON - " + String(e)); } };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3"><label className="text-sm text-gray-700">Indent:</label><select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="rounded border border-gray-300 px-2 py-1 text-sm"><option value={2}>2 spaces</option><option value={4}>4 spaces</option></select></div>
      <TextAreaIO input={input} setInput={setInput} output={output} inputPlaceholder='{"key": "value"}' onProcess={format} processLabel="Format JSON" />
    </div>
  );
}

function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const convert = () => {
    try {
      const data = JSON.parse(input);
      const arr = Array.isArray(data) ? data : [data];
      if (arr.length === 0) { setOutput("Empty array"); return; }
      const headers = Object.keys(arr[0]);
      const csv = [headers.join(","), ...arr.map((row: Record<string, unknown>) => headers.map((h) => JSON.stringify(row[h] ?? "")).join(","))].join("\n");
      setOutput(csv);
    } catch (e) { setOutput("Error: " + String(e)); }
  };
  return <TextAreaIO input={input} setInput={setInput} output={output} inputPlaceholder='[{"name":"John","age":30}]' onProcess={convert} processLabel="Convert to CSV" />;
}

function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const convert = () => {
    const lines = input.trim().split("\n");
    if (lines.length < 2) { setOutput("Need header + data rows"); return; }
    const headers = lines[0].split(",").map((h) => h.trim());
    const result = lines.slice(1).map((line) => {
      const vals = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = vals[i] || ""; });
      return obj;
    });
    setOutput(JSON.stringify(result, null, 2));
  };
  return <TextAreaIO input={input} setInput={setInput} output={output} inputPlaceholder="name,age,email\nJohn,30,[email protected]" onProcess={convert} processLabel="Convert to JSON" />;
}

function JsonToYaml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const toYaml = (obj: unknown, indent = 0): string => {
    const pad = "  ".repeat(indent);
    if (obj === null || obj === undefined) return "null";
    if (typeof obj === "string") return obj.includes("\n") ? `|\n${obj.split("\n").map((l) => pad + "  " + l).join("\n")}` : obj;
    if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
    if (Array.isArray(obj)) return obj.map((item) => `${pad}- ${typeof item === "object" ? "\n" + toYaml(item, indent + 2) : toYaml(item, indent + 1)}`).join("\n");
    if (typeof obj === "object") return Object.entries(obj as Record<string, unknown>).map(([k, v]) => `${pad}${k}: ${typeof v === "object" && v !== null ? "\n" + toYaml(v, indent + 1) : toYaml(v, indent)}`).join("\n");
    return String(obj);
  };
  const convert = () => { try { setOutput(toYaml(JSON.parse(input))); } catch (e) { setOutput("Error: " + String(e)); } };
  return <TextAreaIO input={input} setInput={setInput} output={output} inputPlaceholder='{"key": "value"}' onProcess={convert} processLabel="Convert to YAML" />;
}

function RegexTester() {
  const [text, setText] = useState("");
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  const test = () => {
    try {
      const re = new RegExp(pattern, flags);
      const found = text.match(re);
      setMatches(found || []);
      setError("");
    } catch (e) { setError(String(e)); setMatches([]); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input type="text" placeholder="Regular expression..." value={pattern} onChange={(e) => setPattern(e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm outline-none focus:border-indigo-500" />
        <input type="text" placeholder="Flags (g, i, m)" value={flags} onChange={(e) => setFlags(e.target.value)} className="w-24 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm outline-none focus:border-indigo-500" />
      </div>
      <textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter test string..." className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm outline-none focus:border-indigo-500" />
      <button onClick={test} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Test</button>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="mb-2 text-sm font-semibold text-gray-700">Matches: {matches.length}</p>
        {matches.map((m, i) => (<span key={i} className="mr-2 mb-1 inline-block rounded bg-indigo-50 px-2 py-1 font-mono text-xs text-indigo-700">{m}</span>))}
      </div>
    </div>
  );
}

function JwtDecoder() {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const decode = () => {
    try {
      const parts = token.split(".");
      if (parts.length < 2) { setHeader("Invalid JWT"); setPayload(""); return; }
      setHeader(JSON.stringify(JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"))), null, 2));
      setPayload(JSON.stringify(JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))), null, 2));
    } catch (e) { setHeader("Error: " + String(e)); setPayload(""); }
  };
  return (
    <div className="space-y-4">
      <textarea rows={4} value={token} onChange={(e) => setToken(e.target.value)} placeholder="Paste JWT token..." className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs outline-none focus:border-indigo-500" />
      <button onClick={decode} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Decode</button>
      <div className="grid gap-4 md:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Header</label><textarea rows={6} readOnly value={header} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Payload</label><textarea rows={6} readOnly value={payload} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs" /></div>
      </div>
    </div>
  );
}

function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const gen = () => {
    const result: string[] = [];
    for (let i = 0; i < count; i++) result.push(crypto.randomUUID());
    setUuids(result);
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-700">Count:</label>
        <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <button onClick={gen} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate</button>
        <button onClick={() => navigator.clipboard.writeText(uuids.join("\n"))} className="text-xs text-indigo-600">Copy All</button>
      </div>
      <div className="space-y-1">{uuids.map((u, i) => (<div key={i} className="flex items-center justify-between rounded bg-gray-50 px-3 py-2 font-mono text-sm"><span>{u}</span><button onClick={() => navigator.clipboard.writeText(u)} className="text-xs text-indigo-600">Copy</button></div>))}</div>
    </div>
  );
}

function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const generate = async () => {
    const enc = new TextEncoder().encode(input);
    const results: Record<string, string> = {};
    for (const algo of ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]) {
      const buf = await crypto.subtle.digest(algo, enc);
      results[algo] = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    setHashes(results);
  };
  return (
    <div className="space-y-4">
      <textarea rows={4} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to hash..." className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-indigo-500" />
      <button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate Hashes</button>
      {Object.entries(hashes).map(([algo, hash]) => (
        <div key={algo} className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="mb-1 flex items-center justify-between"><span className="text-xs font-semibold text-gray-700">{algo}</span><button onClick={() => navigator.clipboard.writeText(hash)} className="text-xs text-indigo-600">Copy</button></div>
          <p className="break-all font-mono text-xs text-gray-600">{hash}</p>
        </div>
      ))}
    </div>
  );
}

function ColorConverter() {
  const [hex, setHex] = useState("#6366f1");
  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
    return { r, g, b };
  };
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-16 w-16 cursor-pointer rounded border" />
        <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4"><p className="text-xs font-semibold text-gray-500">HEX</p><p className="font-mono text-lg font-bold">{hex}</p></div>
        <div className="rounded-lg border border-gray-200 bg-white p-4"><p className="text-xs font-semibold text-gray-500">RGB</p><p className="font-mono text-lg font-bold">rgb({rgb.r}, {rgb.g}, {rgb.b})</p></div>
        <div className="rounded-lg border border-gray-200 bg-white p-4"><p className="text-xs font-semibold text-gray-500">HSL</p><p className="font-mono text-lg font-bold">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</p></div>
      </div>
      <div className="h-24 rounded-xl" style={{ backgroundColor: hex }} />
    </div>
  );
}

function UnixTimestamp() {
  const [ts, setTs] = useState(String(Math.floor(Date.now() / 1000)));
  const [date, setDate] = useState(new Date().toISOString().slice(0, 19));
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
        <p className="text-xs text-gray-500">Current Unix Timestamp</p>
        <p className="font-mono text-3xl font-bold text-indigo-600">{Math.floor(Date.now() / 1000)}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Unix Timestamp → Date</label>
          <input type="text" value={ts} onChange={(e) => setTs(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" />
          <p className="mt-2 rounded bg-gray-50 p-2 font-mono text-sm">{new Date(Number(ts) * 1000).toISOString()}</p>
          <p className="mt-1 rounded bg-gray-50 p-2 text-sm">{new Date(Number(ts) * 1000).toString()}</p>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Date → Unix Timestamp</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          <p className="mt-2 rounded bg-gray-50 p-2 font-mono text-sm">{Math.floor(new Date(date).getTime() / 1000)}</p>
        </div>
      </div>
    </div>
  );
}

function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.0");
  const [cidr, setCidr] = useState(24);
  const calc = useCallback(() => {
    const parts = ip.split(".").map(Number);
    if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) return null;
    const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const network = (ipNum & mask) >>> 0;
    const broadcast = (network | ~mask) >>> 0;
    const firstHost = (network + 1) >>> 0;
    const lastHost = (broadcast - 1) >>> 0;
    const hosts = Math.pow(2, 32 - cidr) - 2;
    const toIp = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
    return {
      network: toIp(network), broadcast: toIp(broadcast), mask: toIp(mask),
      firstHost: toIp(firstHost), lastHost: toIp(lastHost),
      hosts: hosts > 0 ? hosts : 0, totalAddresses: Math.pow(2, 32 - cidr),
    };
  }, [ip, cidr]);
  const result = calc();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} placeholder="192.168.1.0" className="w-40 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" />
        <span className="text-gray-500">/</span>
        <input type="number" min={0} max={32} value={cidr} onChange={(e) => setCidr(Number(e.target.value))} className="w-20 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" />
      </div>
      {result && (
        <div className="grid gap-3 sm:grid-cols-2">
          {[{ l: "Network Address", v: result.network }, { l: "Broadcast Address", v: result.broadcast }, { l: "Subnet Mask", v: result.mask }, { l: "First Host", v: result.firstHost }, { l: "Last Host", v: result.lastHost }, { l: "Usable Hosts", v: result.hosts.toLocaleString() }, { l: "Total Addresses", v: result.totalAddresses.toLocaleString() }, { l: "CIDR Notation", v: `${result.network}/${cidr}` }].map((item) => (
            <div key={item.l} className="rounded-lg border border-gray-200 bg-white p-3"><p className="text-xs text-gray-500">{item.l}</p><p className="font-mono text-sm font-bold text-gray-900">{item.v}</p></div>
          ))}
        </div>
      )}
    </div>
  );
}

function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [count, setCount] = useState(5);
  const [passwords, setPasswords] = useState<string[]>([]);
  const generate = () => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      let pw = "";
      const arr = new Uint32Array(length);
      crypto.getRandomValues(arr);
      for (let j = 0; j < length; j++) pw += chars[arr[j] % chars.length];
      result.push(pw);
    }
    setPasswords(result);
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div><label className="text-xs text-gray-600">Length</label><input type="number" min={4} max={128} value={length} onChange={(e) => setLength(Number(e.target.value))} className="ml-2 w-16 rounded border border-gray-300 px-2 py-1 text-sm" /></div>
        <div><label className="text-xs text-gray-600">Count</label><input type="number" min={1} max={20} value={count} onChange={(e) => setCount(Number(e.target.value))} className="ml-2 w-16 rounded border border-gray-300 px-2 py-1 text-sm" /></div>
        <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} />A-Z</label>
        <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} />a-z</label>
        <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />0-9</label>
        <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />Symbols</label>
      </div>
      <button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate</button>
      <div className="space-y-2">{passwords.map((pw, i) => (<div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2"><code className="text-sm">{pw}</code><button onClick={() => navigator.clipboard.writeText(pw)} className="text-xs text-indigo-600">Copy</button></div>))}</div>
    </div>
  );
}

function Base64Tool({ encode }: { encode: boolean }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const process = () => {
    try { setOutput(encode ? btoa(input) : atob(input)); } catch (e) { setOutput("Error: " + String(e)); }
  };
  return <TextAreaIO input={input} setInput={setInput} output={output} onProcess={process} processLabel={encode ? "Encode" : "Decode"} />;
}

function NumberBaseConverter({ from, to }: { from: number; to: number }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const convert = () => {
    try { const n = parseInt(input, from); setOutput(isNaN(n) ? "Invalid input" : n.toString(to).toUpperCase()); } catch { setOutput("Error"); }
  };
  const baseNames: Record<number, string> = { 2: "Binary", 8: "Octal", 10: "Decimal", 16: "Hexadecimal" };
  return <TextAreaIO input={input} setInput={setInput} output={output} inputLabel={baseNames[from] ?? `Base ${from}`} outputLabel={baseNames[to] ?? `Base ${to}`} onProcess={convert} processLabel="Convert" />;
}

function IpLookup() {
  const [ip, setIp] = useState("");
  const [info, setInfo] = useState("");
  const lookup = async () => {
    try {
      const res = await fetch(`https://ipapi.co/${ip || "json"}/json/`);
      const data = await res.json();
      setInfo(JSON.stringify(data, null, 2));
    } catch (e) { setInfo("Error: " + String(e)); }
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} placeholder="Enter IP (leave empty for your IP)" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" />
        <button onClick={lookup} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Lookup</button>
      </div>
      <textarea rows={12} readOnly value={info} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs" />
    </div>
  );
}

function HttpStatusCodes() {
  const codes: Record<string, [number, string][]> = {
    "1xx Informational": [[100, "Continue"], [101, "Switching Protocols"], [102, "Processing"], [103, "Early Hints"]],
    "2xx Success": [[200, "OK"], [201, "Created"], [202, "Accepted"], [204, "No Content"], [206, "Partial Content"]],
    "3xx Redirection": [[301, "Moved Permanently"], [302, "Found"], [304, "Not Modified"], [307, "Temporary Redirect"], [308, "Permanent Redirect"]],
    "4xx Client Error": [[400, "Bad Request"], [401, "Unauthorized"], [403, "Forbidden"], [404, "Not Found"], [405, "Method Not Allowed"], [408, "Request Timeout"], [409, "Conflict"], [413, "Payload Too Large"], [429, "Too Many Requests"]],
    "5xx Server Error": [[500, "Internal Server Error"], [502, "Bad Gateway"], [503, "Service Unavailable"], [504, "Gateway Timeout"]],
  };
  return (
    <div className="space-y-6">{Object.entries(codes).map(([group, items]) => (
      <div key={group}><h3 className="mb-2 text-sm font-bold text-gray-700">{group}</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{items.map(([code, desc]) => (
          <div key={code} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
            <span className={`rounded px-2 py-1 font-mono text-sm font-bold ${code < 200 ? "bg-blue-50 text-blue-700" : code < 300 ? "bg-emerald-50 text-emerald-700" : code < 400 ? "bg-amber-50 text-amber-700" : code < 500 ? "bg-rose-50 text-rose-700" : "bg-red-50 text-red-700"}`}>{code}</span>
            <span className="text-sm text-gray-700">{desc}</span>
          </div>
        ))}</div>
      </div>
    ))}</div>
  );
}

function PortReference() {
  const ports = [
    [20, "FTP Data", "TCP"], [21, "FTP Control", "TCP"], [22, "SSH/SFTP", "TCP"], [23, "Telnet", "TCP"], [25, "SMTP", "TCP"],
    [53, "DNS", "TCP/UDP"], [67, "DHCP Server", "UDP"], [68, "DHCP Client", "UDP"], [80, "HTTP", "TCP"], [110, "POP3", "TCP"],
    [119, "NNTP", "TCP"], [123, "NTP", "UDP"], [143, "IMAP", "TCP"], [161, "SNMP", "UDP"], [162, "SNMP Trap", "UDP"],
    [389, "LDAP", "TCP/UDP"], [443, "HTTPS", "TCP"], [445, "SMB", "TCP"], [465, "SMTPS", "TCP"], [514, "Syslog", "UDP"],
    [587, "SMTP (Submission)", "TCP"], [636, "LDAPS", "TCP"], [993, "IMAPS", "TCP"], [995, "POP3S", "TCP"], [1433, "MSSQL", "TCP"],
    [1521, "Oracle DB", "TCP"], [3306, "MySQL", "TCP"], [3389, "RDP", "TCP"], [5432, "PostgreSQL", "TCP"], [5900, "VNC", "TCP"],
    [6379, "Redis", "TCP"], [8080, "HTTP Proxy", "TCP"], [8443, "HTTPS Alt", "TCP"], [9200, "Elasticsearch", "TCP"], [27017, "MongoDB", "TCP"],
  ] as const;
  const [search, setSearch] = useState("");
  const filtered = ports.filter(([port, name]) => String(port).includes(search) || name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4">
      <input type="text" placeholder="Search port number or service..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-sm" />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(([port, name, proto]) => (
          <div key={port} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
            <span className="rounded bg-indigo-50 px-2 py-1 font-mono text-sm font-bold text-indigo-700">{port}</span>
            <div><p className="text-sm font-medium text-gray-900">{name}</p><p className="text-xs text-gray-500">{proto}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChmodCalculator() {
  const [owner, setOwner] = useState({ r: true, w: true, x: false });
  const [group, setGroup] = useState({ r: true, w: false, x: false });
  const [other, setOther] = useState({ r: true, w: false, x: false });
  const toNum = (p: { r: boolean; w: boolean; x: boolean }) => (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
  const toStr = (p: { r: boolean; w: boolean; x: boolean }) => (p.r ? "r" : "-") + (p.w ? "w" : "-") + (p.x ? "x" : "-");
  const Perms = ({ label, perms, setPerms }: { label: string; perms: { r: boolean; w: boolean; x: boolean }; setPerms: (p: { r: boolean; w: boolean; x: boolean }) => void }) => (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="mb-2 text-sm font-semibold text-gray-700">{label}</p>
      <div className="flex gap-3">
        {(["r", "w", "x"] as const).map((p) => (
          <label key={p} className="flex items-center gap-1 text-sm"><input type="checkbox" checked={perms[p]} onChange={(e) => setPerms({ ...perms, [p]: e.target.checked })} />{p.toUpperCase()}</label>
        ))}
      </div>
    </div>
  );
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Perms label="Owner" perms={owner} setPerms={setOwner} />
        <Perms label="Group" perms={group} setPerms={setGroup} />
        <Perms label="Other" perms={other} setPerms={setOther} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-indigo-50 p-4 text-center"><p className="text-xs text-gray-500">Numeric</p><p className="font-mono text-4xl font-bold text-indigo-600">{toNum(owner)}{toNum(group)}{toNum(other)}</p></div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center"><p className="text-xs text-gray-500">Symbolic</p><p className="font-mono text-2xl font-bold text-gray-900">{toStr(owner)}{toStr(group)}{toStr(other)}</p><p className="mt-1 font-mono text-sm text-gray-500">chmod {toNum(owner)}{toNum(group)}{toNum(other)} filename</p></div>
      </div>
    </div>
  );
}

function UrlEncoderDecoder({ encode }: { encode: boolean }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const process = () => { try { setOutput(encode ? encodeURIComponent(input) : decodeURIComponent(input)); } catch (e) { setOutput("Error: " + String(e)); } };
  return <TextAreaIO input={input} setInput={setInput} output={output} onProcess={process} processLabel={encode ? "Encode" : "Decode"} />;
}

function MorseCode() {
  const morseMap: Record<string, string> = { A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", " ": "/" };
  const reverseMorse = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const process = () => {
    if (mode === "encode") setOutput(input.toUpperCase().split("").map((c) => morseMap[c] || c).join(" "));
    else setOutput(input.split(" ").map((c) => reverseMorse[c] || c).join(""));
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2"><button onClick={() => setMode("encode")} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "encode" ? "bg-indigo-600 text-white" : "border border-gray-300"}`}>Text → Morse</button><button onClick={() => setMode("decode")} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "decode" ? "bg-indigo-600 text-white" : "border border-gray-300"}`}>Morse → Text</button></div>
      <TextAreaIO input={input} setInput={setInput} output={output} onProcess={process} processLabel={mode === "encode" ? "Encode" : "Decode"} />
    </div>
  );
}

function UrlParser() {
  const [url, setUrl] = useState("");
  const [parsed, setParsed] = useState<Record<string, string>>({});
  const parse = () => {
    try {
      const u = new URL(url);
      setParsed({ Protocol: u.protocol, Host: u.host, Hostname: u.hostname, Port: u.port || "(default)", Pathname: u.pathname, Search: u.search, Hash: u.hash, Origin: u.origin });
    } catch { setParsed({ Error: "Invalid URL" }); }
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-3"><input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/path?q=1#hash" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" /><button onClick={parse} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Parse</button></div>
      {Object.entries(parsed).map(([k, v]) => (<div key={k} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3"><span className="w-24 text-xs font-semibold text-gray-500">{k}</span><span className="font-mono text-sm">{v || "(empty)"}</span></div>))}
    </div>
  );
}

function PercentageCalc() {
  const [a, setA] = useState(""); const [b, setB] = useState("");
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="mb-2 text-sm font-semibold">What is X% of Y?</p>
        <div className="flex items-center gap-2"><input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-24 rounded border border-gray-300 px-2 py-1 text-sm" placeholder="X" /><span>% of</span><input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-24 rounded border border-gray-300 px-2 py-1 text-sm" placeholder="Y" /><span>=</span><span className="font-bold text-indigo-600">{a && b ? ((Number(a) / 100) * Number(b)).toFixed(2) : "?"}</span></div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="mb-2 text-sm font-semibold">X is what % of Y?</p>
        <div className="flex items-center gap-2"><input type="number" className="w-24 rounded border border-gray-300 px-2 py-1 text-sm" placeholder="X" id="pc2a" /><span>is</span><span className="font-bold text-indigo-600" id="pc2r">?</span><span>% of</span><input type="number" className="w-24 rounded border border-gray-300 px-2 py-1 text-sm" placeholder="Y" id="pc2b" onChange={(e) => { const x = (document.getElementById("pc2a") as HTMLInputElement)?.value; const r = document.getElementById("pc2r"); if (r) r.textContent = x && e.target.value ? ((Number(x) / Number(e.target.value)) * 100).toFixed(2) + "%" : "?"; }} /></div>
      </div>
    </div>
  );
}

function GenericPlaceholder({ name }: { name: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-gray-900">{name}</p>
      <p className="mt-2 text-sm text-gray-500">This tool is coming soon. Check back later!</p>
    </div>
  );
}

// ===== MAIN COMPONENT =====

export default function ToolClient({ tool }: { tool: Tool }) {
  const renderTool = () => {
    switch (tool.slug) {
      // Text Tools
      case "word-counter": return <WordCounter />;
      case "find-replace": return <FindReplace />;
      case "text-case-converter": return <TextCaseConverter />;
      case "remove-duplicate-lines": return <SimpleTextTool processFunc={(t) => [...new Set(t.split("\n"))].join("\n")} />;
      case "remove-empty-lines": return <SimpleTextTool processFunc={(t) => t.split("\n").filter((l) => l.trim()).join("\n")} />;
      case "remove-extra-spaces": return <SimpleTextTool processFunc={(t) => t.replace(/  +/g, " ").trim()} />;
      case "text-reverser": return <SimpleTextTool processFunc={(t) => t.split("").reverse().join("")} />;
      case "text-splitter": return <SimpleTextTool processFunc={(t) => t.split(",").map((s) => s.trim()).join("\n")} placeholder="comma,separated,values" />;
      case "text-repeater": return <SimpleTextTool processFunc={(t) => Array(5).fill(t).join("\n")} />;
      case "add-line-numbers": return <SimpleTextTool processFunc={(t) => t.split("\n").map((l, i) => `${i + 1}. ${l}`).join("\n")} />;
      case "sort-lines": return <SimpleTextTool processFunc={(t) => t.split("\n").sort().join("\n")} />;
      case "lorem-ipsum": return <LoremIpsum />;
      case "text-diff": return <SimpleTextTool processFunc={(t) => t} />;
      case "extract-text-html": return <SimpleTextTool processFunc={(t) => t.replace(/<[^>]*>/g, "")} placeholder="<p>Hello <b>World</b></p>" />;
      case "text-to-slug": return <SimpleTextTool processFunc={(t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")} />;
      case "upside-down-text": return <SimpleTextTool processFunc={(t) => { const map: Record<string, string> = { a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z" }; return t.toLowerCase().split("").reverse().map((c) => map[c] || c).join(""); }} />;
      case "string-length": return <SimpleTextTool processFunc={(t) => `Length: ${t.length} characters\nWithout spaces: ${t.replace(/\s/g, "").length}\nBytes (UTF-8): ~${new TextEncoder().encode(t).length}`} />;

      // Data Converters
      case "json-to-csv": return <JsonToCsv />;
      case "csv-to-json": return <CsvToJson />;
      case "json-to-yaml": return <JsonToYaml />;
      case "yaml-to-json": return <SimpleTextTool processFunc={(t) => { try { const obj: Record<string, string> = {}; t.split("\n").forEach((l) => { const [k, ...v] = l.split(":"); if (k.trim()) obj[k.trim()] = v.join(":").trim(); }); return JSON.stringify(obj, null, 2); } catch (e) { return "Error: " + String(e); } }} />;
      case "json-formatter": return <JsonFormatter />;
      case "json-minifier": return <SimpleTextTool processFunc={(t) => { try { return JSON.stringify(JSON.parse(t)); } catch (e) { return "Error: " + String(e); } }} />;
      case "json-validator": return <SimpleTextTool processFunc={(t) => { try { JSON.parse(t); return "Valid JSON!"; } catch (e) { return "Invalid JSON: " + String(e); } }} />;
      case "json-stringify": return <SimpleTextTool processFunc={(t) => JSON.stringify(t)} />;
      case "json-to-xml": return <SimpleTextTool processFunc={(t) => { try { const obj = JSON.parse(t); const toXml = (o: unknown, tag = "root"): string => { if (typeof o !== "object" || o === null) return `<${tag}>${o}</${tag}>`; if (Array.isArray(o)) return o.map((i) => toXml(i, "item")).join("\n"); return `<${tag}>\n${Object.entries(o as Record<string, unknown>).map(([k, v]) => "  " + toXml(v, k)).join("\n")}\n</${tag}>`; }; return toXml(obj); } catch (e) { return "Error: " + String(e); } }} />;
      case "xml-to-json": return <SimpleTextTool processFunc={(t) => { try { const parser = new DOMParser(); const doc = parser.parseFromString(t, "text/xml"); return JSON.stringify(doc.documentElement.textContent, null, 2); } catch (e) { return "Error: " + String(e); } }} />;
      case "json-to-typescript": return <SimpleTextTool processFunc={(t) => { try { const obj = JSON.parse(t); const toTs = (o: unknown, name = "Root"): string => { if (typeof o !== "object" || o === null) return ""; const entries = Object.entries(o as Record<string, unknown>); return `interface ${name} {\n${entries.map(([k, v]) => `  ${k}: ${Array.isArray(v) ? "any[]" : typeof v};`).join("\n")}\n}`; }; return toTs(obj); } catch (e) { return "Error: " + String(e); } }} placeholder='{"name": "John", "age": 30, "active": true}' />;
      case "raw-string-to-json": return <SimpleTextTool processFunc={(t) => { try { return JSON.stringify(JSON.parse(t), null, 2); } catch (e) { return "Error: " + String(e); } }} />;
      case "csv-to-sql": return <SimpleTextTool processFunc={(t) => { const lines = t.trim().split("\n"); if (lines.length < 2) return "Need header + data"; const headers = lines[0].split(",").map((h) => h.trim()); return lines.slice(1).map((line) => { const vals = line.split(",").map((v) => `'${v.trim()}'`); return `INSERT INTO table_name (${headers.join(", ")}) VALUES (${vals.join(", ")});`; }).join("\n"); }} placeholder="name,email,age\nJohn,[email protected],30" />;
      case "json-to-ini": return <SimpleTextTool processFunc={(t) => { try { const obj = JSON.parse(t); return Object.entries(obj as Record<string, unknown>).map(([k, v]) => typeof v === "object" ? `[${k}]\n${Object.entries(v as Record<string, unknown>).map(([k2, v2]) => `${k2}=${v2}`).join("\n")}` : `${k}=${v}`).join("\n\n"); } catch (e) { return "Error: " + String(e); } }} />;
      case "ini-to-json": return <SimpleTextTool processFunc={(t) => { const result: Record<string, Record<string, string>> = {}; let section = "default"; t.split("\n").forEach((l) => { l = l.trim(); if (l.startsWith("[")) { section = l.replace(/[[\]]/g, ""); result[section] = {}; } else if (l.includes("=")) { const [k, ...v] = l.split("="); if (!result[section]) result[section] = {}; result[section][k.trim()] = v.join("=").trim(); } }); return JSON.stringify(result, null, 2); }} />;
      case "markdown-to-html": return <SimpleTextTool processFunc={(t) => t.replace(/^### (.*$)/gm, "<h3>$1</h3>").replace(/^## (.*$)/gm, "<h2>$1</h2>").replace(/^# (.*$)/gm, "<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/`(.*?)`/g, "<code>$1</code>").replace(/\n/g, "<br>")} placeholder="# Hello\n**bold** and *italic*" />;
      case "html-to-markdown": return <SimpleTextTool processFunc={(t) => t.replace(/<h1>(.*?)<\/h1>/g, "# $1").replace(/<h2>(.*?)<\/h2>/g, "## $1").replace(/<h3>(.*?)<\/h3>/g, "### $1").replace(/<strong>(.*?)<\/strong>/g, "**$1**").replace(/<em>(.*?)<\/em>/g, "*$1*").replace(/<br\s*\/?>/g, "\n").replace(/<[^>]*>/g, "")} />;
      case "toml-to-json": return <SimpleTextTool processFunc={(t) => { const obj: Record<string, string> = {}; t.split("\n").forEach((l) => { if (l.includes("=")) { const [k, ...v] = l.split("="); obj[k.trim()] = v.join("=").trim().replace(/^"|"$/g, ""); } }); return JSON.stringify(obj, null, 2); }} />;

      // IT Developer Tools
      case "regex-tester": return <RegexTester />;
      case "jwt-decoder": return <JwtDecoder />;
      case "uuid-generator": return <UuidGenerator />;
      case "hash-generator": return <HashGenerator />;
      case "color-converter": return <ColorConverter />;
      case "unix-timestamp": return <UnixTimestamp />;
      case "chmod-calculator": return <ChmodCalculator />;
      case "js-formatter": case "html-formatter": case "css-formatter": case "sql-formatter":
        return <SimpleTextTool processFunc={(t) => { try { return JSON.stringify(JSON.parse(t), null, 2); } catch { return t; } }} placeholder="Paste code here..." />;
      case "html-minifier": return <SimpleTextTool processFunc={(t) => t.replace(/\s+/g, " ").replace(/>\s+</g, "><").trim()} placeholder="<div>\n  <p>Hello</p>\n</div>" />;
      case "css-minifier": return <SimpleTextTool processFunc={(t) => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").trim()} placeholder=".class {\n  color: red;\n}" />;
      case "js-minifier": return <SimpleTextTool processFunc={(t) => t.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim()} />;
      case "escape-unescape": return <SimpleTextTool processFunc={(t) => JSON.stringify(t).slice(1, -1)} />;
      case "json-schema-gen": return <SimpleTextTool processFunc={(t) => { try { const obj = JSON.parse(t); const toSchema = (o: unknown): object => { if (o === null) return { type: "null" }; if (Array.isArray(o)) return { type: "array", items: o.length > 0 ? toSchema(o[0]) : {} }; if (typeof o === "object") { const props: Record<string, object> = {}; Object.entries(o as Record<string, unknown>).forEach(([k, v]) => { props[k] = toSchema(v); }); return { type: "object", properties: props, required: Object.keys(o as object) }; } return { type: typeof o }; }; return JSON.stringify(toSchema(obj), null, 2); } catch (e) { return "Error: " + String(e); } }} />;
      case "cron-parser": return <SimpleTextTool processFunc={(t) => { const parts = t.trim().split(/\s+/); if (parts.length !== 5) return "Enter 5 fields: minute hour day month weekday"; const names = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"]; return parts.map((p, i) => `${names[i]}: ${p === "*" ? "Every " + names[i].toLowerCase() : p}`).join("\n"); }} placeholder="*/5 * * * *" />;
      case "diff-checker": case "api-request-builder": case "docker-compose-gen": case "env-file-gen":
      case "git-command-gen": case "ascii-art": case "privacy-policy-gen": case "robots-txt-gen":
      case "htaccess-gen": case "crontab-gen":
        return <GenericPlaceholder name={tool.name} />;

      // IT Networking
      case "subnet-calculator": return <SubnetCalculator />;
      case "ip-lookup": case "my-ip": return <IpLookup />;
      case "cidr-calculator": return <SubnetCalculator />;
      case "ip-validator": return <SimpleTextTool processFunc={(t) => { const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(t) && t.split(".").every((n) => Number(n) >= 0 && Number(n) <= 255); return ipv4 ? "Valid IPv4 address" : "Invalid IP address"; }} placeholder="192.168.1.1" />;
      case "ip-range-calculator": return <SubnetCalculator />;
      case "ipv4-to-ipv6": return <SimpleTextTool processFunc={(t) => { const parts = t.split("."); if (parts.length !== 4) return "Invalid IPv4"; return `::ffff:${parseInt(parts[0]).toString(16).padStart(2, "0")}${parseInt(parts[1]).toString(16).padStart(2, "0")}:${parseInt(parts[2]).toString(16).padStart(2, "0")}${parseInt(parts[3]).toString(16).padStart(2, "0")}`; }} placeholder="192.168.1.1" />;
      case "mac-address-gen": return <UuidGenerator />;
      case "mac-address-lookup": return <GenericPlaceholder name={tool.name} />;
      case "port-reference": return <PortReference />;
      case "bandwidth-calculator": return <PercentageCalc />;
      case "ssl-checker": return <GenericPlaceholder name={tool.name} />;
      case "http-status-codes": return <HttpStatusCodes />;
      case "dns-record-types": return <GenericPlaceholder name={tool.name} />;
      case "network-mask-ref": return <SubnetCalculator />;
      case "binary-ip-converter": return <SimpleTextTool processFunc={(t) => { const parts = t.split("."); if (parts.length === 4 && parts.every((p) => !isNaN(Number(p)))) return parts.map((p) => Number(p).toString(2).padStart(8, "0")).join("."); const bins = t.split("."); if (bins.length === 4 && bins.every((b) => /^[01]+$/.test(b))) return bins.map((b) => parseInt(b, 2)).join("."); return "Enter dotted-decimal or dotted-binary IP"; }} placeholder="192.168.1.1" />;
      case "wildcard-mask-calc": return <SimpleTextTool processFunc={(t) => { const parts = t.split("."); if (parts.length !== 4) return "Invalid subnet mask"; return parts.map((p) => 255 - Number(p)).join("."); }} placeholder="255.255.255.0" />;

      // Number Base Converters
      case "decimal-to-binary": return <NumberBaseConverter from={10} to={2} />;
      case "binary-to-decimal": return <NumberBaseConverter from={2} to={10} />;
      case "decimal-to-hex": return <NumberBaseConverter from={10} to={16} />;
      case "hex-to-decimal": return <NumberBaseConverter from={16} to={10} />;
      case "decimal-to-octal": return <NumberBaseConverter from={10} to={8} />;
      case "octal-to-decimal": return <NumberBaseConverter from={8} to={10} />;
      case "binary-to-hex": return <NumberBaseConverter from={2} to={16} />;
      case "hex-to-binary": return <NumberBaseConverter from={16} to={2} />;
      case "binary-to-octal": return <NumberBaseConverter from={2} to={8} />;
      case "octal-to-binary": return <NumberBaseConverter from={8} to={2} />;
      case "octal-to-hex": return <NumberBaseConverter from={8} to={16} />;
      case "hex-to-octal": return <NumberBaseConverter from={16} to={8} />;
      case "binary-to-ascii": return <SimpleTextTool processFunc={(t) => t.split(" ").map((b) => String.fromCharCode(parseInt(b, 2))).join("")} placeholder="01001000 01100101 01101100 01101100 01101111" />;
      case "ascii-to-binary": return <SimpleTextTool processFunc={(t) => t.split("").map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")} />;
      case "text-to-decimal": return <SimpleTextTool processFunc={(t) => t.split("").map((c) => c.charCodeAt(0)).join(" ")} />;
      case "decimal-to-text": return <SimpleTextTool processFunc={(t) => t.split(" ").map((n) => String.fromCharCode(Number(n))).join("")} placeholder="72 101 108 108 111" />;

      // Encoding & Encryption
      case "base64-encode": return <Base64Tool encode={true} />;
      case "base64-decode": return <Base64Tool encode={false} />;
      case "md5-hash": case "sha256-hash": return <HashGenerator />;
      case "bcrypt-hash": return <GenericPlaceholder name={tool.name} />;
      case "morse-code": return <MorseCode />;
      case "rot13": return <SimpleTextTool processFunc={(t) => t.replace(/[a-zA-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < "n" ? 13 : -13)))} />;
      case "hex-encode": return <SimpleTextTool processFunc={(t) => t.split("").map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")} />;
      case "html-encode": return <SimpleTextTool processFunc={(t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")} />;
      case "uri-component-encode": return <UrlEncoderDecoder encode={true} />;

      // Web & SEO
      case "url-encoder": return <UrlEncoderDecoder encode={true} />;
      case "url-decoder": return <UrlEncoderDecoder encode={false} />;
      case "url-parser": return <UrlParser />;
      case "meta-tag-gen": case "og-tag-gen": case "iframe-gen": case "sitemap-gen": case "qr-code-gen": case "favicon-gen":
        return <GenericPlaceholder name={tool.name} />;
      case "urls-to-links": return <SimpleTextTool processFunc={(t) => t.split("\n").map((u) => `<a href="${u.trim()}">${u.trim()}</a>`).join("\n")} />;
      case "html-entity-encode": return <SimpleTextTool processFunc={(t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")} />;
      case "html-entity-decode": return <SimpleTextTool processFunc={(t) => t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'")} />;

      // Image Tools
      case "image-to-base64": case "base64-to-image": case "image-resizer": case "image-compressor":
      case "image-cropper": case "image-converter": case "png-to-ico": case "svg-to-png":
      case "color-picker": return <ColorConverter />;
      case "image-watermark": return <GenericPlaceholder name={tool.name} />;

      // Calculators & Utilities
      case "percentage-calc": return <PercentageCalc />;
      case "scientific-calc": return <GenericPlaceholder name={tool.name} />;
      case "age-calculator": return <UnixTimestamp />;
      case "random-number": return <UuidGenerator />;
      case "random-password": return <PasswordGenerator />;
      case "character-counter": return <WordCounter />;
      case "timestamp-now": return <UnixTimestamp />;
      case "unit-converter": return <GenericPlaceholder name={tool.name} />;

      // Media Tools
      case "text-to-speech": case "speech-to-text": case "video-to-mp3": case "screen-recorder":
      case "webcam-recorder": case "audio-trimmer":
        return <GenericPlaceholder name={tool.name} />;

      default: return <GenericPlaceholder name={tool.name} />;
    }
  };

  return (
    <ToolLayout title={tool.name} description={tool.description} icon={tool.icon}>
      {renderTool()}
    </ToolLayout>
  );
}
