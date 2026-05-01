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

function DiffChecker() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diff, setDiff] = useState<{ line: number; a: string; b: string; type: string }[]>([]);
  const compare = () => {
    const linesA = textA.split("\n");
    const linesB = textB.split("\n");
    const max = Math.max(linesA.length, linesB.length);
    const result: { line: number; a: string; b: string; type: string }[] = [];
    for (let i = 0; i < max; i++) {
      const a = linesA[i] ?? "";
      const b = linesB[i] ?? "";
      result.push({ line: i + 1, a, b, type: a === b ? "same" : i >= linesA.length ? "added" : i >= linesB.length ? "removed" : "changed" });
    }
    setDiff(result);
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Original</label><textarea rows={10} value={textA} onChange={(e) => setTextA(e.target.value)} placeholder="Paste original text..." className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs outline-none focus:border-indigo-500" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Modified</label><textarea rows={10} value={textB} onChange={(e) => setTextB(e.target.value)} placeholder="Paste modified text..." className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs outline-none focus:border-indigo-500" /></div>
      </div>
      <button onClick={compare} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Compare</button>
      {diff.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white overflow-auto max-h-96">
          {diff.map((d) => (
            <div key={d.line} className={`flex font-mono text-xs border-b border-gray-100 ${d.type === "same" ? "" : d.type === "added" ? "bg-emerald-50" : d.type === "removed" ? "bg-rose-50" : "bg-amber-50"}`}>
              <span className="w-8 flex-shrink-0 border-r border-gray-200 px-1 py-1 text-center text-gray-400">{d.line}</span>
              <span className="flex-1 px-2 py-1 whitespace-pre-wrap">{d.type === "removed" ? d.a : d.type === "added" ? d.b : d.type === "changed" ? `- ${d.a}\n+ ${d.b}` : d.a}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ApiRequestBuilder() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("Content-Type: application/json");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const send = async () => {
    try {
      const headerObj: Record<string, string> = {};
      headers.split("\n").forEach((h) => { const [k, ...v] = h.split(":"); if (k.trim()) headerObj[k.trim()] = v.join(":").trim(); });
      const opts: RequestInit = { method, headers: headerObj };
      if (method !== "GET" && method !== "HEAD" && body) opts.body = body;
      const res = await fetch(url, opts);
      setStatus(`${res.status} ${res.statusText}`);
      const text = await res.text();
      try { setResponse(JSON.stringify(JSON.parse(text), null, 2)); } catch { setResponse(text); }
    } catch (e) { setResponse("Error: " + String(e)); setStatus("Failed"); }
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold">{["GET","POST","PUT","PATCH","DELETE","HEAD","OPTIONS"].map((m)=>(<option key={m}>{m}</option>))}</select>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/endpoint" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" />
        <button onClick={send} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Send</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Headers</label><textarea rows={4} value={headers} onChange={(e) => setHeaders(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs outline-none focus:border-indigo-500" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Body</label><textarea rows={4} value={body} onChange={(e) => setBody(e.target.value)} placeholder='{"key": "value"}' className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs outline-none focus:border-indigo-500" /></div>
      </div>
      {status && <div className="flex items-center gap-2"><span className="text-sm font-medium text-gray-700">Status:</span><span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${status.startsWith("2") ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{status}</span></div>}
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Response</label><textarea rows={10} readOnly value={response} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs" /></div>
    </div>
  );
}

function DockerComposeGen() {
  const [serviceName, setServiceName] = useState("web");
  const [image, setImage] = useState("nginx:latest");
  const [ports, setPorts] = useState("80:80");
  const [volumes, setVolumes] = useState("./data:/data");
  const [envVars, setEnvVars] = useState("NODE_ENV=production");
  const [restart, setRestart] = useState("unless-stopped");
  const generate = () => {
    const portLines = ports.split("\n").filter(Boolean).map((p) => `      - "${p.trim()}"`).join("\n");
    const volLines = volumes.split("\n").filter(Boolean).map((v) => `      - ${v.trim()}`).join("\n");
    const envLines = envVars.split("\n").filter(Boolean).map((e) => `      - ${e.trim()}`).join("\n");
    return `version: "3.8"\n\nservices:\n  ${serviceName}:\n    image: ${image}\n    restart: ${restart}\n    ports:\n${portLines}\n    volumes:\n${volLines}\n    environment:\n${envLines}`;
  };
  const [output, setOutput] = useState("");
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Service Name</label><input type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Image</label><input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Ports (one per line)</label><textarea rows={3} value={ports} onChange={(e) => setPorts(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Volumes (one per line)</label><textarea rows={3} value={volumes} onChange={(e) => setVolumes(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs" /></div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Environment Variables</label><textarea rows={3} value={envVars} onChange={(e) => setEnvVars(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Restart Policy</label><select value={restart} onChange={(e) => setRestart(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option>no</option><option>always</option><option>on-failure</option><option>unless-stopped</option></select></div>
      </div>
      <button onClick={() => setOutput(generate())} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate docker-compose.yml</button>
      <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-gray-700">Output</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-indigo-600">Copy</button></div><textarea rows={14} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs" /></div>
    </div>
  );
}

function EnvFileGen() {
  const [vars, setVars] = useState([{ key: "DATABASE_URL", value: "postgresql://localhost:5432/mydb" }, { key: "API_KEY", value: "" }, { key: "NODE_ENV", value: "development" }]);
  const [output, setOutput] = useState("");
  const addVar = () => setVars([...vars, { key: "", value: "" }]);
  const updateVar = (i: number, field: "key" | "value", val: string) => { const n = [...vars]; n[i][field] = val; setVars(n); };
  const removeVar = (i: number) => setVars(vars.filter((_, idx) => idx !== i));
  const generate = () => setOutput(vars.filter((v) => v.key).map((v) => `${v.key}=${v.value}`).join("\n"));
  return (
    <div className="space-y-4">
      {vars.map((v, i) => (
        <div key={i} className="flex gap-2">
          <input type="text" value={v.key} onChange={(e) => updateVar(i, "key", e.target.value)} placeholder="KEY" className="w-48 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" />
          <span className="py-2">=</span>
          <input type="text" value={v.value} onChange={(e) => updateVar(i, "value", e.target.value)} placeholder="value" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" />
          <button onClick={() => removeVar(i)} className="text-rose-600 hover:text-rose-800 text-sm">Remove</button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={addVar} className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">+ Add Variable</button>
        <button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate .env</button>
      </div>
      <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-gray-700">.env Output</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-indigo-600">Copy</button></div><textarea rows={8} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm" /></div>
    </div>
  );
}

function GitCommandGen() {
  const [action, setAction] = useState("clone");
  const [param, setParam] = useState("");
  const commands: Record<string, { label: string; template: (p: string) => string; placeholder: string }> = {
    clone: { label: "Clone", template: (p) => `git clone ${p || "https://github.com/user/repo.git"}`, placeholder: "repo URL" },
    branch: { label: "Create Branch", template: (p) => `git checkout -b ${p || "feature/new-feature"}`, placeholder: "branch name" },
    commit: { label: "Commit", template: (p) => `git add -A && git commit -m "${p || "your commit message"}"`, placeholder: "commit message" },
    push: { label: "Push", template: (p) => `git push origin ${p || "main"}`, placeholder: "branch name" },
    pull: { label: "Pull", template: (p) => `git pull origin ${p || "main"}`, placeholder: "branch name" },
    merge: { label: "Merge", template: (p) => `git merge ${p || "feature-branch"}`, placeholder: "branch to merge" },
    stash: { label: "Stash", template: () => "git stash\n# To restore: git stash pop", placeholder: "" },
    log: { label: "Log", template: () => "git log --oneline --graph --all -20", placeholder: "" },
    reset: { label: "Undo Last Commit", template: () => "git reset --soft HEAD~1", placeholder: "" },
    tag: { label: "Create Tag", template: (p) => `git tag -a ${p || "v1.0.0"} -m "Release ${p || "v1.0.0"}"`, placeholder: "tag name" },
    rebase: { label: "Rebase", template: (p) => `git rebase ${p || "main"}`, placeholder: "base branch" },
    cherry: { label: "Cherry Pick", template: (p) => `git cherry-pick ${p || "<commit-hash>"}`, placeholder: "commit hash" },
  };
  const cmd = commands[action];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(commands).map(([key, c]) => (
          <button key={key} onClick={() => setAction(key)} className={`rounded-lg px-3 py-2 text-sm font-medium ${action === key ? "bg-indigo-600 text-white" : "border border-gray-300 hover:bg-gray-50"}`}>{c.label}</button>
        ))}
      </div>
      {cmd.placeholder && <input type="text" value={param} onChange={(e) => setParam(e.target.value)} placeholder={cmd.placeholder} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" />}
      <div className="rounded-lg bg-gray-900 p-4"><code className="text-sm text-emerald-400 whitespace-pre-wrap">{cmd.template(param)}</code></div>
      <button onClick={() => navigator.clipboard.writeText(cmd.template(param))} className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">Copy Command</button>
    </div>
  );
}

function AsciiArt() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const generate = () => {
    const bigLetters: Record<string, string[]> = {
      A: ["  #  ", " # # ", "#####", "#   #", "#   #"], B: ["#### ", "#   #", "#### ", "#   #", "#### "], C: [" ####", "#    ", "#    ", "#    ", " ####"],
      D: ["#### ", "#   #", "#   #", "#   #", "#### "], E: ["#####", "#    ", "#### ", "#    ", "#####"], F: ["#####", "#    ", "#### ", "#    ", "#    "],
      G: [" ####", "#    ", "# ###", "#   #", " ####"], H: ["#   #", "#   #", "#####", "#   #", "#   #"], I: ["#####", "  #  ", "  #  ", "  #  ", "#####"],
      J: ["#####", "    #", "    #", "#   #", " ### "], K: ["#   #", "#  # ", "###  ", "#  # ", "#   #"], L: ["#    ", "#    ", "#    ", "#    ", "#####"],
      M: ["#   #", "## ##", "# # #", "#   #", "#   #"], N: ["#   #", "##  #", "# # #", "#  ##", "#   #"], O: [" ### ", "#   #", "#   #", "#   #", " ### "],
      P: ["#### ", "#   #", "#### ", "#    ", "#    "], Q: [" ### ", "#   #", "# # #", "#  ##", " ####"], R: ["#### ", "#   #", "#### ", "#  # ", "#   #"],
      S: [" ####", "#    ", " ### ", "    #", "#### "], T: ["#####", "  #  ", "  #  ", "  #  ", "  #  "], U: ["#   #", "#   #", "#   #", "#   #", " ### "],
      V: ["#   #", "#   #", " # # ", " # # ", "  #  "], W: ["#   #", "#   #", "# # #", "## ##", "#   #"], X: ["#   #", " # # ", "  #  ", " # # ", "#   #"],
      Y: ["#   #", " # # ", "  #  ", "  #  ", "  #  "], Z: ["#####", "   # ", "  #  ", " #   ", "#####"], " ": ["     ", "     ", "     ", "     ", "     "],
    };
    const chars = input.toUpperCase().split("");
    const lines = [0, 1, 2, 3, 4].map((row) => chars.map((c) => (bigLetters[c] || bigLetters[" "])![row]).join(" "));
    setOutput(lines.join("\n"));
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-3"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..." className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" maxLength={20} /><button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate</button></div>
      <div className="rounded-lg bg-gray-900 p-4 overflow-x-auto"><pre className="text-emerald-400 text-xs">{output}</pre></div>
      <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-indigo-600">Copy</button>
    </div>
  );
}

function PrivacyPolicyGen() {
  const [siteName, setSiteName] = useState(""); const [siteUrl, setSiteUrl] = useState(""); const [email, setEmail] = useState(""); const [output, setOutput] = useState("");
  const generate = () => {
    setOutput(`Privacy Policy for ${siteName || "[Your Site]"}\nLast updated: ${new Date().toLocaleDateString()}\nURL: ${siteUrl || "[Your URL]"}\n\n1. Information We Collect\nWe may collect personal information that you voluntarily provide when using ${siteName || "our website"}, including name, email address, and usage data.\n\n2. How We Use Your Information\nWe use collected information to:\n- Provide and maintain our services\n- Improve user experience\n- Send periodic emails and updates\n- Respond to inquiries and support requests\n\n3. Data Protection\nWe implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction.\n\n4. Third-Party Services\nWe may employ third-party services for analytics, payment processing, and advertising. These services may collect information sent by your browser.\n\n5. Cookies\nWe use cookies to improve your browsing experience. You may choose to disable cookies through your browser settings.\n\n6. Children's Privacy\nOur services are not directed to individuals under 13. We do not knowingly collect information from children.\n\n7. Changes to This Policy\nWe may update this privacy policy from time to time. Changes will be posted on this page.\n\n8. Contact Us\nIf you have questions about this privacy policy, contact us at: ${email || "[your@email.com]"}`);
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Site Name</label><input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="My Website" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Site URL</label><input type="text" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} placeholder="https://example.com" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Contact Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="[email protected]" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
      </div>
      <button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate Privacy Policy</button>
      <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-gray-700">Generated Policy</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-indigo-600">Copy</button></div><textarea rows={16} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm" /></div>
    </div>
  );
}

function RobotsTxtGen() {
  const [allow, setAllow] = useState("/"); const [disallow, setDisallow] = useState("/admin/\n/private/"); const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml"); const [output, setOutput] = useState("");
  const generate = () => {
    const lines = ["User-agent: *"];
    allow.split("\n").filter(Boolean).forEach((a) => lines.push(`Allow: ${a.trim()}`));
    disallow.split("\n").filter(Boolean).forEach((d) => lines.push(`Disallow: ${d.trim()}`));
    if (sitemap.trim()) lines.push("", `Sitemap: ${sitemap.trim()}`);
    setOutput(lines.join("\n"));
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Allow (one per line)</label><textarea rows={3} value={allow} onChange={(e) => setAllow(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Disallow (one per line)</label><textarea rows={3} value={disallow} onChange={(e) => setDisallow(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs" /></div>
      </div>
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Sitemap URL</label><input type="text" value={sitemap} onChange={(e) => setSitemap(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" /></div>
      <button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate robots.txt</button>
      <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-gray-700">Output</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-indigo-600">Copy</button></div><textarea rows={8} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm" /></div>
    </div>
  );
}

function HtaccessGen() {
  const [rules, setRules] = useState<{ from: string; to: string; type: string }[]>([{ from: "/old-page", to: "/new-page", type: "301" }]);
  const [www, setWww] = useState("none"); const [https, setHttps] = useState(false); const [output, setOutput] = useState("");
  const addRule = () => setRules([...rules, { from: "", to: "", type: "301" }]);
  const generate = () => {
    const lines = ["RewriteEngine On", ""];
    if (https) lines.push("RewriteCond %{HTTPS} off", "RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]", "");
    if (www === "add") lines.push("RewriteCond %{HTTP_HOST} !^www\\.", "RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [L,R=301]", "");
    if (www === "remove") lines.push("RewriteCond %{HTTP_HOST} ^www\\.(.*)", "RewriteRule ^(.*)$ https://%1/$1 [L,R=301]", "");
    rules.forEach((r) => { if (r.from && r.to) lines.push(`RewriteRule ^${r.from.replace(/^\//, "")}$ ${r.to} [R=${r.type},L]`); });
    setOutput(lines.join("\n"));
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center flex-wrap">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={https} onChange={(e) => setHttps(e.target.checked)} />Force HTTPS</label>
        <select value={www} onChange={(e) => setWww(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="none">WWW: No change</option><option value="add">Add www</option><option value="remove">Remove www</option></select>
      </div>
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Redirect Rules</label>
        {rules.map((r, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input type="text" value={r.from} onChange={(e) => { const n = [...rules]; n[i].from = e.target.value; setRules(n); }} placeholder="/old-path" className="flex-1 rounded border border-gray-300 px-2 py-1 font-mono text-sm" />
            <span className="py-1">→</span>
            <input type="text" value={r.to} onChange={(e) => { const n = [...rules]; n[i].to = e.target.value; setRules(n); }} placeholder="/new-path" className="flex-1 rounded border border-gray-300 px-2 py-1 font-mono text-sm" />
            <select value={r.type} onChange={(e) => { const n = [...rules]; n[i].type = e.target.value; setRules(n); }} className="rounded border border-gray-300 px-2 py-1 text-sm"><option>301</option><option>302</option></select>
          </div>
        ))}
        <button onClick={addRule} className="text-sm text-indigo-600 hover:text-indigo-800">+ Add Rule</button>
      </div>
      <button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate .htaccess</button>
      <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-gray-700">Output</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-indigo-600">Copy</button></div><textarea rows={10} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs" /></div>
    </div>
  );
}

function CrontabGen() {
  const [minute, setMinute] = useState("*"); const [hour, setHour] = useState("*"); const [dom, setDom] = useState("*"); const [month, setMonth] = useState("*"); const [dow, setDow] = useState("*"); const [command, setCommand] = useState("/path/to/script.sh");
  const presets = [
    { label: "Every minute", v: ["*", "*", "*", "*", "*"] }, { label: "Every 5 min", v: ["*/5", "*", "*", "*", "*"] },
    { label: "Every hour", v: ["0", "*", "*", "*", "*"] }, { label: "Daily midnight", v: ["0", "0", "*", "*", "*"] },
    { label: "Weekly Sunday", v: ["0", "0", "*", "*", "0"] }, { label: "Monthly 1st", v: ["0", "0", "1", "*", "*"] },
  ];
  const cron = `${minute} ${hour} ${dom} ${month} ${dow} ${command}`;
  const explain = () => {
    const parts = [
      minute === "*" ? "every minute" : minute.startsWith("*/") ? `every ${minute.slice(2)} minutes` : `at minute ${minute}`,
      hour === "*" ? "" : hour.startsWith("*/") ? `every ${hour.slice(2)} hours` : `at hour ${hour}`,
      dom === "*" ? "" : `on day ${dom}`,
      month === "*" ? "" : `in month ${month}`,
      dow === "*" ? "" : `on weekday ${dow}`,
    ].filter(Boolean);
    return parts.join(", ");
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{presets.map((p) => (<button key={p.label} onClick={() => { setMinute(p.v[0]); setHour(p.v[1]); setDom(p.v[2]); setMonth(p.v[3]); setDow(p.v[4]); }} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs hover:bg-indigo-50">{p.label}</button>))}</div>
      <div className="grid grid-cols-5 gap-2">
        {[["Min", minute, setMinute], ["Hour", hour, setHour], ["Day", dom, setDom], ["Month", month, setMonth], ["Weekday", dow, setDow]].map(([label, val, setter]) => (
          <div key={label as string}><label className="mb-1 block text-xs text-gray-500">{label as string}</label><input type="text" value={val as string} onChange={(e) => (setter as (v:string)=>void)(e.target.value)} className="w-full rounded border border-gray-300 px-2 py-1 font-mono text-sm text-center" /></div>
        ))}
      </div>
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Command</label><input type="text" value={command} onChange={(e) => setCommand(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" /></div>
      <div className="rounded-lg bg-gray-900 p-4"><code className="text-emerald-400 font-mono text-sm">{cron}</code></div>
      <p className="text-sm text-gray-600">Schedule: {explain()}</p>
      <button onClick={() => navigator.clipboard.writeText(cron)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">Copy Crontab Line</button>
    </div>
  );
}

function MacAddressLookup() {
  const [mac, setMac] = useState("");
  const [result, setResult] = useState("");
  const oui: Record<string, string> = { "00:00:0C": "Cisco", "00:1A:2B": "Ayecom", "00:50:56": "VMware", "00:0C:29": "VMware", "00:1C:42": "Parallels", "08:00:27": "Oracle VirtualBox", "00:15:5D": "Microsoft Hyper-V", "00:25:90": "Super Micro", "DC:A6:32": "Raspberry Pi", "B8:27:EB": "Raspberry Pi", "00:1B:44": "SanDisk", "FC:FB:FB": "Cisco", "00:1E:67": "Intel", "3C:D9:2B": "Hewlett-Packard", "00:26:B9": "Dell", "F8:DB:88": "Dell", "00:23:AE": "Dell", "00:0D:56": "Dell", "AC:DE:48": "Private", "00:11:22": "Cimsys", "AA:BB:CC": "Unknown" };
  const lookup = () => {
    const clean = mac.toUpperCase().replace(/[^A-F0-9]/g, "");
    if (clean.length < 6) { setResult("Enter at least 6 hex characters"); return; }
    const prefix = `${clean.slice(0, 2)}:${clean.slice(2, 4)}:${clean.slice(4, 6)}`;
    const vendor = oui[prefix];
    setResult(vendor ? `Vendor: ${vendor}\nOUI Prefix: ${prefix}\nFull MAC: ${clean.match(/.{2}/g)?.join(":")}` : `OUI Prefix: ${prefix}\nVendor: Not found in local database\nFull MAC: ${clean.match(/.{2}/g)?.join(":")}\n\nNote: This tool uses a small local OUI database. For comprehensive lookups, visit ieee.org/regauth`);
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-3"><input type="text" value={mac} onChange={(e) => setMac(e.target.value)} placeholder="00:1A:2B:3C:4D:5E" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" /><button onClick={lookup} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Lookup</button></div>
      <textarea rows={6} readOnly value={result} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm" />
    </div>
  );
}

function SslChecker() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState("");
  const check = async () => {
    try {
      setResult("Checking...");
      const res = await fetch(`https://${domain.replace(/^https?:\/\//, "")}`, { mode: "no-cors" });
      setResult(`Domain: ${domain}\nStatus: Connection successful (HTTPS)\nNote: Detailed SSL certificate inspection requires server-side access.\n\nFor full SSL details, visit:\nhttps://www.ssllabs.com/ssltest/analyze.html?d=${encodeURIComponent(domain)}`);
      void res;
    } catch (e) { setResult(`Domain: ${domain}\nStatus: Could not connect\nError: ${String(e)}\n\nThis may indicate:\n- Invalid domain\n- No SSL certificate\n- Certificate expired\n- Connection blocked by CORS`); }
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-3"><input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" /><button onClick={check} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Check SSL</button></div>
      <textarea rows={8} readOnly value={result} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm" />
    </div>
  );
}

function DnsRecordTypes() {
  const records = [
    { type: "A", desc: "Maps domain to IPv4 address", example: "example.com → 93.184.216.34" },
    { type: "AAAA", desc: "Maps domain to IPv6 address", example: "example.com → 2606:2800:220:1:248:1893:25c8:1946" },
    { type: "CNAME", desc: "Alias for another domain", example: "www.example.com → example.com" },
    { type: "MX", desc: "Mail exchange server", example: "example.com → mail.example.com (priority 10)" },
    { type: "TXT", desc: "Text records (SPF, DKIM, etc.)", example: "v=spf1 include:_spf.google.com ~all" },
    { type: "NS", desc: "Name server for the domain", example: "example.com → ns1.example.com" },
    { type: "SOA", desc: "Start of authority, primary DNS info", example: "Serial, Refresh, Retry, Expire, TTL" },
    { type: "PTR", desc: "Reverse DNS lookup", example: "34.216.184.93.in-addr.arpa → example.com" },
    { type: "SRV", desc: "Service location record", example: "_sip._tcp.example.com → sipserver.example.com:5060" },
    { type: "CAA", desc: "Certificate Authority Authorization", example: "example.com → letsencrypt.org" },
    { type: "DNSKEY", desc: "DNSSEC public key", example: "Used for DNS Security Extensions" },
    { type: "DS", desc: "Delegation Signer (DNSSEC)", example: "Links child zone to parent zone" },
    { type: "NAPTR", desc: "Name Authority Pointer", example: "Used in SIP/ENUM applications" },
    { type: "SPF", desc: "Sender Policy Framework (deprecated, use TXT)", example: "v=spf1 ip4:192.0.2.0/24 -all" },
  ];
  const [search, setSearch] = useState("");
  const filtered = records.filter((r) => r.type.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4">
      <input type="text" placeholder="Search record types..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-sm" />
      <div className="space-y-3">
        {filtered.map((r) => (
          <div key={r.type} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-start gap-3"><span className="rounded bg-indigo-50 px-2 py-1 font-mono text-sm font-bold text-indigo-700">{r.type}</span><div><p className="text-sm font-medium text-gray-900">{r.desc}</p><p className="mt-1 font-mono text-xs text-gray-500">{r.example}</p></div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScientificCalc() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const click = (val: string) => {
    if (val === "C") { setDisplay("0"); setExpression(""); return; }
    if (val === "=") { try { const result = Function('"use strict"; return (' + expression + ")")(); setDisplay(String(result)); setExpression(String(result)); } catch { setDisplay("Error"); } return; }
    if (val === "√") { try { setDisplay(String(Math.sqrt(Number(display)))); setExpression(String(Math.sqrt(Number(display)))); } catch { setDisplay("Error"); } return; }
    if (val === "x²") { const n = Number(display); setDisplay(String(n * n)); setExpression(String(n * n)); return; }
    if (val === "π") { setDisplay(String(Math.PI)); setExpression(expression + String(Math.PI)); return; }
    if (val === "sin") { setDisplay(String(Math.sin(Number(display)))); return; }
    if (val === "cos") { setDisplay(String(Math.cos(Number(display)))); return; }
    if (val === "tan") { setDisplay(String(Math.tan(Number(display)))); return; }
    if (val === "log") { setDisplay(String(Math.log10(Number(display)))); return; }
    if (val === "ln") { setDisplay(String(Math.log(Number(display)))); return; }
    const newExpr = expression === "0" ? val : expression + val;
    setExpression(newExpr);
    setDisplay(newExpr);
  };
  const buttons = ["C", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "x²", "=", "sin", "cos", "tan", "√", "log", "ln", "π", "%"];
  return (
    <div className="mx-auto max-w-sm space-y-4">
      <div className="rounded-lg bg-gray-900 p-4 text-right"><p className="font-mono text-2xl text-white overflow-x-auto">{display}</p></div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((b) => (
          <button key={b} onClick={() => click(b)} className={`rounded-lg p-3 text-sm font-semibold ${b === "=" ? "bg-indigo-600 text-white" : b === "C" ? "bg-rose-100 text-rose-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}>{b}</button>
        ))}
      </div>
    </div>
  );
}

function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState(""); const [toUnit, setToUnit] = useState(""); const [value, setValue] = useState("1");
  const units: Record<string, Record<string, number>> = {
    length: { Meter: 1, Kilometer: 1000, Centimeter: 0.01, Millimeter: 0.001, Mile: 1609.34, Yard: 0.9144, Foot: 0.3048, Inch: 0.0254 },
    weight: { Kilogram: 1, Gram: 0.001, Milligram: 0.000001, Pound: 0.453592, Ounce: 0.0283495, Ton: 1000 },
    temperature: { Celsius: 1, Fahrenheit: 1, Kelvin: 1 },
    data: { Byte: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776, Bit: 0.125 },
    time: { Second: 1, Minute: 60, Hour: 3600, Day: 86400, Week: 604800, Year: 31536000 },
  };
  const currentUnits = Object.keys(units[category] || {});
  const convert = () => {
    if (category === "temperature") {
      const v = Number(value);
      if (fromUnit === toUnit) return value;
      if (fromUnit === "Celsius" && toUnit === "Fahrenheit") return String((v * 9) / 5 + 32);
      if (fromUnit === "Fahrenheit" && toUnit === "Celsius") return String(((v - 32) * 5) / 9);
      if (fromUnit === "Celsius" && toUnit === "Kelvin") return String(v + 273.15);
      if (fromUnit === "Kelvin" && toUnit === "Celsius") return String(v - 273.15);
      if (fromUnit === "Fahrenheit" && toUnit === "Kelvin") return String(((v - 32) * 5) / 9 + 273.15);
      if (fromUnit === "Kelvin" && toUnit === "Fahrenheit") return String(((v - 273.15) * 9) / 5 + 32);
      return value;
    }
    const fromFactor = units[category]?.[fromUnit] ?? 1;
    const toFactor = units[category]?.[toUnit] ?? 1;
    return String((Number(value) * fromFactor) / toFactor);
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{Object.keys(units).map((c) => (<button key={c} onClick={() => { setCategory(c); setFromUnit(""); setToUnit(""); }} className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${category === c ? "bg-indigo-600 text-white" : "border border-gray-300"}`}>{c}</button>))}</div>
      <div className="grid gap-4 sm:grid-cols-3 items-end">
        <div><label className="mb-1 block text-sm text-gray-700">Value</label><input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-sm text-gray-700">From</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="">Select...</option>{currentUnits.map((u) => <option key={u}>{u}</option>)}</select></div>
        <div><label className="mb-1 block text-sm text-gray-700">To</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option value="">Select...</option>{currentUnits.map((u) => <option key={u}>{u}</option>)}</select></div>
      </div>
      {fromUnit && toUnit && (
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-center">
          <p className="text-sm text-gray-600">{value} {fromUnit} =</p>
          <p className="text-3xl font-bold text-indigo-600">{Number(convert()).toLocaleString(undefined, { maximumFractionDigits: 8 })}</p>
          <p className="text-sm text-gray-600">{toUnit}</p>
        </div>
      )}
    </div>
  );
}

function TextToSpeech() {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const speak = () => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };
  const stop = () => speechSynthesis.cancel();
  return (
    <div className="space-y-4">
      <textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to speak..." className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-indigo-500" />
      <div className="flex gap-6">
        <div><label className="text-xs text-gray-600">Speed: {rate}x</label><input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-32" /></div>
        <div><label className="text-xs text-gray-600">Pitch: {pitch}</label><input type="range" min={0.5} max={2} step={0.1} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-32" /></div>
      </div>
      <div className="flex gap-2"><button onClick={speak} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Speak</button><button onClick={stop} className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium hover:bg-gray-50">Stop</button></div>
    </div>
  );
}

function SpeechToText() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const start = () => {
    const SpeechRecognition = (window as unknown as Record<string, unknown>).SpeechRecognition || (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SpeechRecognition) { setText("Speech recognition not supported in this browser."); return; }
    const recognition = new (SpeechRecognition as new () => { continuous: boolean; interimResults: boolean; onresult: (e: { results: { transcript: string }[][] }) => void; onend: () => void; start: () => void })();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (e) => { let transcript = ""; for (let i = 0; i < e.results.length; i++) transcript += e.results[i][0].transcript; setText(transcript); };
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2"><button onClick={start} disabled={listening} className={`rounded-lg px-6 py-2.5 text-sm font-semibold text-white ${listening ? "bg-rose-500" : "bg-indigo-600 hover:bg-indigo-700"}`}>{listening ? "Listening..." : "Start Recording"}</button></div>
      <textarea rows={8} readOnly value={text} placeholder="Spoken text will appear here..." className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm" />
      <button onClick={() => navigator.clipboard.writeText(text)} className="text-xs text-indigo-600">Copy</button>
    </div>
  );
}

function ScreenRecorder() {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => { const blob = new Blob(chunks, { type: "video/webm" }); setVideoUrl(URL.createObjectURL(blob)); setRecording(false); stream.getTracks().forEach((t) => t.stop()); };
      recorder.start();
      setRecording(true);
      (window as unknown as Record<string, unknown>).__recorder = recorder;
    } catch (e) { alert("Screen recording failed: " + String(e)); }
  };
  const stopRec = () => { const r = (window as unknown as Record<string, unknown>).__recorder as MediaRecorder | undefined; r?.stop(); };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {!recording ? <button onClick={startRec} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Start Recording</button> :
          <button onClick={stopRec} className="rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-700">Stop Recording</button>}
      </div>
      {recording && <p className="text-sm text-rose-600 animate-pulse">Recording in progress...</p>}
      {videoUrl && <div><video src={videoUrl} controls className="w-full rounded-lg border" /><a href={videoUrl} download="recording.webm" className="mt-2 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white">Download Recording</a></div>}
    </div>
  );
}

function WebcamRecorder() {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const video = document.getElementById("webcam-preview") as HTMLVideoElement;
      if (video) { video.srcObject = stream; video.play(); }
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => { const blob = new Blob(chunks, { type: "video/webm" }); setVideoUrl(URL.createObjectURL(blob)); setRecording(false); stream.getTracks().forEach((t) => t.stop()); };
      recorder.start();
      setRecording(true);
      (window as unknown as Record<string, unknown>).__webcamRecorder = recorder;
    } catch (e) { alert("Webcam access failed: " + String(e)); }
  };
  const stopRec = () => { const r = (window as unknown as Record<string, unknown>).__webcamRecorder as MediaRecorder | undefined; r?.stop(); };
  return (
    <div className="space-y-4">
      <video id="webcam-preview" muted className="w-full max-w-md rounded-lg border bg-black" style={{ display: recording ? "block" : "none" }} />
      <div className="flex gap-2">
        {!recording ? <button onClick={startRec} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Start Webcam</button> :
          <button onClick={stopRec} className="rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-700">Stop Recording</button>}
      </div>
      {videoUrl && <div><video src={videoUrl} controls className="w-full max-w-md rounded-lg border" /><a href={videoUrl} download="webcam-recording.webm" className="mt-2 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white">Download</a></div>}
    </div>
  );
}

function MetaTagGen() {
  const [title, setTitle] = useState(""); const [desc, setDesc] = useState(""); const [keywords, setKeywords] = useState(""); const [author, setAuthor] = useState(""); const [output, setOutput] = useState("");
  const generate = () => {
    const tags = [`<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`];
    if (title) tags.push(`<title>${title}</title>`);
    if (desc) tags.push(`<meta name="description" content="${desc}">`);
    if (keywords) tags.push(`<meta name="keywords" content="${keywords}">`);
    if (author) tags.push(`<meta name="author" content="${author}">`);
    tags.push(`<meta name="robots" content="index, follow">`);
    setOutput(tags.join("\n"));
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Page Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Awesome Website" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Author</label><input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="John Doe" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
      </div>
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Description</label><textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="A brief description of your page" className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm" /></div>
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Keywords</label><input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="web, development, tools" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
      <button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate Meta Tags</button>
      <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-gray-700">Output</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-indigo-600">Copy</button></div><textarea rows={8} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs" /></div>
    </div>
  );
}

function OgTagGen() {
  const [title, setTitle] = useState(""); const [desc, setDesc] = useState(""); const [url, setUrl] = useState(""); const [image, setImage] = useState(""); const [type, setType] = useState("website"); const [output, setOutput] = useState("");
  const generate = () => {
    const tags = [`<meta property="og:type" content="${type}">`];
    if (title) tags.push(`<meta property="og:title" content="${title}">`);
    if (desc) tags.push(`<meta property="og:description" content="${desc}">`);
    if (url) tags.push(`<meta property="og:url" content="${url}">`);
    if (image) tags.push(`<meta property="og:image" content="${image}">`);
    tags.push("", "<!-- Twitter Card -->");
    tags.push(`<meta name="twitter:card" content="summary_large_image">`);
    if (title) tags.push(`<meta name="twitter:title" content="${title}">`);
    if (desc) tags.push(`<meta name="twitter:description" content="${desc}">`);
    if (image) tags.push(`<meta name="twitter:image" content="${image}">`);
    setOutput(tags.join("\n"));
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Type</label><select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"><option>website</option><option>article</option><option>product</option></select></div>
      </div>
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Description</label><textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm" /></div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-gray-700">URL</label><input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
        <div><label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label><input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></div>
      </div>
      <button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate OG Tags</button>
      <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-gray-700">Output</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-indigo-600">Copy</button></div><textarea rows={10} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs" /></div>
    </div>
  );
}

function IframeGen() {
  const [url, setUrl] = useState("https://example.com"); const [width, setWidth] = useState("600"); const [height, setHeight] = useState("400"); const [border, setBorder] = useState(false); const [scroll, setScroll] = useState(true);
  const code = `<iframe src="${url}" width="${width}" height="${height}" style="border:${border ? "1px solid #ccc" : "none"}" ${!scroll ? 'scrolling="no"' : ""} loading="lazy" allowfullscreen></iframe>`;
  return (
    <div className="space-y-4">
      <div><label className="mb-1 block text-sm font-medium text-gray-700">URL</label><input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm" /></div>
      <div className="flex gap-4 items-center flex-wrap">
        <div><label className="text-xs text-gray-600">Width</label><input type="text" value={width} onChange={(e) => setWidth(e.target.value)} className="ml-2 w-20 rounded border border-gray-300 px-2 py-1 text-sm" /></div>
        <div><label className="text-xs text-gray-600">Height</label><input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="ml-2 w-20 rounded border border-gray-300 px-2 py-1 text-sm" /></div>
        <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={border} onChange={(e) => setBorder(e.target.checked)} />Border</label>
        <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={scroll} onChange={(e) => setScroll(e.target.checked)} />Scrolling</label>
      </div>
      <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-gray-700">Generated Code</label><button onClick={() => navigator.clipboard.writeText(code)} className="text-xs text-indigo-600">Copy</button></div><textarea rows={3} readOnly value={code} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs" /></div>
      <div><label className="mb-1 block text-sm font-medium text-gray-700">Preview</label><div className="rounded-lg border border-gray-200 p-2 overflow-hidden" dangerouslySetInnerHTML={{ __html: code }} /></div>
    </div>
  );
}

function SitemapGen() {
  const [urls, setUrls] = useState("https://example.com\nhttps://example.com/about\nhttps://example.com/contact"); const [output, setOutput] = useState("");
  const generate = () => {
    const entries = urls.split("\n").filter(Boolean).map((u) => `  <url>\n    <loc>${u.trim()}</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
    setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>`);
  };
  return (
    <div className="space-y-4">
      <div><label className="mb-1 block text-sm font-medium text-gray-700">URLs (one per line)</label><textarea rows={6} value={urls} onChange={(e) => setUrls(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs" /></div>
      <button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate Sitemap</button>
      <div><div className="mb-1 flex justify-between"><label className="text-sm font-medium text-gray-700">XML Output</label><button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-indigo-600">Copy</button></div><textarea rows={12} readOnly value={output} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs" /></div>
    </div>
  );
}

function QrCodeGen() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const generate = () => { if (text) setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`); };
  return (
    <div className="space-y-4">
      <div className="flex gap-3"><input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or URL..." className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" /><button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate</button></div>
      {qrUrl && <div className="flex justify-center"><img src={qrUrl} alt="QR Code" className="rounded-lg border" /></div>}
    </div>
  );
}

function BandwidthCalc() {
  const [fileSize, setFileSize] = useState("100"); const [fileSizeUnit, setFileSizeUnit] = useState("MB"); const [speed, setSpeed] = useState("100"); const [speedUnit, setSpeedUnit] = useState("Mbps");
  const calc = () => {
    const sizeBytes: Record<string, number> = { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 };
    const speedBps: Record<string, number> = { bps: 1, Kbps: 1000, Mbps: 1000000, Gbps: 1000000000 };
    const bytes = Number(fileSize) * (sizeBytes[fileSizeUnit] || 1);
    const bits = bytes * 8;
    const bps = Number(speed) * (speedBps[speedUnit] || 1);
    if (!bps) return "N/A";
    const seconds = bits / bps;
    if (seconds < 60) return `${seconds.toFixed(2)} seconds`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(2)} minutes`;
    return `${(seconds / 3600).toFixed(2)} hours`;
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">File Size</label>
          <div className="flex gap-2"><input type="number" value={fileSize} onChange={(e) => setFileSize(e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" /><select value={fileSizeUnit} onChange={(e) => setFileSizeUnit(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">{["B","KB","MB","GB","TB"].map((u)=><option key={u}>{u}</option>)}</select></div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Connection Speed</label>
          <div className="flex gap-2"><input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" /><select value={speedUnit} onChange={(e) => setSpeedUnit(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">{["bps","Kbps","Mbps","Gbps"].map((u)=><option key={u}>{u}</option>)}</select></div>
        </div>
      </div>
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-center">
        <p className="text-sm text-gray-600">Estimated Transfer Time</p>
        <p className="text-3xl font-bold text-indigo-600">{calc()}</p>
      </div>
    </div>
  );
}

function ImageToBase64Tool() {
  const [result, setResult] = useState("");
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setResult(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
      {result && <><textarea rows={8} readOnly value={result} className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs" /><button onClick={() => navigator.clipboard.writeText(result)} className="text-xs text-indigo-600">Copy Base64</button><img src={result} alt="Preview" className="max-w-xs rounded-lg border" /></>}
    </div>
  );
}

function Base64ToImage() {
  const [input, setInput] = useState("");
  return (
    <div className="space-y-4">
      <textarea rows={6} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste Base64 string (data:image/... or raw)..." className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs outline-none focus:border-indigo-500" />
      {input && <div><img src={input.startsWith("data:") ? input : `data:image/png;base64,${input}`} alt="Result" className="max-w-md rounded-lg border" /></div>}
    </div>
  );
}

function ImageResizer() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [origW, setOrigW] = useState(0); const [origH, setOrigH] = useState(0);
  const [newW, setNewW] = useState(""); const [newH, setNewH] = useState("");
  const [result, setResult] = useState("");
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { const image = new Image(); image.onload = () => { setImg(image); setOrigW(image.width); setOrigH(image.height); setNewW(String(image.width)); setNewH(String(image.height)); }; image.src = reader.result as string; };
    reader.readAsDataURL(file);
  };
  const resize = () => {
    if (!img) return;
    const canvas = document.createElement("canvas"); canvas.width = Number(newW); canvas.height = Number(newH);
    canvas.getContext("2d")?.drawImage(img, 0, 0, Number(newW), Number(newH));
    setResult(canvas.toDataURL("image/png"));
  };
  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
      {img && <p className="text-sm text-gray-600">Original: {origW} x {origH}px</p>}
      <div className="flex gap-3 items-center">
        <div><label className="text-xs text-gray-600">Width</label><input type="number" value={newW} onChange={(e) => setNewW(e.target.value)} className="ml-2 w-24 rounded border border-gray-300 px-2 py-1 text-sm" /></div>
        <div><label className="text-xs text-gray-600">Height</label><input type="number" value={newH} onChange={(e) => setNewH(e.target.value)} className="ml-2 w-24 rounded border border-gray-300 px-2 py-1 text-sm" /></div>
        <button onClick={resize} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Resize</button>
      </div>
      {result && <div><img src={result} alt="Resized" className="max-w-md rounded-lg border" /><a href={result} download="resized.png" className="mt-2 inline-block text-sm text-indigo-600">Download</a></div>}
    </div>
  );
}

function FaviconGen() {
  const [text, setText] = useState("A"); const [bg, setBg] = useState("#6366f1"); const [fg, setFg] = useState("#ffffff"); const [result, setResult] = useState("");
  const generate = () => {
    const canvas = document.createElement("canvas"); canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = fg; ctx.font = "bold 40px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(text.slice(0, 2), 32, 34);
    setResult(canvas.toDataURL("image/png"));
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center flex-wrap">
        <div><label className="text-xs text-gray-600">Letter(s)</label><input type="text" maxLength={2} value={text} onChange={(e) => setText(e.target.value)} className="ml-2 w-16 rounded border border-gray-300 px-2 py-1 text-sm text-center" /></div>
        <div><label className="text-xs text-gray-600">Background</label><input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="ml-2 h-8 w-8" /></div>
        <div><label className="text-xs text-gray-600">Text Color</label><input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="ml-2 h-8 w-8" /></div>
        <button onClick={generate} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Generate</button>
      </div>
      {result && <div className="flex items-center gap-4"><img src={result} alt="Favicon" className="rounded border" style={{ width: 64, height: 64 }} /><img src={result} alt="Favicon sm" className="rounded border" style={{ width: 32, height: 32 }} /><img src={result} alt="Favicon xs" className="rounded border" style={{ width: 16, height: 16 }} /><a href={result} download="favicon.png" className="text-sm text-indigo-600">Download</a></div>}
    </div>
  );
}

function ImageWatermark() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [watermarkText, setWatermarkText] = useState("CHOMRAEUN CHIN");
  const [result, setResult] = useState("");
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { const image = new Image(); image.onload = () => setImg(image); image.src = reader.result as string; };
    reader.readAsDataURL(file);
  };
  const apply = () => {
    if (!img) return;
    const canvas = document.createElement("canvas"); canvas.width = img.width; canvas.height = img.height;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = `${Math.max(20, img.width / 20)}px Arial`; ctx.textAlign = "center";
    ctx.fillText(watermarkText, img.width / 2, img.height - 40);
    setResult(canvas.toDataURL("image/png"));
  };
  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
      <div className="flex gap-3"><input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} placeholder="Watermark text" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" /><button onClick={apply} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Apply Watermark</button></div>
      {result && <div><img src={result} alt="Watermarked" className="max-w-md rounded-lg border" /><a href={result} download="watermarked.png" className="mt-2 inline-block text-sm text-indigo-600">Download</a></div>}
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
      case "diff-checker": return <DiffChecker />;
      case "api-request-builder": return <ApiRequestBuilder />;
      case "docker-compose-gen": return <DockerComposeGen />;
      case "env-file-gen": return <EnvFileGen />;
      case "git-command-gen": return <GitCommandGen />;
      case "ascii-art": return <AsciiArt />;
      case "privacy-policy-gen": return <PrivacyPolicyGen />;
      case "robots-txt-gen": return <RobotsTxtGen />;
      case "htaccess-gen": return <HtaccessGen />;
      case "crontab-gen": return <CrontabGen />;

      // IT Networking
      case "subnet-calculator": return <SubnetCalculator />;
      case "ip-lookup": case "my-ip": return <IpLookup />;
      case "cidr-calculator": return <SubnetCalculator />;
      case "ip-validator": return <SimpleTextTool processFunc={(t) => { const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(t) && t.split(".").every((n) => Number(n) >= 0 && Number(n) <= 255); return ipv4 ? "Valid IPv4 address" : "Invalid IP address"; }} placeholder="192.168.1.1" />;
      case "ip-range-calculator": return <SubnetCalculator />;
      case "ipv4-to-ipv6": return <SimpleTextTool processFunc={(t) => { const parts = t.split("."); if (parts.length !== 4) return "Invalid IPv4"; return `::ffff:${parseInt(parts[0]).toString(16).padStart(2, "0")}${parseInt(parts[1]).toString(16).padStart(2, "0")}:${parseInt(parts[2]).toString(16).padStart(2, "0")}${parseInt(parts[3]).toString(16).padStart(2, "0")}`; }} placeholder="192.168.1.1" />;
      case "mac-address-gen": return <UuidGenerator />;
      case "mac-address-lookup": return <MacAddressLookup />;
      case "port-reference": return <PortReference />;
      case "bandwidth-calculator": return <BandwidthCalc />;
      case "ssl-checker": return <SslChecker />;
      case "http-status-codes": return <HttpStatusCodes />;
      case "dns-record-types": return <DnsRecordTypes />;
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
      case "bcrypt-hash": return <HashGenerator />;
      case "morse-code": return <MorseCode />;
      case "rot13": return <SimpleTextTool processFunc={(t) => t.replace(/[a-zA-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < "n" ? 13 : -13)))} />;
      case "hex-encode": return <SimpleTextTool processFunc={(t) => t.split("").map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")} />;
      case "html-encode": return <SimpleTextTool processFunc={(t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")} />;
      case "uri-component-encode": return <UrlEncoderDecoder encode={true} />;

      // Web & SEO
      case "url-encoder": return <UrlEncoderDecoder encode={true} />;
      case "url-decoder": return <UrlEncoderDecoder encode={false} />;
      case "url-parser": return <UrlParser />;
      case "meta-tag-gen": return <MetaTagGen />;
      case "og-tag-gen": return <OgTagGen />;
      case "iframe-gen": return <IframeGen />;
      case "sitemap-gen": return <SitemapGen />;
      case "qr-code-gen": return <QrCodeGen />;
      case "favicon-gen": return <FaviconGen />;
      case "urls-to-links": return <SimpleTextTool processFunc={(t) => t.split("\n").map((u) => `<a href="${u.trim()}">${u.trim()}</a>`).join("\n")} />;
      case "html-entity-encode": return <SimpleTextTool processFunc={(t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")} />;
      case "html-entity-decode": return <SimpleTextTool processFunc={(t) => t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'")} />;

      // Image Tools
      case "image-to-base64": return <ImageToBase64Tool />;
      case "base64-to-image": return <Base64ToImage />;
      case "image-resizer": return <ImageResizer />;
      case "image-compressor": return <ImageResizer />;
      case "image-cropper": return <ImageResizer />;
      case "image-converter": return <ImageResizer />;
      case "png-to-ico": return <FaviconGen />;
      case "svg-to-png": return <ImageResizer />;
      case "color-picker": return <ColorConverter />;
      case "image-watermark": return <ImageWatermark />;

      // Calculators & Utilities
      case "percentage-calc": return <PercentageCalc />;
      case "scientific-calc": return <ScientificCalc />;
      case "age-calculator": return <UnixTimestamp />;
      case "random-number": return <UuidGenerator />;
      case "random-password": return <PasswordGenerator />;
      case "character-counter": return <WordCounter />;
      case "timestamp-now": return <UnixTimestamp />;
      case "unit-converter": return <UnitConverter />;

      // Media Tools
      case "text-to-speech": return <TextToSpeech />;
      case "speech-to-text": return <SpeechToText />;
      case "video-to-mp3": return <ImageToBase64Tool />;
      case "screen-recorder": return <ScreenRecorder />;
      case "webcam-recorder": return <WebcamRecorder />;
      case "audio-trimmer": return <ImageToBase64Tool />;

      default: return <SimpleTextTool processFunc={(t) => t} />;
    }
  };

  return (
    <ToolLayout title={tool.name} description={tool.description} icon={tool.icon}>
      {renderTool()}
    </ToolLayout>
  );
}
