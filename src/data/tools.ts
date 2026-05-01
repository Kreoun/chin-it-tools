export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
}

export interface Category {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const categories: Category[] = [
  { name: "Text Tools", icon: "📝", color: "bg-blue-500", description: "Text manipulation, formatting, and analysis" },
  { name: "Data Converters", icon: "🔄", color: "bg-emerald-500", description: "Convert between JSON, CSV, XML, YAML, and more" },
  { name: "IT Developer Tools", icon: "💻", color: "bg-violet-500", description: "Essential tools for software developers" },
  { name: "IT Networking Tools", icon: "🌐", color: "bg-orange-500", description: "Network analysis, IP tools, and diagnostics" },
  { name: "Number Base Converters", icon: "🔢", color: "bg-pink-500", description: "Convert between binary, decimal, hex, and octal" },
  { name: "Image Tools", icon: "🖼️", color: "bg-cyan-500", description: "Image conversion, compression, and editing" },
  { name: "Web & SEO Tools", icon: "🔍", color: "bg-amber-500", description: "SEO analysis, HTML tools, and web utilities" },
  { name: "Encoding & Encryption", icon: "🔐", color: "bg-rose-500", description: "Encode, decode, hash, and encrypt data" },
  { name: "Calculators & Utilities", icon: "🧮", color: "bg-teal-500", description: "Math calculators, converters, and generators" },
  { name: "Media Tools", icon: "🎬", color: "bg-indigo-500", description: "Video, audio, and PDF processing tools" },
];

export const tools: Tool[] = [
  // ===== TEXT TOOLS =====
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, sentences, and paragraphs", category: "Text Tools", icon: "📊" },
  { slug: "find-replace", name: "Find & Replace Text", description: "Find and replace text with regex support", category: "Text Tools", icon: "🔍" },
  { slug: "text-case-converter", name: "Text Case Converter", description: "Convert text to upper, lower, title, sentence case", category: "Text Tools", icon: "Aa" },
  { slug: "remove-duplicate-lines", name: "Remove Duplicate Lines", description: "Remove duplicate lines from text", category: "Text Tools", icon: "🗑️" },
  { slug: "remove-empty-lines", name: "Remove Empty Lines", description: "Remove all empty/blank lines from text", category: "Text Tools", icon: "📄" },
  { slug: "remove-extra-spaces", name: "Remove Extra Spaces", description: "Remove extra whitespace from text", category: "Text Tools", icon: "✂️" },
  { slug: "text-reverser", name: "Reverse Text", description: "Reverse text string backwards", category: "Text Tools", icon: "🔀" },
  { slug: "text-splitter", name: "Text Splitter", description: "Split text by delimiter or character count", category: "Text Tools", icon: "✂️" },
  { slug: "text-repeater", name: "Text Repeater", description: "Repeat text multiple times with separator", category: "Text Tools", icon: "🔁" },
  { slug: "add-line-numbers", name: "Add Line Numbers", description: "Add line numbers to text content", category: "Text Tools", icon: "🔢" },
  { slug: "sort-lines", name: "Sort Lines", description: "Sort text lines alphabetically or numerically", category: "Text Tools", icon: "📋" },
  { slug: "lorem-ipsum", name: "Lorem Ipsum Generator", description: "Generate placeholder text for designs", category: "Text Tools", icon: "📝" },
  { slug: "text-diff", name: "Text Diff Checker", description: "Compare two texts and highlight differences", category: "Text Tools", icon: "📊" },
  { slug: "extract-text-html", name: "Extract Text from HTML", description: "Strip HTML tags and extract plain text", category: "Text Tools", icon: "🏷️" },
  { slug: "text-to-slug", name: "Text to Slug", description: "Convert text to URL-friendly slug", category: "Text Tools", icon: "🔗" },
  { slug: "upside-down-text", name: "Upside Down Text", description: "Flip text upside down", category: "Text Tools", icon: "🙃" },
  { slug: "string-length", name: "String Length Calculator", description: "Calculate the length of a string", category: "Text Tools", icon: "📏" },

  // ===== DATA CONVERTERS =====
  { slug: "json-to-csv", name: "JSON to CSV", description: "Convert JSON data to CSV format", category: "Data Converters", icon: "📊" },
  { slug: "csv-to-json", name: "CSV to JSON", description: "Convert CSV data to JSON format", category: "Data Converters", icon: "📋" },
  { slug: "json-to-xml", name: "JSON to XML", description: "Convert JSON to XML format", category: "Data Converters", icon: "📄" },
  { slug: "xml-to-json", name: "XML to JSON", description: "Convert XML to JSON format", category: "Data Converters", icon: "🔄" },
  { slug: "json-to-yaml", name: "JSON to YAML", description: "Convert JSON to YAML format", category: "Data Converters", icon: "📝" },
  { slug: "yaml-to-json", name: "YAML to JSON", description: "Convert YAML to JSON format", category: "Data Converters", icon: "📋" },
  { slug: "json-formatter", name: "JSON Formatter", description: "Format and beautify JSON data", category: "Data Converters", icon: "✨" },
  { slug: "json-minifier", name: "JSON Minifier", description: "Minify JSON by removing whitespace", category: "Data Converters", icon: "📦" },
  { slug: "json-validator", name: "JSON Validator", description: "Validate JSON syntax and structure", category: "Data Converters", icon: "✅" },
  { slug: "json-stringify", name: "JSON Stringify", description: "Stringify JSON with escape characters", category: "Data Converters", icon: "🔤" },
  { slug: "json-to-typescript", name: "JSON to TypeScript", description: "Generate TypeScript interfaces from JSON", category: "Data Converters", icon: "🔷" },
  { slug: "raw-string-to-json", name: "Raw String to JSON", description: "Parse raw string to JSON object", category: "Data Converters", icon: "📝" },
  { slug: "csv-to-sql", name: "CSV to SQL", description: "Generate SQL INSERT statements from CSV", category: "Data Converters", icon: "🗃️" },
  { slug: "json-to-ini", name: "JSON to INI", description: "Convert JSON to INI config format", category: "Data Converters", icon: "⚙️" },
  { slug: "ini-to-json", name: "INI to JSON", description: "Convert INI config to JSON format", category: "Data Converters", icon: "📋" },
  { slug: "markdown-to-html", name: "Markdown to HTML", description: "Convert Markdown to HTML", category: "Data Converters", icon: "📄" },
  { slug: "html-to-markdown", name: "HTML to Markdown", description: "Convert HTML to Markdown format", category: "Data Converters", icon: "📝" },
  { slug: "toml-to-json", name: "TOML to JSON", description: "Convert TOML to JSON format", category: "Data Converters", icon: "🔄" },

  // ===== IT DEVELOPER TOOLS =====
  { slug: "regex-tester", name: "Regex Tester", description: "Test regular expressions with live matching", category: "IT Developer Tools", icon: "🧪" },
  { slug: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JWT tokens", category: "IT Developer Tools", icon: "🔓" },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate UUIDs (v4) with bulk option", category: "IT Developer Tools", icon: "🆔" },
  { slug: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes", category: "IT Developer Tools", icon: "🔐" },
  { slug: "cron-parser", name: "Cron Expression Parser", description: "Parse and explain cron expressions", category: "IT Developer Tools", icon: "⏰" },
  { slug: "js-formatter", name: "JavaScript Formatter", description: "Format and beautify JavaScript code", category: "IT Developer Tools", icon: "📜" },
  { slug: "html-formatter", name: "HTML Formatter", description: "Format and beautify HTML code", category: "IT Developer Tools", icon: "🌐" },
  { slug: "css-formatter", name: "CSS Formatter", description: "Format and beautify CSS code", category: "IT Developer Tools", icon: "🎨" },
  { slug: "sql-formatter", name: "SQL Formatter", description: "Format and beautify SQL queries", category: "IT Developer Tools", icon: "🗃️" },
  { slug: "html-minifier", name: "HTML Minifier", description: "Minify HTML by removing whitespace", category: "IT Developer Tools", icon: "📦" },
  { slug: "css-minifier", name: "CSS Minifier", description: "Minify CSS code", category: "IT Developer Tools", icon: "📦" },
  { slug: "js-minifier", name: "JavaScript Minifier", description: "Minify JavaScript code", category: "IT Developer Tools", icon: "📦" },
  { slug: "color-converter", name: "Color Converter", description: "Convert between HEX, RGB, HSL color formats", category: "IT Developer Tools", icon: "🎨" },
  { slug: "unix-timestamp", name: "Unix Timestamp Converter", description: "Convert Unix timestamps to dates and back", category: "IT Developer Tools", icon: "🕐" },
  { slug: "chmod-calculator", name: "Chmod Calculator", description: "Calculate Unix file permissions", category: "IT Developer Tools", icon: "🔒" },
  { slug: "git-command-gen", name: "Git Command Generator", description: "Generate common Git commands interactively", category: "IT Developer Tools", icon: "📂" },
  { slug: "docker-compose-gen", name: "Docker Compose Generator", description: "Generate Docker Compose YAML files", category: "IT Developer Tools", icon: "🐳" },
  { slug: "env-file-gen", name: ".env File Generator", description: "Create environment variable files", category: "IT Developer Tools", icon: "⚙️" },
  { slug: "ascii-art", name: "ASCII Art Generator", description: "Convert text to ASCII art", category: "IT Developer Tools", icon: "🎨" },
  { slug: "diff-checker", name: "Code Diff Checker", description: "Compare two code snippets line by line", category: "IT Developer Tools", icon: "📊" },
  { slug: "escape-unescape", name: "String Escape/Unescape", description: "Escape or unescape strings for various languages", category: "IT Developer Tools", icon: "🔤" },
  { slug: "json-schema-gen", name: "JSON Schema Generator", description: "Generate JSON Schema from JSON data", category: "IT Developer Tools", icon: "📐" },
  { slug: "api-request-builder", name: "API Request Builder", description: "Build and test HTTP API requests", category: "IT Developer Tools", icon: "🚀" },
  { slug: "privacy-policy-gen", name: "Privacy Policy Generator", description: "Generate a privacy policy for your website", category: "IT Developer Tools", icon: "📜" },
  { slug: "robots-txt-gen", name: "Robots.txt Generator", description: "Generate robots.txt for your website", category: "IT Developer Tools", icon: "🤖" },
  { slug: "htaccess-gen", name: ".htaccess Generator", description: "Generate Apache .htaccess redirect rules", category: "IT Developer Tools", icon: "⚙️" },
  { slug: "crontab-gen", name: "Crontab Generator", description: "Build crontab entries visually", category: "IT Developer Tools", icon: "📅" },

  // ===== IT NETWORKING TOOLS =====
  { slug: "ip-lookup", name: "IP Address Lookup", description: "Look up geolocation and details of an IP address", category: "IT Networking Tools", icon: "📍" },
  { slug: "my-ip", name: "What is My IP", description: "Find your public IP address and details", category: "IT Networking Tools", icon: "🌐" },
  { slug: "subnet-calculator", name: "Subnet Calculator", description: "Calculate subnet masks, network, broadcast addresses", category: "IT Networking Tools", icon: "🔢" },
  { slug: "cidr-calculator", name: "CIDR Calculator", description: "Convert CIDR notation to IP ranges", category: "IT Networking Tools", icon: "📊" },
  { slug: "ip-range-calculator", name: "IP Range Calculator", description: "Calculate IP address ranges between two IPs", category: "IT Networking Tools", icon: "📏" },
  { slug: "ipv4-to-ipv6", name: "IPv4 to IPv6 Converter", description: "Convert IPv4 addresses to IPv6 format", category: "IT Networking Tools", icon: "🔄" },
  { slug: "ip-validator", name: "IP Address Validator", description: "Validate IPv4 and IPv6 addresses", category: "IT Networking Tools", icon: "✅" },
  { slug: "mac-address-lookup", name: "MAC Address Lookup", description: "Look up vendor from MAC address (OUI)", category: "IT Networking Tools", icon: "🔍" },
  { slug: "mac-address-gen", name: "MAC Address Generator", description: "Generate random MAC addresses", category: "IT Networking Tools", icon: "🆔" },
  { slug: "port-reference", name: "Port Number Reference", description: "Look up common TCP/UDP port numbers", category: "IT Networking Tools", icon: "🚪" },
  { slug: "bandwidth-calculator", name: "Bandwidth Calculator", description: "Calculate file transfer times and bandwidth", category: "IT Networking Tools", icon: "📶" },
  { slug: "ssl-checker", name: "SSL Certificate Checker", description: "Check SSL certificate details of a domain", category: "IT Networking Tools", icon: "🔒" },
  { slug: "http-status-codes", name: "HTTP Status Code Reference", description: "Complete reference of HTTP status codes", category: "IT Networking Tools", icon: "📋" },
  { slug: "dns-record-types", name: "DNS Record Types", description: "Reference guide for DNS record types", category: "IT Networking Tools", icon: "📚" },
  { slug: "network-mask-ref", name: "Network Mask Reference", description: "Subnet mask reference table (/0 to /32)", category: "IT Networking Tools", icon: "📊" },
  { slug: "binary-ip-converter", name: "Binary IP Converter", description: "Convert IP addresses to/from binary", category: "IT Networking Tools", icon: "🔢" },
  { slug: "wildcard-mask-calc", name: "Wildcard Mask Calculator", description: "Calculate wildcard masks from subnet masks", category: "IT Networking Tools", icon: "🎭" },

  // ===== NUMBER BASE CONVERTERS =====
  { slug: "decimal-to-binary", name: "Decimal to Binary", description: "Convert decimal numbers to binary", category: "Number Base Converters", icon: "0️⃣" },
  { slug: "binary-to-decimal", name: "Binary to Decimal", description: "Convert binary numbers to decimal", category: "Number Base Converters", icon: "1️⃣" },
  { slug: "decimal-to-hex", name: "Decimal to Hexadecimal", description: "Convert decimal to hexadecimal", category: "Number Base Converters", icon: "🔢" },
  { slug: "hex-to-decimal", name: "Hexadecimal to Decimal", description: "Convert hexadecimal to decimal", category: "Number Base Converters", icon: "🔢" },
  { slug: "decimal-to-octal", name: "Decimal to Octal", description: "Convert decimal to octal", category: "Number Base Converters", icon: "8️⃣" },
  { slug: "octal-to-decimal", name: "Octal to Decimal", description: "Convert octal to decimal", category: "Number Base Converters", icon: "🔢" },
  { slug: "binary-to-hex", name: "Binary to Hexadecimal", description: "Convert binary to hexadecimal", category: "Number Base Converters", icon: "🔄" },
  { slug: "hex-to-binary", name: "Hexadecimal to Binary", description: "Convert hexadecimal to binary", category: "Number Base Converters", icon: "🔄" },
  { slug: "binary-to-octal", name: "Binary to Octal", description: "Convert binary to octal", category: "Number Base Converters", icon: "🔄" },
  { slug: "octal-to-binary", name: "Octal to Binary", description: "Convert octal to binary", category: "Number Base Converters", icon: "🔄" },
  { slug: "octal-to-hex", name: "Octal to Hexadecimal", description: "Convert octal to hexadecimal", category: "Number Base Converters", icon: "🔄" },
  { slug: "hex-to-octal", name: "Hexadecimal to Octal", description: "Convert hexadecimal to octal", category: "Number Base Converters", icon: "🔄" },
  { slug: "binary-to-ascii", name: "Binary to ASCII", description: "Convert binary to ASCII text", category: "Number Base Converters", icon: "🔤" },
  { slug: "ascii-to-binary", name: "ASCII to Binary", description: "Convert ASCII text to binary", category: "Number Base Converters", icon: "0️⃣" },
  { slug: "text-to-decimal", name: "Text to Decimal", description: "Convert text characters to decimal codes", category: "Number Base Converters", icon: "🔢" },
  { slug: "decimal-to-text", name: "Decimal to Text", description: "Convert decimal codes to text", category: "Number Base Converters", icon: "🔤" },

  // ===== IMAGE TOOLS =====
  { slug: "image-resizer", name: "Resize Image", description: "Resize images to custom dimensions", category: "Image Tools", icon: "📐" },
  { slug: "image-compressor", name: "Compress Image", description: "Compress images to reduce file size", category: "Image Tools", icon: "📦" },
  { slug: "image-cropper", name: "Crop Image", description: "Crop images to custom dimensions", category: "Image Tools", icon: "✂️" },
  { slug: "image-to-base64", name: "Image to Base64", description: "Convert images to Base64 data strings", category: "Image Tools", icon: "🔤" },
  { slug: "base64-to-image", name: "Base64 to Image", description: "Convert Base64 strings to downloadable images", category: "Image Tools", icon: "🖼️" },
  { slug: "image-converter", name: "Image Format Converter", description: "Convert between PNG, JPG, WEBP, BMP formats", category: "Image Tools", icon: "🔄" },
  { slug: "png-to-ico", name: "PNG to ICO", description: "Convert PNG images to ICO favicon format", category: "Image Tools", icon: "🔄" },
  { slug: "svg-to-png", name: "SVG to PNG", description: "Convert SVG files to PNG images", category: "Image Tools", icon: "🔄" },
  { slug: "color-picker", name: "Color Picker", description: "Pick colors and get HEX, RGB, HSL values", category: "Image Tools", icon: "🎨" },
  { slug: "image-watermark", name: "Add Text Watermark", description: "Add text watermark to images", category: "Image Tools", icon: "💧" },

  // ===== WEB & SEO TOOLS =====
  { slug: "url-encoder", name: "URL Encoder", description: "Encode URLs and special characters", category: "Web & SEO Tools", icon: "🔗" },
  { slug: "url-decoder", name: "URL Decoder", description: "Decode URL-encoded strings", category: "Web & SEO Tools", icon: "🔓" },
  { slug: "url-parser", name: "URL Parser", description: "Parse URL components (protocol, host, path, params)", category: "Web & SEO Tools", icon: "🔍" },
  { slug: "meta-tag-gen", name: "Meta Tag Generator", description: "Generate HTML meta tags for SEO", category: "Web & SEO Tools", icon: "🏷️" },
  { slug: "og-tag-gen", name: "Open Graph Tag Generator", description: "Generate OG tags for social sharing", category: "Web & SEO Tools", icon: "📱" },
  { slug: "iframe-gen", name: "IFrame Generator", description: "Generate HTML iframe embed codes", category: "Web & SEO Tools", icon: "📺" },
  { slug: "urls-to-links", name: "URLs to HTML Links", description: "Convert plain URLs to clickable HTML links", category: "Web & SEO Tools", icon: "🔗" },
  { slug: "html-entity-encode", name: "HTML Entity Encoder", description: "Encode special characters to HTML entities", category: "Web & SEO Tools", icon: "🏷️" },
  { slug: "html-entity-decode", name: "HTML Entity Decoder", description: "Decode HTML entities to characters", category: "Web & SEO Tools", icon: "🔓" },
  { slug: "sitemap-gen", name: "XML Sitemap Generator", description: "Generate XML sitemaps for your website", category: "Web & SEO Tools", icon: "🗺️" },
  { slug: "qr-code-gen", name: "QR Code Generator", description: "Generate QR codes from text or URLs", category: "Web & SEO Tools", icon: "📱" },
  { slug: "favicon-gen", name: "Favicon Generator", description: "Generate favicons for your website", category: "Web & SEO Tools", icon: "⭐" },

  // ===== ENCODING & ENCRYPTION =====
  { slug: "base64-encode", name: "Base64 Encode", description: "Encode text to Base64 format", category: "Encoding & Encryption", icon: "🔒" },
  { slug: "base64-decode", name: "Base64 Decode", description: "Decode Base64 to plain text", category: "Encoding & Encryption", icon: "🔓" },
  { slug: "md5-hash", name: "MD5 Hash Generator", description: "Generate MD5 hash from text", category: "Encoding & Encryption", icon: "🔐" },
  { slug: "sha256-hash", name: "SHA-256 Hash Generator", description: "Generate SHA-256 hash from text", category: "Encoding & Encryption", icon: "🔐" },
  { slug: "bcrypt-hash", name: "Bcrypt Hash Generator", description: "Generate and verify bcrypt password hashes", category: "Encoding & Encryption", icon: "🔑" },
  { slug: "morse-code", name: "Morse Code Translator", description: "Encode and decode Morse code", category: "Encoding & Encryption", icon: "📡" },
  { slug: "rot13", name: "ROT13 Encoder/Decoder", description: "Encode and decode ROT13 cipher", category: "Encoding & Encryption", icon: "🔄" },
  { slug: "hex-encode", name: "Hex Encode/Decode", description: "Convert text to hex and back", category: "Encoding & Encryption", icon: "🔢" },
  { slug: "html-encode", name: "HTML Encode/Decode", description: "Encode and decode HTML special characters", category: "Encoding & Encryption", icon: "🌐" },
  { slug: "uri-component-encode", name: "URI Component Encode", description: "Encode/decode URI components", category: "Encoding & Encryption", icon: "🔗" },

  // ===== CALCULATORS & UTILITIES =====
  { slug: "percentage-calc", name: "Percentage Calculator", description: "Calculate percentages of any number", category: "Calculators & Utilities", icon: "%" },
  { slug: "scientific-calc", name: "Scientific Calculator", description: "Full scientific calculator", category: "Calculators & Utilities", icon: "🧮" },
  { slug: "age-calculator", name: "Age Calculator", description: "Calculate age from date of birth", category: "Calculators & Utilities", icon: "📅" },
  { slug: "random-number", name: "Random Number Generator", description: "Generate random numbers in a range", category: "Calculators & Utilities", icon: "🎲" },
  { slug: "random-password", name: "Password Generator", description: "Generate strong random passwords", category: "Calculators & Utilities", icon: "🔑" },
  { slug: "character-counter", name: "Character Counter", description: "Count characters with/without spaces", category: "Calculators & Utilities", icon: "🔢" },
  { slug: "timestamp-now", name: "Current Timestamp", description: "Get current Unix timestamp and date/time", category: "Calculators & Utilities", icon: "⏱️" },
  { slug: "unit-converter", name: "Unit Converter", description: "Convert between units of measurement", category: "Calculators & Utilities", icon: "📏" },

  // ===== MEDIA TOOLS =====
  { slug: "text-to-speech", name: "Text to Speech", description: "Convert text to spoken audio", category: "Media Tools", icon: "🔊" },
  { slug: "speech-to-text", name: "Speech to Text", description: "Convert spoken audio to text", category: "Media Tools", icon: "🎤" },
  { slug: "video-to-mp3", name: "Video to MP3", description: "Extract audio from video files", category: "Media Tools", icon: "🎵" },
  { slug: "screen-recorder", name: "Screen Recorder", description: "Record your screen directly in browser", category: "Media Tools", icon: "🖥️" },
  { slug: "webcam-recorder", name: "Webcam Recorder", description: "Record video from your webcam", category: "Media Tools", icon: "📹" },
  { slug: "audio-trimmer", name: "Audio Trimmer", description: "Trim and cut audio files", category: "Media Tools", icon: "✂️" },
];

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
